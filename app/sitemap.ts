import { getBlogPosts } from "app/lib/posts";
import { getAllProjects } from "utils/notion";
import { MetadataRoute } from "next";
import { SITE_URL } from "app/data/site";

export const baseUrl = SITE_URL;

// 크롤러 봇이 사이트를 크롤링할 때, robots.txt 파일을 통해 크롤링하는 페이지 정보를 알 수 있다.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0];

  const routes = ["", "/projects", "/about", "/resume", "/posts", "/ko/posts"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: today,
  }));

  const enPosts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const koPosts = getBlogPosts("ko").map((post) => ({
    url: `${baseUrl}/ko/posts/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getAllProjects();
    projectRoutes = projects
      .filter((p) => p.releasable)
      .map((p) => ({
        url: `${baseUrl}/projects/${p.id}`,
        lastModified: p.duration ?? today,
      }));
  } catch {
    // Notion unavailable at build time — sitemap should never 500
  }

  return [...routes, ...enPosts, ...koPosts, ...projectRoutes];
}
