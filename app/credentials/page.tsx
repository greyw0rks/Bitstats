import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import Link from "next/link";

export const metadata = { title: "Credentials — BitStats" };

const credTypes = [
  { icon: "🪪", color: "var(--blue)", bg: "var(--blue-light)", border: "var(--blue-mid)", title: "KYC Verification", issuer: "Synaps · Persona", desc: "Government-issued ID verification. Prove you're a real, verified human without sharing your passport number." },
  { icon: "📈", color: "var(--green)", bg: "var(--green-light)", border: "var(--green-mid)", title: "Accredited Investor", issuer: "Parallel Markets", desc: "Verify accredited investor status for DeFi protocols and token sales — without disclosing your income." },
  { icon: "🎓", color: "#C47A00", bg: "var(--amber-light)", border: "var(--amber-mid)", title: "Professional Certification", issuer: "Custom issuers", desc: "Degrees, licenses, and professional credentials anchored onchain and verifiable anywhere." },
  { icon: "🗳️", color: "var(--text-2)", bg: "var(--bg3)", border: "var(--border-dark)", title: "DAO Membership", issuer: "Any DAO", desc: "Sybil-resistant voting and governance participation. One person, one vote — proven with ZK." },
];

const faqs = [
  { q: "How are credentials issued?", a: "Credentials are issued directly on the blockchain, tied to your BNS name. Whether it's KYC status, accredited investor verification, or professional certifications, each credential is cryptographically signed and stored as part of your identity root." },
  { q: "What stays private?", a: "Everything. You prove you meet a requirement using zero-knowledge proofs without revealing the underlying data. A verifier knows you're accredited without seeing your financial details." },
  { q: "Can I revoke credentials?", a: "Yes. You control your credentials entirely. Revocation happens on-chain and takes effect immediately across all systems that recognize your BNS name." },
  { q: "Who can verify my credentials?", a: "Anyone with access to the blockchain can verify credentials tied to your BNS name. You decide which credentials to share and with whom through zero-knowledge proofs." },
  { q: "Do I need multiple wallets?", a: "No. Your BNS name serves as your single identity root. All credentials attach to it, eliminating the need to manage separate identities across different platforms." },
];

const comparison = [
  { feature: "Self-sovereign ownership", bitstats: true, traditional: false, web3: false },
  { feature: "Zero-knowledge proofs", bitstats: true, traditional: false, web3: false },
  { feature: "Bitcoin-anchored security", bitstats: true, traditional: false, web3: false },
  { feature: "Instant revocation", bitstats: true, traditional: true, web3: false },
  { feature: "Cross-protocol composable", bitstats: true, traditional: false, web3: true },
  { feature: "No raw data transmitted", bitstats: true, traditional: false, web3: false },
];

