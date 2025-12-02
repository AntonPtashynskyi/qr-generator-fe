import QRCard from '../../components/QRCard';
import { QRCodeGenerationForm } from '../../components/QRCodeGenerationForm';
import { LogoutButton } from '../../components/LogoutButton';

export default async function Dashboard() {
  return (
    <div className="flex flex-col w-full h-screen gap-2 p-0.5 max-w-[1440px] mx-auto mt-1.5">
      <div className="w-full bg-white rounded-md p-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Generate your QR Codes</h1>
        <LogoutButton />
      </div>
      <div className="flex-1 bg-white rounded-sm p-3 flex flex-col gap-3 ">
        <QRCodeGenerationForm />
        <div className="w-full bg-sea-green p-6 rounded-md justify-start">
          <QRCard
            targetUrl="https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events"
            scanCount={0}
            qrCodeId="1"
          />
           <QRCard
            targetUrl="https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events"
            scanCount={0}
            qrCodeId="1"
          />
           <QRCard
            targetUrl="https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events"
            scanCount={0}
            qrCodeId="1"
          />
        </div>
      </div>
    </div>
  );
}

