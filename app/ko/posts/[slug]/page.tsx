import { getBlogPost, getBlogPosts } from "app/lib/posts";
import { PostArticle, postMetadata } from "app/components/post-article";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getBlogPosts("ko")).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return postMetadata(await getBlogPost(params.slug, "ko"));
}

export default function Post({ params }: { params: { slug: string } }) {
  return <PostArticle slug={params.slug} lang="ko" />;
}
