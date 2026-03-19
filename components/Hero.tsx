"use client";
import { useEffect, useState, useRef } from "react";

const roles = ["Full-Stack Developer", "Mobile App Developer", "UI/UX Enthusiast", "Systems Builder"];

// ── Groq AI ────────────────────────────────────────────────────────────────
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";

const SYSTEM_PROMPT = `You are Joseph's personal AI assistant embedded in Basilio Joseph Lee's developer portfolio.
Your ONLY job is to answer questions about Joseph — his skills, experience, projects, background, and how to contact him.
If anyone asks about anything unrelated to Joseph, politely redirect them.

NAME: Basilio Joseph Lee (goes by "Joseph")
LOCATION: Philippines
ROLE: Web and Mobile Developer (Frontend & Backend)
STATUS: Open to work / available for opportunities
EMAIL: basiliojoseph550@gmail.com | PHONE: +639084055305

ABOUT: Frontend & Backend Developer specializing in modern web and mobile applications. Continuously explores new technologies and aims to integrate AI into impactful, real-world solutions.

EDUCATION: Bachelor of Science in Information Technology, Holy Cross College Pampanga (2022 – Present)

SKILLS:
- Frontend: React, Next.js, Flutter, Tailwind CSS, Bootstrap 5, CSS3, HTML5
- Backend: ASP.NET, Django, PHP, REST API, Node.js
- Database: MySQL, PostgreSQL, Supabase
- DevOps: Hostinger, Vercel, Render, Codemagic CI/CD, Git, GitHub, Google Play Console
- Mobile: Flutter, Dart, Mobile UI/UX, Push Notifications, QR Systems, State Management
- Specialties: Face Recognition, SMS Integration, Kiosk Systems, Gamified UX, Hardware Integration, AI Integration

WORK EXPERIENCE:
Flutter Mobile Developer Intern at BMware Business Solutions Enterprises Inc. (Dec 2025 – Present)
- Published a mobile app to Google Play Store, handling full deployment via Google Play Console
- Developed a mobile game with Flutter (game logic, UI, UX)
- Built cross-platform production apps with Flutter & Dart
- Worked on mobile UI/UX, state management, REST API integration

PROJECTS:
1. Interactive Classroom Management System (Capstone, 2024) — FEATURED
   2D animations, kiosk interface, attendance, grading, game-based activities.
   Awards: Best in System, Best in Research Paper, Best Presenter, Best Project for Community Extension, Overall Best Project
   Stack: React, Flutter, ASP.NET, Django, PHP, MySQL, PostgreSQL, REST API
   GitHub: https://github.com/basilio-joseph-lee/CMS
2. Clinic Management System — manages patient records, admissions, inventory.
3. Subscription Reminder Automation — auto-tracks due dates, sends reminders, expandable with AI for personalized messages and smart billing.

AWARDS (Holy Cross College, May 2024): Best in System, Best in Research Paper, Best Presenter, Best Project for Community Extension, Overall Best Project

CONTACT: basiliojoseph550@gmail.com | https://github.com/basilio-joseph-lee

Keep answers concise, warm, and helpful. Never make up information not listed above.`;

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What tech does Joseph use?",
  "Tell me about his project",
  "Is he open to hire?",
  "How to contact Joseph?",
];

