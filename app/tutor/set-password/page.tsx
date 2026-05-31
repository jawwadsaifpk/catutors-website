import type { Metadata } from "next";
import Link from "next/link";
import { setTutorPassword } from "@/app/actions/tutor-auth";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = {
  title: "Set Your Tutor Password",
  description: "Set a password for your tutor account to access your dashboard.",
};

type Props = { searchParams: Promise<{ email?: string; error?: string }> };

export default async function SetPasswordPage({ searchParams }: Props) {
  const { email, error } = await searchParams;

  const errorMsg: Record<string, string> = {
    "missing-fields": "Please fill in all fields.",
    "too-short":      "Password must be at least 6 characters.",
    "mismatch":       "Passwords do not match.",
    "not-found":      "No tutor account found with that email. Please check or register.",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Set Your Password</h1>
          <p className="text-gray-500 text-sm">Enter the email you registered with and choose a password.</p>
        </div>

        {error && errorMsg[error] && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{errorMsg[error]}</div>
        )}

        <form action={setTutorPassword} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Registered Email</label>
            <input type="email" name="email" required defaultValue={email ?? ""}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
            <input type="password" name="password" required minLength={6} placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input type="password" name="confirm" required placeholder="Repeat password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900" />
          </div>
          <SubmitButton loadingText="Saving…" className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            Set Password &amp; Log In →
          </SubmitButton>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          <Link href="/tutor/login" className="text-blue-600 hover:underline">← Back to login</Link>
        </p>
      </div>
    </div>
  );
}
