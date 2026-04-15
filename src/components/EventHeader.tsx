import { useState, useRef, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ShareButton } from "@/components/ShareButton";

interface EventHeaderProps {
  title: string;
  date: string;
  location: string;
  description: string;
  photoCount: number;
  schedule: { time: string; title: string }[];
  coverUrl: string;
}

export function EventHeader({ title, date, location, description, photoCount, schedule, coverUrl }: EventHeaderProps) {
  const [scheduleExpanded, setScheduleExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [schedule]);

  return (
    <div className="bg-background">
      {/* Cover */}
      <div className="relative h-48 overflow-hidden sm:h-64 lg:h-80">
        <img
          src={coverUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-6 sm:px-6">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground">{description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {photoCount} 张照片
                </span>
              </div>
            </div>
            <ShareButton title={title} variant="outline" size="sm" className="ml-4 hidden sm:flex" />
          </div>

          {/* Schedule */}
          {schedule.length > 0 && (
            <>
              <Separator className="my-6" />
              <div>
                <button
                  className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  onClick={() => setScheduleExpanded(!scheduleExpanded)}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> 活动日程
                  </span>
                  {scheduleExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: scheduleExpanded ? `${contentHeight}px` : "0px", opacity: scheduleExpanded ? 1 : 0 }}
                >
                  <div ref={contentRef}>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {schedule.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2">
                          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {item.time}
                          </span>
                          <span className="text-sm text-accent-foreground">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
