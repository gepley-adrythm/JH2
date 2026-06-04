import type { Request } from "express";

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function escapeAttr(input: string): string {
  return escapeHtml(input);
}

// Serialize JSON-LD safely for inlining in a <script> tag.
export function jsonLdScript(data: unknown): string {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}

// Defense-in-depth sanitizer for rich answer HTML before it is inlined into an
// SSR page. Answer content currently originates from the in-code seed (a trusted
// source), but the schema anticipates an editor-supplied `answerHtml` column, so
// we strip the dangerous sinks (script/style/embeds, event handlers, and
// javascript:/data: URLs) at the render boundary regardless of origin.
const DANGEROUS_BLOCK_TAGS =
  /<\s*(script|style|iframe|object|embed|template|noscript|svg|math|form)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;
const DANGEROUS_VOID_TAGS = /<\s*(script|style|iframe|object|embed|link|meta)\b[^>]*\/?\s*>/gi;
const EVENT_HANDLER_ATTRS = /\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const DANGEROUS_URL_ATTRS =
  /\s+(href|src|xlink:href)\s*=\s*("\s*(?:javascript|data|vbscript):[^"]*"|'\s*(?:javascript|data|vbscript):[^']*'|\s*(?:javascript|data|vbscript):[^\s>]+)/gi;

export function sanitizeHtml(input: string): string {
  return input
    .replace(DANGEROUS_BLOCK_TAGS, "")
    .replace(DANGEROUS_VOID_TAGS, "")
    .replace(EVENT_HANDLER_ATTRS, "")
    .replace(DANGEROUS_URL_ATTRS, "");
}

// Resolve the public origin. In production we trust an explicitly-configured
// origin (PUBLIC_SITE_URL, else the first REPLIT_DOMAINS entry) so canonical /
// JSON-LD / sitemap URLs can't be poisoned via spoofed Host/X-Forwarded-Host
// headers. We only fall back to request headers in development.
export function getBaseUrl(req: Request): string {
  const configured = process.env["PUBLIC_SITE_URL"]?.trim();
  if (configured) return configured.replace(/\/+$/, "");

  const domains = process.env["REPLIT_DOMAINS"]?.split(",")[0]?.trim();
  if (domains) return `https://${domains}`;

  const proto =
    (req.headers["x-forwarded-proto"] as string | undefined)?.split(",")[0]?.trim() ||
    req.protocol ||
    "https";
  const host =
    (req.headers["x-forwarded-host"] as string | undefined) ||
    req.headers.host ||
    "localhost";
  return `${proto}://${host}`;
}
