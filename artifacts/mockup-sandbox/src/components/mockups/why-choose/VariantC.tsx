const features = [
  { title: "On-Your-Lot Specialists", body: "Building on your own land comes with unique challenges — zoning, utilities, site prep, and more. We have the experience to navigate every obstacle, so you don't have to figure it out alone." },
  { title: "End-to-End Guidance", body: "From evaluating your lot to handing you the keys, we guide you every step of the way — site feasibility, plan selection, permits, budget, and construction management." },
  { title: "Transparent Pricing", body: "No surprises. We provide clear, detailed estimates upfront so you always know exactly where your money is going and why." },
  { title: "Deep Local Knowledge", body: "We know Phoenix metro — from Rio Verde's water regulations to Scottsdale's hillside ordinances. That local expertise protects your investment at every turn." },
  { title: "Proven 7-Step Process", body: "Our streamlined process keeps your project on schedule and on budget. Every milestone is planned, communicated, and signed off before the next begins." },
  { title: "Quality You Can See", body: "Premium materials, trusted local subcontractors, and inspections at every stage — because we stand behind every home we build." },
  { title: "We're With You After Move-In", body: "Our relationship doesn't end at closing. A comprehensive warranty and responsive after-care support are standard on every Jematell home." },
];

const BG = ["#f4f2ec", "#ece9e2", "#f4f2ec", "#ece9e2", "#f4f2ec", "#ece9e2", "#f4f2ec"];

export default function VariantC() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#f4f2ec", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 40px 40px" }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3b617f", display: "block", marginBottom: 12 }}>Why us</span>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 600, color: "#2a2a2a", margin: "0 0 52px", textTransform: "uppercase", lineHeight: 1.1 }}>Why Choose Jematell</h2>
      </div>
      {features.map((f, i) => (
        <div key={i} style={{ background: BG[i], borderTop: "1px solid #d8d3ca", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 40px", display: "grid", gridTemplateColumns: "140px 1fr 1.6fr", gap: "0 56px", alignItems: "center" }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 80, fontWeight: 600, color: "#3b617f", opacity: 0.12, lineHeight: 1, userSelect: "none" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: "#2a2a2a", margin: 0, lineHeight: 1.3 }}>{f.title}</h3>
            <p style={{ fontSize: 15.5, color: "#5c5c5c", lineHeight: 1.72, margin: 0 }}>{f.body}</p>
          </div>
        </div>
      ))}
      <div style={{ height: 64 }} />
    </div>
  );
}
