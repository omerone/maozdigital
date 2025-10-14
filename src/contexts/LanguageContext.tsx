'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  he: {
    home: 'בית',
    services: 'שירותים',
    results: 'תוצאות',
    contact: 'צור קשר',
    heroTitle: 'פתרונות דיגיטל מקצועיים',
    heroSubtitle: 'עם עומר מעוז - מומחה לבניית אתרים ושיווק ממומן.',
    heroDescription: 'אנחנו מביאים את העסק שלך לרמה הבאה עם תוצאות מוכחות',
    discoverServices: 'גלה את השירותים שלנו',
    contactNow: 'צור קשר עכשיו',
    ourServices: 'השירותים שלנו',
    servicesDescription: 'אנחנו מציעים פתרונות דיגיטל מקיפים שיעזרו לעסק שלך לצמוח ולהצליח בעולם הדיגיטלי',
    websiteBuilding: 'בניית אתרים + שיווק בגוגל',
    websiteDescription: 'בניית אתרים מקצועיים ומודרניים עם אופטימיזציה מלאה למנועי חיפוש. כולל SEO, מהירות טעינה ואינטראקטיביות מתקדמת.',
    metaMarketing: 'שיווק ממומן במטא (פייסבוק + אינסטגרם)',
    metaDescription: 'קמפיינים ממוקדים בפייסבוק ואינסטגרם שמביאים תוצאות אמיתיות. כולל ניהול תקציב, אופטימיזציה ותמיכה מתמדת.',
    tiktokMarketing: 'שיווק ממומן בטיקטוק',
    tiktokDescription: 'שיווק ממוקד לקהל הצעיר בטיקטוק. יצירת תוכן ויראלי וקמפיינים שמגיעים למיליוני אנשים.',
    letsStart: 'בואו נתחיל',
    realResults: 'תוצאות אמיתיות',
    resultsDescription: 'צילומי מסך של תוצאות אמיתיות שהשגנו עבור הלקוחות שלנו. כל תמונה מייצגת הצלחה אמיתית',
    contactTitle: 'צור קשר',
    contactDescription: 'מוכן להתחיל את הפרויקט הדיגיטלי שלך? השאר פרטים ונחזור אליך בהקדם עם הצעה מותאמת אישית',
    ratingsTitle: 'דירוגים של לקוחות',
    basedOn: 'מבוסס על',
    ratings: 'דירוגים',
    happyClients: 'לקוחות מרוצים',
    averageGrowth: 'גידול ממוצע',
    experience: 'ניסיון',
    support: 'תמיכה',
    years: 'שנים'
  },
  en: {
    home: 'Home',
    services: 'Services',
    results: 'Results',
    contact: 'Contact',
    heroTitle: 'Professional Digital Solutions',
    heroSubtitle: 'With Omer Maoz - Expert in website building and digital marketing.',
    heroDescription: 'We take your business to the next level with proven results',
    discoverServices: 'Discover Our Services',
    contactNow: 'Contact Now',
    ourServices: 'Our Services',
    servicesDescription: 'We offer comprehensive digital solutions that will help your business grow and succeed in the digital world',
    websiteBuilding: 'Website Building + Google Marketing',
    websiteDescription: 'Professional and modern website building with full search engine optimization. Includes SEO, fast loading speed and advanced interactivity.',
    metaMarketing: 'Paid Marketing on Meta (Facebook + Instagram)',
    metaDescription: 'Targeted campaigns on Facebook and Instagram that bring real results. Includes budget management, optimization and continuous support.',
    tiktokMarketing: 'Paid Marketing on TikTok',
    tiktokDescription: 'Targeted marketing for the young audience on TikTok. Creation of viral content and campaigns that reach millions of people.',
    letsStart: "Let's Start",
    realResults: 'Real Results',
    resultsDescription: 'Screenshots of real results we achieved for our clients. Each image represents real success',
    contactTitle: 'Contact',
    contactDescription: 'Ready to start your digital project? Leave details and we will get back to you soon with a personalized offer',
    ratingsTitle: 'Customer Ratings',
    basedOn: 'Based on',
    ratings: 'ratings',
    happyClients: 'Happy Clients',
    averageGrowth: 'Average Growth',
    experience: 'Experience',
    support: 'Support',
    years: 'years'
  },
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    results: 'النتائج',
    contact: 'اتصل بنا',
    heroTitle: 'حلول رقمية مهنية',
    heroSubtitle: 'مع عومر معوز - خبير في بناء المواقع والتسويق الرقمي.',
    heroDescription: 'نحن نأخذ عملك إلى المستوى التالي مع نتائج مثبتة',
    discoverServices: 'اكتشف خدماتنا',
    contactNow: 'اتصل الآن',
    ourServices: 'خدماتنا',
    servicesDescription: 'نحن نقدم حلول رقمية شاملة ستساعد عملك على النمو والنجاح في العالم الرقمي',
    websiteBuilding: 'بناء المواقع + التسويق في جوجل',
    websiteDescription: 'بناء مواقع احترافية وحديثة مع تحسين كامل لمحركات البحث. يشمل SEO وسرعة تحميل عالية وتفاعل متقدم.',
    metaMarketing: 'التسويق المدفوع في ميتا (فيسبوك + إنستغرام)',
    metaDescription: 'حملات مستهدفة في فيسبوك وإنستغرام تجلب نتائج حقيقية. يشمل إدارة الميزانية والتحسين والدعم المستمر.',
    tiktokMarketing: 'التسويق المدفوع في تيك توك',
    tiktokDescription: 'تسويق مستهدف للجمهور الشاب في تيك توك. إنشاء محتوى فيروسي وحملات تصل لملايين الأشخاص.',
    letsStart: 'لنبدأ',
    realResults: 'نتائج حقيقية',
    resultsDescription: 'لقطات شاشة لنتائج حقيقية حققناها لعملائنا. كل صورة تمثل نجاح حقيقي',
    contactTitle: 'اتصل بنا',
    contactDescription: 'مستعد لبدء مشروعك الرقمي؟ اترك التفاصيل وسنعود إليك قريباً بعرض مخصص',
    ratingsTitle: 'تقييمات العملاء',
    basedOn: 'بناءً على',
    ratings: 'تقييم',
    happyClients: 'عملاء سعداء',
    averageGrowth: 'نمو متوسط',
    experience: 'خبرة',
    support: 'دعم',
    years: 'سنوات'
  },
  ru: {
    home: 'Главная',
    services: 'Услуги',
    results: 'Результаты',
    contact: 'Контакты',
    heroTitle: 'Профессиональные цифровые решения',
    heroSubtitle: 'С Омером Маозом - экспертом по созданию сайтов и цифровому маркетингу.',
    heroDescription: 'Мы выводим ваш бизнес на новый уровень с проверенными результатами',
    discoverServices: 'Узнать наши услуги',
    contactNow: 'Связаться сейчас',
    ourServices: 'Наши услуги',
    servicesDescription: 'Мы предлагаем комплексные цифровые решения, которые помогут вашему бизнесу расти и преуспевать в цифровом мире',
    websiteBuilding: 'Создание сайтов + маркетинг в Google',
    websiteDescription: 'Профессиональное и современное создание сайтов с полной оптимизацией для поисковых систем. Включает SEO, высокую скорость загрузки и продвинутую интерактивность.',
    metaMarketing: 'Платный маркетинг в Meta (Facebook + Instagram)',
    metaDescription: 'Таргетированные кампании в Facebook и Instagram, которые приносят реальные результаты. Включает управление бюджетом, оптимизацию и постоянную поддержку.',
    tiktokMarketing: 'Платный маркетинг в TikTok',
    tiktokDescription: 'Таргетированный маркетинг для молодой аудитории в TikTok. Создание вирусного контента и кампаний, которые достигают миллионов людей.',
    letsStart: 'Давайте начнем',
    realResults: 'Реальные результаты',
    resultsDescription: 'Скриншоты реальных результатов, которых мы достигли для наших клиентов. Каждое изображение представляет реальный успех',
    contactTitle: 'Контакты',
    contactDescription: 'Готовы начать ваш цифровой проект? Оставьте детали, и мы скоро вернемся к вам с персонализированным предложением',
    ratingsTitle: 'Рейтинги клиентов',
    basedOn: 'Основываясь на',
    ratings: 'рейтингах',
    happyClients: 'Довольные клиенты',
    averageGrowth: 'Средний рост',
    experience: 'Опыт',
    support: 'Поддержка',
    years: 'лет'
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  dir: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('he');
  const [dir, setDir] = useState('rtl');

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    setDir(lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('selectedLanguage', lang);
    
    // עדכון HTML
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['he']] || key;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'he';
    setLanguage(savedLang);
  }, [setLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
