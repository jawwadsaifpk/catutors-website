import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.catutors.com"),
  alternates: { canonical: "/" },
  title: {
    template: "%s | catutors.com",
    default: "Tutors in California | catutors.com",
  },
  description:
    "Find verified tutors across California — Los Angeles, San Francisco, San Diego, San Jose, Sacramento & more. Search by area or subject and connect with tutors directly. Free for students and tutors.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "catutors.com",
    url: "https://www.catutors.com",
    title: "Find Tutors Across California | catutors.com",
    description:
      "Search verified tutors in LA, San Francisco, San Diego & more. Filter by subject or area and connect directly — completely free.",
    images: [
      {
        url: "https://www.catutors.com/api/og",
        width: 1200,
        height: 630,
        alt: "catutors.com — Find Tutors Across California",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Tutors Across California | catutors.com",
    description: "Search verified tutors in LA, SF, San Diego & more. Free for students and tutors.",
    images: ["https://www.catutors.com/api/og"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <nav className="bg-white border-b border-gray-100 shadow-sm px-4 py-4 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-extrabold text-blue-700 tracking-tight">
              🎓 catutors.com
            </Link>
            <NavLinks />
          </div>
        </nav>

        {children}

        {/* Floating contact button */}
        <a
          href={`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`}
          aria-label="Call us"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-lg hover:shadow-green-500/40 hover:shadow-xl transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
          </svg>
        </a>
      </body>
    </html>
  );
}
