import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, guides, and advice for students, parents, and tutors in California.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Blog</h1>
        <p className="text-gray-500 text-lg mb-10">Tips and guides for students, parents, and tutors in California.</p>

        {BLOG_POSTS.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-xl font-medium text-gray-500">Blog coming soon</p>
            <p className="mt-2 text-sm">We&apos;re working on helpful articles for California students and tutors.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                <p className="text-xs text-gray-400 mt-3">{post.date} · {post.author}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
