import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { useEvents } from "./hooks/useEvents";
import ShineBorder from "@/components/ui/shine-border";
import { Event } from "./types";

function getRandomColor() {
  const colors = [
    "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400",
    "bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400",
    "bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400",
    "bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400",
    "bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  console.log("Random Color Selected:", randomColor);
  return randomColor;
}

interface CalendarComponentProps {
  onEventClick: (event: Event) => void;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onEventClick,
}) => {
  const { events, loading } = useEvents();

  const handleEventClick = (clickInfo: { event: any }) => {
    const event: Event = {
      name: clickInfo.event.title,
      date: clickInfo.event.start.toLocaleDateString(),
      time: clickInfo.event.start.toLocaleTimeString(),
      organizer: clickInfo.event.extendedProps.organizer,
      location: clickInfo.event.extendedProps.location,
      url: clickInfo.event.extendedProps.url,
      cover_image_url: clickInfo.event.extendedProps.coverImage,
      event_type: clickInfo.event.extendedProps.eventType,
    };
    onEventClick(event);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isMobile = window.innerWidth < 768;

  return (
    <div>
      <ShineBorder
        borderRadius={isMobile ? 10 : 16}
        borderWidth={isMobile ? 10 : 10}
        duration={15}
        // color={["rgba(14, 165, 233, 0.3)", "rgba(99, 102, 241, 0.3)"]}
        className="w-full bg-transparent"
      >
        <Card className="bg-transparent border-none shadow-none overflow-hidden">
          <div className={`p-${isMobile ? 1 : 4}`}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: isMobile ? "" : "addEventButton",
              }}
              customButtons={{
                addEventButton: {
                  text: "Add Event",
                  click: () => window.open("https://tally.so/create", "_blank"),
                },
              }}
              events={events}
              eventClick={handleEventClick}
              height={isMobile ? "auto" : "600px"}
              contentHeight="auto"
              aspectRatio={isMobile ? 1.2 : 1.8}
              eventColor="#0EA5E9"
              eventTextColor="white"
              dayMaxEvents={isMobile ? 1 : 3}
              titleFormat={{ year: "numeric", month: "long" }}
              buttonText={{
                today: "Today",
                month: "Month",
              }}
              eventClassNames={(eventInfo) => [
                "px-3 py-2 rounded-lg font-medium shadow-lg backdrop-blur-sm",
                "transition-all duration-300 border border-white/20",
                getRandomColor(),
              ]}
            />
          </div>
        </Card>
      </ShineBorder>
    </div>
  );
};
