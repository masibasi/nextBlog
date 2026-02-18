import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Ji Min Lee",
};

const highlights = [
  "Web Team Lead for an NIH R01-funded USC platform (Next.js, TypeScript, AWS)",
  "Built enterprise AI workflows at EMRO, including 100K+ quote validation/month",
  "Graduate research in AI for Health (LLM simulation + CAT/IRT evaluation)",
];

const experience = [
  {
    role: "Web Team Lead, USC Interaction Lab",
    period: "Jan 2026 – Present",
    bullets: [
      "Leading full-stack development of a secure NIH-funded research platform on AWS.",
      "Defining backend schemas and API contracts for longitudinal study workflows.",
      "Integrating web interfaces with socially assistive robots via AWS IoT Core.",
    ],
  },
  {
    role: "Full-Stack Engineer, EMRO",
    period: "Sep 2023 – Jun 2025",
    bullets: [
      "Launched internal AI platform for procurement search and benchmarking.",
      "Built scalable REST APIs with Java/Spring + MySQL/PostgreSQL.",
      "Improved key workflow performance from ~10s to under 2s.",
    ],
  },
];

const skills = ["TypeScript", "Python", "Java", "React", "Next.js", "FastAPI", "Spring", "AWS", "PostgreSQL", "LangGraph"];

export default function ResumePage() {
  return (
    <main className="page-wrap page-wrap--wide space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Resume</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Software Engineer · Full-Stack & Applied AI</p>
        </div>
        <a href="/Ji_Min_Lee_resume2.11.pdf" download className="rounded-full border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900">
          Download PDF
        </a>
      </div>

      <div className="section-card text-sm text-neutral-700 dark:text-neutral-300">
        <p><strong>Location:</strong> Los Angeles, CA</p>
        <p><strong>Email:</strong> <a href="mailto:leejimin@usc.edu" className="underline">leejimin@usc.edu</a></p>
        <p>
          <strong>Links:</strong> <a href="https://jimin.blog" className="underline">jimin.blog</a> · <a href="https://www.linkedin.com/in/jiminlee4015" className="underline">LinkedIn</a> ·{" "}
          <a href="https://github.com/masibasi" className="underline">GitHub</a>
        </p>
      </div>

      <section className="section-card">
        <h2 className="text-lg font-semibold mb-3">At a Glance</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section-card">
        <h2 className="text-lg font-semibold mb-4">Experience Highlights</h2>
        <div className="space-y-6">
          {experience.map((item) => (
            <div key={item.role}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-medium">{item.role}</h3>
                <p className="text-xs text-neutral-500">{item.period}</p>
              </div>
              <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-lg font-semibold mb-3">Core Skills</h2>
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <span key={skill} className="rounded-full border px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-200">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b">
          <h2 className="text-base font-semibold">Full Resume (PDF)</h2>
        </div>
        <iframe src="/Ji_Min_Lee_resume2.11.pdf#view=FitH" title="Ji Min Lee Resume" className="w-full" style={{ minHeight: "75vh" }} />
      </section>

      <p className="text-xs text-neutral-500">If the embedded viewer does not load on your device, use the Download PDF button above.</p>
    </main>
  );
}
