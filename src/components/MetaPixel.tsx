'use client';

import Script from 'next/script';

const META_PIXEL_ID = '1574922773642794';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt="Meta Pixel"
        />
      </noscript>
    </>
  );
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
