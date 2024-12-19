"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface EventDetails {
  api_id: string;
  name: string;
  start_at: string;
  description?: string;
  url: string;
  cover_url?: string;
  location?: {
    city: string;
    type: string;
  };
  created_at: string;
}

interface LumaEvent {
  api_id: string;
  event: EventDetails;
  tags: string[];
}

export default function Events() {
  const [events, setEvents] = useState<LumaEvent[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:8000/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data.events.entries || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          NYC Tech Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full text-center text-xl text-gray-500">
              No events to display.
            </div>
          ) : (
            events.map((eventItem) => (
              <Card
                key={eventItem.api_id}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {eventItem.event.cover_url && (
                  <img
                    src={eventItem.event.cover_url}
                    alt={eventItem.event.name || "Event cover"}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}

                <CardHeader>
                  <CardTitle className="text-xl font-bold line-clamp-2">
                    {eventItem.event.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(eventItem.event.start_at).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(eventItem.event.start_at).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>

                    {eventItem.event.location && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {eventItem.event.location.city || "Location TBA"}
                        </span>
                      </div>
                    )}

                    {eventItem.event.description && (
                      <p className="text-gray-600 line-clamp-3 mt-2">
                        {eventItem.event.description}
                      </p>
                    )}

                    <a
                      href={eventItem.event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Event <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
