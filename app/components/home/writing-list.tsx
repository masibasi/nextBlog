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
          className="flex items-baseline gap-6 py-4 border-b border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 group transition-all duration-300 hover:pl-1"
        >
          {/* Date warms slightly on hover */}
          <span className="text-[12px] text-neutral-400 dark:text-neutral-500 tabular-nums min-w-[100px] flex-shrink-0 transition-colors duration-300 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
            {formatDate(post.metadata.publishedAt, false)}
          </span>

          {/* Title warms to cardinal */}
          <span className="text-[15px] font-medium text-neutral-900 dark:text-neutral-50 flex-1 transition-colors duration-300 group-hover:text-cardinal-700 dark:group-hover:text-cardinal-400">
            {post.metadata.title}
          </span>

          {/* Arrow: starts subtle, moves more expressively on hover */}
          <span className="text-neutral-300 dark:text-neutral-600 transition-all duration-300 group-hover:translate-x-2 group-hover:text-cardinal-700 dark:group-hover:text-cardinal-400">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
