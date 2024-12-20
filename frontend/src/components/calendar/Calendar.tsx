// src/components/calendar/Calendar.tsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { useEvents } from "./hooks/useEvents";
import ShineBorder from "@/components/ui/shine-border";

interface CalendarProps {
  onEventClick: (event: any) => void;
}

export const CalendarComponent: React.FC<CalendarProps> = ({
  onEventClick,
}) => {
  const { events, loading } = useEvents();
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const handleEventClick = (clickInfo: any) => {
    const event = {
      name: clickInfo.event.title,
      date: clickInfo.event.start.toLocaleDateString(),
      time: clickInfo.event.start.toLocaleTimeString(),
      organizer: clickInfo.event.extendedProps.organizer,
      location: clickInfo.event.extendedProps.location,
      url: clickInfo.event.extendedProps.url,
      cover_image_url: clickInfo.event.extendedProps.coverImage,
      event_type: clickInfo.event.extendedProps.eventType,
    };
    setSelectedEvent(event);
    onEventClick(event);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <ShineBorder
        borderRadius={36}
        borderWidth={12.5}
        duration={30}
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
              contentHeight="auto"
              aspectRatio={1.8}
              eventClassNames="px-2 py-1 rounded-md text-sm font-medium"
              titleFormat={{ year: "numeric", month: "long" }}
              buttonText={{
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
              }}
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
    </div>
  );
};
