import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  linkText?: string;
};

export function SectionHeader({ label, href, linkText }: Props) {
  return (
    <div className="flex justify-between items-baseline mb-9">
      <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-neutral-400 dark:text-neutral-500">
        {label}
      </span>
      {href && linkText && (
        <Link
          href={href}
          className="text-[13px] text-cardinal-700 dark:text-cardinal-400 hover:text-cardinal-800 dark:hover:text-cardinal-300 transition-colors flex items-center gap-1 group"
        >
          {linkText}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  );
}
