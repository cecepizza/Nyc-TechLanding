import React from "react";
import { motion } from "framer-motion";
import CompactPreviewCard from "@/components/previews/CompactPreviewCard";

const CompactGridSection = ({
  title,
  description,
  link,
  data,
  section,
}: {
  title: string;
  description: string;
  link: string;
  data: string[][];
  section: string;
}) => (
  <div className="relative z-10 px-4 md:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6 rounded-lg shadow-lg"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.3)",
        background: "rgba(10, 10, 10, 0.5)",
      }}
    >
      <div className="text-left mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <p className="text-slate-300 text-sm md:text-base">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((item, index) => (
          <CompactPreviewCard key={index} data={item} section={section} />
        ))}
      </div>

      <div className="text-center mt-4 md:mt-6">
        <a
          href={link}
          className="inline-block px-3 py-2 md:px-4 md:py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md font-medium text-sm transition-all"
        >
          View All →
        </a>
      </div>
    </motion.div>
  </div>
);

export default CompactGridSection;
