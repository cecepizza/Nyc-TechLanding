"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink, User, Tag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

// Update color palette to be more muted
const colors = {
  primary: "#E85D3F",     // Muted orange-red
  secondary: "#6B8CC7",   // Muted blue
  accent1: "#DFC17E",     // Muted yellow
  accent2: "#8E6F5B",     // Muted brown
  accent3: "#B784A7",     // Muted purple
  background: "#F5F0E8",  // Warm off-white
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
    <div className="min-h-screen bg-gradient-to-br from-[#FAF0E6] via-[#F5DEB3] to-[#FAF0E6] p-8">
      {/* Artistic Background Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#FF6B3E] blur-xl"></div>
        <div className="absolute top-60 right-20 w-32 h-32 rounded-full bg-[#4169E1] blur-xl transform rotate-45"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 rounded-full bg-[#F4D03F] blur-xl"></div>
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-[#8B4513] blur-lg transform -rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B4513] via-[#FF6B3E] to-[#4169E1]">
            NYC Tech Events
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="bg-[#2A2A2A]/95 backdrop-blur-sm border-2 border-[#3A3A3A] 
                        rounded-xl overflow-hidden shadow-xl group
                        relative terminal-window"
            >
              {/* Background Image */}
              {event.cover_image_url && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={event.cover_image_url}
                    alt=""
                    className="w-full h-full object-cover opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b 
                                  from-[#2A2A2A]/80 
                                  via-[#2A2A2A]/70 
                                  to-[#2A2A2A]/80"></div>
                </div>
              )}

              <div className="relative z-10">
                <CardHeader className="pt-6">
                  <CardTitle className="text-2xl font-mono text-[#F5F0E8] border-b border-[#3A3A3A] pb-4
                                       bg-gradient-to-r from-[#E85D3F] via-[#B784A7] to-[#6B8CC7] 
                                       bg-clip-text text-transparent">
                    {event.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 p-6">
                  {/* DateTime Bubble */}
                  <div className="terminal-bubble bg-[#3A3A3A] p-4 rounded-lg border border-[#4A4A4A]">
                    <div className="flex flex-col gap-2">
                      <InfoRow
                        icon={<Calendar className="w-4 h-4 text-[#E85D3F]" />}
                        text={event.date}
                        type="date"
                      />
                      {event.duration && (
                        <InfoRow
                          icon={<Clock className="w-4 h-4 text-[#B784A7]" />}
                          text={event.duration}
                          type="duration"
                        />
                      )}
                    </div>
                  </div>

                  {/* Organizer Bubble */}
                  <div className="terminal-bubble bg-[#3A3A3A] p-4 rounded-lg border border-[#4A4A4A]">
                    <InfoRow
                      icon={<User className="w-4 h-4 text-[#DFC17E]" />}
                      text={event.organizer}
                      type="organizer"
                    />
                  </div>

                  {/* Location and Tags Bubble */}
                  <div className="terminal-bubble bg-[#3A3A3A] p-4 rounded-lg border border-[#4A4A4A]">
                    <div className="flex flex-col gap-2">
                      <InfoRow
                        icon={<MapPin className="w-4 h-4 text-[#6B8CC7]" />}
                        text={event.location}
                        type="location"
                      />
                      <InfoRow
                        icon={<Tag className="w-4 h-4 text-[#8E6F5B]" />}
                        text={event.event_type}
                        type="tag"
                      />
                    </div>
                  </div>

                  {/* View Event Button */}
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 
                               bg-[#3A3A3A] border border-[#4A4A4A] 
                               text-[#F5F0E8] rounded-lg font-mono
                               hover:bg-[#4A4A4A] transition-colors"
                    >
                      > View Event <ExternalLink className="w-4 h-4" />
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
const InfoRow = ({ icon, text, type }: { icon: React.ReactNode; text: string; type: string }) => (
  <div className="flex items-center gap-2 font-mono text-[#F5F0E8]">
    <span className="terminal-icon">{icon}</span>
    <span>{text}</span>
  </div>
);
