"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const PAGE_ORDER = ["/", "/posts", "/about", "/projects", "/resume"];

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

    const createRipple = (x: number, y: number) => {
      const el = document.createElement("div");
      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
      el.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: ${color};
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = "translate(-50%, -50%) scale(1)";
        el.style.opacity = "1";
      });
      return el;
    };

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      rippleEl = createRipple(startX, startY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!rippleEl) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      rippleEl.style.left = `${x}px`;
      rippleEl.style.top = `${y}px`;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;

      // Fade out ripple
      if (rippleEl) {
        const el = rippleEl;
        el.style.transform = "translate(-50%, -50%) scale(1.8)";
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 250);
        rippleEl = null;
      }

      // Only fire if horizontal movement is dominant and exceeds threshold
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
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("touchcancel", handleTouchCancel, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
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
