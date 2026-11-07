// Posts now live in Notion (NOTION_POSTS_DB_ID). This module keeps the old
// import path so callers don't need to know where posts come from.
import { getPosts, getPost, type Post } from "utils/notion";

export type { Post };

export function getBlogPosts(lang?: string): Promise<Post[]> {
  return getPosts(lang === "ko" ? "ko" : "en");
}

export function getBlogPost(slug: string, lang?: string): Promise<Post | undefined> {
  return getPost(slug, lang === "ko" ? "ko" : "en");
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
