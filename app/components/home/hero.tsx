"use client";

import { useEffect, useState } from "react";
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
  content: React.ReactNode;
};

const FLOAT_TAGS: FloatTag[] = [
  {
    key: "viterbi",
    className: "top-[8%] -left-[14%]",
    animStyle: { animation: "floatA 4s ease-in-out infinite" },
    accent: false,
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
    content: "1st Place · SE & CE · GVO Buildathon",
  },
  {
    key: "ilab",
    className: "bottom-[32%] -left-[16%]",
    animStyle: { animation: "floatC 5s ease-in-out infinite" },
    accent: false,
    content: "USC Interaction Lab",
  },
  {
    key: "health",
    className: "bottom-[18%] -right-[10%]",
    animStyle: { animation: "floatD 3.5s ease-in-out infinite" },
    accent: false,
    content: "AI for Health Lab",
  },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const leftItems = [
    // Eyebrow
    <div
      key="eyebrow"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-xs tracking-[0.08em] text-green-800 dark:text-green-300 font-medium w-fit"
    >
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      Open to Summer 2026 internships
    </div>,
    // Name
    <h1
      key="name"
      className="font-serif text-[clamp(44px,6vw,80px)] leading-[1.0] tracking-[-0.03em] text-neutral-900 dark:text-neutral-100"
    >
      <span className="lg:hidden">Ji Min <em className="not-italic text-cardinal-700 dark:text-cardinal-400">Lee</em></span>
      <span className="hidden lg:inline">Ji Min<br /><em className="not-italic text-cardinal-700 dark:text-cardinal-400">Lee</em></span>
    </h1>,
    // Role
    <div
      key="role"
      className="flex items-center gap-3 text-base text-neutral-700 dark:text-neutral-300"
    >
      <span className="w-6 h-px bg-neutral-400 dark:bg-neutral-600" />
      <TypedRole roles={ROLES} />
    </div>,
    // Bio
    <p
      key="bio"
      className="text-[15px] text-neutral-600 dark:text-neutral-300 leading-[1.75] max-w-[400px]"
    >
      Software engineer and AI researcher at USC. I build full-stack systems, work on human-centered
      AI, and care about software that&apos;s useful in the real world.
    </p>,
    // CTAs
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
        {/* Left */}
        <div className="flex flex-col gap-7 items-center lg:items-start text-center lg:text-left">
          {leftItems.map((item, i) => (
            <div
              key={i}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right — photo */}
        <div
          className="relative flex justify-center items-center"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
        >
          <div className="relative w-full max-w-[380px]">
            {/* Floating tags */}
            {FLOAT_TAGS.map(({ key, className, animStyle, accent, content }) => (
              <span
                key={key}
                className={`absolute z-20 hidden sm:flex ${className} text-[12px] px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-lg border items-center ${
                  accent
                    ? "bg-cardinal-50 dark:bg-cardinal-900/30 text-cardinal-700 dark:text-cardinal-300 border-cardinal-200 dark:border-cardinal-800"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700"
                }`}
                style={animStyle}
              >
                {content}
              </span>
            ))}

            {/* Photo card (rotated) */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)] transition-all duration-500 hover:rotate-0 hover:shadow-[0_48px_100px_rgba(0,0,0,0.22)] hover:-translate-y-2 aspect-[4/5] bg-warm-100 dark:bg-neutral-800"
              style={{ transform: "rotate(1.5deg)" }}
            >
              <Image
                src="/me.jpg"
                alt="Ji Min Lee"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Name badge — outside rotated div to prevent text blur */}
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
