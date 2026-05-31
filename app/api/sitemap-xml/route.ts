import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { CA_CITIES } from "@/lib/cities";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.catutors.com";

const SUBJECT_SLUGS = [
  "mathematics", "calculus", "statistics", "physics", "chemistry", "biology",
  "english", "computer-science", "sat-prep", "act-prep",
  "ap-calculus-ab", "ap-chemistry", "ap-biology", "spanish",
];

const SUBJECT_DISPLAY: Record<string, string> = {
  "mathematics":    "Mathematics",    "calculus":     "Calculus",
  "statistics":     "Statistics",     "physics":      "Physics",
  "chemistry":      "Chemistry",      "biology":      "Biology",
  "english":        "English",        "computer-science": "Computer Science",
  "sat-prep":       "SAT Prep",       "act-prep":     "ACT Prep",
  "ap-calculus-ab": "AP Calculus AB", "ap-chemistry": "AP Chemistry",
  "ap-biology":     "AP Biology",     "spanish":      "Spanish",
};

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
    urlTag(`${BASE_URL}/register`,     { lastmod: now, changefreq: "monthly", priority: 0.8 }),
    urlTag(`${BASE_URL}/request`,      { lastmod: now, changefreq: "monthly", priority: 0.8 }),
    urlTag(`${BASE_URL}/blog`,         { lastmod: now, changefreq: "weekly",  priority: 0.7 }),
    urlTag(`${BASE_URL}/about`,        { lastmod: now, changefreq: "monthly", priority: 0.6 }),
    urlTag(`${BASE_URL}/how-it-works`, { lastmod: now, changefreq: "monthly", priority: 0.7 }),
    urlTag(`${BASE_URL}/faq`,          { lastmod: now, changefreq: "monthly", priority: 0.6 }),
  ];

  const allTutors = await db.tutor.findMany({
    where: { status: "approved" },
    select: { id: true, city: true, subjects: true, createdAt: true },
  });

  const cityCount: Record<string, number> = {};
  const subjectCityCount: Record<string, number> = {};
  for (const tutor of allTutors) {
    cityCount[tutor.city] = (cityCount[tutor.city] || 0) + 1;
    for (const subject of tutor.subjects as string[]) {
      const key = `${tutor.city}|${subject}`;
      subjectCityCount[key] = (subjectCityCount[key] || 0) + 1;
    }
  }

  const cityUrls = CA_CITIES
    .filter((city) => (cityCount[city] || 0) > 0)
    .map((city) => {
      const slug = city.toLowerCase().replace(/\s+/g, "-");
      return urlTag(`${BASE_URL}/${slug}`, { changefreq: "daily", priority: 0.85 });
    });

  const subjectCityUrls = CA_CITIES.flatMap((city) =>
    SUBJECT_SLUGS
      .filter((slug) => {
        const subject = SUBJECT_DISPLAY[slug];
        return (subjectCityCount[`${city}|${subject}`] || 0) > 0;
      })
      .map((slug) => {
        const citySlug = city.toLowerCase().replace(/\s+/g, "-");
        return urlTag(`${BASE_URL}/${citySlug}/${slug}`, { changefreq: "weekly", priority: 0.7 });
      })
  );

  const blogUrls = BLOG_POSTS.map((post) =>
    urlTag(`${BASE_URL}/blog/${post.slug}`, { lastmod: post.date, changefreq: "monthly", priority: 0.6 })
  );

  const tutorUrls = allTutors.map((tutor) =>
    urlTag(`${BASE_URL}/tutors/${tutor.id}`, { lastmod: tutor.createdAt, changefreq: "monthly", priority: 0.6 })
  );

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...staticUrls, ...cityUrls, ...subjectCityUrls, ...blogUrls, ...tutorUrls,
    `</urlset>`,
  ].join("\n");

  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}
