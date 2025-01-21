"use client";

import React from "react";
import { CardContainer, CardBody } from "@/components/ui/ThreeDCard";

const cardData = [
  {
    title: "Build with Us",
    description: "Join our community of developers and innovators.",
  },
  {
    title: "Find Events",
    description: "Discover the latest tech events happening in NYC.",
  },
  {
    title: "Network",
    description: "Connect with like-minded professionals in the industry.",
  },
];

const OpeningCards = () => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mb-8">
      {cardData.map((card, index) => (
        <CardContainer
          key={index}
          className="flex items-center justify-center h-[270px] p-6 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-950 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]"
        >
          <CardBody className="flex flex-col justify-center items-center text-center h-full">
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-4">
              {card.title}
            </h2>
            <p className="text-gray-400 text-base">{card.description}</p>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
};

export default OpeningCards;
