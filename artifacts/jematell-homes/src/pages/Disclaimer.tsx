import { Link } from "react-router-dom";
import { Seo } from "../seo/seo";
import { breadcrumbJsonLd } from "../seo/jsonld";
import { siteConfig } from "../config/siteConfig";

const sectionStyle = { marginBottom: "2.5rem" } as const;
const h2Style = { fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "0.75rem" } as const;
const pStyle = { lineHeight: 1.8, marginBottom: "1rem" } as const;

export default function Disclaimer() {
  return (
    <main className="page">
      <Seo
        title="Website Disclaimer"
        description="The information on jematellhomes.com is for general education only. It is not legal, financial, or construction advice. Read the full disclaimer for details."
        canonical="/disclaimer"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Disclaimer", url: "/disclaimer" },
        ])}
      />
      <div className="container" style={{ maxWidth: 780, padding: "80px 24px 96px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 2.75rem)", marginBottom: "0.5rem" }}>
          Website Disclaimer
        </h1>
        <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.875rem", marginBottom: "3rem" }}>
          Effective July 2026. This disclaimer applies to every page on jematellhomes.com.
        </p>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Educational content only</h2>
          <p style={pStyle}>
            The content on this website, including our FAQ, guides, glossary, reference library, and
            blog, is published for general education. It exists to help you understand how custom home
            building works in Arizona. It is not advice for your specific project, property, or
            situation.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Not professional advice</h2>
          <p style={pStyle}>
            Nothing on this site is legal, financial, tax, lending, insurance, engineering,
            architectural, or construction advice. Reading this website does not create a
            contractor and client relationship with Jematell Homes, LLC. Before you make decisions
            about a project, consult the licensed professionals who can review your specific
            circumstances, such as an attorney, a lender, an engineer, or your local building
            department.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Accuracy and currency of information</h2>
          <p style={pStyle}>
            We work hard to keep this site accurate, and our resource pages cite the official
            sources they draw from. Even so, building codes, ordinances, fee schedules, and
            regulations change often, and cities amend their rules on their own timelines. All
            content is provided as is, without any warranty of accuracy, completeness, or
            currency. Always confirm the current requirement with the official source, such as the
            city, county, or state agency that administers it, before you rely on it.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>No government affiliation</h2>
          <p style={pStyle}>
            Some pages on this site summarize and explain public records, including state statutes,
            municipal codes, and permit or fee information. Jematell Homes, LLC is a private
            company. We are not a government agency, and we are not affiliated with or endorsed by
            any city, county, or state government. Where our summary and the official text differ,
            the official text controls.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Pricing, floor plans, and renderings</h2>
          <p style={pStyle}>
            Any cost figures, timelines, square footage, or features shown on this site are
            estimates and illustrations, not offers or guarantees. Renderings and floor plans are
            artistic representations, and finished homes can differ from them. Pricing,
            availability, and specifications change without notice. Confirm current details with us
            directly before making plans around them.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Third-party links</h2>
          <p style={pStyle}>
            This site links to outside websites, including government sources, as a convenience. We
            do not control those sites and are not responsible for their content, availability, or
            accuracy.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Questions and corrections</h2>
          <p style={pStyle}>
            If you believe something on this site is out of date or incorrect, we want to know.
            Contact us at{" "}
            <a href={siteConfig.contact.email.href}>{siteConfig.contact.email.display}</a> or{" "}
            <a href={siteConfig.contact.phone.href}>{siteConfig.contact.phone.display}</a> and we
            will review it. Jematell Homes, LLC is a licensed Arizona contractor
            ({siteConfig.contact.roc}). See also our{" "}
            <Link to="/privacy">privacy policy</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
