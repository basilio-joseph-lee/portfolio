"use client";
import { useEffect, useRef } from "react";

const experiences = [
  {
    role: "Mobile App Developer Intern",
    company: "BMware Inc.",
    period: "Internship",
    type: "work",
    description:
      "Developed mobile applications across multiple domains including information systems, transaction platforms, and game applications. Gained hands-on experience delivering production-ready mobile solutions in a professional environment.",
    highlights: [
      "Information system mobile app",
      "Transaction management app",
      "Game system application",
      "Cross-platform development",
    ],
    stack: ["Flutter", "Dart", "Mobile Dev"],
  },
  {
    role: "Full-Stack Developer",
    company: "Capstone Project — CMS",
    period: "2023 – 2024",
    type: "project",
    description:
      "Led development of a large-scale Classroom Management System as capstone project. Architected and built the entire system including web dashboard, mobile app, kiosk interface, and hardware integration.",
    highlights: [
      "System architecture design",
      "Multi-platform development",
      "Hardware (kiosk) integration",
      "Team collaboration & deployment",
    ],
    stack: ["React", "Next.js", "Flutter", "ASP.NET", "Django", "PHP", "MySQL", "PostgreSQL"],
  },
];

export default function Experience() {
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
    <section
      id="experience"
      className="py-28 relative"
      style={{ background: "rgba(13,18,32,0.6)" }}
      ref={ref}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p
            className="text-cyan-400 text-xs tracking-widest uppercase mb-3 aos-hidden"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            04 / Experience
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold aos-hidden"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Where I've Worked
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(34,211,238,0.4), rgba(34,211,238,0.05))" }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                className="relative flex gap-8 aos-hidden"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {/* Dot */}
                <div className="hidden md:flex flex-shrink-0 w-12 items-start pt-6 justify-center">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-cyan-400"
                    style={{ background: "#080c14", boxShadow: "0 0 8px rgba(34,211,238,0.4)" }}
                  />
                </div>

                {/* Card */}
                <div
                  className="flex-1 card-hover rounded-xl p-7"
                  style={{ background: "rgba(13,18,32,0.8)" }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="text-lg font-bold text-slate-100"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-cyan-400 text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span
                      className="text-xs text-slate-500 px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(34,211,238,0.06)",
                        border: "1px solid rgba(34,211,238,0.12)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-slate-400 leading-relaxed mb-5">{exp.description}</p>

                  {/* Highlights */}
                  <ul className="grid grid-cols-2 gap-1.5 mb-5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="text-cyan-400 text-xs">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)" }}
      />
    </section>
  );
}
