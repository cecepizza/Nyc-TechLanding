// src/components/calendar/hooks/useEvents.ts
import { useState, useEffect } from "react";
import { Event, CalendarEvent } from "../types";
import { config } from "@/config";

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(config.backendUrl + "/api/sheets/events");
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

        // Convert to Calendar Events
        const calendarEvents = eventsData.map((event: Event) => {
          // Parse date and time
          const dateStr = event.date.replace(",", ""); // Remove any commas
          const dateTime = new Date(`${dateStr} ${event.time}`);

          // Create end time (default to 2 hours after start)
          const endTime = new Date(dateTime);
          endTime.setHours(endTime.getHours() + 2);

          return {
            title: event.name,
            start: dateTime,
            end: endTime,
            extendedProps: {
              organizer: event.organizer,
              location: event.location,
              url: event.url,
              coverImage: event.cover_image_url,
              eventType: event.event_type,
            },
          };
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading };
};
