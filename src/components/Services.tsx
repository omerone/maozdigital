export default function Services() {
  const services = [
    {
      title: "בניית אתרים + שיווק בגוגל",
      description: "בניית אתרים מקצועיים ומודרניים עם אופטימיזציה מלאה למנועי חיפוש. כולל SEO, מהירות טעינה ואינטראקטיביות מתקדמת.",
      features: [
        "עיצוב רספונסיבי ומקצועי",
        "אופטימיזציה למנועי חיפוש (SEO)",
        "מהירות טעינה גבוהה",
        "ניהול תוכן קל",
        "שיווק בגוגל Ads",
        "ניתוח ביצועים מתקדם"
      ],
      icon: (
        <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "שיווק ממומן במטא (פייסבוק + אינסטגרם)",
      description: "קמפיינים ממוקדים בפייסבוק ואינסטגרם שמביאים תוצאות אמיתיות. כולל ניהול תקציב, אופטימיזציה ותמיכה מתמדת.",
      features: [
        "קמפיינים ממוקדים ומדויקים",
        "ניהול תקציב חכם",
        "ניתוח ביצועים בזמן אמת",
        "אופטימיזציה מתמדת",
        "יצירת תוכן איכותי",
        "הגדלת המכירות"
      ],
      icon: (
        <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "שיווק ממומן בטיקטוק",
      description: "שיווק ממוקד לקהל הצעיר בטיקטוק. יצירת תוכן ויראלי וקמפיינים שמגיעים למיליוני אנשים.",
      features: [
        "קמפיינים ויראליים",
        "יצירת תוכן איכותי",
        "הגעה לקהל צעיר",
        "ניתוח טרנדים",
        "אופטימיזציה מתמדת",
        "הגדלת המודעות למותג"
      ],
      icon: (
        <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-20 bg-white" role="region" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="services-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            השירותים שלנו
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            אנחנו מציעים פתרונות דיגיטל מקיפים שיעזרו לעסק שלך לצמוח ולהצליח בעולם הדיגיטלי
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col"
              role="listitem"
            >
              <div className="p-8 flex flex-col items-center">
                <div className="mb-6 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center leading-tight">
                  {service.title}
                </h3>
              </div>
              
              <div className="px-6 pb-6 flex-1 flex flex-col">
                <p className="text-gray-600 mb-6 text-center text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 flex-1 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start justify-start">
                      <span className="text-[#D1A055] ml-3 mt-0.5 text-lg flex-shrink-0 font-bold">✓</span>
                      <span className="text-gray-700 text-sm text-right flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <a
                    href="#contact"
                    className="w-full bg-[#D1A055] hover:bg-[#bf9144] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 block text-center shadow-sm hover:shadow-md"
                  >
                    בואו נתחיל
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
