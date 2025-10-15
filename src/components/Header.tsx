'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
            <div className="w-12 h-12 mr-3 relative">
              <Image
                src="/logo.png"
                alt="מעוז דיגיטל"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Maoz Digital
            </h1>
          </div>

          {/* Spacer for mobile */}
          <div className="md:hidden w-12"></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <div className="flex items-baseline space-x-6 space-x-reverse">
              <a
                href="#home"
                className="text-gray-900 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                בית
              </a>
              <a
                href="#services"
                className="text-gray-900 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                שירותים
              </a>
              <button
                onClick={() => {
                  // This will be handled by the ResultsGallery component
                  const event = new CustomEvent('openResultsGallery');
                  window.dispatchEvent(event);
                }}
                className="text-gray-900 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                תוצאות
              </button>
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
              >
                צור קשר
              </a>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <a
              href="#home"
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              בית
            </a>
            <a
              href="#services"
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
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
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-right"
            >
              תוצאות
            </button>
            <a
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium"
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
