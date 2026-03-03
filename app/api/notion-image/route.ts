import { NextRequest, NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_VERSION = "2022-06-28";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const pageId = searchParams.get("pageId");
  const blockId = searchParams.get("blockId");

  let imageUrl: string | null = null;

  if (pageId) {
    const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
      },
      cache: "no-store",
    });
    if (!res.ok) return new NextResponse(null, { status: 404 });
    const data = await res.json();
    imageUrl = data.cover?.external?.url ?? data.cover?.file?.url ?? null;
  } else if (blockId) {
    const res = await fetch(`https://api.notion.com/v1/blocks/${blockId}`, {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
      },
      cache: "no-store",
    });
    if (!res.ok) return new NextResponse(null, { status: 404 });
    const data = await res.json();
    imageUrl = data.image?.external?.url ?? data.image?.file?.url ?? null;
  }

  if (!imageUrl) return new NextResponse(null, { status: 404 });

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) return new NextResponse(null, { status: 502 });

  return new NextResponse(imgRes.body, {
    headers: {
      "Content-Type": imgRes.headers.get("Content-Type") ?? "image/jpeg",
      // 50분 캐시 — Notion file URL 1시간 만료 전에 재검증
      // s-maxage: Vercel CDN edge에도 캐싱 (같은 이미지는 edge에서 바로 서빙)
      "Cache-Control": "public, max-age=3000, s-maxage=3000, stale-while-revalidate=600",
    },
  });
}
