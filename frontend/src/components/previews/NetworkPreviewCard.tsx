import React from "react";
import { motion } from "framer-motion";

interface NetworkPreviewCardProps {
  data: string[];
  onClick: () => void;
}

const NetworkPreviewCard: React.FC<NetworkPreviewCardProps> = ({
  data,
  onClick,
}) => {
  const imageUrl = "/previews/default.jpg"; // Default image as no specific URL is provided

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
          {data[0]} {/* Company Name */}
        </h3>
        <p className="text-slate-400 text-xs truncate">
          {data[1]} {/* Website */}
        </p>
        <p className="text-slate-400 text-xs truncate">
          {data[2]} {/* Funding Stage */}
        </p>
        <p className="text-slate-400 text-xs truncate">
          {data[4]} {/* Contact Person */}
        </p>
        <p className="text-slate-400 text-xs truncate">
          {data[5]} {/* Description */}
        </p>
      </div>
    </motion.div>
  );
};

export default NetworkPreviewCard;
