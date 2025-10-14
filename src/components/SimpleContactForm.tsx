'use client';

import { useState } from "react";

export default function SimpleContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // יצירת אובייקט עם הנתונים
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      service: formData.get('service'),
      budget: formData.get('budget'),
      message: formData.get('message'),
    };

    try {
      // שליחה דרך WhatsApp
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
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            צור קשר
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            מוכן להתחיל את הפרויקט הדיגיטלי שלך? השאר פרטים ונחזור אליך בהקדם עם הצעה מותאמת אישית
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                בואו נתחיל לעבוד יחד
              </h3>
              <p className="text-gray-600 mb-8">
                אנחנו מתמחים בפתרונות דיגיטל מתקדמים שיעזרו לעסק שלך לצמוח ולהצליח.
                השאר פרטים ונחזור אליך תוך 24 שעות עם הצעה מותאמת אישית.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <span className="text-blue-600 text-xl">📧</span>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">אימייל</h4>
                  <p className="text-gray-600">omermaoz1998@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <span className="text-purple-600 text-xl">📞</span>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">טלפון</h4>
                  <p className="text-gray-600">+972-53-4258042</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-pink-100 p-3 rounded-lg mr-4">
                  <span className="text-pink-600 text-xl">⏰</span>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">שעות פעילות</h4>
                  <p className="text-gray-600">א-ה: 10:00 - 20:00</p>
                  <p className="text-gray-600">ו: 10:00 - 15:00</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">למה לעבוד איתנו?</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center justify-center lg:justify-start">
                  <span className="text-green-500 mr-3">✓</span>
                  הצעת פרויקט מותאמת אישית
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <span className="text-green-500 mr-3">✓</span>
                  תוכנית עבודה מפורטת
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <span className="text-green-500 mr-3">✓</span>
                  מחירים שקופים והוגנים
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <span className="text-green-500 mr-3">✓</span>
                  ייעוץ ראשוני חינם
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl">
            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  תודה! פתחנו לך WhatsApp עם כל הפרטים. נחזור אליך תוך 24 שעות.
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                {isSubmitting ? 'שולח...' : 'שלח פנייה דרך WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}