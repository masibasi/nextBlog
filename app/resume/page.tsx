import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Ji Min Lee — Software Engineer & AI Researcher",
};

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 whitespace-nowrap">{title}</h2>
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-800" />
      </div>
      {children}
    </section>
  );
}

function ResumeEntry({
  title,
  subtitle,
  period,
  bullets,
}: {
  title: string;
  subtitle?: string;
  period?: string;
  bullets?: string[];
}) {
  return (
    <div className="mb-5">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
        <span className="font-medium text-neutral-900 dark:text-neutral-100">{title}</span>
        {period && <span className="text-sm text-neutral-500 dark:text-neutral-400 shrink-0">{period}</span>}
      </div>
      {subtitle && <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">{subtitle}</div>}
      {bullets && bullets.length > 0 && (
        <ul className="mt-2 space-y-1">
          {bullets.map((b, i) => (
            <li key={i} className="text-sm text-neutral-700 dark:text-neutral-300 flex gap-2">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const skillGroups = [
  { label: "Languages", skills: ["TypeScript", "JavaScript", "Python", "Java"] },
  { label: "Frameworks", skills: ["React", "Next.js", "Spring", "FastAPI", "Flask"] },
  { label: "Cloud & DevOps", skills: ["AWS (Amplify, IoT Core, DynamoDB)", "Docker", "Jenkins", "Azure"] },
  { label: "Data / AI", skills: ["MySQL", "PostgreSQL", "PyTorch", "LangGraph"] },
];

export default function ResumePage() {
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Ji Min Lee</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">Software Engineer · Full-Stack & Applied AI</p>
          <a href="mailto:leejimin@usc.edu" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors mt-1 block">
            leejimin@usc.edu
          </a>
        </div>
        <a
          href="/Ji_Min_Lee_resume2.11.pdf"
          download="Ji_Min_Lee_resume.pdf"
          className="shrink-0 mt-1 px-3 py-1.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Download PDF
        </a>
      </div>

      {/* Education */}
      <ResumeSection title="Education">
        <ResumeEntry
          title="University of Southern California"
          subtitle="Master of Science in Computer Science (AI)"
          period="Aug 2025 – May 2027"
        />
        <ResumeEntry
          title="Gachon University"
          subtitle="Bachelor of Engineering in Software Engineering, Cum Laude"
          period="Sep 2018 – Feb 2024"
        />
      </ResumeSection>

      {/* Professional Experience */}
      <ResumeSection title="Professional Experience">
        <ResumeEntry
          title="Web Team Lead (NIH R01 Funded Project)"
          subtitle="University of Southern California, Interaction Lab (Prof. Maja Matarić) · Los Angeles, CA"
          period="Jan 2026 – Present"
          bullets={[
            "Leading full-stack development of a secure NIH-funded research platform on AWS with Next.js and TypeScript, establishing code review standards and sprint workflows for a cross-functional team",
            "Translating study requirements into backend schemas and API contracts for longitudinal workflows and robot integration",
            "Implementing an LLM-assisted reflection module to personalize therapeutic content within study workflows",
            "Integrating web interfaces with socially assistive robots (Blossom) via AWS IoT Core (MQTT) for low-latency bidirectional communication",
          ]}
        />
        <ResumeEntry
          title="Full-Stack Engineer, AI Business Division"
          subtitle="EMRO – Korea's #1 AI-powered supply-chain software provider · Seoul, Korea"
          period="Sep 2023 – Jun 2025"
          bullets={[
            "Developed and launched \"Quotation Doctor,\" a high-impact internal business application for Hyundai Motor Group, enabling search over historical quotes and surfacing price benchmarks and purchase history",
            "Built and extended enterprise-scale backend APIs using Java/Spring with MySQL/PostgreSQL to power validation, analytics, and monitoring workflows",
            "Developed interactive dashboards in JavaScript (HTML/CSS) to visualize validation outcomes and operational metrics",
            "Integrated a FastText-based similarity service (Python/Flask), validating 100K+ quotes/month and reducing page load time from 10s to under 2s",
            "Standardized CI/CD across Azure and on-prem environments (Jenkins, Docker) with automated health checks and rollback mechanisms",
          ]}
        />
      </ResumeSection>

      {/* Projects */}
      <ResumeSection title="Projects">
        <ResumeEntry
          title="Visurai – AI-powered visual storytelling assistant"
          subtitle="Awards: 1st Place (Context Engineering), Software Engineering Award · USC Good Vibes Only Buildathon (LA Tech Week by a16z)"
          period="Oct 2025"
          bullets={[
            "Built real-time FastAPI backend converting text into visual storyboards & narration; streamed incremental results via SSE",
            "Designed an async multi-stage pipeline with concurrency control for slow generative workloads",
          ]}
        />
        <ResumeEntry
          title="Proact0 – Multi-agent LLM pipeline for AI Influencers"
          subtitle="AI Agent Developer"
          period="May 2025 – Nov 2025"
          bullets={[
            "Architected a multi-agent pipeline using LangGraph to generate structured JSON storyboards for image generation; cut JSON errors ~30% via schema-constrained prompting and validation",
          ]}
        />
      </ResumeSection>

      {/* Research */}
      <ResumeSection title="Research Experience">
        <ResumeEntry
          title="Graduate Research Intern"
          subtitle="University of Southern California, AI for Health Lab (Prof. Ruishan Liu) · Los Angeles, CA"
          period="Sep 2025 – Present"
          bullets={[
            "Developed a cold-start CAT pipeline integrating LLM-based simulation and IRT calibration",
            "Implemented evaluation tooling for CAT simulations (batch runs, metrics logging, reproducibility)",
            "Co-authored a paper on synthetically calibrated IRT item banks for CAT (submitted to ACL Rolling Review, ARR)",
          ]}
        />
      </ResumeSection>

      {/* Skills */}
      <ResumeSection title="Skills">
        <div className="space-y-2">
          {skillGroups.map(({ label, skills }) => (
            <div key={label} className="flex flex-wrap gap-x-2 gap-y-1 items-baseline">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 w-28 shrink-0">{label}</span>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ResumeSection>

      {/* Additional Information */}
      <ResumeSection title="Additional Information">
        <ResumeEntry
          title="Republic of Korea Army · Sergeant (Squad Leader)"
          period="Sep 2019 – Mar 2021"
          bullets={[
            "Completed mandatory service with honorable discharge; led a squad for 6 months following Signal School training",
          ]}
        />
      </ResumeSection>
    </main>
  );
}
