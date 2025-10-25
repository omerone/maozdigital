'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 relative">
      {/* Gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">פתח תפריט</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1">
            <div className="w-14 h-14 mr-4 relative">
              <Image
                src="/logo.png"
                alt="מעוז דיגיטל"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Maoz Digital
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Digital Marketing Solutions</p>
            </div>
          </div>

          {/* Spacer for mobile */}
          <div className="md:hidden w-12"></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <div className="flex items-baseline space-x-8 space-x-reverse">
              <a
                href="#home"
                className="text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-blue-50"
              >
                בית
              </a>
              <a
                href="#services"
                className="text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-blue-50"
              >
                שירותים
              </a>
              <a
                href="#contact"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                צור קשר
              </a>
            </div>
          </div>

          {/* Results Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => {
                // This will be handled by the ResultsGallery component
                const event = new CustomEvent('openResultsGallery');
                window.dispatchEvent(event);
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 space-x-reverse shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>צפה בתוצאות שלי</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-4 pt-4 pb-6 space-y-3 sm:px-6 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
            <a
              href="#home"
              className="text-gray-800 hover:text-blue-600 block px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              בית
            </a>
            <a
              href="#services"
              className="text-gray-800 hover:text-blue-600 block px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              שירותים
            </a>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                const event = new CustomEvent('openResultsGallery');
                window.dispatchEvent(event);
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 space-x-reverse shadow-xl hover:shadow-2xl w-full transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>צפה בתוצאות שלי</span>
            </button>
            <a
              href="#contact"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white block px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              צור קשר
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
