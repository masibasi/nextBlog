"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TypedRole } from "./typed-role";

const ROLES = ["ML Engineer", "AI Researcher", "Full-Stack Dev", "Human-AI Builder"];

const FLOAT_TAGS = [
  {
    label: "USC Viterbi",
    className: "top-[10%] -left-[12%]",
    style: { animation: "floatA 4s ease-in-out infinite" },
    accent: false,
  },
  {
    label: "1st place — GVO Buildathon",
    className: "top-[30%] -right-[10%]",
    style: { animation: "floatB 4.5s ease-in-out infinite" },
    accent: true,
  },
  {
    label: "AI for Health Lab",
    className: "bottom-[22%] -left-[14%]",
    style: { animation: "floatC 5s ease-in-out infinite" },
    accent: false,
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
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-xs tracking-[0.08em] text-green-700 dark:text-green-400 w-fit"
    >
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      Open to Summer 2026 internships
    </div>,
    // Name
    <h1
      key="name"
      className="font-serif text-[clamp(52px,6vw,80px)] leading-[1.0] tracking-[-0.03em] text-neutral-900 dark:text-neutral-100"
    >
      Ji Min
      <br />
      <em className="not-italic text-cardinal-700 dark:text-cardinal-400">Lee</em>
    </h1>,
    // Role
    <div
      key="role"
      className="flex items-center gap-3 text-base text-neutral-500 dark:text-neutral-400 font-light"
    >
      <span className="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
      <TypedRole roles={ROLES} />
    </div>,
    // Bio
    <p
      key="bio"
      className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-[1.75] max-w-[400px] font-light"
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
      <a
        href="mailto:leejimin@usc.edu"
        className="text-[13px] text-neutral-900 dark:text-neutral-100 tracking-[0.02em] flex items-center gap-1.5 group"
      >
        Get in touch
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </div>,
  ];

  return (
    <>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
      <section className="min-h-[calc(100vh-60px)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 md:px-12 max-w-6xl mx-auto py-16 lg:py-0">
        {/* Left */}
        <div className="flex flex-col gap-7">
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
            {FLOAT_TAGS.map(({ label, className, style, accent }) => (
              <span
                key={label}
                className={`absolute z-10 ${className} text-[12px] px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-lg border ${
                  accent
                    ? "bg-cardinal-50 dark:bg-cardinal-900/30 text-cardinal-700 dark:text-cardinal-300 border-cardinal-200 dark:border-cardinal-800"
                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700"
                }`}
                style={style}
              >
                {label}
              </span>
            ))}

            {/* Photo card */}
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
              {/* Name badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/88 dark:bg-neutral-900/88 backdrop-blur-md rounded-xl px-4 py-3 border border-white/60 dark:border-neutral-700/60">
                <div className="font-serif text-base leading-tight text-neutral-900 dark:text-neutral-100">
                  Ji Min Lee
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  M.S. CS (AI) &middot; USC &middot; 2025–2027
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
