import { NextResponse } from 'next/server';

/**
 * Extracts cookies from backend response headers and sets them in Next.js response
 */
export function forwardCookiesFromBackend(
  backendResponse: Response,
  nextResponse: NextResponse
): void {
  // Get all set-cookie headers (there can be multiple)
  const setCookieHeaders = backendResponse.headers.getSetCookie?.() || [];

  if (setCookieHeaders.length > 0) {
    // Forward all cookies to the client
    setCookieHeaders.forEach((cookie) => {
      nextResponse.headers.append('set-cookie', cookie);
    });
  }
}

/**
 * Sets authentication cookies in Next.js response
 */
export function setAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string
): void {
  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours (matching your backend)
    path: '/',
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days (matching your backend)
    path: '/',
  });
}
