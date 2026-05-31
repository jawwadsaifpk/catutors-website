import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import TutorCard from "@/components/TutorCard";
import Footer from "@/components/Footer";
import { CITY_SLUGS, CA_CITIES } from "@/lib/cities";

// Subject slug → display name
const SUBJECTS: Record<string, string> = {
  "mathematics":        "Mathematics",
  "calculus":           "Calculus",
  "algebra":            "Algebra",
  "statistics":         "Statistics",
  "physics":            "Physics",
  "chemistry":          "Chemistry",
  "biology":            "Biology",
  "english":            "English",
  "computer-science":   "Computer Science",
  "sat-prep":           "SAT Prep",
  "act-prep":           "ACT Prep",
  "ap-calculus-ab":     "AP Calculus AB",
  "ap-calculus-bc":     "AP Calculus BC",
  "ap-chemistry":       "AP Chemistry",
  "ap-biology":         "AP Biology",
  "ap-physics-1":       "AP Physics 1",
  "ap-english-language":"AP English Language",
  "ap-computer-science-a": "AP Computer Science A",
  "spanish":            "Spanish",
  "french":             "French",
  "python":             "Python",
  "elementary-math":    "Elementary Math",
};

const SUBJECT_INTROS: Record<string, string> = {
  Mathematics: "Mathematics is the most requested subject for tutoring in California — and for good reason. Math builds progressively, meaning a gap in an earlier concept directly causes problems later. A skilled tutor identifies exactly where the student's understanding broke down and rebuilds from there. Whether preparing for Algebra 1, Geometry, Pre-Calc, or AP Calculus, a dedicated Math tutor makes a measurable difference.",
  "SAT Prep": "The SAT is one of the most important tests a California high schooler will take. Strong SAT scores open doors to the UC system and competitive private colleges. An experienced SAT tutor knows exactly where students lose points — Reading passage strategies, Math traps, and the specific timing pressure of test day — and builds the targeted skills to overcome them.",
  "ACT Prep": "The ACT tests Math, English, Reading, and Science in a fast-paced format. Many students find the ACT's timing more demanding than the SAT. A good ACT prep tutor builds the pacing strategies and section-specific techniques that turn a middling score into a competitive one.",
  Physics: "Physics requires both mathematical ability and deep conceptual understanding simultaneously — which makes it notoriously hard to self-study. A great tutor explains the 'why' behind each formula. For AP Physics, conceptual mastery and free-response technique are both essential. One-on-one tutoring is the most effective way to build real Physics confidence.",
  Chemistry: "Chemistry covers a large volume of content — organic mechanisms, stoichiometry, thermodynamics, acid-base equilibria, and electrochemistry. Gaps accumulate fast without regular support. A Chemistry tutor helps students master the systematic problem-solving approach that keeps errors in check on exams.",
  Biology: "Biology is content-intensive — cell biology, genetics, ecology, physiology, and evolution all in one subject. A Biology tutor helps students build effective memory techniques, understand application questions, and prepare for AP Biology's data analysis style free-response questions.",
  English: "Strong writing and reading skills are the foundation of success in every subject. An English tutor who marks student essays with detailed feedback and explains how to improve produces results no classroom teacher can replicate. Reading comprehension, argument construction, and literary analysis all respond well to regular one-on-one attention.",
  "Computer Science": "Computer Science at the high school and college level blends programming (Python, Java, JavaScript) with theory — algorithms, data structures, networks, and databases. A CS tutor who actively codes in the real world teaches current best practices, debugs in real time, and keeps pace with what colleges and employers actually want.",
  Calculus: "Calculus — both AB and BC — is one of the most challenging courses high school students face. Limits, derivatives, integrals, and series all build on each other. A dedicated Calculus tutor builds deep understanding of each concept rather than rote memorization, which is exactly what the AP free-response section rewards.",
};

export const revalidate = 300;

type Props = { params: Promise<{ city: string; subject: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, subject: subjectSlug } = await params;
  const cityName    = CITY_SLUGS[citySlug.toLowerCase()];
  const subjectName = SUBJECTS[subjectSlug.toLowerCase()];
  if (!cityName || !subjectName) return { title: "Not Found" };

  const count = await db.tutor.count({
    where: { status: "approved", city: cityName, subjects: { has: subjectName } },
  });

  return {
    title: `${subjectName} Tutors in ${cityName}, CA`,
    description: `Find ${count > 0 ? count + " " : ""}verified ${subjectName} tutors in ${cityName}, California. Contact tutors directly — 100% free for students.`,
    alternates: { canonical: `/${citySlug}/${subjectSlug}` },
    robots: count === 0 ? { index: false } : { index: true },
    openGraph: {
      title: `${subjectName} Tutors in ${cityName} | catutors.com`,
      description: `Find verified ${subjectName} tutors in ${cityName}, CA. Contact them directly — free.`,
      url: `https://www.catutors.com/${citySlug}/${subjectSlug}`,
      images: [{ url: "/api/og", width: 1200, height: 630 }],
    },
  };
}

