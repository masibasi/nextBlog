import type { Project } from "utils/notion";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <a
      href={`/projects/${project.id}`}
      className="group block bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-[14px] overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-600"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-warm-100 dark:bg-neutral-800 overflow-hidden relative">
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full photo-placeholder" />
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        {project.tags?.includes("Award") && (
          <span className="inline-block mb-2.5 text-[11px] font-medium tracking-[0.05em] px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700">
            Award
          </span>
        )}
        <h3 className="text-[16px] font-semibold text-neutral-900 dark:text-neutral-50 mb-1.5 tracking-[-0.01em] leading-snug">
          {project.title}
        </h3>
        {project.summary && (
          <p className="text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2 mb-3.5">
            {project.summary}
          </p>
        )}
        {project.stacks && project.stacks.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.stacks.slice(0, 4).map((stack) => (
              <span
                key={stack}
                className="text-[11px] bg-warm-50 dark:bg-warm-900/20 text-warm-800 dark:text-warm-300 border border-warm-200 dark:border-warm-700/40 px-2.5 py-1 rounded-full"
              >
                {stack}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
