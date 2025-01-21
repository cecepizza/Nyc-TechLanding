import React from "react";
import Marquee from "@/components/ui/marquee";
import { ExternalLink, Calendar, User, MapPin, Tag } from "lucide-react";
import { Event } from "@/app/events/calendar/types";
import { motion } from "framer-motion";

interface MarqueeSectionProps {
  events: Event[];
}

const MarqueeSection: React.FC<MarqueeSectionProps> = ({ events }) => {
  return (
    <motion.div
      className="marquee-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Marquee pauseOnHover>
        <div className="marquee-card-container">
          {events.map((event, index) => (
            <div key={index} className="marquee-card">
              {/* Background Image Section */}
              <div
                className="image-container"
                style={{
                  backgroundImage: `url(${event.cover_image_url || ""})`,
                }}
              ></div>

              {/* Content Section */}
              <div className="card-content">
                <h2 className="card-title">{event.name}</h2>
                <div className="space-y-2">
                  <div className="info-row">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="info-row">
                    <User className="w-4 h-4 text-rose-400" />
                    <span>{event.organizer}</span>
                  </div>
                  <div className="info-row">
                    <MapPin className="w-4 h-4 text-violet-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="info-row">
                    <Tag className="w-4 h-4 text-amber-400" />
                    <span>{event.event_type}</span>
                  </div>
                </div>

                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-link"
                  >
                    View Event <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </motion.div>
  );
};

export default MarqueeSection;
