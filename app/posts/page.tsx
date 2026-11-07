import type { Metadata } from "next";
import { Posts } from "app/components/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building software, studying at USC, and figuring things out.",
};

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
      <h1 className="font-serif text-3xl tracking-[-0.02em] text-neutral-900 dark:text-neutral-50 mb-2">Writing</h1>
      <p className="max-w-2xl text-[14px] text-neutral-500 dark:text-neutral-400 mb-12">
        Occasional notes on building software, studying at USC, and figuring things out.
      </p>
      <Posts />
    </div>
  );
}
