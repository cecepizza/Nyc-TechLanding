"use client";

import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import OpeningCards from "@/app/about/OpeningCards";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white p-8 md:p-16 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Animation */}
      <Boxes className="absolute inset-0 -z-5" />

      {/* Title */}
      <motion.h1
        className="relative z-10 text-5xl md:text-6xl font-extrabold text-center text-transparent bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text drop-shadow-md mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        About Us
      </motion.h1>

      {/* Cards */}
      <OpeningCards />

      {/* Divider */}
      <motion.hr
        className="relative z-10 my-11 border-b-4 border-gray-700"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />

      {/* Footer */}
      <motion.div
        className="relative z-10 text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Maintained by{" "}
        <a
          href="https://linktr.ee/nyctech"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white hover:text-cyan-200 transition-colors"
        >
          FractalTech
        </a>
      </motion.div>
    </motion.div>
  );
};

export default About;
