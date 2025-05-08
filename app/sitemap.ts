import { getBlogPosts } from "app/blog/utils";
import { MetadataRoute } from "next";

export const baseUrl = "https://portfolio-blog-starter.vercel.app";

// 크롤러 봇이 사이트를 크롤링할 때, robots.txt 파일을 통해 크롤링하는 페이지 정보를 알 수 있다.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
