"use client";

import "./globals.css";
import React, { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import { Dock } from "@/components/ui/Dock";
import EngravedTag from "@/components/ui/EngravedTag";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeItem, setActiveItem] = useState<string>("home");

  const handleNavigate = (item: string) => {
    setActiveItem(item);
    // Add your navigation logic here
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Navbar activeItem={activeItem} onNavigate={handleNavigate} />
          <Dock activeItem={activeItem} onNavigate={handleNavigate} />
          <div className="hidden sm:block">
            <EngravedTag />
          </div>
          <SpeedInsights />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
