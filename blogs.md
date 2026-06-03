# Blog Master Plan — catutors.com
_Last updated: 2026-06-03 | Posts published: 38 | Posts planned: 0_

---

## HOW THIS FILE WORKS (READ FIRST)

This is a **living document**. Every time a blog post is published, it must be moved from the PLANNED section to the PUBLISHED section and the stats line at the top must be updated.

### To publish the next post, say:
> **"Publish next blog post"**

Claude will automatically:
1. Read this file and pick the **first post** under PLANNED QUEUE
2. Write the full post following all SEO rules below
3. Add it to `lib/blog-posts.ts` — using a **targeted grep** for the marker comment `APPEND NEW POSTS ABOVE THIS LINE` to find the insertion point (no full-file read needed)
4. Commit and push to GitHub (live in ~1 minute via Vercel auto-deploy)
5. Move the post from PLANNED → PUBLISHED in this file
6. Update the stats line at the top

No manual steps needed. Just say the words.

### To publish a specific post, say:
> **"Publish blog post: [title or topic]"**

### To add new planned posts to the queue, say:
> **"Add these blog topics to the queue: [list]"**

---

## AUTOMATION OPTIONS

### Option A — Manual trigger (recommended for now)
Just say **"Publish next blog post"** whenever you want. Claude handles everything end-to-end.

### Option B — Batch publishing
Say **"Publish next 4 blog posts"** to write and publish a full week's batch in one go.

---

## PUBLISHING CADENCE

| Phase | Timeline | Frequency | Goal |
|---|---|---|---|
| Growth sprint | Now → Month 3 | 4 posts/week | 80+ total posts |
| Steady state | Month 4+ | 2 posts/week | 8 posts/month |

**Current pace needed:** 4 posts/week to hit 80 posts by end of Month 3.

---

## CONTENT PILLARS (rotate every week)

| Pillar | Audience | Examples |
|---|---|---|
| City Guides | Parents | "home tutor Los Angeles", "tutor San Diego" |
| Subject Guides | Parents by subject | "AP Calculus tutor", "SAT prep tutor California" |
| Exam Prep | Students/Parents | "SAT prep tips", "AP exam guide California" |
| Tutor Career | Tutors (supply side) | "how to become a tutor in California", "get more students" |
| Comparison/Advice | All | "online vs in-person tutoring", "private tutor vs tutoring center" |

**Rule:** Every week must include posts from at least 3 different pillars.

---

## TARGET KEYWORD STRATEGY

These are high search-intent keyword clusters to prioritize. Every post must map to one cluster.

### Cluster 1 — High commercial intent ("near me" / city)
- "home tutor Los Angeles" / "private tutor Los Angeles"
- "math tutor near me California"
- "tutor San Diego" / "tutors in San Francisco"
- "SAT tutor near me California"

### Cluster 2 — High informational intent (drives blog traffic → conversion)
- "how to find a tutor in California"
- "how much does a tutor cost in California"
- "best SAT prep tips"
- "how to prepare for AP Calculus"
- "online tutoring vs in-person tutoring"

### Cluster 3 — Tutor supply-side (attract tutors to register)
- "how to become a tutor in California"
- "tutoring jobs California"
- "how much do tutors make in California"
- "how to get tutoring clients"

### Cluster 4 — Long-tail subject + exam intent
- "AP Chemistry help California"
- "MCAT prep tutor California"
- "Calculus tutor for high school student"
- "Python tutor for kids California"

---

## SEO RULES (apply to every post, no exceptions)

### General SEO Rules

1. **Keyword in title** — the target keyword (or close variant) must appear in the post title, ideally near the beginning
2. **Keyword in description** — the `description` field's first sentence must contain the keyword
3. **Keyword in first paragraph** — use the keyword naturally within the first 100 words of the intro `p` section
4. **Keyword in at least one H2** — at least one `h2` heading must include the keyword or a synonym
5. **Keyword in slug** — the `slug` must contain the main keyword words (hyphens between words, all lowercase)
6. **Internal links required** — every post must contain a minimum of 3 internal links; links may point to other published blog posts (`/blog/[slug]`), city pages (`/[city-slug]`), or subject+city pages (`/[city-slug]/[subject]`); more links are always better as long as they are genuinely relevant
7. **Word count** — each post must be 1200–1500 words (roughly 10–12 sections of 110–130 words each); count carefully before finalising
8. **California-specific content** — always mention California or the specific city; no generic global content
9. **No duplicate topics** — check existing slugs in PUBLISHED section before writing a new post
10. **Fresh date** — always use today's actual date in `date` and `dateISO` fields when publishing

### Yoast SEO Rules (adapted for our blog-posts.ts format)

**Title (the `title` field):**
- Length: 50–60 characters (Yoast green zone)
- Must contain the focus keyword
- Must be compelling and click-worthy — include a number, question, or strong word where possible
- Avoid: starting with "The", excessive punctuation, ALL CAPS

