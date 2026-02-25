"use client";

import { useEffect, useState } from "react";

interface ViewCountProps {
  slug: string;
  publishedAt: string;
}

export function ViewCount({ slug, publishedAt }: ViewCountProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let aborted = false;
    async function bump() {
      try {
        const key = `viewed:${slug}`;
        const now = Date.now();
        const recent = (() => {
          try {
            const raw = localStorage.getItem(key);
            return raw ? now - Number(raw) < 3 * 60 * 1000 : false; // 3 minutes window
          } catch {
            return false;
          }
        })();

        const method = recent ? "GET" : "POST";
        const res = await fetch(`/api/views/${encodeURIComponent(slug)}`, { method });
        if (!res.ok) return;
        const data = (await res.json()) as { count?: number };
        if (!aborted && typeof data.count === "number") {
          setViews(data.count);
        }

        if (!recent) {
          try {
            localStorage.setItem(key, String(now));
          } catch {
            // ignore
          }
        }
      } catch (e) {
        // ignore
      }
    }
    bump();
    return () => {
      aborted = true;
    };
  }, [slug]);

  return (
    <div className="flex justify-between items-center mt-2 mb-8 text-sm">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{publishedAt}</p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {views !== null ? `${views.toLocaleString()} views` : ""}
      </p>
    </div>
  );
}
