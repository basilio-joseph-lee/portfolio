export default function Footer() {
  return (
    <footer
      className="py-8 text-center border-t"
      style={{ borderColor: "rgba(34,211,238,0.08)" }}
    >
      <p
        className="text-slate-600 text-xs"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Built with Next.js & Tailwind CSS · Deployed on Vercel ·{" "}
        <span className="text-cyan-400">© {new Date().getFullYear()} Basilio Joseph Lee</span>
      </p>
    </footer>
  );
}
