// src/components/calendar/Calendar.tsx
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { EventDetailsDialog } from "./EventDetailsDialog";
import { useEvents } from "./hooks/useEvents";
import { CalendarEvent } from "./types";
import ShineBorder from "@/components/ui/shine-border";

export const CalendarComponent = () => {
  const { events, loading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const handleEventClick = (clickInfo: any) => {
    const { title, start, end, extendedProps } = clickInfo.event;
    setSelectedEvent({
      title,
      start,
      end,
      extendedProps,
    });
  };

  useEffect(() => {
    const calendar = document.querySelector(".fc");

    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      (e.currentTarget as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (e.currentTarget as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    };

    calendar?.addEventListener("mousemove", handleMouseMove);

    return () => {
      calendar?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-cyan-400 text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ShineBorder
        borderRadius={16}
        borderWidth={3.5}
        duration={8}
        color={["rgba(14, 165, 233, 0.3)", "rgba(99, 102, 241, 0.3)"]}
        className="w-full bg-transparent"
      >
        <Card className="bg-transparent border-none shadow-none overflow-hidden">
          <div className="p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              eventClick={handleEventClick}
              height="600px"
              eventColor="#0EA5E9"
              eventTextColor="white"
              dayMaxEvents={3}
              eventDisplay="block"
              eventTimeFormat={{
                hour: undefined,
                minute: undefined,
                meridiem: false,
              }}
              // Custom styling
              contentHeight="auto"
              aspectRatio={1.8}
              // Better event styling
              eventClassNames="px-2 py-1 rounded-md text-sm font-medium"
              // Header styling
              titleFormat={{ year: "numeric", month: "long" }}
              buttonText={{
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
              }}
              // View specific options
              views={{
                dayGrid: {
                  dayMaxEventRows: 3,
                  moreLinkText: (n) => `+${n} more`,
                  moreLinkClick: "popover",
                },
                timeGrid: {
                  dayMaxEventRows: 3,
                  moreLinkText: (n) => `+${n} more`,
                  moreLinkClick: "popover",
                },
              }}
              eventContent={(eventInfo) => {
                return (
                  <div className="p-1 text-xs w-full overflow-hidden">
                    <div className="font-bold truncate">
                      {eventInfo.event.title}
                    </div>
                  </div>
                );
              }}
              displayEventTime={false}
              displayEventEnd={false}
            />
          </div>
        </Card>
      </ShineBorder>

      <EventDetailsDialog
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};
