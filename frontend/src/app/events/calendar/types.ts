// src/components/calendar/types.ts

export interface Event {
  name: string;
  date: string;
  time?: string;
  duration?: string;
  location: string;
  organizer: string;
  url: string | null;
  cover_image_url: string | null;
  event_type: string;
  last_updated?: string;
}

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  extendedProps: {
    organizer: string;
    location: string;
    url: string | null;
    coverImage: string | null;
    eventType: string;
  };
  onEventClick: (event: Event) => void;
}
