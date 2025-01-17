import React from "react";
import { motion } from "framer-motion";

interface JobPreviewCardProps {
  data: string[];
  onClick: () => void;
}

const JobPreviewCard: React.FC<JobPreviewCardProps> = ({ data, onClick }) => {
  const imageUrl = data[7] || "/previews/default.jpg"; // Use index 7 for the image URL

  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        boxShadow: "0px 0px 15px var(--card-hover-shadow)",
      }}
      className="card flex items-center gap-2 md:gap-4 transition-transform"
      onClick={onClick}
    >
      <div
        className="w-12 h-12 md:w-16 md:h-16 bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="flex-1">
        <h3 className="text-cyan-300 font-bold text-xs md:text-sm truncate">
          {data[1]} {/* Role Title */}
        </h3>
        <p className="text-slate-400 text-xs truncate">
          {data[0]} {/* Company Name */}
        </p>
      </div>
    </motion.div>
  );
};

export default JobPreviewCard;
