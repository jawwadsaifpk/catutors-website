# CLAUDE.md — catutors.com Project Instructions

## Project Overview
catutors.com — California's free tutor directory. Cloned and adapted from `Tutor Directory Website/` (read-only reference, do not modify).
- **Students:** post a tuition request free (no account needed) → admin approves → live on /jobs
- **Tutors:** register free, get approved, browse open jobs, see student contact directly (no tokens)
- Public directory: browse by California city or subject

## Business Model (Launch — Free)
- Students and tutors both free. No payments. Token/coin code is DORMANT — do not activate.
- No payment integration needed until explicitly asked.

## Deployment Status ✅
| Item | Detail |
|---|---|
| GitHub | `jawwadsaifpk/catutors-website` (master) |
| Vercel | `catutors-website` under `jawwadsaifpks-projects` |
| Live URL | `catutors-website.vercel.app` |
| Custom domain | `catutors.com` added in Vercel — DNS pending |
| DNS fix needed | Add `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com` in Hostinger, OR change nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com` |
| Supabase | Project `mudnjrmipioudwmglvhu` (US East 2) — schema pushed ✅ |

## Vercel Environment Variables (already set)
- `DATABASE_URL` — Transaction Pooler port 6543, password `@` encoded as `%40`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_GOOGLE_PLACES_KEY` (Google Places, US/CA restricted)
- `NEXT_PUBLIC_CONTACT_NUMBER`

## Local Dev
```bash
npm run dev       # http://localhost:3000
npx prisma db push      # push schema changes (uses .env — Session Pooler port 5432)
npx prisma generate     # after schema changes — then restart dev server
npm run stop      # kill node process
```

**Important:** After any `prisma generate`, restart the dev server or the Prisma client won't update.

## Tech Stack (do not change without asking)
- **Next.js 16** App Router, TypeScript
- **Tailwind CSS 4** — `@import "tailwindcss"` in globals.css. NO tailwind.config.ts
- **Prisma 7** — generator must be `prisma-client-js` (never `prisma-client`)
- **Supabase** PostgreSQL — `lib/db.ts` uses PrismaPg adapter
- **Vercel** hosting — auto-deploys on push to master

## Database Schema (simplified — no token/coin system)
- **Tutor** — id, name, subjects[], areas[], city, phone, email, bio, photoUrl, featured, status, gender, teachingMode, availability, qualification, experience, classLevels[], passwordHash
- **Lead** — id, studentName, studentPhone, subject, classLevel, city, area, mode, gender, budget, notes, status (pending/open/filled)
- **Review** — id, tutorId, rating, reviewText, reviewerName, classLevel, status (pending/approved)
- **Message** — id, leadId, tutorId, senderType, body, readAt

## Key CA-specific Details
- 20 California cities → `lib/cities.ts`
- US curriculum + AP/SAT/ACT subjects → `lib/subjects.ts`
- Jobs page: contact info shown freely to all approved tutors
- Teaching mode: "In-Person" | "Online" | "Both"
- `AreaAutocomplete.tsx` restricts Google Places to `country: "us"`
- Tutor ID format: `CT-XXXX` (lib/ids.ts)

## Coding Rules
- Prefer Server Components — no "use client" unless truly needed
- dynamic route params/searchParams are Promises — always `await` them
- Never use a library not in package.json without asking
- No comments unless the WHY is non-obvious
