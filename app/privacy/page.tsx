import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: June 2025</p>
        <div className="prose prose-gray max-w-none flex flex-col gap-6 text-gray-600">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Information We Collect</h2>
            <p>When tutors register, we collect name, phone number, email address, subjects, and service areas. When students post a request, we collect name, phone number, subject, and location. We do not collect payment information.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">How We Use Your Information</h2>
            <p>Tutor profiles are displayed publicly on catutors.com. Student contact information is displayed to approved, logged-in tutors on the jobs board. We do not sell your personal data to third parties.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Cookies</h2>
            <p>We use a single session cookie to keep tutors logged in to their dashboard. No tracking or advertising cookies are used.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Contact</h2>
            <p>For privacy questions, email <a href="mailto:hello@catutors.com" className="text-blue-600 underline">hello@catutors.com</a>.</p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
