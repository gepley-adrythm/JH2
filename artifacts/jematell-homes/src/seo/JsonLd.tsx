/**
 * JsonLd — renders page-specific JSON-LD scripts. Server-safe (no hooks), so
 * corpus pages emit their structured data with zero client JS. The site-wide
 * graph is emitted once in app/layout.tsx; pages must only add page types
 * (Service, BlogPosting, BreadcrumbList, FAQPage, ...), same rule as before.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          data-seo-jsonld=""
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(obj).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
