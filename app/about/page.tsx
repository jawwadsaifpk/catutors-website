import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About catutors.com",
  description: "catutors.com is California's free tutor directory — connecting students with verified tutors across LA, San Francisco, San Diego and more.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About catutors.com</h1>
        <p className="text-gray-500 text-lg mb-10">California&apos;s free tutor directory — connecting students and tutors directly.</p>

        <div className="prose prose-gray max-w-none flex flex-col gap-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              catutors.com exists to make finding a great tutor in California as simple as possible — for both families and tutors. Students can post a tuition request in 2 minutes with no account needed, and verified tutors can browse and connect with students directly. No middlemen, no booking agencies, no commissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">How We&apos;re Different</h2>
            <p className="text-gray-600 leading-relaxed">
              Most tutoring platforms charge students high markups or take 20–30% of every session. catutors.com is a directory, not an agency. We verify each tutor and then get out of the way — students and tutors negotiate and communicate directly, keeping 100% of what they agree.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Launch Phase — Free for Everyone</h2>
            <p className="text-gray-600 leading-relaxed">
              During our launch phase, catutors.com is completely free for both students and tutors. Post a request, register a profile, and connect — all at no cost. We&apos;re focused on building the best tutor community in California before introducing any optional features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">California-Wide Coverage</h2>
            <p className="text-gray-600 leading-relaxed">
              We serve tutors and students across all major California cities — Los Angeles, San Francisco, San Diego, San Jose, Sacramento, Fresno, Oakland, Long Beach, and more. Whether you&apos;re in Beverly Hills or Bakersfield, catutors.com is here.
            </p>
          </section>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/register" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Register as a Tutor →
            </Link>
            <Link href="/request" className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-400 transition-colors">
              Find a Tutor →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
