"use client";
import { useEffect, useRef } from "react";

const skillGroups = [
  {
    category: "Frontend",
    icon: "⚡",
    color: "#facc15",
    skills: ["React", "Next.js", "Flutter", "Tailwind CSS", "Bootstrap 5", "CSS3", "HTML5"],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "#34d399",
    skills: ["ASP.NET", "Django", "PHP", "REST API", "Node.js"],
  },
  {
    category: "Database",
    icon: "🗄️",
    color: "#60a5fa",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    category: "DevOps & Deploy",
    icon: "🚀",
    color: "#f472b6",
    skills: ["Hostinger", "Vercel", "Codemagic CI/CD", "Git", "GitHub"],
  },
  {
    category: "Mobile",
    icon: "📱",
    color: "#a78bfa",
    skills: ["Flutter", "Dart", "Mobile UI/UX", "Push Notifications", "QR Systems"],
  },
  {
    category: "Specialties",
    icon: "🎯",
    color: "var(--gold)",
    skills: ["Face Recognition", "SMS Integration", "Kiosk Systems", "Gamified UX", "Hardware Integration"],
  },
];

export default function Skills() {
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
      id="skills"
      className="py-32 relative"
      ref={ref}
      style={{ background: "var(--bg2)" }}
    >
      <div className="gold-rule absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-4 reveal">02 / Skills</p>
            <h2
              className="text-4xl md:text-5xl font-bold reveal"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "var(--white)",
                lineHeight: 1.15,
              }}
            >
              Tech I Work{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>With</em>
            </h2>
          </div>
          <p
            className="text-sm max-w-xs reveal"
            style={{ color: "var(--text-muted)", fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
          >
            A curated set of tools and technologies I use to bring ideas to life across web, mobile, and backend.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              className="card p-6 reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  {group.icon}
                </div>
                <div>
                  <h3
                    className="font-semibold text-sm"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: "var(--text)",
                    }}
                  >
                    {group.category}
                  </h3>
                  <div
                    className="h-0.5 w-6 rounded-full mt-1"
                    style={{ background: group.color }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule absolute bottom-0 left-0 right-0" />
    </section>
  );
}