export function C_BodoniModa() {
  return (
    <>
      <link
        rel="stylesheet"
        media="print"
        onLoad={(e) => { (e.currentTarget as HTMLLinkElement).media = "all"; }}
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;0,6..96,400;1,6..96,300;1,6..96,400&family=Manrope:wght@300;400;500&display=swap"
      />
      <div style={{
        background: "#f4f2ec",
        minHeight: "100vh",
        fontFamily: "'Manrope', sans-serif",
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
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 400,
            fontSize: "19px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#121415",
          }}>Jematell Homes</span>
          <div style={{ display: "flex", gap: "32px", fontSize: "12px", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3b617f" }}>
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
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8c5a45",
            marginBottom: "28px",
          }}>Custom Home Builder · Scottsdale, AZ</p>

          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 300,
            fontSize: "clamp(50px, 7vw, 90px)",
            lineHeight: 1.02,
            letterSpacing: "0em",
            color: "#121415",
            margin: "0 0 32px",
          }}>
            Homes Built With<br />
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "#8c5a45" }}>Quiet Precision</em>
          </h1>

          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: 1.5,
            letterSpacing: "0.03em",
            color: "#3b617f",
            margin: "0 0 28px",
          }}>
            Family-owned. Design-led. Built for the desert.
          </h2>

          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300,
            fontSize: "15.5px",
            lineHeight: 1.78,
            color: "rgba(18,20,21,0.65)",
            maxWidth: "560px",
            margin: "0 0 52px",
            letterSpacing: "0.01em",
          }}>
            For over two decades, Jematell Homes has crafted custom residences across
            Scottsdale, Rio Verde, and the greater Phoenix metro — each one designed
            around the landscape, the light, and the life you want to live.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button style={{
              background: "transparent",
              color: "#121415",
              border: "1px solid #121415",
              padding: "15px 36px",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Manrope', sans-serif",
            }}>
              Start Your Build
            </button>
            <button style={{
              background: "#3b617f",
              color: "#f4f2ec",
              border: "none",
              padding: "15px 36px",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Manrope', sans-serif",
            }}>
              View Gallery
            </button>
          </div>
        </div>

        <div style={{
          padding: "28px 48px",
          borderTop: "1px solid rgba(18,20,21,0.08)",
          background: "#ece9e2",
          display: "flex",
          gap: "48px",
        }}>
          {[["C — Bodoni Moda", "Dramatic, fashion-forward luxury"], ["Body — Manrope", "Geometric, airy, editorial"]].map(([label, desc]) => (
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
