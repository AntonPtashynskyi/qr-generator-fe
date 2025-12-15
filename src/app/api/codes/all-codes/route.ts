import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "User not authorized" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;
    
    const response = await fetch(`${backendUrl}/qrcodes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Cookie': `accessToken=${accessToken}`
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Authentication failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
