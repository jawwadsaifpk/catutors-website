import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";

const subjectColors: Record<string, string> = {
  Mathematics:      "bg-blue-100 text-blue-800",
  Calculus:         "bg-blue-100 text-blue-800",
  Physics:          "bg-purple-100 text-purple-800",
  Chemistry:        "bg-green-100 text-green-800",
  Biology:          "bg-emerald-100 text-emerald-800",
  English:          "bg-yellow-100 text-yellow-800",
  "SAT Prep":       "bg-orange-100 text-orange-800",
  "ACT Prep":       "bg-orange-100 text-orange-800",
  "Computer Science": "bg-indigo-100 text-indigo-800",
  Statistics:       "bg-cyan-100 text-cyan-800",
};
const defaultColor = "bg-gray-100 text-gray-700";

function subjectToSlug(subject: string): string {
  return subject.toLowerCase().replace(/\s+/g, "-");
}

function Stars({ rating, size = "text-lg" }: { rating: number; size?: string }) {
  return (
    <span className={`${size} leading-none`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
      ))}
    </span>
  );
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tutor = await db.tutor.findUnique({ where: { id: parseInt(id) } });
  if (!tutor) return { title: "Tutor Not Found" };

  const subjectsList = (tutor.subjects as string[]).join(", ");
  const bioSnippet = tutor.bio.length > 120 ? tutor.bio.slice(0, 120) + "…" : tutor.bio;

  return {
    title: `${tutor.name} — ${subjectsList} Tutor in ${tutor.city}, CA`,
    description: `${tutor.name} is a tutor in ${tutor.city}, CA teaching ${subjectsList}. ${bioSnippet}`,
    alternates: { canonical: `/tutors/${tutor.id}` },
    openGraph: {
      title: `${tutor.name} — ${subjectsList} Tutor in ${tutor.city} | catutors.com`,
      description: `Contact ${tutor.name} directly — ${subjectsList} tutor in ${tutor.city}, CA.`,
      url: `https://www.catutors.com/tutors/${tutor.id}`,
      images: [{ url: "https://www.catutors.com/api/og", width: 1200, height: 630 }],
    },
  };
}

