"use client";
import React, { useEffect, useState } from "react";

interface Event {
  api_id: string;
  name: string;
  start_at: string;
  location?: string;
  url: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        if (data.events) {
          console.log("Events array:", data.events);
        } else {
          console.log("No events found in the response.");
        }
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">NYC Tech Events</h1>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <a
            key={event.api_id}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {event.name} - {new Date(event.start_at).toLocaleDateString()}
          </a>
        ))}
      </div>
    </div>
  );
}
