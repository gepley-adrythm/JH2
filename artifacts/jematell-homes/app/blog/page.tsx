import { blogs } from "@/data/blogs";
import { blogSlugs } from "@/lib/routeList";
import { pageMetadata } from "@/seo/metadata";
import { collectionJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { BlogIndexClient, type BlogPostMeta } from "@/views/BlogIndexClient";
import { ContactCta } from "@/components/ContactCta";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Expert advice on home building, custom design, and life in Arizona, from the Jematell Homes family to yours.",
  canonical: "/blog",
});

/**
 * Lightweight card list for the index: slug/title/description/image only.
 * blogSlugs() applies the same real-post filter the old buildList used, in the
 * same key order; the block content itself stays out of the client payload.
 */
function buildList(): BlogPostMeta[] {
  const out: BlogPostMeta[] = [];
  for (const slug of blogSlugs()) {
    const data = blogs[slug];
    if (!data || !data.title) continue;
    const title = data.title.replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "").trim();
    const image =
      data.ogImage ||
      data.blocks.find((b) => b.type === "img" && b.src)?.src ||
      "";
    out.push({
      slug,
      title,
      description: data.description || "",
      image,
    });
  }
  return out;
}

export default function BlogIndexPage() {
  const posts = buildList();

  return (
    <main className="page">
      <JsonLd
        data={collectionJsonLd({
          name: "Blog - Jematell Homes",
          description: "Expert advice on home building, custom design, and life in Arizona.",
          url: "/blog",
        })}
      />
      <BlogIndexClient posts={posts} />

      <section className="faq-cta">
        <div className="container faq-cta-inner">
          <h2 className="faq-cta-title">Ready to start your build?</h2>
          <p className="faq-cta-sub">
            Tell us about your project and we'll help you take the first step.
          </p>
          <ContactCta testid="blog-cta-contact">Start the conversation</ContactCta>
        </div>
      </section>
    </main>
  );
}
