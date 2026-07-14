const features = [
  { title: "On-Your-Lot Specialists", body: "Zoning, utilities, site prep — we've navigated every challenge. You get the experience of a team that's done this hundreds of times." },
  { title: "End-to-End Guidance", body: "From lot evaluation to handing you the keys, we own every step." },
  { title: "Transparent Pricing", body: "Detailed estimates upfront. No surprises, no hidden costs, no change-order shock at month six." },
  { title: "Local Expertise", body: "We know Phoenix metro codes, water regulations, and hillside ordinances cold. Our local knowledge is your protection." },
  { title: "Proven Process", body: "A streamlined 7-step build process keeps your project on schedule and on budget." },
  { title: "Quality You Can See", body: "Premium materials. Trusted local subs. Inspected at every stage — because we sign our name to every home." },
  { title: "Post-Move-In Support", body: "Our relationship doesn't end at closing. Comprehensive warranty and responsive after-care are standard." },
];

const ICONS = ["◈", "⟶", "◻", "⌖", "◇", "✦", "◉"];

export default function VariantB() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#ece9e2", minHeight: "100vh", padding: "64px 0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: 52, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3b617f", display: "block", marginBottom: 12 }}>Why us</span>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 600, color: "#2a2a2a", margin: 0, textTransform: "uppercase", lineHeight: 1.1 }}>Why Choose Jematell</h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#c8c3bb" }}>
          {features.map((f, i) => {
            const isLast = i === features.length - 1;
            return (
              <div
                key={i}
                style={{
                  background: "#f4f2ec",
                  padding: "36px 32px 40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  ...(isLast ? { gridColumn: "2", } : {}),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3b617f" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: 20, color: "#3b617f", opacity: 0.6 }}>{ICONS[i]}</span>
                </div>
                <div style={{ width: 32, height: 2, background: "#3b617f", opacity: 0.4 }} />
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: "#2a2a2a", margin: 0, lineHeight: 1.3 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: "#5c5c5c", lineHeight: 1.68, margin: 0, flexGrow: 1 }}>{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
