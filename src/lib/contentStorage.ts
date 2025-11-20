import { put } from '@vercel/blob';

export type ContentMap = Record<string, string>;

const CONTENT_PATH = 'content/site-content.json';

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

export const fetchStoredContent = async (): Promise<ContentMap> => {
  try {
    const token = getBlobToken();
    if (!token) {
      return {};
    }

    const response = await fetch(`https://${deriveBlobHost(token)}/${CONTENT_PATH}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      if (response.status === 404) {
        return {};
      }
      throw new Error(`Failed to download content: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as ContentMap;
    if (data && typeof data === 'object') {
      return data;
    }

    return {};
  } catch (error) {
    console.error('Failed fetching stored content:', error);
    return {};
  }
};

export const saveContent = async (content: ContentMap) => {
  const token = ensureBlobToken();
  await put(CONTENT_PATH, JSON.stringify(content, null, 2), {
    contentType: 'application/json',
    access: 'public',
    token,
    addRandomSuffix: false,
  });
};


