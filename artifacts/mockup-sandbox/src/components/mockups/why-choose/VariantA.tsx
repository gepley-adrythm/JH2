const features = [
  { title: "We Specialize in On-Your-Lot Building", body: "Building on your own land comes with unique challenges — zoning, utilities, site prep, and more. We have the experience to navigate it all smoothly, so you don't have to." },
  { title: "End-to-End Guidance", body: "From evaluating your lot to handing you the keys, we guide you every step of the way.", bullets: ["Site evaluation and feasibility", "Floor plan selection and customization", "Permits and approvals", "Budget planning and financing guidance", "Construction and project management"] },
  { title: "Transparent Pricing", body: "No surprises. We provide clear, detailed estimates upfront so you always know where your money is going." },
  { title: "Local Expertise", body: "We know the Phoenix metro — from Rio Verde's water regulations to Scottsdale's hillside ordinances. Our local knowledge protects your investment." },
  { title: "Proven Process", body: "Our streamlined 7-step build process keeps your project on schedule, on budget, and stress-free from start to finish." },
  { title: "Quality You Can See", body: "We work with trusted local subcontractors and use premium materials. Every home is built to last and inspected at every stage." },
  { title: "We're With You After Move-In", body: "Our relationship doesn't end at closing. We stand behind our work with a comprehensive warranty and responsive support." },
];

export default function VariantA() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#f4f2ec", minHeight: "100vh", padding: "64px 0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: 56 }}>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3b617f", display: "block", marginBottom: 12 }}>Why us</span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 600, color: "#2a2a2a", margin: 0, textTransform: "uppercase", lineHeight: 1.1 }}>Why Choose Jematell</h2>
        </div>
        <div>
          {features.map((f, i) => (
            <div key={i} style={{ borderTop: "1px solid #c8c3bb", display: "grid", gridTemplateColumns: "72px 1fr 1fr", gap: "32px 48px", padding: "32px 0", alignItems: "start" }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 13, fontWeight: 400, color: "#3b617f", letterSpacing: "0.05em", paddingTop: 4 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: "#2a2a2a", margin: "0 0 0 0", lineHeight: 1.25 }}>{f.title}</h3>
              </div>
              <div>
                <p style={{ fontSize: 15.5, color: "#5c5c5c", lineHeight: 1.7, margin: 0 }}>{f.body}</p>
                {f.bullets && (
                  <ul style={{ margin: "12px 0 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {f.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 14.5, color: "#5c5c5c", display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#3b617f", flexShrink: 0, display: "inline-block" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
