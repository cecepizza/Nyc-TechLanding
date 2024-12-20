// src/components/calendar/Calendar.tsx
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { EventDetailsDialog } from "./EventDetailsDialog";
import { useEvents } from "./hooks/useEvents";
import { CalendarEvent } from "./types";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-cyan-400 text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Card className="bg-white border border-[#E2E8F0] rounded-lg shadow-md overflow-hidden">
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
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
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
          />
        </div>
      </Card>

      <EventDetailsDialog
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};
