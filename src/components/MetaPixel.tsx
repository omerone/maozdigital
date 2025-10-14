'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  useEffect(() => {
    // הוספת Meta Pixel
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      // החלף עם ה-Pixel ID שלך
      fbq('init', 'YOUR_PIXEL_ID');
      fbq('track', 'PageView');
    `;
    
    document.head.appendChild(script);

    // הוספת noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <img height="1" width="1" style="display:none"
           src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
      />
    `;
    document.body.appendChild(noscript);

    return () => {
      // ניקוי
      document.head.removeChild(script);
      document.body.removeChild(noscript);
    };
  }, []);

  return null;
}

// פונקציה לעקיבה אחר פעולות משתמש
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// פונקציות עקיבה מוגדרות מראש
export const trackLead = () => {
  trackEvent('Lead');
};

export const trackContact = () => {
  trackEvent('Contact');
};

export const trackViewContent = () => {
  trackEvent('ViewContent');
};
