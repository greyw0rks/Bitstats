import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { PostHero, PostFigure, PostNewsletter, BlogFeat2, BlogFeat3, BlogFeat4 } from "../../components/Illustrations";

export const metadata = { title: "Why BNS is the best identity root for Bitcoin — BitStats" };

const related = [
  { cat:"Credentials", catColor:"var(--green)", Feat: BlogFeat2, title:"Comparing Groth16, PLONK and STARKs", author:"ZK Team · 8 min" },
  { cat:"Technology",  catColor:"#C47A00",      Feat: BlogFeat3, title:"How Stacks Nakamoto makes BitStats faster", author:"Core Team · 5 min" },
  { cat:"Identity",    catColor:"var(--blue)",  Feat: BlogFeat4, title:"DeGrants Cohort 4 — our roadmap", author:"Team BitStats · 6 min" },
];

export default function BlogPost() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop:68 }}>

        {/* Hero header */}
        <section style={{ padding:"64px 5% 0", background:"var(--bg2)", borderBottom:"1px solid var(--border)" }}>
          <div className="container" style={{ maxWidth:800 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20, fontSize:13, color:"var(--text-4)" }}>
              <Link href="/" style={{ color:"var(--text-4)" }}>Home</Link><span>/</span>
              <Link href="/blog" style={{ color:"var(--text-4)" }}>Blog</Link><span>/</span>
              <span style={{ color:"var(--blue)" }}>Identity</span>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:20 }}>
              <span style={{ fontSize:11, fontWeight:700, color:"var(--blue)", background:"var(--blue-light)", padding:"4px 12px", borderRadius:100 }}>Identity</span>
              <span style={{ fontSize:12, color:"var(--text-4)" }}>March 10, 2026 · 4 min read</span>
            </div>
            <h1 style={{ fontSize:"clamp(1.8rem,4vw,3rem)", marginBottom:16, lineHeight:1.2 }}>
              Why BNS is the best identity root for Bitcoin
            </h1>
            <p style={{ fontSize:18, color:"var(--text-3)", lineHeight:1.7, marginBottom:32 }}>
              Your digital identity is not yours. What would it mean to own it the way you own a private key?
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:14, paddingBottom:32 }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:"var(--blue-light)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"var(--blue)" }}>B</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14 }}>BNS Team</div>
                <div style={{ fontSize:12, color:"var(--text-4)" }}>BitStats Research</div>
              </div>
              <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
                {["𝕏","in","🔗"].map(icon => (
                  <a key={icon} href="#" style={{ width:32, height:32, borderRadius:"50%", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"var(--text-3)" }}>{icon}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hero SVG illustration */}
        <section style={{ background:"var(--bg2)", padding:"0 5% 64px" }}>
          <div style={{ maxWidth:800, margin:"0 auto" }}>
            <div style={{ borderRadius:16, aspectRatio:"3/2", overflow:"hidden" }}>
              <PostHero />
            </div>
          </div>
        </section>

        {/* Article body */}
        <section style={{ padding:"64px 5%" }}>
          <div style={{ maxWidth:700, margin:"0 auto", fontSize:16, lineHeight:1.8, color:"var(--text-2)" }}>

            <h3 style={{ fontSize:"1.4rem", marginBottom:16, marginTop:0 }}>Introduction</h3>
            <p style={{ marginBottom:20 }}>Your digital identity is not yours. Right now, fragments of who you are — your name, your credentials, your verified status — live on servers controlled by companies whose interests diverge from yours the moment a breach becomes profitable to ignore. The infrastructure of trust was built for institutions, not for people.</p>
            <p style={{ marginBottom:20 }}>Bitcoin changed the ownership model for money. BitStats is applying that same principle to identity: sovereign by default, verifiable on demand, and anchored to the most secure ledger ever built.</p>

            {/* Inline figure with SVG */}
            <figure style={{ margin:"32px 0" }}>
              <div style={{ borderRadius:14, aspectRatio:"16/9", overflow:"hidden", marginBottom:10 }}>
                <PostFigure />
              </div>
              <figcaption style={{ fontSize:13, color:"var(--text-4)", textAlign:"center" }}>Decentralized identity anchored to Bitcoin&apos;s finality</figcaption>
            </figure>

            <blockquote style={{ borderLeft:"3px solid var(--blue)", paddingLeft:24, margin:"32px 0", color:"var(--text-3)", fontStyle:"italic", fontSize:17, lineHeight:1.7 }}>
              The problem isn&apos;t that identity systems exist — it&apos;s that none of them belong to you.
            </blockquote>

            <h3 style={{ fontSize:"1.4rem", marginBottom:16, marginTop:40 }}>The BNS Advantage</h3>
            <p style={{ marginBottom:20 }}>Enter the Bitcoin Name System. BNS names — like satoshi.btc — are registered on Stacks, settled by Bitcoin, and owned cryptographically. No company can revoke them. No server can lose them. They are your identity root: permanent, portable, and yours.</p>
            <p style={{ marginBottom:20 }}>When BitStats attaches credentials to a BNS name, it&apos;s attaching them to something you actually own. Not a username. Not an email. A cryptographic key with Bitcoin finality.</p>

            <h3 style={{ fontSize:"1.4rem", marginBottom:16, marginTop:40 }}>How ZK Changes Privacy</h3>
            <p style={{ marginBottom:20 }}>The second breakthrough is zero-knowledge proofs. Traditional credential systems force a binary choice: share everything, or share nothing. ZK proofs break this constraint entirely. You prove eligibility without revealing the data that proves it.</p>
            <p style={{ marginBottom:20 }}>A 192-byte Groth16 proof answers a yes/no question in under 2 seconds. The verifier learns the answer. Nothing else. Your passport number, income bracket, and personal details stay encrypted on your device — always.</p>

            <h3 style={{ fontSize:"1.4rem", marginBottom:16, marginTop:40 }}>What this means for Bitcoin</h3>
            <p style={{ marginBottom:20 }}>Bitcoin is the most credible monetary system humans have ever built. Its identity layer should match that credibility. BitStats is that layer — self-sovereign, ZK-private, and anchored to the strongest chain in existence.</p>
            <p style={{ marginBottom:20 }}>The era of renting your own identity from corporations is ending. BNS is how we build what comes next.</p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:"64px 5%", background:"var(--bg2)" }}>
          <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"center" }} className="cta-split">
            <div>
              <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,2rem)", marginBottom:12 }}>Ready to own your identity?</h2>
              <p style={{ fontSize:16, color:"var(--text-3)", lineHeight:1.7, marginBottom:24 }}>Register your BNS name and start collecting verifiable credentials.</p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <Link href="/credentials" className="btn btn-primary">Explore credentials →</Link>
                <Link href="/how-it-works" className="btn btn-secondary">How it works</Link>
              </div>
            </div>
            <div style={{ background:"var(--blue)", borderRadius:16, padding:32, textAlign:"center" }}>
              <div style={{ fontSize:24, fontWeight:900, fontFamily:"monospace", color:"white", marginBottom:8 }}>satoshi.btc ✓</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.65)" }}>Bitcoin-anchored · Self-sovereign · Private</div>
            </div>
          </div>
          <style>{`@media(max-width:640px){.cta-split{grid-template-columns:1fr !important;}}`}</style>
        </section>

        {/* Newsletter SVG banner */}
        <section style={{ padding:"0 5% 64px", background:"var(--bg2)" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ borderRadius:16, aspectRatio:"21/9", overflow:"hidden" }}>
              <PostNewsletter />
            </div>
          </div>
        </section>

        {/* Related posts */}
        <section style={{ padding:"64px 5%" }}>
          <div className="container">
            <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,2rem)", marginBottom:32 }}>More to read</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }} className="related-grid">
              {related.map((p, i) => (
                <Link key={i} href="/blog/post" style={{ border:"1px solid var(--border)", borderRadius:14, overflow:"hidden", background:"white", textDecoration:"none" }}>
                  <div style={{ aspectRatio:"16/9", overflow:"hidden" }}>
                    <p.Feat />
                  </div>
                  <div style={{ padding:"16px 18px" }}>
                    <span style={{ fontSize:11, fontWeight:700, color:p.catColor }}>{p.cat}</span>
                    <h4 style={{ fontSize:14, marginTop:6, lineHeight:1.4, color:"var(--text)" }}>{p.title}</h4>
                    <div style={{ fontSize:12, color:"var(--text-4)", marginTop:8 }}>{p.author}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:640px){.related-grid{grid-template-columns:1fr !important;}}`}</style>
        </section>

      </main>
      <Footer />
    </>
  );
}
