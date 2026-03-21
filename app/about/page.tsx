import Image from "next/image";
import type { Metadata } from "next";
import { SectionHeader } from "app/components/home/section-header";
import { ScrollReveal } from "app/components/home/scroll-reveal";

export const metadata: Metadata = {
  title: "About",
  description: "About Ji Min Lee — Software Engineer & AI Researcher at USC",
};

const SOCIAL_LINKS = [
  {
    label: "Email",
    href: "mailto:leejimin@usc.edu",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jiminlee4015/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/masibasi",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/naive_jimin/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];


const education = [
  {
    school: "University of Southern California",
    degree: "M.S. Computer Science (AI)",
    period: "2025 – 2027",
    note: "Viterbi School of Engineering",
  },
  {
    school: "Gachon University",
    degree: "B.Eng. Software Engineering",
    period: "2018 – 2024",
    note: "Cum Laude",
  },
];

const INTERESTS = [
  "Film Photography",
  "Guitar",
  "Cooking",
  "Dancing",
  "LAFC",
  "T1 Esports",
  "Dogs",
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12 space-y-16">

      {/* Hero: photo + intro split */}
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-start">
        <div className="shrink-0 mx-auto sm:mx-0">
          <Image
            src="/usc_me.JPG"
            alt="Ji Min Lee"
            width={200}
            height={240}
            className="rounded-2xl shadow-lg object-cover w-[160px] h-[192px] sm:w-[200px] sm:h-[240px]"
            priority
          />
        </div>
        <div className="flex flex-col justify-center gap-4 text-center sm:text-left">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-[-0.02em] text-neutral-900 dark:text-neutral-50 leading-tight">
              Ji Min Lee
            </h1>
            <p className="mt-1 text-[15px] text-neutral-600 dark:text-neutral-300">
              Software Engineer &amp; AI Researcher at USC
            </p>
          </div>
          {/* Social links */}
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-cardinal-400 dark:hover:border-cardinal-600 hover:text-cardinal-700 dark:hover:text-cardinal-400 transition-all duration-150"
              >
                {icon}
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Personal intro */}
      <ScrollReveal>
        <div className="space-y-4 text-[14px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <p>
            I grew up at Shanghai American School, came back to Korea for university, and recently moved
            to LA for my M.S. at USC. Moving between contexts tends to make you notice gaps — who the
            tools are built for, and who they&apos;re not.
          </p>
          <p>
            A mission trip to Cambodia made that specific. Seeing communities navigate a world that assumed
            you could read and see, I realized what kind of developer I wanted to be: someone building
            software that&apos;s actually useful to people, not just more convenient for those who already
            have access. That&apos;s still what I&apos;m chasing — at the{" "}
            <strong className="text-neutral-800 dark:text-neutral-100 font-medium">AI for Health Lab</strong>
            , at the{" "}
            <strong className="text-neutral-800 dark:text-neutral-100 font-medium">Interaction Lab</strong>
            , and whenever I sit down to build something.
          </p>
        </div>
      </ScrollReveal>

      {/* Education */}
      <ScrollReveal delay={100}>
        <SectionHeader label="Education" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education.map((item) => (
            <div
              key={item.school}
              className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-[14px] px-5 py-5 shadow-sm"
            >
              <div className="font-semibold text-[15px] text-neutral-900 dark:text-neutral-50 mb-0.5">
                {item.school}
              </div>
              <div className="text-[13px] text-neutral-600 dark:text-neutral-300">{item.degree}</div>
              <div className="text-[12px] text-neutral-500 dark:text-neutral-400 mt-1">{item.period}</div>
              <div className="mt-2 inline-block text-[11px] px-2.5 py-1 rounded-full bg-cardinal-50 dark:bg-cardinal-900/20 text-cardinal-700 dark:text-cardinal-300 border border-cardinal-200 dark:border-cardinal-800">
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Outside of work */}
      <ScrollReveal delay={150}>
        <SectionHeader label="Outside of work" />
        <div className="grid grid-cols-3 gap-2 mb-5">
          <Image
            src="/lafc.jpg"
            alt="At LAFC game, United Airlines Field"
            width={400}
            height={500}
            className="rounded-xl object-cover w-full aspect-[3/4] shadow-sm"
          />
          <Image
            src="/dog.jpg"
            alt="With a dog on USC campus"
            width={400}
            height={500}
            className="rounded-xl object-cover w-full aspect-[3/4] shadow-sm"
          />
          <Image
            src="/guitar.jpeg"
            alt="Playing guitar"
            width={400}
            height={500}
            className="rounded-xl object-cover w-full aspect-[3/4] shadow-sm"
          />
          <Image
            src="/cooking.jpg"
            alt="Home-cooked meal"
            width={400}
            height={500}
            className="rounded-xl object-cover w-full aspect-[3/4] shadow-sm"
          />
          <Image
            src="/onemillion.jpg"
            alt="One Million Dance Studio"
            width={400}
            height={500}
            className="rounded-xl object-cover w-full aspect-[3/4] shadow-sm"
          />
          <Image
            src="/photography.JPG"
            alt="Shooting film at the beach"
            width={400}
            height={500}
            className="rounded-xl object-cover w-full aspect-[3/4] shadow-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {INTERESTS.map((interest) => (
            <span
              key={interest}
              className="px-3.5 py-1.5 text-[13px] rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 shadow-sm"
            >
              {interest}
            </span>
          ))}
        </div>
        <p className="text-[14px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
          I shoot film on weekends and have a soft spot for dogs — I&apos;ll stop mid-conversation
          to say hello. I love cooking and sharing food, so my roommates and I take turns cooking
          for each other every week. I catch LAFC games when I can and still dance when nobody&apos;s
          watching.
        </p>
      </ScrollReveal>

    </div>
  );
}
