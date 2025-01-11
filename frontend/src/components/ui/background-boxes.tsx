"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);

  const getRandomColor = () => {
    const colors = [
      "rgba(0, 204, 255, 0.2)", // Cyan
      "rgba(100, 149, 237, 0.2)", // Cornflower Blue
      "rgba(138, 43, 226, 0.2)", // Blue-Violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-50%,-50%) skewX(140deg) skewY(0deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/2 top-1/2 p-4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8 border-l border-slate-600 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                boxShadow: "0 0 10px rgba(14, 165, 233, 0.7)",
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 3 },
              }}
              key={`col` + j}
              className="w-16 h-8 border-r border-t border-slate-700 relative shadow-[0_0_2px_rgba(14,165,233,0.1)] hover:shadow-[0_0_4px_rgba(14,165,233,0.2)]"
            ></motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