export default async function TutorDetailPage({ params }: Props) {
  const { id } = await params;
  const tutor = await db.tutor.findUnique({
    where: { id: parseInt(id) },
    include: { reviews: { where: { status: "approved" }, orderBy: { createdAt: "desc" } } },
  });
  if (!tutor) notFound();

  const citySlug    = tutor.city.toLowerCase().replace(/\s+/g, "-");
  const subjects    = tutor.subjects    as string[];
  const areas       = tutor.areas       as string[];
  const classLevels = (tutor.classLevels as string[] | null) ?? [];

  const avgRating = tutor.reviews.length > 0
    ? tutor.reviews.reduce((sum, r) => sum + r.rating, 0) / tutor.reviews.length
    : 0;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: tutor.name,
        jobTitle: `${subjects.join(", ")} Tutor`,
        address: { "@type": "PostalAddress", addressLocality: tutor.city, addressRegion: "CA", addressCountry: "US" },
        knowsAbout: subjects,
        areaServed: areas,
        url: `https://www.catutors.com/tutors/${tutor.id}`,
        description: tutor.bio,
        ...(avgRating > 0 && {
          aggregateRating: { "@type": "AggregateRating", ratingValue: avgRating.toFixed(1), reviewCount: tutor.reviews.length, bestRating: 5, worstRating: 1 },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.catutors.com" },
          { "@type": "ListItem", position: 2, name: `Tutors in ${tutor.city}`, item: `https://www.catutors.com/${citySlug}` },
          { "@type": "ListItem", position: 3, name: tutor.name, item: `https://www.catutors.com/tutors/${tutor.id}` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link href={`/${citySlug}`} className="hover:text-blue-600">Tutors in {tutor.city}</Link>
            <span>›</span>
            <span className="text-gray-700 font-medium">{tutor.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/* Profile header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start gap-6 mb-6">
            {tutor.photoUrl ? (
              <img src={tutor.photoUrl} alt={`Photo of ${tutor.name}`} className="w-24 h-24 rounded-full object-cover border-4 border-blue-100" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                {tutor.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                {tutor.name}
                <span className="block text-lg font-medium text-gray-500 mt-1">
                  {subjects.join(" & ")} Tutor in {tutor.city}, CA
                </span>
              </h1>
              {avgRating > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <Stars rating={avgRating} />
                  <span className="text-sm text-gray-500">{avgRating.toFixed(1)} ({tutor.reviews.length} {tutor.reviews.length === 1 ? "review" : "reviews"})</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Subjects</p>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <span key={subject} className={`px-3 py-1 rounded-full text-sm font-medium ${subjectColors[subject] ?? defaultColor}`}>{subject}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Areas</p>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <span key={area} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-50 text-gray-600 border border-gray-200">📍 {area}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        {(tutor.gender || tutor.teachingMode || tutor.availability || tutor.qualification || tutor.experience || classLevels.length > 0) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Tutor Details</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tutor.gender       && <div><dt className="text-xs text-gray-400 uppercase tracking-wide font-medium">Gender</dt><dd className="mt-1 text-gray-700 text-sm">{tutor.gender}</dd></div>}
              {tutor.teachingMode && <div><dt className="text-xs text-gray-400 uppercase tracking-wide font-medium">Teaching Mode</dt><dd className="mt-1 text-gray-700 text-sm">{tutor.teachingMode}</dd></div>}
              {tutor.experience   && <div><dt className="text-xs text-gray-400 uppercase tracking-wide font-medium">Experience</dt><dd className="mt-1 text-gray-700 text-sm">{tutor.experience}</dd></div>}
              {tutor.qualification && <div><dt className="text-xs text-gray-400 uppercase tracking-wide font-medium">Qualification</dt><dd className="mt-1 text-gray-700 text-sm">{tutor.qualification}</dd></div>}
              {tutor.availability && <div><dt className="text-xs text-gray-400 uppercase tracking-wide font-medium">Availability</dt><dd className="mt-1 text-gray-700 text-sm">{tutor.availability}</dd></div>}
              {classLevels.length > 0 && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Grade Levels</dt>
                  <dd className="flex flex-wrap gap-2">
                    {classLevels.map((level) => (
                      <span key={level} className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-100">{level}</span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {/* About */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{tutor.bio}</p>
        </div>

        {/* Contact CTA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Interested in {tutor.name}?</h2>
          <p className="text-gray-500 text-sm mb-5">
            Post your request free — {tutor.name} and other verified tutors will contact you directly.
          </p>
          <Link href={`/request?tutorId=${tutor.id}`}
            className="w-full text-center block px-5 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            Post a Request — Free →
          </Link>
          <p className="text-xs text-gray-400 mt-4 text-center">No registration required. Tutors contact you directly.</p>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Reviews {tutor.reviews.length > 0 && `(${tutor.reviews.length})`}</h2>
            {avgRating > 0 && (
              <div className="flex items-center gap-2">
                <Stars rating={avgRating} size="text-xl" />
                <span className="text-lg font-bold text-gray-800">{avgRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {tutor.reviews.length > 0 ? (
            <div className="flex flex-col divide-y divide-gray-100 mb-8">
              {tutor.reviews.map((review) => (
                <div key={review.id} className="py-5 first:pt-0">
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{review.reviewerName}</p>
                      {review.classLevel && <p className="text-xs text-gray-400">{review.classLevel}</p>}
                    </div>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.reviewText}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-8">No reviews yet. Be the first to leave one!</p>
          )}

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Write a Review</h3>
            <ReviewForm tutorId={tutor.id} />
          </div>
        </div>

        {/* Find more tutors */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Find More {tutor.city} Tutors</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${citySlug}`} className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors">
              All tutors in {tutor.city}
            </Link>
            {subjects.map((subject) => (
              <Link key={subject} href={`/${citySlug}/${subjectToSlug(subject)}`}
                className="px-4 py-2 rounded-full bg-gray-50 text-gray-700 text-sm font-medium border border-gray-200 hover:border-blue-400 transition-colors">
                {subject} tutors in {tutor.city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
