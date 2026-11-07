import { getBlogPost, getBlogPosts } from "app/lib/posts";
import { PostArticle, postMetadata } from "app/components/post-article";

// Posts come from Notion — re-check every 60s; new slugs render on first visit.
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getBlogPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return postMetadata(await getBlogPost(params.slug, "en"));
}

export default function Post({ params }: { params: { slug: string } }) {
  return <PostArticle slug={params.slug} lang="en" />;
}
