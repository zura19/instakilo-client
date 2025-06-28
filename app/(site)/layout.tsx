// import type { Metadata } from "next";
// import { Inter, Dancing_Script } from "next/font/google";
// import {} from 'next/font/google'
// import "./globals.css";
// import Sidebar from "./_components/sidebar/Sidebar";
// import Providers from "./_components/Providers";
// import { Toaster } from "@/components/ui/sonner";

import Sidebar from "../_components/sidebar/Sidebar";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

// export const instaFont = Dancing_Script({
//   variable: "--font-insta",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Instakilo",
//   description: "Instakilo is a simple, fast, and secure file sharing service.",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`grid grid-cols-[auto_1fr] h-dvh  bg-background  antialiased   `}
    >
      <Sidebar />
      <main className="overflow-scroll">{children}</main>
    </div>
  );
}
