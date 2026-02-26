"use client";
import { useEffect, useState } from "react";

const roles = [
  "Full-Stack Developer",
  "Mobile App Developer",
  "UI/UX Enthusiast",
  "Systems Builder",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 35);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [charIndex, typing, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Background orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
          filter: "blur(30px)",
          animation: "float 10s ease-in-out infinite 2s",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border"
            style={{
              borderColor: "rgba(34,211,238,0.2)",
              background: "rgba(34,211,238,0.05)",
              animation: "fadeIn 0.5s ease forwards",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{ boxShadow: "0 0 6px #22d3ee", animation: "blink 2s ease-in-out infinite" }}
            />
            <span
              className="text-cyan-400 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Available for work
            </span>
          </div>

          {/* Name */}
          <h1
            className="text-5xl md:text-7xl font-extrabold leading-none mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              animation: "fadeUp 0.7s ease 0.1s both",
            }}
          >
            Basilio
            <br />
            <span className="text-glow" style={{ color: "#22d3ee" }}>
              Joseph Lee
            </span>
          </h1>

          {/* Typewriter */}
          <div
            className="flex items-center gap-1 mb-6"
            style={{ animation: "fadeUp 0.7s ease 0.25s both" }}
          >
            <span
              className="text-xl md:text-2xl text-slate-300"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              &lt;{displayed}
            </span>
            <span
              className="text-xl md:text-2xl text-cyan-400"
              style={{ fontFamily: "'JetBrains Mono', monospace", animation: "blink 1s step-end infinite" }}
            >
              |
            </span>
            <span
              className="text-xl md:text-2xl text-slate-300"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              /&gt;
            </span>
          </div>

          {/* Bio */}
          <p
            className="text-slate-400 text-lg leading-relaxed max-w-xl mb-10"
            style={{ animation: "fadeUp 0.7s ease 0.4s both" }}
          >
            I build fast, scalable web and mobile systems — from pixel-perfect UIs to
            robust back-end APIs. Passionate about turning complex ideas into smooth,
            deployable products with clean code and great user experiences.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation: "fadeUp 0.7s ease 0.55s both" }}
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded text-sm font-semibold text-[#080c14] bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 glow-cyan"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              View My Work
            </button>
            <a
              href="https://github.com/basilio-joseph-lee"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded text-sm font-semibold text-slate-300 border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              GitHub Profile ↗
            </a>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-8 mt-14 pt-8 border-t"
            style={{
              borderColor: "rgba(34,211,238,0.1)",
              animation: "fadeUp 0.7s ease 0.7s both",
            }}
          >
            {[
              { value: "2+", label: "Years Experience" },
              { value: "5+", label: "Tech Stacks" },
              { value: "CI/CD", label: "Codemagic & Hostinger" },
              { value: "∞", label: "Problems Solved" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl font-bold text-cyan-400"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          scroll
        </span>
        <div
          className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"
          style={{ animation: "fadeIn 1s ease 1.5s both" }}
        />
      </div>
    </section>
  );
}
