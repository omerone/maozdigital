'use client';

import { useState, useEffect } from "react";

export default function SimpleContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showAfterHoursDialog, setShowAfterHoursDialog] = useState(false);
  const [isBusinessHoursNow, setIsBusinessHoursNow] = useState(false);
  const [formDataToSend, setFormDataToSend] = useState<{
    name: string | null;
    email: string | null;
    phone: string | null;
    company: string | null;
    service: string | null;
    budget: string | null;
    message: string | null;
  } | null>(null);

  // פונקציה לבדיקת שעות הפעילות
  const isBusinessHours = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = ראשון, 6 = שבת
    const hour = now.getHours();
    
    // א-ה (ראשון-חמישי): 8:00 - 21:00
    if (day >= 0 && day <= 4) {
      return hour >= 8 && hour < 21;
    }
    
    // ו (שישי): 8:00 - 19:00
    if (day === 5) {
      return hour >= 8 && hour < 19;
    }
    
    // שבת - לא שעות פעילות
    return false;
  };

  // בדיקת שעות הפעילות בעת טעינת הקומפוננטה ועדכון כל דקה
  useEffect(() => {
    const checkBusinessHours = () => {
      setIsBusinessHoursNow(isBusinessHours());
    };
    
    // בדיקה ראשונית
    checkBusinessHours();
    
    // עדכון כל דקה
    const interval = setInterval(checkBusinessHours, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // יצירת אובייקט עם הנתונים
    const data = {
      name: formData.get('name') as string | null,
      email: formData.get('email') as string | null,
      phone: formData.get('phone') as string | null,
      company: formData.get('company') as string | null,
      service: formData.get('service') as string | null,
      budget: formData.get('budget') as string | null,
      message: formData.get('message') as string | null,
    };

    try {
      // בדיקת שעות הפעילות
      if (!isBusinessHours()) {
        // מחוץ לשעות הפעילות - שליחה ישירה למייל
        const emailSubject = `פנייה חדשה מ${data.name} - ${data.service}`;
        const emailBody = `שלום עומר,

קיבלתי פנייה חדשה מהאתר:

שם: ${data.name}
אימייל: ${data.email}
טלפון: ${data.phone}
חברה: ${data.company || 'לא צוין'}
שירות: ${data.service}
תקציב: ${data.budget || 'לא צוין'}
הודעה: ${data.message || 'אין הודעה'}

תודה,
${data.name}`;

        const emailUrl = `mailto:omermaoz1998@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(emailUrl, '_blank');
        
        setSubmitStatus('success');
        form.reset();
        setIsSubmitting(false);
        return;
      }

      // בשעות הפעילות - שליחה דרך WhatsApp
      const whatsappMessage = `שלום עומר!

שם: ${data.name}
אימייל: ${data.email}
טלפון: ${data.phone}
חברה: ${data.company || 'לא צוין'}
שירות: ${data.service}
תקציב: ${data.budget || 'לא צוין'}
הודעה: ${data.message || 'אין הודעה'}

פנייה מהאתר`;

      const whatsappUrl = `https://wa.me/972534258042?text=${encodeURIComponent(whatsappMessage)}`;
      
      // פתיחת WhatsApp
      window.open(whatsappUrl, '_blank');
      
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'בניית אתרים + שיווק בגוגל',
    'שיווק ממומן במטא (פייסבוק + אינסטגרם)',
    'שיווק ממומן בטיקטוק',
    'שירותים משולבים',
    'ייעוץ דיגיטלי'
  ];

  const budgets = [
    '₪2,000 - ₪5,000',
    '₪5,000 - ₪10,000',
    '₪10,000 - ₪20,000',
    '₪20,000 - ₪50,000',
    'מעל ₪50,000'
  ];

  return (
    <section id="contact" className="py-20 bg-white" role="main" aria-labelledby="contact-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="contact-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            צור קשר
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            מוכן להתחיל את הפרויקט הדיגיטלי שלך? השאר פרטים ונחזור אליך בהקדם עם הצעה מותאמת אישית
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="text-center lg:text-right">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                בואו נתחיל לעבוד יחד
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                אנחנו מתמחים בפתרונות דיגיטל מתקדמים שיעזרו לעסק שלך לצמוח ולהצליח.
                השאר פרטים ונחזור אליך תוך 24 שעות עם הצעה מותאמת אישית.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-500 p-4 rounded-xl shadow-lg mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">אימייל</h4>
                  <p className="text-blue-600 font-medium">omermaoz1998@gmail.com</p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border border-pink-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-pink-500 p-4 rounded-xl shadow-lg mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">שעות פעילות</h4>
                  <p className="text-pink-600 font-medium">א-ה: 8:00 - 21:00</p>
                  <p className="text-pink-600 font-medium">ו: 8:00 - 19:00</p>
                </div>
              </div>
            </div>

            {/* Why Work With Us */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 shadow-lg">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">למה לעבוד איתנו?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium mr-2">הצעת פרויקט מותאמת אישית</span>
                </div>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium mr-2">תוכנית עבודה מפורטת</span>
                </div>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium mr-2">מחירים שקופים והוגנים</span>
                </div>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium mr-2">ייעוץ ראשוני חינם</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl">
            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {!isBusinessHours() 
                    ? 'תודה! פתחנו לך את לקוח המייל עם כל הפרטים. נחזור אליך תוך 24 שעות.'
                    : 'תודה! פתחנו לך WhatsApp עם כל הפרטים. נחזור אליך תוך 24 שעות.'
                  }
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">✗</span>
                  אירעה שגיאה. אנא נסה שוב או צור קשר ישירות בוואטסאפ.
                </div>
              </div>
            )}

            <form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              role="form"
              aria-labelledby="contact-title"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    שם מלא *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="הכנס את השם המלא"
                    aria-describedby="name-error"
                    aria-invalid="false"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    אימייל *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    טלפון *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="הכנס מספר טלפון"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    שם החברה
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="שם החברה (אופציונלי)"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  שירות מבוקש *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                >
                  <option value="">בחר שירות</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  תקציב משוער
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                >
                  <option value="">בחר תקציב</option>
                  {budgets.map((budget, index) => (
                    <option key={index} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  הודעה
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="פרט על הפרויקט שלך..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? 'שולח...' 
                  : isBusinessHoursNow 
                    ? 'שלח פנייה דרך WhatsApp' 
                    : 'שלח פנייה דרך Mail'}
              </button>
            </form>

            {/* After Hours Dialog */}
            {showAfterHoursDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                      <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">מחוץ לשעות העבודה</h3>
                    <p className="text-gray-600 mb-6">
                      כרגע אנחנו מחוץ לשעות הפעילות. השאירו פרטים במייל ונחזור אליכם בהקדם.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          if (!formDataToSend) return;
                          
                          const emailSubject = `פנייה חדשה מ${formDataToSend.name} - ${formDataToSend.service}`;
                          const emailBody = `שלום עומר,

קיבלתי פנייה חדשה מהאתר:

שם: ${formDataToSend.name}
אימייל: ${formDataToSend.email}
טלפון: ${formDataToSend.phone}
חברה: ${formDataToSend.company || 'לא צוין'}
שירות: ${formDataToSend.service}
תקציב: ${formDataToSend.budget || 'לא צוין'}
הודעה: ${formDataToSend.message || 'אין הודעה'}

תודה,
${formDataToSend.name}`;

                          const emailUrl = `mailto:omermaoz1998@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                          window.open(emailUrl, '_blank');
                          setShowAfterHoursDialog(false);
                          const form = document.querySelector('form') as HTMLFormElement;
                          form.reset();
                          setFormDataToSend(null);
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        פתח מייל
                      </button>
                      <button
                        onClick={() => {
                          setShowAfterHoursDialog(false);
                          setFormDataToSend(null);
                        }}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        ביטול
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}