type WorkItem = {
  role: string;
  org: string;
  period: string;
  type: "Work" | "Research" | "Education";
};

const TYPE_STYLES: Record<WorkItem["type"], string> = {
  Work: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
  Research: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  Education: "bg-cardinal-50 dark:bg-cardinal-900/20 text-cardinal-700 dark:text-cardinal-300",
};

type Props = {
  items: WorkItem[];
};

export function NowSection({ items }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.org}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[14px] px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-900/5 dark:hover:shadow-black/20 hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <div className="text-[11px] text-neutral-400 dark:text-neutral-500 mb-2 tracking-[0.02em]">
            {item.period}
          </div>
          <div className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 mb-0.5">
            {item.role}
          </div>
          <div className="text-[13px] text-neutral-500 dark:text-neutral-400">
            {item.org}
          </div>
          <span
            className={`inline-block mt-3.5 text-[10px] font-medium tracking-[0.06em] px-2.5 py-1 rounded-full ${TYPE_STYLES[item.type]}`}
          >
            {item.type}
          </span>
        </div>
      ))}
    </div>
  );
}
