# catutors.com

California's free tutor directory — connecting students with verified tutors across LA, San Francisco, San Diego and more.

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase and Google Places credentials in .env.local

npx prisma db push        # Create tables in Supabase
npx prisma generate       # Generate Prisma client
npm run dev               # Start dev server
```

## Environment Variables

See `.env.example` for all required variables.

## Deployment

1. Push to GitHub
2. Import repo in Vercel
3. Add environment variables in Vercel dashboard
4. Add `catutors.com` as custom domain in Vercel
5. Point Hostinger nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com`
