import { del, list, put } from '@vercel/blob';

export type GalleryCategory = 'meta' | 'tiktok' | 'whatsapp-bots' | 'google' | 'website-building';

export type GalleryMediaType = 'image' | 'video';

export interface StoredGalleryItem {
  src: string;
  path: string;
  title: string;
  description: string;
  category: GalleryCategory;
  createdAt: string;
  mediaType: GalleryMediaType;
}

export interface GalleryMetadata {
  images: StoredGalleryItem[];
}

const METADATA_PATH = 'gallery/metadata.json';
const FALLBACK_METADATA: GalleryMetadata = {
  images: [
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
  ],
};

const getBlobToken = () => process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_TOKEN;
const ensureBlobToken = () => {
  const token = getBlobToken();
  if (!token) {
    throw new Error('Missing Vercel Blob token. Set BLOB_READ_WRITE_TOKEN or BLOB_READ_TOKEN.');
  }
  return token;
};

const deriveBlobHost = (token: string) => {
  const parts = token.split('_');
  if (parts.length < 4) {
    throw new Error('Invalid blob token format.');
  }
  const storeSlug = parts[3];
  return `${storeSlug}.public.blob.vercel-storage.com`;
};

const fetchMetadataFromBlob = async (): Promise<GalleryMetadata | null> => {
  try {
    const token = getBlobToken();
    if (!token) {
      return null;
    }

    const { blobs } = await list({
      prefix: METADATA_PATH,
      limit: 1,
      token,
    });

    if (!blobs.length) {
      return null;
    }

    const metadataBlob = blobs[0];
    const response = await fetch(`https://${deriveBlobHost(token)}/${metadataBlob.pathname}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Failed to download metadata: ${response.statusText}`);
    }

    const json = (await response.json()) as GalleryMetadata;
    if (!Array.isArray(json.images)) {
      throw new Error('Invalid metadata format');
    }
    return json;
  } catch (error) {
    console.error('Failed fetching gallery metadata:', error);
    return null;
  }
};

const normalizeItem = (item: StoredGalleryItem): StoredGalleryItem => ({
  ...item,
  mediaType: item.mediaType === 'video' ? 'video' : 'image',
});

export const getGalleryMetadata = async (): Promise<GalleryMetadata> => {
  const metadata = await fetchMetadataFromBlob();
  const source = metadata ?? FALLBACK_METADATA;
  return {
    images: source.images.map((item) => normalizeItem(item)),
  };
};

export const saveGalleryMetadata = async (metadata: GalleryMetadata) => {
  const token = ensureBlobToken();
  await put(METADATA_PATH, JSON.stringify(metadata, null, 2), {
    contentType: 'application/json',
    access: 'public',
    token,
    addRandomSuffix: false,
  });
};

const inferMediaType = (file: File): GalleryMediaType => {
  if (file.type.startsWith('video/')) {
    return 'video';
  }
  return 'image';
};

export const addGalleryImage = async (
  image: Omit<StoredGalleryItem, 'src' | 'path' | 'createdAt'> & { file: File }
) => {
  const metadata = await getGalleryMetadata();
  const safeFileName = image.file.name.replace(/\s+/g, '-').toLowerCase();
  const timestamp = Date.now();
  const prefix = `results/${image.category}`;
  const path = `${prefix}/${timestamp}-${safeFileName}`;

  const token = ensureBlobToken();

  const uploadResult = await put(path, image.file, {
    access: 'public',
    token,
    addRandomSuffix: false,
  });

  const newImage: StoredGalleryItem = {
    src: uploadResult.url,
    path: uploadResult.pathname,
    title: image.title,
    description: image.description,
    category: image.category,
    createdAt: new Date().toISOString(),
    mediaType: image.mediaType ?? inferMediaType(image.file),
  };

  const updatedMetadata: GalleryMetadata = {
    images: [newImage, ...metadata.images],
  };

  await saveGalleryMetadata(updatedMetadata);

  return newImage;
};

export const updateGalleryImage = async (
  path: string,
  updates: {
    title?: string;
    description?: string;
    category?: GalleryCategory;
    file?: File | null;
  }
) => {
  const metadata = await getGalleryMetadata();
  const index = metadata.images.findIndex((image) => image.path === path);

  if (index === -1) {
    throw new Error('Image not found');
  }

  const currentImage = metadata.images[index];
  let updatedImage: StoredGalleryItem = { ...currentImage };

  if (typeof updates.title === 'string') {
    updatedImage = { ...updatedImage, title: updates.title };
  }

  if (typeof updates.description === 'string') {
    updatedImage = { ...updatedImage, description: updates.description };
  }

  if (typeof updates.category === 'string') {
    updatedImage = { ...updatedImage, category: updates.category };
  }

  if (updates.file instanceof File) {
    const safeFileName = updates.file.name.replace(/\s+/g, '-').toLowerCase();
    const timestamp = Date.now();
    const prefix = `results/${updatedImage.category}`;
    const newPath = `${prefix}/${timestamp}-${safeFileName}`;

    const token = ensureBlobToken();

    const uploadResult = await put(newPath, updates.file, {
      access: 'public',
      token,
      addRandomSuffix: false,
    });

    updatedImage = {
      ...updatedImage,
      src: uploadResult.url,
      path: uploadResult.pathname,
      mediaType: inferMediaType(updates.file),
    };

    try {
      const token = getBlobToken();
      if (token) {
        await del(currentImage.path, { token });
      }
    } catch (error) {
      console.error('Failed to delete replaced gallery image:', error);
    }
  }

  const updatedImages = [...metadata.images];
  updatedImages[index] = updatedImage;

  await saveGalleryMetadata({ images: updatedImages });

  return updatedImage;
};

export const deleteGalleryImage = async (path: string) => {
  const metadata = await getGalleryMetadata();
  const index = metadata.images.findIndex((image) => image.path === path);

  if (index === -1) {
    throw new Error('Image not found');
  }

  const [removedImage] = metadata.images.splice(index, 1);

  await saveGalleryMetadata({ images: metadata.images });

  try {
    const token = getBlobToken();
    if (token) {
      await del(removedImage.path, { token });
    }
  } catch (error) {
    console.error('Failed to delete gallery blob:', error);
  }

  return removedImage;
};

