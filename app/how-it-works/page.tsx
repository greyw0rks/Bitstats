import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import Link from "next/link";

export const metadata = { title: "How It Works — BitStats" };

const steps = [
  { num: "01", label: "Foundation", color: "var(--blue)", bg: "#F0F5FF", title: "Create your BNS name as identity root", body: "Your BNS name becomes the anchor for everything that follows. It's where your identity begins — clean, permanent, and simple. Register once on Stacks and you own it cryptographically. No company can revoke it, no server can lose it." },
  { num: "02", label: "Issuance", color: "var(--green)", bg: "#F0FBF8", title: "Credentials anchored on the blockchain", body: "Every credential lives onchain, auditable and permanent. Trust comes from the ledger itself, not from intermediaries. You own what's issued to you — tied directly to your BNS name with a cryptographic hash." },
  { num: "03", label: "Privacy", color: "#C47A00", bg: "#FFFBF5", title: "Prove what matters, stay private", body: "Zero-knowledge proofs let you demonstrate eligibility without exposing the details underneath. You show you meet the requirement. Nothing more gets revealed — your passport number, income, and personal details stay encrypted on your device." },
  { num: "04", label: "Verification", color: "var(--text-3)", bg: "#F4F6FA", title: "Instant verification for any dapp", body: "Any application can call bil-verifier.clar and get a boolean response in under 2 seconds. The verifier knows you meet the requirement — nothing more. No raw data is ever transmitted. Compose it into DeFi, DAOs, or any protocol." },
];

const zkSteps = [
  { num: 1, label: "Dapp asks", desc: "A protocol requests proof of a credential", color: "var(--blue)", bg: "var(--blue-light)" },
  { num: 2, label: "Proof generated", desc: "192-byte Groth16 proof built in-browser", color: "var(--green)", bg: "var(--green-light)" },
  { num: 3, label: "Verifier checks", desc: "bil-verifier.clar validates the proof onchain", color: "#C47A00", bg: "var(--amber-light)" },
  { num: 4, label: "Returns bool", desc: "A simple true/false — no raw data exposed", color: "var(--text-3)", bg: "var(--bg3)" },
];

const faqs = [
  { q: "How does BNS become an identity root?", a: "BNS names are registered on Stacks and settled by Bitcoin. Because they're owned cryptographically, they become a permanent anchor for credentials. Any credential issued to you is tied to your BNS name's onchain hash." },
  { q: "What is a Groth16 proof?", a: "Groth16 is a zero-knowledge proof system that produces constant-size proofs (192 bytes) regardless of the complexity of the statement being proven. It's fast to verify and efficient to generate — making it ideal for identity applications." },
  { q: "Can I use BitStats without a BNS name?", a: "BNS is the identity root, so you'll need one to receive credentials. Registration is straightforward and only requires a Stacks wallet like Leather or Xverse." },
  { q: "How long does proof generation take?", a: "Proofs are generated client-side using SnarkJS and typically complete in under 2 seconds on modern hardware. The proof is 192 bytes — small enough to submit onchain efficiently." },
  { q: "What happens if I lose my wallet?", a: "Credentials are stored onchain tied to your BNS name. As long as you retain control of your BNS name's private key, you can recover access. We recommend standard wallet backup practices." },
];

export default function HowItWorks() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        {/* Header */}
        <section style={{ padding: "72px 5%", background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <div style={{ fontSize: 12, color: "var(--text-4)", marginBottom: 16 }}>
              <Link href="/" style={{ color: "var(--text-4)" }}>Home</Link> / How It Works
            </div>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: 16 }}>How BitStats works</h1>
            <p style={{ fontSize: 18, color: "var(--text-3)", maxWidth: 560, lineHeight: 1.7 }}>
              Four steps from identity to private verification — all anchored to Bitcoin.
            </p>
          </div>
        </section>

        {/* 4-step card grid */}
        <section className="section">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="steps-grid">
              {steps.map((s, i) => (
                <div key={s.num} style={{ border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
                  <div style={{ background: s.bg, aspectRatio: "3/2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
                    {["🪪","📜","🔐","⚡"][i]}
                  </div>
                  <div style={{ padding: 24 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{s.num} · {s.label}</div>
                    <h3 style={{ fontSize: 16, marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.6 }}>{s.body.slice(0, 100)}…</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.steps-grid{grid-template-columns:1fr 1fr !important;}} @media(max-width:480px){.steps-grid{grid-template-columns:1fr !important;}}`}</style>
        </section>

        {/* Scroll sections */}
        {steps.map((s, i) => (
          <section key={s.num} id={`step-${i + 1}`} style={{ padding: "80px 5%", background: i % 2 === 1 ? "var(--bg2)" : "white", borderTop: "1px solid var(--border)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="scroll-inner">
              <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: "var(--border-dark)", fontFamily: "Urbanist, sans-serif", marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{s.label}</div>
                <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.4rem)", marginBottom: 16 }}>{s.title}</h2>
                <p style={{ fontSize: 17, color: "var(--text-3)", lineHeight: 1.75, marginBottom: 28 }}>{s.body}</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <Link href="/credentials" className="btn btn-secondary">Learn more</Link>
                  <a href="#" className="btn btn-link">Explore →</a>
                </div>
              </div>
              <div style={{ order: i % 2 === 1 ? 1 : 2, background: s.bg, borderRadius: 16, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>
                {["🪪","📜","🔐","⚡"][i]}
              </div>
            </div>
            <style>{`@media(max-width:768px){.scroll-inner{grid-template-columns:1fr !important; gap:32px !important;} .scroll-inner > div{order:unset !important;}}`}</style>
          </section>
        ))}

        {/* ZK Flow */}
        <section className="section" style={{ background: "var(--bg2)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="section-kicker">Zero-Knowledge</p>
              <h2 className="section-title">How the proof flow works</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }} className="zk-grid">
              {zkSteps.map((z, i) => (
                <div key={z.num} style={{ padding: 28, background: "white", borderRight: i < 3 ? "1px solid var(--border)" : "none", position: "relative" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: z.bg, color: z.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, marginBottom: 16, border: `1px solid ${z.bg}` }}>{z.num}</div>
                  <h4 style={{ fontSize: 15, marginBottom: 8 }}>{z.label}</h4>
                  <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>{z.desc}</p>
                  {i < 3 && <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", zIndex: 1, fontSize: 18, color: "var(--blue)" }}>→</div>}
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.zk-grid{grid-template-columns:1fr 1fr !important;}} @media(max-width:480px){.zk-grid{grid-template-columns:1fr !important;}}`}</style>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="section-kicker">FAQ</p>
              <h2 className="section-title">Common questions</h2>
            </div>
            <FAQ items={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "72px 5%", background: "var(--blue)" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "white", fontSize: "clamp(1.6rem,3vw,2.4rem)", marginBottom: 16 }}>Ready to build on BitStats?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 28 }}>Get access to docs, contracts, and the developer community.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" style={{ background: "white", color: "var(--blue)", borderRadius: 100, padding: "14px 28px", fontWeight: 700 }}>Read the docs →</a>
              <Link href="/contact" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderRadius: 100, padding: "14px 28px", fontWeight: 600 }}>Talk to us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
