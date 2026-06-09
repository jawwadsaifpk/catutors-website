import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import TutorCard from "@/components/TutorCard";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import { CA_CITIES } from "@/lib/cities";
import { getAllNews } from "@/lib/news-posts";

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export const revalidate = 60;

const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Verified Tutors",
    desc: "Every tutor profile is manually reviewed by our team before going live.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "100% Free",
    desc: "Completely free for students and tutors during our launch. No hidden fees.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "Direct Contact",
    desc: "Connect with tutors directly by phone — no booking agents, no commissions.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "All California",
    desc: "Los Angeles, San Francisco, San Diego, Sacramento, San Jose & more.",
  },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Post Your Request — Free", desc: "Subject, grade level, area, and your phone number — takes 2 minutes. No account needed." },
  { step: "2", title: "Tutors See Your Post", desc: "Verified California tutors browse job requests and contact you directly." },
  { step: "3", title: "Tutor Contacts You", desc: "The tutor calls or texts you directly — 100% free for students and parents." },
];

type HomePageProps = {
  searchParams: Promise<{ q?: string; city?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q, city } = await searchParams;
  const query = q?.trim() ?? "";
  const selectedCity = city?.trim() ?? "";
  const isFiltered = !!(query || selectedCity);

  const latestJobs = await db.lead.findMany({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
    take: 4,
    select: { id: true, subject: true, classLevel: true, area: true, city: true, mode: true, createdAt: true },
  });

  let tutors = await db.tutor.findMany({
    where: {
      status: "approved",
      ...(selectedCity ? { city: selectedCity } : {}),
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: isFiltered ? undefined : 7,
  });

  if (query) {
    const lowerQuery = query.toLowerCase();
    tutors = tutors.filter((tutor) => {
      const subjects = tutor.subjects as string[];
      const areas = tutor.areas as string[];
      return (
        tutor.name.toLowerCase().includes(lowerQuery) ||
        tutor.city.toLowerCase().includes(lowerQuery) ||
        subjects.some((s) => s.toLowerCase().includes(lowerQuery)) ||
        areas.some((a) => a.toLowerCase().includes(lowerQuery))
      );
    });
  }

  const hasMore = !isFiltered && tutors.length === 7;
  const displayTutors = hasMore ? tutors.slice(0, 6) : tutors;
  const isComingSoon = selectedCity !== "" && tutors.length === 0 && !query;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 text-white py-20 px-4 overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-16 w-72 h-72 bg-blue-400 opacity-15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 right-1/4 w-48 h-48 bg-amber-400 opacity-10 rounded-full blur-2xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-blue-200 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Verified tutors across California — 100% free
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight leading-tight text-balance">
            Find the Right Tutor in California —{" "}
            <span className="text-amber-400">Within 24 Hours</span>
          </h1>

          <Suspense fallback={<div className="h-16 animate-pulse rounded-2xl bg-white/10" />}>
            <SearchBar />
          </Suspense>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/request" className="px-7 py-3.5 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/30 hover:shadow-xl">
              Post Your Request — Free →
            </Link>
            <Link href="/tutors" className="px-7 py-3.5 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
              Browse All Tutors
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Jobs (for tutors) */}
      {latestJobs.length > 0 && (
        <div className="bg-gray-50 border-b border-gray-200 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-green-600 mb-1">Are you a tutor?</p>
                <h2 className="text-2xl font-extrabold text-gray-900">Latest Student Requests</h2>
                <p className="text-gray-500 text-sm mt-1">Register free and start connecting with students today.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {latestJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-base font-bold text-gray-900">{job.subject}</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{timeAgo(job.createdAt)}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <span>📚 {job.classLevel}</span>
                    <span>📍 {job.area}{job.city ? `, ${job.city}` : ""}</span>
                    {job.mode && <span>🏠 {job.mode}</span>}
                  </div>
                  <Link href={`/jobs/${job.id}`} className="mt-auto w-full text-center py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">
                    View Request →
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-5 text-center">
              <Link href="/jobs" className="text-green-700 font-semibold text-sm hover:underline">Browse all open requests →</Link>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 pt-14 pb-10 text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-2">Trusted by California families</p>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-10">Why catutors.com?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white border-t-4 border-t-blue-500">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shadow-sm">{icon}</div>
                <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-300 mb-2">For Students</p>
          <h2 className="text-3xl font-extrabold mb-2">How It Works</h2>
          <p className="text-blue-200 text-base mb-12">Free for students — no account, no registration, no fee</p>
          <div className="flex flex-col gap-6 text-left">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5 items-start bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="w-10 h-10 rounded-full bg-white text-blue-700 flex items-center justify-center text-base font-black shadow flex-shrink-0 mt-0.5">{step}</div>
                <div>
                  <p className="font-bold text-white text-base">{title}</p>
                  <p className="text-blue-100 text-sm mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/request" className="mt-10 inline-block px-8 py-3.5 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-400 transition-colors text-base shadow-lg">
            Post a Request — Free →
          </Link>
        </div>
      </div>

      {/* Students vs Tutors */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-2 text-center">Students &amp; Tutors</p>
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-3">Who Is This For?</h2>
        <p className="text-center text-gray-500 mb-12">Whether you need a tutor or want to teach — we have you covered.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white overflow-hidden shadow-lg">
            <div className="pointer-events-none absolute -right-6 -top-6 text-9xl opacity-10 select-none">👨‍🎓</div>
            <h3 className="text-xl font-bold mb-5">For Students &amp; Parents</h3>
            <ul className="flex flex-col gap-3 text-sm text-blue-100">
              {[
                "Find verified tutors in your neighborhood instantly",
                "Browse profiles by subject — Math, SAT Prep, AP courses & more",
                "Contact tutors directly — no agency or booking fee",
                "All grade levels: Elementary through College",
                "In-person or online — your choice",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/request" className="mt-7 inline-block px-5 py-2.5 bg-white text-blue-700 text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md">
              Post a Request →
            </Link>
          </div>

          <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white overflow-hidden shadow-lg">
            <div className="pointer-events-none absolute -right-6 -top-6 text-9xl opacity-10 select-none">📚</div>
            <h3 className="text-xl font-bold mb-5">For Tutors</h3>
            <ul className="flex flex-col gap-3 text-sm text-orange-100">
              {[
                "Free registration — no subscription, no commission on lessons",
                "Your own profile page on catutors.com",
                "Browse student job requests and connect directly",
                "Appear in Google searches for your subject & city",
                "Profile reviewed and live within 24 hours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-7 inline-block px-5 py-2.5 bg-white text-orange-600 text-sm font-bold rounded-lg hover:bg-orange-50 transition-colors shadow-md">
              Register Free →
            </Link>
          </div>
        </div>
      </div>

      {/* Tutor Results */}
      <div id="results" className="max-w-6xl mx-auto px-4 py-12">
        {isComingSoon ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-6">🏙️</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Coming Soon in {selectedCity}!</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We haven&apos;t launched in {selectedCity} yet — tutors can register now for free.
            </p>
            <Link href="/register" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Register as a Tutor in {selectedCity} →
            </Link>
            <div className="mt-6">
              <Link href="/" className="text-blue-500 hover:underline text-sm">← View all tutors</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              {displayTutors.length === 0 ? (
                <h2 className="text-lg font-semibold text-gray-700">No tutors found</h2>
              ) : isFiltered ? (
                <h2 className="text-lg font-semibold text-gray-700">
                  {displayTutors.length} tutor{displayTutors.length !== 1 ? "s" : ""} found
                  {selectedCity ? ` in ${selectedCity}` : ""}
                  {query ? ` for "${query}"` : ""}
                </h2>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    {hasMore ? "Latest 6 tutors" : `${displayTutors.length} tutor${displayTutors.length !== 1 ? "s" : ""} registered`}
                  </h2>
                  {hasMore && (
                    <p className="text-sm text-gray-400 mt-1">
                      Search above or{" "}
                      <Link href="/tutors" className="text-blue-500 hover:underline">browse all tutors →</Link>
                    </p>
                  )}
                </div>
              )}
            </div>

            {displayTutors.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-xl font-medium text-gray-500">No tutors found</p>
                <p className="mt-2">Try a different subject, area, or city.</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTutors.map((tutor) => (
                <TutorCard key={tutor.id} id={tutor.id} name={tutor.name}
                  subjects={tutor.subjects as string[]} areas={tutor.areas as string[]}
                  city={tutor.city} bio={tutor.bio} teachingMode={tutor.teachingMode} featured={tutor.featured} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Browse by City */}
      <div className="bg-white py-16 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-2">Find a tutor near you</p>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Browse Tutors by City</h2>
          <p className="text-gray-500 text-sm mb-8">California&apos;s tutor directory — every tutor manually verified before going live.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {CA_CITIES.map((city) => {
              const slug = city.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link key={slug} href={`/${slug}`}
                  className="px-5 py-2 rounded-full border border-blue-200 text-blue-700 text-sm font-medium bg-blue-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 transition-all duration-200 shadow-sm">
                  Tutors in {city}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Latest California Education News */}
      {(() => {
        const latestNews = getAllNews().slice(0, 3);
        return (
          <div className="max-w-5xl mx-auto px-4 py-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-1">California Education</p>
                <h2 className="text-2xl font-extrabold text-gray-900">Latest News & Updates</h2>
              </div>
              <Link href="/news" className="text-blue-600 text-sm font-medium hover:underline hidden sm:block">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {latestNews.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <p className="text-xs font-semibold text-blue-600 mb-2">{post.category}</p>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-gray-400">{post.date}</p>
                </Link>
              ))}
            </div>
            <div className="mt-4 sm:hidden text-center">
              <Link href="/news" className="text-blue-600 text-sm font-medium hover:underline">
                View all California education news →
              </Link>
            </div>
          </div>
        );
      })()}

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-2 text-center">Common questions</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>

        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "How do I find a tutor in California?", acceptedAnswer: { "@type": "Answer", text: "Search by subject or area on catutors.com. Browse verified tutors across LA, San Francisco, San Diego and more — view profiles and contact tutors directly by phone. 100% free." } },
              { "@type": "Question", name: "How much does a tutor cost in California?", acceptedAnswer: { "@type": "Answer", text: "Tutoring rates in California vary by subject and grade level. Most tutors charge between $40 and $120 per hour. Contact tutors directly to discuss rates." } },
              { "@type": "Question", name: "What subjects can I find tutors for?", acceptedAnswer: { "@type": "Answer", text: "catutors.com has tutors for Mathematics, SAT/ACT Prep, AP courses, Physics, Chemistry, Biology, English, Computer Science, and more." } },
              { "@type": "Question", name: "Are the tutors on catutors.com verified?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every tutor profile is manually reviewed by our team before it appears on the site." } },
              { "@type": "Question", name: "How do I register as a tutor on catutors.com?", acceptedAnswer: { "@type": "Answer", text: "Click Register Free, fill in your subjects, areas, and a short bio. Your profile will be reviewed and published within 24 hours — completely free." } },
            ],
          }),
        }} />

        <div className="flex flex-col gap-3">
          {[
            { q: "How do I find a tutor in California?", a: "Search by subject or area using the search box above. Browse verified tutors, view their profile, and contact them directly by phone — no booking agent needed. Completely free." },
            { q: "How much does a tutor cost in California?", a: "Rates vary by subject and grade level. Most tutors in California charge $40–$120 per hour. Contact tutors directly to discuss and agree on a rate." },
            { q: "What subjects can I find tutors for?", a: "We have tutors for Mathematics, SAT/ACT Prep, AP courses, Physics, Chemistry, Biology, English, Computer Science, and many more." },
            { q: "Are the tutors verified?", a: "Yes — every profile is manually reviewed by our team before it appears on the site. No profile goes live without approval." },
            { q: "How do I register as a tutor?", a: "Click Register Free above, fill in your subjects, areas, and a short bio. Your profile will be live within 24 hours — free, no subscription, no commission on lessons." },
          ].map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-xl border-l-4 border-l-blue-500 overflow-hidden cursor-pointer hover:bg-blue-50 transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 font-semibold text-gray-800 list-none">
                {q}
                <span className="ml-4 text-blue-500 group-open:rotate-45 transition-transform text-xl leading-none flex-shrink-0">+</span>
              </summary>
              <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": "https://www.catutors.com/#organization", name: "catutors.com", url: "https://www.catutors.com", description: "California's tutor directory — find verified tutors across LA, San Francisco, San Diego and more. Free for families and tutors.", areaServed: "US-CA" },
            { "@type": "WebSite", "@id": "https://www.catutors.com/#website", url: "https://www.catutors.com", name: "catutors.com", publisher: { "@id": "https://www.catutors.com/#organization" }, potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://www.catutors.com/?q={search_term_string}" }, "query-input": "required name=search_term_string" } },
          ],
        }),
      }} />

      <Footer />
    </div>
  );
}
