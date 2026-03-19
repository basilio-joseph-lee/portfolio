"use client";
import { useEffect, useRef, useState } from "react";

const socials = [
  {
    name: "GitHub",
    handle: "@basilio-joseph-lee",
    href: "https://github.com/basilio-joseph-lee",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Email",
    handle: "basiliojoseph550@gmail.com",
    href: "mailto:basiliojoseph550@gmail.com",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("basiliojoseph550@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Large centered layout */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-6 reveal">06 / Contact</p>

          <h2
            className="text-4xl md:text-6xl font-bold mb-6 reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--white)",
              lineHeight: 1.15,
            }}
          >
            Let's Build Something{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Together</em>
          </h2>

          <p
            className="text-base leading-relaxed mb-12 reveal"
            style={{ color: "var(--text-secondary)", fontWeight: 300 }}
          >
            Whether you have a project in mind, need a developer for your team, or just want to say
            hi — my inbox is always open.
          </p>

          {/* Email CTA row */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
            <a href="mailto:basiliojoseph550@gmail.com" className="btn-primary">
              Send an Email ✉
            </a>
            <button onClick={copyEmail} className="btn-outline">
              {copied ? "✓ Copied!" : "Copy Email"}
            </button>
          </div>

          {/* Divider */}
          <div className="h-px w-32 mx-auto mb-12" style={{ background: "var(--border)" }} />

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-4 reveal">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-3 px-5 py-4 rounded-2xl group"
                style={{ textDecoration: "none" }}
              >
                <span style={{ color: "var(--text-muted)" }} className="group-hover:text-[var(--gold)] transition-colors duration-200">
                  {s.icon}
                </span>
                <span
                  className="text-sm transition-colors duration-200"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {s.handle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}