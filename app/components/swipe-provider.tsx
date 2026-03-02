"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const PAGE_ORDER = ["/", "/posts", "/about", "/projects", "/resume"];
const TRAIL_DURATION = 500; // ms trail persists after lift

export function SwipeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 1) return;

    const basePath = segments.length === 0 ? "/" : "/" + segments[0];
    const currentIndex = PAGE_ORDER.indexOf(basePath);
    if (currentIndex === -1) return;

    let startX = 0;
    let startY = 0;
    const pts: { x: number; y: number; t: number }[] = [];
    let active = false;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let animId: number | null = null;

    const getRgb = () =>
      document.documentElement.classList.contains("dark")
        ? "204,51,51"
        : "153,0,0";

    const removeCanvas = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      canvas?.remove();
      canvas = null;
      ctx = null;
    };

    const tick = () => {
      if (!ctx || !canvas) return;
      const now = Date.now();

      // Prune expired points
      while (pts.length > 0 && now - pts[0].t > TRAIL_DURATION) pts.shift();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!active && pts.length === 0) {
        removeCanvas();
        return;
      }

      const c = getRgb();

      // Draw tapered trail — thicker/brighter at head, thinner/dimmer at tail
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const age = now - b.t;
        const progress = 1 - age / TRAIL_DURATION;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${c},${progress * 0.55})`;
        ctx.lineWidth = Math.max(2, 24 * progress);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Glowing dot at current finger position
      if (active && pts.length > 0) {
        const head = pts[pts.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},0.18)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(head.x, head.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},0.45)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    const initCanvas = () => {
      if (canvas) return;
      canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.cssText =
        "position:fixed;inset:0;pointer-events:none;z-index:9999;";
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");
      animId = requestAnimationFrame(tick);
    };

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      active = true;
      pts.length = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!active) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = x - startX;
      const dy = y - startY;

      // Only draw trail once horizontal intent is clear
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        if (!canvas) {
          // Retroactively add start point so trail begins from touch origin
          pts.push({ x: startX, y: startY, t: Date.now() - 80 });
          initCanvas();
        }
        pts.push({ x, y, t: Date.now() });
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      active = false;
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;

      if (Math.abs(deltaX) >= 60 && Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX < 0) {
          const next = PAGE_ORDER[currentIndex + 1];
          if (next) router.push(next);
        } else {
          const prev = PAGE_ORDER[currentIndex - 1];
          if (prev) router.push(prev);
        }
      }
      // Trail fades out naturally via tick loop
    };

    const handleTouchCancel = () => {
      active = false;
      pts.length = 0;
      removeCanvas();
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
      active = false;
      removeCanvas();
    };
  }, [pathname, router]);

  return <>{children}</>;
}
