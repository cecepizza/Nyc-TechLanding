"use client";

import Link from "next/link";
import { LampDemo } from "@/components/lamp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* <LampDemo /> */}
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Platform</h1>
      <nav className="flex flex-col gap-4">
        <Link
          href="/jobs"
          className="text-lg text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Available Jobs
        </Link>
        <Link
          href="/events"
          className="text-lg text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Events
        </Link>
        <Link
          href="/partners"
          className="text-lg text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Tech Partners
        </Link>
      </nav>
    </div>
  );
}
