"use client";
import { useEffect, useRef } from "react";

const facts = [
  { label: "Location", value: "Philippines 🇵🇭" },
  { label: "Focus", value: "Web & Mobile" },
  { label: "Deployment", value: "Hostinger, Vercel" },
  { label: "CI/CD", value: "Codemagic" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 md:py-32 relative" ref={ref}>
      <div className="gold-rule absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* Left: profile card */}
          <div className="reveal-left order-2 lg:order-1">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }}
                />
                <div className="text-6xl sm:text-7xl mb-5">👨‍💻</div>
                <div className="text-xl sm:text-2xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: "var(--white)" }}
                >
                  Basilio Joseph Lee
                </div>
                <div className="text-xs sm:text-sm mb-5"
                  style={{ color: "var(--gold)", fontFamily: "'Space Mono', monospace" }}
                >
                  Full-Stack & Mobile Developer
                </div>
                <div className="h-px w-full mb-5" style={{ background: "var(--border)" }} />
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {facts.map((f) => (
                    <div key={f.label} className="p-2.5 sm:p-3 rounded-xl"
                      style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
                    >
                      <div className="section-label mb-1" style={{ fontSize: "0.55rem" }}>{f.label}</div>
                      <div className="text-xs sm:text-sm font-medium"
                        style={{ color: "var(--text)", fontFamily: "'Outfit', sans-serif" }}
                      >{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-xs font-bold"
                style={{ background: "var(--gold)", color: "#09090b", fontFamily: "'Space Mono', monospace", boxShadow: "0 8px 30px rgba(212,175,55,0.3)" }}
              >
                $ npm run dev ✓
              </div>
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 w-16 h-16 sm:w-20 sm:h-20 rounded-full border opacity-20 pointer-events-none"
                style={{ borderColor: "var(--gold)" }}
              />
            </div>
          </div>

          {/* Right: text */}
          <div className="order-1 lg:order-2">
            <p className="section-label mb-3 reveal">01 / About Me</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 reveal"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--white)", lineHeight: 1.15 }}
            >
              Crafting Digital{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Experiences</em>
            </h2>
            <div className="space-y-4 reveal" style={{ color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.8 }}>
              <p className="text-sm sm:text-base">
                I'm a passionate full-stack and mobile developer who loves turning ideas into real, working products.
                My experience spans the entire software stack — from interactive UIs built with{" "}
                <span style={{ color: "var(--text)", fontWeight: 500 }}>React and Next.js</span> to
                cross-platform mobile apps crafted in <span style={{ color: "var(--text)", fontWeight: 500 }}>Flutter</span>.
              </p>
              <p className="text-sm sm:text-base">
                On the back end, I work across{" "}
                <span style={{ color: "var(--text)", fontWeight: 500 }}>ASP.NET, Django, PHP</span>,
                and REST APIs, connecting everything to{" "}
                <span style={{ color: "var(--text)", fontWeight: 500 }}>MySQL and PostgreSQL</span>{" "}
                databases. I've deployed production systems on{" "}
                <span style={{ color: "var(--text)", fontWeight: 500 }}>Hostinger</span> and set up
                automated pipelines with <span style={{ color: "var(--text)", fontWeight: 500 }}>Codemagic CI/CD</span>.
              </p>
              <p className="text-sm sm:text-base">
                During my internship at <span style={{ color: "var(--text)", fontWeight: 500 }}>BMware Business Solutions Enterprises Inc.</span>,
                I developed and published a mobile app to the{" "}
                <span style={{ color: "var(--text)", fontWeight: 500 }}>Google Play Store</span>,
                built a Flutter-based mobile game, and worked on cross-platform production apps —
                gaining hands-on experience with state management, REST API integration, and real client-facing features.
              </p>
            </div>
            <div className="mt-8 reveal">
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                Get in Touch →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}