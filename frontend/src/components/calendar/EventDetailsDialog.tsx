// src/components/calendar/EventDetailsDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, ExternalLink, User, Tag } from "lucide-react";
import { CalendarEvent } from "./types";

interface EventDetailsDialogProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-[#1E293B]">
    <span>{icon}</span>
    <span>{text}</span>
  </div>
);

export const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  event,
  onClose,
}) => {
  if (!event) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1E293B]">
            {event.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {event.extendedProps.coverImage && (
            <img
              src={event.extendedProps.coverImage}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          <div className="space-y-3">
            <InfoRow
              icon={<Calendar className="w-5 h-5 text-[#0EA5E9]" />}
              text={formatDate(event.start)}
            />
            <InfoRow
              icon={<Clock className="w-5 h-5 text-[#10B981]" />}
              text={formatTime(event.start)}
            />
            <InfoRow
              icon={<User className="w-5 h-5 text-[#F43F5E]" />}
              text={event.extendedProps.organizer}
            />
            <InfoRow
              icon={<MapPin className="w-5 h-5 text-[#64748B]" />}
              text={event.extendedProps.location}
            />
            <InfoRow
              icon={<Tag className="w-5 h-5 text-[#64748B]" />}
              text={event.extendedProps.eventType}
            />
          </div>

          {event.extendedProps.url && (
            <a
              href={event.extendedProps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 
                         bg-[#0EA5E9] text-white rounded-md font-medium
                         hover:bg-[#0284C7] transition-colors"
            >
              View Event <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
