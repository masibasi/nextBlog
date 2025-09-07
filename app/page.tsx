import { Posts } from "app/components/posts";

export default function Page() {
  return (
    <section className="flex flex-col items-center">
      {/* Intro */}
      <div className="w-full max-w-2xl mb-8">
        <p className="text-left">
          Hi, I’m <strong>Ji Min Lee</strong> — a software engineer with experience in full-stack development and applied AI. I’ve built enterprise-scale systems at <strong>EMRO</strong>, contributed
          to AI accessibility projects at <strong>Irvine Tech Hub</strong>, and I am currently pursuing my <strong>M.S. in Computer Science (AI) at USC</strong>. My focus is on human-centered AI,
          multimodal models, and building scalable systems that make real impact.
        </p>
      </div>

      {/* Recent Posts */}
      <div className="my-8 w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-3">Recent Posts</h2>
        <Posts />
      </div>
    </section>
  );
}
