import type { MetadataRoute } from "next";
import { CA_CITIES, CITY_SLUGS } from "@/lib/cities";
import { ALL_SUBJECTS } from "@/lib/subjects";
import { BLOG_POSTS } from "@/lib/blog-posts";

const BASE = "https://www.catutors.com";

function toSlug(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "").replace(/--+/g, "-");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/tutors`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/request`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const cityPages: MetadataRoute.Sitemap = Object.keys(CITY_SLUGS).map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const citySubjectPages: MetadataRoute.Sitemap = Object.keys(CITY_SLUGS).flatMap((citySlug) =>
    ALL_SUBJECTS.map((subject) => ({
      url: `${BASE}/${citySlug}/${toSlug(subject)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }))
  );

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...cityPages, ...citySubjectPages, ...blogPages];
}
