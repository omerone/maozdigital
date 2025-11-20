import type { EditableContentKey } from './content';

export interface AdminContentField {
  id: EditableContentKey;
  label: string;
  description?: string;
  note?: string;
  multiline?: boolean;
}

export interface AdminContentSection {
  id: string;
  title: string;
  description?: string;
  fields: AdminContentField[];
}

export const ADMIN_CONTENT_SECTIONS: AdminContentSection[] = [
  {
    id: 'hero',
    title: 'חלק פתיחה (Hero)',
    description: 'כותרות, תתי כותרות וכפתורים שמופיעים בראש האתר.',
    fields: [
      { id: 'hero.tagline', label: 'תג-על (שורה עליונה)' },
      { id: 'hero.title', label: 'כותרת ראשית' },
      { id: 'hero.subtitle', label: 'כותרת משנה' },
      { id: 'hero.description', label: 'פסקה מתחת לכותרת', multiline: true },
      { id: 'hero.primaryCta', label: 'כפתור ראשי' },
      { id: 'hero.secondaryCta', label: 'כפתור משני' },
    ],
  },
  {
    id: 'hero-stats',
    title: 'נתוני פתיחה',
    description: 'ארבעת הנתונים שמופיעים לצד החלק הראשי.',
    fields: [
      { id: 'hero.stats.leads.value', label: 'ערך מס\' לידים' },
      { id: 'hero.stats.leads.label', label: 'כיתוב מס\' לידים' },
      { id: 'hero.stats.roi.value', label: 'ערך ROI' },
      { id: 'hero.stats.roi.label', label: 'כיתוב ROI' },
      { id: 'hero.stats.experience.value', label: 'ערך שנות ניסיון' },
      { id: 'hero.stats.experience.label', label: 'כיתוב שנות ניסיון' },
      { id: 'hero.stats.availability.value', label: 'ערך זמינות' },
      { id: 'hero.stats.availability.label', label: 'כיתוב זמינות' },
    ],
  },
  {
    id: 'services-intro',
    title: 'חלק השירותים – פתיח',
    fields: [
      { id: 'services.heading', label: 'כותרת החלק' },
      { id: 'services.subheading', label: 'פסקת פתיחה', multiline: true },
      { id: 'services.card.tagline', label: 'תג עליון בכרטיסים' },
    ],
  },
  {
    id: 'services-web',
    title: 'שירות – בניית אתרים + Google Growth',
    fields: [
      { id: 'services.items.web.title', label: 'כותרת' },
      { id: 'services.items.web.description', label: 'תיאור', multiline: true },
      { id: 'services.items.web.feature1', label: 'בוליט 1' },
      { id: 'services.items.web.feature2', label: 'בוליט 2' },
      { id: 'services.items.web.feature3', label: 'בוליט 3' },
      { id: 'services.items.web.feature4', label: 'בוליט 4' },
    ],
  },
  {
    id: 'services-meta',
    title: 'שירות – Meta Luxury Campaigns',
    fields: [
      { id: 'services.items.meta.title', label: 'כותרת' },
      { id: 'services.items.meta.description', label: 'תיאור', multiline: true },
      { id: 'services.items.meta.feature1', label: 'בוליט 1' },
      { id: 'services.items.meta.feature2', label: 'בוליט 2' },
      { id: 'services.items.meta.feature3', label: 'בוליט 3' },
      { id: 'services.items.meta.feature4', label: 'בוליט 4' },
    ],
  },
  {
    id: 'services-tiktok',
    title: 'שירות – TikTok Performance Studio',
    fields: [
      { id: 'services.items.tiktok.title', label: 'כותרת' },
      { id: 'services.items.tiktok.description', label: 'תיאור', multiline: true },
      { id: 'services.items.tiktok.feature1', label: 'בוליט 1' },
      { id: 'services.items.tiktok.feature2', label: 'בוליט 2' },
      { id: 'services.items.tiktok.feature3', label: 'בוליט 3' },
      { id: 'services.items.tiktok.feature4', label: 'בוליט 4' },
      { id: 'services.items.cta', label: 'כפתור בתחתית הכרטיסים' },
    ],
  },
  {
    id: 'gallery',
    title: 'חלק תוצאות – טקסטים כלליים',
    fields: [
      { id: 'gallery.tagline', label: 'תג עליון' },
      { id: 'gallery.title', label: 'כותרת ראשית' },
      { id: 'gallery.description', label: 'פסקת פתיחה', multiline: true },
      { id: 'gallery.card.description', label: 'תיאור בתיבה', multiline: true },
      { id: 'gallery.box.title', label: 'כותרת תיבת מה זה אומר' },
      { id: 'gallery.box.feature1', label: 'בוליט 1' },
      { id: 'gallery.box.feature2', label: 'בוליט 2' },
      { id: 'gallery.box.feature3', label: 'בוליט 3' },
      { id: 'gallery.button', label: 'כפתור פתיחת גלריה' },
    ],
  },
  {
    id: 'gallery-metrics',
    title: 'חלק תוצאות – נתונים',
    fields: [
      { id: 'gallery.metrics.reach.title', label: 'כותרת נתון Reach' },
      { id: 'gallery.metrics.reach.value', label: 'ערך Reach' },
      { id: 'gallery.metrics.reach.caption', label: 'תיאור Reach' },
      { id: 'gallery.metrics.conversions.title', label: 'כותרת נתון Conversions' },
      { id: 'gallery.metrics.conversions.value', label: 'ערך Conversions' },
      { id: 'gallery.metrics.conversions.caption', label: 'תיאור Conversions' },
      { id: 'gallery.metrics.engagements.title', label: 'כותרת נתון Engagements' },
      { id: 'gallery.metrics.engagements.value', label: 'ערך Engagements' },
      { id: 'gallery.metrics.engagements.caption', label: 'תיאור Engagements' },
    ],
  },
  {
    id: 'ratings',
    title: 'חלק ביקורות',
    fields: [
      { id: 'ratings.heading', label: 'כותרת ראשית' },
      { id: 'ratings.description', label: 'תיאור', multiline: true },
      { id: 'ratings.loadingReviews', label: 'טקסט מצב טעינת ביקורות' },
      { id: 'ratings.errorReviews', label: 'טקסט שגיאה בביקורות' },
      { id: 'ratings.emptyReviews', label: 'טקסט אין ביקורות' },
      { id: 'ratings.nextReview', label: 'כפתור הבא' },
      { id: 'ratings.prevReview', label: 'כפתור קודם' },
      { id: 'ratings.loadingScores', label: 'טקסט טעינת הציונים' },
      { id: 'ratings.errorScores', label: 'טקסט שגיאה בציונים' },
      { id: 'ratings.viewOnGoogle', label: 'כפתור לצפייה בגוגל' },
      { id: 'ratings.leaveReview', label: 'כפתור השארת ביקורת' },
      { id: 'ratings.googleLabel', label: 'כותרת Google Reviews' },
      { id: 'ratings.totalPrefix', label: 'טקסט לפני מספר הביקורות' },
      { id: 'ratings.totalSuffix', label: 'טקסט אחרי מספר הביקורות' },
    ],
  },
  {
    id: 'contact',
    title: 'חלק יצירת קשר',
    description: 'כותרות טופס וסעיפים בצד ימין.',
    fields: [
      { id: 'contact.heading', label: 'כותרת ראשית' },
      { id: 'contact.subheading', label: 'פסקת פתיחה', multiline: true },
      { id: 'contact.channels.title', label: 'כותרת ערוצי קשר' },
      { id: 'contact.channels.email', label: 'אימייל' },
      { id: 'contact.channels.whatsapp', label: 'לינק WhatsApp / טקסט' },
      { id: 'contact.channels.location', label: 'מיקום' },
      { id: 'contact.hours.title', label: 'כותרת שעות פעילות' },
      { id: 'contact.hours.weekdays', label: 'שעות א-ה' },
      { id: 'contact.hours.friday', label: 'שעות יום ו\'' },
      { id: 'contact.hours.note', label: 'הערת שעות נוספות', multiline: true },
    ],
  },
  {
    id: 'contact-form',
    title: 'טופס יצירת קשר',
    fields: [
      { id: 'contact.form.nameLabel', label: 'תווית שם מלא' },
      { id: 'contact.form.namePlaceholder', label: 'Placeholder שם מלא' },
      { id: 'contact.form.emailLabel', label: 'תווית אימייל' },
      { id: 'contact.form.emailPlaceholder', label: 'Placeholder אימייל' },
      { id: 'contact.form.phoneLabel', label: 'תווית טלפון' },
      { id: 'contact.form.phonePlaceholder', label: 'Placeholder טלפון' },
      { id: 'contact.form.companyLabel', label: 'תווית חברה' },
      { id: 'contact.form.companyPlaceholder', label: 'Placeholder חברה' },
      { id: 'contact.form.serviceLabel', label: 'תווית שירות מבוקש' },
      { id: 'contact.form.servicePlaceholder', label: 'Placeholder שירות מבוקש' },
      { id: 'contact.form.budgetLabel', label: 'תווית תקציב' },
      { id: 'contact.form.budgetPlaceholder', label: 'Placeholder תקציב' },
      { id: 'contact.form.messageLabel', label: 'תווית הודעה' },
      { id: 'contact.form.messagePlaceholder', label: 'Placeholder הודעה' },
      { id: 'contact.form.submit.whatsapp', label: 'כפתור שליחה דרך WhatsApp' },
      { id: 'contact.form.submit.mail', label: 'כפתור שליחה דרך מייל' },
      { id: 'contact.form.submit.sending', label: 'טקסט מצב שליחה' },
      { id: 'contact.form.success.whatsapp', label: 'טקסט הצלחה – WhatsApp', multiline: true },
      { id: 'contact.form.success.mail', label: 'טקסט הצלחה – Mail', multiline: true },
      { id: 'contact.form.error', label: 'טקסט שגיאה כללי', multiline: true },
      { id: 'contact.form.afterHours.title', label: 'כותרת מחוץ לשעות פעילות' },
      { id: 'contact.form.afterHours.description', label: 'תיאור מחוץ לשעות', multiline: true },
      { id: 'contact.form.afterHours.openMail', label: 'כפתור פתח מייל' },
      { id: 'contact.form.afterHours.cancel', label: 'כפתור ביטול' },
    ],
  },
  {
    id: 'contact-select-options',
    title: 'אפשרויות בטופס יצירת קשר',
    description: 'אפשרויות בתיבות הבחירה לטפסים.',
    fields: [
      { id: 'contact.services.option.web', label: 'אפשרות שירות – אתרים + גוגל' },
      { id: 'contact.services.option.meta', label: 'אפשרות שירות – מטא' },
      { id: 'contact.services.option.tiktok', label: 'אפשרות שירות – טיקטוק' },
      { id: 'contact.services.option.bundle', label: 'אפשרות שירות – חבילה' },
      { id: 'contact.services.option.consulting', label: 'אפשרות שירות – ייעוץ' },
      { id: 'contact.budgets.option.1', label: 'אפשרות תקציב 1' },
      { id: 'contact.budgets.option.2', label: 'אפשרות תקציב 2' },
      { id: 'contact.budgets.option.3', label: 'אפשרות תקציב 3' },
      { id: 'contact.budgets.option.4', label: 'אפשרות תקציב 4' },
      { id: 'contact.budgets.option.5', label: 'אפשרות תקציב 5' },
    ],
  },
  {
    id: 'footer',
    title: 'פוטר האתר',
    fields: [
      { id: 'footer.brand.title', label: 'כותרת מותג' },
      { id: 'footer.brand.tagline', label: 'תג מותג' },
      { id: 'footer.brand.description', label: 'תיאור מותג', multiline: true },
      { id: 'footer.services.title', label: 'כותרת רשימת שירותים' },
      { id: 'footer.services.item1', label: 'שירות 1' },
      { id: 'footer.services.item2', label: 'שירות 2' },
      { id: 'footer.services.item3', label: 'שירות 3' },
      { id: 'footer.services.item4', label: 'שירות 4' },
      { id: 'footer.services.item5', label: 'שירות 5' },
      { id: 'footer.contact.title', label: 'כותרת יצירת קשר' },
      { id: 'footer.contact.email', label: 'אימייל בפוטר' },
      { id: 'footer.contact.whatsapp', label: 'טקסט וואטסאפ בפוטר' },
      { id: 'footer.contact.location', label: 'מיקום בפוטר' },
      {
        id: 'footer.copyright',
        label: 'שורת זכויות יוצרים',
        note: 'השאר את {year} כדי שהשנה תתעדכן אוטומטית.',
      },
    ],
  },
];