**Meta Description (the `description` field):**
- Length: 120–156 characters (Yoast green zone — count carefully)
- Must contain the focus keyword at least once
- Must read as a complete, compelling sentence — not a list of keywords
- Must include a soft call-to-action ("Find out", "Learn how", "Discover")
- Avoid: repeating the title word-for-word

**Slug:**
- Max 5 words (hyphens only, no underscores)
- Must contain the focus keyword
- Remove stop words (a, the, in, of, for) from slug
- Example: keyword "home tutor Los Angeles" → slug: `home-tutor-los-angeles`

**Content quality (Yoast Readability):**
- Sentence length: aim for under 20 words per sentence
- Paragraph length (`p` sections): under 150 words each
- Use transition words to open sections: "However,", "In addition,", "For example,", "As a result,"
- Use active voice (Yoast flags passive voice above 10%)
- Flesch Reading Ease target: 60+ (write at ~Grade 8 level — simple, direct language)
- Avoid jargon unless explained immediately after

**Subheadings (`h2` sections):**
- Use 1 `h2` for every 150–200 words of content
- At least one `h2` must contain the focus keyword
- Each `h2` should be a clear, descriptive label (not a clever teaser)

**Internal links (`links` block):**
- Minimum 3 internal links per post — no maximum limit; add more wherever relevant
- Links may go to: other published blog posts (`/blog/[slug]`), city pages (`/los-angeles`, `/san-diego`), or subject+city pages (`/los-angeles/mathematics`)
- Choose links that are genuinely relevant to the post topic — do not force unrelated links
- Link text must be descriptive (not "click here" — say "SAT tutors in Los Angeles" or "our guide on tutor costs in California")
- Spread the 3 links across the post — do not cluster all 3 in one `links` block

**Keyword density:**
- Target: 0.5%–2.5% of total word count
- For a 1200–1500 word post: keyword should appear ~6–10 times (naturally, not stuffed)
- Use synonyms: "home tutor" / "private tutor" / "private tutoring" count as variants

---

## BLOG POST TEMPLATE (fill this in for every new post)

```
{
  slug: "keyword-based-slug-here",
  title: "Title With Keyword — 50–60 Characters",
  description: "120–156 char description with keyword and soft CTA. Must be a complete sentence.",
  date: "May 31, 2026",
  dateISO: "2026-05-31",
  readTime: "X min",
  sections: [
    { type: "p", text: "Intro paragraph — 100–150 words. Include keyword in first 100 words." },
    { type: "h2", text: "1. First Subheading With Keyword" },
    { type: "p", text: "Section content..." },
    { type: "h2", text: "2. Second Subheading" },
    { type: "p", text: "Section content..." },
    // 4–6 more h2+p pairs
    { type: "ul", items: ["Point 1", "Point 2", "Point 3"] },
    { type: "links", label: "Find a tutor near you:", items: [
      { text: "Descriptive link text", href: "/city-slug/subject" }
    ]},
    { type: "p", text: "Closing paragraph with soft CTA — encourage the reader to find a tutor or post a request." },
  ],
},
```

---

## PUBLISHED POSTS (30 total)

