"use client";
import { useEffect, useRef } from "react";

// Giscus (GitHub Discussions) comments. Renders nothing until the
// NEXT_PUBLIC_GISCUS_* env vars are set — get the values from https://giscus.app
const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO; // "owner/repo"
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Comments";
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

function currentTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** `term` is shared by the en and ko versions so both show the same thread. */
export function Comments({ term, lang }: { term: string; lang: "en" | "ko" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host || !REPO || !REPO_ID || !CATEGORY_ID) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attrs: Record<string, string> = {
      "data-repo": REPO,
      "data-repo-id": REPO_ID,
      "data-category": CATEGORY,
      "data-category-id": CATEGORY_ID,
      "data-mapping": "specific",
      "data-term": term,
      "data-strict": "1",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": currentTheme(),
      "data-lang": lang,
      "data-loading": "lazy",
    };
    Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
    host.appendChild(script);

    // Follow the manual ThemeSwitcher (it toggles `dark` on <html>).
    const observer = new MutationObserver(() => {
      const frame = host.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      frame?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: currentTheme() } } },
        "https://giscus.app"
      );
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      host.innerHTML = "";
    };
  }, [term, lang]);

  if (!REPO || !REPO_ID || !CATEGORY_ID) return null;

  return <div ref={ref} className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800" />;
}
