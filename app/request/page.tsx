import type { Metadata } from "next";
import RequestForm from "@/components/RequestForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Find a Tutor — Post Your Request Free",
  description: "Post your tutoring request free — no account needed. Approved California tutors will contact you directly.",
  alternates: { canonical: "/request" },
};

type Props = { searchParams: Promise<{ success?: string; tutorId?: string }> };

export default async function RequestPage({ searchParams }: Props) {
  const { success, tutorId } = await searchParams;

  if (success === "1") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-10 text-center text-white">
            <div className="text-5xl mb-3">✓</div>
            <h1 className="text-2xl font-extrabold mb-1">Request Submitted!</h1>
            <p className="text-blue-200 text-sm">Tutors will reach out to you soon</p>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-600 mb-6">
              Your request is being reviewed. Once approved, verified tutors in your area will contact you directly by phone — completely free.
            </p>
            <p className="text-sm text-gray-400">Typical response time: within a few hours</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Find a Tutor Near You</h1>
          <p className="text-blue-200 text-lg mb-6">Free for students — takes 2 minutes, no account needed</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["✓ No registration", "✓ Tutors contact you", "✓ 100% Free"].map((pill) => (
              <span key={pill} className="px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium">{pill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-xl mx-auto">
          <RequestForm tutorId={tutorId} />
        </div>
      </div>
      <Footer />
    </>
  );
}
