import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  User,
  Tag,
} from "lucide-react";

interface SlidingCardProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}

export const SlidingCard: React.FC<SlidingCardProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Card Container */}
          <motion.div
            initial={{ y: "50%", opacity: 0 }}
            animate={{
              y: "-50%",
              x: "-50%",
              opacity: 1,
              top: "50%",
              left: "50%",
            }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="fixed z-50 w-full max-w-2xl overflow-hidden
                     rounded-xl shadow-2xl group"
          >
            {/* Background Image with Gradient Overlay */}
            <div className="relative w-full h-[500px]">
              {event.cover_image_url ? (
                <img
                  src={event.cover_image_url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

              {/* Content Container */}
              <div className="relative h-full flex flex-col justify-between p-8">
                {/* Top Bar */}
                <div className="flex justify-between items-start">
                  <div className="w-16 h-1 bg-white/20 rounded-full" />
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 
                             transition-colors duration-200 transform hover:scale-105"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Main Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  {/* Title */}
                  <h2 className="text-3xl font-bold text-white group-hover:scale-[1.02] transition-transform">
                    {event.name}
                  </h2>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <InfoRow
                      icon={<Calendar className="w-5 h-5 text-cyan-400" />}
                      text={event.date}
                    />
                    <InfoRow
                      icon={<Clock className="w-5 h-5 text-emerald-400" />}
                      text={event.time || event.duration}
                    />
                    <InfoRow
                      icon={<User className="w-5 h-5 text-rose-400" />}
                      text={event.organizer}
                    />
                    <InfoRow
                      icon={<MapPin className="w-5 h-5 text-violet-400" />}
                      text={event.location}
                    />
                    <InfoRow
                      icon={<Tag className="w-5 h-5 text-amber-400" />}
                      text={event.event_type}
                      className="col-span-2"
                    />
                  </div>

                  {/* Action Button */}
                  {event.url && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3
                                 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg
                                 font-medium transition-colors duration-200
                                 shadow-lg hover:shadow-cyan-500/25"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Event Details
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const InfoRow = ({
  icon,
  text,
  className = "",
}: {
  icon: React.ReactNode;
  text: string;
  className?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`flex items-center gap-3 text-white/90 hover:text-white 
              bg-black/20 backdrop-blur-sm rounded-lg p-3
              hover:bg-black/30 transition-colors ${className}`}
  >
    <span>{icon}</span>
    <span className="text-sm font-medium truncate">{text}</span>
  </motion.div>
);
