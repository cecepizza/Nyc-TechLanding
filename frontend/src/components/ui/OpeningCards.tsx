"use client";

import React from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/ThreeDCard";

const OpeningCards = () => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-0 md:px-12 mb-1">
      {/* Build with Us */}
      <CardContainer className="flex items-center justify-center h-[200px] p-4 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105">
        <CardBody className="flex flex-col justify-center items-center text-center h-full">
          <h2 className="text-2xl font-bold text-white mb-4">Build with Us</h2>
          <p className="text-gray-300 text-base">
            Join our community of developers and innovators.
          </p>
        </CardBody>
      </CardContainer>

      {/* Find Events */}
      <CardContainer className="flex items-center justify-center h-[200px] p-4 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105">
        <CardBody className="flex flex-col justify-center items-center text-center h-full">
          <h2 className="text-2xl font-bold text-white mb-4">Find Events</h2>
          <p className="text-gray-300 text-base">
            Discover the latest tech events happening in NYC.
          </p>
        </CardBody>
      </CardContainer>

      {/* Network */}
      <CardContainer className="flex items-center justify-center h-[200px] p-4 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105">
        <CardBody className="flex flex-col justify-center items-center text-center h-full">
          <h2 className="text-2xl font-bold text-white mb-4">Network</h2>
          <p className="text-gray-300 text-base">
            Connect with like-minded professionals in the industry.
          </p>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default OpeningCards;
