"use client";
import { useState, useEffect } from "react";

const links = ["About", "Skills", "Projects", "Experience", "Certifications", "Contact"];

function SunIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check saved preference
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map((l) => document.getElementById(l.toLowerCase()));
      const current = sections.find((s) => {
        if (!s) return false;
        const rect = s.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur ${
        scrolled ? "border-b" : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(var(--nav-bg, 9,9,11),0.9)" : "transparent",
        background: scrolled ? "color-mix(in srgb, var(--bg) 90%, transparent)" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background: "var(--gold)",
              color: "#09090b",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            JL
          </div>
          <span
            className="text-sm font-medium tracking-tight hidden sm:block"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--text)" }}
          >
            Basilio Joseph Lee
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="relative px-4 py-2 text-sm rounded-lg transition-colors duration-200"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: active === l.toLowerCase() ? "var(--gold)" : "var(--text-secondary)",
                fontWeight: active === l.toLowerCase() ? 500 : 400,
                background: active === l.toLowerCase() ? "var(--gold-dim)" : "transparent",
              }}
            >
              {l}
            </button>
          ))}

          <div className="w-px h-5 mx-2" style={{ background: "var(--border)" }} />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
            aria-label="Toggle theme"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
              (e.currentTarget as HTMLElement).style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <div className="w-px h-5 mx-2" style={{ background: "var(--border)" }} />

          <a
            href="mailto:basiliojoseph550@gmail.com"
            className="btn-primary text-xs"
            style={{ padding: "8px 20px" }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-3">
          {/* Theme toggle mobile */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <span
              className="block w-5 h-px bg-current transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(6px)" : "" }}
            />
            <span
              className="block w-5 h-px bg-current transition-all duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-current transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "400px" : "0px" }}
      >
        <div
          className="px-8 py-6 flex flex-col gap-2 border-t"
          style={{ background: "var(--bg)", borderColor: "var(--border)" }}
        >
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-left py-2 text-sm transition-colors"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: active === l.toLowerCase() ? "var(--gold)" : "var(--text-secondary)",
              }}
            >
              {l}
            </button>
          ))}
          <div className="pt-4">
            <a href="mailto:basiliojoseph550@gmail.com" className="btn-primary block text-center">
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}