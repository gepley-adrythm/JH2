/**
 * jsonld.ts — builders for page-specific JSON-LD. These are added per page on top
 * of the site-wide graph (see siteMeta.buildSiteJsonLd). Never emit a @type here
 * that the site-wide graph already emits (Organization/GeneralContractor/WebSite).
 */
import { SITE_URL, absoluteUrl } from "./siteMeta";

export function serviceJsonLd(opts: {
  name: string;
  description?: string;
  url: string;
  image?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    url: absoluteUrl(opts.url),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    provider: { "@id": SITE_URL + "/#business" },
    areaServed: { "@type": "State", name: "Arizona" },
  };
}

export function articleJsonLd(opts: {
  title: string;
  description?: string;
  url: string;
  image?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    url: absoluteUrl(opts.url),
    mainEntityOfPage: absoluteUrl(opts.url),
    author: { "@id": SITE_URL + "/#organization" },
    publisher: { "@id": SITE_URL + "/#organization" },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.url),
    })),
  };
}

export function faqPageJsonLd(opts: {
  url: string;
  items: Array<{ question: string; shortAnswer: string }>;
}): object {
  const pageUrl = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": pageUrl + "#faqpage",
    url: pageUrl,
    mainEntity: opts.items.map((i) => ({
      "@type": "Question",
      name: i.question,
      // shortAnswer is the schema/AI answer — concise, never rendered visibly.
      acceptedAnswer: { "@type": "Answer", text: i.shortAnswer },
    })),
  };
}

export function qaPageJsonLd(opts: {
  url: string;
  question: string;
  answer: string;
}): object {
  const pageUrl = absoluteUrl(opts.url);
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "@id": pageUrl + "#qapage",
    url: pageUrl,
    mainEntity: {
      "@type": "Question",
      name: opts.question,
      answerCount: 1,
      acceptedAnswer: { "@type": "Answer", text: opts.answer, url: pageUrl },
    },
  };
}

export function collectionJsonLd(opts: {
  name: string;
  description?: string;
  url: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    url: absoluteUrl(opts.url),
    isPartOf: { "@id": SITE_URL + "/#website" },
  };
}

export function definedTermJsonLd(opts: {
  term: string;
  definition: string;
  url: string;
  termSetName?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: opts.term,
    description: opts.definition,
    url: absoluteUrl(opts.url),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: opts.termSetName ?? "Custom Home Building Glossary",
      url: absoluteUrl("/glossary"),
    },
  };
}

export function definedTermSetJsonLd(opts: {
  name: string;
  description?: string;
  url: string;
  terms: Array<{ term: string; url: string }>;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    url: absoluteUrl(opts.url),
    hasDefinedTerm: opts.terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: absoluteUrl(t.url),
    })),
  };
}

export function techArticleJsonLd(opts: {
  title: string;
  description?: string;
  url: string;
  section?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.section ? { articleSection: opts.section } : {}),
    url: absoluteUrl(opts.url),
    mainEntityOfPage: absoluteUrl(opts.url),
    author: { "@id": SITE_URL + "/#organization" },
    publisher: { "@id": SITE_URL + "/#organization" },
  };
}
