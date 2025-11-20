'use client';

import Image from 'next/image';
import EditableText from '@/components/EditableText';
import { useContent } from '@/contexts/ContentContext';

export default function Footer() {
  const { getValue } = useContent();
  const brandTitle = getValue('footer.brand.title', 'Maoz Digital');
  const brandTagline = getValue('footer.brand.tagline', 'Digital Studio');
  const brandDescription = getValue(
    'footer.brand.description',
    'סטודיו בוטיק לשיווק דיגיטלי. אתרים נקיים, קמפיינים ממוקדים ונתונים שמדברים בעד עצמם.'
  );
  const servicesTitle = getValue('footer.services.title', 'השירותים שלנו');
  const servicesItems = [
    { id: 'footer.services.item1', text: getValue('footer.services.item1', 'בניית אתרי פרימיום + SEO') },
    { id: 'footer.services.item2', text: getValue('footer.services.item2', 'ניהול קמפיינים ב-Google') },
    { id: 'footer.services.item3', text: getValue('footer.services.item3', 'Meta Luxury Campaigns') },
    { id: 'footer.services.item4', text: getValue('footer.services.item4', 'TikTok Performance Studio') },
    { id: 'footer.services.item5', text: getValue('footer.services.item5', 'אסטרטגיה, דאטה ואוטומציות') },
  ] as const;
  const contactTitle = getValue('footer.contact.title', 'צור קשר');
  const contactEmail = getValue('footer.contact.email', 'omermaoz1998@gmail.com');
  const contactWhatsapp = getValue('footer.contact.whatsapp', 'שלחו הודעה בוואטסאפ');
  const contactLocation = getValue('footer.contact.location', 'ישראל | פרויקטים בינלאומיים');
  const copyrightTemplate = getValue(
    'footer.copyright',
    '© {year} Maoz Digital – עומר מעוז. כל הזכויות שמורות.'
  );
  const copyrightDisplay = copyrightTemplate.includes('{year}')
    ? copyrightTemplate.replace('{year}', String(new Date().getFullYear()))
    : copyrightTemplate;
  return (
    <footer className="mt-24 bg-white border-t border-[#ebe7dd]" role="contentinfo">
      <div className="container-custom py-12 md:py-16 space-y-12 text-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 place-items-center text-center">
          <div className="space-y-4 max-w-xs flex flex-col items-center text-center">
            <div className="relative h-12 w-12 mb-2">
              <Image
                src="/logo.png"
                alt="לוגו Maoz Digital"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#1e1f24]">
              <EditableText id="footer.brand.title" as="span" defaultValue={brandTitle} />
            </h3>
            <p className="text-xs uppercase tracking-[0.35em] text-[#8696a7]">
              <EditableText id="footer.brand.tagline" as="span" defaultValue={brandTagline} />
            </p>
            <p className="text-sm text-[#4b4d55] leading-relaxed">
              <EditableText id="footer.brand.description" as="span" defaultValue={brandDescription} />
            </p>
          </div>

          <div className="space-y-4 max-w-xs">
            <h4 className="text-lg font-semibold text-[#1e1f24]">
              <EditableText id="footer.services.title" as="span" defaultValue={servicesTitle} />
            </h4>
            <ul className="space-y-2 text-sm text-[#4b4d55]">
              {servicesItems.map((item) => (
                <li key={item.id}>
                  <EditableText id={item.id} as="span" defaultValue={item.text} />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 max-w-xs">
            <h4 className="text-lg font-semibold text-[#1e1f24]">
              <EditableText id="footer.contact.title" as="span" defaultValue={contactTitle} />
            </h4>
            <div className="space-y-3 text-sm text-[#4b4d55]">
              <p className="flex flex-col items-center gap-1">
                <span aria-hidden="true">📧</span>
                <span>
                  <EditableText id="footer.contact.email" as="span" defaultValue={contactEmail} />
                </span>
              </p>
              <a
                href="https://wa.me/972534258042?text=שלום עומר, אני מעוניין בשירותי הדיגיטל שלך"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-[#1e1f24] hover:text-[#d4a65a] transition-colors"
              >
                <span aria-hidden="true">💬</span>
                <span>
                  <EditableText id="footer.contact.whatsapp" as="span" defaultValue={contactWhatsapp} />
                </span>
              </a>
              <p className="flex flex-col items-center gap-1">
                <span aria-hidden="true">📍</span>
                <span>
                  <EditableText id="footer.contact.location" as="span" defaultValue={contactLocation} />
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-[#8696a7]">
          <EditableText
            id="footer.copyright"
            as="span"
            defaultValue={copyrightTemplate}
            displayValue={copyrightDisplay}
          />
        </div>
      </div>
    </footer>
  );
}
