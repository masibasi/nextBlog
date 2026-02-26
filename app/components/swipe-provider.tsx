"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const PAGE_ORDER = ["/", "/posts", "/about", "/projects", "/resume"];

export function SwipeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;

      // Only fire if horizontal movement is dominant and exceeds threshold
      if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) return;

      const basePath = pathname === "/" ? "/" : "/" + pathname.split("/")[1];
      const currentIndex = PAGE_ORDER.indexOf(basePath);
      if (currentIndex === -1) return;

      if (deltaX < 0) {
        const next = PAGE_ORDER[currentIndex + 1];
        if (next) router.push(next);
      } else {
        const prev = PAGE_ORDER[currentIndex - 1];
        if (prev) router.push(prev);
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pathname, router]);

  return <>{children}</>;
}
