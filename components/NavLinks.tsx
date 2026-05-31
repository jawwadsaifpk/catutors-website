import Link from "next/link";
import { cookies } from "next/headers";
import MobileMenu from "./MobileMenu";

export default async function NavLinks() {
  const cookieStore = await cookies();
  const hasTutor = !!cookieStore.get("tutor_session")?.value;

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-3 text-sm">
        <Link href="/jobs" className="px-3 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
          Tutor Jobs
        </Link>
        <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
          Blog
        </Link>
        <Link href={hasTutor ? "/tutor/dashboard" : "/tutor/login"} className="text-gray-600 hover:text-blue-600 hover:underline underline-offset-4 transition-colors font-medium">
          {hasTutor ? "Dashboard" : "Tutor Login"}
        </Link>
        <Link href="/request" className="px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Find a Tutor
        </Link>
      </div>

      {/* Mobile hamburger */}
      <MobileMenu hasTutor={hasTutor} />
    </>
  );
}
