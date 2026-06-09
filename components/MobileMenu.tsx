"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ hasTutor }: { hasTutor: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="sm:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl text-gray-700 px-2 py-1 hover:text-blue-600 transition-colors"
        aria-label="Open menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-xl p-4 flex flex-col gap-3 min-w-52 z-50">
          <Link href="/jobs" onClick={close} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Tutor Jobs
          </Link>
          <Link href="/news" onClick={close} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            CA News
          </Link>
          <Link href="/blog" onClick={close} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Blog
          </Link>
          <Link href={hasTutor ? "/tutor/dashboard" : "/tutor/login"} onClick={close} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            {hasTutor ? "Tutor Dashboard" : "Tutor Login"}
          </Link>
          <Link href="/request" onClick={close} className="mt-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center">
            Find a Tutor
          </Link>
        </div>
      )}
    </div>
  );
}
