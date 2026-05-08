import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

const timeSlots = ["00-06", "06-12", "12-18", "18-24"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const crewAvailability = [
  {
    id: "CR-1001",
    name: "Capt. Sarah Chen",
    availability: [
      ["available", "available", "available", "on-duty"],
      ["available", "available", "rest", "rest"],
      ["available", "available", "available", "available"],
      ["on-duty", "on-duty", "available", "available"],
      ["available", "available", "available", "available"],
      ["rest", "rest", "available", "available"],
      ["available", "available", "available", "rest"],
    ],
  },
  {
    id: "CR-1002",
    name: "Capt. Alex Rivera",
    availability: [
      ["on-duty", "on-duty", "available", "available"],
      ["available", "available", "available", "rest"],
      ["rest", "rest", "available", "available"],
      ["available", "available", "on-duty", "on-duty"],
      ["available", "available", "available", "available"],
      ["available", "available", "rest", "rest"],
      ["rest", "rest", "rest", "available"],
    ],
  },
  {
    id: "CR-1003",
    name: "Capt. Mike Torres",
    availability: [
      ["available", "rest", "rest", "available"],
      ["available", "available", "on-duty", "on-duty"],
      ["available", "available", "available", "rest"],
      ["rest", "available", "available", "available"],
      ["available", "available", "available", "on-duty"],
      ["on-duty", "available", "available", "rest"],
      ["available", "available", "available", "available"],
    ],
  },
];

const statusColors = {
  available: "bg-accent/20 border-accent/40 hover:bg-accent/30 dark:border-accent/70",
  "on-duty": "bg-muted border-border dark:bg-white/10 dark:border-white/30",
  rest: "bg-destructive/10 border-destructive/20 dark:border-destructive/60",
};

export function AvailabilityGrid() {
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-accent" />
            <h1>Crew Availability Grid</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time crew scheduling and availability
          </p>
        </div>
        <button
          onClick={() => navigate({ to: "/crew/match" })}
          className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Smart Match
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent/20 border-2 border-accent/40" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted border-2 border-border" />
          <span className="text-sm">On Duty</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive/10 border-2 border-destructive/20" />
          <span className="text-sm">Rest Period</span>
        </div>
      </div>

      <GlassCard className="p-6 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-2 mb-4 pb-4 border-b border-border">
            <div className="font-medium">Crew Member</div>
            {days.map((day) => (
              <div key={day} className="text-center font-medium text-sm">
                {day}
              </div>
            ))}
          </div>

          {crewAvailability.map((crew) => (
            <div key={crew.id} className="mb-6">
              <div className="mb-3">
                <div className="font-medium">{crew.name}</div>
                <div className="text-sm text-muted-foreground">{crew.id}</div>
              </div>
              <div className="space-y-2">
                {timeSlots.map((slot, slotIndex) => (
                  <div key={slot} className="grid grid-cols-8 gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      {slot}
                    </div>
                    {days.map((day, dayIndex) => {
                      const status = crew.availability[dayIndex][slotIndex];
                      return (
                        <div
                          key={`${day}-${slot}`}
                          className={`h-10 rounded border-2 transition-all cursor-pointer ${statusColors[status as keyof typeof statusColors]}`}
                          title={`${crew.name} - ${day} ${slot}: ${status}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Available Slots</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>64</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">On Duty</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>18</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-destructive" />
            <span className="text-muted-foreground">Rest Period</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>12</div>
        </GlassCard>
      </div>
    </div>
  );
}
