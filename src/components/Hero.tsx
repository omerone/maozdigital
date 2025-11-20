export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative bg-white text-gray-900 overflow-hidden"
      role="banner"
      aria-labelledby="hero-title"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 id="hero-title" className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-900">Maoz Digital</span>
            <span className="block text-[#D1A055]">
              פתרונות דיגיטל מתקדמים
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed">
            בניית אתרים מקצועיים, שיווק בגוגל, שיווק ממומן במטא וטיקטוק
            <br />
            פתרונות דיגיטל מתקדמים לעסק שלך עם עומר מעוז
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a
              href="#contact"
              className="group bg-[#D1A055] hover:bg-[#bf9144] text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D1A055] focus:ring-offset-2"
              aria-label="התחל פרויקט"
            >
              <span className="flex items-center justify-center">
                התחל פרויקט
              </span>
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D1A055] mb-2">10,000+</div>
              <div className="text-sm md:text-base text-gray-600">לידים</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D1A055] mb-2">300%</div>
              <div className="text-sm md:text-base text-gray-600">גידול ממוצע</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D1A055] mb-2">3 שנים</div>
              <div className="text-sm md:text-base text-gray-600">ניסיון</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D1A055] mb-2">24/7</div>
              <div className="text-sm md:text-base text-gray-600">תמיכה</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
