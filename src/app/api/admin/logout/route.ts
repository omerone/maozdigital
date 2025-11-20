import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/adminSession';

export async function POST(request: Request) {
  if (request.headers.get('x-requested-with') !== 'XMLHttpRequest') {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
  const response = NextResponse.json({ success: true });
  const cookie = clearSessionCookie();
  response.cookies.set(cookie.name, cookie.value, {
    httpOnly: cookie.httpOnly,
    sameSite: cookie.sameSite,
    path: cookie.path,
    maxAge: cookie.maxAge,
    secure: cookie.secure,
  });
  return response;
}


