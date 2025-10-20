import { NextRequest, NextResponse } from "next/server";
import { getViewCount, incrementViews } from "@/utils/supabase/views";

export async function POST(_req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  await incrementViews(slug);
  const count = await getViewCount(slug);
  return NextResponse.json({ count });
}

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  const count = await getViewCount(slug);
  return NextResponse.json({ count });
}
