import type { Project } from "../utils/notion";

function AwardBadge() {
  return (
    <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
      Award
    </span>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return <div className="text-neutral-500 dark:text-neutral-400">No projects to show.</div>;
  }

  const visible = projects.filter((p) => p.releasable === true);

  if (visible.length === 0) {
    return <div className="text-neutral-500 dark:text-neutral-400">No projects available yet.</div>;
  }

  const sorted = [...visible].sort((a, b) => {
    const da = a?.duration ? new Date(a.duration).getTime() : 0;
    const db = b?.duration ? new Date(b.duration).getTime() : 0;
    return db - da;
  });

  const featured = sorted.filter((p) => p.featured);
  const regular = sorted.filter((p) => !p.featured);

  return (
    <div className="space-y-8">
      {/* Featured projects — large cards with cover image */}
      {featured.length > 0 && (
        <div className="space-y-4">
          {featured.map((project) => {
            const isAward = project.tags?.includes("Award");
            return (
              <a key={project.id} href={`/projects/${project.id}`} className="block card-warm overflow-hidden group">
                {project.cover ? (
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:opacity-95 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-48 photo-placeholder" />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:underline">
                      {project.title || "Untitled"}
                    </h3>
                    {isAward && <AwardBadge />}
                  </div>
                  {project.summary && (
                    <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {project.summary}
                    </p>
                  )}
                  {project.duration && (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 block">{project.duration}</span>
                  )}
                  {project.stacks && project.stacks.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.stacks.map((stack) => (
                        <span
                          key={stack}
                          className="px-2 py-0.5 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Regular projects — smaller grid cards */}
      {regular.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {regular.map((project) => {
            const isAward = project.tags?.includes("Award");
            return (
              <a key={project.id} href={`/projects/${project.id}`} className="block card-warm p-4 group">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline">
                    {project.title || "Untitled"}
                  </h3>
                  {isAward && <AwardBadge />}
                </div>
                {project.duration && (
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 block">{project.duration}</span>
                )}
                {project.stacks && project.stacks.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.stacks.map((stack) => (
                      <span
                        key={stack}
                        className="px-1.5 py-0.5 text-xs rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
