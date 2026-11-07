"use client";
import { useEffect, useState } from "react";
import { ADMIN_COOKIE } from "app/lib/admin";

/**
 * Shown only in browsers that signed in at /admin. The cookie is a visibility
 * flag, not a security boundary — Notion itself decides who can edit the page.
 */
export function EditInNotion({ url }: { url: string | null }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(document.cookie.split("; ").some((c) => c === `${ADMIN_COOKIE}=1`));
  }, []);

  if (!isAdmin || !url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-cardinal-50 text-cardinal-700 border-cardinal-100 hover:bg-cardinal-100 dark:bg-cardinal-900/40 dark:text-cardinal-300 dark:border-cardinal-800 transition-colors"
    >
      Edit in Notion
      <span aria-hidden>↗</span>
    </a>
  );
}
