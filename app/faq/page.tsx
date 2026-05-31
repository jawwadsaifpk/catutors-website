import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions about catutors.com — how to find a tutor in California, how to register as a tutor, and more.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  { q: "How do I find a tutor in California?", a: "Search by subject or area on catutors.com. Browse verified tutors across LA, San Francisco, San Diego and more. View profiles and contact tutors directly by phone — 100% free." },
  { q: "How much does a tutor cost in California?", a: "Tutoring rates in California vary by subject and grade level. Most tutors charge between $40 and $120 per hour. Contact tutors directly to discuss and agree on a rate — catutors.com takes no commission." },
  { q: "Is catutors.com free for students?", a: "Yes — completely free. Post your request, get contacted by tutors, and arrange sessions. We never charge students." },
  { q: "Is catutors.com free for tutors?", a: "Yes, during our launch phase the platform is 100% free for tutors. Register, get approved, browse job requests, and contact students directly at no cost." },
  { q: "How long does tutor approval take?", a: "Tutor profiles are reviewed and approved within 24 hours. You will receive a confirmation once your profile is live." },
  { q: "What subjects are available?", a: "We have tutors for Mathematics, Calculus, SAT/ACT Prep, AP courses, Physics, Chemistry, Biology, English, Computer Science, Spanish, and many more. Use the subject filter on the homepage to find what you need." },
  { q: "Can tutors teach online?", a: "Yes — many tutors on catutors.com offer both in-person and online sessions. You can filter by teaching mode when browsing." },
  { q: "Are the tutors verified?", a: "Yes. Every tutor profile is manually reviewed by our team before it appears on the site. No profile goes live without approval." },
  { q: "How do I update my tutor profile?", a: "Email us at hello@catutors.com and we will update your profile for you." },
  { q: "What California cities do you cover?", a: "We cover Los Angeles, San Francisco, San Diego, San Jose, Sacramento, Fresno, Oakland, Long Beach, Anaheim, Irvine, Pasadena, and more." },
];

export default function FaqPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-500 mb-10">Everything you need to know about catutors.com.</p>

        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-xl border-l-4 border-l-blue-500 overflow-hidden cursor-pointer hover:bg-blue-50 transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 font-semibold text-gray-800 list-none">
                {q}
                <span className="ml-4 text-blue-500 group-open:rotate-45 transition-transform text-xl leading-none flex-shrink-0">+</span>
              </summary>
              <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
