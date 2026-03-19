"use client";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Interactive Classroom Management System",
    subtitle: "Capstone Project · 2024",
    description:
      "A comprehensive classroom ecosystem featuring 2D animations, mobile accessibility, and a kiosk-based interface. Streamlined attendance tracking, announcements, grading, and game-based performance activities.",
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
    github: "https://github.com/basilio-joseph-lee/CMS",
    image: null as string | null,
    featured: true,
    awards: ["Best in System", "Best in Research Paper", "Best Presenter", "Best Project for Community Extension", "Overall Best Project"],
  },
  {
    title: "Clinic Management System",
    subtitle: "Project",
    description:
      "Designed and implemented a system to manage patient records, admissions, and inventory, improving clinic efficiency and data accuracy.",
    features: [
      "Patient Records Management",
      "Admissions Tracking",
      "Inventory Management",
      "Data Accuracy System",
    ],
    github: "https://github.com/basilio-joseph-lee",
    image: null as string | null,
    featured: false,
    awards: [],
  },
  {
    title: "Subscription Reminder Automation",
    subtitle: "Automation & AI Integration",
    description:
      "This automation helps businesses manage subscriptions more efficiently by automatically tracking due dates, sending timely reminders, and updating notification statuses without manual work. It reduces missed payments, improves customer retention, and saves time through a scalable and consistent process. It can also be expanded with AI by personalizing reminder messages based on user behavior, optimizing the timing of notifications for higher response rates, and integrating with payment systems to trigger smart follow-ups and automated billing.",
    features: [
      "Auto Due Date Tracking",
      "Timely Reminder Sending",
      "Notification Status Updates",
      "AI-Personalized Messages",
      "Payment System Integration",
      "Smart Follow-ups",
      "Automated Billing",
      "Scalable Architecture",
    ],
    github: "https://github.com/basilio-joseph-lee",
    image: "/images/AU.png" as string | null,
    featured: false,
    awards: [],
  },
];

export default function Projects() {
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
    <section id="projects" className="py-16 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-16">
          <p className="section-label mb-4 reveal">03 / Projects</p>
          <h2
            className="text-3xl md:text-5xl font-bold reveal"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--white)", lineHeight: 1.15 }}
          >
            What I've{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Built</em>
          </h2>
        </div>

        <div className="space-y-5">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="rounded-2xl overflow-hidden reveal"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                transitionDelay: `${idx * 0.1}s`,
              }}
            >
              <div
                className="h-1"
                style={{ background: project.featured ? "linear-gradient(90deg, var(--gold), rgba(212,175,55,0.2), transparent)" : "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }}
              />

              <div className="p-5 sm:p-8 md:p-10">
                {/* Top row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {project.featured && <span className="tag-gold">★ Featured</span>}
                      {project.awards.length > 0 && (
                        <span className="tag-gold">🏆 {project.awards.length} Awards</span>
                      )}
                    </div>
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-bold mb-1"
                      style={{ fontFamily: "'Playfair Display', serif", color: "var(--white)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm" style={{ fontFamily: "'Space Mono', monospace", color: "var(--gold)" }}>
                      {project.subtitle}
                    </p>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center gap-2 shrink-0 text-xs sm:text-sm"
                    style={{ padding: "8px 14px" }}
                  >
                    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                </div>

                {/* Image */}
                {project.image && (
                  <div
                    className="w-full rounded-xl mb-6 overflow-hidden"
                    style={{ background: "var(--bg2)", border: "1px solid var(--border)", height: "370px" }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                    />
                  </div>
                )}

                {/* Awards */}
                {project.awards.length > 0 && (
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.awards.map((a) => (
                      <span
                        key={a}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(212,175,55,0.08)",
                          border: "1px solid rgba(212,175,55,0.2)",
                          color: "var(--gold)",
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        🏆 {a}
                      </span>
                    ))}
                  </div>
                )}

                <p
                  className="text-sm sm:text-base leading-relaxed mb-6"
                  style={{ color: "var(--text-secondary)", fontWeight: 300 }}
                >
                  {project.description}
                </p>

                {/* Features */}
                <div>
                  <p className="section-label mb-3" style={{ fontSize: "0.6rem" }}>Key Features</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {project.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2 p-2.5 rounded-xl text-xs sm:text-sm"
                        style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                      >
                        <span style={{ color: "var(--gold)", fontSize: "0.6rem", flexShrink: 0 }}>◆</span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 reveal">
          <a
            href="https://github.com/basilio-joseph-lee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors duration-200"
            style={{ fontFamily: "'Space Mono', monospace", color: "var(--text-muted)", fontSize: "0.75rem" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            See more on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}