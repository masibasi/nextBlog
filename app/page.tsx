import Link from "next/link";
import Image from "next/image";
import { Posts } from "app/components/posts";
import { getMainProjects, getOtherProjects } from "../utils/notion";

export const revalidate = 3600;

const currentWork = [
  {
    role: "Web Team Lead",
    org: "USC Interaction Lab",
    period: "Jan 2026 – Present",
  },
  {
    role: "Graduate Research Intern",
    org: "USC AI for Health Lab",
    period: "Sep 2025 – Present",
  },
  {
    role: "M.S. Computer Science (AI)",
    org: "University of Southern California",
    period: "Aug 2025 – May 2027",
  },
];

export default async function Page() {
  // Fetch featured projects for homepage preview
  let featuredProjects: Awaited<ReturnType<typeof getMainProjects>> = [];
  try {
    const [main, other] = await Promise.all([getMainProjects(), getOtherProjects()]);
    const all = [...main, ...other].filter((p) => p.releasable && p.featured);
    featuredProjects = all
      .sort((a, b) => {
        const da = a.duration ? new Date(a.duration).getTime() : 0;
        const db = b.duration ? new Date(b.duration).getTime() : 0;
        return db - da;
      })
      .slice(0, 2);
  } catch {
    // graceful fallback — show nothing
  }

  return (
    <section className="space-y-16">
      {/* Hero: photo + intro */}
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="shrink-0">
          <Image
            src="/me.jpg"
            alt="Ji Min Lee"
            width={176}
            height={176}
            className="rounded-xl shadow-md w-36 h-36 sm:w-44 sm:h-44 object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
            Ji Min Lee
          </h1>
          <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
            Software engineer and AI researcher at USC. I build full-stack systems, work on
            human-centered AI, and care about software that's useful in the real world. Currently
            leading web development at the{" "}
            <strong className="text-neutral-900 dark:text-neutral-100">USC Interaction Lab</strong>{" "}
            and doing research at the{" "}
            <strong className="text-neutral-900 dark:text-neutral-100">AI for Health Lab</strong>.
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a
              href="https://github.com/masibasi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 dark:text-neutral-400 hover:text-cardinal-700 dark:hover:text-cardinal-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jiminlee4015/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 dark:text-neutral-400 hover:text-cardinal-700 dark:hover:text-cardinal-400 transition-colors"
            >
              LinkedIn
            </a>
            <Link
              href="/resume"
              className="text-neutral-500 dark:text-neutral-400 hover:text-cardinal-700 dark:hover:text-cardinal-400 transition-colors"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>

      {/* What I'm working on */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
          Now
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentWork.map((item) => (
            <div key={item.org} className="card-warm p-4">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{item.period}</div>
              <div className="font-medium text-sm text-neutral-900 dark:text-neutral-100">{item.role}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{item.org}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Projects
            </h2>
            <Link
              href="/projects"
              className="text-xs text-cardinal-700 dark:text-cardinal-400 hover:text-cardinal-800 dark:hover:text-cardinal-300 transition-colors"
            >
              All projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredProjects.map((project) => (
              <a key={project.id} href={`/projects/${project.id}`} className="block card-warm overflow-hidden group">
                {project.cover ? (
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-36 object-cover group-hover:opacity-95 transition-opacity"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-36 photo-placeholder" />
                )}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-sm text-neutral-900 dark:text-neutral-100 group-hover:underline">
                      {project.title}
                    </div>
                    {project.tags?.includes("Award") && (
                      <span className="shrink-0 px-2 py-0.5 text-xs font-medium rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                        Award
                      </span>
                    )}
                  </div>
                  {project.summary && (
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  )}
                  {project.stacks && project.stacks.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {project.stacks.slice(0, 4).map((stack) => (
                        <span
                          key={stack}
                          className="px-1.5 py-0.5 text-xs rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Writing
          </h2>
          <Link
            href="/posts"
            className="text-xs text-cardinal-700 dark:text-cardinal-400 hover:text-cardinal-800 dark:hover:text-cardinal-300 transition-colors"
          >
            All posts →
          </Link>
        </div>
        <Posts />
      </div>
    </section>
  );
}
