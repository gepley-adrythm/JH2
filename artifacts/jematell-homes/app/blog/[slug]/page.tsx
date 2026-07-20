import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogs } from "@/data/blogs";
import faqCrossLinks from "@/data/faqCrossLinks.json";
import { blogSlugs } from "@/lib/routeList";
import { pageMetadata } from "@/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/seo/jsonldBuilders";
import { JsonLd } from "@/seo/JsonLd";
import { BlogPostBody } from "@/views/BlogPostBody";

export const dynamicParams = false;

/** Same real-post filter the old prerender used (blogSlugs wraps it). */
export function generateStaticParams() {
  return blogSlugs().map((slug) => ({ slug }));
}

function cleanTitle(t: string) {
  return t.replace(/\s*[—–-]\s*Jematell Homes\s*$/i, "").trim();
}

function heroImage(data: (typeof blogs)[string]): string {
  return (
    data.ogImage ||
    data.blocks.find((b) => b.type === "img" && b.src)?.src ||
    ""
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = blogs[slug];
  if (!data) return {};
  const title = cleanTitle(data.title);
  const heroImg = heroImage(data);
  return pageMetadata({
    title,
    description: data.description || `${title}: notes from the Jematell Homes journal.`,
    canonical: `/blog/${slug}`,
    image: heroImg,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = blogs[slug];
  if (!data) notFound();

  const keys = blogSlugs();
  const idx = keys.indexOf(slug);
  const siblings = {
    prev: idx > 0 ? keys[idx - 1] : null,
    next: idx >= 0 && idx < keys.length - 1 ? keys[idx + 1] : null,
  };

  const relatedFaqs = faqCrossLinks.filter((f) => f.pillarBlogSlug === slug);

  const title = cleanTitle(data.title);
  const heroImg = heroImage(data);
  const bodyBlocks = data.blocks.filter(
    (b) => !(b.type === "img" && b.src === heroImg),
  );

  const path = `/blog/${slug}`;

  return (
    <main className="page blog-post">
      <JsonLd
        data={[
          articleJsonLd({ title, description: data.description, url: path, image: heroImg }),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: title, url: path },
          ]),
        ]}
      />
      <section className="blog-post-hero">
        {heroImg ? <img src={heroImg} alt="" className="page-hero-bg" /> : null}
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <Link href="/blog" className="gallery-back" data-testid="blog-back">
            <ArrowLeft size={16} /> All Articles
          </Link>
          <h1 className="blog-post-title hero-title">{title}</h1>
          {data.description ? (
            <p className="page-hero-sub">{data.description}</p>
          ) : null}
        </div>
      </section>

      <section className="section-pad blog-post-body" style={{ background: "var(--color-bg)" }}>
        <div className="container container-narrow">
          <BlogPostBody blocks={bodyBlocks} />
        </div>
      </section>

      {relatedFaqs.length > 0 ? (
        <section className="section-pad post-faqs" style={{ background: "var(--color-cream, #ece9e2)" }}>
          <div className="container container-narrow">
            <h2 className="post-h2">Related questions</h2>
            <ul className="post-faq-list" data-testid="post-related-faqs">
              {relatedFaqs.map((f) => (
                <li key={f.slug}>
                  <a href={`/faq/${f.slug}`} data-testid={`post-faq-${f.slug}`}>
                    {f.question.replace(/^\[PLACEHOLDER\]\s*/, "")}
                    <ArrowRight size={16} />
                  </a>
                </li>
              ))}
            </ul>
            <a href="/faq" className="post-faq-all" data-testid="post-faq-all">
              See all FAQs <ArrowRight size={14} />
            </a>
          </div>
        </section>
      ) : null}

      <section className="post-nav-strip">
        <div className="container">
          <div className="post-nav-grid">
            {siblings.prev ? (
              <Link href={`/blog/${siblings.prev}`} className="post-nav-link" data-testid="post-prev">
                <span><ArrowLeft size={14} /> Previous</span>
                <strong>{cleanTitle(blogs[siblings.prev]?.title || "")}</strong>
              </Link>
            ) : <span />}
            {siblings.next ? (
              <Link href={`/blog/${siblings.next}`} className="post-nav-link right" data-testid="post-next">
                <span>Next <ArrowRight size={14} /></span>
                <strong>{cleanTitle(blogs[siblings.next]?.title || "")}</strong>
              </Link>
            ) : <span />}
          </div>
        </div>
      </section>
    </main>
  );
}
