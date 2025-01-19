import React, { useState } from "react";
import { motion } from "framer-motion";
import EventPreviewCard from "@/components/previews/EventPreviewCard";
import JobPreviewCard from "@/components/previews/JobPreviewCard";
import NetworkPreviewCard from "@/components/previews/NetworkPreviewCard";
import PreviewPopupCard from "@/components/previews/PreviewPopupCard";
import { BorderBeam } from "@/components/ui/border-beam";

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
    <div className="relative z-10  mb-2 rounded-xl">
      <BorderBeam className="absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-8 rounded-xl shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(18, 18, 18, 0.8), rgba(40, 40, 40, 0.2))",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Title and Description */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
              {title}
            </h2>
            <p className="text-slate-400 text-sm md:text-lg">{description}</p>
          </div>
          <div>
            <a
              href={link}
              className="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              View All →
            </a>
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data
            .slice(0, 9)
            .map((item, index) => renderPreviewCard(item, index))}
        </div>
      </motion.div>

      {/* Popup for Card Details */}
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
