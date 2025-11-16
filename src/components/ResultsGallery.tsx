'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useAdmin } from '@/contexts/AdminContext';
import type { StoredGalleryItem, GalleryCategory } from '@/lib/gallery';

const fallbackImages: StoredGalleryItem[] = [
  {
    src: '/results/meta/075F6C39-0FFD-46FC-BFD9-3E3C2123C32A_1_201_a.jpeg',
    path: 'results/meta/075F6C39-0FFD-46FC-BFD9-3E3C2123C32A_1_201_a.jpeg',
    title: 'תוצאות קמפיין Meta',
    description: 'הצלחה מרשימה בקמפיין פרסום במטא עם ROI גבוה',
    category: 'meta',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/meta/0DD4858C-D4F9-47F2-9D1D-AA494878E91F_1_201_a.jpeg',
    path: 'results/meta/0DD4858C-D4F9-47F2-9D1D-AA494878E91F_1_201_a.jpeg',
    title: 'קמפיין Facebook Ads',
    description: 'קמפיין פרסום מוצלח בפייסבוק עם ROI של 400%',
    category: 'meta',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/meta/F3BE9DB2-D810-459B-B7F4-0022D6166BE8_1_201_a.jpeg',
    path: 'results/meta/F3BE9DB2-D810-459B-B7F4-0022D6166BE8_1_201_a.jpeg',
    title: 'קמפיין Instagram Ads',
    description: 'קמפיין פרסום מוצלח באינסטגרם עם engagement גבוה',
    category: 'meta',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/tiktok/Screenshot 2025-11-04 at 20.24.34.png',
    path: 'results/tiktok/Screenshot 2025-11-04 at 20.24.34.png',
    title: 'TikTok Ads Dashboard - Campaigns',
    description: 'תוצאות קמפיינים בטיקטוק עם מטריקות מרשימות',
    category: 'tiktok',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/tiktok/Screenshot 2025-11-04 at 20.24.47.png',
    path: 'results/tiktok/Screenshot 2025-11-04 at 20.24.47.png',
    title: 'TikTok Ads - Demographics Analysis',
    description: 'ניתוח דמוגרפי של קהלי טיקטוק לפי גילאים',
    category: 'tiktok',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/tiktok/Screenshot 2025-11-04 at 20.24.57.png',
    path: 'results/tiktok/Screenshot 2025-11-04 at 20.24.57.png',
    title: 'TikTok Ads - Conversions Overview',
    description: 'סקירת המרות והצלחות בקמפיינים בטיקטוק',
    category: 'tiktok',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/tiktok/Screenshot 2025-11-04 at 20.25.07.png',
    path: 'results/tiktok/Screenshot 2025-11-04 at 20.25.07.png',
    title: 'TikTok Ads - Performance Metrics',
    description: 'מטריקות ביצועים מתקדמות של קמפיינים בטיקטוק',
    category: 'tiktok',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/google/google 1.webp',
    path: 'results/google/google 1.webp',
    title: 'Google Ads Campaign Results',
    description: 'תוצאות קמפיינים בגוגל Ads עם ROI גבוה',
    category: 'google',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/websites/my web/Screenshot 2025-11-04 at 21.28.47.png',
    path: 'results/websites/my web/Screenshot 2025-11-04 at 21.28.47.png',
    title: 'אתר שירותי פרסום - דף בית',
    description: 'עיצוב מקצועי ומודרני לאתר שמציג שירותי פרסום דיגיטלי',
    category: 'website-building',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/websites/my web/Screenshot 2025-11-04 at 21.28.52.png',
    path: 'results/websites/my web/Screenshot 2025-11-04 at 21.28.52.png',
    title: 'אתר שירותי פרסום - עמוד שירותים',
    description: 'תצוגה מפורטת של השירותים השונים עם עיצוב נקי ומושך',
    category: 'website-building',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/websites/my web/Screenshot 2025-11-04 at 21.29.01.png',
    path: 'results/websites/my web/Screenshot 2025-11-04 at 21.29.01.png',
    title: 'אתר שירותי פרסום - תוצאות וביקורות',
    description: 'הצגת תוצאות מרשימות וביקורות לקוחות באתר שירותי פרסום',
    category: 'website-building',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
  {
    src: '/results/websites/my web/Screenshot 2025-11-04 at 21.29.07.png',
    path: 'results/websites/my web/Screenshot 2025-11-04 at 21.29.07.png',
    title: 'אתר שירותי פרסום - טופס יצירת קשר',
    description: 'טופס יצירת קשר אינטראקטיבי ומקצועי באתר שירותי פרסום',
    category: 'website-building',
    createdAt: new Date().toISOString(),
    mediaType: 'image',
  },
];

const categoryLabels: Record<GalleryCategory, string> = {
  meta: 'מטא - פייסבוק אינסטגרם',
  tiktok: 'טיקטוק',
  'whatsapp-bots': 'בוטים לוואטסאפ',
  google: 'גוגל',
  'website-building': 'בניית אתרים',
};

interface EditFormState {
  title: string;
  description: string;
  category: GalleryCategory;
}

export default function ResultsGallery() {
  const { isAdmin } = useAdmin();
  const [images, setImages] = useState<StoredGalleryItem[]>(fallbackImages);
  const [selectedImage, setSelectedImage] = useState<StoredGalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('meta');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const savedScrollRef = useRef<number | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<StoredGalleryItem | null>(null);
  const [editFormState, setEditFormState] = useState<EditFormState>({
    title: '',
    description: '',
    category: 'meta',
  });
  const [editFile, setEditFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed loading gallery');
        }
        const data = await response.json();
        if (Array.isArray(data?.images)) {
          const mapped = data.images.map((item: unknown): StoredGalleryItem | null => {
            if (!item || typeof item !== 'object') {
              return null;
            }
            const record = item as Record<string, unknown>;
            if (
              typeof record.src !== 'string' ||
              typeof record.path !== 'string' ||
              typeof record.title !== 'string' ||
              typeof record.description !== 'string' ||
              typeof record.createdAt !== 'string' ||
              !['meta', 'tiktok', 'whatsapp-bots', 'google', 'website-building'].includes(
                record.category as string
              )
            ) {
              return null;
            }
            const mediaType =
              record.mediaType === 'video' || record.mediaType === 'image' ? record.mediaType : 'image';
            return {
              src: record.src,
              path: record.path,
              title: record.title,
              description: record.description,
              createdAt: record.createdAt,
              category: record.category as GalleryCategory,
              mediaType,
            };
          });
          const parsed = mapped.filter(
            (entry: StoredGalleryItem | null): entry is StoredGalleryItem => entry !== null
          );
          if (parsed.length) {
            setImages(parsed);
          }
        }
      } catch (error) {
        console.error('Failed fetching gallery data:', error);
        setErrorMessage('טעינת הגלריה נכשלה. נסו שוב מאוחר יותר.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSelectedImage();
        setIsOpen(false);
      }
    };

    const handleOpenGallery = () => {
      setIsOpen(true);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      const focusable = document.querySelector('[data-gallery-focusable]') as HTMLElement | null;
      if (focusable) {
        focusable.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('openResultsGallery', handleOpenGallery);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('openResultsGallery', handleOpenGallery);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const categories = useMemo(
    () =>
      (['meta', 'tiktok', 'whatsapp-bots', 'google', 'website-building'] as GalleryCategory[]).map(
        (category) => ({
          key: category,
          label: categoryLabels[category],
          count: images.filter((image) => image.category === category).length,
        })
      ),
    [images]
  );

  const filteredImages = useMemo(
    () => images.filter((image) => image.category === selectedCategory),
    [images, selectedCategory]
  );

  if (!isOpen) {
    return null;
  }

  const closeGallery = () => {
    setIsOpen(false);
    closeSelectedImage();
    setErrorMessage(null);
    setActionMessage(null);
  };

  const resetActionState = () => {
    setErrorMessage(null);
    setActionMessage(null);
  };

  const handleAddSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetActionState();
    setIsSaving(true);

    try {
      const formElement = event.currentTarget;
      const formData = new FormData(formElement);
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });
      const data = (await response.json().catch(() => null)) as {
        image?: StoredGalleryItem;
        error?: string;
      } | null;

      if (!response.ok || !data?.image) {
        throw new Error(data?.error ?? 'שמירת התמונה נכשלה');
      }

      setImages((prev) => [data.image!, ...prev]);
      setActionMessage('התוצאה נוספה בהצלחה!');
      formElement.reset();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed adding gallery image:', error);
      setErrorMessage(error instanceof Error ? error.message : 'שמירת התמונה נכשלה');
    } finally {
      setIsSaving(false);
    }
  };

  const startEditing = (image: StoredGalleryItem) => {
    resetActionState();
    setEditingImage(image);
    setEditFormState({
      title: image.title,
      description: image.description,
      category: image.category,
    });
    setEditFile(null);
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingImage) {
      return;
    }
    resetActionState();

    const trimmedTitle = editFormState.title.trim();
    const trimmedDescription = editFormState.description.trim();
    const hasChanges =
      trimmedTitle !== editingImage.title ||
      trimmedDescription !== editingImage.description ||
      editFormState.category !== editingImage.category ||
      editFile !== null;

    if (!hasChanges) {
      setErrorMessage('לא נמצאו שינויים לעדכון');
      return;
    }

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append('path', editingImage.path);
      if (trimmedTitle !== editingImage.title) {
        formData.append('title', trimmedTitle);
      }
      if (trimmedDescription !== editingImage.description) {
        formData.append('description', trimmedDescription);
      }
      if (editFormState.category !== editingImage.category) {
        formData.append('category', editFormState.category);
      }
      if (editFile) {
        formData.append('file', editFile);
      }

      const response = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });
      const data = (await response.json().catch(() => null)) as {
        image?: StoredGalleryItem;
        error?: string;
      } | null;

      if (!response.ok || !data?.image) {
        throw new Error(data?.error ?? 'עדכון התמונה נכשל');
      }

      setImages((prev) => prev.map((img) => (img.path === editingImage.path ? data.image! : img)));
      setEditingImage(null);
      setEditFile(null);
      setActionMessage('התוצאה עודכנה בהצלחה!');
    } catch (error) {
      console.error('Failed updating gallery image:', error);
      setErrorMessage(error instanceof Error ? error.message : 'עדכון התמונה נכשל');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (image: StoredGalleryItem) => {
    const confirmed = window.confirm('למחוק את התוצאה הזו? לא ניתן לבטל פעולה זו.');
    if (!confirmed) {
      return;
    }

    resetActionState();
    setIsSaving(true);

    try {
      const response = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ path: image.path }),
      });
      const data = (await response.json().catch(() => null)) as {
        image?: StoredGalleryItem;
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.error ?? 'מחיקת התמונה נכשלה');
      }

      setImages((prev) => prev.filter((img) => img.path !== image.path));
      setActionMessage('התוצאה הוסרה בהצלחה');
      if (editingImage?.path === image.path) {
        setEditingImage(null);
      }
    } catch (error) {
      console.error('Failed deleting gallery image:', error);
      setErrorMessage(error instanceof Error ? error.message : 'מחיקת התמונה נכשלה');
    } finally {
      setIsSaving(false);
    }
  };

  const openImage = (image: StoredGalleryItem) => {
    if (typeof window !== 'undefined') {
      // Save current scroll position to restore later
      savedScrollRef.current = window.scrollY;
      // Open modal immediately without scrolling - it will appear in center of viewport
      setSelectedImage(image);
    } else {
      setSelectedImage(image);
    }
  };

  const closeSelectedImage = () => {
    setSelectedImage(null);
    if (typeof window !== 'undefined' && savedScrollRef.current !== null) {
      // Use setTimeout to ensure modal closes before scrolling
      setTimeout(() => {
        window.scrollTo({ top: savedScrollRef.current!, behavior: 'auto' });
        savedScrollRef.current = null;
      }, 100);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-title"
        aria-describedby="gallery-description"
      >
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl bg-white border border-[#ebe7dd] rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-6 sm:p-8 space-y-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-6">
              <div className="space-y-2 text-center sm:text-right">
                <p className="text-xs uppercase tracking-[0.35em] text-[#8696a7]" id="gallery-description">
                  גלריית עבודות ותוצאות
                </p>
                <h2 id="gallery-title" className="text-3xl md:text-4xl font-semibold text-[#1e1f24]">
                  התוצאות שלנו
                </h2>
              </div>
              <button
                onClick={closeGallery}
                className="inline-flex items-center justify-center rounded-full border border-[#d4a65a] px-4 py-2 text-sm font-semibold text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors"
                aria-label="סגור גלריה"
                data-gallery-focusable
              >
                סגירה
              </button>
            </div>

            {isAdmin && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-dashed border-[#dcd8ce] rounded-2xl p-4 bg-[#fdfcf9]">
                <div className="text-right space-y-1">
                  <p className="text-sm font-semibold text-[#1e1f24]">מצב מנהל פעיל</p>
                  <p className="text-xs text-[#4b4d55]">
                    ניתן להוסיף תוצאות חדשות, לערוך פריטים קיימים או למחוק אותם ישירות מתוך הגלריה.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      resetActionState();
                      setIsAddModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[#d4a65a] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c1954d] disabled:opacity-60"
                    disabled={isSaving}
                  >
                    {isSaving ? 'מעבד...' : 'הוסף תוצאה חדשה'}
                  </button>
                </div>
              </div>
            )}

            {(errorMessage || actionMessage) && (
              <div
                className={`text-sm rounded-xl border px-4 py-3 text-right ${
                  errorMessage
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : 'border-green-200 bg-green-50 text-green-700'
                }`}
              >
                {errorMessage ?? actionMessage}
              </div>
            )}

            <div
              className="flex flex-wrap gap-3 justify-center"
              role="tablist"
              aria-label="בחר קטגוריית תוצאות"
            >
              {categories.map((category) => (
                <button
                  key={category.key}
                  id={`tab-${category.key}`}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 text-sm rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white ${
                    selectedCategory === category.key
                      ? 'bg-[#d4a65a] border-[#d4a65a] text-white'
                      : 'border-[#ebe7dd] text-[#4b4d55] hover:bg-[#f3f1eb]'
                  }`}
                  role="tab"
                  aria-selected={selectedCategory === category.key}
                  aria-controls={`gallery-${category.key}`}
                  aria-label={`קטגוריית ${category.label} - ${category.count} תוצאות`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            {filteredImages.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  selectedCategory === 'website-building'
                    ? 'grid-cols-1 lg:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
                role="tabpanel"
                id={`gallery-${selectedCategory}`}
                aria-labelledby={`tab-${selectedCategory}`}
              >
                {filteredImages.map((image) => (
                  <div
                    key={image.path}
                    role="button"
                    tabIndex={0}
                    onClick={() => openImage(image)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openImage(image);
                      }
                    }}
                    className="relative text-right bg-[#fdfcf9] border border-[#ebe7dd] rounded-2xl overflow-hidden shadow-[0_10px_24px_rgba(15,23,42,0.06)] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    {isAdmin && (
                      <div className="absolute top-3 left-3 z-10 flex gap-2">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            startEditing(image);
                          }}
                          className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1e1f24] border border-[#d4a65a] hover:bg-[#f3f1eb] transition-colors"
                          disabled={isSaving}
                        >
                          עריכה
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(image);
                          }}
                          className="rounded-full bg-[#b9413d] px-3 py-1 text-xs font-semibold text-white hover:bg-[#a1332f] transition-colors"
                          disabled={isSaving}
                        >
                          מחיקה
                        </button>
                      </div>
                    )}
                    <div className={`relative ${selectedCategory === 'website-building' ? 'h-80' : 'h-60'}`}>
                      {image.mediaType === 'video' ? (
                        <video
                          src={image.src}
                          muted
                          loop
                          playsInline
                          controls={false}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      {image.mediaType === 'video' && (
                        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white tracking-wide">
                          וידאו
                        </span>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#8696a7]">{image.title}</p>
                      <p className="text-sm text-[#4b4d55] leading-relaxed">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-[#4b4d55] py-16 border border-dashed border-[#dcd8ce] rounded-2xl">
                {isLoading ? 'טוען תוצאות...' : 'אין כרגע תצוגה לקטגוריה זו, נתעדכן בקרוב.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[60] bg-black/55 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={closeSelectedImage}
        >
          <button
            type="button"
            onClick={closeSelectedImage}
            className="mb-4 z-10 inline-flex items-center justify-center rounded-full border border-[#d4a65a] bg-white px-4 py-2 text-sm font-semibold text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors"
          >
            סגירה
          </button>
          <div
            className="relative w-full max-w-[min(1600px,100%)] h-[calc(100vh-120px)] rounded-3xl border border-[#ebe7dd] bg-white shadow-[0_25px_60px_rgba(15,23,42,0.25)] overflow-hidden flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            {selectedImage.mediaType === 'video' ? (
              <video
                key={selectedImage.path}
                src={selectedImage.src}
                controls
                autoPlay
                playsInline
                muted
                loop
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <div className="relative w-full h-full min-h-[400px]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl border border-[#ebe7dd] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <h3 className="text-2xl font-semibold text-[#1e1f24] mb-2 text-right">הוספת תוצאה חדשה</h3>
            <p className="text-sm text-[#4b4d55] mb-4 text-right">
              מלא את הפרטים והעלה קובץ מדיה – תמונה (JPG, PNG, WEBP) או סרטון הדמיה (MP4, WEBM, MOV) עד 100MB.
            </p>
            <form className="space-y-4" onSubmit={handleAddSubmit}>
              <div className="space-y-1 text-right">
                <label htmlFor="new-title" className="block text-sm font-medium text-[#1e1f24]">
                  כותרת
                </label>
                <input
                  id="new-title"
                  name="title"
                  required
                  maxLength={120}
                  className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-sm text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                  placeholder="לדוגמה: תוצאות קמפיין Meta"
                />
              </div>
              <div className="space-y-1 text-right">
                <label htmlFor="new-description" className="block text-sm font-medium text-[#1e1f24]">
                  תיאור
                </label>
                <textarea
                  id="new-description"
                  name="description"
                  required
                  rows={3}
                  className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-sm text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                  placeholder="כתוב בקצרה מה רואים בתוצאה"
                />
              </div>
              <div className="space-y-1 text-right">
                <label htmlFor="new-category" className="block text-sm font-medium text-[#1e1f24]">
                  קטגוריה
                </label>
                <select
                  id="new-category"
                  name="category"
                  required
                  className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-sm text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                  defaultValue="meta"
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1 text-right">
                <label htmlFor="new-file" className="block text-sm font-medium text-[#1e1f24]">
                  קובץ מדיה
                </label>
                <input
                  id="new-file"
                  name="file"
                  type="file"
                  required
                  accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,.webm"
                  className="w-full rounded-xl border border-dashed border-[#dcd8ce] px-4 py-5 text-right text-sm text-[#4b4d55] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a] bg-[#fdfcf9]"
                />
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetActionState();
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-[#d4a65a] px-6 py-2 text-sm font-semibold text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors"
                  disabled={isSaving}
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#d4a65a] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c1954d] disabled:opacity-60"
                  disabled={isSaving}
                >
                  {isSaving ? 'שומר...' : 'שמור'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingImage && (
        <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl border border-[#ebe7dd] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <h3 className="text-2xl font-semibold text-[#1e1f24] mb-2 text-right">עריכת תוצאה</h3>
            <p className="text-sm text-[#4b4d55] mb-4 text-right">
              עדכן את הפרטים ושמור. להחלפת תמונה יש לבחור קובץ חדש.
            </p>
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div className="space-y-1 text-right">
                <label htmlFor="edit-title" className="block text-sm font-medium text-[#1e1f24]">
                  כותרת
                </label>
                <input
                  id="edit-title"
                  name="title"
                  required
                  value={editFormState.title}
                  onChange={(event) =>
                    setEditFormState((prev) => ({ ...prev, title: event.target.value }))
                  }
                  className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-sm text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                />
              </div>
              <div className="space-y-1 text-right">
                <label htmlFor="edit-description" className="block text-sm font-medium text-[#1e1f24]">
                  תיאור
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  required
                  rows={3}
                  value={editFormState.description}
                  onChange={(event) =>
                    setEditFormState((prev) => ({ ...prev, description: event.target.value }))
                  }
                  className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-sm text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                />
              </div>
              <div className="space-y-1 text-right">
                <label htmlFor="edit-category" className="block text-sm font-medium text-[#1e1f24]">
                  קטגוריה
                </label>
                <select
                  id="edit-category"
                  name="category"
                  value={editFormState.category}
                  onChange={(event) =>
                    setEditFormState((prev) => ({
                      ...prev,
                      category: event.target.value as GalleryCategory,
                    }))
                  }
                  className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-sm text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1 text-right">
                <label htmlFor="edit-file" className="block text-sm font-medium text-[#1e1f24]">
                  החלפת קובץ מדיה (לא חובה)
                </label>
                <input
                  id="edit-file"
                  name="file"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,.webm"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setEditFile(file);
                  }}
                  className="w-full rounded-xl border border-dashed border-[#dcd8ce] px-4 py-5 text-right text-sm text-[#4b4d55] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a] bg-[#fdfcf9]"
                />
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleDelete(editingImage)}
                  className="inline-flex items-center justify-center rounded-full bg-[#b9413d] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#a1332f] disabled:opacity-60"
                  disabled={isSaving}
                >
                  מחק תוצאה
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingImage(null);
                      setEditFile(null);
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-[#d4a65a] px-6 py-2 text-sm font-semibold text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors"
                    disabled={isSaving}
                  >
                    ביטול
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-[#d4a65a] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c1954d] disabled:opacity-60"
                    disabled={isSaving}
                  >
                    {isSaving ? 'שומר...' : 'שמור שינויים'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
