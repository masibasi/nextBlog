export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto py-8 px-4">
      <img
        src="/usc_me.JPG"
        alt="Portrait of Ji Min Lee"
        className="rounded-xl shadow-md mb-6 w-full"
        style={{
          maxWidth: 360,
          aspectRatio: "3/4",
          height: "auto",
          objectFit: "cover",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      {/* Contact */}
      <div className="mb-6 flex flex-col gap-1 text-sm text-neutral-500 dark:text-neutral-400">
        <a href="mailto:leejimin@usc.edu" className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
          leejimin@usc.edu
        </a>
        <a
          href="https://www.instagram.com/naive_jimin/"
          className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          @naive_jimin
        </a>
      </div>

      {/* Intro */}
      <p className="mb-8 leading-relaxed text-neutral-800 dark:text-neutral-200">
        Hi, I'm Ji Min Lee — a software engineer currently leading web development at the{" "}
        <strong>USC Interaction Lab</strong> and pursuing an{" "}
        <strong>M.S. in Computer Science (AI) at USC</strong>. Before grad school, I spent two years at{" "}
        <strong>EMRO</strong> building full-stack systems for Hyundai Motor's procurement platform. I care
        about making software that actually helps people, and I'm especially drawn to human-centered AI
        and the messy, interesting work of putting research into practice.
      </p>

      {/* What I've been up to */}
      <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">What I've been up to</h2>
      <div className="space-y-3 mb-8">
        <div className="card-warm p-4">
          <div className="font-medium text-neutral-900 dark:text-neutral-100">Web Team Lead, USC Interaction Lab</div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">Jan 2026 – Present</div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 leading-relaxed">
            Leading front-end development for the lab's public site and internal tooling. Working closely
            with researchers to present their work clearly and accessibly.
          </p>
        </div>
        <div className="card-warm p-4">
          <div className="font-medium text-neutral-900 dark:text-neutral-100">Full-Stack Engineer, EMRO</div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">Sep 2023 – Jun 2025</div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 leading-relaxed">
            Built recommendation modules and CI/CD pipelines for enterprise procurement systems at
            Hyundai Motor. Worked across Spring, Azure, and on-prem infrastructure.
          </p>
        </div>
        <div className="card-warm p-4">
          <div className="font-medium text-neutral-900 dark:text-neutral-100">Researcher, USC AI for Health Lab</div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">Sep 2025 – Present</div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 leading-relaxed">
            Exploring adaptive survey generation with LLMs to improve clinical screening. Working on a
            paper currently under ACL Rolling Review.
          </p>
        </div>
      </div>

      {/* Education */}
      <h2 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Education</h2>
      <div className="mb-8 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
        <div>
          <span className="font-medium">USC</span> — M.S. Computer Science (AI), 2025–2027
        </div>
        <div>
          <span className="font-medium">Gachon University</span> — B.Eng. Software Engineering, Cum Laude, 2018–2024
        </div>
      </div>

      {/* Outside of work */}
      <h2 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Outside of work</h2>
      <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
        I shoot film on weekends, play guitar badly but happily, and dance whenever I get the chance.
        I'm a Spurs supporter and a devoted T1 fan — two fandoms that have taught me a lot about
        patience and resilience.
      </p>
    </section>
  );
}
