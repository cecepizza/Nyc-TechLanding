import React from "react";
import { motion } from "framer-motion";

const CompactPreviewCard = ({
  data,
  section,
}: {
  data: string[];
  section: string;
}) => (
  <motion.div
    whileHover={{
      scale: 1.01,
      boxShadow: "0px 0px 15px var(--card-hover-shadow)",
    }}
    className="card flex items-center gap-2 md:gap-4 transition-transform"
  >
    <div
      className="w-12 h-12 md:w-16 md:h-16 bg-cover bg-center rounded-md"
      style={{
        backgroundImage: `url(${
          section === "events" ? data[6] : data[7] || "/previews/default.jpg"
        })`,
      }}
    ></div>

    <div className="flex-1">
      <h3 className="text-cyan-300 font-bold text-xs md:text-sm truncate">
        {data[0]}
      </h3>
      <p className="text-slate-400 text-xs truncate">{data[1]}</p>
    </div>
  </motion.div>
);

export default CompactPreviewCard;
