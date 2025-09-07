import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";

export default function Post({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) notFound();

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
      <p className="text-neutral-600">{formatDate(post.metadata.publishedAt)}</p>
      <article className="mt-8">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
