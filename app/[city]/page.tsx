import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import TutorCard from "@/components/TutorCard";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { CITY_SLUGS } from "@/lib/cities";

const SUBJECT_LINKS = [
  { slug: "mathematics",      label: "Mathematics"      },
  { slug: "calculus",         label: "Calculus"         },
  { slug: "sat-prep",         label: "SAT Prep"         },
  { slug: "act-prep",         label: "ACT Prep"         },
  { slug: "physics",          label: "Physics"          },
  { slug: "chemistry",        label: "Chemistry"        },
  { slug: "biology",          label: "Biology"          },
  { slug: "english",          label: "English"          },
  { slug: "computer-science", label: "Computer Science" },
  { slug: "ap-calculus-ab",   label: "AP Calculus AB"   },
  { slug: "ap-chemistry",     label: "AP Chemistry"     },
  { slug: "ap-biology",       label: "AP Biology"       },
  { slug: "statistics",       label: "Statistics"       },
];

export const revalidate = 300;

type CityPageProps = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const cityName = CITY_SLUGS[slug.toLowerCase()];
  if (!cityName) return { title: "City Not Found" };

  const tutorCount = await db.tutor.count({ where: { status: "approved", city: cityName } });

  return {
    title: `Tutors in ${cityName}, CA`,
    description: `Find verified tutors in ${cityName}, California. Browse by subject — Math, SAT Prep, AP courses, Physics, Chemistry & more. Contact tutors directly. Free for students.`,
    alternates: { canonical: `/${slug}` },
    robots: tutorCount === 0 ? { index: false } : { index: true },
    openGraph: {
      title: `Tutors in ${cityName}, CA | catutors.com`,
      description: `Find verified tutors in ${cityName}, California. Browse by subject and contact tutors directly — 100% free.`,
      url: `https://www.catutors.com/${slug}`,
      images: [{ url: "https://www.catutors.com/api/og", width: 1200, height: 630, alt: `Tutors in ${cityName} — catutors.com` }],
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: slug } = await params;
  const cityName = CITY_SLUGS[slug.toLowerCase()];
  if (!cityName) notFound();

  const tutors = await db.tutor.findMany({
    where: { status: "approved", city: cityName },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const hasTutors = tutors.length > 0;

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.catutors.com" },
      { "@type": "ListItem", position: 2, name: `Tutors in ${cityName}`, item: `https://www.catutors.com/${slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `How do I find a tutor in ${cityName}?`, acceptedAnswer: { "@type": "Answer", text: `Browse verified tutors in ${cityName} on catutors.com. Filter by subject, view profiles, and contact tutors directly by phone — no fees.` } },
      { "@type": "Question", name: `How much does a tutor cost in ${cityName}?`, acceptedAnswer: { "@type": "Answer", text: `Tutoring rates in ${cityName} vary by subject and grade level. Most tutors charge between $40 and $120 per hour. Contact tutors directly to discuss rates.` } },
      { "@type": "Question", name: `What subjects can I find tutors for in ${cityName}?`, acceptedAnswer: { "@type": "Answer", text: `catutors.com has tutors in ${cityName} for Mathematics, SAT/ACT Prep, AP courses, Physics, Chemistry, Biology, English, Computer Science, and more.` } },
      { "@type": "Question", name: `Are the tutors in ${cityName} verified?`, acceptedAnswer: { "@type": "Answer", text: `Yes — every tutor profile on catutors.com is manually reviewed by our team before it goes live.` } },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:underline">All California</Link>
            <span>›</span>
            <span className="text-white">{cityName}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-2 mb-3 tracking-tight">
            Tutors in {cityName}, CA
          </h1>
          <p className="text-blue-200 text-lg">
            {hasTutors
              ? `Browse ${tutors.length} verified tutor${tutors.length !== 1 ? "s" : ""} in ${cityName} — contact them directly. Free.`
              : `Be the first tutor listed in ${cityName} — register free today!`}
          </p>
          <div className="mt-8 inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
            <span className="text-blue-100 text-sm">Are you a tutor in {cityName}?</span>
            <Link href="/register" className="inline-block px-4 py-2 bg-white text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors">
              Register Free →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Subject filters */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Browse by Subject in {cityName}</h2>
          <div className="flex flex-wrap gap-2">
            {SUBJECT_LINKS.map(({ slug: subSlug, label }) => (
              <Link key={subSlug} href={`/${slug}/${subSlug}`}
                className="px-4 py-2 rounded-full border border-blue-200 text-blue-700 text-sm font-medium bg-blue-50 hover:bg-blue-100 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {!hasTutors && (
          <div className="text-center py-16">
            <p className="text-6xl mb-6">🏙️</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Coming Soon in {cityName}!</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We&apos;re growing fast! No tutors yet in {cityName}, but tutors can register now for free.
            </p>
            <Link href="/register" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-lg">
              Register as a Tutor in {cityName} →
            </Link>
            <div className="mt-8">
              <Link href="/" className="text-blue-500 hover:underline text-sm">← Browse all California tutors</Link>
            </div>
          </div>
        )}

        {hasTutors && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700">{tutors.length} tutor{tutors.length !== 1 ? "s" : ""} in {cityName}, CA</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <TutorCard key={tutor.id} id={tutor.id} name={tutor.name}
                  subjects={tutor.subjects as string[]} areas={tutor.areas as string[]}
                  city={tutor.city} bio={tutor.bio} teachingMode={tutor.teachingMode} featured={tutor.featured} />
              ))}
            </div>
          </>
        )}

        {hasTutors && (
          <div className="mt-20 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">FAQ — Tutors in {cityName}</h2>
            <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              {[
                { q: `How do I find a tutor in ${cityName}?`, a: `Browse the verified tutors above. View their profile, subjects, and areas, then contact them directly by phone — completely free.` },
                { q: `How much does a tutor cost in ${cityName}?`, a: `Rates vary by subject and level. Most tutors in ${cityName} charge $40–$120/hr. Contact tutors directly to discuss rates.` },
                { q: `What subjects can I find tutors for in ${cityName}?`, a: `We have tutors for Mathematics, SAT/ACT Prep, AP courses, Physics, Chemistry, Biology, English, Computer Science, and more.` },
                { q: `Are the tutors in ${cityName} verified?`, a: `Yes — every profile is manually reviewed before going live. No tutor appears without approval.` },
              ].map(({ q, a }) => (
                <details key={q} className="group px-6 py-4 cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-gray-800 list-none">
                    {q}
                    <span className="ml-4 text-blue-500 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
