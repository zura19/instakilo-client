import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Providers from "./_components/Providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const instaFont = Dancing_Script({
  variable: "--font-insta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instakilo",
  description: "Instakilo is a simple, fast, and secure file sharing service.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` h-dvh  bg-background  antialiased ${inter.className}   `}
      >
        <Providers>
          <main className="overflow-scroll">{children}</main>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
