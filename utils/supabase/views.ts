import { getSupabaseClient } from "./client";
import { unstable_noStore as noStore } from "next/cache";

export async function getViewsCount(): Promise<{ slug: string; count: number }[]> {
  noStore();
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase.from("views").select("slug, count");

  if (error) {
    console.error("Error fetching views:", error);
    return [];
  }

  return data || [];
}

export async function getViewCount(slug: string): Promise<number> {
  noStore();
  const supabase = getSupabaseClient();
  if (!supabase) return 0;

  const { data, error } = await supabase.from("views").select("count").eq("slug", slug).maybeSingle();
  if (error) {
    console.error("Error fetching view by slug:", error);
    return 0;
  }
  return data?.count ?? 0;
}

export async function incrementViews(slug: string) {
  noStore();
  const supabase = getSupabaseClient();
  if (!supabase) return;

  const { data: currentData } = await supabase.from("views").select("count").eq("slug", slug).single();
  const newCount = (currentData?.count || 0) + 1;

  const { error } = await supabase.from("views").upsert({ slug, count: newCount }, { onConflict: "slug" });

  if (error) {
    console.error("Error incrementing views:", error);
  }
}
