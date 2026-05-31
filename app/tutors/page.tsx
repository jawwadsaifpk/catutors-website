import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import TutorCard from "@/components/TutorCard";
import Footer from "@/components/Footer";
import TutorFilters from "@/components/TutorFilters";

export const metadata: Metadata = {
  title: "Browse All Tutors in California",
  description: "Browse all verified tutors across California — LA, San Francisco, San Diego & more. Filter by subject or city.",
  alternates: { canonical: "/tutors" },
};

const PAGE_SIZE = 20;

type PageProps = {
  searchParams: Promise<{ page?: string; q?: string; subject?: string; city?: string; mode?: string }>;
};

export default async function TutorsPage({ searchParams }: PageProps) {
  const { page, q, subject, city, mode } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1") || 1);
  const query      = q?.trim() ?? "";
  const selSubject = subject?.trim() ?? "";
  const selCity    = city?.trim() ?? "";
  const selMode    = mode?.trim() ?? "";

  let tutors = await db.tutor.findMany({
    where: { status: "approved" },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  if (query) {
    const lq = query.toLowerCase();
    tutors = tutors.filter((t) => {
      const subjects = t.subjects as string[];
      const areas    = t.areas as string[];
      return (
        t.name.toLowerCase().includes(lq) ||
        t.city.toLowerCase().includes(lq) ||
        subjects.some((s) => s.toLowerCase().includes(lq)) ||
        areas.some((a) => a.toLowerCase().includes(lq))
      );
    });
  }
  if (selSubject) tutors = tutors.filter((t) => (t.subjects as string[]).some((s) => s.toLowerCase() === selSubject.toLowerCase()));
  if (selCity)    tutors = tutors.filter((t) => t.city.toLowerCase() === selCity.toLowerCase());
  if (selMode)    tutors = tutors.filter((t) => t.teachingMode?.toLowerCase() === selMode.toLowerCase());

  const totalCount    = tutors.length;
  const totalPages    = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage      = Math.min(currentPage, totalPages);
  const displayTutors = tutors.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const anyFilter     = query || selSubject || selCity || selMode;

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (query)      params.set("q",       query);
    if (selSubject) params.set("subject", selSubject);
    if (selCity)    params.set("city",    selCity);
    if (selMode)    params.set("mode",    selMode);
    if (p > 1)      params.set("page",   String(p));
    const qs = params.toString();
    return `/tutors${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-gray-400 mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <span className="text-gray-700">All Tutors</span>
          </nav>
          <h1 className="text-2xl font-extrabold text-gray-900">Browse All Tutors in California</h1>
          <p className="text-gray-500 text-sm mt-1">
            {totalCount} verified tutor{totalCount !== 1 ? "s" : ""} registered across California
          </p>
        </div>
      </div>

      <TutorFilters query={query} selSubject={selSubject} selCity={selCity} selMode={selMode} anyFilter={!!anyFilter} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {displayTutors.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl font-medium text-gray-500">No tutors found</p>
            <p className="mt-2 text-sm">Try adjusting your filters.</p>
            <Link href="/tutors" className="mt-4 inline-block text-blue-500 hover:underline text-sm">Clear filters →</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-6">
              Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, totalCount)} of {totalCount} tutors
              {selSubject ? ` in ${selSubject}` : ""}
              {selCity    ? ` · ${selCity}` : ""}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTutors.map((tutor) => (
                <TutorCard key={tutor.id} id={tutor.id} name={tutor.name}
                  subjects={tutor.subjects as string[]} areas={tutor.areas as string[]}
                  city={tutor.city} bio={tutor.bio} photoUrl={tutor.photoUrl}
                  teachingMode={tutor.teachingMode} featured={tutor.featured} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {safePage > 1 && (
                  <Link href={pageUrl(safePage - 1)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-blue-400 transition-colors">← Prev</Link>
                )}
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let p: number;
                  if (totalPages <= 7) p = i + 1;
                  else if (safePage <= 4) p = i + 1;
                  else if (safePage >= totalPages - 3) p = totalPages - 6 + i;
                  else p = safePage - 3 + i;
                  return (
                    <Link key={p} href={pageUrl(p)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${p === safePage ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:border-blue-400"}`}>
                      {p}
                    </Link>
                  );
                })}
                {safePage < totalPages && (
                  <Link href={pageUrl(safePage + 1)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-blue-400 transition-colors">Next →</Link>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
