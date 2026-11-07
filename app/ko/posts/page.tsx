import type { Metadata } from "next";
import { Posts } from "app/components/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "글",
  description: "소프트웨어를 만들고, USC에서 공부하며 생각한 것들을 가끔 적어요.",
};

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-12">
      <h1 className="font-serif text-3xl tracking-[-0.02em] text-neutral-900 dark:text-neutral-50 mb-2">글</h1>
      <p className="max-w-2xl text-[14px] text-neutral-500 dark:text-neutral-400 mb-12">
        소프트웨어를 만들고, USC에서 공부하며 생각한 것들을 가끔 적어요.
      </p>
      <Posts lang="ko" />
    </div>
  );
}
