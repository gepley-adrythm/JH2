/**
 * EXAMPLE Next.js App Router route handler for the seminar registration form.
 * Copy to app/api/event/route.ts and adapt.
 *
 * The body is an EventSubmission (see lib/formSubmit.ts).
 */

import { NextResponse } from 'next/server';
import type { EventSubmission } from '../lib/formSubmit';

export async function POST(req: Request) {
  const data = (await req.json()) as EventSubmission;

  if (!data.name || !data.email || !data.phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // TODO: send an email, write to your DB, post to your CRM, etc.
  console.log('New seminar registration:', data);

  return NextResponse.json({ success: true });
}
