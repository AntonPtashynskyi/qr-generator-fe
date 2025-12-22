import QRCard from "../../components/QRCard";
import { QRCodeGenerationForm } from "../../components/QRCodeGenerationForm";
import { LogoutButton } from "../../components/LogoutButton";
import { cookies } from "next/headers";

interface QRCode {
  id: string;
  targetUrl: string;
  scanCount: number;
  date: Date;
}

export const dynamic = 'force-dynamic'

async function fetchQRCodes(): Promise<QRCode[]> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return [];
    }
    //  Need to remember that this code is executed on server side and use docker enviroment or developers env. port
    const response = await fetch(
      `http://localhost:3000/api/codes/all-codes`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch QR codes");
      return [];
    }

    const data = await response.json();
    return data.codes || [];
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    return [];
  }
}

export default async function Dashboard() {
  const qrCodes = await fetchQRCodes();

  return (
    <div className="flex flex-col w-full h-screen gap-2 p-0.5 max-w-[1440px] mx-auto mt-1.5">
      <div className="w-full bg-white rounded-md p-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Generate your QR Codes</h1>
        <LogoutButton />
      </div>
      <div className="flex-1 bg-white rounded-sm p-3 flex flex-col gap-3 ">
        <QRCodeGenerationForm />
        <div className="w-full bg-sea-green p-6 rounded-md justify-start">
          {qrCodes.length > 0 ? (
            qrCodes.map((code) => (
              <QRCard
                key={code.id}
                targetUrl={code.targetUrl}
                scanCount={code.scanCount}
                qrCodeId={code.id}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No QR codes yet. Create your first one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
