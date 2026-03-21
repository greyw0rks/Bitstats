"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/credentials", label: "Credentials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)", height: 68,
      display: "flex", alignItems: "center", padding: "0 5%",
      justifyContent: "space-between",
    }}>
      <Link href="/" className="nav-logo">
        <Logo size={36} variant="primary" />
        <span>BitStats</span>
      </Link>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="nav-desktop">
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            fontSize: 14, fontWeight: 500, padding: "6px 14px", borderRadius: 100,
            color: path === l.href ? "var(--blue)" : "var(--text-3)",
            background: path === l.href ? "var(--blue-light)" : "transparent",
            transition: "all 0.15s",
          }}>{l.label}</Link>
        ))}
        <a href="#" className="btn btn-primary" style={{ marginLeft: 8, padding: "8px 20px", fontSize: 14 }}>
          Launch app →
        </a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{
        display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "var(--text)"
      }}>☰</button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, background: "white",
          borderBottom: "1px solid var(--border)", padding: "16px 5%", display: "flex",
          flexDirection: "column", gap: 4, zIndex: 99,
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              fontSize: 16, fontWeight: 500, padding: "12px 16px", borderRadius: 8,
              color: path === l.href ? "var(--blue)" : "var(--text)",
              background: path === l.href ? "var(--blue-light)" : "transparent",
            }}>{l.label}</Link>
          ))}
          <a href="#" className="btn btn-primary" style={{ marginTop: 8 }}>Launch app →</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
