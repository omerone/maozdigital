'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: '#home', label: 'בית' },
    { href: '#services', label: 'שירותים' },
    { href: '#contact', label: 'צור קשר' },
  ];

  const handleGalleryClick = () => {
    const event = new CustomEvent('openResultsGallery');
    window.dispatchEvent(event);
  };

  return (
    <header className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="Maoz Digital"
                fill
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Maoz Digital
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-sm rounded-lg transition-all duration-200 hover:bg-blue-50"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={handleGalleryClick}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-sm rounded-lg transition-all duration-200 hover:bg-blue-50"
            >
              גלריית תוצאות
            </button>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            aria-label="תפריט"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleGalleryClick();
              }}
              className="block w-full text-right px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
            >
              גלריית תוצאות
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
