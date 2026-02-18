import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Ji Min Lee",
};

export default function ResumePage() {
  return (
    <main className="max-w-3xl mx-auto py-4 px-4 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Resume</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Software Engineer · Full-Stack & Applied AI</p>
        </div>
        <a
          href="/Ji_Min_Lee_resume2.11.pdf"
          download
          className="rounded-full border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          Download PDF
        </a>
      </div>

      <div className="rounded-xl border p-4 text-sm text-neutral-700 dark:text-neutral-300">
        <p><strong>Location:</strong> Los Angeles, CA</p>
        <p><strong>Email:</strong> <a href="mailto:leejimin@usc.edu" className="underline">leejimin@usc.edu</a></p>
        <p><strong>Links:</strong> <a href="https://jimin.blog" className="underline">jimin.blog</a> · <a href="https://www.linkedin.com/in/jiminlee4015" className="underline">LinkedIn</a> · <a href="https://github.com/masibasi" className="underline">GitHub</a></p>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <iframe
          src="/Ji_Min_Lee_resume2.11.pdf#view=FitH"
          title="Ji Min Lee Resume"
          className="w-full"
          style={{ minHeight: "75vh" }}
        />
      </div>

      <p className="text-xs text-neutral-500">If the embedded viewer does not load on your device, use the Download PDF button above.</p>
    </main>
  );
}
