'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import EditableText from '@/components/EditableText';
import { useContentValue } from '@/contexts/ContentContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const homeLabel = useContentValue('header.nav.home', 'בית');
  const servicesLabel = useContentValue('header.nav.services', 'שירותים');
  const contactLabel = useContentValue('header.nav.contact', 'צור קשר');
  const resultsLabel = useContentValue('header.nav.results', 'גלריית תוצאות');
  const adminLoginLabel = useContentValue('header.nav.admin', 'כניסת מנהל');
  const startProjectLabel = useContentValue('header.cta.start', 'התחל פרויקט');

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

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  const navItems = [
    { href: '#home', label: homeLabel, labelId: 'header.nav.home' as const },
    { href: '#services', label: servicesLabel, labelId: 'header.nav.services' as const },
    { href: '#contact', label: contactLabel, labelId: 'header.nav.contact' as const },
  ];

  const handleGalleryClick = () => {
    const event = new CustomEvent('openResultsGallery');
    window.dispatchEvent(event);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur border-b border-[#e7e4dc] shadow-[0_6px_18px_rgba(15,23,42,0.06)]' : 'bg-white/90 border-b border-transparent'}`}
      role="banner"
    >
      <nav className="container-custom" role="navigation" aria-label="ניווט ראשי">
        <div className="flex justify-between items-center h-20 relative">
          <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
            <a
              href="#home"
              className="flex items-center space-x-4 space-x-reverse rounded-xl px-2 py-1 hover:bg-[#f3f1eb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
              aria-label="חזרה לעמוד הבית"
            >
              <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                <Image
                  src="/logo.png"
                  alt="לוגו Maoz Digital"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mr-2 sm:mr-4">
                <h1 className="text-xl sm:text-2xl font-semibold text-[#1e1f24] tracking-tight">
                  <EditableText id="header.logo.title" as="span" defaultValue="Maoz Digital" />
                </h1>
              </div>
            </a>
          </div>

          {/* Mobile centered logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
            <a
              href="#home"
              className="flex items-center space-x-4 space-x-reverse rounded-xl px-2 py-1 hover:bg-[#f3f1eb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
              aria-label="חזרה לעמוד הבית"
            >
              <div className="relative h-12 w-12">
                <Image
                  src="/logo.png"
                  alt="לוגו Maoz Digital"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mr-2">
                <h1 className="text-xl font-semibold text-[#1e1f24] tracking-tight">
                  <EditableText id="header.logo.title.mobile" as="span" defaultValue="Maoz Digital" />
                </h1>
              </div>
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-2 space-x-reverse" role="menubar">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-[#4b4d55] rounded-full hover:text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
                role="menuitem"
                aria-label={`ניווט ל${item.label}`}
              >
                <EditableText id={item.labelId} as="span" defaultValue={item.label} />
              </a>
            ))}
            <a
              href="/admin/login"
              className="px-4 py-2 text-sm font-medium text-[#4b4d55] rounded-full hover:text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
              role="menuitem"
              aria-label="כניסת מנהל"
            >
              <EditableText id="header.nav.admin" as="span" defaultValue={adminLoginLabel} />
            </a>
            <button
              onClick={handleGalleryClick}
              className="px-4 py-2 text-sm font-medium text-[#4b4d55] rounded-full hover:text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors	duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
              role="menuitem"
              aria-label={`פתח ${resultsLabel}`}
            >
              <EditableText id="header.nav.results" as="span" defaultValue={resultsLabel} />
            </button>
            <a href="#contact" className="ml-2 btn-primary px-5 py-2 text-sm font-semibold" role="menuitem">
              <EditableText id="header.cta.start" as="span" defaultValue={startProjectLabel} />
            </a>
          </div>

          <button
            onClick={toggleMenu}
            onKeyDown={handleKeyDown}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors	duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
            aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-400 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="py-4 pb-6 space-y-3 border-t border-[#e7e4dc] bg-white rounded-2xl mt-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] text-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-[#4b4d55] hover:text-[#1e1f24] hover:bg-[#f3f1eb] rounded-lg font-medium transition-colors	duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
                role="menuitem"
                aria-label={`ניווט ל${item.label}`}
              >
                <EditableText id={item.labelId} as="span" defaultValue={item.label} />
              </a>
            ))}
            <a
              href="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-[#4b4d55] hover:text-[#1e1f24] hover:bg-[#f3f1eb] rounded-lg font-medium transition-colors	duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
              role="menuitem"
              aria-label="כניסת מנהל"
            >
              <EditableText id="header.nav.admin" as="span" defaultValue={adminLoginLabel} />
            </a>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleGalleryClick();
              }}
              className="block w-full px-4 py-3 text-[#4b4d55] hover:text-[#1e1f24] hover:bg-[#f3f1eb] rounded-lg font-medium transition-colors	duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
              role="menuitem"
              aria-label={`פתח ${resultsLabel}`}
            >
              <EditableText id="header.nav.results" as="span" defaultValue={resultsLabel} />
            </button>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full px-4 py-3 mx-auto text-center mt-4 mb-2 btn-primary whitespace-nowrap"
              role="menuitem"
            >
              <EditableText id="header.cta.start" as="span" defaultValue={startProjectLabel} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
