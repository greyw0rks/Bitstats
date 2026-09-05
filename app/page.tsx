import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { IndexHeroCard, IndexIssuance, IndexVerification } from "./components/Illustrations";

export const metadata = { title: "BitStats — Bitcoin Identity Layer" };

const features = [
  { icon: "🔗", bg: "var(--blue-light)", title: "BNS Identity Root", body: "Your Bitcoin Name System name becomes your permanent identity anchor. Register once, own it forever — no server can revoke it." },
  { icon: "🔐", bg: "var(--green-light)", title: "ZK Privacy", body: "Zero-knowledge proofs let you prove eligibility without exposing data. 192-byte Groth16 proofs, generated in-browser in under 2 seconds." },
  { icon: "⚡", bg: "var(--amber-light)", title: "Instant Verification", body: "Any dapp calls bil-verifier.clar and gets a boolean in under 2 seconds. No raw data transmitted. Ever." },
];

const steps = [
  { num:"01", label:"Foundation", color:"var(--blue)",  title:"Register your BNS name",         body:"Your BNS name becomes your identity root. Register once, own it forever on Stacks. No company can revoke it.",                    Visual: IndexHeroCard },
  { num:"02", label:"Issuance",   color:"var(--green)", title:"Receive credentials onchain",     body:"Trusted issuers publish credential hashes to the blockchain, tied to your BNS name. Immutable and permanent.",                  Visual: IndexIssuance },
  { num:"03", label:"Privacy",    color:"#C47A00",      title:"Prove without revealing",          body:"Generate a ZK proof in-browser. The dapp gets a boolean — your data never leaves your device.",                                Visual: IndexVerification },
];

const stepBgs = ["#F0F5FF", "#F0FBF8", "#FFFBF5"];

