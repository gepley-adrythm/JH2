import { ArrowRight } from "lucide-react";

const CARDS = [
  {
    label: "Already own land?",
    title: "Build on Your Lot",
    sub: "We build on your homesite — design-to-keys management on land you own.",
  },
  {
    label: "Need land first?",
    title: "Buy a Lot With Us",
    sub: "We help you find and secure the right homesite in your target community.",
  },
];

export function EditorialLinks() {
  return (
    <div style={{ background: "#f4f2ec", padding: "40px 48px", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {CARDS.map((c, i) => (
          <div
            key={c.title}
            style={{
              padding: "28px 36px 28px 0",
              borderTop: "2px solid #2a2a2a",
              borderRight: i === 0 ? "1px solid #d0cbc3" : "none",
              paddingRight: i === 0 ? 36 : 0,
              paddingLeft: i === 1 ? 36 : 0,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3b617f", fontWeight: 600 }}>
              {c.label}
            </span>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 24,
                fontWeight: 500,
                lineHeight: 1.15,
                color: "#2a2a2a",
                letterSpacing: "-0.01em",
              }}>
                {c.title}
              </span>
              <ArrowRight size={20} style={{ flexShrink: 0, marginTop: 4, color: "#3b617f" }} />
            </div>
            <p style={{ fontSize: 14, color: "#5c5c5c", lineHeight: 1.55, margin: 0 }}>
              {c.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
