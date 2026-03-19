"use client";
import { useEffect, useRef } from "react";

const certifications = [
  { title: "Best in System", issuer: "Holy Cross College", date: "May 2024", icon: "🏆" },
  { title: "Best in Research Paper", issuer: "Holy Cross College", date: "May 2024", icon: "📄" },
  { title: "Best Presenter", issuer: "Holy Cross College", date: "May 2024", icon: "🎤" },
  { title: "Best Project for Community Extension", issuer: "Holy Cross College", date: "May 2024", icon: "🌟" },
  { title: "Overall Best Project", issuer: "Holy Cross College", date: "May 2024", icon: "👑" },
];

const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Holy Cross College Pampanga",
  period: "2022 – Present",
};

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" className="py-32 relative" ref={ref}>
      <div className="gold-rule absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-4 reveal">05 / Awards & Education</p>
          <h2
            className="text-4xl md:text-5xl font-bold reveal"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--white)", lineHeight: 1.15 }}
          >
            Recognition &{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Credentials</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-start">

          {/* Awards grid */}
          <div>
            <p className="section-label mb-6 reveal" style={{ fontSize: "0.6rem" }}>Awards — Holy Cross College · May 2024</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, i) => (
                <div
                  key={cert.title}
                  className="card p-6 reveal"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                    style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
                  >
                    {cert.icon}
                  </div>
                  <h3
                    className="font-semibold text-sm mb-1 leading-snug"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--text)" }}
                  >
                    {cert.title}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "var(--gold)", fontFamily: "'Space Mono', monospace" }}
                  >
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education card */}
          <div className="reveal lg:w-72" style={{ transitionDelay: "0.3s" }}>
            <p className="section-label mb-6" style={{ fontSize: "0.6rem" }}>Education</p>
            <div
              className="card p-8 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }}
              />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                🎓
              </div>
              <h3
                className="font-bold text-lg mb-2 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--white)" }}
              >
                {education.degree}
              </h3>
              <p
                className="text-sm mb-3"
                style={{ color: "var(--gold)", fontFamily: "'Space Mono', monospace" }}
              >
                {education.school}
              </p>
              <span className="tag-gold">{education.period}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}