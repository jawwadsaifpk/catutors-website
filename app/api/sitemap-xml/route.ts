import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { CA_CITIES } from "@/lib/cities";
import { ALL_SUBJECTS } from "@/lib/subjects";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.catutors.com";

function toSlug(str: string) {
  return str.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-").replace(/[()]/g, "").replace(/--+/g, "-");
}

function urlTag(loc: string, opts: { lastmod?: Date | string; changefreq?: string; priority?: number }): string {
  const lastmod    = opts.lastmod    ? `\n    <lastmod>${new Date(opts.lastmod).toISOString()}</lastmod>` : "";
  const changefreq = opts.changefreq ? `\n    <changefreq>${opts.changefreq}</changefreq>` : "";
  const priority   = opts.priority != null ? `\n    <priority>${opts.priority}</priority>` : "";
  return `  <url>\n    <loc>${loc}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
}

export async function GET() {
  const now = new Date();

  const staticUrls = [
    urlTag(BASE_URL,                   { lastmod: now, changefreq: "daily",   priority: 1.0 }),
    urlTag(`${BASE_URL}/tutors`,       { lastmod: now, changefreq: "daily",   priority: 0.9 }),
    urlTag(`${BASE_URL}/jobs`,         { lastmod: now, changefreq: "daily",   priority: 0.9 }),
    urlTag(`${BASE_URL}/register`,     { lastmod: now, changefreq: "monthly", priority: 0.7 }),
    urlTag(`${BASE_URL}/request`,      { lastmod: now, changefreq: "monthly", priority: 0.7 }),
    urlTag(`${BASE_URL}/blog`,         { lastmod: now, changefreq: "weekly",  priority: 0.7 }),
    urlTag(`${BASE_URL}/about`,        { lastmod: now, changefreq: "monthly", priority: 0.6 }),
    urlTag(`${BASE_URL}/how-it-works`, { lastmod: now, changefreq: "monthly", priority: 0.6 }),
    urlTag(`${BASE_URL}/faq`,          { lastmod: now, changefreq: "monthly", priority: 0.6 }),
    urlTag(`${BASE_URL}/contact`,      { lastmod: now, changefreq: "monthly", priority: 0.4 }),
    urlTag(`${BASE_URL}/privacy`,      { lastmod: now, changefreq: "yearly",  priority: 0.3 }),
    urlTag(`${BASE_URL}/terms`,        { lastmod: now, changefreq: "yearly",  priority: 0.3 }),
  ];

  // All city pages — always included regardless of tutor count
  const cityUrls = CA_CITIES.map((city) => {
    const slug = city.toLowerCase().replace(/\s+/g, "-");
    return urlTag(`${BASE_URL}/${slug}`, { lastmod: now, changefreq: "weekly", priority: 0.8 });
  });

  // All city+subject pages — always included for SEO
  const citySubjectUrls = CA_CITIES.flatMap((city) => {
    const citySlug = city.toLowerCase().replace(/\s+/g, "-");
    return ALL_SUBJECTS.map((subject) =>
      urlTag(`${BASE_URL}/${citySlug}/${toSlug(subject)}`, { changefreq: "weekly", priority: 0.6 })
    );
  });

  const blogUrls = BLOG_POSTS.map((post) =>
    urlTag(`${BASE_URL}/blog/${post.slug}`, { lastmod: post.date, changefreq: "monthly", priority: 0.6 })
  );

  // Individual approved tutor profiles
  const allTutors = await db.tutor.findMany({
    where: { status: "approved" },
    select: { id: true, createdAt: true },
  });
  const tutorUrls = allTutors.map((tutor) =>
    urlTag(`${BASE_URL}/tutors/${tutor.id}`, { lastmod: tutor.createdAt, changefreq: "monthly", priority: 0.5 })
  );

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...staticUrls, ...cityUrls, ...citySubjectUrls, ...blogUrls, ...tutorUrls,
    `</urlset>`,
  ].join("\n");

  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}
