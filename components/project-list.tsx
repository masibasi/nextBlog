import Link from "next/link";
import type { Project } from "../utils/notion";

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects?.length) return <div>No projects yet.</div>;

  const visible = projects.filter((p) => p.releasable === true);
  if (!visible.length) return <div>No releasable projects yet.</div>;

  return (
    <ul className="space-y-5">
      {visible.map((project) => (
        <li key={project.id} className="rounded-xl border p-5">
          <div className="flex items-start justify-between gap-4">
            <Link href={`/projects/${project.id}`} className="font-semibold text-blue-700 dark:text-blue-400 hover:underline">
              {project.title || "Untitled"}
            </Link>
            {project.duration && <span className="shrink-0 text-xs text-gray-500">{project.duration}</span>}
          </div>

          {project.summary && <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{project.summary}</p>}

          {(project.stacks ?? []).length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {(project.stacks ?? []).map((stack) => (
                <span key={stack} className="rounded-full border px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300">
                  {stack}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 text-sm">
            <Link href={`/projects/${project.id}`} className="underline underline-offset-2">
              View project →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
