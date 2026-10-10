
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MarketTicker from "@/components/MarketTicker";
import Footer from "@/components/Footer";

import ToastProvider from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bazar Dor | আজকের বাজারদর",
  description: "নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <MarketTicker />

        <main className="flex-1">{children}</main>

        <Footer />
<ToastProvider />
      </body>
    </html>
  );
}
