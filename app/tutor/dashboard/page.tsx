export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { logoutTutor } from "@/app/actions/tutor-auth";

function timeAgo(date: Date): string {
  const h = Math.floor((Date.now() - date.getTime()) / 3600000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

type Props = { searchParams: Promise<{ tab?: string }> };

export default async function TutorDashboardPage({ searchParams }: Props) {
  const { tab } = await searchParams;
  const activeTab = tab ?? "jobs";

  const cookieStore = await cookies();
  const raw = cookieStore.get("tutor_session")?.value;
  if (!raw) redirect("/tutor/login");

  const tutorId = parseInt(raw);
  const tutor = await db.tutor.findUnique({ where: { id: tutorId } });
  if (!tutor) redirect("/tutor/login");

  if (tutor.status !== "approved") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <p className="text-4xl mb-4">⏳</p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Account Under Review</h1>
          <p className="text-gray-500 text-sm mb-6">Your profile is being reviewed and will be approved within 24 hours.</p>
          <form action={logoutTutor}>
            <button type="submit" className="text-sm text-gray-400 hover:text-red-500 hover:underline">Log out</button>
          </form>
        </div>
      </div>
    );
  }

  const subjects = tutor.subjects as string[];

  // Open leads matching this tutor's subjects
  const openLeads = await db.lead.findMany({
    where: { status: "open", subject: { in: subjects } },
    orderBy: { createdAt: "desc" },
  });

  // All leads (for browsing)
  const allLeads = await db.lead.findMany({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Hi, {tutor.name} 👋</h1>
            <p className="text-gray-500 text-sm mt-0.5">{tutor.email}</p>
          </div>
          <div className="flex gap-3 items-center">
            <span className="bg-green-100 text-green-800 font-bold px-3 py-1.5 rounded-full text-sm">🆓 Free Access</span>
            <form action={logoutTutor}>
              <button type="submit" className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors text-sm">Log Out</button>
            </form>
          </div>
        </div>

        {/* Free model notice */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 text-sm text-blue-800">
          🎉 <strong>Platform is free during launch.</strong> Browse all student requests and contact them directly — no cost.
        </div>

        {/* Tab nav */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[{ key: "jobs", label: "Matching Jobs" }, { key: "all", label: "All Jobs" }, { key: "profile", label: "My Profile" }].map(({ key, label }) => (
            <a key={key} href={`/tutor/dashboard?tab=${key}`}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeTab === key ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400"}`}>
              {label}
            </a>
          ))}
        </div>

        {/* Tab: Matching Jobs */}
        {activeTab === "jobs" && (
          <section>
            <p className="text-gray-500 text-sm mb-4">Matching your subjects: <strong>{subjects.join(", ")}</strong></p>
            {openLeads.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📋</p>
                <p className="font-medium text-gray-500">No matching requests yet</p>
                <p className="text-sm mt-1">New requests come in daily — check back soon.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {openLeads.map((lead) => (
                  <div key={lead.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{lead.subject}</span>
                          <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">{lead.classLevel}</span>
                          {lead.mode && <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full">{lead.mode}</span>}
                        </div>
                        <p className="text-gray-700 text-sm font-medium">📍 {lead.area}{lead.city ? `, ${lead.city}` : ""}</p>
                        {lead.budget && <p className="text-gray-400 text-xs mt-1">Budget: {lead.budget}</p>}
                        {/* Show contact info directly — free model */}
                        <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                          <p className="text-sm font-semibold text-gray-800">👤 {lead.studentName}</p>
                          <a href={`tel:${lead.studentPhone}`} className="text-sm text-blue-700 font-medium hover:underline">📞 {lead.studentPhone}</a>
                        </div>
                        <p className="text-gray-400 text-xs mt-2">{timeAgo(lead.createdAt)}</p>
                      </div>
                      <Link href={`/jobs/${lead.id}`} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Tab: All Jobs */}
        {activeTab === "all" && (
          <section>
            <p className="text-gray-500 text-sm mb-4">{allLeads.length} open requests across all subjects.</p>
            {allLeads.length === 0 ? (
              <p className="text-center text-gray-400 py-16">No open requests right now.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {allLeads.map((lead) => (
                  <div key={lead.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{lead.subject}</span>
                          <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">{lead.classLevel}</span>
                        </div>
                        <p className="text-gray-700 text-sm font-medium">📍 {lead.area}{lead.city ? `, ${lead.city}` : ""}</p>
                        <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                          <p className="text-sm font-semibold text-gray-800">👤 {lead.studentName}</p>
                          <a href={`tel:${lead.studentPhone}`} className="text-sm text-blue-700 font-medium hover:underline">📞 {lead.studentPhone}</a>
                        </div>
                      </div>
                      <Link href={`/jobs/${lead.id}`} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Tab: My Profile */}
        {activeTab === "profile" && (
          <section>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">My Profile</h2>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">✓ Approved</span>
              </div>
              <dl className="flex flex-col gap-4 text-sm">
                {[
                  ["Name",          tutor.name],
                  ["Email",         tutor.email],
                  ["Phone",         tutor.phone],
                  ["City",          tutor.city],
                  ["Subjects",      (tutor.subjects as string[]).join(", ")],
                  ["Areas",         (tutor.areas as string[]).join(", ")],
                  ["Teaching Mode", tutor.teachingMode ?? "—"],
                  ["Experience",    tutor.experience ?? "—"],
                  ["Qualification", tutor.qualification ?? "—"],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex gap-4">
                    <dt className="w-36 text-gray-400 flex-shrink-0">{label}</dt>
                    <dd className="text-gray-800 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                <Link href={`/tutors/${tutor.id}`} target="_blank" className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-xl hover:bg-blue-100 transition-colors">
                  View Live Profile →
                </Link>
                <p className="text-xs text-gray-400 self-center">
                  To update your profile, email <a href="mailto:hello@catutors.com" className="underline">hello@catutors.com</a>
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
