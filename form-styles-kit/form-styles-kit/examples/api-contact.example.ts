/**
 * EXAMPLE Next.js App Router route handler for the contact form.
 * Copy to app/api/contact/route.ts and adapt.
 *
 * The body is a ContactSubmission (see lib/formSubmit.ts). Here we just log it;
 * replace the body with your real delivery (email, CRM, database, webhook).
 */

import { NextResponse } from 'next/server';
import type { ContactSubmission } from '../lib/formSubmit';

export async function POST(req: Request) {
  const data = (await req.json()) as ContactSubmission;

  // --- Minimal validation -------------------------------------------------
  if (!data.name || !data.email || !data.phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // --- Deliver the lead ---------------------------------------------------
  // TODO: send an email, write to your DB, post to your CRM, etc.
  console.log('New contact submission:', data);

  return NextResponse.json({ success: true });
}
