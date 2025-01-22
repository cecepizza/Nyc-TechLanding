"use client";

import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import OpeningCards from "@/app/about/OpeningCards";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white px-6 md:px-16 py-12 md:py-20 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Boxes Animation */}
      <Boxes className="absolute inset-0 -z-3 opacity-80 " />

      {/* Page Title */}
      <motion.h1
        className="relative z-10 text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-md mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="relative z-10 text-center text-gray-400 text-lg md:text-xl mb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Discover who we are and what drives us to build NYC's vibrant tech hub.
      </motion.p>

      {/* Opening Cards Section */}
      <OpeningCards />

      {/* Divider */}
      <motion.div
        className="relative z-10 mt-16 mb-12 flex justify-center"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <span className="block w-[600px] h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-cyan-500 rounded-full"></span>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="relative z-10 text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Built and maintained by{" "}
        <a
          href="https://linktr.ee/nyctech"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-cyan-400 hover:text-yellow-400 transition-colors hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] "
        >
          FractalTech
        </a>
      </motion.div>
    </motion.div>
  );
};

export default About;
