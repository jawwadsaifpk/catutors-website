import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: June 2025</p>
        <div className="prose prose-gray max-w-none flex flex-col gap-6 text-gray-600">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Platform Role</h2>
            <p>catutors.com is a directory that connects students and tutors. We are not a tutoring agency and are not party to any tutoring arrangement. All sessions, rates, and schedules are agreed directly between students and tutors.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Tutor Responsibilities</h2>
            <p>Tutors must provide accurate profile information. Submitting false qualifications or misleading information will result in removal from the platform. Tutors are independent contractors, not employees of catutors.com.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Student Responsibilities</h2>
            <p>Students must provide accurate contact information when submitting a request. Submitting false requests is not permitted.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No Liability</h2>
            <p>catutors.com verifies tutors before approving profiles but does not guarantee the accuracy of tutor-provided information. Users engage with each other at their own discretion. catutors.com is not liable for disputes between students and tutors.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Contact</h2>
            <p>For questions, email <a href="mailto:hello@catutors.com" className="text-blue-600 underline">hello@catutors.com</a>.</p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
