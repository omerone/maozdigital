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
      icon: "🌐",
      headerColor: "bg-blue-500",
      buttonColor: "bg-blue-500 hover:bg-blue-600"
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
      icon: "📱",
      headerColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      buttonColor: "bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90"
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
      icon: "🎵",
      headerColor: "bg-pink-500",
      buttonColor: "bg-pink-500 hover:bg-pink-600"
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
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col"
              role="listitem"
            >
              <div className={`${service.headerColor} p-8 flex flex-col items-center`}>
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white text-center">
                  {service.title}
                </h3>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-600 mb-6 text-center">
                  {service.description}
                </p>
                
                <ul className="space-y-3 flex-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start justify-center">
                      <span className="text-green-500 mr-3 mt-1 text-xl flex-shrink-0">✓</span>
                      <span className="text-gray-700 text-center">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <a
                    href="#contact"
                    className={`w-full ${service.buttonColor} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 block text-center`}
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
