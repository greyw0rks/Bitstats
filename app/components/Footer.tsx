import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  Product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Credentials", href: "/credentials" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Developers: [
    { label: "Documentation", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  Community: [
    { label: "Stacks Discord", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "hello@bitstats.io", href: "mailto:hello@bitstats.io" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "64px 5% 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 48,
        }} className="footer-grid-inner">
          <div>
            <Link href="/" className="nav-logo" style={{ marginBottom: 16, display: "inline-flex" }}>
              <Logo size={36} />
              <span>BitStats</span>
            </Link>
            <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.7, marginTop: 12 }}>
              Self-sovereign identity and ZK credentials on Stacks. Open source. MIT licensed.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                {title}
              </div>
              <ul className="footer-links">
                {links.map(l => (
                  <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid var(--border)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12
        }}>
          <span style={{ fontSize: 13, color: "var(--text-4)" }}>© 2026 BitStats. MIT License.</span>
          <div style={{ display: "flex", gap: 24 }}>
            <Link href="#" style={{ fontSize: 13, color: "var(--text-4)" }}>Privacy Policy</Link>
            <Link href="#" style={{ fontSize: 13, color: "var(--text-4)" }}>Terms of Service</Link>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)" }}>Built on Stacks · Settled by Bitcoin</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid-inner { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
