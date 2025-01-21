"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink, User, Tag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarComponent } from "@/components/calendar/Calendar";
import { SlidingCard } from "@/components/ui/EventPopupCard";
import { Boxes } from "@/components/ui/background-boxes";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Marquee from "@/components/ui/marquee";
import { motion } from "framer-motion";
import { config } from "@/config";
import { Event } from "@/components/calendar/types";
import "./Events.css";

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
          time: row[2] || "",
          organizer: row[3] || "",
          location: row[4] || "",
          url: row[5] || null,
          cover_image_url: row[6] || null,
          event_type: row[7] || "",
          last_updated: row[8] || "",
        }));

        const uniqueEvents = eventsData.filter(
          (event, index, self) =>
            index ===
            self.findIndex(
              (e) => e.name === event.name && e.date === event.date
            )
        );

        uniqueEvents.sort(
          (a: Event, b: Event) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setEvents(uniqueEvents);
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
    <div className="events-page">
      <Boxes className="absolute inset-0 z-0 bg-opacity-70" />
      <div className="relative z-10 max-w-6xl mx-auto space-y-8 p-4 md:p-8">
        {/* Page Header */}
        <div className="events-header">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text drop-shadow-lg"
          >
            Upcoming Events & Meetups
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="text-lg text-gray-400 mt-4"
          >
            Discover and connect at our upcoming events.
          </motion.p>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="loading-indicator"
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" />
            </div>
            <div className="text-cyan-400">Loading events...</div>
          </motion.div>
        ) : (
          <>
            {/* Calendar Section */}
            <motion.div
              className="calendar-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CalendarComponent onEventClick={handleCalendarEventClick} />
            </motion.div>

            {/* Marquee Section */}
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
                          backgroundImage: `url(${
                            event.cover_image_url || ""
                          })`,
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
          </>
        )}
      </div>

      {/* Sliding Event Popup */}
      <SlidingCard
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
}

const EventCard = ({ event }: { event: Event }) => (
  <div className="event-card">
    {/* Image Section */}
    <div>
      {event.cover_image_url ? (
        <img
          src={event.cover_image_url}
          alt={event.name}
          className="w-full h-150 object-cover"
        />
      ) : (
        <div className="w-full h-150 bg-gradient-to-r from-slate-800 to-slate-700"></div>
      )}
    </div>

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
);
const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="info-row">
    {icon}
    <span className="truncate">{text}</span>
  </div>
);

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
