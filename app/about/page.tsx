import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      <img
        src="/usc_me.JPG"
        alt="Portrait of Ji Min Lee"
        className="shadow-lg w-full"
        style={{
          maxWidth: 400,
          aspectRatio: "3/4",
          height: "auto",
          objectFit: "cover",
          borderRadius: "12px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">About</h1>
        <p>
          Hi, I’m <strong>Ji Min Lee</strong>. I build full-stack products and applied AI systems with a strong interest in healthcare,
          education, and human-centered design.
        </p>
        <p>
          Before USC, I worked at EMRO (Korea’s leading AI-powered supply-chain software provider), where I shipped internal AI products
          and backend systems used in procurement workflows at scale. Now at USC, I work across both research and engineering — from
          LLM-assisted modules to production-ready web systems.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-2">Now</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>M.S. in Computer Science (AI), USC (2025–2027)</li>
            <li>Web Team Lead, USC Interaction Lab (NIH R01 funded)</li>
            <li>Graduate Research Intern, USC AI for Health Lab</li>
          </ul>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-2">Previously</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Full-Stack Engineer, EMRO (2023–2025)</li>
            <li>B.Eng. Software Engineering, Gachon University (Cum Laude)</li>
            <li>ROK Army Sergeant (Signal School, Squad Leader)</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-semibold mb-2">Interests</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Human-centered AI, multimodal systems, AI agents, and product-oriented engineering. I enjoy turning ambiguous ideas into
          production systems that people actually use.
        </p>
      </div>

      <div className="text-sm space-y-1">
        <p>
          Email: <a href="mailto:leejimin@usc.edu" className="underline">leejimin@usc.edu</a>
        </p>
        <p>
          LinkedIn: <a href="https://www.linkedin.com/in/jiminlee4015" target="_blank" rel="noopener noreferrer" className="underline">linkedin.com/in/jiminlee4015</a>
        </p>
        <p>
          GitHub: <a href="https://github.com/masibasi" target="_blank" rel="noopener noreferrer" className="underline">github.com/masibasi</a>
        </p>
        <p>
          <Link href="/resume" className="underline">View resume</Link>
        </p>
      </div>
    </section>
  );
}
