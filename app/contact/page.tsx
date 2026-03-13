"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useState } from "react";

const contactDetails = [
  { title: "Email", body: "hello@bitstats.io", href: "mailto:hello@bitstats.io" },
  { title: "Discord", body: "Stacks Discord #bitstats", href: "#" },
  { title: "GitHub", body: "github.com/greyw0rks/Bitstats", href: "https://github.com/greyw0rks/Bitstats" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>

        {/* Header */}
        <section style={{ padding: "72px 5%", background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <div style={{ fontSize: 12, color: "var(--text-4)", marginBottom: 16 }}>
              <Link href="/" style={{ color: "var(--text-4)" }}>Home</Link> / Contact
            </div>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: 16 }}>Get in touch</h1>
            <p style={{ fontSize: 18, color: "var(--text-3)", maxWidth: 500, lineHeight: 1.7 }}>
              Questions about BitStats, credentials, or integration? We&apos;re here to help.
            </p>
          </div>
        </section>

        {/* Contact grid */}
        <section className="section">
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }} className="contact-grid">

            {/* Left: details */}
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem,2vw,2rem)", marginBottom: 24 }}>Contact details</h2>
              {contactDetails.map(d => (
                <div key={d.title} style={{ padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{d.title}</div>
                  <a href={d.href} style={{ fontSize: 16, color: "var(--blue)", fontWeight: 500 }}>{d.body}</a>
                </div>
              ))}

              <div style={{ marginTop: 48 }}>
                <h3 style={{ fontSize: 18, marginBottom: 16 }}>Remote first</h3>
                <div style={{ borderRadius: 14, aspectRatio: "4/3", background: "linear-gradient(135deg, var(--green-light), var(--blue-light))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 56 }}>🌐</div>
                <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.7 }}>We work across time zones and continents. Collaboration without borders.</p>
                <a href="#" style={{ fontSize: 14, fontWeight: 600, color: "var(--blue)", marginTop: 8, display: "inline-block" }}>Connect online →</a>
              </div>
            </div>

            {/* Right: form */}
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 20, padding: 40 }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 22, marginBottom: 8 }}>Message sent!</h3>
                  <p style={{ color: "var(--text-3)" }}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: "clamp(1.3rem,2vw,1.8rem)", marginBottom: 8 }}>Send a message</h2>
                  <p style={{ color: "var(--text-3)", fontSize: 15, marginBottom: 28 }}>We read and reply to every message.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                    {[["First name", "Alex"], ["Last name", "Chen"]].map(([label, ph]) => (
                      <div key={label}>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", display: "block", marginBottom: 6 }}>{label}</label>
                        <input placeholder={ph} style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "Inter, sans-serif", color: "var(--text)" }} />
                      </div>
                    ))}
                  </div>
                  {[["Email", "email", "alex@example.com"], ["Subject", "text", "Tell us what this is about"]].map(([label, type, ph]) => (
                    <div key={label} style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", display: "block", marginBottom: 6 }}>{label}</label>
                      <input type={type} placeholder={ph} style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "Inter, sans-serif", color: "var(--text)" }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", display: "block", marginBottom: 6 }}>What are you reaching out about?</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Integration help", "Grant inquiry", "Partnership", "Other"].map(t => (
                        <button key={t} style={{ padding: "6px 14px", borderRadius: 100, border: "1px solid var(--border)", fontSize: 13, cursor: "pointer", background: "var(--bg2)", color: "var(--text-3)" }}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", display: "block", marginBottom: 6 }}>Message</label>
                    <textarea rows={5} placeholder="Share your thoughts, questions, or ideas..." style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "Inter, sans-serif", resize: "vertical", color: "var(--text)" }} />
                  </div>
                  <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setSent(true)}>
                    Send message →
                  </button>
                </>
              )}
            </div>
          </div>
          <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr !important; gap:48px !important;} .form-row{grid-template-columns:1fr !important;}}`}</style>
        </section>

        {/* Community links */}
        <section style={{ padding: "64px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", marginBottom: 8 }}>Join the community</h2>
            <p style={{ color: "var(--text-3)", marginBottom: 36 }}>Connect with builders, developers, and identity enthusiasts.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: "Stacks Discord", icon: "💬", href: "#" },
                { label: "Twitter / X", icon: "𝕏", href: "#" },
                { label: "GitHub", icon: "⌨️", href: "https://github.com/greyw0rks/Bitstats" },
              ].map(l => (
                <a key={l.label} href={l.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", border: "1px solid var(--border)", borderRadius: 100, background: "white", fontSize: 14, fontWeight: 500, color: "var(--text-2)", textDecoration: "none" }}>
                  <span>{l.icon}</span>{l.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
