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
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 inline-block"
                            >
                              צפה בביקורות בגוגל
                            </a>
                           </div>
                         </div>
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
                          href="https://maps.app.goo.gl/up9BSbr8ZhbbLtbe7"
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
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-block mx-2 transform hover:scale-105"
                  >
                    צפה בביקורות בגוגל
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Display Reviews */}
                <div className="space-y-4">
                  {displayedReviews.map((review, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {review.profile_photo_url ? (
                            <img 
                              src={review.profile_photo_url} 
                              alt={review.author_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                              {review.author_name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.author_name}</h4>
                            <p className="text-sm text-gray-500">{review.relative_time_description}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>

                {/* Show more/less button */}
                {googleReviews.length > 3 && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                    >
                      {showAllReviews ? 'הצג פחות ביקורות' : `הצג עוד ביקורות (${googleReviews.length - 3})`}
                    </button>
                  </div>
                )}

                {/* Link to Google */}
                <div className="text-center pt-4">
                  <a
                    href="https://maps.app.goo.gl/up9BSbr8ZhbbLtbe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                  >
                    צפה בכל הביקורות בגוגל →
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