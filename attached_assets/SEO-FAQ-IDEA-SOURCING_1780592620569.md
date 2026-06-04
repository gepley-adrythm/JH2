# SEO FAQ Idea Sourcing (No GSC, No Semrush)

A universal, copy-paste-ready playbook for finding FAQ topics worth writing — **without** Google Search Console, Semrush, Ahrefs, or any paid keyword tool.

Pairs with `SEO-FAQ-QUALITY-STANDARDS.md`. This file answers "**what should we write?**" That file answers "**how do we write it well?**" Every idea sourced here must still pass the quality gate there before it ships.

Replace bracketed placeholders like `[YOUR TOPIC]`, `[YOUR REGION]`, and `[COMPETITOR]` with your own.

---

## The Mindset

You do not need rank data to find great FAQ topics. Real questions are sitting in plain sight: in search engines themselves, in your own inbox, in competitor pages, and in the communities where your audience already talks. The job is to **harvest real questions**, dedupe them against what you already cover, and prioritize by intent.

An FAQ earns its place when a real person, in real words, has actually asked it.

---

## Source 1: Search Engine Surfaces (free, highest signal)

These are pulled live from real searcher behavior. No login, no tools.

- **Google autocomplete.** Type "[YOUR TOPIC]" and pause. Then try prefixes one at a time: `how`, `what`, `why`, `can I`, `do I need`, `should I`, `when`, `is it`, `how much`, `how long`, `what happens if`. Each prefix surfaces a different question set.
- **People Also Ask (PAA).** Search any seed question. Expand a PAA box — it regenerates and reveals more. Each expansion is a real, related question. Capture the wording verbatim.
- **Related searches.** Scroll to the bottom of the results page. The "related searches" block is a free cluster map.
- **Alphabet soup.** Append each letter: "[YOUR TOPIC] a", "[YOUR TOPIC] b", and so on. Tedious but it dredges up the long tail autocomplete hides.
- **Search a competitor + a question word.** `[COMPETITOR] [YOUR TOPIC] cost`, `[COMPETITOR] how does` — surfaces what people ask about your category.
- **Other engines have different data.** Repeat the autocomplete and "related" steps on **Bing**, **DuckDuckGo**, and **YouTube** (YouTube autocomplete is excellent for "how to" and beginner questions).

> Tip: keep a running scratch list of the exact phrasing you find. The searcher's words are the title (see Section 5 of the quality standards).

---

## Source 2: Your Own Business (zero competition, highest conversion)

The questions your real prospects and customers ask are the highest-intent FAQs you can write, and competitors cannot copy them.

- **Customer support / inbox.** Mine support tickets, email threads, and chat logs. Any question asked more than twice is an FAQ. Look for the question *behind* the question.
- **Sales calls and consults.** Whoever talks to prospects hears the same objections and worries weekly. Ask them: "What do people always ask before they commit?" and "What do they get wrong about [YOUR TOPIC]?"
- **On-site search logs.** If your site has a search box, its query log is a goldmine — these are people already on your site telling you what they could not find. (No analytics tool needed; most site-search and CMS plugins log queries.)
- **Contact form free-text fields.** The "how can we help?" box captures questions in the user's own words.
- **Live chat / chatbot transcripts.** Same idea — real questions, real phrasing.
- **Reviews and testimonials.** Both praise and complaints reveal what people were confused or anxious about before buying.

---

## Source 3: Community & Social Listening (free)

Go where your audience already asks strangers for help.

- **Reddit.** Search `site:reddit.com [YOUR TOPIC]` in Google, or search within relevant subreddits. Threads titled as questions, and the top comments, are pre-validated FAQ topics. Sort by Top/All-time for evergreen ones.
- **Quora.** Built entirely of questions. Search "[YOUR TOPIC]" and note questions with high view/follow counts.
- **Forums and niche communities.** Industry-specific forums, Facebook Groups, Discord servers, Nextdoor (for local/regional topics). Sticky/pinned "read before posting" threads are essentially community FAQs.
- **YouTube comments.** On popular videos about [YOUR TOPIC], the comment section is full of "but what about…" follow-up questions.
- **Review sites and app stores** (if relevant). Q&A sections and review complaints surface recurring confusion.

---

## Source 4: Competitor & Authority Mining (free)

You are not copying answers — you are harvesting the **question set** and finding the gaps.

