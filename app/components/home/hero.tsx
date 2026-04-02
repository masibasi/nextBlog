"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TypedRole } from "./typed-role";
import { ContactButton } from "./contact-button";

const ROLES = ["ML Engineer", "AI Researcher", "Full-Stack Dev", "Human-AI Builder"];

type FloatTag = {
  key: string;
  className: string;
  animStyle: React.CSSProperties;
  accent: boolean;
  depth: number;
  content: React.ReactNode;
};

const FLOAT_TAGS: FloatTag[] = [
  {
    key: "viterbi",
    className: "top-[8%] -left-[14%]",
    animStyle: { animation: "floatA 4s ease-in-out infinite" },
    accent: false,
    depth: 18,
    content: (
      <Image
        src="/Formal_Viterbi_CardOnWhite-removebg-preview.png"
        alt="USC Viterbi"
        width={140}
        height={40}
        className="h-[28px] w-auto object-contain dark:brightness-0 dark:invert"
      />
    ),
  },
  {
    key: "award",
    className: "top-[32%] -right-[12%]",
    animStyle: { animation: "floatB 4.5s ease-in-out infinite" },
    accent: true,
    depth: -24,
    content: "1st Place · SE & CE · GVO Buildathon",
  },
  {
    key: "ilab",
    className: "bottom-[32%] -left-[16%]",
    animStyle: { animation: "floatC 5s ease-in-out infinite" },
    accent: false,
    depth: 14,
    content: "USC Interaction Lab",
  },
  {
    key: "health",
    className: "bottom-[18%] -right-[10%]",
    animStyle: { animation: "floatD 3.5s ease-in-out infinite" },
    accent: false,
    depth: -20,
    content: "AI for Health Lab",
  },
];

