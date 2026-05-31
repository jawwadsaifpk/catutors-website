import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the catutors.com team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-500 text-lg mb-10">We&apos;re here to help — reach out any time.</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Email</p>
            <a href="mailto:hello@catutors.com" className="text-blue-600 font-semibold text-lg hover:underline">hello@catutors.com</a>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Common Requests</p>
            <ul className="text-gray-600 text-sm flex flex-col gap-2">
              <li>📝 Update your tutor profile → email us your changes</li>
              <li>❓ Questions about the platform → email us</li>
              <li>🚩 Report an issue → email us with details</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
            <strong>Tutors:</strong> To update your profile details (subjects, areas, bio, photo), email us at hello@catutors.com and we&apos;ll apply the changes within 24 hours.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
