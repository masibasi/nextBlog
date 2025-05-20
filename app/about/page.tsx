export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto py-8 px-4">
      <img src="/me.jpg" alt="Ji Min Lee" width={300} className="shadow-lg mb-6" style={{ objectFit: "cover", borderRadius: "2px" }} />
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <p className="mb-4">
        Hi, I'm Ji Min Lee – a curious developer with a strong desire to build meaningful, human-centered technologies. My background spans full-stack web development, and now I'm expanding into AI
        and machine learning to create tools that truly help people.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">My Career Path</h2>
      <ul className="mb-6 list-disc pl-6">
        <li>🎓 B.S. in Computer Engineering, Gachon University (2018–2023)</li>
        <li>💻 Full-stack engineer at EMRO (2023.09–2025.06)</li>
        <li>✈️ Incoming MSCS-AI student at USC (Fall 2025)</li>
        <li>🧠 Current focus: Human-Centered AI, Multimodal Models, Product-focused Engineering</li>
      </ul>
      {/* <h2 className="text-xl font-semibold mt-8 mb-2">What I'm Exploring</h2>
      <ul className="mb-6 list-disc pl-6">
        <li>React, Next.js, Spring Boot, Docker, AWS</li>
        <li>AI agents, Prompt engineering, LLM playgrounds</li>
        <li>Studying for technical interviews & preparing a portfolio for internships in the U.S.</li>
      </ul> */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Links</h2>
      <ul className="mb-6 list-disc pl-6">
        <li>
          GitHub:{" "}
          <a href="https://github.com/masibasi" className="text-blue-600 underline">
            github.com/masibasi
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a href="https://linkedin.com/in/jiminlee4015" className="text-blue-600 underline">
            linkedin.com/in/jiminlee4015
          </a>
        </li>
        <li>
          Instagram:{" "}
          <a href="https://instagram.com/naive_jimin" className="text-blue-600 underline">
            instagram.com/naive_jimin
          </a>
        </li>
        <li>
          Naver Blog (KR):{" "}
          <a href="https://blog.naver.com/jimin_lee98" className="text-blue-600 underline">
            blog.naver.com
          </a>{" "}
          — where I occasionally write about everyday moments and personal reflections.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Fun Facts</h2>
      <ul className="list-disc pl-6">
        <li>I love capturing moments on film 🎞️, learning guitar 🎸, and dancing.</li>
        <li>Longtime fan of Tottenham ⚽ and T1 🎮.</li>
        <li>Passionate about animals</li>
      </ul>
    </section>
  );
}
