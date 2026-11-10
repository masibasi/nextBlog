import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Jimin Lee — Software Engineer, Full-Stack & AI Systems",
};

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 whitespace-nowrap">{title}</h2>
        <div className="flex-1 border-t border-cardinal-200 dark:border-cardinal-700" />
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
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-cardinal-700 dark:bg-cardinal-400" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const skillGroups = [
  { label: "Languages", skills: ["Python", "Java", "TypeScript", "JavaScript"] },
  { label: "Frameworks", skills: ["Spring Boot", "FastAPI", "Flask", "React", "Next.js"] },
  { label: "Machine Learning & AI", skills: ["LLM applications", "MCP", "LangGraph", "Agentic workflow design", "LLM evaluation"] },
  { label: "Backend & Data", skills: ["REST APIs", "MySQL", "PostgreSQL", "MuleSoft Anypoint Platform", "DataWeave"] },
  { label: "Cloud & DevOps", skills: ["AWS", "Azure", "Docker", "Jenkins", "CI/CD"] },
];

export default function ResumePage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
      <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Jimin Lee</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">Software Engineer · Full-Stack & AI Systems</p>
          <a href="mailto:leejimin@usc.edu" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors mt-1 block">
            leejimin@usc.edu
          </a>
        </div>
        <a
          href="/Jimin_Lee_resume.pdf"
          download="Jimin_Lee_resume.pdf"
          className="shrink-0 mt-1 px-3 py-1.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-cardinal-300 dark:hover:border-cardinal-800 hover:text-cardinal-700 dark:hover:text-cardinal-400 transition-colors"
        >
          Download PDF
        </a>
      </div>

      {/* Education */}
      <ResumeSection title="Education">
        <ResumeEntry
          title="University of Southern California"
          subtitle="Master of Science in Computer Science"
          period="Aug 2025 – Expected May 2027"
        />
        <ResumeEntry
          title="Gachon University"
          subtitle="Bachelor of Engineering in Software Engineering, Cum Laude"
          period="Sep 2018 – Feb 2024"
        />
      </ResumeSection>

      {/* Experience */}
      <ResumeSection title="Experience">
        <ResumeEntry
          title="Service Integration Intern, Integration & Interoperability Platform"
          subtitle="Blue Shield of California · Long Beach, CA"
          period="Jun 2026 – Aug 2026"
          bullets={[
            "Built an AI-assisted Boomi-to-MuleSoft migration workflow estimated to reduce medium-complexity migration effort by 70–80%, from ~2 weeks to ~2 days, now adopted for the ~80 remaining integrations",
            "Developed an LLM agent skill and 6 custom Python MCP tools that trace source-to-target mappings and parse legacy transformation logic, resolving 270+ fields across 15 record layouts",
            "Migrated 4 enterprise integrations end to end with 4/4 Mule packages building and 56/56 MUnit tests passing, auto-generating business-purpose documentation and flagging unconfirmed logic for developer review",
          ]}
        />
        <ResumeEntry
          title="Web Team Lead (NIH R01 Funded Project)"
          subtitle="University of Southern California, Interaction Lab (Prof. Maja Matarić) · Los Angeles, CA"
          period="Jan 2026 – Present"
          bullets={[
            "Lead full-stack development of a secure NIH R01-funded longitudinal research platform supporting 90+ participants using Next.js, TypeScript, AWS Amplify, DynamoDB, and Lambda",
            "Design backend schemas, API contracts, and serverless workflows for longitudinal study data, with Cognito authentication and IAM-controlled service access",
            "Build LLM-assisted therapeutic reflection workflows and real-time Blossom robot communication through AWS IoT Core and MQTT",
          ]}
        />
        <ResumeEntry
          title="Graduate Research Intern"
          subtitle="University of Southern California, AI for Health Lab (Prof. Ruishan Liu) · Los Angeles, CA"
          period="Sep 2025 – Aug 2026"
          bullets={[
            "Developed a cold-start computerized adaptive testing pipeline using LLM-based simulation and IRT calibration; co-authored a paper on synthetically calibrated item banks (under review, ACL Rolling Review)",
          ]}
        />
        <ResumeEntry
          title="Full-Stack Engineer, AI Business Division"
          subtitle="EMRO – Korea's #1 AI-powered supply-chain software provider · Seoul, Korea"
          period="Sep 2023 – Jun 2025"
          bullets={[
            "Developed and launched a production procurement analytics platform for Hyundai Motor Group, translating procurement workflows into quotation search, price benchmarking, and analytics features",
            "Built enterprise backend APIs using Java/Spring and MySQL/PostgreSQL for validation, analytics, and monitoring",
            "Integrated a Python/Flask FastText similarity service processing 100K+ quotations monthly and reduced page load time from 10 seconds to under 2 seconds",
            "Standardized CI/CD across Azure and on-prem environments using Jenkins and Docker with automated health checks and rollback mechanisms",
          ]}
        />
      </ResumeSection>

      {/* Projects */}
      <ResumeSection title="Projects">
        <ResumeEntry
          title="Peeko – Real-time AI lecture recovery system"
          subtitle="Concept & Team Lead · 1st Place Overall, Build4SC Hackathon (GRIDS x Viterbi, USC, 47 participants)"
          period="Apr 2026"
          bullets={[
            "Led a 4-person team to design and ship an end-to-end AI product in 12 hours",
            "Built LLM pipelines for rolling session summarization, \"Catch Me Up\" recovery, and Q&A detection with a Node.js/Supabase backend",
          ]}
        />
        <ResumeEntry
          title="Visurai – AI-powered visual storytelling assistant for dyslexic, ADHD, and visual learners"
          subtitle="Awards: 1st Place (Context Engineering), Software Engineering Award · USC Good Vibes Only Buildathon (LA Tech Week by a16z)"
          period="Oct 2025"
          bullets={[
            "Built a FastAPI backend converting text into visual storyboards & narration; streamed results via SSE",
            "Designed an asynchronous multi-stage generation pipeline with concurrency controls for long-running AI workloads",
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

      {/* Skills */}
      <ResumeSection title="Skills">
        <div className="space-y-2">
          {skillGroups.map(({ label, skills }) => (
            <div key={label} className="flex flex-wrap gap-x-2 gap-y-1 items-baseline">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 w-40 shrink-0">{label}</span>
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
      </div>
    </div>
  );
}
