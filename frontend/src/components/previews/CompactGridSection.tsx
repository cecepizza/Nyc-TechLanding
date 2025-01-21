import React, { useState } from "react";
import { motion } from "framer-motion";
import EventPreviewCard from "@/components/previews/EventPreviewCard";
import JobPreviewCard from "@/components/previews/JobPreviewCard";
import NetworkPreviewCard from "@/components/previews/NetworkPreviewCard";
import PreviewPopupCard from "@/components/previews/PreviewPopupCard";
// import { BorderBeam } from "@/components/ui/border-beam";

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
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  const renderPreviewCard = (item: string[], index: number) => {
    const cardVariants = {
      initial: { scale: 1, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
      hover: { scale: 1, boxShadow: "0px 10px 20px rgba(0, 0, 0, .5)" },
    };

    switch (section) {
      case "events":
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <EventPreviewCard
              data={item}
              onClick={() => handleCardClick(index)}
            />
          </motion.div>
        );
      case "jobs":
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <JobPreviewCard
              data={item}
              onClick={() => handleCardClick(index)}
            />
          </motion.div>
        );
      case "network":
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <NetworkPreviewCard
              data={item}
              onClick={() => handleCardClick(index)}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="relative z-10 mb-8 rounded-xl"
      whileHover={{
        scale: 1.009,
        boxShadow:
          "0px 12px 25px rgba(255, 255, 255, 0.15), 0px 0px 20px rgba(99, 102, 241, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      <div
        className="p-6 md:p-8 rounded-xl shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, rgba(18, 18, 18, 0.8), rgba(40, 40, 40, 0.4))",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Title and Description */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
              {title}
            </h2>
            <p className="text-slate-400 text-sm md:text-lg">{description}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <a
              href={link}
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              View All →
            </a>
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data
            .slice(0, 9)
            .map((item, index) => renderPreviewCard(item, index))}
        </div>
      </div>

      {/* Popup for Card Details */}
      <PreviewPopupCard
        isOpen={isPopupOpen}
        onClose={handleClose}
        data={data}
        currentIndex={currentIndex}
        section={section}
      />
    </motion.div>
  );
};

export default CompactGridSection;
