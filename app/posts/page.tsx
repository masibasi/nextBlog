import { Posts } from "app/components/posts";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <section>
        <h1 className="font-serif text-3xl tracking-[-0.02em] text-neutral-900 dark:text-neutral-50 mb-2">Writing</h1>
        <p className="text-[14px] text-neutral-500 dark:text-neutral-400 mb-10">Things I think about — AI, software, and occasionally life.</p>
        <Posts />
      </section>
    </div>
  );
}