| # | Title | Slug | Pillar | Date |
|---|---|---|---|---|
| 1 | How to Find a Private Tutor in California — Guide | find-private-tutor-california | Advice | May 31, 2026 |
| 2 | How Much Does a Tutor Cost in California? Full Guide | tutor-cost-california-2026 | Advice | May 31, 2026 |
| 3 | Home Tutors in Los Angeles — How to Find the Best | home-tutor-los-angeles | City | May 31, 2026 |
| 4 | How to Prepare for the SAT in California — 7 Tips | sat-prep-california-tips | Exam Prep | May 31, 2026 |
| 5 | Find the Best Math Tutor in San Diego, California | math-tutor-san-diego | City | May 31, 2026 |
| 6 | Online vs In-Person Tutoring in California: Guide | online-vs-inperson-tutoring | Comparison | May 31, 2026 |
| 7 | How to Become a Tutor in California — Step by Step | become-tutor-california | Tutor Career | May 31, 2026 |
| 8 | AP Calculus Tutor in California — Do You Need One? | ap-calculus-tutor-california | Subject | May 31, 2026 |
| 9 | Home Tutors in San Francisco — Complete Parent Guide | home-tutor-san-francisco | City | May 31, 2026 |
| 10 | How Much Do Tutors Make in California? 2026 Guide | tutor-income-california | Tutor Career | May 31, 2026 |
| 11 | Private vs. Group Tutoring — Which Is Right for You? | private-vs-group-tutoring | Comparison | May 31, 2026 |
| 12 | How to Ace AP Chemistry in California — Full Guide | ap-chemistry-prep-california | Exam Prep | May 31, 2026 |
| 13 | Home Tutors in Irvine, California — Find the Best | home-tutor-irvine-california | City | May 31, 2026 |
| 14 | SAT vs. ACT — Which Should California Students Take? | sat-vs-act-california | Comparison | May 31, 2026 |
| 15 | Get More Tutoring Students in California — 7 Tips | get-more-tutoring-students | Tutor Career | May 31, 2026 |
| 16 | Top 5 Subjects for Private Tutoring in California | best-subjects-tutoring-california | Subject | May 31, 2026 |
| 17 | Home Tutors in San Jose — What Parents Need to Know | home-tutor-san-jose | City | May 31, 2026 |
| 18 | How to Prepare for the ACT in California — Full Guide | act-prep-tips-california | Exam Prep | May 31, 2026 |
| 19 | Tutoring Jobs in California — How to Find Students | tutoring-jobs-california | Tutor Career | May 31, 2026 |
| 20 | AP Biology in California — Score a 5 With a Tutor | ap-biology-tutor-california | Subject | May 31, 2026 |
| 21 | Home Tutors in Sacramento, California — Full Guide | home-tutor-sacramento | City | May 31, 2026 |
| 22 | How to Write a Tutor Profile That Gets More Students | tutor-profile-tips | Tutor Career | May 31, 2026 |
| 23 | Elementary Math Tutor in California — Parent's Guide | elementary-math-tutor-california | Subject | May 31, 2026 |
| 24 | How to Ace AP Physics in California — Complete Guide | ap-physics-prep-california | Exam Prep | May 31, 2026 |
| 25 | Tutoring Centers vs. Private Tutors in California | tutoring-center-vs-private-tutor | Comparison | May 31, 2026 |
| 26 | Home Tutors in Pasadena — Complete Parent's Guide | home-tutor-pasadena | City | May 31, 2026 |
| 27 | MCAT Prep Tutoring in California — Complete Guide | mcat-prep-tutor-california | Exam Prep | May 31, 2026 |
| 28 | Python Tutor for Kids in California — What to Know | python-tutor-kids-california | Subject | May 31, 2026 |
| 29 | Part-Time Tutoring in California — How to Get Started | part-time-tutoring-california | Tutor Career | May 31, 2026 |
| 30 | Home Tutors in Fresno, California — Find the Best | home-tutor-fresno-california | City | May 31, 2026 |
| 31 | Teen Mental Health Crisis in California Schools | teen-mental-health-california-schools | Advice | Jun 3, 2026 |
| 32 | College Admissions Stress in California: Is It Worth It? | college-admissions-stress-california | Advice | Jun 3, 2026 |
| 33 | School Smartphone Bans in California — The Full Debate | smartphone-ban-california-schools | Comparison | Jun 3, 2026 |
| 34 | School Discipline Crisis Failing California Students | school-discipline-crisis-california | Advice | Jun 3, 2026 |
| 35 | Home Tutors in Long Beach — Complete Parent Guide | home-tutor-long-beach | City | Jun 3, 2026 |
| 36 | Algebra Tutor in California — What Every Parent Needs | algebra-tutor-california | Subject | Jun 3, 2026 |
| 37 | AP US History in California — How to Score a 5 | ap-us-history-tutor-california | Exam Prep | Jun 3, 2026 |
| 38 | How to Build a Tutoring Business in California | build-tutoring-business-california | Tutor Career | Jun 3, 2026 |

---

## PLANNED QUEUE (publish in order — top = next)

| Priority | Title | Target Keyword | Pillar | Status |
|---|---|---|---|---|
| — | Queue empty — all 30 posts published May 31, 2026 | — | — | — |

---

## CITIES TO COVER (SEO expansion targets)

### Done ✅
_(none yet)_

### Priority order (by population / search volume)
Los Angeles, San Diego, San Jose, San Francisco, Sacramento, Irvine, Pasadena, Fresno, Long Beach, Anaheim, Santa Ana, Riverside, Bakersfield, Stockton, Oakland, Fremont, Glendale, Huntington Beach, Santa Clarita, Chula Vista

---

## SUBJECTS TO COVER (SEO expansion targets)

### Done ✅
_(none yet)_

### Priority order (by search volume and parent demand)
SAT Prep, ACT Prep, AP Calculus, AP Chemistry, AP Physics, AP Biology, Mathematics, Algebra, Calculus, English, Essay Writing, Computer Science, Python, Elementary Math, MCAT Prep, LSAT Prep, Statistics, Spanish, Economics, Coding for Kids

---

## MONTHLY PROGRESS LOG

| Month | Posts Published | Total Posts | Notes |
|---|---|---|---|
| May 2026 | 30 | 30 | Initial batch of 30 posts published |
| Jun 2026 | 8 | 38 | Teen mental health, college admissions, smartphone ban, school discipline, Long Beach, Algebra, AP US History, tutoring business |
| Jun 2026 | — | — | — |
| Jul 2026 | — | — | — |
| Aug 2026 | — | — | — |

---
_This file is maintained by Claude. Say "Publish next blog post" to trigger the full write → publish → update cycle._
