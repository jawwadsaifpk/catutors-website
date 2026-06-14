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

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-base font-bold text-gray-900 mb-4">Before you apply</h2>
            <dl className="flex flex-col gap-5">
              {[
                {
                  q: "Are tutors employees or independent contractors?",
                  a: "Tutors on catutors.com are independent contractors. You set your own schedule, rates, and decide which students to work with. catutors.com is a free directory — not your employer.",
                },
                {
                  q: "Are benefits provided?",
                  a: "No. Because tutors are independent contractors, no employment benefits are offered. You are responsible for your own insurance and taxes.",
                },
                {
                  q: "What qualifications do I need?",
                  a: "There are no mandatory degree requirements. Relevant experience and strong subject knowledge matter most. You describe your background in your bio — students read it before reaching out.",
                },
                {
                  q: "How does approval work?",
                  a: "Submit below. Applications are reviewed within 24 hours. Once approved, your profile goes live and students can contact you directly.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                  <dt className="text-sm font-bold text-gray-900 mb-1">{q}</dt>
                  <dd className="text-sm text-gray-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
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
