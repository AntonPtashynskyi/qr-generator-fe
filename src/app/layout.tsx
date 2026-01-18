import type { Metadata } from "next";
import { Inter,  } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "QR - Code generator",
  description: "Generate your personal QR Code ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased bg-sea-green overflow-x-hidden`}
      >
        <header className='p-2 bg-black text-white uppercase font-semibold text-center fixed mb-2.5 left-0 right-0 z-50 shadow-md border-b-1 border-white'>QR Generation App</header>
        <main className='pt-6'>
        {children}
        </main>
      </body>
    </html>
  );
}
