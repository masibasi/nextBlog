"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getStroke } from "perfect-freehand";

const PAGE_ORDER = ["/", "/posts", "/about", "/projects", "/resume"];
const FADE_DURATION = 400; // ms — CSS opacity transition after lift

// perfect-freehand stroke outline → Path2D
function strokeToPath(points: number[][]): Path2D {
  if (points.length < 2) return new Path2D();
  const d: string[] = [`M ${points[0][0]} ${points[0][1]} Q`];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    d.push(`${x0} ${y0} ${(x0 + x1) / 2} ${(y0 + y1) / 2}`);
  }
  d.push("Z");
  return new Path2D(d.join(" "));
}

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
    // [x, y, pressure] — pressure simulated via speed
    const pts: [number, number, number][] = [];
    let active = false;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let animId: number | null = null;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;

    const getRgb = () =>
      document.documentElement.classList.contains("dark")
        ? "204,51,51"
        : "153,0,0";

    const removeCanvas = () => {
      if (animId !== null) { cancelAnimationFrame(animId); animId = null; }
      if (fadeTimer !== null) { clearTimeout(fadeTimer); fadeTimer = null; }
      canvas?.remove();
      canvas = null;
      ctx = null;
    };

    const tick = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (pts.length >= 2) {
        const stroke = getStroke(pts, {
          size: 18,
          thinning: 0.6,
          smoothing: 0.5,
          streamline: 0.4,
          last: !active, // finalize shape when finger lifted
        });

        const path = strokeToPath(stroke);
        ctx.fillStyle = `rgba(${getRgb()}, 0.45)`;
        ctx.fill(path);
      }

      animId = requestAnimationFrame(tick);
    };

    const initCanvas = () => {
      if (canvas) return;
      canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.cssText =
        "position:fixed;inset:0;pointer-events:none;z-index:9999;transition:opacity " +
        FADE_DURATION + "ms ease;";
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");
      animId = requestAnimationFrame(tick);
    };

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      active = true;
      pts.length = 0;
      // Cancel any in-progress fade
      if (fadeTimer !== null) { clearTimeout(fadeTimer); fadeTimer = null; }
      if (canvas) canvas.style.opacity = "1";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!active) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = x - startX;
      const dy = y - startY;

      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        if (!canvas) {
          pts.push([startX, startY, 0.5]);
          initCanvas();
        }
        // Simulate pressure from speed (closer points = slower = more pressure)
        const prev = pts[pts.length - 1];
        const dist = prev ? Math.hypot(x - prev[0], y - prev[1]) : 0;
        const pressure = Math.max(0.2, Math.min(1, 1 - dist / 60));
        pts.push([x, y, pressure]);
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

      // Fade out the trail
      if (canvas) {
        canvas.style.opacity = "0";
        fadeTimer = setTimeout(removeCanvas, FADE_DURATION);
      }
      if (animId !== null) { cancelAnimationFrame(animId); animId = null; }
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
