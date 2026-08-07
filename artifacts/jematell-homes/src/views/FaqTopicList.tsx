"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";

interface Item {
  slug: string;
  question: string;
  shortAnswer: string;
  tags: string[];
}

function normalizeTokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

function search(items: Item[], query: string): Item[] {
  const tokens = normalizeTokens(query);
  if (tokens.length === 0) return items;
  return items
    .map((i) => {
      const hay = `${i.question} ${i.shortAnswer} ${i.tags.join(" ")}`.toLowerCase();
      const score = tokens.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
      return { i, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.i);
}

export function FaqTopicList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim();
    return q ? search(items, q) : items;
  }, [items, query]);

  return (
    <>
      <div className="faq-search" role="search" style={{ maxWidth: 560, marginBottom: 32 }}>
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions…"
          aria-label="Search questions in this topic"
        />
      </div>

      <ul className="faq-list" data-testid="faq-topic-list">
        {visible.map((i) => (
          <li key={i.slug}>
            <Link href={`/faq/${i.slug}`} data-testid={`faq-topic-q-${i.slug}`}>
              <span>{i.question}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </li>
        ))}
        {visible.length === 0 && (
          <li className="faq-empty">No matches — try fewer or different words.</li>
        )}
      </ul>

      <Link href="/faq" className="faq-back" data-testid="faq-topic-all">
        All questions <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </>
  );
}
