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
  
  // SMS Verification states
  const [verificationStep, setVerificationStep] = useState<'phone' | 'code' | 'complete'>('phone');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  // דירוגים קיימים (רק דירוגים אמיתיים)
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [showAllRatings, setShowAllRatings] = useState(false);

  // טעינת דירוגים מהלוקל סטורג'
  useEffect(() => {
    const savedRatings = localStorage.getItem('maoz-digital-ratings');
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings));
    }
  }, []);

  // שמירת דירוגים בלוקל סטורג'
  const saveRatings = (newRatings: Rating[]) => {
    setRatings(newRatings);
    localStorage.setItem('maoz-digital-ratings', JSON.stringify(newRatings));
  };

  // שליחת קוד אימות SMS
  const sendVerificationCode = async (phone: string) => {
    setIsSendingCode(true);
    setVerificationError('');
    
    try {
      const response = await fetch('/api/send-sms-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      setVerificationStep('code');
      
      // In development, show the code in console
      if (data.code) {
        console.log(`Development SMS Code for ${phone}: ${data.code}`);
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      setVerificationError('שגיאה בשליחת קוד האימות. אנא נסה שוב.');
    } finally {
      setIsSendingCode(false);
    }
  };

  // אימות קוד SMS
  const verifyCode = async (code: string) => {
    setIsVerifyingCode(true);
    setVerificationError('');
    
    try {
      const response = await fetch('/api/verify-sms-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: formData.phone, 
          code 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }

      setVerificationStep('complete');
    } catch (error) {
      console.error('Error verifying code:', error);
      setVerificationError(error instanceof Error ? error.message : 'קוד האימות שגוי. אנא נסה שוב.');
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const averageRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length : 0;
  const totalRatings = ratings.length;
  const displayedRatings = showAllRatings ? ratings : ratings.slice(0, 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // אם עדיין לא עבר אימות SMS, שלח קוד אימות
    if (verificationStep === 'phone') {
      if (formData.phone && formData.name && formData.rating > 0) {
        await sendVerificationCode(formData.phone);
      }
      return;
    }

    // אם עבר אימות SMS, שלח את הדירוג
    if (verificationStep === 'complete') {
      setIsSubmitting(true);
      setSubmitStatus('idle');

      try {
        // בדיקה אם כבר יש דירוג עם אותו מספר טלפון
        const existingRating = ratings.find(rating => rating.phone === formData.phone);
        
        if (existingRating) {
          setSubmitStatus('duplicate');
          setIsSubmitting(false);
          return;
        }

        // יצירת דירוג חדש מאומת
        const newRating: Rating = {
          id: Date.now().toString(),
          name: formData.name,
          phone: formData.phone,
          rating: formData.rating,
          comment: formData.comment,
          date: new Date().toISOString().split('T')[0],
          verified: true
        };

        // הוספת הדירוג החדש ושמירה
        const updatedRatings = [...ratings, newRating];
        saveRatings(updatedRatings);
        
        setFormData({ name: '', phone: '', rating: 0, comment: '' });
        setVerificationCode('');
        setVerificationStep('phone');
        setShowForm(false);
        setSubmitStatus('success');
      } catch (error) {
        console.error('Error submitting rating:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
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

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length === 6) {
      await verifyCode(verificationCode);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', rating: 0, comment: '' });
    setVerificationCode('');
    setVerificationStep('phone');
    setVerificationError('');
    setSubmitStatus('idle');
  };

  return (
    <section id="ratings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            דירוגי לקוחות מאומתים
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            כל הדירוגים שלנו מאומתים באמצעות SMS לוודא אמינות מקסימלית
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
                דרג אותנו (דורש אימות SMS)
              </button>
            </div>
          </div>

          {/* Rating Form */}
          {showForm && (
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                הוסף דירוג מאומת
              </h3>
              
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
                  תודה על הדירוג המאומת שלך!
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

              {/* Step 1: Phone Verification */}
              {verificationStep === 'phone' && (
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
                    disabled={isSendingCode || !formData.name || !formData.phone || formData.rating === 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingCode ? 'שולח קוד אימות...' : 'שלח קוד אימות SMS'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300 mt-4"
                  >
                    ביטול
                  </button>
                </form>
              )}

              {/* Step 2: Code Verification */}
              {verificationStep === 'code' && (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      אימות מספר טלפון
                    </h4>
                    <p className="text-gray-600 mb-4">
                      שלחנו קוד אימות ל-{formData.phone}
                    </p>
                    {process.env.NODE_ENV === 'development' && (
                      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4 text-sm">
                        <strong>פיתוח:</strong> בדוק את הקונסול (F12) לקבלת קוד האימות
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      קוד האימות (6 ספרות) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                      placeholder="000000"
                    />
                  </div>

                  {verificationError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {verificationError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifyingCode || verificationCode.length !== 6}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifyingCode ? 'מאמת...' : 'אמת קוד'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setVerificationStep('phone')}
                    className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    חזור
                  </button>
                </form>
              )}

              {/* Step 3: Complete Rating */}
              {verificationStep === 'complete' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-green-500 mr-2">✓</span>
                      מספר הטלפון אומת בהצלחה!
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      סיים את הדירוג
                    </h4>
                    <p className="text-gray-600 mb-4">
                      שם: {formData.name} | טלפון: {formData.phone}
                    </p>
                    <div className="flex justify-center mb-4">
                      {renderStars(formData.rating)}
                    </div>
                    {formData.comment && (
                      <p className="text-gray-600 italic">&quot;{formData.comment}&quot;</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'שולח דירוג...' : 'שלח דירוג מאומת'}
                  </button>
                </form>
              )}
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