import { NextResponse } from 'next/server';

/**
 * Extracts cookies from backend response headers and sets them in Next.js response
 */
export function forwardCookiesFromBackend(
  backendResponse: Response,
  nextResponse: NextResponse
): void {
  const setCookieHeaders = backendResponse.headers.get('set-cookie');

  if (setCookieHeaders) {
    // If backend sends set-cookie header, forward it to the client
    nextResponse.headers.set('set-cookie', setCookieHeaders);
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
