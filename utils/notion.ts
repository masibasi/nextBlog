// Notion REST-based utilities (no external SDK) to avoid dependency and duplications

export type Project = {
  id: string;
  title: string;
  duration?: string; // ISO date string from Notion date.start
  tags?: string[];
  stacks?: string[];
  releasable?: boolean;
  featured?: boolean;
  summary?: string;
  cover?: string | null;
  notionUrl?: string | null;
};

const NOTION_TOKEN = process.env.NOTION_TOKEN as string | undefined;
const MAIN_DB_ID = (process.env.NOTION_MAIN_DB_ID as string | undefined) ?? "";
const OTHER_DB_ID = (process.env.NOTION_OTHER_DB_ID as string | undefined) ?? "";
const NOTION_VERSION = "2022-06-28";

async function notionQuery(databaseId: string, startCursor?: string) {
  const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page_size: 100, start_cursor: startCursor }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("[notion] query error:", res.status, errorText);
    throw new Error(`Notion query failed: ${res.status}`);
  }

  return res.json();
}

async function queryAll(databaseId: string): Promise<any[]> {
  if (!NOTION_TOKEN || !databaseId) return [];
  const results: any[] = [];
  let cursor: string | undefined = undefined;
  let hasMore = true;

  while (hasMore) {
    const data = await notionQuery(databaseId, cursor);
    results.push(...(data.results ?? []));
    hasMore = !!data.has_more;
    cursor = data.next_cursor ?? undefined;
  }
  return results;
}

function pickTitle(title: any): string {
  try {
    return title?.[0]?.plain_text ?? "";
  } catch {
    return "";
  }
}

function pickRichText(rt: any): string {
  try {
    return (rt ?? []).map((t: any) => t?.plain_text ?? "").join("");
  } catch {
    return "";
  }
}

function pickMulti(ms: any): string[] {
  try {
    return (ms ?? []).map((t: any) => t?.name).filter(Boolean);
  } catch {
    return [];
  }
}

function mapProject(item: any): Project {
  const props = item?.properties ?? {};
  const tagsProp = props?.tags ?? props?.Tags; // tolerate both cases
  const stacksProp = props?.Stacks ?? props?.stacks;
  return {
    id: item.id,
    title: pickTitle(props?.Name?.title),
    duration: props?.Duration?.date?.start ?? "",
    tags: pickMulti(tagsProp?.multi_select),
    stacks: pickMulti(stacksProp?.multi_select),
    releasable: !!props?.releasable?.checkbox,
    featured: !!props?.featured?.checkbox || !!props?.Featured?.checkbox,
    summary: pickRichText(props?.Summary?.rich_text ?? props?.summary?.rich_text),
    // external URL은 영구, file URL은 ~1시간 후 만료 → 프록시로 교체
    cover: item.cover?.external?.url
      ? item.cover.external.url
      : item.cover?.file?.url
      ? `/api/notion-image?pageId=${item.id}`
      : null,
    notionUrl: item.url ?? null,
  };
}

export async function getMainProjects(): Promise<Project[]> {
  if (!MAIN_DB_ID) return [];
  const rows = await queryAll(MAIN_DB_ID);
  return rows.map(mapProject);
}

export async function getOtherProjects(): Promise<Project[]> {
  if (!OTHER_DB_ID) return [];
  const rows = await queryAll(OTHER_DB_ID);
  return rows.map(mapProject);
}

export async function getAllProjects(): Promise<Project[]> {
  const [main, other] = await Promise.all([getMainProjects(), getOtherProjects()]);
  return [...(main ?? []), ...(other ?? [])];
}
