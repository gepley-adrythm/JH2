/**
 * Acknowledgment copy for the contact form.
 *
 * Kept apart from the sending logic in contact.ts so the wording can be read,
 * reviewed, and exercised on its own — it is the part most likely to be edited
 * by someone who has no interest in MIME encoding.
 */

/**
 * The parts of a submission's sentence-builder selection that affect wording.
 * Declared structurally rather than imported from the generated request type,
 * so copy does not depend on the transport schema.
 */
export interface AckSelection {
  action: string;
  topic: string;
}

/**
 * Used when the visitor typed their own message, so there is no selection to
 * respond to, and as the backstop whenever a chip value is not recognised.
 */
export const ACK_LEAD_IN_DEFAULT =
  "We're grateful for the opportunity. As a family-owned builder, we read every message ourselves, and a member of our team will reach out personally, typically within one business day.";

/**
 * The opening line of the acknowledgment, chosen from what the visitor picked
 * in the form's sentence builder.
 *
 * Keyed on the chip *values* from the web artifact's contact-form/formData.ts.
 * Those values are the contract between the two. If a chip value changes there
 * without changing this map, the lookup falls back to blander copy rather than
 * failing — deliberate, but it does mean a stale key is invisible at runtime.
 *
 * Every branch says "our team" and never names an individual, so the copy stays
 * true no matter who actually picks the lead up.
 */
export const ACK_LEAD_IN: Record<string, Record<string, string>> = {
  "schedule a consultation": {
    "building a custom home":
      "Our team will be in touch within one business day to set up your consultation. We'll use that first conversation to understand the home you have in mind and walk you through how our build process works.",
    "building on my own lot":
      "Our team will be in touch within one business day to set up your consultation. If you have a parcel number or an address for your lot, having it handy will help us talk through site conditions, utilities, and what the land can support.",
    "one of your available homes":
      "Our team will be in touch within one business day to set up your consultation, and can tell you which homes are available, where each one stands, and how soon it could be yours.",
    "floor plans":
      "Our team will be in touch within one business day to set up your consultation, and can walk you through the plans that fit what you're after and how far each one can be tailored.",
    other:
      "Our team will be in touch within one business day to set up your consultation, and we'll come prepared to talk through what you've described.",
  },
  "ask a question": {
    "building a custom home":
      "Our team will get back to you within one business day with an answer about building your custom home.",
    "building on my own lot":
      "Our team will get back to you within one business day, including anything specific to your lot we'd want to look at first.",
    "one of your available homes":
      "Our team will get back to you within one business day with an answer about our available homes.",
    "floor plans":
      "Our team will get back to you within one business day with an answer about our floor plans.",
    other: "Our team will get back to you within one business day.",
  },
};

/** Pick the acknowledgment's opening line for a submission. */
export function ackLeadIn(selection: AckSelection | undefined): string {
  if (!selection) return ACK_LEAD_IN_DEFAULT;
  const byTopic = ACK_LEAD_IN[selection.action];
  if (!byTopic) return ACK_LEAD_IN_DEFAULT;
  // An unrecognised topic lands on the same copy as an explicitly "other"
  // topic, which reads correctly either way.
  return byTopic[selection.topic] ?? byTopic["other"] ?? ACK_LEAD_IN_DEFAULT;
}
