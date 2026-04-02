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

  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const tagOuterRefs = useRef<(HTMLDivElement | null)[]>(Array(FLOAT_TAGS.length).fill(null));
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const cardDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let removeMouseListener: (() => void) | undefined;

    if (!isTouch) {
      // Desktop: mouse tracking
      const onMouseMove = (e: MouseEvent) => {
        target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      removeMouseListener = () => window.removeEventListener("mousemove", onMouseMove);
    }
    // Mobile: target is updated each frame from scroll position (no event listener needed)

    const loop = () => {
      // Mobile: derive tilt from card's position relative to viewport center
      if (isTouch && photoWrapperRef.current) {
        const rect = photoWrapperRef.current.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const offset = (cardCenter - window.innerHeight / 2) / (window.innerHeight * 0.4);
        target.current.y = Math.max(-1, Math.min(1, offset));
        // No left-right tilt on mobile (no horizontal scroll input)
        target.current.x = 0;
      }

      const s = isTouch ? 0.06 : 0.06;
      mouse.current.x = lerp(mouse.current.x, target.current.x, s);
      mouse.current.y = lerp(mouse.current.y, target.current.y, s);

      const { x, y } = mouse.current;

      // Tilt: desktop stays subtle, mobile goes more dramatic
      if (photoWrapperRef.current) {
        const rx = isTouch ? -y * 22 : -y * 10;
        const ry = isTouch ?  x *  0 :  x * 12;
        photoWrapperRef.current.style.transform =
          `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) rotate(1.5deg)`;
      }

      // Shine: desktop subtle, mobile slightly more present
      if (shineRef.current) {
        const px = ((x + 1) / 2) * 100;
        const py = ((y + 1) / 2) * 100;
        const intensity = isTouch ? 0.18 : 0.10;
        shineRef.current.style.background =
          `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,${intensity}) 0%, rgba(255,255,255,${intensity * 0.3}) 45%, transparent 65%)`;
      }

      // Mobile only: dynamic shadow shifts and deepens with tilt
      if (isTouch && cardDivRef.current) {
        const offsetY = 28 + y * 20;
        const blur    = 70 + Math.abs(y) * 50;
        const opacity = 0.16 + Math.abs(y) * 0.18;
        cardDivRef.current.style.boxShadow =
          `0 ${offsetY}px ${blur}px rgba(0,0,0,${opacity})`;
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
      removeMouseListener?.();
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

            {/* Photo card — desktop: CSS hover shadow / mobile: rAF dynamic shadow */}
            <div ref={cardDivRef} className="relative rounded-2xl overflow-hidden shadow-[0_28px_70px_rgba(0,0,0,0.16)] hover:shadow-[0_40px_90px_rgba(0,0,0,0.22)] transition-shadow duration-500 aspect-[4/5] bg-warm-100 dark:bg-neutral-800">
              <Image
                src="/me.jpg"
                alt="Ji Min Lee"
                fill
                className="object-cover"
                priority
              />
              {/* Shiny light reflection — position driven by rAF tilt values */}
              <div
                ref={shineRef}
                className="absolute inset-0 pointer-events-none"
                style={{ mixBlendMode: "screen" }}
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

          </div>
        </div>
      </section>
    </>
  );
}
