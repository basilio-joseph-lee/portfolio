"use client";
import { useState, useEffect } from "react";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${
        scrolled ? "bg-[rgba(8,12,20,0.85)] border-b border-[rgba(34,211,238,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
          className="font-display font-800 text-lg tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
        >
          <span className="text-white">BJ</span>
          <span className="text-cyan-400">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 font-mono tracking-wide"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem" }}
            >
              {l}
            </button>
          ))}
          <a
            href="mailto:basiliojoseph550@gmail.com"
            className="text-xs border border-cyan-400 text-cyan-400 px-4 py-1.5 rounded hover:bg-cyan-400 hover:text-[#080c14] transition-all duration-200 font-mono"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Hire me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-cyan-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(8,12,20,0.97)] border-b border-[rgba(34,211,238,0.1)] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-left text-slate-300 hover:text-cyan-400 transition-colors text-sm"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
