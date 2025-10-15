'use client';

import { useState, useEffect } from 'react';

interface Rating {
  id: string;
  name: string;
  phone: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export default function RatingSystem() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    rating: 0,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle');
  

  // דירוגים קיימים (רק דירוגים אמיתיים)
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [showAllRatings, setShowAllRatings] = useState(false);

  // טעינת דירוגים מהשרת
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch('/api/ratings');
        const data = await response.json();
        if (data.success) {
          setRatings(data.ratings);
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, []);


  const averageRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length : 0;
  const totalRatings = ratings.length;
  const displayedRatings = showAllRatings ? ratings : ratings.slice(0, 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // שליחת הדירוג לשרת
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          rating: formData.rating,
          comment: formData.comment
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setSubmitStatus('duplicate');
        } else {
          setSubmitStatus('error');
        }
        return;
      }

      // הוספת הדירוג החדש לרשימה המקומית
      setRatings(prev => [data.rating, ...prev]);
      
      setFormData({ name: '', phone: '', rating: 0, comment: '' });
      setShowForm(false);
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting rating:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const resetForm = () => {
    setFormData({ name: '', phone: '', rating: 0, comment: '' });
    setSubmitStatus('idle');
  };

  return (
    <section id="ratings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            דירוגי לקוחות
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            כל לקוח יכול לדרג פעם אחת בלבד - דירוגים אמיתיים ואמינים
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Rating Summary */}
          <div className="text-center lg:text-right">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  {totalRatings > 0 ? averageRating.toFixed(1) : '0.0'}
                </div>
                <div className="flex justify-center lg:justify-end mb-4">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-gray-600">
                  {totalRatings > 0 ? `מבוסס על ${totalRatings} דירוגים מאומתים` : 'אין דירוגים עדיין'}
                </div>
              </div>

              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                דרג אותנו
              </button>
            </div>
          </div>

          {/* Rating Form */}
          {showForm && (
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                הוסף דירוג
              </h3>
              
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
                  תודה על הדירוג שלך!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
                  אירעה שגיאה. אנא נסה שוב.
                </div>
              )}

              {submitStatus === 'duplicate' && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 text-center">
                  כבר קיים דירוג עם מספר הטלפון הזה. כל לקוח יכול לדרג פעם אחת בלבד.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    שם מלא *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="הכנס את השם שלך"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מספר טלפון *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="הכנס מספר טלפון"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    דירוג *
                  </label>
                  <div className="flex justify-center space-x-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: i + 1 })}
                        className={`text-3xl ${i < formData.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תגובה
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ספר לנו על החוויה שלך..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.phone || formData.rating === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'שולח דירוג...' : 'שלח דירוג'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300 mt-4"
                >
                  ביטול
                </button>
              </form>
            </div>
          )}

          {/* Recent Ratings */}
          {!showForm && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                דירוגים אחרונים
              </h3>
              {displayedRatings.length > 0 ? (
                <>
                  {displayedRatings.map((rating) => (
                    <div key={rating.id} className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-gray-900 flex items-center">
                          {rating.name}
                          {rating.verified && (
                            <span className="ml-2 text-green-500 text-sm">✓ מאומת</span>
                          )}
                        </div>
                        <div className="flex">{renderStars(rating.rating)}</div>
                      </div>
                      <p className="text-gray-700 mb-2">{rating.comment}</p>
                      <div className="text-sm text-gray-500">{rating.date}</div>
                    </div>
                  ))}
                  {ratings.length > 3 && !showAllRatings && (
                    <button
                      onClick={() => setShowAllRatings(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      הצג את כל הדירוגים ({totalRatings})
                    </button>
                  )}
                  {showAllRatings && ratings.length > 3 && (
                    <button
                      onClick={() => setShowAllRatings(false)}
                      className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      הצג פחות
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">אין דירוגים עדיין. תהיה הראשון לדרג!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}