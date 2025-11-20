import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/adminSession';

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://*.vercel-storage.com https://*.blob.vercel-storage.com https://maps.gstatic.com https://maps.googleapis.com https://maps.google.com https://lh3.googleusercontent.com https://*.googleusercontent.com https://connect.facebook.net https://www.facebook.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://connect.facebook.net https://www.facebook.com https://graph.facebook.com https://*.vercel-storage.com https://*.blob.vercel-storage.com",
  "frame-src 'self' https://www.youtube.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'"
].join('; ');

const SECURITY_HEADERS: Array<[string, string]> = [
  ['Content-Security-Policy', CONTENT_SECURITY_POLICY],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'DENY'],
  ['X-XSS-Protection', '0'],
  ['Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'],
  ['Permissions-Policy', 'accelerometer=(), autoplay=(), camera=(), clipboard-read=(), clipboard-write=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), microphone=(), midi=(), payment=(), picture-in-picture=(), usb=(), xr-spatial-tracking=()'],
  ['Cross-Origin-Opener-Policy', 'same-origin'],
  ['Cross-Origin-Resource-Policy', 'cross-origin'],
  ['Origin-Agent-Cluster', '?1'],
  ['X-DNS-Prefetch-Control', 'off'],
];

const applySecurityHeaders = (response: NextResponse) => {
  SECURITY_HEADERS.forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith('/admin');

  if (!isAdminRoute) {
    return applySecurityHeaders(NextResponse.next());
  }

  const isLoginRoute = pathname === '/admin/login' || pathname === '/admin/login/';
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifySessionToken(sessionCookie);

  if (isLoginRoute) {
    if (isAuthenticated) {
      const dashboardUrl = new URL('/admin', request.url);
      return applySecurityHeaders(NextResponse.redirect(dashboardUrl));
    }
    return applySecurityHeaders(NextResponse.next());
  }

  if (isAuthenticated) {
    return applySecurityHeaders(NextResponse.next());
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return applySecurityHeaders(NextResponse.redirect(loginUrl));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};

