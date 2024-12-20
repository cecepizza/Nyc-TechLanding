// src/components/calendar/EventDetailsDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, ExternalLink, User, Tag } from "lucide-react";
import { CalendarEvent } from "./types";

interface EventDetailsDialogProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-neutral-200/80 hover:text-neutral-200 transition-colors">
    <span className="text-cyan-400">{icon}</span>
    <span className="font-mono">{text}</span>
  </div>
);

export const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  event,
  onClose,
}) => {
  if (!event) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] border border-neutral-800 text-neutral-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {event.extendedProps.coverImage && (
            <div className="relative group">
              <img
                src={event.extendedProps.coverImage}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg border border-neutral-800 transition-all duration-300 group-hover:border-cyan-400/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-60" />
            </div>
          )}

          <div className="space-y-4 p-1">
            <InfoRow
              icon={<Calendar className="w-5 h-5" />}
              text={formatDate(event.start)}
            />
            <InfoRow
              icon={<Clock className="w-5 h-5" />}
              text={formatTime(event.start)}
            />
            <InfoRow
              icon={<User className="w-5 h-5" />}
              text={event.extendedProps.organizer}
            />
            <InfoRow
              icon={<MapPin className="w-5 h-5" />}
              text={event.extendedProps.location}
            />
            <InfoRow
              icon={<Tag className="w-5 h-5" />}
              text={event.extendedProps.eventType}
            />
          </div>

          {event.extendedProps.url && (
            <a
              href={event.extendedProps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 
                       bg-cyan-500 hover:bg-cyan-600 text-black font-medium
                       rounded-md transition-all duration-200 hover:translate-y-[-2px]
                       hover:shadow-lg hover:shadow-cyan-500/25"
            >
              View Event <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
