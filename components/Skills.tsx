"use client";
import { useEffect, useRef } from "react";

const skillGroups = [
  {
    category: "Frontend",
    icon: "⚡",
    skills: ["React", "Next.js", "Flutter", "Tailwind CSS", "Bootstrap 5", "CSS3", "HTML5"],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: ["ASP.NET", "Django", "PHP", "REST API", "Node.js"],
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    category: "DevOps & Deployment",
    icon: "🚀",
    skills: ["Hostinger", "Vercel", "Codemagic CI/CD", "Git", "GitHub"],
  },
  {
    category: "Mobile",
    icon: "📱",
    skills: ["Flutter", "Dart", "Mobile UI/UX", "Push Notifications", "QR Systems"],
  },
  {
    category: "Specialties",
    icon: "🎯",
    skills: ["Face Recognition", "SMS Integration", "Kiosk Systems", "Gamified UX", "Hardware Integration"],
  },
];

export default function Skills() {
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
      id="skills"
      className="py-28 relative"
      style={{ background: "rgba(13,18,32,0.6)" }}
      ref={ref}
    >
      {/* Section divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="text-cyan-400 text-xs tracking-widest uppercase mb-3 aos-hidden"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            02 / Skills
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold aos-hidden"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Tech I Work With
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              className="card-hover rounded-xl p-6 aos-hidden"
              style={{
                background: "rgba(13,18,32,0.8)",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{group.icon}</span>
                <h3
                  className="font-semibold text-slate-200"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)" }}
      />
    </section>
  );
}
