import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import { CA_CITIES } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Register as a Tutor — List Your Services Free",
  description: "Join catutors.com — list your tutoring services for free and get contacted by students and parents across California.",
  alternates: { canonical: "/register" },
};

type RegisterPageProps = { searchParams: Promise<{ success?: string; error?: string }> };

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { success, error } = await searchParams;

  if (success === "1") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full overflow-hidden rounded-2xl shadow border border-gray-100">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-8 py-10 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">✓</div>
            <h1 className="text-2xl font-extrabold mb-1">Application Submitted!</h1>
            <p className="text-green-100 text-sm">We&apos;ve received your profile</p>
          </div>
          <div className="bg-white p-8">
            <p className="text-gray-600 text-center mb-6">
              Your profile is under review and will appear on the site within{" "}
              <strong className="text-gray-900">24 hours</strong> once approved.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm mb-6">
              <p className="font-semibold text-blue-800 mb-1">Need to update your profile later?</p>
              <p className="text-blue-700">
                Email us at{" "}
                <a href="mailto:hello@catutors.com" className="font-semibold underline hover:text-blue-900">
                  hello@catutors.com
                </a>{" "}
                and we&apos;ll update it for you.
              </p>
            </div>
            <Link
              href="/"
              className="block w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            Start Getting California Students — Free
          </h1>
          <p className="text-blue-100 text-lg mb-7">
            List your profile in minutes. Students contact you directly — no middleman, no fees, ever.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Free Forever", "Live in 24 Hours", "Students Contact You Directly"].map((pill) => (
              <span key={pill} className="px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium">
                ✓ {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          {/* How it works */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-6 text-center">How it works</p>
            <div className="flex items-start justify-between gap-2">
              {[
                {
                  n: "1",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                    </svg>
                  ),
                  label: "Fill the form",
                  sub: "Takes about 3 minutes",
                },
                {
                  n: "2",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  label: "We review",
                  sub: "Within 24 hours",
                },
                {
                  n: "3",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.77 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ),
                  label: "Students call you",
                  sub: "Direct — no middleman",
                },
              ].map((step, i, arr) => (
                <div key={step.n} className="flex items-start flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      {step.icon}
                    </div>
                    <p className="text-sm font-bold text-gray-900 text-center">{step.label}</p>
                    <p className="text-xs text-gray-400 text-center mt-0.5">{step.sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex-shrink-0 mt-5 mx-1">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-300">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                color: "bg-violet-50 text-violet-600",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  </svg>
                ),
                title: "Independent work",
                desc: "Set your own rates & schedule",
              },
              {
                color: "bg-green-50 text-green-600",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                ),
                title: "Always free",
                desc: "No fees or commissions, ever",
              },
              {
                color: "bg-amber-50 text-amber-600",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                ),
                title: "No degree needed",
                desc: "Experience matters most",
              },
              {
                color: "bg-blue-50 text-blue-600",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: "Real students",
                desc: "California families looking now",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                  {card.icon}
                </div>
                <p className="text-sm font-bold text-gray-900">{card.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Multi-step form */}
          <RegisterForm error={error} />

          {/* SEO browse links */}
          <div className="mt-4 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Looking for a tutor instead? Browse by city:</p>
            <div className="flex flex-wrap gap-2">
              {CA_CITIES.slice(0, 6).map((city) => {
                const slug = city.toLowerCase().replace(/\s+/g, "-");
                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 bg-white hover:border-blue-400 transition-colors"
                  >
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
