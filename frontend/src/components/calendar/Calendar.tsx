// src/components/calendar/Calendar.tsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { useEvents } from "./hooks/useEvents";
import ShineBorder from "@/components/ui/shine-border";
import "./Calendar.css";

interface CalendarProps {
  onEventClick: (event: any) => void;
}

export const CalendarComponent: React.FC<CalendarProps> = ({
  onEventClick,
}) => {
  const { events, loading } = useEvents();
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);

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
              eventClassNames={(eventInfo) => {
                const colors = [
                  "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400",
                  "bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400",
                  "bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400",
                  "bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400",
                  "bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400",
                ];

                // Pick a random color for each event
                const colorIndex = Math.floor(Math.random() * colors.length);
                const colorClass = colors[colorIndex];

                console.log(
                  `Event: ${eventInfo.event.title}, Color: ${colorClass}`
                );

                return [
                  "px-3 py-2 rounded-lg font-medium shadow-lg backdrop-blur-sm",
                  "hover:scale-[1.02] hover:-translate-y-[2px] hover:shadow-xl",
                  "transition-all duration-300 border border-white/20",
                  colorClass,
                ];
              }}
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
                const formattedTime = eventInfo.event.start?.toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                return (
                  <div className="text-center text-white font-mono text-sm">
                    {formattedTime}
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
