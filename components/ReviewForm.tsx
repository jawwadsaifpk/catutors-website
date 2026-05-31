"use client";

import { useActionState } from "react";
import { submitReview } from "@/app/actions/review";

const CLASS_LEVELS = [
  "Elementary (K–5)", "Middle School (6–8)", "High School (9–12)",
  "AP / IB", "SAT / ACT Prep", "College / University", "Adult Learner",
];

export default function ReviewForm({ tutorId }: { tutorId: number }) {
  const [state, formAction, pending] = useActionState(submitReview, null);

  if (state?.success) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm">
        ✅ Thank you! Your review has been submitted and will appear after admin approval.
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="tutorId" value={tutorId} />

      {state?.error === "missing-fields" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
          Please fill in all required fields and select a star rating.
        </p>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating <span className="text-red-500">*</span></label>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="flex flex-col items-center gap-1 cursor-pointer">
              <input type="radio" name="rating" value={star} required className="sr-only peer" />
              <span className="text-2xl peer-checked:scale-110 transition-transform select-none text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-300">★</span>
              <span className="text-xs text-gray-400">{star}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name <span className="text-red-500">*</span></label>
        <input type="text" name="reviewerName" required placeholder="e.g. Emily's Parent"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Grade / Level</label>
        <select name="classLevel"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm">
          <option value="">Select level (optional)</option>
          {CLASS_LEVELS.map((level) => <option key={level} value={level}>{level}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Your Review <span className="text-red-500">*</span></label>
        <textarea name="reviewText" required rows={3} placeholder="Share your experience with this tutor..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900 text-sm" />
      </div>

      <button type="submit" disabled={pending}
        className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm">
        {pending ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
