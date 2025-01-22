"use client";

import React, { useEffect, useState } from "react";
import { CalendarComponent } from "@/app/events/calendar/Calendar";
import { SlidingCard } from "@/app/events/EventPopupCard";
import { Boxes } from "@/components/ui/background-boxes";
import { motion } from "framer-motion";
import { config } from "@/config";
import { Event } from "@/app/events/calendar/types";
import MarqueeSection from "./MarqueeSection";
import "./Events.css";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoints = [config.backendUrl + "/api/sheets/events"];
        const responses = await Promise.all(
          endpoints.map(async (endpoint) => {
            const response = await fetch(endpoint);
            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
          })
        );
        const data = responses[0].data;
        const eventsData = (data?.slice(1) || []).map((row: string[]) => ({
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
    };
    fetchData();
  }, []);

  const handleCalendarEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="events-page">
      <Boxes className="fixed inset-0 z-0 bg-opacity-100" />
      <div className="relative z-10 max-w-6xl mx-auto space-y-8 p-2 md:p-8">
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
              style={{ marginTop: "0rem" }}
            >
              <CalendarComponent onEventClick={handleCalendarEventClick} />
            </motion.div>

            {/* Marquee Section */}
            <MarqueeSection events={events} />
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
