'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-10 h-10 mr-3 relative">
              <Image
                src="/logo.png"
                alt="מעוז דיגיטל"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold leading-tight">
                <span className="text-blue-600">Maoz</span> <span className="text-gray-800">Digital</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              בית
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              שירותים
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              צור קשר
            </a>
            <div className="h-6 w-px bg-gray-300"></div>
            <button
              onClick={() => {
                const event = new CustomEvent('openResultsGallery');
                window.dispatchEvent(event);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              צפה בתוצאות
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">פתח תפריט</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden py-4 border-t border-gray-100`}>
          <div className="space-y-1">
            <a
              href="#home"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              בית
            </a>
            <a
              href="#services"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              שירותים
            </a>
            <a
              href="#contact"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              צור קשר
            </a>
            <div className="px-4 pt-2">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  const event = new CustomEvent('openResultsGallery');
                  window.dispatchEvent(event);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-colors shadow-sm"
              >
                צפה בתוצאות
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
