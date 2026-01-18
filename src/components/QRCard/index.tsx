"use client";
import { useState, useEffect } from "react";
import { DeleteIcon } from "../../app/icons/Delete";
import Image from "next/image";
import QRCode from "qrcode";
import { useRouter } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface IQRCard {
  targetUrl: string;
  scanCount: number;
  qrCodeId: string;
  imageURL?: string;
}

async function generateDataUrlImage(id: string): Promise<string> {
  const redirectUrl = `${BACKEND_API_URL}/r/${id}`;

  return QRCode.toDataURL(redirectUrl, {
    width: 300,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  }).catch((error) => {
    console.error("Error generating QR code:", error);
    return "/images/site-logo.png";
  });
}

function QRCard(data: IQRCard) {
  const { targetUrl, scanCount = 0, qrCodeId } = data;
  const [imageUrl, setImageUrl] = useState<string>("/images/site-logo.png");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    generateDataUrlImage(qrCodeId).then(setImageUrl);
  }, [qrCodeId]);

  const handleDelete = async (codeID: string) => {
    if (!confirm("Are you sure you want to delete this QR code?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/codes/delete?qr_id=${codeID}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Something went wrong during deleting");
        setIsDeleting(false);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting QR code:", error);
      alert("Something went wrong during deleting");
      setIsDeleting(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `qr-code-for-${targetUrl}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className='max-w-2xs'>
      <CardHeader>
        <CardTitle>Link: {targetUrl}</CardTitle>
        <CardTitle>Scan count: {scanCount}</CardTitle>
      </CardHeader>
      <CardContent className='border rounded-2xl mx-3'>
        <Image
          src={imageUrl}
          alt="QR Code"
          width={160}
          height={160}
          className="w-full h-full mb-2 mx-auto rounded-sm shadow-2xs"
        />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <CardAction className='w-full flex gap-2'>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDelete(qrCodeId)}
            disabled={isDeleting}
          >
            <DeleteIcon className="w-6 h-5" />
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

export default QRCard;