export default function Credentials() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>

        {/* Header */}
        <section style={{ padding: "72px 5%", background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <div style={{ fontSize: 12, color: "var(--text-4)", marginBottom: 16 }}>
              <Link href="/" style={{ color: "var(--text-4)" }}>Home</Link> / Credentials
            </div>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: 16 }}>Credentials</h1>
            <p style={{ fontSize: 18, color: "var(--text-3)", maxWidth: 560, lineHeight: 1.7 }}>
              Immutable, private, and composable. Every credential lives onchain, tied to your BNS name.
            </p>
          </div>
        </section>

        {/* Credential types */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p className="section-kicker">Types</p>
              <h2 className="section-title">What you can verify</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }} className="cred-grid">
              {credTypes.map(c => (
                <div key={c.title} style={{ border: `1.5px solid ${c.border}`, borderRadius: 16, padding: 32, background: "white" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{c.icon}</div>
                    <div>
                      <h3 style={{ fontSize: 18, marginBottom: 4 }}>{c.title}</h3>
                      <div style={{ fontSize: 12, color: c.color, fontWeight: 600 }}>Issuer: {c.issuer}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: "var(--text-3)", lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:640px){.cred-grid{grid-template-columns:1fr !important;}}`}</style>
        </section>

        {/* Issuance split */}
        <section className="section" style={{ background: "var(--bg2)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="split-inner">
            <div style={{ background: "var(--green-light)", borderRadius: 16, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>📜</div>
            <div>
              <p className="section-kicker">Issuance</p>
              <h2 style={{ marginBottom: 16, fontSize: "clamp(1.6rem,2.5vw,2.2rem)" }}>Credentials issued and managed onchain</h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-3)", marginBottom: 20 }}>Everything happens directly on the blockchain, tied to your BNS name. You control what gets issued, who sees it, and when to revoke it.</p>
              {["Cryptographically signed and immutable", "Revoke instantly across all systems", "No separate wallets or identity management"].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)", fontWeight: 700, flexShrink: 0, fontSize: 12 }}>✓</div>
                  <span style={{ fontSize: 15, color: "var(--text-2)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.split-inner{grid-template-columns:1fr !important; gap:40px !important;}}`}</style>
        </section>

        {/* ZK split */}
        <section className="section">
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="split-inner2">
            <div>
              <p className="section-kicker">Sharing</p>
              <h2 style={{ marginBottom: 16, fontSize: "clamp(1.6rem,2.5vw,2.2rem)" }}>Zero-knowledge proofs keep your data safe</h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-3)", marginBottom: 20 }}>You prove what you are without revealing what you have. A verifier confirms you meet a requirement while your underlying information stays encrypted and private.</p>
              {["192-byte constant-size Groth16 proofs", "Generated in-browser in under 2 seconds", "No data ever leaves your device"].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--amber-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C47A00", fontWeight: 700, flexShrink: 0, fontSize: 12 }}>✓</div>
                  <span style={{ fontSize: 15, color: "var(--text-2)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--amber-light)", borderRadius: 16, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>🔐</div>
          </div>
          <style>{`@media(max-width:768px){.split-inner2{grid-template-columns:1fr !important; gap:40px !important;}}`}</style>
        </section>

        {/* Comparison table */}
        <section className="section" style={{ background: "var(--bg2)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="section-kicker">Comparison</p>
              <h2 className="section-title">BitStats vs the alternatives</h2>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "var(--bg3)", padding: "16px 24px", fontWeight: 700, fontSize: 14, borderBottom: "1px solid var(--border)" }}>
                <span>Feature</span>
                <span style={{ color: "var(--blue)", textAlign: "center" }}>BitStats</span>
                <span style={{ textAlign: "center" }}>Traditional</span>
                <span style={{ textAlign: "center" }}>Other Web3</span>
              </div>
              {comparison.map((row, i) => (
                <div key={row.feature} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 24px", borderBottom: i < comparison.length - 1 ? "1px solid var(--border)" : "none", background: i % 2 === 0 ? "white" : "var(--bg2)", fontSize: 14 }}>
                  <span style={{ color: "var(--text-2)" }}>{row.feature}</span>
                  <span style={{ textAlign: "center", color: "var(--green)", fontWeight: 700 }}>{row.bitstats ? "✓" : "✗"}</span>
                  <span style={{ textAlign: "center", color: row.traditional ? "var(--green)" : "var(--text-4)" }}>{row.traditional ? "✓" : "✗"}</span>
                  <span style={{ textAlign: "center", color: row.web3 ? "var(--green)" : "var(--text-4)" }}>{row.web3 ? "✓" : "✗"}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="section-kicker">FAQ</p>
              <h2 className="section-title">Questions answered</h2>
            </div>
            <FAQ items={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "72px 5%", background: "var(--blue)" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "white", fontSize: "clamp(1.6rem,3vw,2.4rem)", marginBottom: 16 }}>Start collecting credentials</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 28 }}>Register your BNS name and receive your first credential in minutes.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" style={{ background: "white", color: "var(--blue)", borderRadius: 100, padding: "14px 28px", fontWeight: 700 }}>Get started →</a>
              <Link href="/how-it-works" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderRadius: 100, padding: "14px 28px", fontWeight: 600 }}>Learn how →</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
