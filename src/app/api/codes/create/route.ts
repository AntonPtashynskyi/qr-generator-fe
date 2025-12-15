import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "User not authorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { target_url } = body;

    if (!target_url) {
      return NextResponse.json(
        { error: "Target URL is required" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;
    const response = await fetch(`${backendUrl}/qrcodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Cookie': `accessToken=${accessToken}`
      },
      body: JSON.stringify({ target_url }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || "Failed to create QR code" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Create QR code error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
