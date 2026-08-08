import { Router, type IRouter, type Request, type Response } from "express";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
// Gmail integration (connection: google-mail). Sends lead notifications via the
// Replit Connectors proxy, which injects OAuth2 tokens automatically.
import { ReplitConnectors } from "@replit/connectors-sdk";
import { db, leads } from "@workspace/db";

/**
 * contact.ts — POST /api/contact
 *
 * One submission produces one database row and two deliberately separate
 * emails:
 *
 *   1. An acknowledgment to the lead, CC'd to the team inbox. This is the
 *      thread the team replies on, so it contains nothing a customer should
 *      not see — no attribution, no internal labels.
 *   2. An attribution report to marketing, carrying the full tracking
 *      breakdown, sent nowhere near the customer.
 *
 * These used to be a single email: the team inbox received the card WITH
 * attribution and a Reply-To pointing at the lead. Hitting Reply quoted the
 * whole message back to the customer, ad source and all. Splitting the two
 * removes the leak path outright instead of relying on someone remembering to
 * trim a quoted section they cannot even see by default.
 *
 * Because the team's copy no longer carries attribution, the database row is
 * now the durable record of where a lead came from — see the leads table.
 */

const router: IRouter = Router();

const connectors = new ReplitConnectors();

// The shared inbox the team answers from. CC'd on the acknowledgment so the
// reply thread is already sitting in their mailbox.
const DEFAULT_TEAM_INBOX = ["info@jematellhomes.com"];
// Marketing. Receives the attribution breakdown, and only that.
const DEFAULT_ATTRIBUTION_TO = ["gepley@adrythm.com"];

// Mirrors the website's contact-form siteConfig. The api-server cannot import
// the web artifact, so these are duplicated; keep them in sync with
// artifacts/jematell-homes/src/contact-form/siteConfig.ts.
const BUSINESS_NAME = "Jematell Homes";
const PHONE_DISPLAY = "(602) 421-5576";
const PHONE_HREF = "tel:+16024215576";

function envList(name: string, fallback: string[]): string[] {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : fallback;
}

const getTeamInbox = (): string[] => envList("CONTACT_TEAM_INBOX", DEFAULT_TEAM_INBOX);
const getAttributionTo = (): string[] =>
  envList("CONTACT_ATTRIBUTION_TO", DEFAULT_ATTRIBUTION_TO);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// RFC 2822 headers must not contain CR/LF (header-injection guard) — collapse
// any newlines a lead may have typed into a single-line field.
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

const isAscii = (value: string): boolean => !/[^\x20-\x7E]/.test(value);

// Headers fold at whitespace, so a run of non-space characters longer than the
// fold width cannot be broken. Encoding such a run as fixed-size RFC 2047 words
// makes it foldable, which is why length alone can force encoding.
const MAX_UNBREAKABLE_RUN = 70;

function needsEncoding(value: string): boolean {
  if (!isAscii(value)) return true;
  return value.split(/\s+/).some((token) => token.length > MAX_UNBREAKABLE_RUN);
}

/**
 * RFC 2047 encoded-words. Header values are ASCII-only on the wire, so a lead
 * named "José" or a subject with an em dash has to be encoded or it arrives as
 * mojibake.
 *
 * An encoded-word may not exceed 75 characters, so long values become several
 * words separated by whitespace (a decoder drops the whitespace between
 * adjacent words and reassembles the original). The `=?UTF-8?B?` + `?=`
 * wrapper costs 12 characters, leaving 63 for base64, i.e. 45 raw bytes — and
 * chunking is done by code point so a multi-byte character is never split
 * across two words.
 */
const MAX_RAW_BYTES_PER_WORD = 45;

