import React from "react";
import { DeleteIcon } from "../../app/icons/Delete";
import Image from 'next/image';

interface IQRCard {
  targetUrl: string;
  scanCount: number;
  qrCodeId: string;
  imageURL?: string;
}

const QRCard = (data: IQRCard) => {
  const { targetUrl, scanCount = 0, qrCodeId, imageURL = "" } = data;

  return (
    <div className="w-full bg-white rounded-md mx-auto p-4 flex flex-col lg:flex-row mb-4" id={qrCodeId}>
      <div className="w-40 h-40 min-w-40 rounded-md bg-gray-300/50 mr-auto p-0.5">
        <Image src="/images/site-logo.png" alt="QRCode" width={100} height={100} className='w-full h-full mb-2 mx-auto rounded-sm shadow-2xs'/>
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
      <button className="p-1 w-7 h-7 flex items-center justify-center hover:scale-110 hover:bg-sea-green cursor-pointer rounded-full ">
        <DeleteIcon className="w-6 h-5" />
      </button>
    </div>
  );
};

export default QRCard;
