// Jobs page — free model: all approved tutors see student contact info directly
export const revalidate = 30;

import { db } from "@/lib/db";
import { getTutorSession } from "@/lib/session";
import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Open Tutoring Requests",
  description: "Browse open tutoring requests from students across California. Free for all approved tutors.",
  robots: { index: false },
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default async function JobsPage() {
  const tutor = await getTutorSession();

  const leads = await db.lead.findMany({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-10">

          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Open Tutoring Requests</h1>
          <p className="text-gray-500 mb-2">
            Students looking for tutors across California.{" "}
            {!tutor && (
              <>
                <Link href="/tutor/login" className="text-blue-600 hover:underline">Log in</Link>
                {" "}or{" "}
                <Link href="/register" className="text-blue-600 hover:underline">register</Link>
                {" "}to see full contact details.
              </>
            )}
          </p>

          {/* Free model notice */}
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-sm text-green-800">
            🎉 <strong>Currently free</strong> — approved tutors can contact students directly at no cost.
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">📋</p>
              <p className="text-xl font-medium text-gray-500">No open requests right now</p>
              <p className="mt-2 text-sm">Check back soon — new requests come in daily.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{lead.subject}</span>
                        <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{lead.classLevel}</span>
                        {lead.mode && <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">{lead.mode}</span>}
                      </div>
                      <p className="text-gray-800 font-semibold">📍 {lead.area}{lead.city ? `, ${lead.city}` : ""}</p>
                      {lead.budget && <p className="text-gray-500 text-sm mt-1">Budget: {lead.budget}</p>}
                      {lead.notes && <p className="text-gray-500 text-sm mt-1 line-clamp-1">{lead.notes}</p>}

                      {/* Show contact info only to logged-in approved tutors */}
                      {tutor && (
                        <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 flex flex-col gap-1">
                          <p className="text-sm font-semibold text-gray-800">👤 {lead.studentName}</p>
                          <p className="text-sm text-blue-700 font-medium">📞 {lead.studentPhone}</p>
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end gap-2">
                      <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Free</span>
                      <p className="text-gray-400 text-xs">{timeAgo(lead.createdAt)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href={`/jobs/${lead.id}`} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
