'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

interface GalleryImage {
  src: string;
  path: string;
  title: string;
  description: string;
  category: 'meta' | 'tiktok' | 'whatsapp-bots' | 'google' | 'website-building';
  createdAt: string;
}

interface GalleryResponse {
  images: GalleryImage[];
}

const categoryOptions: { value: GalleryImage['category']; label: string }[] = [
  { value: 'meta', label: 'מטא - פייסבוק אינסטגרם' },
  { value: 'tiktok', label: 'טיקטוק' },
  { value: 'whatsapp-bots', label: 'בוטים לוואטסאפ' },
  { value: 'google', label: 'גוגל' },
  { value: 'website-building', label: 'בניית אתרים' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState<GalleryImage['category']>('meta');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [actionLoadingPath, setActionLoadingPath] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('טעינת הגלריה נכשלה');
        }
        const data = (await response.json()) as GalleryResponse;
        setGallery(data.images ?? []);
      } catch (error) {
        console.error('Failed fetching gallery:', error);
        setErrorMessage('לא הצלחנו לטעון את הגלריה.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const groupedByCategory = useMemo(() => {
    return categoryOptions.map((category) => ({
      ...category,
      items: gallery.filter((item) => item.category === category.value),
    }));
  }, [gallery]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? 'שמירת התמונה נכשלה');
      }

      const data = await response.json();
      const newImage = data.image as GalleryImage;
      setGallery((prev) => [newImage, ...prev]);
      setSuccessMessage('התוצאה נוספה בהצלחה!');
      form.reset();
    } catch (error) {
      console.error('Failed uploading image:', error);
      setErrorMessage(error instanceof Error ? error.message : 'שמירת התמונה נכשלה');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (item: GalleryImage) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEditCategory(item.category);
    setEditFile(null);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setEditTitle('');
    setEditDescription('');
    setEditCategory('meta');
    setEditFile(null);
  };

  const handleEditFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setEditFile(file);
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingItem) {
      return;
    }

    const originalItem = editingItem;
    const formData = new FormData();
    formData.append('path', originalItem.path);

    const trimmedTitle = editTitle.trim();
    const trimmedDescription = editDescription.trim();
    let hasChanges = false;

    if (trimmedTitle && trimmedTitle !== originalItem.title) {
      formData.append('title', trimmedTitle);
      hasChanges = true;
    }

    if (trimmedDescription && trimmedDescription !== originalItem.description) {
      formData.append('description', trimmedDescription);
      hasChanges = true;
    }

    if (editCategory && editCategory !== originalItem.category) {
      formData.append('category', editCategory);
      hasChanges = true;
    }

    if (editFile) {
      formData.append('file', editFile);
      hasChanges = true;
    }

    if (!hasChanges) {
      setErrorMessage('לא נמצאו שינויים לעדכון');
      return;
    }

    setActionLoadingPath(originalItem.path);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/gallery', {
        method: 'PATCH',
        body: formData,
      });
      const data = (await response.json().catch(() => null)) as { image?: GalleryImage; error?: string } | null;

      if (!response.ok || !data?.image) {
        throw new Error(data?.error ?? 'עדכון התמונה נכשל');
      }

      setGallery((prev) =>
        prev.map((image) => (image.path === originalItem.path ? data.image! : image))
      );
      setSuccessMessage('התוצאה עודכנה בהצלחה!');
      cancelEditing();
    } catch (error) {
      console.error('Failed updating image:', error);
      setErrorMessage(error instanceof Error ? error.message : 'עדכון התמונה נכשל');
    } finally {
      setActionLoadingPath(null);
    }
  };

  const handleDelete = async (item: GalleryImage) => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך למחוק תוצאה זו?');
    if (!confirmed) {
      return;
    }

    setActionLoadingPath(item.path);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: item.path }),
      });

      const data = (await response.json().catch(() => null)) as { image?: GalleryImage; error?: string } | null;

      if (!response.ok) {
        throw new Error(data?.error ?? 'מחיקת התמונה נכשלה');
      }

      setGallery((prev) => prev.filter((image) => image.path !== item.path));
      setSuccessMessage('התוצאה הוסרה בהצלחה');

      if (editingItem?.path === item.path) {
        cancelEditing();
      }
    } catch (error) {
      console.error('Failed deleting image:', error);
      setErrorMessage(error instanceof Error ? error.message : 'מחיקת התמונה נכשלה');
    } finally {
      setActionLoadingPath(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f6f4ef] px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-right space-y-1">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8696a7]">Area Manager</p>
            <h1 className="text-3xl font-semibold text-[#1e1f24]">ניהול גלריית התוצאות</h1>
            <p className="text-sm text-[#4b4d55]">
              העלה תוצאות חדשות ושמור אותן ישירות לענן של Vercel.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-full border border-[#d4a65a] px-5 py-2 text-sm font-semibold text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors"
          >
            התנתקות
          </button>
        </header>

        <section className="bg-white border border-[#ebe7dd] rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-6 space-y-6">
          <div className="text-right space-y-2">
            <h2 className="text-2xl font-semibold text-[#1e1f24]">הוספת תוצאה חדשה</h2>
            <p className="text-sm text-[#4b4d55]">
              מלא את הפרטים והעלה תמונה בגלריה המתאימה. ניתן להעלות קבצי JPG, PNG או WEBP.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 text-right">
                <label htmlFor="title" className="block text-sm font-medium text-[#1e1f24]">
                  כותרת התוצאה
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                  placeholder="לדוגמה: קמפיין Facebook מוצלח"
                />
              </div>

              <div className="space-y-2 text-right">
                <label htmlFor="category" className="block text-sm font-medium text-[#1e1f24]">
                  קטגוריה
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    בחר קטגוריה
                  </option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2 text-right">
              <label htmlFor="description" className="block text-sm font-medium text-[#1e1f24]">
                תיאור
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                placeholder="ספר בקצרה על התוצאה, מה הושג, נתונים מעניינים ועוד."
              />
            </div>

            <div className="space-y-2 text-right">
              <label htmlFor="file" className="block text-sm font-medium text-[#1e1f24]">
                העלאת תמונה
              </label>
              <input
                id="file"
                name="file"
                type="file"
                required
                accept=".jpg,.jpeg,.png,.webp"
                className="w-full rounded-xl border border-dashed border-[#dcd8ce] px-4 py-5 text-right text-sm text-[#4b4d55] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a] bg-[#fdfcf9]"
              />
            </div>

            {errorMessage && (
              <div role="alert" className="text-sm text-red-600 text-right">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div role="status" className="text-sm text-green-600 text-right">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-[#d4a65a] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c1954d] disabled:opacity-60"
            >
              {isSubmitting ? 'מעלה...' : 'הוסף תוצאה'}
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <div className="text-right space-y-2">
            <h2 className="text-2xl font-semibold text-[#1e1f24]">כל התוצאות</h2>
            <p className="text-sm text-[#4b4d55]">
              רשימת התוצאות הקיימות עם חלוקה לקטגוריות. פריטים חדשים מופיעים בראש.
            </p>
          </div>

          {isLoading ? (
            <div className="text-right text-[#4b4d55]">טוען נתונים...</div>
          ) : (
            groupedByCategory.map((category) => (
              <div
                key={category.value}
                className="bg-white border border-[#ebe7dd] rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.05)] p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <h3 className="text-xl font-semibold text-[#1e1f24]">{category.label}</h3>
                    <p className="text-sm text-[#8696a7]">{category.items.length} תוצאות</p>
                  </div>
                </div>

                {category.items.length === 0 ? (
                  <div className="text-sm text-[#4b4d55] text-right">אין כרגע תוצאות בקטגוריה זו.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {category.items.map((item) => (
                      <article
                        key={item.path}
                        className="border border-[#ebe7dd] rounded-2xl overflow-hidden bg-[#fdfcf9]"
                      >
                        <div className="relative h-56 bg-[#f6f4ef]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.src}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4 text-right space-y-3">
                          {editingItem?.path === item.path ? (
                            <form className="space-y-3" onSubmit={handleEditSubmit}>
                              <div className="space-y-2 text-right">
                                <label className="block text-xs font-medium text-[#1e1f24]">כותרת</label>
                                <input
                                  value={editTitle}
                                  onChange={(event) => setEditTitle(event.target.value)}
                                  required
                                  className="w-full rounded-xl border border-[#dcd8ce] px-3 py-2 text-right text-sm text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                                />
                              </div>
                              <div className="space-y-2 text-right">
                                <label className="block text-xs font-medium text-[#1e1f24]">תיאור</label>
                                <textarea
                                  value={editDescription}
                                  onChange={(event) => setEditDescription(event.target.value)}
                                  required
                                  rows={3}
                                  className="w-full rounded-xl border border-[#dcd8ce] px-3 py-2 text-right text-sm text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                                />
                              </div>
                              <div className="space-y-2 text-right">
                                <label className="block text-xs font-medium text-[#1e1f24]">קטגוריה</label>
                                <select
                                  value={editCategory}
                                  onChange={(event) => setEditCategory(event.target.value as GalleryImage['category'])}
                                  className="w-full rounded-xl border border-[#dcd8ce] px-3 py-2 text-right text-sm text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
                                >
                                  {categoryOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-2 text-right">
                                <label className="block text-xs font-medium text-[#1e1f24]">
                                  החלפת תמונה (אופציונלי)
                                </label>
                                <input
                                  type="file"
                                  accept=".jpg,.jpeg,.png,.webp"
                                  onChange={handleEditFileChange}
                                  className="w-full rounded-xl border border-dashed border-[#dcd8ce] px-3 py-4 text-right text-xs text-[#4b4d55] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a] bg-[#fdfcf9]"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                  type="submit"
                                  disabled={actionLoadingPath === item.path}
                                  className="inline-flex items-center justify-center rounded-full bg-[#d4a65a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#c1954d] disabled:opacity-60"
                                >
                                  {actionLoadingPath === item.path ? 'שומר...' : 'שמור שינויים'}
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEditing}
                                  className="inline-flex items-center justify-center rounded-full border border-[#d4a65a] px-4 py-2 text-xs font-semibold text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors"
                                  disabled={actionLoadingPath === item.path}
                                >
                                  ביטול
                                </button>
                              </div>
                            </form>
                          ) : (
                            <>
                              <p className="text-xs uppercase tracking-[0.3em] text-[#8696a7]">{item.title}</p>
                              <p className="text-sm text-[#4b4d55] leading-relaxed">{item.description}</p>
                              <p className="text-xs text-[#8696a7]">
                                הועלה בתאריך {new Date(item.createdAt).toLocaleString('he-IL')}
                              </p>
                              <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                  type="button"
                                  onClick={() => startEditing(item)}
                                  className="inline-flex items-center justify-center rounded-full border border-[#d4a65a] px-4 py-2 text-xs font-semibold text-[#1e1f24] hover:bg-[#f3f1eb] transition-colors"
                                  disabled={actionLoadingPath === item.path}
                                >
                                  עריכה
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item)}
                                  className="inline-flex items-center justify-center rounded-full bg-[#b9413d] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#a1332f] disabled:opacity-60"
                                  disabled={actionLoadingPath === item.path}
                                >
                                  {actionLoadingPath === item.path ? 'מוחק...' : 'מחיקה'}
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}


