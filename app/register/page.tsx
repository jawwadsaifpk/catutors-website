import type { Metadata } from "next";
import { registerTutor } from "@/app/actions/register";
import Link from "next/link";
import CitySelector from "@/components/CitySelector";
import AreaAutocomplete from "@/components/AreaAutocomplete";
import SubjectSelector from "@/components/SubjectSelector";
import { SubmitButton } from "@/components/SubmitButton";
import { CA_CITIES } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Register as a Tutor — List Your Services Free",
  description: "Join catutors.com — list your tutoring services for free and get contacted by students and parents across California.",
  alternates: { canonical: "/register" },
};

const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 transition-shadow";

function SectionCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">{children}</div>;
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 mb-6 pb-5 border-b border-gray-100">
      <div className="w-1 self-stretch rounded-full bg-blue-600 shrink-0" />
      <div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

type RegisterPageProps = { searchParams: Promise<{ success?: string; error?: string }> };

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { success, error } = await searchParams;

  if (success === "1") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full overflow-hidden rounded-2xl shadow border border-gray-100">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-8 py-10 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h1 className="text-2xl font-extrabold mb-1">Application Submitted!</h1>
            <p className="text-green-100 text-sm">We&apos;ve received your profile</p>
          </div>
          <div className="bg-white p-8">
            <p className="text-gray-600 text-center mb-6">
              Your profile is under review and will appear on the site within{" "}
              <strong className="text-gray-900">24 hours</strong> once approved.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm mb-6">
              <p className="font-semibold text-blue-800 mb-1">📝 Need to update your profile later?</p>
              <p className="text-blue-700">Email us at{" "}
                <a href="mailto:hello@catutors.com" className="font-semibold underline hover:text-blue-900">hello@catutors.com</a>
                {" "}and we&apos;ll update it for you.
              </p>
            </div>
            <Link href="/" className="block w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Become a Listed Tutor</h1>
          <p className="text-blue-100 text-lg mb-7">Join tutors connecting with students across California</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["✓ Free Forever", "✓ Go Live in 24 Hours", "✓ Students Contact You Directly"].map((pill) => (
              <span key={pill} className="px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium">{pill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {error === "missing-fields" && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              <span className="text-base shrink-0">✕</span>
              <span>Please fill in all required fields and select at least one subject and one area.</span>
            </div>
          )}
          {error === "password-too-short" && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              <span className="text-base shrink-0">✕</span><span>Password must be at least 6 characters.</span>
            </div>
          )}
          {error === "password-mismatch" && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              <span className="text-base shrink-0">✕</span><span>Passwords do not match. Please try again.</span>
            </div>
          )}
          {error === "duplicate-email" && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
              <span className="text-base shrink-0">⚠️</span>
              <span><strong>A profile with this email already exists.</strong> To update your profile, email us at{" "}
                <a href="mailto:hello@catutors.com" className="underline font-semibold hover:text-amber-900">hello@catutors.com</a>.
              </span>
            </div>
          )}

          <form action={registerTutor} className="flex flex-col gap-6">

            {/* Section 1 — Your Details */}
            <SectionCard>
              <SectionHeader title="👤 Your Details" subtitle="Basic contact information shown on your profile" />
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" required placeholder="e.g. Sarah Johnson" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" required placeholder="e.g. (310) 555-0123" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required placeholder="e.g. sarah@gmail.com" className={inputClass} />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Section 2 — Location */}
            <SectionCard>
              <SectionHeader title="📍 Your Location" subtitle="Where you are based and how you prefer to teach" />
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your City <span className="text-red-500">*</span></label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Neighborhoods / Areas You Cover <span className="text-red-500">*</span></label>
                  <AreaAutocomplete />
                </div>
              </div>
            </SectionCard>

            {/* Section 3 — What You Teach */}
            <SectionCard>
              <SectionHeader title="📚 What You Teach" subtitle="Subjects, grade levels, and your academic background" />
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subjects You Teach <span className="text-red-500">*</span></label>
                  <SubjectSelector />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Grade Levels You Teach</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Elementary (K–5)", "Middle School (6–8)", "High School (9–12)", "AP / IB", "SAT / ACT Prep", "College / University"].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="classLevels" value={level} className="w-4 h-4 accent-blue-600" />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Qualification</label>
                    <input type="text" name="qualification" placeholder="e.g. BS Mathematics, UCLA" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Teaching Experience</label>
                    <select name="experience" className={inputClass}>
                      <option value="">Select experience</option>
                      {["Less than 1 year", "1 year", "2 years", "3 years", "4 years", "5 years", "6–10 years", "10+ years"].map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
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
              </div>
            </SectionCard>

            {/* Section 4 — Availability & Bio */}
            <SectionCard>
              <SectionHeader title="🗒️ Availability &amp; Bio" subtitle="Help students understand when you are free and what makes you a great tutor" />
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Availability</label>
                  <input type="text" name="availability" placeholder="e.g. Weekdays after 4PM, weekends anytime" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">About You <span className="text-red-500">*</span></label>
                  <textarea name="bio" required rows={4}
                    placeholder="Describe your teaching experience, qualifications, and approach in 2–4 sentences…"
                    className={`${inputClass} resize-none`} />
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600">
                  <p className="font-semibold text-gray-700 mb-1">📝 Already registered?</p>
                  <p>Do not submit again — it will be rejected as a duplicate. To update your profile, email{" "}
                    <a href="mailto:hello@catutors.com" className="text-blue-600 underline hover:text-blue-800 font-medium">hello@catutors.com</a>.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Section 5 — Account Setup */}
            <SectionCard>
              <div className="flex items-start gap-3 mb-6 pb-5 border-b border-gray-100">
                <div className="w-1 self-stretch rounded-full bg-blue-600 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-gray-900">🔒 Account Setup</h2>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">Optional</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">Set a password to log in to your tutor dashboard after approval.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <input type="password" name="password" minLength={6} placeholder="Min. 6 characters" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                  <input type="password" name="confirmPassword" placeholder="Repeat password" className={inputClass} />
                </div>
              </div>
            </SectionCard>

            {/* Terms & Submit */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-blue-600 shrink-0" />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 underline hover:text-blue-800">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-blue-600 underline hover:text-blue-800">Privacy Policy</Link>.
                  I confirm that all information I have provided is accurate.
                </span>
              </label>
              <SubmitButton
                loadingText="Submitting…"
                className="mt-5 w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-base shadow-md"
              >
                Submit Profile for Review →
              </SubmitButton>
            </div>
          </form>

          {/* SEO browse links */}
          <div className="mt-4 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Looking for a tutor instead? Browse by city:</p>
            <div className="flex flex-wrap gap-2">
              {CA_CITIES.slice(0, 6).map((city) => {
                const slug = city.toLowerCase().replace(/\s+/g, "-");
                return (
                  <Link key={slug} href={`/${slug}`}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 bg-white hover:border-blue-400 transition-colors">
                    Tutors in {city}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
