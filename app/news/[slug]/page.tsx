import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getNewsBySlug, getAllNews, getRelatedNews, type NewsCategory } from "@/lib/news-posts";
import type { BlogSection } from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_COLORS: Record<NewsCategory, string> = {
  "K-12": "bg-blue-100 text-blue-800",
  "Higher Education": "bg-purple-100 text-purple-800",
  "Standardized Tests": "bg-orange-100 text-orange-800",
  "District News": "bg-green-100 text-green-800",
  "Policy & Legislation": "bg-red-100 text-red-800",
  "College Admissions": "bg-amber-100 text-amber-800",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | catutors.com`,
    description: post.description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.catutors.com/news/${slug}`,
      siteName: "catutors.com",
      type: "article",
      publishedTime: post.dateISO,
      authors: ["CATutors Editorial Team"],
    },
  };
}

export async function generateStaticParams() {
  return getAllNews().map((post) => ({ slug: post.slug }));
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2":
      return <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">{section.text}</h2>;
    case "p":
      return <p className="text-gray-700 leading-relaxed mb-5">{section.text}</p>;
    case "ul":
      return (
        <ul className="list-disc list-inside space-y-2 mb-5 text-gray-700">
          {section.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal list-inside space-y-2 mb-5 text-gray-700">
          {section.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );
    case "links":
      return (
        <div className="my-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm font-semibold text-blue-800 mb-3">{section.label}</p>
          <ul className="space-y-2">
            {section.items.map((link, i) => (
              <li key={i}>
                <Link href={link.href} className="text-blue-600 hover:underline text-sm font-medium">
                  {link.text} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    case "image":
      return (
        <figure className="my-8">
          <img src={section.src} alt={section.alt} className="rounded-2xl w-full h-auto" />
          {section.caption && (
            <figcaption className="text-center text-sm text-gray-400 mt-2">{section.caption}</figcaption>
          )}
        </figure>
      );
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  const related = getRelatedNews(post);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    author: { "@type": "Organization", name: "CATutors Editorial Team" },
    publisher: {
      "@type": "Organization",
      name: "catutors.com",
      url: "https://www.catutors.com",
    },
    url: `https://www.catutors.com/news/${post.slug}`,
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/news" className="text-blue-600 text-sm hover:underline mb-8 inline-block">
          ← California Education News
        </Link>

        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${CATEGORY_COLORS[post.category]}`}
        >
          {post.category}
        </span>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-10">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} read</span>
          <span>·</span>
          <span>CATutors Editorial Team</span>
        </div>

        <div>
          {post.sections.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-white">
          <h3 className="text-xl font-bold mb-2">Looking for a tutor in California?</h3>
          <p className="text-blue-100 text-sm mb-5">
            Connect directly with verified California tutors — free for students and families.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/request"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold rounded-lg text-sm transition-colors"
            >
              Find a Tutor →
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-sm transition-colors border border-white/20"
            >
              Register as a Tutor
            </Link>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/news/${rel.slug}`}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${CATEGORY_COLORS[rel.category]}`}
                  >
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{rel.title}</h3>
                  <p className="text-xs text-gray-400">{rel.date}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Footer />
    </>
  );
}
