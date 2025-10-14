'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // הגדרות EmailJS - תצטרך להחליף עם הפרטים שלך
      const serviceId = 'YOUR_SERVICE_ID'; // החלף עם Service ID שלך
      const templateId = 'YOUR_TEMPLATE_ID'; // החלף עם Template ID שלך
      const publicKey = 'YOUR_PUBLIC_KEY'; // החלף עם Public Key שלך
      
      // הכנת הנתונים לשליחה
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
        to_email: 'omermaoz1998@gmail.com',
        reply_to: formData.email
      };

      // שליחת המייל
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      
      // איפוס הטופס
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      });
      
      // שליחת הודעה לוואטסאפ גם כן
      const whatsappMessage = `🎉 ליד חדש מהאתר!
      
👤 שם: ${formData.name}
📧 אימייל: ${formData.email}
📱 טלפון: ${formData.phone}
🏢 חברה: ${formData.company || 'לא צוין'}
🔧 שירות: ${formData.service}
💰 תקציב: ${formData.budget || 'לא צוין'}
💬 הודעה: ${formData.message || 'אין הודעה נוספת'}

תאריך: ${new Date().toLocaleString('he-IL')}`;

      // פתיחת וואטסאפ עם ההודעה
      const whatsappUrl = `https://wa.me/972534258042?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error('Error sending email:', error);
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
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <span className="text-blue-600 text-xl">📧</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">אימייל</h4>
                  <p className="text-gray-600">omermaoz1998@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <span className="text-blue-600 text-xl">💬</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">וואטסאפ</h4>
                  <a
                    href="https://wa.me/972534258042?text=שלום עומר, אני מעוניין בשירותי הדיגיטל שלך"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    שלח הודעה עכשיו
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <span className="text-blue-600 text-xl">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">שעות זמינות ליעוץ</h4>
                  <p className="text-gray-600">א׳-ה׳ 10:00-20:00</p>
                  <p className="text-gray-600">ש׳ 10:00-15:00</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-3">מה תקבל בתשובה?</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  הצעה מותאמת אישית לפרויקט שלך
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  תוכנית עבודה מפורטת
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  הצעת מחיר שקופה ומפורטת
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
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
                  תודה! קיבלנו את הפנייה שלך ונחזור אליך תוך 24 שעות.
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">✗</span>
                  אירעה שגיאה בשליחת הטופס. אנא נסה שוב.
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
                    value={formData.name}
                    onChange={handleInputChange}
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
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="050-123-4567"
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
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="שם החברה"
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
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">בחר שירות</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
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
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">בחר תקציב</option>
                  {budgets.map((budget, index) => (
                    <option key={index} value={budget}>
                      {budget}
                    </option>
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
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ספר לנו על הפרויקט שלך, המטרות והאתגרים..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    שולח...
                  </div>
                ) : (
                  'שלח פנייה עכשיו'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
