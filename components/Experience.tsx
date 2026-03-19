"use client";
import { useEffect, useRef } from "react";

const experiences = [
  {
    role: "Flutter Mobile Developer Intern",
    company: "BMware Business Solutions Enterprises Inc.",
    period: "Dec 2025 – Present",
    type: "work",
    description:
      "Working as a Flutter Mobile Developer Intern at an I.T. Consultancy & Software Company in the Philippines. Developed and published a mobile app now live on Google Play Store, handling the full deployment pipeline through Google Play Console. Built cross-platform mobile applications with real client-facing features.",
    highlights: [
      "Published app on Google Play Store",
      "Mobile game with Flutter",
      "REST API integration",
      "Mobile UI/UX & state management",
    ],
    stack: ["Flutter", "Dart", "Google Play Console", "REST API", "Mobile UI/UX"],
  },
  {
    role: "Full-Stack Developer",
    company: "Capstone Project — Classroom Management System",
    period: "2023 – 2024",
    type: "project",
    description:
      "Led development of a large-scale Interactive Classroom Management System featuring 2D animations, mobile accessibility, and a kiosk-based interface. Streamlined attendance tracking, announcements, grading, and game-based performance activities. Won 5 awards including Overall Best Project at Holy Cross College.",
    highlights: [
      "2D animated classroom simulator",
      "Kiosk-based hardware interface",
      "Game-based performance activities",
      "Overall Best Project award",
    ],
    stack: ["React", "Next.js", "Flutter", "ASP.NET", "Django", "PHP", "MySQL", "PostgreSQL"],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="py-32 relative"
      ref={ref}
      style={{ background: "var(--bg2)" }}
    >
      <div className="gold-rule absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <p className="section-label mb-4 reveal">04 / Experience</p>
          <h2
            className="text-4xl md:text-5xl font-bold reveal"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--white)", lineHeight: 1.15 }}
          >
            Where I've{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Worked</em>
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute left-5 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, var(--gold), rgba(212,175,55,0.05))", opacity: 0.25 }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                className="relative flex gap-12 reveal"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="hidden md:flex flex-col items-center shrink-0 pt-7">
                  <div
                    className="w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: "var(--bg2)", borderColor: "var(--gold)", boxShadow: "0 0 12px rgba(212,175,55,0.4)" }}
                  />
                </div>

                <div className="card flex-1 p-8">
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                    style={{ background: i === 0 ? "linear-gradient(90deg, var(--gold), transparent)" : "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "var(--white)" }}>
                        {exp.role}
                      </h3>
                      <p className="text-sm" style={{ fontFamily: "'Space Mono', monospace", color: "var(--gold)" }}>
                        {exp.company}
                      </p>
                    </div>
                    <span className="tag-gold text-xs" style={{ whiteSpace: "nowrap" }}>{exp.period}</span>
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)", fontWeight: 300 }}>
                    {exp.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {exp.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>◆</span>
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((t) => (
                      <span key={t} className="tag-gold">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gold-rule absolute bottom-0 left-0 right-0" />
    </section>
  );
}