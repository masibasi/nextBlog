// 노션 API 연동 유틸리티
// 환경변수에 NOTION_TOKEN, NOTION_DATABASE_ID를 저장하고 사용하세요.


const NOTION_TOKEN = process.env.NOTION_TOKEN;
const MAIN_DB_ID = "94f8a741c0af438c85a104b5958335e7";
const OTHER_DB_ID = "9017d654231149daae77353b8dc1911f";

async function fetchProjects(databaseId: string) {
  const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Notion API error:", res.status, errorText);
    throw new Error(`Failed to fetch projects from Notion: ${res.status} - ${errorText}`);
  }
  const data = await res.json();
  return data.results.map((item: any) => ({
  id: item.id,
  name: item.properties.Name?.title?.[0]?.plain_text || "",
  duration: item.properties.Duration?.rich_text?.[0]?.plain_text || "",
  stacks: item.properties.Stacks?.multi_select?.map((s: any) => s.name) || [],
  github: item.properties.Github?.url || "",
  type: item.properties.Type?.select?.name || "",
  releasable: item.properties.releasable?.checkbox || false,
  }));
}

export async function getMainProjects() {
  return fetchProjects(MAIN_DB_ID);
}

export async function getOtherProjects() {
  return fetchProjects(OTHER_DB_ID);
}
