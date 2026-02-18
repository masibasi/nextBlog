import Link from "next/link";
import type { Project } from "../utils/notion";

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects?.length) return <div>No projects yet.</div>;

  const visible = projects.filter((p) => p.releasable === true);
  if (!visible.length) return <div>No releasable projects yet.</div>;

  return (
    <ul className="space-y-4">
      {visible.map((project) => (
        <li key={project.id} className="rounded-xl border p-4">
          <div className="flex items-start justify-between gap-4">
            <Link href={`/projects/${project.id}`} className="font-semibold text-blue-700 dark:text-blue-400 hover:underline">
              {project.title || "Untitled"}
            </Link>
            {project.duration && <span className="shrink-0 text-xs text-gray-500">{project.duration}</span>}
          </div>

          {project.summary && <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{project.summary}</p>}

          <div className="mt-3 flex flex-wrap gap-2">
            {(project.stacks ?? []).map((stack) => (
              <span key={stack} className="rounded-full border px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300">
                {stack}
              </span>
            ))}
          </div>

          <div className="mt-3 flex gap-3 text-xs">
            <Link href={`/projects/${project.id}`} className="underline underline-offset-2">
              Details
            </Link>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                GitHub
              </a>
            )}
            {project.notionUrl && (
              <a href={project.notionUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                Notion
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
