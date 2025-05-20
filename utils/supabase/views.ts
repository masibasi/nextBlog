import { supabase } from "./client";
import { unstable_noStore as noStore } from "next/cache";

export async function getViewsCount(): Promise<{ slug: string; count: number }[]> {
  noStore(); // 캐싱 비활성화
  const { data, error } = await supabase.from("views").select("slug, count");

  if (error) {
    console.error("Error fetching views:", error);
    return [];
  }

  return data || [];
}

export async function incrementViews(slug: string) {
  noStore(); // 캐싱 비활성화
  // 1. 먼저 현재 조회수를 가져옵니다
  const { data: currentData } = await supabase.from("views").select("count").eq("slug", slug).single();

  // 2. 현재 조회수에 1을 더한 값을 upsert합니다
  const newCount = (currentData?.count || 0) + 1;
  const { error } = await supabase.from("views").upsert({ slug, count: newCount }, { onConflict: "slug" });

  if (error) {
    console.error("Error incrementing views:", error);
  }
}
