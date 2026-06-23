export function D_Lora() {
  return (
    <>
      <link
        rel="stylesheet"
        media="print"
        onLoad={(e) => { (e.currentTarget as HTMLLinkElement).media = "all"; }}
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Geist:wght@300;400;500&display=swap"
      />
      <div style={{
        background: "#f4f2ec",
        minHeight: "100vh",
        fontFamily: "'Geist', sans-serif",
        color: "#121415",
        display: "flex",
        flexDirection: "column",
      }}>
        <nav style={{
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(18,20,21,0.08)",
        }}>
          <span style={{
            fontFamily: "'Lora', serif",
            fontWeight: 500,
            fontSize: "20px",
            letterSpacing: "0.02em",
            color: "#121415",
          }}>Jematell Homes</span>
          <div style={{ display: "flex", gap: "32px", fontSize: "13px", fontWeight: 400, letterSpacing: "0.02em", color: "#3b617f" }}>
            <span>Custom Homes</span>
            <span>Gallery</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </nav>

        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 48px 64px",
          maxWidth: "860px",
        }}>
          <p style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#8c5a45",
            marginBottom: "24px",
          }}>Custom Home Builder · Scottsdale, AZ</p>

          <h1 style={{
            fontFamily: "'Lora', serif",
            fontWeight: 500,
            fontSize: "clamp(46px, 6vw, 78px)",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            color: "#121415",
            margin: "0 0 32px",
          }}>
            Homes Built With<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#3b617f" }}>Quiet Precision</em>
          </h1>

          <h2 style={{
            fontFamily: "'Lora', serif",
            fontWeight: 400,
            fontSize: "21px",
            lineHeight: 1.45,
            letterSpacing: "0.005em",
            color: "#3b617f",
            margin: "0 0 28px",
          }}>
            Family-owned. Design-led. Built for the desert.
          </h2>

          <p style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 300,
            fontSize: "16px",
            lineHeight: 1.75,
            color: "rgba(18,20,21,0.68)",
            maxWidth: "580px",
            margin: "0 0 48px",
          }}>
            For over two decades, Jematell Homes has crafted custom residences across
            Scottsdale, Rio Verde, and the greater Phoenix metro — each one designed
            around the landscape, the light, and the life you want to live.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button style={{
              background: "#3b617f",
              color: "#f4f2ec",
              border: "none",
              padding: "16px 36px",
              fontSize: "13px",
              fontWeight: 400,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Geist', sans-serif",
              borderRadius: "3px",
            }}>
              Start Your Build
            </button>
            <span style={{ fontSize: "13px", color: "rgba(18,20,21,0.45)", letterSpacing: "0.02em" }}>
              or browse our portfolio →
            </span>
          </div>
        </div>

        <div style={{
          padding: "28px 48px",
          borderTop: "1px solid rgba(18,20,21,0.08)",
          background: "#ece9e2",
          display: "flex",
          gap: "48px",
        }}>
          {[["D — Lora", "Warm editorial, closest to current feel"], ["Body — Geist", "Modern, neutral, technical precision"]].map(([label, desc]) => (
            <div key={label}>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8c5a45", margin: "0 0 4px" }}>{label}</p>
              <p style={{ fontSize: "13px", color: "rgba(18,20,21,0.6)", margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
