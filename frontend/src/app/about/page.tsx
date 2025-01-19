"use client";

import React from "react";
import { CardContainer, CardBody } from "@/components/ui/3d-card";
import { Boxes } from "@/components/ui/background-boxes";
import OpeningCards from "@/components/ui/OpeningCards";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white p-8 md:p-16 overflow-hidden">
      {/* Background Animation */}
      <Boxes className="absolute inset-0 -z-5" />

      {/* Title */}
      <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-center text-transparent bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text drop-shadow-md mb-6">
        About Us
      </h1>

      {/* Cards */}
      <OpeningCards />

      {/* Divider */}
      <hr className="relative z-10 my-11 border-b-4 border-gray-700" />

      {/* Footer */}
      <div className="relative z-10 text-center text-gray-400">
        Maintained by{" "}
        <a
          href="https://linktr.ee/nyctech"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white hover:text-cyan-200 transition-colors"
        >
          FractalTech
        </a>
      </div>
    </div>
  );
};

export default About;
