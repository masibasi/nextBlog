import Link from "next/link";
import type { Project } from "../utils/notion";

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects?.length) return <div>No projects yet.</div>;

  const visible = projects.filter((p) => p.releasable === true);
  if (!visible.length) return <div>No releasable projects yet.</div>;

  return (
    <ul className="space-y-8">
      {visible.map((project) => (
        <li key={project.id} className="w-full rounded-2xl border p-7 sm:p-8 bg-white/60 dark:bg-neutral-900/40">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
            <h3 className="min-w-0 text-[18px] leading-snug font-semibold text-neutral-900 dark:text-neutral-100 break-words">
              <Link href={`/projects/${project.id}`} className="hover:underline underline-offset-4">
                {project.title || "Untitled"}
              </Link>
            </h3>
            {project.duration && (
              <span className="self-start shrink-0 rounded-full border px-2.5 py-1 text-xs text-neutral-500 dark:text-neutral-400">
                {project.duration}
              </span>
            )}
          </div>

          {project.summary && <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 break-words">{project.summary}</p>}

          {(project.stacks ?? []).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2.5">
              {(project.stacks ?? []).map((stack) => (
                <span key={stack} className="rounded-full border px-2.5 py-1 text-xs text-neutral-600 dark:text-neutral-300">
                  {stack}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 text-sm">
            <Link href={`/projects/${project.id}`} className="font-medium underline underline-offset-2">
              View project →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
