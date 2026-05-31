import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how catutors.com connects students with verified California tutors — free for both students and tutors.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">How It Works</h1>
          <p className="text-gray-500 text-lg">Students post free. Tutors join free. Everyone connects directly.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">

          {/* For Students */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">👨‍🎓 For Students &amp; Parents</h2>
            <div className="flex flex-col gap-6">
              {[
                { step: "1", title: "Post Your Request — Free", desc: "Fill a short form: subject, grade level, your neighborhood, and phone number. Takes under 2 minutes. No account needed." },
                { step: "2", title: "We Review It", desc: "Our team reviews your request before publishing it, usually within a few hours." },
                { step: "3", title: "Tutors Contact You", desc: "Verified tutors see your post and contact you directly by phone or text." },
                { step: "4", title: "You Arrange Directly", desc: "Discuss schedule, rate, and format (in-person or online) directly with the tutor — no platform involvement." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">{step}</div>
                  <div>
                    <p className="font-bold text-gray-900">{title}</p>
                    <p className="text-gray-500 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/request" className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Post a Request — Free →
            </Link>
          </div>

          {/* For Tutors */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">📚 For Tutors</h2>
            <div className="flex flex-col gap-6">
              {[
                { step: "1", title: "Register Free", desc: "Fill in your profile — subjects, areas, bio, and photo. Takes about 5 minutes." },
                { step: "2", title: "Get Approved", desc: "Our team reviews your profile and approves it within 24 hours." },
                { step: "3", title: "Browse Student Requests", desc: "Log in to your dashboard and browse open student requests — all free." },
                { step: "4", title: "Contact Students Directly", desc: "See student contact info and reach out by phone or text. No tokens, no fees." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">{step}</div>
                  <div>
                    <p className="font-bold text-gray-900">{title}</p>
                    <p className="text-gray-500 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/register" className="mt-8 inline-block px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-400 transition-colors">
              Register Free →
            </Link>
          </div>
        </div>

        {/* Platform benefits */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Platform Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            {[
              "No commissions on tutoring sessions",
              "No subscription fees for tutors",
              "No booking fees for students",
              "Direct phone communication",
              "Tutors manually verified by our team",
              "Free during the entire launch phase",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
