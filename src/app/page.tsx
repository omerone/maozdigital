import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import SimpleContactForm from '@/components/SimpleContactForm';
import ScrollToTop from '@/components/ScrollToTop';
import MetaPixel from '@/components/MetaPixel';
import RatingSystem from '@/components/RatingSystem';
import ResultsGallery from '@/components/ResultsGallery';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Maoz Digital",
    "description": "שיווק ופרסום בפלטפורמות כמו פייסבוק אינסטגרם טיקטוק יו טיוב ובניית אתרים לכל מטרה. פתרונות דיגיטליים מתקדמים לעסק שלך עם מעוז דיגיטל",
    "url": "https://maozdigital.com",
    "logo": "https://maozdigital.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+972-53-4258042",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://maozdigital.com"
    ],
    "offers": {
      "@type": "Offer",
      "description": "שיווק ופרסום בפלטפורמות כמו פייסבוק אינסטגרם טיקטוק יו טיוב ובניית אתרים לכל מטרה"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Auto-deploy test - {new Date().toISOString()} */}
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <RatingSystem />
        <SimpleContactForm />
      </main>
      <ScrollToTop />
      <MetaPixel />
      <ResultsGallery />
    </div>
  );
}
