import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "User not authorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const qr_id = searchParams.get("qr_id");

    if (!qr_id) {
      return NextResponse.json(
        { error: "QR code ID is required" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;
    const response = await fetch(`${backendUrl}/qrcodes/${qr_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Cookie': `accessToken=${accessToken}`
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || "Failed to delete QR code" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Delete QR code error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