function encodeHeaderWord(value: string): string {
  if (!needsEncoding(value)) return value;

  const words: string[] = [];
  let chunk: number[] = [];
  for (const char of value) {
    const bytes = [...Buffer.from(char, "utf-8")];
    if (chunk.length + bytes.length > MAX_RAW_BYTES_PER_WORD) {
      words.push(Buffer.from(chunk).toString("base64"));
      chunk = [];
    }
    chunk.push(...bytes);
  }
  if (chunk.length > 0) words.push(Buffer.from(chunk).toString("base64"));

  return words.map((word) => `=?UTF-8?B?${word}?=`).join(" ");
}

/**
 * Fold a header onto continuation lines. RFC 5322 caps a line at 998 octets
 * and recommends 78; folding inserts CRLF + space at existing whitespace,
 * which the receiver unfolds back to the original value. Anything that cannot
 * be folded has already been turned into encoded-words upstream.
 */
const FOLD_WIDTH = 76;

function foldHeader(name: string, value: string): string {
  const lines: string[] = [];
  let line = `${name}:`;
  for (const token of value.split(/\s+/).filter(Boolean)) {
    if (line !== `${name}:` && line.length + 1 + token.length > FOLD_WIDTH) {
      lines.push(line);
      line = "";
    }
    line += ` ${token}`;
  }
  lines.push(line);
  return lines.join("\r\n");
}

/** `"Display Name" <addr@example.com>`, safe for arbitrary lead names. */
function formatAddress(name: string, email: string): string {
  const cleanEmail = sanitizeHeader(email);
  const cleanName = sanitizeHeader(name);
  if (!cleanName) return cleanEmail;
  // An encoded-word must not sit inside a quoted string, so it is either
  // quoted or encoded, never both.
  const display = needsEncoding(cleanName)
    ? encodeHeaderWord(cleanName)
    : `"${cleanName.replace(/["\\]/g, "")}"`;
  return `${display} <${cleanEmail}>`;
}

