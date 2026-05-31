# CLAUDE.md — catutors.com Project Instructions

## Project Overview
catutors.com — California's free tutor directory. Cloned and adapted from lahoretutors.pk.
- **Students:** post a tuition request for free (no account needed) via /request → admin approves → goes live on /jobs
- **Tutors:** register, browse open jobs on /jobs, see student contact info directly (free model, no tokens)
- Public tutor directory: browse by city (LA, SF, San Diego, etc.) or subject (Math, SAT Prep, AP, etc.)

## Business Model (Launch Phase — Free)
- Students post free, tutors browse free, contact info visible directly to all approved tutors
- Token/coin system code is DORMANT — do not activate without instruction
- No payment integration at launch

## Tech Stack (do not change without asking)
- **Next.js 16** with App Router (breaking changes vs older Next.js — read AGENTS.md)
- **TypeScript** — keep types simple
- **Tailwind CSS 4** — `@import "tailwindcss"` in globals.css. NO tailwind.config.ts
- **Prisma 7 ORM** — generator must be `prisma-client-js` (never `prisma-client`)
- **Supabase** — PostgreSQL database (new project, separate from lahoretutors.pk)
- Domain: catutors.com (Hostinger → Vercel nameservers)

## Coding Rules
- Prefer **Server Components** — no "use client" unless truly needed
- dynamic route params/searchParams are Promises — always `await` them
- Keep code clean — no unnecessary comments
- Never use a library not already in package.json without asking

## Key Differences from lahoretutors.pk
- Cities: California (LA, SF, SD, SJ, Sacramento, Fresno, Oakland, etc.) — see lib/cities.ts
- Subjects: US curriculum + AP courses, SAT/ACT — see lib/subjects.ts
- Prisma schema: no JobUnlock, TokenTransaction, TutorUnlock, CoinTransaction, Student tables
- Jobs page: student contact visible freely to all approved tutors (no unlock required)
- Teaching mode labels: "In-Person" | "Online" | "Both" (not "Home")
- Contact: phone/text (not WhatsApp-first)
- Source reference: `Tutor Directory Website/` — DO NOT modify that folder

## Database Schema (simplified)
**Tutor:** id, name, subjects[], areas[], city, phone, email, bio, photoUrl, featured, status, gender, teachingMode, availability, qualification, experience, classLevels[], passwordHash
**Lead:** id, studentName, studentPhone, subject, classLevel, city, area, mode, gender, budget, notes, status (pending/open/filled)
**Review:** id, tutorId, rating, reviewText, reviewerName, classLevel, status (pending/approved)
**Message:** id, leadId, tutorId, senderType, body, readAt

## Commands
```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Build for production
npx prisma db push      # Push schema to Supabase
npx prisma generate     # Regenerate Prisma client
npx prisma studio       # Visual DB editor
```

## Environment Variables Needed
- DATABASE_URL (Supabase Session Pooler, port 5432) — for Prisma CLI
- DATABASE_URL (Supabase Transaction Pooler, port 6543) — for running app (set in .env.local)
- ADMIN_PASSWORD
- NEXT_PUBLIC_GOOGLE_PLACES_KEY (restrict to US/California)
- NEXT_PUBLIC_CONTACT_NUMBER (US phone number)

## Deployment
- Vercel — auto-deploys on GitHub push to main
- catutors.com — nameservers: ns1.vercel-dns.com / ns2.vercel-dns.com (set in Hostinger)
