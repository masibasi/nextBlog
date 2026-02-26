"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const PAGE_ORDER = ["/", "/posts", "/about", "/projects", "/resume"];

// cardinal-700 = #990000, cardinal-400 = #cc3333
const RIPPLE_COLOR_LIGHT = "rgba(153, 0, 0, 0.12)";
const RIPPLE_COLOR_DARK = "rgba(204, 51, 51, 0.15)";

export function SwipeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only enable swipe on top-level nav pages (not sub-pages like /projects/abc or /posts/slug)
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 1) return;

    const basePath = segments.length === 0 ? "/" : "/" + segments[0];
    const currentIndex = PAGE_ORDER.indexOf(basePath);
    if (currentIndex === -1) return;

    let startX = 0;
    let startY = 0;
    let rippleEl: HTMLDivElement | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;

      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? RIPPLE_COLOR_DARK : RIPPLE_COLOR_LIGHT;

      rippleEl = document.createElement("div");
      rippleEl.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: ${color};
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.22s ease, opacity 0.22s ease;
        opacity: 0;
      `;
      document.body.appendChild(rippleEl);
      requestAnimationFrame(() => {
        if (rippleEl) {
          rippleEl.style.transform = "translate(-50%, -50%) scale(1)";
          rippleEl.style.opacity = "1";
        }
      });
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;

      if (rippleEl) {
        const el = rippleEl;
        el.style.transform = "translate(-50%, -50%) scale(1.6)";
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 250);
        rippleEl = null;
      }

      if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) return;

      if (deltaX < 0) {
        const next = PAGE_ORDER[currentIndex + 1];
        if (next) router.push(next);
      } else {
        const prev = PAGE_ORDER[currentIndex - 1];
        if (prev) router.push(prev);
      }
    };

    const handleTouchCancel = () => {
      if (rippleEl) {
        rippleEl.remove();
        rippleEl = null;
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("touchcancel", handleTouchCancel, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchCancel);
      if (rippleEl) {
        rippleEl.remove();
        rippleEl = null;
      }
    };
  }, [pathname, router]);

  return <>{children}</>;
}
