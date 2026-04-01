"use client";

import { useState, useEffect, useRef } from "react";

const CONTACTS = [
  {
    label: "Email",
    href: "mailto:leejimin@usc.edu",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jiminlee4015/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/masibasi",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/naive_jimin",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

export function ContactButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-[13px] text-neutral-900 dark:text-neutral-100 tracking-[0.02em] flex items-center gap-1.5 group font-medium"
      >
        Get in touch
        <span
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          →
        </span>
      </button>

      <div
        className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl overflow-hidden min-w-[160px]"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1), transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {CONTACTS.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-[13px] text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-cardinal-700 dark:hover:text-cardinal-400 transition-colors"
          >
            {icon}
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