// Facts about the design, not usage claims. The previous version advertised
// "50K+ credentials issued" and three named testimonials for a product with no
// deployed contract; live counts belong on /verify, which reads them from chain.
const properties = [
  { num: "32 B", label: "Stored per credential" },
  { num: "0", label: "Bytes of your data on chain" },
  { num: "1 call", label: "To verify from any contract" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>

        {/* HERO */}
        <section style={{ padding: "96px 5% 80px", background: "linear-gradient(160deg, var(--blue-light) 0%, white 60%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-inner">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 32, height: 2, background: "var(--blue)" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.1em" }}>BitStats</span>
              </div>
              <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", marginBottom: 20 }}>
                Your identity,<br /><span style={{ color: "var(--blue)" }}>your control</span>
              </h1>
              <p style={{ fontSize: 18, color: "var(--text-3)", lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                BNS is your identity root. Credentials live onchain. You prove what matters without exposing what doesn&apos;t.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                <Link href="/verify" className="btn btn-primary">Verify a name →</Link>
                <Link href="/how-it-works" className="btn btn-secondary">How it works</Link>
              </div>
              <div style={{ display: "flex", gap: 32 }}>
                {properties.map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: 26, fontWeight: 900, fontFamily: "Urbanist, sans-serif", color: "var(--blue)" }}>{s.num}</div>
                    <div style={{ fontSize: 12, color: "var(--text-4)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: 380 }}>
                <div style={{ background: "#F0F5FF", borderRadius: 16, aspectRatio: "4/3", overflow: "hidden", boxShadow: "0 8px 40px rgba(10,100,255,0.12)", border: "1px solid var(--border)" }}>
                  <IndexHeroCard />
                </div>
                <div style={{ position: "absolute", top: -18, right: -18, background: "white", borderRadius: 12, padding: "8px 14px", boxShadow: "var(--shadow)", border: "1px solid var(--green-mid)", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
                  <div><div style={{ fontSize: 11, fontWeight: 700 }}>ZK Proof generated</div><div style={{ fontSize: 10, color: "var(--text-4)" }}>192 bytes · Groth16</div></div>
                </div>
                <div style={{ position: "absolute", bottom: -18, left: -18, background: "white", borderRadius: 12, padding: "8px 14px", boxShadow: "var(--shadow)", border: "1px solid var(--blue-mid)", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blue)" }} />
                  <div><div style={{ fontSize: 11, fontWeight: 700 }}>Onchain verified</div><div style={{ fontSize: 10, color: "var(--text-4)" }}>No data exposed</div></div>
                </div>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.hero-inner{grid-template-columns:1fr !important; gap:40px !important;}}`}</style>
        </section>

        {/* FEATURES */}
        <section className="section" style={{ background: "var(--bg2)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}>
              <p className="section-kicker">Core</p>
              <h2 className="section-title">Built for privacy</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: "var(--border)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }} className="features-grid">
              {features.map(f => (
                <div key={f.title} style={{ background: "white", padding: 32 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 18, marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--text-3)", lineHeight: 1.7 }}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.features-grid{grid-template-columns:1fr !important;}}`}</style>
        </section>

        {/* STEPS with SVG illustrations */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p className="section-kicker">How It Works</p>
              <h2 className="section-title">Three steps to sovereignty</h2>
            </div>
            {steps.map((s, i) => (
              <div key={s.num} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", padding: "72px 0", borderTop: i > 0 ? "1px solid var(--border)" : "none" }} className="hiw-row">
                <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                  <div style={{ fontSize: 48, fontWeight: 900, color: "var(--border-dark)", fontFamily: "Urbanist, sans-serif", marginBottom: 8 }}>{s.num}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{s.label}</div>
                  <h2 style={{ marginBottom: 16, fontSize: "clamp(1.5rem,2.5vw,2.2rem)" }}>{s.title}</h2>
                  <p style={{ fontSize: 17, color: "var(--text-3)", lineHeight: 1.7, marginBottom: 28 }}>{s.body}</p>
                  <Link href="/how-it-works" className="btn btn-secondary">Learn more →</Link>
                </div>
                <div style={{ order: i % 2 === 1 ? 1 : 2, borderRadius: 16, aspectRatio: "4/3", overflow: "hidden", background: stepBgs[i] }}>
                  <s.Visual />
                </div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:768px){.hiw-row{grid-template-columns:1fr !important; gap:32px !important;} .hiw-row > div{order:unset !important;}}`}</style>
        </section>

        {/* HOW TO INTEGRATE — replaces the invented testimonials with the
            actual call a dapp makes. */}
        <section className="section" style={{ background: "var(--bg2)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="section-kicker">Integration</p>
              <h2 className="section-title">One read-only call</h2>
            </div>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <pre style={{
                background: "var(--text)", color: "#E8ECF5", borderRadius: 16, padding: 24,
                overflowX: "auto", fontSize: 13, lineHeight: 1.7,
                fontFamily: "ui-monospace, monospace", border: "1px solid var(--border-dark)",
              }}>
{`;; from any Clarity contract
(contract-call? .bil-verifier verify "satoshi.btc" "kyc-basic")
;; => true

;; or abort your own transaction when it fails
(try! (contract-call? .bil-verifier assert-valid "satoshi.btc" "kyc-basic"))`}
              </pre>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-2)", marginTop: 24 }}>
                The registry stores a 32-byte commitment and nothing else, so there is no personal
                data on chain to leak. Expiry is measured against the Bitcoin clock, and
                deactivating an issuer invalidates every credential it signed — both are covered by
                the contract test suite.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
                <Link href="/verify" className="btn btn-primary">Try it against a name →</Link>
                <Link href="/how-it-works" className="btn btn-secondary">Read the design</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 5%", background: "var(--blue)" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "white", fontSize: "clamp(1.8rem,3vw,2.8rem)", marginBottom: 16 }}>Own your identity today</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, marginBottom: 32 }}>Register your BNS name, collect credentials, and verify privately.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" style={{ background: "white", color: "var(--blue)", borderRadius: 100, padding: "14px 28px", fontWeight: 700, fontSize: 15 }}>Get started →</a>
              <Link href="/how-it-works" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderRadius: 100, padding: "14px 28px", fontWeight: 600, fontSize: 15 }}>Learn more</Link>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section style={{ padding: "64px 5%", background: "var(--bg2)" }}>
          <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ marginBottom: 8, fontSize: "clamp(1.4rem,2.5vw,2rem)" }}>Stay in the loop</h2>
            <p style={{ color: "var(--text-3)", marginBottom: 24 }}>Updates on BitStats, ZK proofs, and the Stacks ecosystem.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: "12px 16px", border: "1px solid var(--border)", borderRadius: 100, fontSize: 15, outline: "none", fontFamily: "Inter, sans-serif" }} />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
