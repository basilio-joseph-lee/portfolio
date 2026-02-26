"use client";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.replace("aos-hidden", "aos-visible");
        });
      },
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".aos-hidden").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("basiliojoseph550@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: "GitHub",
      handle: "@basilio-joseph-lee",
      href: "https://github.com/basilio-joseph-lee",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Email",
      handle: "basiliojoseph550@gmail.com",
      href: "mailto:basiliojoseph550@gmail.com",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="py-28 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          className="text-cyan-400 text-xs tracking-widest uppercase mb-3 aos-hidden"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          05 / Contact
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold mb-6 aos-hidden"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Let's Build Something
          <br />
          <span className="text-glow" style={{ color: "#22d3ee" }}>
            Together
          </span>
        </h2>
        <p
          className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto mb-12 aos-hidden"
          style={{ transitionDelay: "0.1s" }}
        >
          Whether you have a project in mind, need a developer for your team, or just want to say hi —
          my inbox is always open.
        </p>

        {/* Email CTA */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-12 aos-hidden"
          style={{ transitionDelay: "0.2s" }}
        >
          <a
            href="mailto:basiliojoseph550@gmail.com"
            className="px-8 py-4 rounded-lg font-semibold text-[#080c14] bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 glow-cyan text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Send an Email ✉
          </a>
          <button
            onClick={copyEmail}
            className="px-6 py-4 rounded-lg text-sm text-slate-300 border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem" }}
          >
            {copied ? "✓ Copied!" : "Copy Email"}
          </button>
        </div>

        {/* Social links */}
        <div
          className="flex flex-wrap justify-center gap-4 aos-hidden"
          style={{ transitionDelay: "0.3s" }}
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl text-slate-400 hover:text-cyan-400 transition-all duration-200 card-hover"
              style={{ background: "rgba(13,18,32,0.8)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem" }}
            >
              {s.icon}
              <span>{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
