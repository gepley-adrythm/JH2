export const statusChips = [
  { value: 'new client', label: 'New Client' },
  { value: 'existing client', label: 'Existing Client' },
];

export const actionChips = [
  { value: 'schedule a consultation', label: 'Schedule a Consultation' },
  { value: 'ask a question', label: 'Ask a Question' },
];

export const topicChips = [
  { value: 'estate planning, wills & trusts', label: 'Estate Planning & Wills/Trusts' },
  { value: 'retirement planning', label: 'Retirement Planning' },
  { value: 'life insurance', label: 'Life Insurance' },
  { value: 'other', label: 'Other' },
];

export const existingActionChips = [
  { value: 'review or update my plan', label: 'Review or Update My Plan' },
  { value: 'report a life change', label: 'Report a Life Change' },
  { value: 'request copies of my documents', label: 'Request My Documents' },
  { value: 'discuss investments or finances', label: 'Discuss Investments' },
  { value: 'discuss something else', label: 'Something Else' },
];

export const existingTopicChips = [
  { value: 'my trust or will', label: 'Trust or Will' },
  { value: 'beneficiaries or family changes', label: 'Beneficiaries or Family' },
  { value: 'property or assets', label: 'Property or Assets' },
  { value: 'powers of attorney or executor role', label: 'POA or Executor Role' },
  { value: 'other', label: 'Other' },
];

export const referralOptions = [
  { value: 'Radio', label: 'Radio' },
  { value: 'Facebook / Social Media', label: 'Facebook / Social Media' },
  { value: 'Friend or Family Referral', label: 'Friend or Family Referral' },
  { value: 'Direct Mail', label: 'Direct Mail' },
  { value: 'Google', label: 'Google' },
  { value: 'TV', label: 'TV' },
  { value: 'Other', label: 'Other' },
];

export function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits[0] === '1') digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return '(' + digits;
  if (digits.length <= 6) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
  return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
}

export function validEmail(value: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
}

export function getArticle(word: string): string {
  if (!word) return 'a';
  return /^[aeiou]/i.test(word.trim()) ? 'an' : 'a';
}
