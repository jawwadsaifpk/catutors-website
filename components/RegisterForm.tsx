"use client";

import { useRef, useState } from "react";
import { registerTutor } from "@/app/actions/register";
import Link from "next/link";
import CitySelector from "@/components/CitySelector";
import AreaAutocomplete from "@/components/AreaAutocomplete";
import SubjectSelector from "@/components/SubjectSelector";
import { SubmitButton } from "@/components/SubmitButton";

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 transition-shadow";

const STEPS = ["What You Teach", "Where You Teach", "About You", "Finish"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < current
                  ? "bg-blue-600 text-white"
                  : i === current
                  ? "bg-blue-600 text-white ring-4 ring-blue-100"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              className={`mt-1.5 text-xs font-medium hidden sm:block ${
                i === current ? "text-blue-600" : i < current ? "text-gray-500" : "text-gray-300"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-0.5 mx-1 mb-5 transition-colors ${
                i < current ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 pb-5 border-b border-gray-100">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
    </div>
  );
}

type Props = { error?: string };

export default function RegisterForm({ error }: Props) {
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function advance() {
    setStepError("");
    const form = formRef.current;
    if (!form) return;

    if (step === 0) {
      const subjects = form.querySelectorAll('input[name="subjects"]');
      if (subjects.length === 0) {
        setStepError("Please select at least one subject before continuing.");
        return;
      }
    }

    if (step === 2) {
      const get = (sel: string) =>
        (form.querySelector(sel) as HTMLInputElement | HTMLTextAreaElement)?.value.trim();
      if (!get('input[name="name"]') || !get('input[name="phone"]') || !get('input[name="email"]') || !get('textarea[name="bio"]')) {
        setStepError("Please fill in all required fields before continuing.");
        return;
      }
    }

    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <form ref={formRef} action={registerTutor} className="flex flex-col gap-6">
      <StepIndicator current={step} />

      {/* Server error banners — always visible so they're seen on redirect */}
      {(error === "missing-fields") && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <span className="shrink-0 font-bold">✕</span>
          <span>Please fill in all required fields and select at least one subject and one area.</span>
        </div>
      )}
      {error === "password-too-short" && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <span className="shrink-0 font-bold">✕</span>
          <span>Password must be at least 6 characters.</span>
        </div>
      )}
      {error === "password-mismatch" && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <span className="shrink-0 font-bold">✕</span>
          <span>Passwords do not match. Please try again.</span>
        </div>
      )}
      {error === "duplicate-email" && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
          <span className="shrink-0">⚠</span>
          <span>
            <strong>A profile with this email already exists.</strong> To update your profile, email{" "}
            <a href="mailto:hello@catutors.com" className="underline font-semibold hover:text-amber-900">
              hello@catutors.com
            </a>.
          </span>
        </div>
      )}

      {/* Step error */}
      {stepError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <span className="shrink-0 font-bold">✕</span>
          <span>{stepError}</span>
        </div>
      )}

      {/* ── Step 0: What You Teach ── */}
      <div className={step !== 0 ? "hidden" : ""}>
        <Card>
          <CardHeader
            title="What do you teach?"
            subtitle="Choose your subjects and the grade levels you work with"
          />
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subjects <span className="text-red-500">*</span>
              </label>
              <SubjectSelector />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Grade Levels</label>
              <div className="grid grid-cols-2 gap-2">
                {["Elementary (K–5)", "Middle School (6–8)", "High School (9–12)", "AP / IB", "SAT / ACT Prep", "College / University"].map(
                  (level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="classLevels" value={level} className="w-4 h-4 accent-blue-600" />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  placeholder="e.g. BS Mathematics, UCLA"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Teaching Experience</label>
                <select name="experience" className={inputClass}>
                  <option value="">Select experience</option>
                  {["Less than 1 year", "1 year", "2 years", "3 years", "4 years", "5 years", "6–10 years", "10+ years"].map(
                    (e) => (
                      <option key={e} value={e}>{e}</option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Step 1: Where You Teach ── */}
      <div className={step !== 1 ? "hidden" : ""}>
        <Card>
          <CardHeader
            title="Where do you teach?"
            subtitle="Your city, neighborhoods, and whether you teach in-person or online"
          />
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your City <span className="text-red-500">*</span>
              </label>
              <CitySelector />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Teaching Mode</label>
              <select name="teachingMode" className={inputClass}>
                <option value="">Select teaching mode</option>
                <option value="In-Person">In-Person</option>
                <option value="Online">Online</option>
                <option value="Both">In-Person &amp; Online</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Neighborhoods / Areas You Cover <span className="text-red-500">*</span>
              </label>
              <AreaAutocomplete />
            </div>
          </div>
        </Card>
      </div>

      {/* ── Step 2: About You ── */}
      <div className={step !== 2 ? "hidden" : ""}>
        <Card>
          <CardHeader
            title="Tell us about yourself"
            subtitle="This is what students and parents will read before reaching out"
          />
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input type="text" name="name" placeholder="e.g. Sarah Johnson" className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input type="tel" name="phone" placeholder="e.g. (310) 555-0123" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input type="email" name="email" placeholder="e.g. sarah@gmail.com" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
              <div className="flex gap-6">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value={g} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm text-gray-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Availability</label>
              <input
                type="text"
                name="availability"
                placeholder="e.g. Weekdays after 4 PM, weekends anytime"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                About You <span className="text-red-500">*</span>
              </label>
              <textarea
                name="bio"
                rows={4}
                placeholder="Describe your teaching experience, qualifications, and approach in 2–4 sentences…"
                className={`${inputClass} resize-none`}
              />
              <p className="text-xs text-gray-400 mt-1">Students read this before deciding to contact you — make it count.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Step 3: Finish ── */}
      <div className={step !== 3 ? "hidden" : ""}>
        <Card>
          <CardHeader
            title="Almost done"
            subtitle="Set a password so you can log in to your dashboard after approval (optional)"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                minLength={6}
                placeholder="Min. 6 characters"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                className={inputClass}
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700 mb-6">
            <p className="font-semibold text-blue-800 mb-0.5">Already registered?</p>
            <p>
              Do not submit again — it will be rejected as a duplicate. To update your profile, email{" "}
              <a href="mailto:hello@catutors.com" className="underline font-semibold hover:text-blue-900">
                hello@catutors.com
              </a>.
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer mb-5">
            <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-blue-600 shrink-0" />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 underline hover:text-blue-800">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 underline hover:text-blue-800">Privacy Policy</Link>.
              I confirm that all information I have provided is accurate.
            </span>
          </label>

          <SubmitButton
            loadingText="Submitting…"
            className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-base shadow-md"
          >
            Submit Profile for Review →
          </SubmitButton>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => { setStepError(""); setStep((s) => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="px-6 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < STEPS.length - 1 && (
          <button
            type="button"
            onClick={advance}
            className="px-8 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Continue →
          </button>
        )}
      </div>
    </form>
  );
}
