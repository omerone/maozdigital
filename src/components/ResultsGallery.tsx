'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  title: string;
  description: string;
  category: 'results' | 'websites' | 'campaigns';
}

export default function ResultsGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'results' | 'websites' | 'campaigns'>('all');
  const [isOpen, setIsOpen] = useState(false);

  const images: GalleryImage[] = [
    // תמונות תוצאות
    {
      src: '/results/075F6C39-0FFD-46FC-BFD9-3E3C2123C32A_1_201_a.jpeg',
      title: 'תוצאות קמפיין Meta',
      description: 'הצלחה מרשימה בקמפיין פרסום במטא עם ROI גבוה',
      category: 'results'
    },
    {
      src: '/results/0DD4858C-D4F9-47F2-9D1D-AA494878E91F_1_201_a.jpeg',
      title: 'תוצאות קמפיין Google Ads',
      description: 'ביצועים מעולים בקמפיין Google Ads עם CTR גבוה',
      category: 'results'
    },
    {
      src: '/results/F3BE9DB2-D810-459B-B7F4-0022D6166BE8_1_201_a.jpeg',
      title: 'תוצאות קמפיין TikTok',
      description: 'קמפיין TikTok מוצלח עם engagement גבוה',
      category: 'results'
    },
    // דוגמאות אתרים
    {
      src: '/results-1.jpeg',
      title: 'אתר מסחר אלקטרוני',
      description: 'אתר חנות אונליין מודרני עם חוויית משתמש מעולה',
      category: 'websites'
    },
    {
      src: '/results-2.jpeg',
      title: 'אתר תאגידי',
      description: 'אתר תאגידי מקצועי עם עיצוב נקי ומתקדם',
      category: 'websites'
    },
    {
      src: '/results-3.jpeg',
      title: 'אתר שירותים',
      description: 'אתר שירותים עם ממשק משתמש אינטואיטיבי',
      category: 'websites'
    },
    // קמפיינים נוספים
    {
      src: '/results/075F6C39-0FFD-46FC-BFD9-3E3C2123C32A_1_201_a.jpeg',
      title: 'קמפיין Facebook Ads',
      description: 'קמפיין פרסום מוצלח בפייסבוק עם ROI של 400%',
      category: 'campaigns'
    },
    {
      src: '/results/0DD4858C-D4F9-47F2-9D1D-AA494878E91F_1_201_a.jpeg',
      title: 'קמפיין Google Shopping',
      description: 'קמפיין Google Shopping עם CTR גבוה ומחיר נמוך לקליק',
      category: 'campaigns'
    },
    {
      src: '/results/F3BE9DB2-D810-459B-B7F4-0022D6166BE8_1_201_a.jpeg',
      title: 'קמפיין TikTok Ads',
      description: 'קמפיין TikTok יצירתי עם engagement גבוה במיוחד',
      category: 'campaigns'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const categories = [
    { key: 'all', label: 'הכל', count: images.length },
    { key: 'results', label: 'תוצאות', count: images.filter(img => img.category === 'results').length },
    { key: 'websites', label: 'אתרים', count: images.filter(img => img.category === 'websites').length },
    { key: 'campaigns', label: 'קמפיינים', count: images.filter(img => img.category === 'campaigns').length }
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setIsOpen(false);
      }
    };

    const handleOpenGallery = () => {
      setIsOpen(true);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('openResultsGallery', handleOpenGallery);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('openResultsGallery', handleOpenGallery);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-50 overflow-y-auto">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 text-white">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                התוצאות שלנו
              </h2>
              <p className="text-gray-400 text-lg">גלריית עבודות ותוצאות מרשימות</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key as 'all' | 'results' | 'websites' | 'campaigns')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/10 hover:border-white/20"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative h-72">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Info on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-white text-lg mb-1">{image.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-60 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
