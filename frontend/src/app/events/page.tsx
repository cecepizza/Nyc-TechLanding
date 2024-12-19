"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink, User, Tag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Event {
  name: string;
  date: string;
  time: string;
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

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/sheets/events");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        // Skip header row and map to Event interface
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
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-cyan-400 tracking-tight">
          NYC Tech Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="bg-slate-800 border-2 border-cyan-500/50 hover:border-cyan-400 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              {event.cover_image_url && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={event.cover_image_url}
                    alt={event.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl font-bold text-cyan-300 line-clamp-2 hover:line-clamp-none">
                  {event.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-cyan-200">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{event.date}</span>
                  </div>

                  {event.time && (
                    <div className="flex items-center gap-2 text-cyan-200">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>{event.time}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-cyan-200">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-cyan-200">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>{event.organizer}</span>
                  </div>

                  <div className="flex items-center gap-2 text-cyan-200">
                    <Tag className="w-4 h-4 text-cyan-400" />
                    <span className="px-2 py-1 bg-cyan-900/50 rounded-full text-sm">
                      {event.event_type}
                    </span>
                  </div>
                </div>

                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-colors duration-300"
                  >
                    View Event <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
