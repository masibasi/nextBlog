import { Posts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
        <Posts />
      </section>
    </div>
  );
}
