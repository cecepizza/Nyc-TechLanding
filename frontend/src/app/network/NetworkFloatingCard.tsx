"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingCardProps {
  title: string;
  description: string;
  link?: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <motion.div
      className="p-4 sm:p-5 rounded-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-md border border-gray-700 transition-all duration-300"
      whileHover={{
        scale: 1.05,
        background:
          "linear-gradient(135deg, rgba(14,165,233,0.4), rgba(8,145,178,0.9), rgba(3,105,161,0.1))",
        boxShadow: "0px 10px 20px rgba(14, 165, 233, 0.3)",
        borderColor: "#ffcc00",
      }}
    >
      <h3 className="text-base sm:text-lg font-semibold text-cyan-400 mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-300 mb-4">{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 font-medium transition text-sm sm:text-base"
        >
          Learn More →
        </a>
      )}
    </motion.div>
  );
};

export default FloatingCard;
