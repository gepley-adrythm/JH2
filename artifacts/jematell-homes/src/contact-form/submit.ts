import type { TrackingData } from "./analytics";

export interface SubmitResult {
  success: boolean;
  error?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
  referralSource: string;
  textOptIn: boolean;
  tracking: TrackingData;
}

export async function submitContactForm(data: ContactSubmission): Promise<SubmitResult> {
  // TODO: Connect real delivery here (email, CRM, or POST to the api-server
  // /api/contact route). The form is wired end-to-end, but submissions are not
  // delivered anywhere yet.
  if (import.meta.env.DEV) {
    console.log("[Jematell ContactForm] Lead captured (delivery not yet connected):", data);
  }
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { success: true };
}
