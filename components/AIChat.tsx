"use client";
import { useState, useRef, useEffect } from "react";

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";

const SYSTEM_PROMPT = `You are BJ's personal AI assistant embedded in Basilio Joseph Lee's developer portfolio. 
Your ONLY job is to answer questions about BJ — his skills, experience, projects, background, and how to contact him. 
If anyone asks about anything unrelated to BJ, politely redirect them back to asking about BJ.

Here is everything you know about BJ:

NAME: Basilio Joseph Lee (goes by "BJ")
LOCATION: Philippines
ROLE: Full-Stack Web & Mobile Developer
STATUS: Open to work / available for opportunities

SKILLS:
- Frontend: React, Next.js, Flutter, Tailwind CSS, Bootstrap 5, CSS3, HTML5
- Backend: ASP.NET, Django, PHP, REST API, Node.js
- Database: MySQL, PostgreSQL
- DevOps & Deployment: Hostinger, Vercel, Codemagic CI/CD, Git, GitHub
- Mobile: Flutter, Dart, Mobile UI/UX, Push Notifications, QR Systems
- Specialties: Face Recognition, SMS Integration, Kiosk Systems, Gamified UX, Hardware Integration

EXPERIENCE:
1. Mobile App Developer Intern at BMware Inc.
   - Developed mobile apps across multiple domains: information systems, transaction platforms, game applications
   - Delivered production-ready mobile solutions in a professional environment
   - Stack: Flutter, Dart

2. Full-Stack Developer — Capstone Project (Classroom Management System, 2023–2024)
   - Led development of a large-scale Classroom Management System
   - Built web dashboard, mobile app, kiosk interface, and hardware integration
   - Stack: React, Next.js, Flutter, ASP.NET, Django, PHP, MySQL, PostgreSQL

FEATURED PROJECT — Interactive Classroom Management System (Capstone, 2024):
- A comprehensive classroom ecosystem with: 2D classroom simulator, gamified quiz via QR code scanning, facial recognition attendance, SMS notifications to parents, a behavior kiosk for students (snack, recess, in/out logs), real-time parent monitoring dashboard, grading system, cross-platform mobile app
- Stack: React, Flutter, ASP.NET, Django, PHP, MySQL, PostgreSQL, REST API
- GitHub: https://github.com/basilio-joseph-lee/CMS

CONTACT:
- Email: basiliojoseph550@gmail.com
- GitHub: https://github.com/basilio-joseph-lee

PERSONALITY / BIO:
BJ is passionate about turning complex ideas into real, working products. He loves building systems that solve real problems at scale. He has 2+ years of experience spanning full-stack web and mobile development, with hands-on CI/CD deployment experience.

Keep answers concise, friendly, and helpful. Use first person when speaking as BJ's assistant (e.g. "BJ has..." or "He specializes in..."). Never make up information not listed above.`;

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What tech stack does BJ use?",
  "Tell me about his capstone project",
  "Is BJ available for hire?",
  "How can I contact BJ?",
];

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm BJ's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasKey, setHasKey] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!GROQ_API_KEY) setHasKey(false);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const send = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong. Please check the API key or try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
        style={{
          background: open ? "var(--surface)" : "var(--gold)",
          border: open ? "1px solid var(--border)" : "none",
          boxShadow: open
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(212,175,55,0.35)",
          transform: open ? "scale(0.92)" : "scale(1)",
        }}
        aria-label="Toggle AI Chat"
      >
        {open ? (
          <svg width="18" height="18" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#09090b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="0.5" fill="#09090b" />
            <circle cx="12" cy="10" r="0.5" fill="#09090b" />
            <circle cx="15" cy="10" r="0.5" fill="#09090b" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <div
        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden transition-all duration-400"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          maxHeight: "520px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center gap-3 shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0"
            style={{ background: "var(--gold-dim)", border: "1px solid rgba(212,175,55,0.25)" }}
          >
            🤖
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="font-semibold text-sm leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--text)" }}
            >
              BJ's AI Assistant
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#4ade80", boxShadow: "0 0 4px #4ade80" }}
              />
              <span
                className="text-xs"
                style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace", fontSize: "0.62rem" }}
              >
                Powered by Llama 3 · Groq
              </span>
            </div>
          </div>
          {/* Gold accent dot */}
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: "var(--gold)", boxShadow: "0 0 6px var(--gold)" }}
          />
        </div>

        {/* No API key warning */}
        {!hasKey && (
          <div
            className="mx-4 mt-3 px-4 py-3 rounded-xl text-xs"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            ⚠️ Add <strong>NEXT_PUBLIC_GROQ_API_KEY</strong> to your .env.local to enable the chat.
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className="flex"
              style={{ justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
            >
              <div
                className="max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? {
                        background: "var(--gold)",
                        color: "#09090b",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 500,
                        borderBottomRightRadius: "4px",
                      }
                    : {
                        background: "var(--bg2, var(--bg))",
                        color: "var(--text-secondary)",
                        fontFamily: "'Outfit', sans-serif",
                        border: "1px solid var(--border)",
                        borderBottomLeftRadius: "4px",
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div
                className="px-4 py-3 rounded-2xl rounded-bl-[4px] flex items-center gap-1.5"
                style={{ background: "var(--bg2, var(--bg))", border: "1px solid var(--border)" }}
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
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions (only show if first message is still visible) */}
        {messages.length <= 1 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: "var(--bg)",
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

        {/* Input */}
        <div
          className="px-4 pb-4 shrink-0"
          style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}
        >
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2"
            style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me about BJ..."
              disabled={loading || !hasKey}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "var(--text)",
                caretColor: "var(--gold)",
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading || !hasKey}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0"
              style={{
                background: input.trim() && !loading ? "var(--gold)" : "var(--surface2)",
                opacity: !input.trim() || loading ? 0.4 : 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? "#09090b" : "var(--text-muted)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}