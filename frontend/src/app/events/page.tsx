"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink, User, Tag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarComponent } from "@/components/calendar/Calendar";
import { SlidingCard } from "@/components/ui/sliding-card";
import { Boxes } from "@/components/ui/background-boxes";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Marquee from "@/components/ui/marquee";
import "@/components/calendar/Calendar.css";
import { motion } from "framer-motion";
import { config } from "@/config";

interface Event {
  name: string;
  date: string;
  duration: string;
  location: string;
  organizer: string;
  url: string | null;
  cover_image_url: string | null;
  event_type: string;
  last_updated: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(config.backendUrl + "/api/sheets/events");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const eventsData = (data.data?.slice(1) || []).map((row: string[]) => ({
          name: row[0] || "",
          date: row[1] || "",
          duration: row[2] || "",
          organizer: row[3] || "",
          location: row[4] || "",
          url: row[5] || null,
          cover_image_url: row[6] || null,
          event_type: row[7] || "",
          last_updated: row[8] || "",
        }));
        eventsData.sort(
          (a: Event, b: Event) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleCalendarEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="relative bg-slate-800 min-h-screen p-2">
      <Boxes className="absolute inset-2 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="text-4xl font-semibold text-center mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text transition-transform duration-300"
        >
          Tech Events Hub
        </motion.h1>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 space-y-4"
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" />
            </div>
            <div className="text-cyan-400 text-lg">Loading events...</div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CalendarComponent onEventClick={handleCalendarEventClick} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="overflow-hidden"
            >
              <Marquee pauseOnHover className="py-4">
                <div className="flex gap-6 px-6">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="w-[320px] h-[420px] flex items-center justify-center"
                    >
                      <CardContainer containerClassName="w-full h-full">
                        <CardBody className="w-full h-full">
                          <CardItem>
                            <EventCard event={event} />
                          </CardItem>
                        </CardBody>
                      </CardContainer>
                    </div>
                  ))}
                </div>
              </Marquee>
            </motion.div>
          </>
        )}
      </div>

      <SlidingCard
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
}
const EventCard = ({ event }: { event: Event }) => (
  <Card
    className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg 
                   shadow-xl hover:shadow-2xl transition-all duration-300 
                   w-[300px] h-[400px]"
  >
    {/* Image Section */}
    <div className="h-[160px] flex-shrink-0">
      {event.cover_image_url ? (
        <img
          src={event.cover_image_url}
          alt=""
          className="w-full h-full object-cover rounded-t-lg"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-lg" />
      )}
    </div>

    {/* Content Section */}
    <div className="p-4 flex flex-col h-[240px]">
      {" "}
      {/* Fixed height for content */}
      <CardHeader className="p-0 mb-3">
        <CardTitle className="text-lg font-semibold text-white/90 line-clamp-2">
          {event.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-full">
        <div className="space-y-2 mb-auto">
          {" "}
          {/* Push content up */}
          <InfoRow
            icon={<Calendar className="w-4 h-4 text-cyan-400" />}
            text={event.date}
          />
          {event.duration && (
            <InfoRow
              icon={<Clock className="w-4 h-4 text-emerald-400" />}
              text={event.duration}
            />
          )}
          <InfoRow
            icon={<User className="w-4 h-4 text-rose-400" />}
            text={truncateText(event.organizer, 30)}
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4 text-violet-400" />}
            text={event.location}
          />
          <InfoRow
            icon={<Tag className="w-4 h-4 text-amber-400" />}
            text={event.event_type}
          />
        </div>

        {/* Button always at bottom */}
        {event.url && (
          <div className="pt-2 relative">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 
                         bg-cyan-500 hover:bg-cyan-600 text-white rounded-md 
                         font-medium text-sm transition-all duration-200
                         hover:translate-y-[-1px] active:translate-y-0"
              onClick={(e) => e.stopPropagation()}
            >
              View Event <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </CardContent>
    </div>
  </Card>
);

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 text-white/80 hover:text-white/90 transition-colors">
    <span>{icon}</span>
    <span className="text-sm font-mono truncate">{text}</span>
  </div>
);

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
