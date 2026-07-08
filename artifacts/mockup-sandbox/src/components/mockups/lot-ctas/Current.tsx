import { MapPin, ShoppingBag, ArrowUpRight } from "lucide-react";

const CARDS = [
  {
    icon: MapPin,
    title: "Build on Your Lot",
    sub: "Already own land? We build on your homesite.",
  },
  {
    icon: ShoppingBag,
    title: "Buy a Lot With Us",
    sub: "We help you find and secure the perfect homesite.",
  },
];

export function Current() {
  return (
    <div style={{ background: "#f4f2ec", padding: "40px 48px", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {CARDS.map((c) => (
          <div
            key={c.title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "24px 28px",
              background: "#ece9e2",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 4,
              cursor: "pointer",
              textDecoration: "none",
              color: "#2a2a2a",
            }}
          >
            <span style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#121415",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <c.icon size={20} />
            </span>
            <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, lineHeight: 1.2 }}>
                {c.title}
              </span>
              <span style={{ fontSize: 14, color: "#5c5c5c", lineHeight: 1.4 }}>
                {c.sub}
              </span>
            </span>
            <ArrowUpRight size={18} style={{ flexShrink: 0, color: "#5c5c5c" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
