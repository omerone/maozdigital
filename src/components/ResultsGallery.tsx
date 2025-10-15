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

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        🎯 צפה בתוצאות שלנו
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 text-white">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">התוצאות שלנו</h2>
              <p className="text-gray-300">גלריית עבודות ותוצאות מרשימות</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key as any)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.key
                    ? 'bg-white text-black'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative h-64">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add More Button */}
          <div className="text-center">
            <button 
              onClick={() => {
                alert('כדי להוסיף תמונות נוספות, פשוט העלה אותן לתיקיית /public/results/ והן יופיעו אוטומטית בגלריה!');
              }}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              + הוסף עוד תמונות
            </button>
            <p className="text-gray-400 text-sm mt-2">
              העלה תמונות לתיקיית /public/results/ כדי להוסיף אותן לגלריה
            </p>
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-60 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-200">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
