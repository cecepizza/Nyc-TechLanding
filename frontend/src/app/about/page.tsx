"use client";

import React from "react";
import { CardContainer, CardBody } from "@/components/ui/3d-card";
import { Boxes } from "@/components/ui/background-boxes";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white p-8 md:p-16 overflow-hidden">
      {/* Background Animation */}
      <Boxes className="absolute inset-0 -z-5" />

      {/* Title */}
      <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-center text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text drop-shadow-md mb-6">
        About Us
      </h1>

      {/* Cards */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
        {/* Card: Our Mission */}
        <CardContainer className="rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-slate-800 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-base leading-relaxed text-gray-300">
              Helping you discover startups solving the world’s most important
              problems. That’s why we made this list. Visibility matters.
            </p>
          </CardBody>
        </CardContainer>

        {/* Card: Selection Criteria */}
        <CardContainer className="rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-slate-800 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Selection Criteria
            </h2>
            <p className="text-base leading-relaxed text-gray-300">
              This is not exhaustive—it’s personal. These are the companies we
              think deserve to be seen. Let us know if we missed someone.
            </p>
          </CardBody>
        </CardContainer>

        {/* Card: Get Involved */}
        <CardContainer className="rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-slate-800 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Get Involved</h2>
            <p className="text-base leading-relaxed text-gray-300">
              Want to contribute? Spotted an error? Use the link below to help
              us make this better.
            </p>
          </CardBody>
        </CardContainer>
      </div>

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
