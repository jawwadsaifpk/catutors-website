import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getAllNews, NEWS_CATEGORIES, type NewsCategory } from "@/lib/news-posts";

export const metadata: Metadata = {
  title: "California Education News | catutors.com",
  description:
    "Stay up to date on California K-12 education news, CAASPP results, UC/CSU admissions changes, LAUSD updates, and standardized test policy — all in one place.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "California Education News | catutors.com",
    description:
      "California K-12 education news, policy updates, college admissions changes, and standardized test guidance for students and families.",
    url: "https://www.catutors.com/news",
    siteName: "catutors.com",
    type: "website",
  },
};

const CATEGORY_COLORS: Record<NewsCategory, string> = {
  "K-12": "bg-blue-100 text-blue-800",
  "Higher Education": "bg-purple-100 text-purple-800",
  "Standardized Tests": "bg-orange-100 text-orange-800",
  "District News": "bg-green-100 text-green-800",
  "Policy & Legislation": "bg-red-100 text-red-800",
  "College Admissions": "bg-amber-100 text-amber-800",
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function NewsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const activeCategory = NEWS_CATEGORIES.includes(category as NewsCategory)
    ? (category as NewsCategory)
    : null;

  const allPosts = getAllNews();
  const posts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-2">California Education</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Education News & Updates</h1>
        <p className="text-gray-500 text-lg mb-8">
          Policy changes, test updates, and district news for California students, parents, and tutors.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/news"
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              !activeCategory
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            All
          </Link>
          {NEWS_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/news?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl font-medium text-gray-500">No articles in this category yet.</p>
            <Link href="/news" className="mt-4 inline-block text-blue-600 hover:underline text-sm">
              View all articles →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${CATEGORY_COLORS[post.category]}`}
                >
                  {post.category}
                </span>
                {post.region && post.region !== "Statewide" && (
                  <span className="inline-block ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 mb-3">
                    {post.region}
                  </span>
                )}
                <h2 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-2">{post.description}</p>
                <p className="text-xs text-gray-400 mt-3">
                  {post.date} · {post.readTime} read
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
