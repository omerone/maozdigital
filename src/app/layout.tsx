import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "@/contexts/AdminContext";
import { ContentProvider } from "@/contexts/ContentContext";
import AdminEditingBanner from "@/components/AdminEditingBanner";
import MetaPixel from "@/components/MetaPixel";

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
  description: "השירותים שלנו: בניית אתרים + שיווק בגוגל - עיצוב רספונסיבי ומקצועי • אופטימיזציה למנועי חיפוש (SEO) • שיווק ממומן במטא (פייסבוק + אינסטגרם) • קמפיינים ממוקדים • שיווק ממומן בטיקטוק • יצירת תוכן ויראלי",
  metadataBase: new URL('https://maozdigital.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Maoz Digital - שיווק פרסום ובניית אתרים",
    description: "השירותים שלנו: בניית אתרים + שיווק בגוגל - עיצוב רספונסיבי ומקצועי • אופטימיזציה למנועי חיפוש (SEO) • שיווק ממומן במטא (פייסבוק + אינסטגרם) • קמפיינים ממוקדים • שיווק ממומן בטיקטוק • יצירת תוכן ויראלי",
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
    description: "השירותים שלנו: בניית אתרים + שיווק בגוגל - עיצוב רספונסיבי ומקצועי • אופטימיזציה למנועי חיפוש (SEO) • שיווק ממומן במטא (פייסבוק + אינסטגרם) • קמפיינים ממוקדים • שיווק ממומן בטיקטוק • יצירת תוכן ויראלי",
  },
  alternates: {
    canonical: 'https://maozdigital.com',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#f8f6f1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased rtl`}>
        <MetaPixel />
        <AdminProvider>
          <ContentProvider>
            <AdminEditingBanner />
            {children}
          </ContentProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
