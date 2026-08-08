---
name: Lead notification email split
description: Why the contact form sends two separate emails, why attribution must never appear in the team's reply thread, and where attribution actually lives now.
---

# Lead notification email split

One contact submission produces one database row and **two** emails, and the
separation is load-bearing — do not "simplify" it back into one.

1. **Customer acknowledgment** — To the lead, Cc the team inbox. Contains the
   lead's own details and message, and nothing else. No `Reply-To` override, so
   the sending mailbox governs.
2. **Attribution report** — To marketing only. Carries the full tracking
   breakdown. Its `Reply-To` is the team inbox, deliberately never the lead.

**Why:** the original design was a single email to the team with the attribution
block in the body and `Reply-To` set to the lead. When the team replied, Gmail
quoted the entire original message into the reply, so the customer received the
internal ad-source data. The fix is structural: the thread the team replies on
simply has no attribution in it, so there is nothing to leak no matter how a
mail client quotes.

**How to apply:** any change to lead notification content must preserve the
invariant *"the message the team replies to contains nothing internal."* Before
adding a field to the acknowledgment, ask whether it is safe for the customer to
read in a quoted reply. Internal-only data belongs in the attribution email or
the database, never the acknowledgment. The same applies to a `Reply-To` that
points at a customer: never set one on a message carrying internal data.

## Attribution is now database-first

Because the team's copy carries no attribution, the `leads` table is the durable
record of where a lead came from — the email is a convenience, not the source of
truth. Reporting ("how many leads from this campaign") must query the table.

Note that the deployed site writes to the **production** database, which is
separate from development. Read it with a read-only production query; the
production schema itself is applied by Replit's Publish flow, so a newly added
column or table does not exist in production until the user publishes.

## Gmail raw-message construction

Sending through the Gmail API means hand-building an RFC 822 message, and two
things there are easy to get wrong and invisible until a real lead trips them:

- **Body parts must be base64, not 7bit.** The copy contains an em dash and
  leads routinely type non-ASCII. Declaring `charset=utf-8` while sending 7bit
  is what produces garbled text in some clients.
- **Headers need RFC 2047 encoded-words *and* folding.** A single encoded-word
  may not exceed 75 characters, so a long non-ASCII name has to be split into
  several words on UTF-8 character boundaries. A long *ASCII* run with no
  whitespace is equally a problem, because folding can only break at
  whitespace — so length, not just non-ASCII, is what forces encoding.
