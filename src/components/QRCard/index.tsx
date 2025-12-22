"use client";
import { useState, useEffect } from "react";
import { DeleteIcon } from "../../app/icons/Delete";
import Image from 'next/image';
import QRCode from 'qrcode';
import { useRouter } from "next/navigation";

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
      dark: '#000000',
      light: '#FFFFFF'
    }
  }).catch((error) => {
    console.error('Error generating QR code:', error);
    return '/images/site-logo.png';
  });
}

function QRCard(data: IQRCard) {
  const { targetUrl, scanCount = 0, qrCodeId } = data;
  const [imageUrl, setImageUrl] = useState<string>('/images/site-logo.png');
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    generateDataUrlImage(qrCodeId).then(setImageUrl);
  }, [qrCodeId]);

  const handleDelete = async (codeID: string) => {
    if (!confirm('Are you sure you want to delete this QR code?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/codes/delete?qr_id=${codeID}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Something went wrong during deleting');
        setIsDeleting(false);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting QR code:', error);
      alert('Something went wrong during deleting');
      setIsDeleting(false);
    }
  }

  return (
    <div className={`w-full bg-white rounded-md mx-auto p-4 flex flex-col lg:flex-row mb-4 ${isDeleting ? 'opacity-50' : ''}`} id={qrCodeId}>
      <div className="w-40 h-40 min-w-40 rounded-md bg-gray-300/50 mr-auto p-0.5">
        <Image
          src={imageUrl}
          alt="QR Code"
          width={160}
          height={160}
          className='w-full h-full mb-2 mx-auto rounded-sm shadow-2xs'
        />
      </div>
      <div className="p-3 flex-1">
        <p>Scan count: {scanCount}</p>
        <p className='mb-2'>Target URL:</p>{" "}
        <a
          href={targetUrl}
          className=" hover:bg-sea-green rounded-md p-2 font-light transition-all [line-break:anywhere]"
          target="_blank"
        >
          {targetUrl}
        </a>
      </div>
      <button
        className="p-1 w-7 h-7 flex items-center justify-center hover:scale-110 hover:bg-sea-green cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleDelete(qrCodeId)}
        disabled={isDeleting}
      >
        <DeleteIcon className="w-6 h-5" />
      </button>
    </div>
  );
}

export default QRCard;