- **Competitor FAQ pages.** List every question 3-5 competitors answer. Build a coverage matrix: questions everyone covers (table stakes), and questions only one or none cover (your opportunity).
- **"Frequently asked questions" search.** `[YOUR TOPIC] frequently asked questions`, `[YOUR TOPIC] FAQ`, `[YOUR TOPIC] common questions`.
- **Authority/government/industry-body sites.** For regulated or technical topics, official bodies often publish FAQ or guidance pages that reveal the canonical questions (and let you write a plainer-English version).
- **Glossary and "ultimate guide" pages.** Every term in a competitor's glossary is a potential "what is X?" FAQ. Every H2 in a long guide is a potential standalone question.
- **PAA scraping by hand.** Pick your 10 most important seed questions, expand the PAA box on each, and log every question that appears. This alone can fill a quarter's content calendar.

---

## Source 5: AI Assistants as a Question Generator (free)

LLMs are trained on enormous question corpora and are good at *expanding* a seed into the real long tail. Use them to brainstorm, never to invent facts.

Prompt patterns:

- "List 30 questions a beginner would ask about [YOUR TOPIC], in their own casual words, grouped by buying stage (just curious → researching → ready to act)."
- "What are the most common misconceptions about [YOUR TOPIC] that lead people to ask the wrong question?"
- "For someone in [YOUR REGION], what location-specific questions come up about [YOUR TOPIC]?"
- "Give me the 'question behind the question' for each of these FAQs: [paste your titles]."

> Caution: AI is for *idea generation and phrasing*, not for the answers. Every fact in the published FAQ must come from an authoritative source you trust.

---

## Source 6: Your Own Content Graph (free)

Your existing site tells you what is missing.

- **Internal-link dead ends.** Concepts you mention repeatedly but never explain are FAQ candidates.
- **Glossary terms without a deeper page.** Each definition that people need *procedural* help with becomes an FAQ ("what is X?" → "how do I do X?").
- **Comments and replies on your own blog.** Reader questions on existing posts are FAQs waiting to be promoted.
- **Sequential gaps.** If you cover step 1 and step 3 of a process, "what about step 2?" is an FAQ.

---

## Turning Raw Questions Into a Prioritized List

You will end up with a messy pile of questions. Refine it in four passes:

1. **Normalize.** Rewrite each into natural question format (What/How/Can I/Do I/Should I). Keep the searcher's real phrasing where possible.
2. **Cluster by intent.** Group questions that share an intent. Within a cluster, the **satisfaction test** decides whether they are one FAQ or several (see `SEO-FAQ-QUALITY-STANDARDS.md`, Section 1). Many "different" questions collapse into one page.
3. **Dedupe against existing content.** Check each cluster against your intent registry and keyword ownership map. Drop anything already covered; route true overlaps to the **enhancement path** instead of a new page.
4. **Prioritize.** Score what survives and write the high scorers first.

### A simple, tool-free priority score

Rate each candidate 1-3 on four axes and sum:

| Axis | 1 | 2 | 3 |
|---|---|---|---|
| **Demand** (how often you saw it) | Found once | Found in 2-3 sources | Everywhere — autocomplete + PAA + support + community |
| **Intent value** | Just curious | Researching | Ready to act / high purchase intent |
| **Gap** (competitor coverage) | Everyone covers it well | Thin coverage | No good answer exists anywhere |
| **Fit** (you can answer it credibly) | Outside your wheelhouse | Adjacent | Core to what you do |

Write the **10-12s first**. They are in-demand, high-intent, under-served, and squarely yours — the FAQs that rank and convert.

---

## Quick-Start Workflow (one afternoon, no paid tools)

1. List your **5 seed topics**.
2. For each: run Google **autocomplete** through every question prefix, expand **PAA**, grab **related searches**. Log verbatim. (~30 min)
3. Pull the **top 20 recurring questions** from support/sales/site-search. (~30 min)
4. Search **Reddit + Quora** for each seed; log the highest-engagement question threads. (~30 min)
5. Build a **competitor FAQ coverage matrix** across 3-5 rivals; mark the gaps. (~45 min)
6. Run the **AI expansion prompts** to fill blind spots. (~15 min)
7. **Normalize → cluster → dedupe → score.** Pick your first batch of 10-12s. (~45 min)
8. Hand each winner to `SEO-FAQ-QUALITY-STANDARDS.md` and write.

---

## What to Avoid

- **Inventing questions nobody asks.** If you cannot trace a topic back to a real source above, it is not an FAQ — it is filler.
- **Copying a competitor's answer.** Harvest the *question*, write a better, original *answer*.
- **Trusting AI for facts.** Use it for ideas and phrasing only.
- **Skipping the dedupe pass.** Sourcing without checking the intent registry is how cannibalization happens.
- **Chasing volume over intent.** One high-intent question your buyers actually ask beats ten broad, curiosity-only ones.
