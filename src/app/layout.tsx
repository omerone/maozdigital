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
  title: "Maoz Digital - בניית אתרים ושיווק מקצועי | עומר מעוז",
  description: "בניית אתרים מקצועיים, שיווק בגוגל, שיווק ממומן במטא וטיקטוק. פתרונות דיגיטל מתקדמים לעסק שלך עם עומר מעוז",
  metadataBase: new URL('https://maozdigital.com'),
  openGraph: {
    title: "Maoz Digital - בניית אתרים ושיווק מקצועי | עומר מעוז",
    description: "בניית אתרים מקצועיים, שיווק בגוגל, שיווק ממומן במטא וטיקטוק. פתרונות דיגיטל מתקדמים לעסק שלך עם עומר מעוז",
    url: 'https://maozdigital.com',
    siteName: 'Maoz Digital',
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maoz Digital - בניית אתרים ושיווק מקצועי | עומר מעוז",
    description: "בניית אתרים מקצועיים, שיווק בגוגל, שיווק ממומן במטא וטיקטוק. פתרונות דיגיטל מתקדמים לעסק שלך עם עומר מעוז",
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
