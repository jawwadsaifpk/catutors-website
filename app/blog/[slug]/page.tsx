import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getPostBySlug, BLOG_POSTS } from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${slug}` } };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-blue-600 text-sm hover:underline mb-8 inline-block">← Back to Blog</Link>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{post.title}</h1>
        <p className="text-gray-400 text-sm mb-10">{post.date} · {post.author}</p>
        <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <Footer />
    </>
  );
}
