'use client';

import { useState, useEffect } from 'react';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceDetails {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

export default function RatingSystem() {
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>([]);
  const [placeDetails, setPlaceDetails] = useState<GooglePlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // טעינת דירוגים מ-Google Places API
  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/google-reviews');
        const data = await response.json();
        
        if (data.success) {
          setGoogleReviews(data.reviews || []);
          setPlaceDetails(data.placeDetails);
          
          // Log the data source for debugging
          console.log('📊 Reviews data source:', data.source);
          if (data.source === 'fallback') {
            console.log('⚠️ Using fallback data. Reason:', data.message || data.api_error || data.error_message || 'Unknown');
          }
        } else {
          setError(data.error || 'שגיאה בטעינת הדירוגים');
        }
      } catch (error) {
        console.error('Error fetching Google reviews:', error);
        setError('שגיאה בטעינת הדירוגים');
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);


  const displayedReviews = showAllReviews ? googleReviews : googleReviews.slice(0, 3);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };


  return (
    <section id="ratings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            דירוגי לקוחות
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            דירוגים אמיתיים ואמינים מלקוחות מרוצים
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Rating Summary */}
          <div className="text-center lg:text-right">
            <div className="bg-gray-50 p-8 rounded-xl">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">טוען דירוגים...</p>
                </div>
                     ) : error ? (
                       <div className="text-center py-8">
                         <p className="text-red-600 mb-4">{error}</p>
                         <button
                           onClick={() => window.location.reload()}
                           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                         >
                           נסה שוב
                         </button>
                       </div>
                     ) : (
                       <>
                         <div className="mb-6">
                           <div className="text-6xl font-bold text-gray-900 mb-2">
                             {placeDetails?.rating || 0}
                           </div>
                           <div className="flex justify-center lg:justify-end mb-4">
                             {renderStars(placeDetails?.rating || 0)}
                           </div>
                           <div className="text-gray-600">
                             מבוסס על {placeDetails?.user_ratings_total || 0} ביקורות
                           </div>
                         </div>

                         <a
                           href="https://maps.app.goo.gl/fLrZPQvgNns8JKg86"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block"
                         >
                           דרג אותנו בגוגל
                         </a>
                       </>
                     )}
            </div>
          </div>

          {/* Google Reviews */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              ביקורות מגוגל
            </h3>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">טוען ביקורות...</p>
              </div>
                   ) : error ? (
                     <div className="text-center py-8">
                       <p className="text-red-600">{error}</p>
                     </div>
                   ) : displayedReviews.length > 0 ? (
              <>
                {displayedReviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-900 flex items-center">
                        {review.author_name}
                        <span className="ml-2 text-blue-500 text-sm">✓ גוגל</span>
                      </div>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.text}</p>
                    <div className="text-sm text-gray-500">{review.relative_time_description}</div>
                  </div>
                ))}
                {googleReviews.length > 3 && !showAllReviews && (
                  <button
                    onClick={() => setShowAllReviews(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    הצג את כל הביקורות ({googleReviews.length})
                  </button>
                )}
                {showAllReviews && googleReviews.length > 3 && (
                  <button
                    onClick={() => setShowAllReviews(false)}
                    className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    הצג פחות
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="bg-blue-50 p-6 rounded-xl mb-4">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">דירוגים זמינים בגוגל</h4>
                  <p className="text-blue-700 mb-4">
                    העסק שלך &quot;Maoz digital&quot; קיים בגוגל My Business עם דירוג 5.0 כוכבים מבוסס על ביקורת אחת!
                  </p>
                  <div className="flex justify-center mb-4">
                    {renderStars(5)}
                  </div>
                  <a
                    href="https://maps.app.goo.gl/fLrZPQvgNns8JKg86"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 inline-block"
                  >
                    צפה בדירוגים בגוגל
                  </a>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>הערה:</strong> הדירוגים מוצגים מהמידע הזמין על העסק שלך. 
                    כדי לראות את כל הביקורות, לחץ על הקישור למעלה.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}