export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  getAdminUsername,
  serializeSessionCookie,
  verifyAdminPassword,
  verifySessionToken,
} from '@/lib/adminSession';
import { registerAttempt, resetAttempts } from '@/lib/rateLimit';

interface LoginPayload {
  username?: string;
  password?: string;
}

const getClientIdentifier = (request: Request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
};

export async function POST(request: Request) {
  try {
    if (request.headers.get('x-requested-with') !== 'XMLHttpRequest') {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }

    const identifier = getClientIdentifier(request);
    const rate = registerAttempt(identifier);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many login attempts. Please try again later.',
        },
        {
          status: 429,
          headers: rate.retryAfter
            ? { 'Retry-After': Math.ceil(rate.retryAfter / 1000).toString() }
            : undefined,
        }
      );
    }

    const { username, password } = (await request.json()) as LoginPayload;
    const configuredUsername = getAdminUsername();
    const providedUsername = username?.trim();
    const providedPassword = password?.trim();

    if (!providedUsername || !providedPassword || providedUsername !== configuredUsername) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordValid = await verifyAdminPassword(providedPassword);
    if (!passwordValid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    resetAttempts(identifier);

    const token = await createSessionToken();
    const response = NextResponse.json({ success: true });
    const sessionCookie = serializeSessionCookie(token);
    response.cookies.set(sessionCookie.name, sessionCookie.value, {
      httpOnly: sessionCookie.httpOnly,
      sameSite: sessionCookie.sameSite,
      path: sessionCookie.path,
      maxAge: sessionCookie.maxAge,
      secure: sessionCookie.secure,
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);

  const authenticated = await verifySessionToken(sessionCookie?.value);
  return NextResponse.json({ authenticated });
}

