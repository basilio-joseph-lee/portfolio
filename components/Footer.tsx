export default function Footer() {
  return (
    <footer className="py-10" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
            style={{
              background: "var(--gold)",
              color: "#09090b",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
            }}
          >
            BJ
          </div>
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "'Outfit', sans-serif" }}
          >
            © {new Date().getFullYear()} Basilio Joseph Lee
          </span>
        </div>

        <p
          className="text-xs text-center"
          style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace" }}
        >
          Designed & developed with{" "}
          <span style={{ color: "var(--gold)" }}>passion</span>
          {" "}· All rights reserved
        </p>
      </div>
    </footer>
  );
}