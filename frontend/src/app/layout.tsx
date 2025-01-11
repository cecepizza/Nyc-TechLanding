"use client";

import "./globals.css";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/ui/Navbar";

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
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  const handleNavigation = (item: string) => setActiveItem(item);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar activeItem={activeItem} onNavigate={handleNavigation} />

        <main>{children}</main>
      </body>
    </html>
  );
}
