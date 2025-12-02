import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies, forwardCookiesFromBackend } from '@/lib/cookies';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Send request to backend registration endpoint
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Important: allows cookies to be sent/received
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Registration failed' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Create response
    const res = NextResponse.json(
      { success: true, message: 'Registration successful' },
      { status: 200 }
    );

    // Check if backend sent cookies in headers
    const backendSetsCookies = response.headers.get('set-cookie');

    if (backendSetsCookies) {
      // Scenario 1: Backend sets cookies directly
      forwardCookiesFromBackend(response, res);
    } else if (data.accessToken && data.refreshToken) {
      // Scenario 2: Backend returns tokens in JSON
      setAuthCookies(res, data.accessToken, data.refreshToken);
    } else {
      return NextResponse.json(
        { error: 'Invalid response from authentication server' },
        { status: 500 }
      );
    }

    return res;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
