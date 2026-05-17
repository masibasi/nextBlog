import type { Project } from "../utils/notion";

function AwardBadge() {
  return (
    <span className="shrink-0 px-2.5 py-1 text-[11px] font-medium rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700">
      Award
    </span>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return <div className="text-neutral-600 dark:text-neutral-400">No projects to show.</div>;
  }

  const visible = projects.filter((p) => p.releasable === true);

  if (visible.length === 0) {
    return <div className="text-neutral-600 dark:text-neutral-400">No projects available yet.</div>;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => {
            const isAward = project.tags?.includes("Award");
            return (
              <a
                key={project.id}
                href={`/projects/${project.id}`}
                className="group block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-600"
              >
                <div className="relative overflow-hidden bg-warm-100 dark:bg-neutral-800 aspect-[4/3]">
                  {project.cover ? (
                    <img
                      src={project.cover}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full photo-placeholder" />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900/15 via-transparent to-transparent" />
                </div>
                <div className="p-6 md:p-7">
                  {isAward && (
                    <div className="mb-2.5">
                      <AwardBadge />
                    </div>
                  )}
                  <h3 className="font-semibold text-[18px] text-neutral-900 dark:text-neutral-50 tracking-[-0.01em] leading-snug">
                    {project.title || "Untitled"}
                  </h3>
                  {project.summary && (
                    <p className="mt-2 text-[14px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {project.summary}
                    </p>
                  )}
                  {project.duration && (
                    <span className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-2 block">
                      {project.duration}
                    </span>
                  )}
                  {project.stacks && project.stacks.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stacks.map((stack) => (
                        <span
                          key={stack}
                          className="px-2.5 py-1 text-[11px] rounded-full bg-warm-50 dark:bg-warm-900/20 text-warm-800 dark:text-warm-300 border border-warm-200 dark:border-warm-700/40"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regular.map((project) => {
            const isAward = project.tags?.includes("Award");
            return (
              <a
                key={project.id}
                href={`/projects/${project.id}`}
                className="group block bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-[14px] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-600"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-[15px] text-neutral-900 dark:text-neutral-50 tracking-[-0.01em] leading-snug">
                    {project.title || "Untitled"}
                  </h3>
                  {isAward && <AwardBadge />}
                </div>
                {project.duration && (
                  <span className="text-[12px] text-neutral-500 dark:text-neutral-400 block mb-2">
                    {project.duration}
                  </span>
                )}
                {project.stacks && project.stacks.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.stacks.map((stack) => (
                      <span
                        key={stack}
                        className="px-2.5 py-1 text-[11px] rounded-full bg-warm-50 dark:bg-warm-900/20 text-warm-800 dark:text-warm-300 border border-warm-200 dark:border-warm-700/40"
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
