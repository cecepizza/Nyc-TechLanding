"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingCardProps {
  title: string;
  description: string;
  link?: string;
  position?: [number, number, number];
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <motion.div
      className="p-6 rounded-xl bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 shadow-xl transform hover:scale-105 transition-all"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 8px 30px rgba(0, 255, 255, 0.3)",
      }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-teal-300 mb-3">{title}</h3>
      <p className="text-gray-300 text-sm mb-6">{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-500 hover:text-teal-300 font-medium transition"
        >
          Learn More →
        </a>
      )}
    </motion.div>
  );
};

export default FloatingCard;
