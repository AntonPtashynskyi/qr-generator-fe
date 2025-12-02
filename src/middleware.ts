import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  // Check if the user is trying to access the dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!accessToken) {
      // Redirect to home page if not authenticated
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
