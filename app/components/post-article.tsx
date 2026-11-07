import { notFound, redirect } from "next/navigation";
import { formatDate, getBlogPost } from "app/lib/posts";
import { baseUrl } from "app/sitemap";
import { NotionBlocks, fetchBlocks } from "app/components/notion-blocks";
import { EditInNotion } from "app/components/edit-in-notion";
import { Comments } from "app/components/comments";
import type { Post } from "utils/notion";

export function absoluteImage(post: Post) {
  const { image, title } = post.metadata;
  if (!image) return `${baseUrl}/og?title=${encodeURIComponent(title)}`;
  return image.startsWith("http") ? image : `${baseUrl}${image}`;
}

export function postPath(slug: string, lang: "en" | "ko") {
  return `${lang === "ko" ? "/ko" : ""}/posts/${slug}`;
}

export function postMetadata(post: Post | undefined) {
  if (!post) return {};
  const { title, publishedAt: publishedTime, summary: description } = post.metadata;
  const ogImage = absoluteImage(post);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}${postPath(post.slug, post.lang)}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function PostArticle({ slug, lang }: { slug: string; lang: "en" | "ko" }) {
  const post = await getBlogPost(slug, lang);
  if (!post) {
    // Language toggle on a post that only exists in the other language:
    // send the reader to this language's list instead of a 404.
    const other = await getBlogPost(slug, lang === "ko" ? "en" : "ko");
    if (other) redirect(lang === "ko" ? "/ko/posts" : "/posts");
    notFound();
  }

  const blocks = await fetchBlocks(post.id);

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12">
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: absoluteImage(post),
              url: `${baseUrl}${postPath(post.slug, lang)}`,
              inLanguage: lang,
              author: { "@type": "Person", name: "Jimin Lee" },
            }),
          }}
        />
        <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
        <div className="mt-2 mb-8 flex flex-wrap items-center gap-3">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
          <EditInNotion url={post.notionUrl} />
        </div>

        {post.metadata.image && (
          <img
            src={post.metadata.image}
            alt=""
            className="mb-8 w-full rounded-xl object-cover max-h-[420px]"
          />
        )}

        <article className="mt-8">
          <NotionBlocks blocks={blocks} />
        </article>

        <Comments term={post.slug} lang={lang} />
      </section>
    </div>
  );
}
