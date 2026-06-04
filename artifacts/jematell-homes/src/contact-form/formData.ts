export const statusChips = [
  { value: "prospective homeowner", label: "Planning a New Home" },
  { value: "existing client", label: "Current Client" },
];

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

export const existingActionChips = [
  { value: "check on my project status", label: "Check Project Status" },
  { value: "discuss a change to my build", label: "Discuss a Change" },
  { value: "ask about my warranty", label: "Warranty Question" },
  { value: "discuss something else", label: "Something Else" },
];

export const existingTopicChips = [
  { value: "my floor plan or layout", label: "Floor Plan / Layout" },
  { value: "finishes or selections", label: "Finishes / Selections" },
  { value: "my timeline or schedule", label: "Timeline / Schedule" },
  { value: "budget or pricing", label: "Budget / Pricing" },
  { value: "other", label: "Other" },
];

export const referralOptions = [
  { value: "Google Search", label: "Google Search" },
  { value: "Social Media", label: "Social Media (Instagram / Facebook)" },
  { value: "Friend or Family Referral", label: "Friend or Family Referral" },
  { value: "Drove By a Home", label: "Saw One of Your Homes" },
  { value: "Real Estate Agent", label: "Real Estate Agent" },
  { value: "Other", label: "Other" },
];

export const actionDetailConfigs: Record<string, { label: string; placeholder: string }> = {
  "check on my project status": {
    label: "Which project or address?",
    placeholder: "e.g. our home at 123 Desert View Dr...",
  },
  "ask about my warranty": {
    label: "What is your warranty question?",
    placeholder: "e.g. an item from our walkthrough, a service request...",
  },
  "discuss something else": {
    label: "What can we help you with?",
    placeholder: "Tell us what you need...",
  },
};

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

export function getArticle(word: string): string {
  if (!word) return "a";
  return /^[aeiou]/i.test(word.trim()) ? "an" : "a";
}
