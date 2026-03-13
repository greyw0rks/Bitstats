"use client";
import { useState } from "react";

interface FAQItem { q: string; a: string; }

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {items.map((item, i) => (
        <div key={i} className="faq-item">
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span className={`faq-icon ${open === i ? "open" : ""}`}>+</span>
          </button>
          <div className="faq-body" style={{ maxHeight: open === i ? 300 : 0 }}>
            <div className="faq-inner">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