function base64Url(input: string): string {
  return Buffer.from(input, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Body parts are base64 rather than 7bit. The copy contains an em dash, and
 * leads type non-ASCII characters constantly; declaring utf-8 while sending
 * 7bit is what produces garbled text in some clients.
 */
function base64Body(value: string): string {
  return Buffer.from(value, "utf-8")
    .toString("base64")
    .replace(/(.{76})/g, "$1\r\n");
}

type ContactBody = ReturnType<typeof SubmitContactBody.parse>;

/* -------------------------------------------------------------------------
   Shared presentation
   ------------------------------------------------------------------------- */

function row(label: string, value: string): string {
  return value
    ? `<tr><td style="padding:6px 16px 6px 0;color:#6b5d4f;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(
        label,
      )}</td><td style="padding:6px 0;color:#2b2018;font-size:14px">${escapeHtml(value)}</td></tr>`
    : "";
}

function detailRows(data: ContactBody): string {
  return `${row("Name", data.name)}${row("Email", data.email)}${row("Phone", data.phone)}`;
}

function messageBlock(data: ContactBody): string {
  const messageHtml = escapeHtml(data.message).replace(/\n/g, "<br>");
  return `<div style="margin-top:18px">
          <div style="color:#6b5d4f;font-size:13px;margin-bottom:6px">Message</div>
          <div style="color:#2b2018;font-size:14px;line-height:1.6;background:#f6f2ec;border-radius:10px;padding:14px 16px">${
            messageHtml || "<em>(no message)</em>"
          }</div>
        </div>`;
}

/** The card shell both emails share, so they stay visually identical. */
function shell(headline: string, inner: string, footer: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f6f2ec;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <div style="background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e7ded2">
      <div style="background:#2b2018;color:#fff;padding:20px 24px">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.7">${escapeHtml(
          BUSINESS_NAME,
        )}</div>
        <div style="font-size:20px;font-weight:600;margin-top:4px">${escapeHtml(headline)}</div>
      </div>
      <div style="padding:20px 24px">${inner}</div>
    </div>
    <div style="color:#9a8c7c;font-size:11px;text-align:center;margin-top:14px">${escapeHtml(footer)}</div>
  </div>
</body></html>`;
}

/* -------------------------------------------------------------------------
   1. Customer acknowledgment — mirrors the form's own thank-you step.
      Nothing internal here: the team replies on this thread, so anything in
      it is something the customer will read.
   ------------------------------------------------------------------------- */

const ACK_LEAD_IN =
  "We're grateful for the opportunity and will reach out as soon as possible, typically within one business day.";
const ACK_SIGNOFF = `Thanks again for choosing ${BUSINESS_NAME}. We look forward to speaking with you soon.`;

function buildAckHtml(data: ContactBody): string {
  const inner = `<p style="margin:0;color:#2b2018;font-size:15px;line-height:1.7">${escapeHtml(
    ACK_LEAD_IN,
  )}</p>
        <p style="margin:12px 0 0;color:#2b2018;font-size:15px;line-height:1.7">If this is urgent, call <a href="${PHONE_HREF}" style="color:#3b617f;text-decoration:none">${escapeHtml(
          PHONE_DISPLAY,
        )}</a>.</p>
        <div style="margin-top:20px;border-top:1px solid #e7ded2;padding-top:16px">
          <div style="color:#6b5d4f;font-size:13px;margin-bottom:8px">What you sent us</div>
          <table style="width:100%;border-collapse:collapse">${detailRows(data)}</table>
          ${messageBlock(data)}
        </div>`;
  return shell("Thank you — we're on it!", inner, ACK_SIGNOFF);
}

function buildAckText(data: ContactBody): string {
  return [
    "Thank you — we're on it!",
    "",
    ACK_LEAD_IN,
    `If this is urgent, call ${PHONE_DISPLAY}.`,
    "",
    "What you sent us:",
    `  Name: ${data.name}`,
    `  Email: ${data.email}`,
    `  Phone: ${data.phone || "(none)"}`,
    "",
    "  Message:",
    `  ${data.message || "(no message)"}`,
    "",
    ACK_SIGNOFF,
  ].join("\n");
}

/* -------------------------------------------------------------------------
   2. Attribution report — marketing only. Never sent to the lead, and its
      Reply-To deliberately does not point at one.
   ------------------------------------------------------------------------- */

function buildAttributionHtml(data: ContactBody): string {
  const t = data.tracking;
  const inner = `<table style="width:100%;border-collapse:collapse">${detailRows(data)}</table>
        ${messageBlock(data)}
        <div style="margin-top:18px;border-top:1px solid #e7ded2;padding-top:14px">
          <div style="color:#6b5d4f;font-size:13px;margin-bottom:6px">Attribution</div>
          <table style="width:100%;border-collapse:collapse">
            ${row("Source", t.source)}
            ${row("Medium", t.medium)}
            ${row("Campaign", t.utm_campaign)}
            ${row("UTM source", t.utm_source)}
            ${row("UTM medium", t.utm_medium)}
            ${row("Google Click ID", t.gclid)}
            ${row("Referrer", t.referrer)}
            ${row("Landing page", t.landing_page)}
            ${row("Submitted from", t.trigger_url)}
          </table>
        </div>`;
  return shell(
    "New website lead",
    inner,
    `Sent automatically by the ${BUSINESS_NAME} website contact form.`,
  );
}

function buildAttributionText(data: ContactBody): string {
  const t = data.tracking;
  return [
    `New website lead — ${BUSINESS_NAME}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "(none)"}`,
    "",
    "Message:",
    data.message || "(no message)",
    "",
    "Attribution:",
    `  Source: ${t.source || "(none)"}`,
    `  Medium: ${t.medium || "(none)"}`,
    `  Campaign: ${t.utm_campaign || "(none)"}`,
    `  UTM source: ${t.utm_source || "(none)"}`,
    `  UTM medium: ${t.utm_medium || "(none)"}`,
    `  Google Click ID: ${t.gclid || "(none)"}`,
    `  Referrer: ${t.referrer || "(none)"}`,
    `  Landing page: ${t.landing_page || "(none)"}`,
    `  Submitted from: ${t.trigger_url || "(none)"}`,
  ].join("\n");
}

/* -------------------------------------------------------------------------
   Delivery
   ------------------------------------------------------------------------- */

interface MailOptions {
  to: string[];
  cc?: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

function buildRawMessage(o: MailOptions): string {
  const boundary = `jh_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const headers = [
    foldHeader("To", o.to.join(", ")),
    ...(o.cc && o.cc.length ? [foldHeader("Cc", o.cc.join(", "))] : []),
    ...(o.replyTo ? [foldHeader("Reply-To", sanitizeHeader(o.replyTo))] : []),
    foldHeader("Subject", encodeHeaderWord(sanitizeHeader(o.subject))),
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n");

  const body = [
    `--${boundary}`,
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64Body(o.text),
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64Body(o.html),
    "",
    `--${boundary}--`,
  ].join("\r\n");

  return `${headers}\r\n\r\n${body}`;
}

