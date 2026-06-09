# Publish California Education News

You are writing and publishing a new California education news article for catutors.com.

Follow these steps **in order**, completing each before moving to the next.

---

## Step 1 — Search for today's news

Use the WebSearch tool to find **recent California education news** (published in the last 7 days). Run 2–3 searches across different angles, for example:

- `California education news today 2026`
- `California K-12 school news this week`
- `LAUSD UC CSU California education policy update`
- `California standardized test CAASPP SAT ACT 2026`
- `California school district budget funding 2026`

Read the results and identify the **single most newsworthy, substantive story** that:
- Is specific and factual (not generic)
- Is relevant to students, parents, or tutors in California
- Has not already been covered in `lib/news-posts.ts` (check existing slugs)

Briefly tell the user which story you picked and why before writing.

---

## Step 2 — Write the article

Write a **400–600 word** article using the `NewsPost` format from `lib/news-posts.ts`.

Rules:
- `slug`: kebab-case, descriptive, SEO-friendly, unique (not already in NEWS_POSTS)
- `title`: Clear, specific headline — not clickbait
- `date`: Today's date in format "Month D, YYYY" (e.g. "June 9, 2026")
- `dateISO`: Today's date in "YYYY-MM-DD" format
- `readTime`: Estimate based on word count (400w ≈ "4 min", 600w ≈ "6 min")
- `category`: One of exactly — "K-12" | "Higher Education" | "Standardized Tests" | "District News" | "Policy & Legislation" | "College Admissions"
- `region`: Optional — "Los Angeles" | "San Francisco" | "San Diego" | "Sacramento" | "Statewide" | (other CA city if relevant)
- `sections`: Array of `BlogSection` objects — use `h2`, `p`, `ul`, `ol`, `links` types
- End with a `links` section titled "Find a Tutor in California" with 2–3 relevant hrefs from existing city/subject routes (e.g. `/los-angeles/mathematics`, `/tutors`, `/request`)
- Do NOT make up statistics — if a figure is uncertain, write "according to [source]" or note it should be verified
- Tone: informative, neutral, helpful — not alarmist or promotional

The article should end with a natural bridge to tutoring (e.g. "parents looking to supplement..." or "tutors who work with...").

---

## Step 3 — Add to lib/news-posts.ts

Open `lib/news-posts.ts` and **prepend** the new article object to the top of the `NEWS_POSTS` array (so it appears first/most recent).

The object must be valid TypeScript matching the `NewsPost` type exactly.

After editing, verify there are no syntax errors by checking the file looks correct.

---

## Step 4 — Commit and push

Run these git commands:

```
git add lib/news-posts.ts
git commit -m "Add news article: <slug>"
git push origin master
```

Use the article slug in the commit message.

---

## Step 5 — Confirm

Tell the user:
- The article title and slug
- The live URL it will be at: `https://catutors.com/news/<slug>`
- That Vercel is deploying (takes ~1–2 minutes)
