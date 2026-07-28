/**
 * Interlink.tsx — the presentation half of the interlinking engine.
 *
 * One normalized item shape (LinkItem) rendered through six visually distinct
 * variants, so a glossary page's footer does not look like a reference page's
 * footer. Which variant each module uses is declared in interlink.config.ts, not
 * here, so re-skinning a module is a one-line change.
 *
 * Everything is server-rendered and static-export safe. The accordion is a
 * native <details>, the carousel is CSS scroll-snap. No client component, no
 * hydration cost, and both still work with JS disabled.
 */
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, FileText, HelpCircle, Layers, Compass } from "lucide-react";
import type { LinkItem, LinkKind } from "@/lib/interlink";

export type InterlinkVariant = "list" | "cards" | "accordion" | "carousel" | "chips" | "feature";

export interface InterlinkSection {
  id: string;
  label: string;
  /** Optional line under the label. Cards, accordion and feature show it. */
  kicker?: string;
  items: LinkItem[];
  variant: InterlinkVariant;
}

const KIND_ICON: Record<LinkKind, typeof HelpCircle> = {
  faq: HelpCircle,
  glossary: BookOpen,
  reference: FileText,
  guide: Layers,
  service: Compass,
  blog: Compass,
};

function KindIcon({ kind, size = 15 }: { kind: LinkKind; size?: number }) {
  const Icon = KIND_ICON[kind] || HelpCircle;
  return <Icon size={size} aria-hidden="true" />;
}

/* ----------------------------- variants ----------------------------- */

function ListVariant({ items }: { items: LinkItem[] }) {
  return (
    <ul className="il-list">
      {items.map((it) => (
        <li key={it.to}>
          <Link href={it.to}>
            <span>{it.label}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CardsVariant({ items }: { items: LinkItem[] }) {
  return (
    <div className="il-cards">
      {items.map((it) => (
        <Link key={it.to} href={it.to} className="il-card">
          <span className="il-card-kind">
            <KindIcon kind={it.kind} />
            {it.meta || KIND_LABEL[it.kind]}
          </span>
          <span className="il-card-title">{it.label}</span>
          {it.blurb ? <span className="il-card-blurb">{it.blurb}</span> : null}
          <span className="il-card-go">
            Read <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}

/**
 * Native <details>. Answer-first pages benefit: the question is the summary and
 * the short answer is the panel, so a reader can triage without a page load.
 */
function AccordionVariant({ items, id }: { items: LinkItem[]; id: string }) {
  return (
    <div className="il-accordion">
      {items.map((it, i) => (
        <details key={it.to} className="il-acc-item" name={`il-${id}`} open={i === 0}>
          <summary>
            <span className="il-acc-q">{it.label}</span>
            <span className="il-acc-mark" aria-hidden="true" />
          </summary>
          <div className="il-acc-panel">
            {it.blurb ? <p>{it.blurb}</p> : null}
            <Link href={it.to} className="il-acc-link">
              Read the full answer <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </details>
      ))}
    </div>
  );
}

/** CSS scroll-snap rail. Keyboard reachable because each card is a link. */
function CarouselVariant({ items, label }: { items: LinkItem[]; label: string }) {
  return (
    <div className="il-carousel" role="group" aria-label={label}>
      <div className="il-rail">
        {items.map((it) => (
          <Link key={it.to} href={it.to} className="il-rail-card">
            <span className="il-rail-kind">
              <KindIcon kind={it.kind} />
              {it.meta || KIND_LABEL[it.kind]}
            </span>
            <span className="il-rail-title">{it.label}</span>
            {it.blurb ? <span className="il-rail-blurb">{it.blurb}</span> : null}
            <span className="il-rail-go" aria-hidden="true">
              <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ChipsVariant({ items }: { items: LinkItem[] }) {
  return (
    <div className="il-chips">
      {items.map((it) => (
        <Link key={it.to} href={it.to} className="il-chip">
          {it.label}
        </Link>
      ))}
    </div>
  );
}

/** One editorial hero link plus the rest as a compact list. */
function FeatureVariant({ items }: { items: LinkItem[] }) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  return (
    <div className="il-feature">
      <Link href={lead.to} className="il-feature-lead">
        <span className="il-feature-kind">
          <KindIcon kind={lead.kind} size={14} />
          {lead.meta || KIND_LABEL[lead.kind]}
        </span>
        <span className="il-feature-title">{lead.label}</span>
        {lead.blurb ? <span className="il-feature-blurb">{lead.blurb}</span> : null}
        <span className="il-feature-go">
          Keep reading <ArrowRight size={15} aria-hidden="true" />
        </span>
      </Link>
      {rest.length ? (
        <ul className="il-list il-feature-rest">
          {rest.map((it) => (
            <li key={it.to}>
              <Link href={it.to}>
                <span>{it.label}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const KIND_LABEL: Record<LinkKind, string> = {
  faq: "Question",
  glossary: "Term",
  reference: "Reference",
  guide: "Guide",
  service: "Service",
  blog: "Article",
};

/* ----------------------------- shell ----------------------------- */

function SectionBody({ section }: { section: InterlinkSection }) {
  switch (section.variant) {
    case "cards":
      return <CardsVariant items={section.items} />;
    case "accordion":
      return <AccordionVariant items={section.items} id={section.id} />;
    case "carousel":
      return <CarouselVariant items={section.items} label={section.label} />;
    case "chips":
      return <ChipsVariant items={section.items} />;
    case "feature":
      return <FeatureVariant items={section.items} />;
    default:
      return <ListVariant items={section.items} />;
  }
}

/**
 * Renders the whole "keep exploring" footer for a page. Sections with no items
 * are dropped by the config layer before they reach here, so this never emits an
 * empty heading.
 */
export function Interlink({
  sections,
  title = "Keep exploring",
  testid,
}: {
  sections: InterlinkSection[];
  title?: string;
  testid?: string;
}) {
  const live = sections.filter((s) => s.items.length > 0);
  if (!live.length) return null;
  return (
    <section className="il" data-testid={testid} aria-labelledby="il-title">
      <h2 className="il-title" id="il-title">
        {title}
      </h2>
      <div className="il-sections">
        {live.map((s) => (
          <div key={s.id} className={`il-section il-section-${s.variant}`} data-testid={`il-${s.id}`}>
            <div className="il-section-head">
              <h3 className="il-section-label">{s.label}</h3>
              {s.kicker ? <p className="il-section-kicker">{s.kicker}</p> : null}
            </div>
            <SectionBody section={s} />
          </div>
        ))}
      </div>
    </section>
  );
}
