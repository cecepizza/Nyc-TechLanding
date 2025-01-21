import React from "react";
import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "./3d-card";

const introData = [
  {
    title: "Explore the heart of NYC's tech ecosystem",
    description:
      "Whether you're here to connect with innovators, find exciting events, explore job opportunities, or learn about startups and accelerators, this is your hub to thrive in the vibrant tech community.",
  },
];

const IntroSection = () => {
  return (
    <div className="mx-auto px-8 sm:px-8 lg:px-11 mb-4 sm:mb-10 mt-3">
      <CardContainer className="w-full flex flex-col sm:flex-row justify-center items-center text-center">
        <CardBody className="relative flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="items-center justify-center p-4 sm:p-2 lg:p-2 rounded-2xl bg-gradient-to-br from-gray-900/20 via-gray-800/40 to-cyan-950/80 shadow-lg hover:shadow-xl transition-transform duration-300"
            style={{
              boxShadow:
                "0 0 10px rgba(0, 255, 255, 0.1), 0 0 20px rgba(0, 255, 255, 0.2)",
            }}
          >
            {introData.map((item, index) => (
              <CardItem key={index} className="w-full h-auto">
                <h2 className="p-2 text-base sm:text-lg lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white mb-0 text-left ml-2 sm:ml-4 lg:ml-10">
                  {item.title}
                </h2>
                <p className="p-1 mt-0 mb-2 text-gray-400 text-xs sm:text-sm lg:text-lg w-full text-center">
                  {item.description}
                </p>
              </CardItem>
            ))}
          </motion.div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default IntroSection;
