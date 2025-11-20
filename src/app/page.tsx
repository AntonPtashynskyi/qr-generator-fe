// import Image from "next/image";
import Button from "./components/Button/Button";

export default function Home() {
  return (
    <div className="flex flex-row w-full h-screen gap-0.5 p-0.5">
      <div className="w-[16rem] h-full bg-brown p-2 rounded-sm flex flex-col gap-3">
        {/* User Account component */}
        <div className='w-full p-2 flex gap-3 items-center justify-start bg-transparent border-solid border-black border-1 rounded-3xl'>
          <div className='logo w-6 h-6 rounded-full bg-black'></div>
          <p className='uppercase text-black block mx-auto'>Anton Profile</p>
        </div>
        {/* Create QR code button */}
        <Button/>
      </div>
      <div className="flex-1 h-full bg-brown rounded-sm"></div>
    </div>
  );
}
