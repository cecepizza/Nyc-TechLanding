import React, { useState } from "react";
import { motion } from "framer-motion";
import EventPreviewCard from "@/components/previews/EventPreviewCard";
import JobPreviewCard from "@/components/previews/JobPreviewCard";
import NetworkPreviewCard from "@/components/previews/NetworkPreviewCard";
import PreviewPopupCard from "@/components/previews/PreviewPopupCard";

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
    switch (section) {
      case "events":
        return (
          <EventPreviewCard
            key={index}
            data={item}
            onClick={() => handleCardClick(index)}
          />
        );
      case "jobs":
        return (
          <JobPreviewCard
            key={index}
            data={item}
            onClick={() => handleCardClick(index)}
          />
        );
      case "network":
        return (
          <NetworkPreviewCard
            key={index}
            data={item}
            onClick={() => handleCardClick(index)}
          />
        );
      default:
        return null;
    }
  };

  return (
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
          {data.map((item, index) => renderPreviewCard(item, index))}
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

      <PreviewPopupCard
        isOpen={isPopupOpen}
        onClose={handleClose}
        data={data}
        currentIndex={currentIndex}
        section={section}
      />
    </div>
  );
};

export default CompactGridSection;
