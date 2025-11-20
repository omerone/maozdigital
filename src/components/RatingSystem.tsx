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
          const reviews = data.reviews || [];
          setGoogleReviews(reviews);
          setPlaceDetails(data.placeDetails);
          
          // Log the data source for debugging
          console.log('📊 Reviews data source:', data.source);
          console.log('Total reviews:', reviews.length);
          
          // Filter and log reviews with text
          const reviewsWithText = reviews.filter((review: GoogleReview) => {
            const hasText = review.text && typeof review.text === 'string' && review.text.trim().length > 0;
            return hasText;
          });
          console.log('Reviews with text:', reviewsWithText.length);
          console.log('Reviews data:', reviews.map((r: GoogleReview) => ({ 
            name: r.author_name, 
            hasText: r.text && r.text.trim().length > 0, 
            textLength: r.text?.length 
          })));
          
          if (data.source === 'google_api_no_reviews') {
            console.log('ℹ️ Business found but no reviews available:', data.message);
          } else if (data.source === 'fallback') {
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

  // Filter reviews to show only those with text content
  const reviewsWithText = googleReviews.filter(review => {
    const hasText = review.text && typeof review.text === 'string' && review.text.trim().length > 0;
    return hasText;
  });
  
  const displayedReviews = showAllReviews ? reviewsWithText : reviewsWithText.slice(0, 3);

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

  // Colors for different reviews to make them more vibrant
  const reviewColors = [
    { gradient: 'from-blue-500 to-cyan-500', border: 'border-blue-300' },
    { gradient: 'from-purple-500 to-pink-500', border: 'border-purple-300' },
    { gradient: 'from-green-500 to-emerald-500', border: 'border-green-300' },
    { gradient: 'from-orange-500 to-red-500', border: 'border-orange-300' },
    { gradient: 'from-indigo-500 to-blue-500', border: 'border-indigo-300' },
  ];


  return (
    <section id="ratings" className="py-20 bg-white" role="region" aria-labelledby="ratings-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="ratings-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
                         <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                           <h4 className="text-lg font-semibold text-red-800 mb-2">⚠️ לא ניתן לטעון ביקורות</h4>
                           <p className="text-red-700 mb-4">{error}</p>
                           <div className="space-y-2">
                  <a
                    href="https://maps.app.goo.gl/up9BSbr8ZhbbLtbe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#D1A055] hover:bg-[#bf9144] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 inline-block"
                  >
                    צפה בביקורות בגוגל
                  </a>
                           </div>
                         </div>
                       </div>
                     ) : (
                       <>
                         <div className="mb-8">
                           {/* Rating Badge */}
                           <div className="relative mb-6">
                             <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-30"></div>
                             <div className="relative text-center">
                               <div className="text-7xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-3">
                                 {placeDetails?.rating || 0}
                               </div>
                               <div className="flex justify-center gap-1 mb-4">
                                 {renderStars(placeDetails?.rating || 0)}
                               </div>
                               <div className="text-gray-600 text-lg font-medium">
                                 מבוסס על {placeDetails?.user_ratings_total || 0} ביקורות
                               </div>
                             </div>
                           </div>

                           {/* Google Badge */}
                           <div className="text-center">
                             <a
                               href="https://maps.app.goo.gl/up9BSbr8ZhbbLtbe7"
                               target="_blank"
                               rel="noopener noreferrer"
                               className="group inline-flex items-center gap-3 bg-[#D1A055] hover:bg-[#bf9144] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                             >
                               <span className="text-2xl">⭐</span>
                               <span>דרג אותנו בגוגל</span>
                               <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                             </a>
                           </div>
                         </div>
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
            ) : googleReviews.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="text-6xl mb-4">⭐</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">לא ניתן לטעון ביקורות</h4>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  העסק נמצא בגוגל אבל הביקורות עדיין לא זמינות דרך ה-API. 
                  <br />
                  עזור לנו לקבל ביקורות ראשונות!
                </p>
                <div className="space-y-3">
                  <a
                    href="https://maps.app.goo.gl/up9BSbr8ZhbbLtbe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#D1A055] hover:bg-[#bf9144] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-block mx-2"
                  >
                    צפה בביקורות בגוגל
                  </a>
                </div>
              </div>
            ) : reviewsWithText.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="text-6xl mb-4">⭐</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">אין ביקורות עם טקסט</h4>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  יש לנו דירוגים אבל אין ביקורות כתובות עדיין. 
                  <br />
                  עזור לנו לקבל ביקורות ראשונות!
                </p>
                <div className="space-y-3">
                  <a
                    href="https://maps.app.goo.gl/up9BSbr8ZhbbLtbe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#D1A055] hover:bg-[#bf9144] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-block mx-2"
                  >
                    צפה בביקורות בגוגל
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Display Reviews */}
                <div className="space-y-6">
                  {displayedReviews.map((review, index) => {
                    const colors = reviewColors[index % reviewColors.length];
                    return (
                      <div 
                        key={index} 
                        className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        {/* Colored Top Border */}
                        <div className={`h-2 bg-gradient-to-r ${colors.gradient}`}></div>
                        
                        <div className="p-6">
                          {/* Header with icon */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                                {review.author_name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{review.author_name}</h4>
                                <p className="text-sm text-gray-500">{review.relative_time_description}</p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          
                          {/* Review Text */}
                          <div className="relative">
                            <div className="absolute top-0 right-0 text-6xl opacity-5">&quot;</div>
                            <p className="text-gray-700 leading-relaxed text-right pr-8 relative z-10">
                              {review.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Show more/less button */}
                {reviewsWithText.length > 3 && (
                  <div className="text-center pt-6">
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="group relative inline-flex items-center gap-2 bg-[#D1A055] hover:bg-[#bf9144] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span className="relative z-10">
                        {showAllReviews ? 'הצג פחות ביקורות' : `הצג עוד ביקורות (${reviewsWithText.length - 3})`}
                      </span>
                      <span className="text-xl transition-transform duration-300 group-hover:translate-y-[-2px]">
                        {showAllReviews ? '👆' : '👇'}
                      </span>
                    </button>
                  </div>
                )}

                {/* Link to Google */}
                <div className="text-center pt-6">
                  <a
                    href="https://maps.app.goo.gl/up9BSbr8ZhbbLtbe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm font-medium transition-all duration-200 group"
                  >
                    <span>צפה בכל הביקורות בגוגל</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-[-4px]">→</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}