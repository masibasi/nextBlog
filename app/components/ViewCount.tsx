interface ViewCountProps {
  count: number;
  publishedAt: string;
}

export function ViewCount({ count, publishedAt }: ViewCountProps) {
  return (
    <div className="flex justify-between items-center mt-2 mb-8 text-sm">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{publishedAt}</p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{count.toLocaleString()} views</p>
    </div>
  );
}
