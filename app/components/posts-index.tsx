import { Posts } from "app/components/posts";

/** Posts list page shared by /posts and /ko/posts (heading stays in English). */
export function PostsIndex({ lang = "en" }: { lang?: "en" | "ko" }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl tracking-[-0.02em] text-neutral-900 dark:text-neutral-50 mb-2">Writing</h1>
        <p className="text-[14px] text-neutral-500 dark:text-neutral-400 mb-12">
          Occasional notes on building software, studying at USC, and figuring things out.
        </p>
        <Posts lang={lang} />
      </div>
    </div>
  );
}
