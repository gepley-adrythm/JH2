import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ACK_LEAD_IN, ACK_LEAD_IN_DEFAULT, ackLeadIn } from "./contact-ack-copy.js";

/**
 * The acknowledgment copy is keyed on the chip *values* from the web
 * artifact's contact form. The api-server cannot import that artifact, so the
 * contract between them is only enforced if something reads the chips and
 * checks them — otherwise a renamed chip silently downgrades every affected
 * customer to the blander fallback, with no error anywhere.
 *
 * These tests read formData.ts from disk for exactly that reason.
 */
const FORM_DATA_PATH = fileURLToPath(
  new URL(
    "../../../jematell-homes/src/contact-form/formData.ts",
    import.meta.url,
  ),
);

function chipValues(exportName: string): string[] {
  const source = readFileSync(FORM_DATA_PATH, "utf-8");
  const block = new RegExp(`export const ${exportName} = \\[([\\s\\S]*?)\\];`).exec(source);
  assert.ok(block, `could not find "${exportName}" in ${FORM_DATA_PATH}`);
  const values = [...block[1].matchAll(/value:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.ok(values.length > 0, `no chip values parsed from "${exportName}"`);
  return values;
}

test("every action/topic chip pair has its own tailored opening line", () => {
  for (const action of chipValues("actionChips")) {
    const byTopic = ACK_LEAD_IN[action];
    assert.ok(byTopic, `no acknowledgment copy for action chip "${action}"`);
    for (const topic of chipValues("topicChips")) {
      const copy = byTopic[topic];
      assert.ok(copy, `no acknowledgment copy for "${action}" + "${topic}"`);
      assert.equal(ackLeadIn({ action, topic }), copy);
      // Voice: "our team", never a named person.
      assert.match(copy, /our team/i);
      assert.doesNotMatch(copy, /\bI\b|\bmy\b/);
    }
  }
});

test("copy has no entries for chips that no longer exist", () => {
  const actions = new Set(chipValues("actionChips"));
  const topics = new Set(chipValues("topicChips"));
  for (const [action, byTopic] of Object.entries(ACK_LEAD_IN)) {
    assert.ok(actions.has(action), `copy keyed on unknown action chip "${action}"`);
    for (const topic of Object.keys(byTopic)) {
      assert.ok(topics.has(topic), `copy keyed on unknown topic chip "${topic}"`);
    }
  }
});

test("a free-typed message, or an unrecognized selection, gets the default", () => {
  assert.equal(ackLeadIn(undefined), ACK_LEAD_IN_DEFAULT);
  assert.equal(ackLeadIn({ action: "", topic: "" }), ACK_LEAD_IN_DEFAULT);
  assert.equal(ackLeadIn({ action: "buy a boat", topic: "floor plans" }), ACK_LEAD_IN_DEFAULT);
});

test("an unrecognized topic reads as the 'other' copy for that action", () => {
  assert.equal(
    ackLeadIn({ action: "ask a question", topic: "solar panels" }),
    ACK_LEAD_IN["ask a question"]["other"],
  );
});
