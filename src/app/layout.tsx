import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maoz Digital - שיווק פרסום ובניית אתרים",
  description: "שיווק ופרסום בפלטפורמות כמו פייסבוק אינסטגרם טיקטוק יו טיוב ובניית אתרים לכל מטרה. פתרונות דיגיטליים מתקדמים לעסק שלך עם מעוז דיגיטל",
  metadataBase: new URL('https://maozdigital.com'),
  verification: {
    google: 'google373348a2a6f59275',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Maoz Digital - שיווק פרסום ובניית אתרים",
    description: "שיווק ופרסום בפלטפורמות כמו פייסבוק אינסטגרם טיקטוק יו טיוב ובניית אתרים לכל מטרה. פתרונות דיגיטליים מתקדמים לעסק שלך עם מעוז דיגיטל",
    url: 'https://maozdigital.com',
    siteName: 'Maoz Digital',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Maoz Digital Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maoz Digital - שיווק פרסום ובניית אתרים",
    description: "שיווק ופרסום בפלטפורמות כמו פייסבוק אינסטגרם טיקטוק יו טיוב ובניית אתרים לכל מטרה. פתרונות דיגיטליים מתקדמים לעסק שלך עם מעוז דיגיטל",
  },
  alternates: {
    canonical: 'https://maozdigital.com',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
