import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 mr-6 relative">
                <Image
                  src="/logo.png"
                  alt="לוגו Maoz Digital"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold">Maoz Digital</h3>
            </div>
            <p className="text-gray-300 mb-4 text-center">
              בניית אתרים מקצועיים, שיווק בגוגל, שיווק ממומן במטא וטיקטוק<br />
              פתרונות דיגיטל מתקדמים לעסק שלך עם מעוז דיגיטל
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">השירותים שלנו</h3>
            <ul className="space-y-2 text-gray-300 text-center">
              <li>בניית אתרים מקצועיים</li>
              <li>שיווק בגוגל</li>
              <li>שיווק ממומן במטא</li>
              <li>שיווק ממומן בטיקטוק</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">צור קשר</h3>
            <div className="space-y-3 text-gray-300 text-center">
              <p>📧 omermaoz1998@gmail.com</p>
              <a
                href="https://wa.me/972534258042?text=שלום עומר, אני מעוניין בשירותי הדיגיטל שלך"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:text-green-400 transition-colors"
              >
                <span className="mr-2">💬</span>
                שלח הודעה בוואטסאפ
              </a>
              <p>📍 ישראל</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Maoz Digital - עומר מעוז. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
