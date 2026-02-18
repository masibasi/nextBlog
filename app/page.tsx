import { Posts } from "app/components/posts";

export default function Page() {
  return (
    <section className="page-wrap page-wrap--narrow space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-neutral-500">Ji Min Lee · Software Engineer</p>
        <h1 className="text-2xl font-semibold tracking-tight">Building human-centered AI products from research to production.</h1>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          I’m an M.S. CS (AI) student at USC with full-stack and applied AI experience across enterprise systems and research labs.
          I care about solving real user problems with reliable systems, thoughtful UX, and measurable impact.
        </p>
      </div>

      <div className="section-card">
        <h2 className="mb-3 font-medium">Current Focus</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
          <li>Web Team Lead for an NIH R01-funded USC research platform (Next.js, AWS, IoT).</li>
          <li>Graduate research in AI for Health (LLM-based simulation + CAT/IRT evaluation).</li>
          <li>Applied AI systems with production-minded architecture and fast iteration loops.</li>
        </ul>
      </div>

      <div className="w-full">
        <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
        <Posts />
      </div>
    </section>
  );
}
