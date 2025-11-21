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
        {children}
      </body>
    </html>
  );
}
