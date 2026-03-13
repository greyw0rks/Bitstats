import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  BlogThumb1, BlogThumb2, BlogThumb3, BlogThumb4, BlogThumb5,
  BlogFeat1, BlogFeat2, BlogFeat3, BlogFeat4
} from "../components/Illustrations";

export const metadata = { title: "Blog — BitStats" };

const posts = [
  { slug:"post", cat:"Identity",    catColor:"var(--blue)",   catBg:"var(--blue-light)",  Thumb: BlogThumb1, title:"Why BNS is the best identity root for Bitcoin",         excerpt:"Your digital identity is not yours. Right now, fragments of who you are live on servers controlled by companies whose interests diverge from yours the moment a breach becomes profitable.", author:"BNS Team",    date:"Mar 10, 2026", read:"4 min" },
  { slug:"post", cat:"Credentials", catColor:"var(--green)",  catBg:"var(--green-light)", Thumb: BlogThumb2, title:"Comparing Groth16, PLONK and STARKs for identity",       excerpt:"Not all zero-knowledge proof systems are created equal. We examine the tradeoffs between the three leading approaches and why Groth16 wins for identity use cases.",                     author:"ZK Team",     date:"Mar 5, 2026",  read:"8 min" },
  { slug:"post", cat:"Technology",  catColor:"#C47A00",       catBg:"var(--amber-light)", Thumb: BlogThumb3, title:"How Stacks Nakamoto makes BitStats faster",               excerpt:"The Nakamoto upgrade changes everything for Stacks-based applications. Here's how sub-second block times and Bitcoin finality improve the BitStats verification flow.",                author:"Core Team",   date:"Feb 28, 2026", read:"5 min" },
  { slug:"post", cat:"Updates",     catColor:"var(--text-3)", catBg:"var(--bg3)",         Thumb: BlogThumb4, title:"DeGrants Cohort 4 — our roadmap",                         excerpt:"We've applied to the Stacks DeGrants program for Cohort 4. Here's what we're building, our milestone plan, and how the grant will accelerate our roadmap.",                          author:"Team BitStats",date:"Feb 20, 2026", read:"6 min" },
  { slug:"post", cat:"Identity",    catColor:"var(--blue)",   catBg:"var(--blue-light)",  Thumb: BlogThumb5, title:"The case for Bitcoin-native identity",                    excerpt:"Every major blockchain ecosystem has an identity layer — except Bitcoin. We argue why Bitcoin-native identity through BNS is not just possible but essential for the next wave of adoption.", author:"BNS Team",   date:"Feb 14, 2026", read:"7 min" },
];

const featured = [
  { slug:"post", cat:"Identity",    catColor:"var(--blue)",   Feat: BlogFeat1, title:"Why BNS is the best identity root for Bitcoin",   author:"BNS Team · 4 min" },
  { slug:"post", cat:"Credentials", catColor:"var(--green)",  Feat: BlogFeat2, title:"Comparing Groth16, PLONK and STARKs for identity", author:"ZK Team · 8 min" },
  { slug:"post", cat:"Technology",  catColor:"#C47A00",       Feat: BlogFeat3, title:"How Stacks Nakamoto makes BitStats faster",        author:"Core Team · 5 min" },
  { slug:"post", cat:"Updates",     catColor:"var(--text-3)", Feat: BlogFeat4, title:"DeGrants Cohort 4 — our roadmap",                  author:"Team BitStats · 6 min" },
];

const categories = ["All", "Identity", "Credentials", "Technology", "Updates"];

export default function Blog() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop:68 }}>

        {/* Header */}
        <section style={{ padding:"72px 5%", background:"var(--bg2)", borderBottom:"1px solid var(--border)" }}>
          <div className="container">
            <p className="section-kicker">Blog</p>
            <h1 style={{ fontSize:"clamp(2rem,4vw,3.2rem)", marginBottom:16 }}>Insights on identity</h1>
            <p style={{ fontSize:18, color:"var(--text-3)", maxWidth:540, lineHeight:1.7 }}>Zero-knowledge proofs, BNS, Stacks, and the future of self-sovereign identity.</p>
          </div>
        </section>

        {/* Category pills */}
        <div style={{ padding:"24px 5%", borderBottom:"1px solid var(--border)", background:"white" }}>
          <div className="container" style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {categories.map((c, i) => (
              <button key={c} style={{ padding:"6px 16px", borderRadius:100, border:"1px solid var(--border)", fontSize:13, fontWeight:500, cursor:"pointer", background: i===0 ? "var(--blue)" : "white", color: i===0 ? "white" : "var(--text-3)" }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Post list with SVG thumbnails */}
        <section className="section">
          <div className="container">
            {posts.map((p, i) => (
              <Link key={i} href={`/blog/${p.slug}`} style={{ display:"grid", gridTemplateColumns:"120px 1fr", gap:24, padding:"28px 0", borderBottom:"1px solid var(--border)", alignItems:"center", textDecoration:"none" }} className="post-row">
                <div style={{ aspectRatio:"4/3", borderRadius:10, overflow:"hidden" }}>
                  <p.Thumb />
                </div>
                <div>
                  <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:p.catColor, background:p.catBg, padding:"3px 10px", borderRadius:100 }}>{p.cat}</span>
                    <span style={{ fontSize:12, color:"var(--text-4)" }}>{p.date} · {p.read} read</span>
                  </div>
                  <h3 style={{ fontSize:"clamp(15px,2vw,18px)", marginBottom:8, lineHeight:1.3 }}>{p.title}</h3>
                  <p style={{ fontSize:14, color:"var(--text-3)", lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.excerpt}</p>
                  <div style={{ fontSize:13, color:"var(--text-4)", marginTop:10 }}>By {p.author}</div>
                </div>
              </Link>
            ))}
          </div>
          <style>{`@media(max-width:480px){.post-row{grid-template-columns:1fr !important;} .post-row > div:first-child{display:none;}}`}</style>
        </section>

        {/* Featured with SVG thumbnails */}
        <section className="section" style={{ background:"var(--bg2)" }}>
          <div className="container">
            <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,2rem)", marginBottom:32 }}>More from our writers</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }} className="feat-grid">
              {featured.map((p, i) => (
                <Link key={i} href={`/blog/${p.slug}`} style={{ border:"1px solid var(--border)", borderRadius:14, overflow:"hidden", background:"white", textDecoration:"none", display:"block" }}>
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
          <style>{`@media(max-width:900px){.feat-grid{grid-template-columns:1fr 1fr !important;}} @media(max-width:480px){.feat-grid{grid-template-columns:1fr !important;}}`}</style>
        </section>

        {/* Newsletter */}
        <section style={{ padding:"64px 5%" }}>
          <div style={{ maxWidth:480, margin:"0 auto", textAlign:"center" }}>
            <h2 style={{ marginBottom:8, fontSize:"clamp(1.4rem,2.5vw,2rem)" }}>Get new posts delivered</h2>
            <p style={{ color:"var(--text-3)", marginBottom:24 }}>No spam. Only signal on identity, ZK proofs, and Stacks.</p>
            <div style={{ display:"flex", gap:8 }}>
              <input type="email" placeholder="Your email address" style={{ flex:1, padding:"12px 16px", border:"1px solid var(--border)", borderRadius:100, fontSize:15, outline:"none", fontFamily:"Inter, sans-serif" }} />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
