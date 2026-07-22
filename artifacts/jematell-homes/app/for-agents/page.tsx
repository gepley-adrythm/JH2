import Link from "next/link";
import { pageMetadata } from "@/seo/metadata";
import { breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { siteConfig } from "@/config/siteConfig";

export const metadata = pageMetadata({
  title: "For Real Estate Agents",
  description:
    "Jematell Homes partners with real estate agents. Refer a client who signs a contract to build a custom home and earn a 1% referral fee.",
  canonical: "/for-agents",
});

const STEPS: { title: string; body: string }[] = [
  {
    title: "Introduce your client",
    body: "Connect us with a client who wants to build a custom home anywhere in the Phoenix metro. Send them our way or reach out on their behalf.",
  },
  {
    title: "We build their home",
    body: "We guide your client through design, financing, and construction, and keep you in the loop from first meeting to final walkthrough.",
  },
  {
    title: "You earn your fee",
    body: "When your client signs a contract to build with us, you receive a 1% referral fee. Your relationship with your client stays yours.",
  },
];

export default function ForAgents() {
  return (
    <main className="page">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "For Real Estate Agents", url: "/for-agents" },
        ])}
      />
      <div className="container" style={{ maxWidth: 820, padding: "80px 24px 96px" }}>
        <span className="hero-eyebrow" style={{ display: "block", marginBottom: "0.75rem" }}>For Real Estate Agents</span>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>
          Partner With Jematell Homes
        </h1>
        <p style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "var(--color-text-muted)", marginBottom: "2.5rem", maxWidth: 680 }}>
          We love working with real estate agents. If you have a client who wants to build a custom home,
          bring them to us. We handle the design and construction, keep you involved throughout, and reward
          you for the introduction.
        </p>

        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            padding: "clamp(28px, 4vw, 44px)",
            background: "var(--color-cream)",
            textAlign: "center",
            marginBottom: "3.5rem",
          }}
        >
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.75rem, 7vw, 4rem)", lineHeight: 1, color: "var(--color-accent)" }}>
            1%
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 500, marginTop: "0.5rem", letterSpacing: "0.02em" }}>Referral Fee</div>
          <p style={{ lineHeight: 1.75, color: "var(--color-text-muted)", marginTop: "1rem", maxWidth: 560, marginInline: "auto" }}>
            We pay a <strong>1% referral fee</strong> to any licensed real estate agent who brings us a client
            that signs a contract to build a custom home with Jematell Homes.
          </p>
        </div>

        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", marginBottom: "1.5rem" }}>How it works</h2>
        <div style={{ display: "grid", gap: "1.5rem", marginBottom: "3.5rem" }}>
          {STEPS.map((step, i) => (
            <div key={step.title} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid var(--color-accent)",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                }}
              >
                {i + 1}
              </span>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.35rem" }}>{step.title}</h3>
                <p style={{ lineHeight: 1.7, color: "var(--color-text-muted)" }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "0.75rem" }}>Ready to refer a client?</h2>
          <p style={{ lineHeight: 1.8, color: "var(--color-text-muted)", marginBottom: "1.5rem", maxWidth: 640 }}>
            Reach out and we will walk you through the referral process and answer any questions. You can call
            us at {siteConfig.contact.phone.display} or send a note through our contact form.
          </p>
          <Link href="/contact" className="btn btn-primary" data-testid="for-agents-cta">
            Refer a Client
          </Link>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "1.5rem", lineHeight: 1.7 }}>
            The referral fee applies to signed custom home build contracts. Contact us for full details.
          </p>
        </div>
      </div>
    </main>
  );
}
