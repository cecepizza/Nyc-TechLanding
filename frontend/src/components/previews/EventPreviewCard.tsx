import React from "react";
import { motion } from "framer-motion";

interface EventPreviewCardProps {
  data: string[];
  onClick: () => void;
}

const EventPreviewCard: React.FC<EventPreviewCardProps> = ({
  data,
  onClick,
}) => {
  const imageUrl =
    data[6] && data[6].trim() !== "" ? data[6] : "/previews/default.jpg"; // Ensure the URL is not empty

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
        className="w-12 h-12 md:w-16 md:h-16 bg-cover bg-center rounded-md flex-shrink-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Add a fallback text or icon if needed */}
      </div>

      <div className="flex-1 flex flex-col max-w-[calc(100%-4rem)]">
        <h3 className="text-cyan-300 font-bold text-xs md:text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {data[0]} {/* Event Name */}
        </h3>
        <p className="text-slate-400 text-xs truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {data[1]} {/* Event Date */}
        </p>
      </div>
    </motion.div>
  );
};

export default EventPreviewCard;
