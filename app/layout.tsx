import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basilio Joseph Lee | Full-Stack & Mobile Developer",
  description:
    "Portfolio of Basilio Joseph Lee — Full-Stack Web & Mobile Developer specializing in React, Next.js, Flutter, and backend systems.",
  keywords: ["Full-Stack Developer", "Mobile Developer", "React", "Next.js", "Flutter", "Basilio Joseph Lee"],
  openGraph: {
    title: "Basilio Joseph Lee | Developer Portfolio",
    description: "Full-Stack Web & Mobile Developer Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}