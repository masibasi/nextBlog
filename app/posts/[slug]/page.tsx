import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { ViewCount } from "app/components/ViewCount";
import { unstable_noStore as noStore } from "next/cache";
import { getViewCount } from "utils/supabase/views";

export default async function Post({ params }: { params: { slug: string } }) {
  noStore();
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) notFound();

  // Only read current count on the server; increment happens client-side to avoid prefetch double counts
  const count = await getViewCount(params.slug);

  return (
    <section className="max-w-2xl">
      <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
      <ViewCount slug={params.slug} count={count} publishedAt={formatDate(post.metadata.publishedAt)} />
      <article className="mt-8">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
