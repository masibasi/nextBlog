import type { Metadata } from "next";
import { Posts } from "app/components/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building software, studying at USC, and figuring things out.",
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <section>
        <h1 className="font-serif text-3xl mb-2 tracking-tight text-neutral-900 dark:text-neutral-100">Writing</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Occasional notes on building software, studying at USC, and figuring things out.
        </p>
        <Posts />
      </section>
    </div>
  );
}
