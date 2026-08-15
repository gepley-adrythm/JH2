import test from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server, type IncomingMessage, type ServerResponse } from "node:http";
import { postLeadToAdRhythm } from "./adrythm.js";

/**
 * The AdRhythm contract is owned by another team and enforced nowhere else:
 * their field matching keys off exact names (`page_url`, `gclid`, ...), and a
 * submission with neither email nor phone is rejected outright. Nothing in the
 * type system catches a rename here, so these tests read the bytes actually put
 * on the wire.
 */

interface Captured {
  body: string;
  contentType: string | undefined;
  method: string | undefined;
}

/** A stand-in for AdRhythm that records what it received. */
async function withServer(
  handler: (req: IncomingMessage, res: ServerResponse, hits: number) => void,
  run: (url: string, captured: Captured[]) => Promise<void>,
): Promise<void> {
  const captured: Captured[] = [];
  let hits = 0;
  const server: Server = createServer((req, res) => {
    hits += 1;
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      captured.push({ body, contentType: req.headers["content-type"], method: req.method });
      handler(req, res, hits);
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  try {
    await run(`http://127.0.0.1:${port}/hook`, captured);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

const ok = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("{}");
};

const FULL_LEAD = {
  name: "Dana Reyes",
  email: "dana@example.com",
  phone: "(480) 555-0134",
  message: "Looking to build on a lot in Cave Creek.",
  page_url: "https://jematellhomes.com/blog/lot-selection",
  gclid: "Cj0KCQ-test",
  msclkid: "",
  fbclid: "",
  source: "google",
  medium: "cpc",
  utm_campaign: "spring-build",
  landing_page: "https://jematellhomes.com/?gclid=Cj0KCQ-test",
  request_action: "schedule a consultation",
};

test("posts the lead as JSON using AdRhythm's field names", async () => {
  await withServer(ok, async (url, captured) => {
    process.env.ADRYTHM_WEBHOOK_URL = url;
    const outcome = await postLeadToAdRhythm(FULL_LEAD);

    assert.equal(outcome, "sent");
    assert.equal(captured.length, 1);
    assert.equal(captured[0].method, "POST");
    assert.match(captured[0].contentType ?? "", /application\/json/);

    const sent = JSON.parse(captured[0].body);
    assert.equal(sent.email, "dana@example.com");
    assert.equal(sent.phone, "(480) 555-0134");
    assert.equal(sent.name, "Dana Reyes");
    assert.equal(sent.message, "Looking to build on a lot in Cave Creek.");
    // The three the briefing calls out by name.
    assert.equal(sent.page_url, "https://jematellhomes.com/blog/lot-selection");
    assert.equal(sent.gclid, "Cj0KCQ-test");
    assert.equal(sent.source, "google");
    assert.equal(sent.request_action, "schedule a consultation");
  });
});

test("omits blank fields rather than sending empty strings", async () => {
  await withServer(ok, async (url, captured) => {
    process.env.ADRYTHM_WEBHOOK_URL = url;
    await postLeadToAdRhythm(FULL_LEAD);

    const sent = JSON.parse(captured[0].body);
    // Not captured for this visitor — must be absent, not "" (which reads as
    // a real value on their side).
    assert.ok(!("msclkid" in sent), "blank msclkid should be omitted");
    assert.ok(!("fbclid" in sent), "blank fbclid should be omitted");
  });
});

test("forwards a phone-only lead (email is not required)", async () => {
  await withServer(ok, async (url, captured) => {
    process.env.ADRYTHM_WEBHOOK_URL = url;
    const outcome = await postLeadToAdRhythm({ name: "No Email", phone: "4805550134" });
    assert.equal(outcome, "sent");
    assert.equal(JSON.parse(captured[0].body).phone, "4805550134");
  });
});

test("skips a lead with neither email nor phone instead of posting it", async () => {
  await withServer(ok, async (url, captured) => {
    process.env.ADRYTHM_WEBHOOK_URL = url;
    const outcome = await postLeadToAdRhythm({ name: "Anon", message: "hello" });
    assert.equal(outcome, "skipped");
    assert.equal(captured.length, 0, "should not reach the network at all");
  });
});

test("skips silently when the webhook is not configured", async () => {
  delete process.env.ADRYTHM_WEBHOOK_URL;
  assert.equal(await postLeadToAdRhythm(FULL_LEAD), "skipped");
});

test("retries a 500 and succeeds on the second attempt", async () => {
  await withServer(
    (_req, res, hits) => {
      if (hits === 1) {
        res.writeHead(500);
        res.end("boom");
        return;
      }
      ok(_req, res);
    },
    async (url, captured) => {
      process.env.ADRYTHM_WEBHOOK_URL = url;
      const outcome = await postLeadToAdRhythm(FULL_LEAD);
      assert.equal(outcome, "sent");
      assert.equal(captured.length, 2);
    },
  );
});

test("does not retry a 4xx — the same body would fail identically", async () => {
  await withServer(
    (_req, res) => {
      res.writeHead(422);
      res.end("unprocessable");
    },
    async (url, captured) => {
      process.env.ADRYTHM_WEBHOOK_URL = url;
      const outcome = await postLeadToAdRhythm(FULL_LEAD);
      assert.equal(outcome, "failed");
      assert.equal(captured.length, 1, "a 4xx must not be retried");
    },
  );
});

test("reports failure without throwing when the endpoint is unreachable", async () => {
  // Nothing is listening here, so both attempts fail at the socket.
  process.env.ADRYTHM_WEBHOOK_URL = "http://127.0.0.1:1/hook";
  const outcome = await postLeadToAdRhythm(FULL_LEAD);
  assert.equal(outcome, "failed", "must resolve, never reject");
});
