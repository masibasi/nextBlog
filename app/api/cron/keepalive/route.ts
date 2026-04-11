import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const expected = process.env.CRON_SECRET;

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("views").select("slug").limit(1);
  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message, checkedAt: new Date().toISOString() },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString() });
}
