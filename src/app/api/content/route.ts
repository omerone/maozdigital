import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchStoredContent, saveContent } from '@/lib/contentStorage';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/adminSession';

const isValidRequest = (request: Request) => request.headers.get('x-requested-with') === 'XMLHttpRequest';

export async function GET() {
  const stored = await fetchStoredContent();
  return NextResponse.json({ content: stored });
}

interface ContentUpdatePayload {
  updates?: Array<{ id: string; value: string }>;
  id?: string;
  value?: string;
}

export async function POST(request: Request) {
  if (!isValidRequest(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!(await verifySessionToken(sessionCookie))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as ContentUpdatePayload;
    const payloadUpdates = Array.isArray(body.updates)
      ? body.updates
      : body.id && typeof body.value === 'string'
        ? [{ id: body.id, value: body.value }]
        : [];

    if (!payloadUpdates.length) {
      return NextResponse.json({ success: false, error: 'missing updates' }, { status: 400 });
    }

    const stored = await fetchStoredContent();
    const updated = { ...stored };

    for (const update of payloadUpdates) {
      if (!update || typeof update.id !== 'string' || typeof update.value !== 'string') {
        continue;
      }
      updated[update.id] = update.value;
    }

    await saveContent(updated);

    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    console.error('Failed updating content:', error);
    return NextResponse.json({ success: false, error: 'Content update failed' }, { status: 500 });
  }
}


