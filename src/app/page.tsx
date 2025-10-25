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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        דלג לתוכן הראשי
      </a>
      
      {/* Auto-deploy test - {new Date().toISOString()} */}
      <Header />
      <main id="main-content" role="main" aria-label="תוכן ראשי">
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
