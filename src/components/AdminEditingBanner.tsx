'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

export default function AdminEditingBanner() {
  const { isAdmin, isLoading, refresh } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      document.documentElement.classList.add('admin-edit-mode');
    } else {
      document.documentElement.classList.remove('admin-edit-mode');
    }

    return () => {
      document.documentElement.classList.remove('admin-edit-mode');
    };
  }, [isAdmin]);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const navigateToHome = useCallback(() => {
    closeMenu();
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [closeMenu]);

  const openGallery = useCallback(() => {
    closeMenu();
    if (window.location.pathname !== '/') {
      window.location.href = '/#results';
      return;
    }
    window.dispatchEvent(new CustomEvent('openResultsGallery'));
  }, [closeMenu]);

  const handleLogout = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      await refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      window.location.href = '/';
    }
  }, [isProcessing, refresh]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('[data-admin-menu]')) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  if (isLoading || !isAdmin) {
    return null;
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-[120] flex flex-col items-start gap-2 text-sm"
      data-admin-menu="container"
    >
      {isMenuOpen && (
        <div
          className="mb-2 min-w-[220px] rounded-2xl border border-[#d4a65a] bg-white/95 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur"
          data-admin-menu
        >
          <div className="mb-3 font-semibold text-[#1e1f24]">מצב עריכת מנהל פעיל</div>
          <div className="flex flex-col gap-2 text-[#1e1f24]">
            <button
              type="button"
              onClick={navigateToHome}
              className="w-full rounded-full border border-[#d4a65a]/40 px-4 py-2 text-right transition-colors hover:bg-[#fdf3e0]"
            >
              חזרה לעריכת האתר
            </button>
            <button
              type="button"
              onClick={openGallery}
              className="w-full rounded-full border border-[#d4a65a]/40 px-4 py-2 text-right transition-colors hover:bg-[#fdf3e0]"
            >
              עריכת גלריית התוצאות
            </button>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isProcessing}
              className="w-full rounded-full border border-[#d4a65a] bg-[#d4a65a] px-4 py-2 text-right font-semibold text-white transition-colors hover:bg-[#c1954d] disabled:opacity-60"
            >
              התנתקות
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleToggleMenu}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4a65a] bg-white text-[#1e1f24] shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40"
        aria-label={isMenuOpen ? 'סגור תפריט מנהל' : 'פתח תפריט מנהל'}
        data-admin-menu
      >
        <span className="text-xl" aria-hidden="true">
          {isMenuOpen ? '×' : '⚙︎'}
        </span>
      </button>
    </div>
  );
}


