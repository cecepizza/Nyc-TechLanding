"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink, User, Tag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarComponent } from "@/components/calendar/Calendar";
import "@/components/calendar/Calendar.css";

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

// Consistent color palette with the main page
const colors = {
  primary: "#1E293B", // Dark blue-gray
  secondary: "#64748B", // Cool gray
  accent1: "#0EA5E9", // Sky blue
  accent2: "#10B981", // Emerald green
  accent3: "#F43F5E", // Rose red
  background: "#F1F5F9", // Light gray
  border: "#E2E8F0", // Light border gray
};

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
          duration: row[2] || "",
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
    <div className="min-h-screen bg-[#F1F5F9] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-[#1E293B]">
          Tech Events Hub
        </h1>
        <CalendarComponent />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card
              key={index}
              className="bg-white border border-[#E2E8F0] 
                        rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {event.cover_image_url && (
                <div className="relative">
                  <img
                    src={event.cover_image_url}
                    alt=""
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
              )}

              <div className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#1E293B]">
                    {event.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 mt-4">
                  <InfoRow
                    icon={<Calendar className="w-5 h-5 text-[#0EA5E9]" />}
                    text={event.date}
                    type="date"
                  />
                  {event.duration && (
                    <InfoRow
                      icon={<Clock className="w-5 h-5 text-[#10B981]" />}
                      text={event.duration}
                      type="duration"
                    />
                  )}
                  <InfoRow
                    icon={<User className="w-5 h-5 text-[#F43F5E]" />}
                    text={event.organizer}
                    type="organizer"
                  />
                  <InfoRow
                    icon={<MapPin className="w-5 h-5 text-[#64748B]" />}
                    text={event.location}
                    type="location"
                  />
                  <InfoRow
                    icon={<Tag className="w-5 h-5 text-[#64748B]" />}
                    text={event.event_type}
                    type="tag"
                  />
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 
                               bg-[#0EA5E9] text-white rounded-md font-medium
                               hover:bg-[#0284C7] transition-colors"
                    >
                      View Event <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Update InfoRow component
const InfoRow = ({
  icon,
  text,
  type,
}: {
  icon: React.ReactNode;
  text: string;
  type: string;
}) => (
  <div className="flex items-center gap-3 text-[#1E293B]">
    <span>{icon}</span>
    <span>{text}</span>
  </div>
);
