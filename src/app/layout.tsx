import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MavTech - Best Software Development Company in Bhadrapur, Jhapa | Web & Mobile App Development",
  description: "MavTech is the leading software development company in Bhadrapur, Jhapa, Nepal. We provide professional web development, mobile app development, UI/UX design, and custom software solutions. Expert team delivering innovative digital solutions for businesses.",
  keywords: [
    "software company bhadrapur",
    "software development jhapa",
    "mavtech",
    "best software company nepal",
    "web development bhadrapur",
    "mobile app development jhapa",
    "software company in bhadrapur",
    "IT company jhapa",
    "custom software development nepal",
    "web design bhadrapur",
    "app development jhapa nepal",
    "digital agency bhadrapur",
    "software solutions jhapa",
    "tech company nepal",
    "bhadrapur IT services",
    "jhapa software solutions",
    "mavtech nepal",
    "professional software development",
    "UI/UX design bhadrapur",
    "e-commerce development jhapa"
  ],
  authors: [{ name: "MavTech" }],
  creator: "MavTech",
  publisher: "MavTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mavtech.com.np'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "MavTech - Best Software Development Company in Bhadrapur, Jhapa",
    description: "Leading software development company in Bhadrapur, Jhapa, Nepal. Professional web & mobile app development, UI/UX design, and custom software solutions.",
    url: 'https://mavtech.com.np', // Replace with your actual domain
    siteName: 'MavTech',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/ogImage.png',
        width: 1200,
        height: 630,
        alt: 'MavTech - Software Development Company Bhadrapur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "MavTech - Best Software Development Company in Bhadrapur, Jhapa",
    description: "Leading software development company in Bhadrapur, Jhapa, Nepal. Expert web & mobile app development services.",
    images: ['/images/ogImage.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <div data-theme="light">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
