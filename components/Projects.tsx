"use client";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Interactive Classroom Management System",
    subtitle: "Capstone Project · 2024",
    description:
      "A comprehensive classroom ecosystem featuring a 2D classroom simulator, gamified quiz via QR code scanning, facial recognition attendance, SMS notifications to parents, a behavior kiosk for students (snack, recess, in/out logs), and a real-time parent monitoring dashboard — all connected to a cross-platform mobile app.",
    features: [
      "Face Recognition Attendance",
      "SMS Parent Notifications",
      "Gamified QR Quiz Game",
      "2D Classroom Simulator",
      "Behavior Kiosk Hardware",
      "Parent Monitoring App",
      "Grading System",
      "Real-Time Dashboard",
    ],
    stack: ["React", "Flutter", "ASP.NET", "Django", "PHP", "MySQL", "PostgreSQL", "REST API"],
    github: "https://github.com/basilio-joseph-lee/CMS",
    type: "Capstone",
    featured: true,
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <section id="projects" className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p
            className="text-cyan-400 text-xs tracking-widest uppercase mb-3 aos-hidden"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            03 / Projects
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold aos-hidden"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            What I've Built
          </h2>
        </div>

        {projects.map((project, i) => (
          <div
            key={project.title}
            className="rounded-2xl overflow-hidden aos-hidden"
            style={{
              background: "rgba(13,18,32,0.9)",
              border: "1px solid rgba(34,211,238,0.15)",
              boxShadow: "0 0 60px rgba(34,211,238,0.04)",
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            {/* Top bar */}
            <div
              className="h-1 w-full"
              style={{ background: "linear-gradient(90deg, #22d3ee, #06b6d4, transparent)" }}
            />

            <div className="p-8 md:p-10">
              <div className="flex flex-wrap items-start gap-4 justify-between mb-6">
                <div>
                  {/* Featured badge */}
                  {project.featured && (
                    <span
                      className="inline-block mb-3 text-xs px-2.5 py-1 rounded"
                      style={{
                        background: "rgba(34,211,238,0.12)",
                        border: "1px solid rgba(34,211,238,0.3)",
                        color: "#22d3ee",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      ★ Featured Project
                    </span>
                  )}
                  <h3
                    className="text-xl md:text-2xl font-bold text-slate-100 mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-cyan-400 text-sm"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {project.subtitle}
                  </p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-300 border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </div>

              <p className="text-slate-400 leading-relaxed mb-8 max-w-3xl">
                {project.description}
              </p>

              {/* Features grid */}
              <div className="mb-8">
                <p
                  className="text-xs text-slate-500 uppercase tracking-widest mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Key Features
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {project.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded"
                      style={{ background: "rgba(34,211,238,0.04)" }}
                    >
                      <span className="text-cyan-400 text-xs">▸</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack tags */}
              <div>
                <p
                  className="text-xs text-slate-500 uppercase tracking-widest mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* More projects CTA */}
        <div
          className="text-center mt-10 aos-hidden"
          style={{ transitionDelay: "0.2s" }}
        >
          <a
            href="https://github.com/basilio-joseph-lee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            See more on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
