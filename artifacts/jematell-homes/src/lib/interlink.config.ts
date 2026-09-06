/**
 * interlink.config.ts — the composition half of the interlinking engine.
 *
 * This is the only file you edit to re-skin a module's "keep exploring" footer.
 * It maps each resource type to an ordered list of relation buckets, each with a
 * label and a visual variant. The resolver (interlink.ts) decides WHAT links
 * exist; this decides WHICH sections appear, in what order, and HOW they look.
 *
 * The point of the per-module assignment is that a glossary footer should not
 * look like a reference footer. Each module gets a distinct signature while
 * reusing the same six variants:
 *
 *   glossary  : chips -> accordion -> list -> feature
 *   reference : cards -> list -> chips -> feature
 *   faq       : carousel -> cards -> chips -> list -> feature
 *   guide     : accordion -> cards -> list -> chips
 *   region    : cards -> feature -> list   (a /where-we-build city page)
 *   jurisdiction : list -> feature -> list (a building-codes city hub)
 */
import type { InterlinkSection, InterlinkVariant } from "@/components/Interlink";
import type { RelationSet, SourceKind } from "@/lib/interlink";

interface BucketSpec {
  bucket: string;
  label: string;
  kicker?: string;
  variant: InterlinkVariant;
}

const LAYOUTS: Record<SourceKind, BucketSpec[]> = {
  glossary: [
    { bucket: "terms", label: "Related terms", variant: "chips" },
    {
      bucket: "faqs",
      label: "Questions that use this term",
      kicker: "Short answers first. Open one to read it here.",
      variant: "accordion",
    },
    { bucket: "references", label: "Where this appears in the code", variant: "list" },
    { bucket: "guides", label: "Go deeper", variant: "feature" },
  ],
  reference: [
    {
      bucket: "references",
      label: "More in this module",
      kicker: "Neighbouring rules that govern the same work.",
      variant: "cards",
    },
    { bucket: "faqs", label: "Related questions", variant: "list" },
    { bucket: "services", label: "Build here with Jematell Homes", variant: "list" },
    { bucket: "terms", label: "Terms on this page", variant: "chips" },
    { bucket: "guides", label: "The full walkthrough", variant: "feature" },
  ],
  region: [
    {
      bucket: "references",
      label: "The rules for building here",
      kicker: "Adopted codes, permits, inspections, setbacks and fees for this jurisdiction, from our Reference Library.",
      variant: "cards",
    },
    { bucket: "guides", label: "The complete guide to building here", variant: "feature" },
    { bucket: "faqs", label: "Questions people ask about building here", variant: "list" },
  ],
  jurisdiction: [
    {
      bucket: "services",
      label: "Build here with Jematell Homes",
      kicker: "We build on private lots and in communities under these rules.",
      variant: "list",
    },
    { bucket: "guides", label: "The complete guide to building here", variant: "feature" },
    { bucket: "faqs", label: "Questions people ask about building here", variant: "list" },
  ],
  faq: [
    {
      bucket: "faqs",
      label: "Related questions",
      kicker: "Scroll for more answers on this topic.",
      variant: "carousel",
    },
    { bucket: "references", label: "The rules behind this answer", variant: "cards" },
    { bucket: "terms", label: "Terms worth knowing", variant: "chips" },
    { bucket: "services", label: "Related services", variant: "list" },
    { bucket: "deeper", label: "Go deeper", variant: "feature" },
  ],
  guide: [
    {
      bucket: "faqs",
      label: "Questions this guide answers",
      kicker: "Short answers first. Open one to read it here.",
      variant: "accordion",
    },
    { bucket: "guides", label: "Related guides", variant: "cards" },
    { bucket: "references", label: "In the reference library", variant: "list" },
    { bucket: "terms", label: "Terms used here", variant: "chips" },
  ],
};

/**
 * Turn a resolved RelationSet into the ordered sections a page renders. Empty
 * buckets are dropped here so the component never emits a heading with nothing
 * under it.
 */
export function buildInterlinkSections(kind: SourceKind, relations: RelationSet): InterlinkSection[] {
  return LAYOUTS[kind]
    .map((spec) => ({
      id: `${kind}-${spec.bucket}`,
      label: spec.label,
      kicker: spec.kicker,
      variant: spec.variant,
      items: relations[spec.bucket] || [],
    }))
    .filter((s) => s.items.length > 0);
}
