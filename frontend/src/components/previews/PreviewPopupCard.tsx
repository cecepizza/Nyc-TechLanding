import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PreviewPopupCardProps {
  isOpen: boolean;
  onClose: () => void;
  data: string[][];
  currentIndex: number;
  section: string;
}

const PreviewPopupCard: React.FC<PreviewPopupCardProps> = ({
  isOpen,
  onClose,
  data,
  currentIndex,
  section,
}) => {
  const [index, setIndex] = useState(currentIndex);

  // Update index when currentIndex prop changes
  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  if (!data || data.length === 0) return null;

  const currentItem = data[index];
  const imageUrl =
    section === "jobs"
      ? currentItem[7]
      : currentItem[6] || "/previews/default.jpg";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ y: "50%", opacity: 0 }}
            animate={{
              y: "-60%",
              x: "-50%",
              opacity: 1,
              top: "50%",
              left: "50%",
            }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed z-50 w-full max-w-md overflow-visible rounded-lg shadow-2xl bg-gradient-to-r from-blue-800 to-blue-900 border-4 border-gray-500"
          >
            {/* Popup Content */}
            <div
              className="relative w-full h-[300px] bg-cover bg-center transition-transform duration-300 ease-in-out transform"
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-800/80 via-blue-800/60 to-transparent" />
              <div className="absolute bottom-16 left-0 p-6">
                <h2 className="text-3xl font-extrabold text-white shadow-md">
                  {currentItem[0]}
                </h2>
                <p className="text-lg text-gray-300">{currentItem[1]}</p>
              </div>
            </div>

            {/* Navigation Buttons Below the Image */}
            <div className="flex justify-between fixed bottom-0 left-0 right-0 z-[60] px-0 bg-gradient-to-r from-gray-800 to-gray-900">
              <button
                onClick={handlePrevious}
                className="popup-card button button-back flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </button>

              {/* Corresponding Page Button */}
              <button
                onClick={() => {
                  if (section === "jobs") {
                    window.location.href = `/jobs`; // Navigate to jobs page
                  } else if (section === "events") {
                    window.location.href = `/events`; // Navigate to events page
                  }
                }}
                className="popup-card button button-go flex items-center justify-center"
              >
                Go to Page
              </button>

              <button
                onClick={handleNext}
                className="popup-card button button-next flex items-center justify-center"
              >
                <span className="mr-2">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PreviewPopupCard;
