'use client';

import { useState, useEffect } from 'react';

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    focusVisible: true,
    screenReader: false
  });

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Apply settings to document
    const root = document.documentElement;
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    if (settings.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }

    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="פתח הגדרות נגישות"
        title="הגדרות נגישות"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-80 z-50"
          role="dialog"
          aria-labelledby="accessibility-title"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 id="accessibility-title" className="text-lg font-semibold text-gray-900">
              הגדרות נגישות
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="סגור הגדרות נגישות"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">ניגודיות גבוהה</label>
                <p className="text-xs text-gray-500">משפר את הניגודיות של הטקסט והרקע</p>
              </div>
              <button
                onClick={() => toggleSetting('highContrast')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.highContrast ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.highContrast}
                aria-label="הפעל ניגודיות גבוהה"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Large Text */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">טקסט גדול</label>
                <p className="text-xs text-gray-500">מגדיל את גודל הטקסט באתר</p>
              </div>
              <button
                onClick={() => toggleSetting('largeText')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.largeText ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.largeText}
                aria-label="הפעל טקסט גדול"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.largeText ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">הפחתת תנועה</label>
                <p className="text-xs text-gray-500">מפחית אנימציות ותנועות</p>
              </div>
              <button
                onClick={() => toggleSetting('reducedMotion')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.reducedMotion ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.reducedMotion}
                aria-label="הפעל הפחתת תנועה"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Focus Visible */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">הדגשת מיקוד</label>
                <p className="text-xs text-gray-500">מדגיש את האלמנט הממוקד</p>
              </div>
              <button
                onClick={() => toggleSetting('focusVisible')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.focusVisible ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.focusVisible}
                aria-label="הפעל הדגשת מיקוד"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.focusVisible ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSettings({
                  highContrast: false,
                  largeText: false,
                  reducedMotion: false,
                  focusVisible: true,
                  screenReader: false
                });
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}
    </>
  );
}
