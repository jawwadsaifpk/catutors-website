import type { Metadata } from "next";
import Link from "next/link";
import { loginTutor } from "@/app/actions/tutor-auth";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = {
  title: "Tutor Login",
  description: "Log in to your tutor account to browse student job requests.",
};

type Props = { searchParams: Promise<{ error?: string; success?: string }> };

export default async function TutorLoginPage({ searchParams }: Props) {
  const { error, success } = await searchParams;

  const errorMsg: Record<string, string> = {
    "missing-fields":      "Please enter your email and password.",
    "invalid-credentials": "Incorrect email or password.",
    "not-approved":        "Your account is still under review. We will approve it within 24 hours.",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Tutor Login</h1>
          <p className="text-gray-500 text-sm">Log in to browse student requests and connect directly.</p>
        </div>

        {success === "password-set" && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">✅ Password set! You can now log in.</div>
        )}
        {error && errorMsg[error] && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{errorMsg[error]}</div>
        )}

        <form action={loginTutor} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" required autoComplete="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input type="password" name="password" required autoComplete="current-password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900" />
          </div>
          <SubmitButton loadingText="Logging in…" className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors mt-1">
            Log In →
          </SubmitButton>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Registered without a password?{" "}
          <Link href="/tutor/set-password" className="text-blue-600 font-semibold hover:underline">Set your password →</Link>
        </p>

        <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-200 p-5 text-center">
          <p className="text-sm font-semibold text-amber-900 mb-1">New here? Join free — no fees, no commission.</p>
          <Link href="/register" className="mt-2 inline-block w-full py-2.5 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-400 transition-colors text-sm">
            Register as a Tutor — Free →
          </Link>
        </div>
      </div>
    </div>
  );
}