export default async function SubjectCityPage({ params }: Props) {
  const { city: citySlug, subject: subjectSlug } = await params;
  const cityName    = CITY_SLUGS[citySlug.toLowerCase()];
  const subjectName = SUBJECTS[subjectSlug.toLowerCase()];
  if (!cityName || !subjectName) notFound();

  const tutors = await db.tutor.findMany({
    where: { status: "approved", city: cityName, subjects: { has: subjectName } },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const hasTutors = tutors.length > 0;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: `${subjectName} Tutors in ${cityName}`,
        url: `https://www.catutors.com/${citySlug}/${subjectSlug}`,
        numberOfItems: tutors.length,
        itemListElement: tutors.map((tutor, index) => ({
          "@type": "ListItem", position: index + 1,
          item: { "@type": "Person", name: tutor.name, jobTitle: `${subjectName} Tutor`, url: `https://www.catutors.com/tutors/${tutor.id}`, address: { "@type": "PostalAddress", addressLocality: cityName, addressRegion: "CA", addressCountry: "US" } },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.catutors.com" },
          { "@type": "ListItem", position: 2, name: `Tutors in ${cityName}`, item: `https://www.catutors.com/${citySlug}` },
          { "@type": "ListItem", position: 3, name: `${subjectName} Tutors in ${cityName}`, item: `https://www.catutors.com/${citySlug}/${subjectSlug}` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:underline">All California</Link>
            <span>›</span>
            <Link href={`/${citySlug}`} className="hover:underline">{cityName}</Link>
            <span>›</span>
            <span className="text-white">{subjectName}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">
            {subjectName} Tutors in {cityName}, CA
          </h1>
          <p className="text-blue-200 text-lg">
            {hasTutors
              ? `${tutors.length} verified ${subjectName} tutor${tutors.length !== 1 ? "s" : ""} in ${cityName} — contact them directly. Free.`
              : `Be the first ${subjectName} tutor listed in ${cityName} — register free today!`}
          </p>
          <div className="mt-8 inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
            <span className="text-blue-100 text-sm">Teach {subjectName} in {cityName}?</span>
            <Link href="/register" className="inline-block px-4 py-2 bg-white text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors">
              Register Free →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {hasTutors && (
          <div className="mb-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-2">{subjectName} Tutors in {cityName}</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              {SUBJECT_INTROS[subjectName] ?? `Looking for a ${subjectName} tutor in ${cityName}, CA? Browse our verified ${subjectName} tutors below and connect directly.`}
            </p>
            <p className="text-sm text-blue-700 font-medium">
              {tutors.length} verified {subjectName} tutor{tutors.length !== 1 ? "s" : ""} in {cityName} — contact any tutor directly by phone. Free.
            </p>
          </div>
        )}

        {!hasTutors && (
          <div className="text-center py-20">
            <p className="text-6xl mb-6">📚</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No {subjectName} tutors in {cityName} yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Be the first {subjectName} tutor listed here — register free and start connecting with students.
            </p>
            <Link href="/register" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-lg">
              Register as a {subjectName} Tutor →
            </Link>
            <div className="mt-8">
              <Link href={`/${citySlug}`} className="text-blue-500 hover:underline text-sm">← Browse all tutors in {cityName}</Link>
            </div>
          </div>
        )}

        {hasTutors && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700">{tutors.length} {subjectName} tutor{tutors.length !== 1 ? "s" : ""} in {cityName}, CA</h2>
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

        {/* Cross-city links */}
        <div className="mt-14">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Find {subjectName} Tutors in Other Cities
          </h2>
          <div className="flex flex-wrap gap-2">
            {CA_CITIES.filter((c) => c !== cityName).map((city) => {
              const slug = city.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link key={slug} href={`/${slug}/${subjectSlug}`}
                  className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-medium bg-white hover:border-blue-400 transition-colors">
                  {subjectName} tutors in {city}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
