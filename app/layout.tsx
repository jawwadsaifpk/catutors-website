import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
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
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
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
      </body>
    </html>
  );
}
