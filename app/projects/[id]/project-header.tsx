"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "../../../utils/notion";

type Props = {
  project: Project;
  hasAward: boolean;
  displayTags: string[];
};

export function ProjectPageHeader({ project, hasAward, displayTags }: Props) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const animate = !reducedMotion;

  const s = (delay: number, from = "translateY(14px)"): React.CSSProperties =>
    animate
      ? {
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : from,
          transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
          transitionDelay: `${delay}ms`,
        }
      : {};

  return (
    <>
      {/* Breadcrumb — slides in from above */}
      <div style={s(0, "translateY(-10px)")} className="mb-5 flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-2 decoration-neutral-300 dark:decoration-neutral-600 transition-colors"
        >
          ← Projects
        </Link>
        {project.notionUrl && (
          <a
            href={project.notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-cardinal-700 dark:hover:text-cardinal-400 transition-colors"
          >
            View in Notion ↗
          </a>
        )}
      </div>

      {/* Cover — subtle scale-up */}
      {project.cover && (
        <div
          style={
            animate
              ? {
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "scale(1)" : "scale(0.99)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 40ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 40ms",
                }
              : {}
          }
          className="mb-6"
        >
          <img
            src={project.cover}
            alt="cover"
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Header metadata — staggered from top to bottom */}
      <div className="mb-8">
        <div style={s(60)} className="flex items-start gap-3 flex-wrap mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h1>
          {hasAward && (
            <span className="mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
              Award
            </span>
          )}
        </div>

        {project.summary && (
          <p style={s(100)} className="text-neutral-500 dark:text-neutral-400 mb-3 leading-relaxed">
            {project.summary}
          </p>
        )}

        {project.duration && (
          <p style={s(130)} className="text-sm text-neutral-400 dark:text-neutral-500 mb-3">
            {project.duration}
          </p>
        )}

        {(project.stacks ?? []).length > 0 && (
          <div style={s(150)} className="flex flex-wrap gap-2 mb-3">
            {(project.stacks ?? []).map((stack) => (
              <span
                key={stack}
                className="px-2 py-1 rounded-md border text-xs font-medium bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
              >
                {stack}
              </span>
            ))}
          </div>
        )}

        {displayTags.length > 0 && (
          <div style={s(170)} className="flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded border text-xs text-neutral-500 dark:text-neutral-400 border-neutral-300 dark:border-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
