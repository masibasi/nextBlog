import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";

type PostsProps = {
  lang?: string;
};

export async function Posts({ lang }: PostsProps = {}) {
  // getBlogPosts already returns newest first
  const allPosts = await getBlogPosts(lang);

  return (
    <div>
      {allPosts.length === 0 && (
        <p className="text-neutral-500 dark:text-neutral-400">{lang === "ko" ? "아직 글이 없어요." : "No posts yet."}</p>
      )}
      {allPosts.map((post) => (
          <Link key={post.slug} className="flex flex-col space-y-1 mb-4 group" href={`/${lang && lang !== "en" ? lang + "/" : ""}posts/${post.slug}`}>
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[120px] tabular-nums">{formatDate(post.metadata.publishedAt, false)}</p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-1 group-hover:text-cardinal-700 dark:group-hover:text-cardinal-400 transition-colors">{post.metadata.title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
