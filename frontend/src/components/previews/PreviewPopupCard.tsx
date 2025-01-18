import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

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

  // Add event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

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
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.01 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ y: "0%", opacity: 0 }}
            animate={{
              y: "-60%",
              x: "-50%",
              opacity: 1,
              top: "50%",
              left: "50%",
            }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 29, stiffness: 350 }}
            className="fixed z-50 w-full max-w-lg overflow-hidden rounded-lg shadow-2xl bg-gradient-to-r from-blue-800 to-blue-900 border border-gray-600"
          >
            {/* Popup Content */}
            <div
              className="relative w-full h-[300px] bg-cover bg-center transition-transform duration-300 ease-in-out transform"
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-800/80 via-blue-800/60 to-transparent" />
              <div className="absolute bottom-6 left-6 p-4">
                <h2 className="text-2xl font-bold text-white shadow-md">
                  {currentItem[0]}
                </h2>
                <p className="text-md text-gray-300">{currentItem[1]}</p>
                <p className="text-sm text-gray-400">{currentItem[2]}</p>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => {
                    if (section === "jobs") {
                      window.open(currentItem[3], "_blank");
                    } else if (section === "events") {
                      window.open(currentItem[5], "_blank");
                    }
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full opacity-80 bg-blue-400 hover:bg-blue-600 text-white shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <ExternalLink className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Navigation Buttons Below the Image */}
            <div className="flex justify-between items-center p-3 bg-gray-950 rounded-b-lg border-t border-gray-800 shadow-md">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                className="flex-none items-center justify-center w-10 h-10 p-2 rounded-md bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 transition duration-200"
                aria-label="Previous"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              {/* View All Button */}
              <button
                onClick={() => {
                  if (section === "jobs") {
                    window.location.href = `/jobs`;
                  } else if (section === "events") {
                    window.location.href = `/events`;
                  }
                }}
                className="flex-grow text-center py-2 px-4 md:py-3 md:px-8 rounded-md bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-200"
              >
                View All
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="flex-none items-center justify-center w-10 h-10 p-2 rounded-md bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 transition duration-200"
                aria-label="Next"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PreviewPopupCard;
