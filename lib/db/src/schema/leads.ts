import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

/**
 * Contact form submissions, with the marketing attribution captured alongside
 * them.
 *
 * This exists because attribution used to live only inside a notification
 * email. That made it unreportable — you could read a single lead's source,
 * but never count sources over a month, and the data disappeared with the
 * inbox. The notification emails are now deliberately split so the team's
 * reply thread carries no attribution at all, which makes this table the only
 * durable record of where a lead came from.
 *
 * Attribution columns default to "" rather than null: the tracking payload
 * always sends every key, using an empty string for "not present", and
 * matching that avoids a null/empty-string split in later queries.
 */
export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),

    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull().default(""),
    message: text("message").notNull().default(""),

    // Resolved source/medium: the UTM when present, otherwise derived from the
    // referrer. These are the two the ad reporting actually keys on.
    source: text("source").notNull().default(""),
    medium: text("medium").notNull().default(""),

    // Raw campaign parameters, kept separately from the resolved pair above so
    // a bad derivation can be re-done later from the originals.
    utmSource: text("utm_source").notNull().default(""),
    utmMedium: text("utm_medium").notNull().default(""),
    utmCampaign: text("utm_campaign").notNull().default(""),
    gclid: text("gclid").notNull().default(""),

    referrer: text("referrer").notNull().default(""),
    // Where they entered the site (first touch), vs. where they submitted from.
    landingPage: text("landing_page").notNull().default(""),
    triggerUrl: text("trigger_url").notNull().default(""),

    // What the form's sentence builder produced, when it was used. Empty for a
    // free-typed message. Stored as its own columns rather than left inside the
    // message prose so "what are people asking about" is a GROUP BY rather than
    // a text search.
    requestAction: text("request_action").notNull().default(""),
    requestTopic: text("request_topic").notNull().default(""),
    // Free text captured when the topic chip was "other" — this is where demand
    // for a topic that is not yet on the list shows up.
    requestOtherTopic: text("request_other_topic").notNull().default(""),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // Reporting is almost always "leads in a date range, grouped by source".
    index("leads_created_at_idx").on(t.createdAt),
    index("leads_source_idx").on(t.source),
    index("leads_topic_idx").on(t.requestTopic),
    index("leads_email_idx").on(t.email),
  ],
);

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
