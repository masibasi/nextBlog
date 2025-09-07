export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto py-8 px-4">
      <img
        src="/usc_me.jpg"
        alt="Portrait of Ji Min Lee"
        className="shadow-lg mb-6 w-full"
        style={{
          maxWidth: 480,
          height: 360,
          objectFit: "cover",
          borderRadius: "6px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <div className="mb-4 flex flex-col gap-1">
        <span>
          Email:{" "}
          <a href="mailto:jimin.lee4015@gmail.com" className="text-blue-600 underline">
            jimin.lee4015@gmail.com
          </a>{" "}
          /{" "}
          <a href="mailto:leejimin@usc.edu" className="text-blue-600 underline">
            leejimin@usc.edu
          </a>
        </span>
        <span>
          Instagram:{" "}
          <a href="https://www.instagram.com/naive_jimin/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            @naive_jimin
          </a>
        </span>
      </div>
      <p className="mb-4">
        Hi, I’m Ji Min Lee — a software engineer with a strong foundation in full-stack development and a growing focus on artificial intelligence. I’ve built enterprise systems at EMRO, contributed
        to accessibility-focused AI projects at Irvine Tech Hub, and now pursue an M.S. in Computer Science (AI) at USC. I aim to build human-centered AI that bridges research and real-world
        applications.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Career</h2>
      <ul className="mb-6 list-disc pl-6">
        <li>
          🧪 <strong>Graduate Researcher, USC AI for Health Lab</strong> (Sep 2025 – Present) — Adaptive survey generation with LLMs to improve screening efficiency and diagnostic accuracy.
        </li>
        <li>
          💻 <strong>Full-Stack Engineer, EMRO</strong> (Sep 2023 – Jun 2025) — AI Business Division; built intelligent recommendation modules and hybrid CI/CD (Azure + on-prem) for Hyundai Motor
          procurement systems.
        </li>
        <li>
          🤖 <strong>AI Engineering Apprentice, Irvine Tech Hub</strong> (Jan 2023 – Feb 2023) — Led a 4-person team to build an AI image-generation service for dyslexic users; fine-tuned Stable
          Diffusion and deployed on Hugging Face.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Education</h2>
      <ul className="mb-6 list-disc pl-6">
        <li>
          🎓 <strong>M.S. in Computer Science (AI), University of Southern California</strong> (Aug 2025 – May 2027)
        </li>
        <li>
          🎓 <strong>B.Eng. in Software Engineering, Gachon University</strong> (2018 – 2024) — GPA 4.13/4.5, Cum Laude
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Research &amp; Career Interests</h2>
      <ul className="mb-6 list-disc pl-6">
        <li>Human-Centered AI</li>
        <li>Multimodal Models &amp; AI Agents</li>
        <li>Applied ML Systems &amp; Product-Focused Engineering</li>
      </ul>

      {/* <h2 className="text-xl font-semibold mt-8 mb-2">Links</h2> */}
      {/* <ul className="mb-6 list-disc pl-6">
        <li>
          GitHub:{" "}
          <a href="https://github.com/masibasi" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            github.com/masibasi
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a href="https://linkedin.com/in/jiminlee4015" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/jiminlee4015
          </a>
        </li>
      </ul> */}

      <h2 className="text-xl font-semibold mt-8 mb-2">Fun Facts</h2>
      <ul className="list-disc pl-6">
        <li>Enjoy film photography 🎞️, guitar 🎸, and dancing.</li>
        <li>Big fan of Spurs ⚽ and T1 🎮.</li>
      </ul>
    </section>
  );
}
