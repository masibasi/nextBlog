// Notion REST-based utilities (no external SDK) to avoid dependency and duplications

export type Project = {
  id: string;
  title: string;
  summary?: string;
  duration?: string;
  tags?: string[];
  stacks?: string[];
  releasable?: boolean;
  github?: string | null;
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
    next: { revalidate: 0 },
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
    return (rt ?? []).map((t: any) => t?.plain_text).filter(Boolean).join("").trim();
  } catch {
    return "";
  }
}

function pickUrl(prop: any): string | null {
  try {
    return prop?.url ?? null;
  } catch {
    return null;
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
  const tagsProp = props?.tags ?? props?.Tags;
  const stacksProp = props?.Stacks ?? props?.stacks;
  const summaryProp = props?.Summary ?? props?.Description ?? props?.description;
  const githubProp = props?.Github ?? props?.GitHub ?? props?.github;

  return {
    id: item.id,
    title: pickTitle(props?.Name?.title),
    summary: pickRichText(summaryProp?.rich_text),
    duration: props?.Duration?.date?.start ?? "",
    tags: pickMulti(tagsProp?.multi_select),
    stacks: pickMulti(stacksProp?.multi_select),
    releasable: !!props?.releasable?.checkbox,
    github: pickUrl(githubProp),
    cover: item.cover?.external?.url ?? item.cover?.file?.url ?? null,
    notionUrl: item.url ?? null,
  };
}

function sortByDurationDesc(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const da = a?.duration ? new Date(a.duration).getTime() : 0;
    const db = b?.duration ? new Date(b.duration).getTime() : 0;
    return db - da;
  });
}

export async function getMainProjects(): Promise<Project[]> {
  if (!MAIN_DB_ID) return [];
  const rows = await queryAll(MAIN_DB_ID);
  return sortByDurationDesc(rows.map(mapProject));
}

export async function getOtherProjects(): Promise<Project[]> {
  if (!OTHER_DB_ID) return [];
  const rows = await queryAll(OTHER_DB_ID);
  return sortByDurationDesc(rows.map(mapProject));
}

export async function getAllProjects(): Promise<Project[]> {
  const [main, other] = await Promise.all([getMainProjects(), getOtherProjects()]);
  return sortByDurationDesc([...(main ?? []), ...(other ?? [])]);
}