async function sendMail(raw: string): Promise<void> {
  const response = await connectors.proxy(
    "google-mail",
    "/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw: base64Url(raw) }),
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Gmail responded ${response.status}: ${detail.slice(0, 300)}`);
  }
}

router.post("/contact", async (req: Request, res: Response): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid submission." });
    return;
  }
  const data = parsed.data;
  const t = data.tracking;

  // Persist before sending. This row is the only durable copy of the
  // attribution now that the team's email no longer carries it, so it must not
  // depend on either send succeeding.
  let stored = false;
  try {
    await db.insert(leads).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      source: t.source,
      medium: t.medium,
      utmSource: t.utm_source,
      utmMedium: t.utm_medium,
      utmCampaign: t.utm_campaign,
      gclid: t.gclid,
      referrer: t.referrer,
      landingPage: t.landing_page,
      triggerUrl: t.trigger_url,
    });
    stored = true;
  } catch (err) {
    req.log.error({ err }, "Failed to store lead");
  }

  const teamInbox = getTeamInbox();
  const attributionTo = getAttributionTo();

  const ack = buildRawMessage({
    to: [formatAddress(data.name, data.email)],
    // The team is CC'd rather than sent a separate copy, so replying here
    // reaches the customer on a thread that is already customer-safe.
    cc: teamInbox,
    subject: `Thank you for contacting ${BUSINESS_NAME}`,
    text: buildAckText(data),
    html: buildAckHtml(data),
  });

  const attribution = buildRawMessage({
    to: attributionTo,
    // Pointedly not the lead. This message carries the attribution block, so
    // there must be no path by which a reply to it reaches the customer.
    replyTo: teamInbox.join(", "),
    subject: `New website lead: ${data.name}`,
    text: buildAttributionText(data),
    html: buildAttributionHtml(data),
  });

  const [ackResult, attrResult] = await Promise.allSettled([
    sendMail(ack),
    sendMail(attribution),
  ]);

  const ackOk = ackResult.status === "fulfilled";
  const attrOk = attrResult.status === "fulfilled";
  if (!ackOk) {
    req.log.error({ err: (ackResult as PromiseRejectedResult).reason }, "Lead acknowledgment failed");
  }
  if (!attrOk) {
    req.log.error({ err: (attrResult as PromiseRejectedResult).reason }, "Lead attribution email failed");
  }

  // Only a total loss is an error: if the row landed, the lead is recoverable
  // even when Gmail is down, and telling the visitor their message failed
  // would just make them submit again.
  if (!stored && !ackOk && !attrOk) {
    res.status(502).json({ error: "Could not deliver the message." });
    return;
  }

  req.log.info({ stored, ackOk, attrOk, teamInbox, attributionTo }, "Contact form lead processed");
  res.json(SubmitContactResponse.parse({ success: true }));
});

export default router;
