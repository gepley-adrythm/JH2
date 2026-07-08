import { MapPin, ShoppingBag, ArrowUpRight } from "lucide-react";

const CARDS = [
  {
    icon: MapPin,
    eyebrow: "Own land?",
    title: "Build on Your Lot",
    sub: "Already own land? We build on your homesite — full design-to-keys management.",
  },
  {
    icon: ShoppingBag,
    eyebrow: "Need land?",
    title: "Buy a Lot With Us",
    sub: "We help you find and secure the perfect homesite in any of our communities.",
  },
];

export function DarkCards() {
  return (
    <div style={{ background: "#f4f2ec", padding: "40px 48px", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {CARDS.map((c) => (
          <div
            key={c.title}
            style={{
              background: "#121415",
              borderRadius: 6,
              padding: "28px 28px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#3b617f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                flexShrink: 0,
              }}>
                <c.icon size={18} />
              </span>
              <ArrowUpRight size={18} style={{ color: "#3b617f" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3b617f", fontWeight: 600 }}>
                {c.eyebrow}
              </span>
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 20,
                fontWeight: 500,
                color: "#f0ede6",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}>
                {c.title}
              </span>
              <p style={{ fontSize: 14, color: "#8a8680", lineHeight: 1.5, margin: 0 }}>
                {c.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