const ENTER_FROM = [
  "translate(-20px, 0)",
  "translate(-28px, 0)",
  "translate(-16px, 0)",
  "translate(0, 18px)",
  "translate(0, 22px)",
];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  // iOS 13+: gyro needs explicit permission via user gesture
  const [gyroHint, setGyroHint] = useState(false);

  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const tagOuterRefs = useRef<(HTMLDivElement | null)[]>(Array(FLOAT_TAGS.length).fill(null));
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  // Holds the iOS permission-request function so the hint button can call it
  const gyroStartRef = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let removeInputListener: (() => void) | undefined;

    if (!isTouch) {
      // Desktop: mouse tracking
      const onMouseMove = (e: MouseEvent) => {
        target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      removeInputListener = () => window.removeEventListener("mousemove", onMouseMove);

    } else if ("DeviceOrientationEvent" in window) {
      // Mobile: gyroscope
      // ±RANGE degrees of tilt maps to ±1 normalized
      const RANGE = 25;
      let initialBeta: number | null = null;
      let initialGamma: number | null = null;

      const startGyro = () => {
        const onOrientation = (e: DeviceOrientationEvent) => {
          if (e.beta === null || e.gamma === null) return;
          // Calibrate on first reading — wherever phone is held becomes "center"
          if (initialBeta === null) initialBeta = e.beta;
          if (initialGamma === null) initialGamma = e.gamma;
          target.current.x = Math.max(-1, Math.min(1, (e.gamma - initialGamma!) / RANGE));
          target.current.y = Math.max(-1, Math.min(1, (e.beta  - initialBeta!)  / RANGE));
        };
        window.addEventListener("deviceorientation", onOrientation);
        removeInputListener = () => window.removeEventListener("deviceorientation", onOrientation);
        setGyroHint(false);
      };

      // iOS 13+ blocks DeviceOrientationEvent until requestPermission() is called
      // from a user gesture. Android works without any permission.
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        setGyroHint(true);
        gyroStartRef.current = async () => {
          try {
            const perm = await (DeviceOrientationEvent as any).requestPermission();
            if (perm === "granted") startGyro();
            else setGyroHint(false); // user declined — hide the prompt
          } catch {
            setGyroHint(false);
          }
        };
      } else {
        startGyro(); // Android or older iOS — just go
      }
    }

    // rAF loop — identical for mouse and gyro (both update target.current)
    const loop = () => {
      const s = isTouch ? 0.08 : 0.06; // slightly snappier on gyro
      mouse.current.x = lerp(mouse.current.x, target.current.x, s);
      mouse.current.y = lerp(mouse.current.y, target.current.y, s);

      const { x, y } = mouse.current;

      if (photoWrapperRef.current) {
        photoWrapperRef.current.style.transform =
          `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) rotate(1.5deg)`;
      }

      tagOuterRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = FLOAT_TAGS[i].depth;
        el.style.transform = `translate(${x * d}px, ${y * d * 0.5}px)`;
      });

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      removeInputListener?.();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const leftItems = [
    <div
      key="eyebrow"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-xs tracking-[0.08em] text-green-800 dark:text-green-300 font-medium w-fit"
    >
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      Open to Summer 2026 internships
    </div>,
    <h1
      key="name"
      className="font-serif text-[clamp(44px,6vw,80px)] leading-[1.0] tracking-[-0.03em] text-neutral-900 dark:text-neutral-100"
    >
      <span className="lg:hidden">Ji Min <em className="not-italic text-cardinal-700 dark:text-cardinal-400">Lee</em></span>
      <span className="hidden lg:inline">Ji Min<br /><em className="not-italic text-cardinal-700 dark:text-cardinal-400">Lee</em></span>
    </h1>,
    <div
      key="role"
      className="flex items-center gap-3 text-base text-neutral-700 dark:text-neutral-300"
    >
      <span className="w-6 h-px bg-neutral-400 dark:bg-neutral-600" />
      <TypedRole roles={ROLES} />
    </div>,
    <p
      key="bio"
      className="text-[15px] text-neutral-600 dark:text-neutral-300 leading-[1.75] max-w-[400px]"
    >
      Software engineer and AI researcher at USC. I build full-stack systems, work on human-centered
      AI, and care about software that&apos;s useful in the real world.
    </p>,
    <div key="cta" className="flex gap-3 items-center">
      <Link
        href="/projects"
        className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-[0.02em] hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors"
      >
        View projects
      </Link>
      <ContactButton />
    </div>,
  ];

  return (
    <>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes floatD { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
      `}</style>
      <section className="min-h-[calc(100vh-60px)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 md:px-12 max-w-6xl mx-auto py-16 lg:py-0">

        {/* Left column */}
        <div className="flex flex-col gap-7 items-center lg:items-start text-center lg:text-left">
          {leftItems.map((item, i) => (
            <div
              key={i}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translate(0, 0)" : ENTER_FROM[i],
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right column — outer handles entrance, inner is the rAF tilt target */}
        <div
          className="relative flex justify-center items-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(-16px) scale(0.97)",
            transition:
              "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          <div
            ref={photoWrapperRef}
            className="relative w-full max-w-[380px]"
            style={{ transform: "rotate(1.5deg)", willChange: "transform" }}
          >
            {/* Floating tags */}
            {FLOAT_TAGS.map(({ key, className, animStyle, accent, content }, idx) => (
              <div
                key={key}
                ref={(el: HTMLDivElement | null) => { tagOuterRefs.current[idx] = el; }}
                className={`absolute z-20 hidden sm:block ${className}`}
                style={{
                  opacity: mounted ? 1 : 0,
                  willChange: "transform",
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + idx * 0.08}s`,
                }}
              >
                <span
                  className={`flex text-[12px] px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-lg border items-center ${
                    accent
                      ? "bg-cardinal-50 dark:bg-cardinal-900/30 text-cardinal-700 dark:text-cardinal-300 border-cardinal-200 dark:border-cardinal-800"
                      : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700"
                  }`}
                  style={animStyle}
                >
                  {content}
                </span>
              </div>
            ))}

            {/* Photo card */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)] hover:shadow-[0_48px_100px_rgba(0,0,0,0.22)] transition-shadow duration-500 aspect-[4/5] bg-warm-100 dark:bg-neutral-800">
              <Image
                src="/me.jpg"
                alt="Ji Min Lee"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Name badge */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-white dark:bg-neutral-900 rounded-xl px-4 py-3 border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <div className="font-serif text-base leading-tight text-neutral-900 dark:text-neutral-50 font-semibold">
                Ji Min Lee
              </div>
              <div className="text-[11px] text-neutral-700 dark:text-neutral-300 mt-0.5">
                M.S. CS (AI) &middot; USC &middot; 2025–2027
              </div>
            </div>

            {/* iOS gyro permission hint — only shown on iOS before permission is granted */}
            {gyroHint && (
              <button
                onClick={() => gyroStartRef.current?.()}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-300 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-sm whitespace-nowrap transition-opacity duration-300"
              >
                {/* Phone tilt icon */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                  <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
                Tap to tilt
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
