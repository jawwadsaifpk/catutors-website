export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { adminLogin, approveTutor, rejectTutor, removeTutor, approveReview, rejectReview, approveLead, deleteLead, expireLead, updateLead } from "@/app/actions/admin";
import AdminActionButton from "@/components/AdminActionButton";

type Props = { searchParams: Promise<{ error?: string; tab?: string; edit?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const { error, tab, edit } = await searchParams;

  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("admin_auth")?.value === "1";

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-500 text-sm mb-6">Enter the admin password to continue.</p>
          {error === "wrong-password" && (
            <p className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">Incorrect password.</p>
          )}
          <form action={adminLogin} className="flex flex-col gap-4">
            <input type="password" name="password" required placeholder="Enter password..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Login →
            </button>
          </form>
        </div>
      </div>
    );
  }

  const [pendingTutors, approvedTutors, pendingReviews, allLeads] = await Promise.all([
    db.tutor.findMany({ where: { status: "pending" }, orderBy: { createdAt: "desc" } }),
    db.tutor.findMany({ where: { status: "approved" }, orderBy: { createdAt: "desc" } }),
    db.review.findMany({ where: { status: "pending" }, include: { tutor: { select: { name: true } } }, orderBy: { createdAt: "desc" } }),
    db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  const activeTab = tab ?? "tutors";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1 text-sm">catutors.com management panel</p>
          </div>
          <a href="/" className="text-sm text-blue-600 hover:underline">← View Site</a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Pending Tutors",   value: pendingTutors.length,  color: "text-yellow-500" },
            { label: "Approved Tutors",  value: approvedTutors.length, color: "text-green-500"  },
            { label: "Pending Requests", value: allLeads.filter(l => l.status === "pending").length, color: "text-orange-500" },
            { label: "Open Jobs",        value: allLeads.filter(l => l.status === "open").length,    color: "text-blue-500"   },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
              <p className="text-gray-500 mt-1 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[{ key: "tutors", label: "Tutors" }, { key: "jobs", label: "Jobs / Leads" }, { key: "reviews", label: "Reviews" }].map(({ key, label }) => (
            <a key={key} href={`/admin?tab=${key}`}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeTab === key ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400"}`}>
              {label}
            </a>
          ))}
        </div>

        {/* Tab: Tutors */}
        {activeTab === "tutors" && (
          <>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4">⏳ Pending ({pendingTutors.length})</h2>
              {pendingTutors.length === 0 && <p className="text-gray-400 text-sm">No pending registrations.</p>}
              <div className="flex flex-col gap-4">
                {pendingTutors.map((tutor) => (
                  <div key={tutor.id} className="bg-white rounded-2xl border border-yellow-100 shadow-sm p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{tutor.name}</h3>
                        <p className="text-sm text-gray-500">{tutor.phone} · {tutor.email}</p>
                        <p className="text-sm text-gray-500 mt-1"><span className="font-medium">Subjects:</span> {(tutor.subjects as string[]).join(", ")}</p>
                        <p className="text-sm text-gray-500"><span className="font-medium">Areas:</span> {(tutor.areas as string[]).join(", ")}</p>
                        <p className="text-sm text-gray-500"><span className="font-medium">City:</span> {tutor.city}</p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{tutor.bio}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <AdminActionButton action={approveTutor} tutorId={tutor.id} label="✅ Approve" variant="approve" />
                        <AdminActionButton action={rejectTutor}  tutorId={tutor.id} label="❌ Reject"  variant="reject" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">✅ Approved & Live ({approvedTutors.length})</h2>
              <div className="flex flex-col gap-4">
                {approvedTutors.map((tutor) => (
                  <div key={tutor.id} className="bg-white rounded-2xl border border-green-100 shadow-sm p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{tutor.name}</h3>
                        <p className="text-sm text-gray-500">{tutor.phone} · {tutor.email}</p>
                        <p className="text-sm text-gray-500 mt-1">{(tutor.subjects as string[]).join(", ")} · {tutor.city}</p>
                      </div>
                      <AdminActionButton action={removeTutor} tutorId={tutor.id} label="Remove" variant="reject" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Tab: Jobs */}
        {activeTab === "jobs" && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 All Leads ({allLeads.length})</h2>

            {/* Pending leads needing approval */}
            {(() => {
              const pending = allLeads.filter(l => l.status === "pending");
              if (pending.length === 0) return null;
              return (
                <div className="mb-8">
                  <h3 className="text-base font-bold text-orange-700 mb-3">⏳ Pending Approval ({pending.length})</h3>
                  <div className="flex flex-col gap-3">
                    {pending.map((lead) => (
                      <div key={lead.id} className="bg-white border-2 border-orange-200 rounded-2xl p-5">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-2">
                              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{lead.subject}</span>
                              <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">{lead.classLevel}</span>
                            </div>
                            <p className="text-gray-700 text-sm font-medium">📍 {lead.area}{lead.city ? `, ${lead.city}` : ""}</p>
                            <div className="mt-2 bg-orange-50 rounded-lg px-3 py-2 text-sm">
                              <p className="font-semibold text-gray-800">{lead.studentName}</p>
                              <p className="text-gray-500">{lead.studentPhone}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <form action={approveLead.bind(null, lead.id)}>
                              <button type="submit" className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700">✅ Approve</button>
                            </form>
                            <form action={deleteLead.bind(null, lead.id)}>
                              <button type="submit" className="px-4 py-2 bg-red-100 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-200">❌ Reject</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Edit form */}
            {(() => {
              const editingLead = edit ? allLeads.find(l => l.id === parseInt(edit)) : null;
              if (!editingLead) return null;
              return (
                <div className="bg-white border-2 border-blue-500 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 text-base mb-4">✏️ Editing Lead #{editingLead.id}</h3>
                  <form action={updateLead} className="flex flex-col gap-4">
                    <input type="hidden" name="leadId" value={editingLead.id} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-bold text-gray-900 mb-1">Subject</label>
                        <input type="text" name="subject" required defaultValue={editingLead.subject} className="w-full px-3 py-2 border border-gray-400 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      <div><label className="block text-sm font-bold text-gray-900 mb-1">Class Level</label>
                        <input type="text" name="classLevel" required defaultValue={editingLead.classLevel} className="w-full px-3 py-2 border border-gray-400 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      <div><label className="block text-sm font-bold text-gray-900 mb-1">Area</label>
                        <input type="text" name="area" required defaultValue={editingLead.area} className="w-full px-3 py-2 border border-gray-400 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      <div><label className="block text-sm font-bold text-gray-900 mb-1">Status</label>
                        <select name="status" defaultValue={editingLead.status} className="w-full px-3 py-2 border border-gray-400 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="pending">pending</option>
                          <option value="open">open</option>
                          <option value="filled">filled</option>
                        </select></div>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button type="submit" className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700">💾 Save</button>
                      <a href="/admin?tab=jobs" className="px-6 py-2 bg-gray-200 text-gray-800 text-sm font-semibold rounded-xl hover:bg-gray-300">Cancel</a>
                    </div>
                  </form>
                </div>
              );
            })()}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>{["Subject", "Class", "Area / City", "Student", "Status", "Posted", "Actions"].map((h) => (
                    <th key={h} className="text-left px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {allLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 font-medium text-gray-800">{lead.subject}</td>
                      <td className="px-3 py-3 text-gray-500">{lead.classLevel}</td>
                      <td className="px-3 py-3 text-gray-500">{lead.area}{lead.city ? `, ${lead.city}` : ""}</td>
                      <td className="px-3 py-3 text-gray-500 text-xs">
                        <span>{lead.studentName}<br /><span className="text-gray-400">{lead.studentPhone}</span></span>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${lead.status === "open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-gray-400 text-xs whitespace-nowrap">{lead.createdAt.toLocaleDateString("en-US")}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5">
                          <a href={`/admin?tab=jobs&edit=${lead.id}`} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-200">Edit</a>
                          {lead.status === "open" && (
                            <form action={expireLead.bind(null, lead.id)}>
                              <button type="submit" className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-orange-100 hover:text-orange-600">Expire</button>
                            </form>
                          )}
                          <form action={deleteLead.bind(null, lead.id)}>
                            <button type="submit" className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-200">Delete</button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {allLeads.length === 0 && <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-400">No leads yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab: Reviews */}
        {activeTab === "reviews" && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">⭐ Pending Reviews ({pendingReviews.length})</h2>
            {pendingReviews.length === 0 && <p className="text-gray-400 text-sm">No reviews awaiting approval.</p>}
            <div className="flex flex-col gap-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">For <a href={`/tutors/${review.tutorId}`} className="text-blue-600 font-semibold hover:underline">{review.tutor.name}</a></p>
                      <p className="font-bold text-gray-900">{review.reviewerName}</p>
                      <p className="text-yellow-400 text-lg my-1">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                      <p className="text-sm text-gray-600 mt-1">{review.reviewText}</p>
                    </div>
                    <div className="flex gap-2">
                      <form action={approveReview.bind(null, review.id)}>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700">✅ Approve</button>
                      </form>
                      <form action={rejectReview.bind(null, review.id)}>
                        <button type="submit" className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700">❌ Reject</button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
