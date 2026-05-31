"use client";

import { useState } from "react";
import { submitRequest } from "@/app/actions/request";

type FormData = {
  studentName: string; studentPhone: string; subject: string;
  classLevel: string; area: string; city: string;
  mode: string; gender: string; budget: string; notes: string;
};

export default function RequestForm({ tutorId }: { tutorId?: string }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormData>({
    studentName: "", studentPhone: "", subject: "", classLevel: "",
    area: "", city: "", mode: "", gender: "", budget: "", notes: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const canNext1 = data.subject.trim() && data.classLevel.trim();
  const canNext2 = data.area.trim().length > 0;
  const canNext3 = data.studentName.trim() && data.studentPhone.trim();

  async function handleSubmit() {
    setLoading(true);
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    if (tutorId) fd.append("tutorId", tutorId);
    await submitRequest(fd);
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step > s ? "bg-green-500 text-white" : step === s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>{step > s ? "✓" : s}</div>
            {s < 4 && <div className={`flex-1 h-1 rounded-full transition-colors ${step > s ? "bg-green-400" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 — What do you need? */}
      {step === 1 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-900">What do you need help with?</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Subject *</label>
            <input type="text" value={data.subject} onChange={(e) => update("subject", e.target.value)}
              placeholder="e.g. Mathematics, SAT Prep, AP Chemistry"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Grade / Level *</label>
            <input type="text" value={data.classLevel} onChange={(e) => update("classLevel", e.target.value)}
              placeholder="e.g. 10th Grade, AP, College Freshman"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
          </div>
          <button onClick={() => setStep(2)} disabled={!canNext1}
            className="mt-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Next →
          </button>
        </div>
      )}

      {/* Step 2 — Where are you? */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-900">Where are you located?</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Neighborhood / Area *</label>
            <input type="text" value={data.area} onChange={(e) => update("area", e.target.value)}
              placeholder="e.g. Beverly Hills, Palo Alto, Mission Hills"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
            <input type="text" value={data.city} onChange={(e) => update("city", e.target.value)}
              placeholder="e.g. Los Angeles, San Francisco, San Diego"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">← Back</button>
            <button onClick={() => setStep(3)} disabled={!canNext2}
              className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Next →</button>
          </div>
        </div>
      )}

      {/* Step 3 — Contact details */}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your contact details</h2>
            <p className="text-gray-500 text-sm mt-1">Tutors will contact you directly — completely free.</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name *</label>
            <input type="text" value={data.studentName} onChange={(e) => update("studentName", e.target.value)}
              placeholder="e.g. Sarah Johnson"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
            <input type="tel" value={data.studentPhone} onChange={(e) => update("studentPhone", e.target.value)}
              placeholder="e.g. (310) 555-0123"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
            <p className="text-xs text-gray-400 mt-1">Only approved tutors on our platform can see your number.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">← Back</button>
            <button onClick={() => setStep(4)} disabled={!canNext3}
              className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Next →</button>
          </div>
        </div>
      )}

      {/* Step 4 — Preferences + confirm */}
      {step === 4 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-900">Any preferences? (optional)</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Teaching Mode</label>
            <div className="flex gap-2 flex-wrap">
              {["In-Person", "Online", "Both"].map((m) => (
                <button key={m} type="button" onClick={() => update("mode", data.mode === m ? "" : m)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    data.mode === m ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-200 hover:border-green-400"
                  }`}>{m}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Tutor Gender</label>
            <div className="flex gap-2 flex-wrap">
              {["Male", "Female", "No preference"].map((g) => (
                <button key={g} type="button" onClick={() => update("gender", data.gender === g ? "" : g)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    data.gender === g ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-700 border-gray-200 hover:border-purple-400"
                  }`}>{g}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Budget (per hour or per month)</label>
            <input type="text" value={data.budget} onChange={(e) => update("budget", e.target.value)}
              placeholder="e.g. $50–80/hr, $400/month (optional)"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Notes</label>
            <textarea value={data.notes} onChange={(e) => update("notes", e.target.value)}
              rows={3} placeholder="e.g. Preparing for SAT in March, prefer evening sessions (optional)"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 resize-none" />
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4 text-sm flex flex-col gap-2">
            <p className="font-semibold text-gray-700 mb-1">Your request summary:</p>
            {[
              ["Subject", data.subject],
              ["Level",   data.classLevel],
              ["Area",    data.area + (data.city ? `, ${data.city}` : "")],
              ["Name",    data.studentName],
              ["Phone",   data.studentPhone],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800 text-right">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">← Back</button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60">
              {loading ? "Submitting…" : "Submit Request ✓"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
