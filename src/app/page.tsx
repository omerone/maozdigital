import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      {/* Auto-deploy test - {new Date().toISOString()} */}
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <RatingSystem />
        <SimpleContactForm />
      </main>
      <Footer />
      <ScrollToTop />
      <MetaPixel />
      <ResultsGallery />
    </div>
  );
}
