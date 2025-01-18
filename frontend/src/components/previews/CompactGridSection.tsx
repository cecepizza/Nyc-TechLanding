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
    <div className="relative z-10 px-4 md:px-8 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-2 md:p-8 rounded-lg shadow-lg"
        style={{
          border: "1px solid black",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.3))",
        }}
      >
        <div className="text-left mb-6 md:mb-4 flex justify-between items-start ">
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent mb-1 overflow-hidden text-ellipsis whitespace-nowrap md:whitespace-normal">
              {title}
            </h2>
            <p className="text-slate-400 text-sm md:text-lg ">{description}</p>
          </div>
          <div className="text-center mt-2 md:mt-0">
            <a
              href={link}
              className="inline-block px-2 py-1 md:px-4 md:py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-medium text-lg md:text-base transition-all duration-200"
            >
              <span className="block md:hidden">→</span>
              <span className="hidden md:block">View All →</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-black/50">
          {data
            .slice(0, 9)
            .map((item, index) => renderPreviewCard(item, index))}
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
