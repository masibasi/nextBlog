"use client";

const SKILLS = [
  "LLM Pipelines",
  "FastAPI",
  "Next.js",
  "Human-Centered AI",
  "NLP Research",
  "React",
  "TypeScript",
  "Computer Vision",
  "AWS",
  "Adaptive Testing",
];

function MarqueeItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-5 px-7 text-[13px] text-neutral-500 dark:text-neutral-400 tracking-[0.04em] whitespace-nowrap">
      {label}
      <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 flex-shrink-0" />
    </div>
  );
}

export function Marquee() {
  const doubled = [...SKILLS, ...SKILLS];

  return (
    <div className="border-y border-neutral-200 dark:border-neutral-800 py-3.5 overflow-hidden bg-[#f9f8f4] dark:bg-neutral-950">
      <div
        className="flex w-max"
        style={{
          animation: "marquee 28s linear infinite",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {doubled.map((skill, i) => (
          <MarqueeItem key={i} label={skill} />
        ))}
      </div>
    </div>
  );
}
