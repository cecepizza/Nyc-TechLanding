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

// Navigation config
const navLinks = [
  { label: "Home", path: "/", key: "Home" },
  { label: "About", path: "/about", key: "About" },
  { label: "Contact", path: "/contact", key: "Contact" },
  { label: "Jobs", path: "/jobs", key: "Jobs" },
  { label: "Events", path: "/events", key: "Events" },
  { label: "Ecosystem", path: "/ecosystem", key: "Ecosystem" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

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
