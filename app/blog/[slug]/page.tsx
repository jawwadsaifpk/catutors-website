import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllPosts, type BlogSection } from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.description, alternates: { canonical: `/blog/${slug}` } };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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
          {section.caption && <figcaption className="text-center text-sm text-gray-400 mt-2">{section.caption}</figcaption>}
        </figure>
      );
  }
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
        <p className="text-gray-400 text-sm mb-10">{post.date} · {post.readTime} read</p>
        <div>
          {post.sections.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