// ── Embedded frosted chat ──────────────────────────────────────────────────
function EmbeddedChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm Joseph's AI. Ask me anything about his skills, projects, or how to work with him!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 150);
  }, []);

  const send = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    if (!GROQ_API_KEY) {
      setMessages((p) => [...p,
        { role: "user", content },
        { role: "assistant", content: "⚠️ No API key found. Add NEXT_PUBLIC_GROQ_API_KEY to your .env.local file and restart the dev server." },
      ]);
      setInput("");
      return;
    }

    setInput("");
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...next],
          max_tokens: 350,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.error?.message || `API error ${res.status}`;
        throw new Error(msg);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, couldn't get a response.";
      setMessages((p) => [...p, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : "Unknown error";
      setMessages((p) => [...p, {
        role: "assistant",
        content: `❌ Error: ${errMsg}`,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col"
      style={{
        background: "transparent",
        position: "absolute",
        left: 0,
        right: 0,
        top: "20%",
        bottom: "20%",
        paddingLeft: "40px",
        overflow: "hidden",
      }}
    >
      {/* Chat header */}
      <div
        className="flex items-center gap-3 shrink-0 pb-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex-1 min-w-0">
          <div
            className="text-sm font-semibold"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--text)" }}
          >
            Joseph's AI Assistant
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "4px 10px",
            cursor: "pointer",
            color: "var(--text-muted)",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.05em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
            (e.currentTarget as HTMLElement).style.color = "var(--gold)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
          }}
        >
          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Close
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-0 py-4 space-y-3"
        style={{ minHeight: 0, scrollbarWidth: "thin", scrollbarColor: "rgba(212,175,55,0.2) transparent" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
          >
            <div
              className="max-w-[85%] px-4 py-2.5 text-sm leading-relaxed"
              style={
                msg.role === "user"
                  ? {
                      background: "var(--gold)",
                      color: "#09090b",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 500,
                      borderRadius: "18px 18px 4px 18px",
                    }
                  : {
                      background: "var(--surface2)",
                      color: "var(--text-secondary)",
                      fontFamily: "'Outfit', sans-serif",
                      border: "1px solid var(--border)",
                      borderRadius: "18px 18px 18px 4px",
                    }
              }
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing dots */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              className="px-4 py-3 flex items-center gap-1.5"
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "18px 18px 18px 4px",
              }}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--text-muted)",
                    animation: "blink 1.2s ease-in-out infinite",
                    animationDelay: `${d * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-0 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontFamily: "'Outfit', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div
        className="px-0 pb-2 pt-3 shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            transition: "border-color 0.2s ease",
          }}
          onFocusCapture={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)")}
          onBlurCapture={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about Joseph..."
            disabled={loading}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "var(--text)",
              caretColor: "var(--gold)",
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
            style={{
              background: input.trim() && !loading ? "var(--gold)" : "var(--surface2)",
              opacity: !input.trim() || loading ? 0.45 : 1,
              border: "none",
              cursor: input.trim() && !loading ? "pointer" : "default",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={input.trim() && !loading ? "#09090b" : "var(--text-muted)"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  // Typewriter
  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 30);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [charIndex, typing, roleIndex]);

  return (
    <section
      id="hero"
      className="relative grid-bg"
      style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "float 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "float 10s ease-in-out infinite 3s",
        }}
      />

      <div
        className="max-w-7xl mx-auto px-8 w-full z-10 flex-1 flex"
        style={{ paddingTop: "112px", paddingBottom: "64px", overflow: "hidden" }}
      >
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 w-full lg:items-start" style={{ overflow: "hidden", height: "100%" }}>

          {/* ── Left: Main content ── */}
          <div style={{ paddingTop: "24px" }}>

            {/* Name */}
            <div style={{ animation: "fadeUp 0.8s ease 0.1s both" }}>
              <h1
                className="leading-none mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
                  fontWeight: 900,
                  color: "var(--white)",
                  letterSpacing: "-0.02em",
                }}
              >
                Basilio
              </h1>
              <h1
                className="leading-none mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "var(--gold)",
                  textShadow: "0 0 60px rgba(212,175,55,0.2)",
                }}
              >
                Joseph Lee
              </h1>
            </div>

            {/* Typewriter */}
            <div
              className="flex items-center gap-1 mb-8"
              style={{ animation: "fadeUp 0.8s ease 0.25s both" }}
            >
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", color: "var(--text-muted)" }}>
                /{" "}
              </span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", color: "var(--text-secondary)", marginLeft: "6px" }}>
                {displayed}
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "1.1rem",
                  color: "var(--gold)",
                  animation: "blink 1s step-end infinite",
                }}
              >
                _
              </span>
            </div>

            {/* Bio */}
            <p
              className="text-base leading-relaxed max-w-md mb-10"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                animation: "fadeUp 0.8s ease 0.4s both",
              }}
            >
              I build fast, scalable web and mobile systems — from pixel-perfect UIs to robust
              back-end APIs. Passionate about turning complex ideas into smooth, deployable products.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3"
              style={{ animation: "fadeUp 0.8s ease 0.55s both" }}
            >
              <button
                type="button"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                View My Work →
              </button>
              <a
                href="https://github.com/basilio-joseph-lee"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* ── Right: Embedded chat ── */}
          <div
            className="hidden lg:block"
            style={{
              animation: "fadeIn 0.9s ease 0.5s both",
              borderLeft: chatOpen
                ? "2px solid rgba(212,175,55,0.35)"
                : "2px solid var(--border)",
              transition: "border-color 0.4s ease",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {chatOpen ? (
              <EmbeddedChat onClose={() => setChatOpen(false)} />
            ) : (
              /* Idle state */
              <div
                className="flex flex-col justify-center gap-6"
                style={{
                  position: "absolute",
                  inset: 0,
                  paddingLeft: "40px",
                  paddingTop: "24px",
                  paddingBottom: "24px",
                  overflow: "hidden",
                }}
              >
                <div>
                  <p className="section-label mb-3">AI Agent</p>
                  <h3
                    className="text-3xl font-bold mb-3"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "var(--white)",
                      lineHeight: 1.2,
                    }}
                  >
                    Have questions{" "}
                    <em style={{ color: "var(--gold)", fontStyle: "italic" }}>about me?</em>
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-xs"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    Ask my AI — it knows everything about my skills, projects, and experience.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { setChatOpen(true); }}
                      className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 text-left"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        fontFamily: "'Outfit', sans-serif",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                        (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setChatOpen(true)}
                    className="btn-primary inline-flex items-center gap-2"
                    style={{ fontSize: "0.8rem", padding: "10px 20px" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Talk to my AI Agent
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile: chat opens below CTAs */}
          {chatOpen && (
            <div
              className="lg:hidden col-span-full"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                borderTop: "2px solid rgba(212,175,55,0.4)",
                background: "var(--surface)",
                height: "420px",
              }}
            >
              <EmbeddedChat onClose={() => setChatOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}