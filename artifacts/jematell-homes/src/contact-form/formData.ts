export const actionChips = [
  { value: "schedule a consultation", label: "Schedule a Consultation" },
  { value: "ask a question", label: "Ask a Question" },
];

export const topicChips = [
  { value: "building a custom home", label: "Building a Custom Home" },
  { value: "building on my own lot", label: "Building on My Lot" },
  { value: "one of your available homes", label: "An Available Home" },
  { value: "floor plans", label: "Floor Plans" },
  { value: "other", label: "Other" },
];

export function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits[0] === "1") digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return "(" + digits;
  if (digits.length <= 6) return "(" + digits.slice(0, 3) + ") " + digits.slice(3);
  return "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
}

export function validEmail(value: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
}
