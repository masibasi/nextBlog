"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { CALENDLY_URL } from "app/data/site";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

// Calendly takes 6-digit hex without the leading "#".
const LIGHT = { background: "f9f8f4", text: "171717", primary: "990000" };
const DARK = { background: "0a0a0a", text: "e5e5e5", primary: "cc3333" };

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

function buildUrl(isDark: boolean) {
  const c = isDark ? DARK : LIGHT;
  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    background_color: c.background,
    text_color: c.text,
    primary_color: c.primary,
  });
  return `${CALENDLY_URL}?${params}`;
}

export function CalendlySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Gate the third-party script on scroll proximity so the homepage's initial
  // load requests nothing from Calendly.
  const [shouldLoad, setShouldLoad] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // No theme provider — ThemeSwitcher toggles `dark` on <html> directly, so
  // watch that class to keep the iframe's palette in sync.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const url = buildUrl(isDark);

  // widget.js only auto-scans for `.calendly-inline-widget` when it first loads,
  // so mount (and remount on theme change) explicitly.
  useEffect(() => {
    const el = widgetRef.current;
    if (!shouldLoad || !scriptReady || !el || !window.Calendly) return;

    el.innerHTML = "";
    window.Calendly.initInlineWidget({ url, parentElement: el });
  }, [shouldLoad, scriptReady, url]);

  return (
    <div ref={sectionRef}>
      {shouldLoad && (
        <Script
          src={WIDGET_SRC}
          strategy="lazyOnload"
          onLoad={() => setScriptReady(true)}
        />
      )}

      <div
        ref={widgetRef}
        className="photo-placeholder h-[700px] min-w-[320px] overflow-hidden"
      />

      <p className="mt-4 text-[13px] text-neutral-500 dark:text-neutral-400">
        Prefer a direct link?{" "}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cardinal-700 dark:text-cardinal-400 hover:text-cardinal-800 dark:hover:text-cardinal-300 transition-colors group inline-flex items-center gap-1"
        >
          Open in Calendly
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </p>
    </div>
  );
}
