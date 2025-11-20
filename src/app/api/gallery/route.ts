import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  addGalleryImage,
  deleteGalleryImage,
  GalleryCategory,
  getGalleryMetadata,
  updateGalleryImage,
} from '@/lib/gallery';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/adminSession';

const isValidRequest = (request: Request) => request.headers.get('x-requested-with') === 'XMLHttpRequest';

const isValidCategory = (value: unknown): value is GalleryCategory =>
  typeof value === 'string' &&
  ['meta', 'tiktok', 'whatsapp-bots', 'google', 'website-building'].includes(value);

export async function GET() {
  const metadata = await getGalleryMetadata();
  return NextResponse.json(metadata);
}

const isAdminAuthenticated = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!(await verifySessionToken(sessionCookie))) {
    return false;
  }

  return true;
};

export async function POST(request: Request) {
  if (!isValidRequest(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const file = formData.get('file');

    if (typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ success: false, error: 'חסר שם לתוצאה' }, { status: 400 });
    }

    if (typeof description !== 'string' || !description.trim()) {
      return NextResponse.json({ success: false, error: 'חסרה תיאור לתוצאה' }, { status: 400 });
    }

    if (!isValidCategory(category)) {
      return NextResponse.json({ success: false, error: 'קטגוריה לא תקינה' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'חובה לצרף קובץ מדיה' }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ success: false, error: 'קובץ המדיה ריק' }, { status: 400 });
    }

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      return NextResponse.json(
        { success: false, error: 'פורמט קובץ לא נתמך. יש להעלות תמונה או סרטון וידאו.' },
        { status: 400 }
      );
    }

    const newImage = await addGalleryImage({
      title: title.trim(),
      description: description.trim(),
      category,
      file,
      mediaType: isVideo ? 'video' : 'image',
    });

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    console.error('Failed adding gallery image:', error);
    return NextResponse.json({ success: false, error: 'שמירת התמונה נכשלה' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isValidRequest(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const path = formData.get('path');
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const file = formData.get('file');

    if (typeof path !== 'string' || !path.trim()) {
      return NextResponse.json({ success: false, error: 'נתיב התמונה לא תקין' }, { status: 400 });
    }

    const updates: {
      title?: string;
      description?: string;
      category?: GalleryCategory;
      file?: File | null;
    } = {};

    if (typeof title === 'string') {
      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        return NextResponse.json({ success: false, error: 'כותרת לא יכולה להיות ריקה' }, { status: 400 });
      }
      updates.title = trimmedTitle;
    }

    if (typeof description === 'string') {
      const trimmedDescription = description.trim();
      if (!trimmedDescription) {
        return NextResponse.json({ success: false, error: 'תיאור לא יכול להיות ריק' }, { status: 400 });
      }
      updates.description = trimmedDescription;
    }

    if (typeof category === 'string' && category.trim()) {
      if (!isValidCategory(category)) {
        return NextResponse.json({ success: false, error: 'קטגוריה לא תקינה' }, { status: 400 });
      }
      updates.category = category as GalleryCategory;
    }

    if (file instanceof File && file.size > 0) {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      if (!isVideo && !isImage) {
        return NextResponse.json(
          { success: false, error: 'פורמט קובץ לא נתמך לעדכון. יש לבחור תמונה או סרטון וידאו.' },
          { status: 400 }
        );
      }
      updates.file = file;
    }

    if (!updates.title && !updates.description && !updates.category && !updates.file) {
      return NextResponse.json({ success: false, error: 'לא נמצאו שינויים לעדכון' }, { status: 400 });
    }

    const updatedImage = await updateGalleryImage(path, updates);
    return NextResponse.json({ success: true, image: updatedImage });
  } catch (error) {
    console.error('Failed updating gallery image:', error);
    return NextResponse.json({ success: false, error: 'עדכון התמונה נכשל' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isValidRequest(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => null)) as { path?: string } | null;
    const path = body?.path;

    if (typeof path !== 'string' || !path.trim()) {
      return NextResponse.json({ success: false, error: 'נתיב התמונה לא תקין' }, { status: 400 });
    }

    const removedImage = await deleteGalleryImage(path);

    return NextResponse.json({ success: true, image: removedImage });
  } catch (error) {
    console.error('Failed deleting gallery image:', error);
    return NextResponse.json({ success: false, error: 'מחיקת התמונה נכשלה' }, { status: 500 });
  }
}
