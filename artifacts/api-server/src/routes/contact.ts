import { Router, type IRouter, type Request, type Response } from "express";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
// Gmail integration (connection: google-mail). Sends lead notifications via the
// Replit Connectors proxy, which injects OAuth2 tokens automatically.
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();

const connectors = new ReplitConnectors();

// Recipients of new-lead notifications. Configurable via env (comma-separated);
// defaults to the two business inboxes requested by the client.
const DEFAULT_RECIPIENTS = ["gepley@adrythm.com", "info@jematellhomes.com"];

function getRecipients(): string[] {
  const raw = process.env.CONTACT_NOTIFY_TO;
  if (!raw) return DEFAULT_RECIPIENTS;
  const parsed = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : DEFAULT_RECIPIENTS;
}

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

function base64Url(input: string): string {
  return Buffer.from(input, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

type ContactBody = ReturnType<typeof SubmitContactBody.parse>;

function buildHtml(data: ContactBody): string {
  const t = data.tracking;
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 16px 6px 0;color:#6b5d4f;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(
          label,
        )}</td><td style="padding:6px 0;color:#2b2018;font-size:14px">${escapeHtml(value)}</td></tr>`
      : "";

  const messageHtml = escapeHtml(data.message).replace(/\n/g, "<br>");

  return `<!doctype html><html><body style="margin:0;background:#f6f2ec;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <div style="background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e7ded2">
      <div style="background:#2b2018;color:#fff;padding:20px 24px">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.7">Jematell Homes</div>
        <div style="font-size:20px;font-weight:600;margin-top:4px">New website lead</div>
      </div>
      <div style="padding:20px 24px">
        <table style="width:100%;border-collapse:collapse">
          ${row("Name", data.name)}
          ${row("Email", data.email)}
          ${row("Phone", data.phone)}
        </table>
        <div style="margin-top:18px">
          <div style="color:#6b5d4f;font-size:13px;margin-bottom:6px">Message</div>
          <div style="color:#2b2018;font-size:14px;line-height:1.6;background:#f6f2ec;border-radius:10px;padding:14px 16px">${
            messageHtml || "<em>(no message)</em>"
          }</div>
        </div>
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
        </div>
      </div>
    </div>
    <div style="color:#9a8c7c;font-size:11px;text-align:center;margin-top:14px">Sent automatically by the Jematell Homes website contact form.</div>
  </div>
</body></html>`;
}

function buildText(data: ContactBody): string {
  const t = data.tracking;
  const lines = [
    "New website lead — Jematell Homes",
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
  ];
  return lines.join("\n");
}

function buildRawMessage(data: ContactBody, recipients: string[]): string {
  const subject = sanitizeHeader(`New website lead: ${data.name}`);
  const boundary = `jh_${Date.now().toString(36)}`;
  const headers = [
    `To: ${recipients.join(", ")}`,
    `Reply-To: ${sanitizeHeader(data.name)} <${sanitizeHeader(data.email)}>`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n");

  const body = [
    `--${boundary}`,
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    buildText(data),
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=utf-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    buildHtml(data),
    "",
    `--${boundary}--`,
  ].join("\r\n");

  return `${headers}\r\n\r\n${body}`;
}

router.post("/contact", async (req: Request, res: Response): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid submission." });
    return;
  }
  const data = parsed.data;
  const recipients = getRecipients();

  try {
    const raw = base64Url(buildRawMessage(data, recipients));
    const response = await connectors.proxy(
      "google-mail",
      "/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw }),
      },
    );

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      req.log.error(
        { status: response.status, detail: detail.slice(0, 500) },
        "Gmail send failed for contact form",
      );
      res.status(502).json({ error: "Could not deliver the message." });
      return;
    }

    req.log.info({ recipients }, "Contact form lead emailed");
    res.json(SubmitContactResponse.parse({ success: true }));
  } catch (err) {
    req.log.error({ err }, "Contact form delivery error");
    res.status(502).json({ error: "Could not deliver the message." });
  }
});

export default router;
