import Link from "next/link";
import { formatDate } from "app/blog/utils";

type Post = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
  };
};

type Props = {
  posts: Post[];
};

export function WritingList({ posts }: Props) {
  if (posts.length === 0) {
    return (
      <p className="text-[14px] text-neutral-400 dark:text-neutral-500">No posts yet.</p>
    );
  }

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/posts/${post.slug}`}
          className="flex items-baseline gap-6 py-4 border-b border-neutral-200 dark:border-neutral-800 group transition-all duration-200 hover:pl-2"
        >
          <span className="text-[12px] text-neutral-500 dark:text-neutral-400 tabular-nums min-w-[100px] flex-shrink-0">
            {formatDate(post.metadata.publishedAt, false)}
          </span>
          <span className="text-[15px] font-medium text-neutral-900 dark:text-neutral-50 flex-1">
            {post.metadata.title}
          </span>
          <span className="text-neutral-400 dark:text-neutral-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
