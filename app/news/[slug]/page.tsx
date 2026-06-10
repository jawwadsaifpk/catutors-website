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
  const ogImage = `https://www.catutors.com/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`;

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  return getAllNews().map((post) => ({ slug: post.slug }));
}

const BASE_URL = "https://www.catutors.com";

function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const url = encodeURIComponent(`${BASE_URL}/news/${slug}`);
  const text = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="p-2 rounded-lg bg-gray-100 hover:bg-black hover:text-white text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="p-2 rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-2 rounded-lg bg-gray-100 hover:bg-blue-700 hover:text-white text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        href={`https://wa.me/?text=${text}%20${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="p-2 rounded-lg bg-gray-100 hover:bg-green-500 hover:text-white text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} read</span>
            <span>·</span>
            <span>CATutors Editorial Team</span>
          </div>
          <ShareButtons slug={post.slug} title={post.title} />
        </div>

        <div>
          {post.sections.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Share this article:</span>
          <ShareButtons slug={post.slug} title={post.title} />
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
