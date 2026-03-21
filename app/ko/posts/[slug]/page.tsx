import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { ViewCount } from "app/components/ViewCount";

export const revalidate = false;

export function generateStaticParams() {
  return getBlogPosts("ko").map((post) => ({ slug: post.slug }));
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getBlogPosts("ko").find((post) => post.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12">
      <section>
        <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
        <ViewCount slug={params.slug} publishedAt={formatDate(post.metadata.publishedAt)} />
        <article className="mt-8">
          <CustomMDX source={post.content} />
        </article>
      </section>
    </div>
  );
}
