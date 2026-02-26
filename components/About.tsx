"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.replace("aos-hidden", "aos-visible");
        });
      },
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll(".aos-hidden").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: visual */}
          <div className="aos-hidden flex justify-center md:justify-start">
            <div className="relative">
              {/* Avatar placeholder */}
              <div
                className="w-64 h-64 rounded-2xl flex items-center justify-center text-7xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0d1220 0%, #111827 100%)",
                  border: "1px solid rgba(34,211,238,0.2)",
                  boxShadow: "0 0 40px rgba(34,211,238,0.07)",
                }}
              >
                {/* Code decoration */}
                <div
                  className="absolute inset-0 p-4 opacity-10 overflow-hidden"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", color: "#22d3ee" }}
                >
                  {`const dev = {\n  name: "BJ",\n  role: "FullStack",\n  passion: "build"\n}`}
                </div>
                <div className="relative z-10 text-6xl">👨‍💻</div>
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(34,211,238,0.1)",
                  border: "1px solid rgba(34,211,238,0.25)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#22d3ee",
                }}
              >
                $ npm run dev ✓
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p
              className="text-cyan-400 text-xs tracking-widest uppercase mb-3 aos-hidden"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              01 / About Me
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 section-title aos-hidden"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Crafting Digital Experiences
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p className="aos-hidden">
                I'm a passionate full-stack and mobile developer who loves turning ideas into
                real, working products. My experience spans the entire software stack — from
                interactive UIs built with <span className="text-slate-200">React and Next.js</span> to
                cross-platform mobile apps crafted in <span className="text-slate-200">Flutter</span>.
              </p>
              <p className="aos-hidden" style={{ transitionDelay: "0.1s" }}>
                On the back end, I work across <span className="text-slate-200">ASP.NET, Django, PHP</span>,
                and REST APIs, connecting everything to <span className="text-slate-200">MySQL and PostgreSQL</span> databases.
                I've deployed production systems on <span className="text-slate-200">Hostinger</span> and
                set up automated pipelines with <span className="text-slate-200">Codemagic CI/CD</span>.
              </p>
              <p className="aos-hidden" style={{ transitionDelay: "0.2s" }}>
                My capstone project — a full classroom management platform with face recognition,
                SMS notifications, a gamified quiz system, and kiosk hardware — reflects my drive
                to build systems that solve real problems at scale.
              </p>
            </div>

            {/* Quick facts */}
            <div
              className="grid grid-cols-2 gap-4 mt-8 aos-hidden"
              style={{ transitionDelay: "0.3s" }}
            >
              {[
                { label: "Location", value: "Philippines" },
                { label: "Focus", value: "Web & Mobile" },
                { label: "Deployment", value: "Hostinger, Vercel" },
                { label: "CI/CD", value: "Codemagic" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="p-3 rounded-lg"
                  style={{ background: "rgba(34,211,238,0.04)", border: "1px solid rgba(34,211,238,0.1)" }}
                >
                  <div
                    className="text-xs text-cyan-400 mb-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {f.label}
                  </div>
                  <div className="text-sm text-slate-200 font-medium">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
