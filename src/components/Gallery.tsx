'use client';

import { useState } from 'react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const results = [
    {
      title: "Engagements",
      value: "2.5M+",
      description: "אינטראקציות חודשיות",
      image: "/results-1.jpeg",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Reach",
      value: "850K+",
      description: "הגעה חודשית",
      image: "/results-2.jpeg",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Conversions",
      value: "15K+",
      description: "המרות חודשיות",
      image: "/results-3.jpeg",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section id="results" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            התוצאות שלנו מדברות
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            נתונים אמיתיים שמראים את ההצלחה שלנו בעזרה לעסקים לצמוח ולהצליח
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage({ src: result.image, title: result.title })}
                />
              </div>
            </div>
          ))}
        </div>

        {/* כפתור תוצאות נוספות */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              // פתיחת הגלריה המלאה
              window.dispatchEvent(new CustomEvent('openResultsGallery'));
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              תוצאות נוספות
            </span>
          </button>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}