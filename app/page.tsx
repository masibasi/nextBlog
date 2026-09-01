import { getMainProjects, getOtherProjects } from "../utils/notion";
import { getBlogPosts } from "app/lib/posts";
import { Hero } from "app/components/home/hero";
import { SectionHeader } from "app/components/home/section-header";
import { NowSection } from "app/components/home/now-section";
import { ProjectCard } from "app/components/home/project-card";
import { WritingList } from "app/components/home/writing-list";
import { CalendlySection } from "app/components/home/calendly-section";
import { ScrollReveal } from "app/components/home/scroll-reveal";
import { SITE_URL } from "app/data/site";

export const revalidate = 60;

const currentWork = [
  {
    role: "Software Engineering Intern",
    org: "Blue Shield of California",
    period: "Jun 2026 – Present",
    type: "Work" as const,
  },
  {
    role: "Web Team Lead",
    org: "USC Interaction Lab",
    period: "Jan 2026 – Present",
    type: "Work" as const,
  },
  {
    role: "Graduate Research Intern",
    org: "USC AI for Health Lab",
    period: "Sep 2025 – Present",
    type: "Research" as const,
  },
  {
    role: "M.S. Computer Science (AI)",
    org: "University of Southern California",
    period: "Aug 2025 – May 2027",
    type: "Education" as const,
  },
];

export default async function Page() {
  let featuredProjects: Awaited<ReturnType<typeof getMainProjects>> = [];
  try {
    const [main, other] = await Promise.all([getMainProjects(), getOtherProjects()]);
    const all = [...main, ...other].filter((p) => p.releasable && p.featured);
    featuredProjects = all
      .sort((a, b) => {
        const da = a.duration ? new Date(a.duration).getTime() : 0;
        const db = b.duration ? new Date(b.duration).getTime() : 0;
        return db - da;
      })
      .slice(0, 3);
  } catch {
    // graceful fallback
  }

  const recentPosts = getBlogPosts()
    .sort((a, b) =>
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
    )
    .slice(0, 5);

  return (
    <div className="font-sans">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ji Min Lee",
            jobTitle: "Software Engineer",
            url: SITE_URL,
            affiliation: {
              "@type": "CollegeOrUniversity",
              name: "University of Southern California",
            },
            sameAs: [
              "https://github.com/masibasi",
              "https://linkedin.com/in/jiminlee4015",
            ],
          }),
        }}
      />
      {/* Hero */}
      <Hero />

      {/* Now */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <SectionHeader label="Now" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <NowSection items={currentWork} />
        </ScrollReveal>
      </section>

      {/* Projects */}
      {featuredProjects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-200/60 dark:border-neutral-800/60">
          <ScrollReveal>
            <SectionHeader label="Projects" href="/projects" linkText="All projects" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 100}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Writing */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <ScrollReveal>
          <SectionHeader label="Writing" href="/posts" linkText="All posts" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <WritingList posts={recentPosts} />
        </ScrollReveal>
      </section>

      {/* Contact — scroll-mt clears the fixed 60px navbar for the #contact anchor */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-200/60 dark:border-neutral-800/60 scroll-mt-[60px]"
      >
        <ScrollReveal>
          <SectionHeader label="Let's talk" />
          <p className="text-[15px] text-neutral-600 dark:text-neutral-300 leading-[1.75] max-w-[520px] -mt-4 mb-9">
            Always up for a coffee chat — about AI systems, full-stack work, or grad school
            in LA. Grab whatever time works for you.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <CalendlySection />
        </ScrollReveal>
      </section>

    </div>
  );
}
