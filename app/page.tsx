import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section className="flex flex-col items-center">
      {/* <div className="w-full bg-yellow-200 text-yellow-900 text-center py-2 text-sm font-semibold mb-4 rounded">🚧 This blog is under construction! Some features may change or be incomplete. 🚧</div> */}
      <div className="flex flex-row items-center w-full max-w-2xl mb-4 justify-between">
        <h1 className="text-2xl font-semibold tracking-tighter">Jimin's Dev Blog</h1>
      </div>
      <div className="w-full max-w-2xl mb-8">
        <p className="text-left">
          Hi, I'm Ji Min Lee – a curious developer with a strong desire to build meaningful, human-centered technologies. My background spans full-stack web development, and now I'm expanding into AI
          and machine learning to create tools that truly help people.
        </p>
      </div>
      <div className="my-8 w-full">
        <BlogPosts />
      </div>
    </section>
  );
}
