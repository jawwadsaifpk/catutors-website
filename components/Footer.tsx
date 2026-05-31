import Link from "next/link";
import { CA_CITIES } from "@/lib/cities";

const POPULAR_SUBJECTS = [
  { slug: "mathematics",    name: "Mathematics"    },
  { slug: "calculus",       name: "Calculus"       },
  { slug: "sat-prep",       name: "SAT Prep"       },
  { slug: "act-prep",       name: "ACT Prep"       },
  { slug: "english",        name: "English"        },
  { slug: "biology",        name: "Biology"        },
  { slug: "chemistry",      name: "Chemistry"      },
  { slug: "physics",        name: "Physics"        },
  { slug: "computer-science", name: "Computer Science" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16 py-12">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Column 1 — Cities */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Browse by City
            </h3>
            <ul className="space-y-2">
              {CA_CITIES.slice(0, 10).map((city) => {
                const slug = city.toLowerCase().replace(/\s+/g, "-");
                return (
                  <li key={slug}>
                    <Link href={`/${slug}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                      Tutors in {city}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 2 — Popular subjects in Los Angeles */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Popular — Los Angeles
            </h3>
            <ul className="space-y-2">
              {POPULAR_SUBJECTS.map(({ slug, name }) => (
                <li key={slug}>
                  <Link href={`/los-angeles/${slug}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    {name} Tutors in LA
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                ["/tutors",              "All Tutors — California"],
                ["/los-angeles/mathematics", "Math Tutors Los Angeles"],
                ["/san-francisco/sat-prep",  "SAT Prep San Francisco"],
                ["/san-diego/mathematics",   "Math Tutors San Diego"],
                ["/san-jose/calculus",       "Calculus Tutors San Jose"],
                ["/jobs",                    "Tutor Jobs Board"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                ["/about",        "About Us"],
                ["/how-it-works", "How It Works"],
                ["/faq",          "FAQ"],
                ["/contact",      "Contact Us"],
                ["/blog",         "Blog"],
                ["/register",     "Register as a Tutor"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-6 text-center text-sm text-gray-400">
          <p>catutors.com — Tutors Across California</p>
          <p className="mt-1">
            Are you a tutor?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register your profile for free →
            </Link>
          </p>
          <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/privacy" className="text-gray-400 hover:text-blue-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="text-gray-400 hover:text-blue-500 transition-colors">Terms of Service</Link>
            <Link href="/faq"     className="text-gray-400 hover:text-blue-500 transition-colors">FAQ</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
