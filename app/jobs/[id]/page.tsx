export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getTutorSession } from "@/lib/session";
import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import Footer from "@/components/Footer";

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const lead = await db.lead.findUnique({ where: { id: parseInt(id) } });
  if (!lead) return { title: "Request Not Found" };
  return { title: `${lead.subject} Tutor Needed in ${lead.area}`, robots: { index: false } };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;

  const lead = await db.lead.findUnique({ where: { id: parseInt(id) } });
  if (!lead) notFound();

  const tutor = await getTutorSession();
  const isFilled = lead.status === "filled";

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-10">

          <Link href="/jobs" className="text-blue-600 text-sm hover:underline mb-6 inline-block">
            ← Back to all requests
          </Link>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            {isFilled && (
              <div className="mb-5 bg-gray-100 text-gray-500 text-sm text-center py-2.5 rounded-xl font-medium">
                ✅ This request has been filled
              </div>
            )}

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">{lead.subject}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{lead.classLevel}</span>
              {lead.mode && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{lead.mode}</span>}
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">{lead.subject} Tutor Needed</h1>
            <p className="text-gray-400 text-sm mb-5">Posted {timeAgo(lead.createdAt)}</p>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Area</p>
                <p className="text-gray-800 font-medium">📍 {lead.area}{lead.city ? `, ${lead.city}` : ""}</p>
              </div>
              {lead.budget && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Budget</p>
                  <p className="text-gray-800 font-medium">{lead.budget}</p>
                </div>
              )}
              {lead.gender && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Preferred Tutor</p>
                  <p className="text-gray-800 font-medium">{lead.gender}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Cost</p>
                <p className="text-green-700 font-bold">🆓 FREE</p>
              </div>
            </div>

            {lead.notes && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-700">
                <p className="font-medium text-gray-500 mb-1">Additional notes:</p>
                <p>{lead.notes}</p>
              </div>
            )}

            {/* Contact section */}
            <div className="border-t border-gray-100 pt-5">
              {isFilled ? (
                <p className="text-gray-400 text-sm text-center py-4">This request is no longer available.</p>
              ) : !tutor ? (
                <div className="text-center py-6">
                  <p className="text-gray-400 font-mono text-2xl mb-2 tracking-widest">●●●● ●●●●●●</p>
                  <p className="text-gray-500 text-sm mb-5">Log in as an approved tutor to see student contact details</p>
                  <Link href="/tutor/login" className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors inline-block">
                    Log In to View Details
                  </Link>
                  <p className="mt-3 text-xs text-gray-400">Not registered yet?{" "}
                    <Link href="/register" className="text-blue-500 hover:underline">Register free →</Link>
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <p className="text-green-700 font-bold mb-3">✓ Student Contact Details</p>
                  <p className="text-gray-800 mb-1"><span className="font-medium text-gray-500">Name: </span>{lead.studentName}</p>
                  <p className="text-gray-800 mt-1">
                    <span className="font-medium text-gray-500">Phone: </span>
                    <a href={`tel:${lead.studentPhone}`} className="text-blue-600 font-semibold hover:underline">{lead.studentPhone}</a>
                  </p>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
                    💡 Contact the student by phone or text and introduce yourself. Discuss schedule, rate, and format directly.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
