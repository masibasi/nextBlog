import { getBlogPosts } from "app/lib/posts";
import { WritingList } from "app/components/home/writing-list";

type PostsProps = {
  lang?: "en" | "ko";
};

// Same list style as the homepage Writing section. Newest first.
export async function Posts({ lang = "en" }: PostsProps = {}) {
  const posts = await getBlogPosts(lang);
  return <WritingList posts={posts} lang={lang} />;
}
