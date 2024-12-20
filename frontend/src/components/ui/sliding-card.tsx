import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import "./modal.css";

interface SlidingCardProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const SlidingCard: React.FC<SlidingCardProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="modal-container"
          >
            <button onClick={onClose} className="modal-close-button">
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="modal-content">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
