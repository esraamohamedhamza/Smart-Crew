import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { AlertTriangle, CheckCircle, ChevronRight, FileText } from "lucide-react";

const timelineFlights = [
  {
    id: "AA-1523",
    route: "JFK → LHR",
    scheduled: "08:00",
    actual: "08:45",
    status: "delayed",
    delay: 45,
    crew: "Resolved",
  },
  {
    id: "DL-8847",
    route: "LAX → NRT",
    scheduled: "10:30",
    actual: "10:30",
    status: "on-time",
    delay: 0,
    crew: "Conflict",
  },
  {
    id: "UA-4521",
    route: "ORD → SYD",
    scheduled: "13:00",
    actual: "13:00",
    status: "on-time",
    delay: 0,
    crew: "Full",
  },
  {
    id: "BA-2103",
    route: "LHR → DXB",
    scheduled: "15:45",
    actual: "16:30",
    status: "delayed",
    delay: 45,
    crew: "Standby",
  },
  {
    id: "EK-7734",
    route: "DXB → SFO",
    scheduled: "18:20",
    actual: "18:20",
    status: "on-time",
    delay: 0,
    crew: "Full",
  },
  {
    id: "QR-5521",
    route: "DOH → JFK",
    scheduled: "20:15",
    actual: "20:15",
    status: "on-time",
    delay: 0,
    crew: "Full",
  },
];

const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

export function GanttTimeline() {
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1>Flight Timeline</h1>
        <p className="text-muted-foreground mt-1">
          Gantt view of today's flight schedule
        </p>
      </div>

      <GlassCard className="p-6 overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-[160px_1fr_120px_24px] gap-4 mb-4 pb-4 border-b border-border">
            <div className="font-medium text-left">Flight</div>
            <div className="grid grid-cols-24 gap-0">
              {hours.map((hour, i) => (
                <div key={hour} className={`text-xs text-muted-foreground text-center ${i % 2 === 0 ? 'font-medium' : ''}`}>
                  {i % 2 === 0 ? hour.split(':')[0] + 'h' : ''}
                </div>
              ))}
            </div>
            <div className="font-medium text-left">Status</div>
            <div></div>
          </div>

          <div className="space-y-3">
            {timelineFlights.map((flight) => {
              const scheduledHour = parseInt(flight.scheduled.split(':')[0]);
              const scheduledMin = parseInt(flight.scheduled.split(':')[1]);
              const position = ((scheduledHour + scheduledMin / 60) / 24) * 100;

              return (
                <div
                  key={flight.id}
                  className="grid grid-cols-[160px_1fr_120px_24px] gap-4 items-center group cursor-pointer hover:bg-secondary/50 p-2 rounded-lg transition-colors"
                  onClick={() => navigate({ to: `/flight/${flight.id}` as never })}
                >
                  <div>
                    <div className="font-medium">{flight.id}</div>
                    <div className="text-xs text-muted-foreground">{flight.route}</div>
                  </div>

                  <div className="relative h-10 bg-secondary/30 rounded-lg overflow-hidden">
                    <div className="absolute inset-y-0 left-0 right-0 grid grid-cols-24 gap-0">
                      {hours.map((_, i) => (
                        <div key={i} className="border-r border-border/30 last:border-r-0" />
                      ))}
                    </div>
                    <div
                      className={`absolute top-1 bottom-1 rounded-lg flex items-center justify-center ${
                        flight.status === 'delayed'
                          ? 'bg-destructive/30 border-2 border-destructive'
                          : 'bg-accent/30 border-2 border-accent'
                      }`}
                      style={{
                        left: `${position}%`,
                        width: '6%',
                      }}
                    >
                      <span className="text-xs font-medium whitespace-nowrap">{flight.scheduled}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    {flight.status === 'delayed' ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-destructive font-medium">- {flight.delay} min</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm text-accent">On Time</span>
                      </>
                    )}
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">On Time</span>
          </div>
          <div className="font-semibold text-foreground" style={{ fontSize: '32px' }}>4 Flights</div>
        </GlassCard>

        <button
          onClick={() => navigate({ to: "/delayed" as never })}
          className="text-left p-6 bg-card rounded-lg border border-border hover:border-destructive/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="text-muted-foreground">Delayed Flights</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
          </div>
          <div className="font-semibold text-destructive" style={{ fontSize: '32px' }}>2 Flights</div>
          <div className="text-sm text-muted-foreground mt-2">View delayed flights</div>
        </button>

        <button
          onClick={() => navigate({ to: "/analytics" })}
          className="text-left p-6 bg-card rounded-lg border border-border hover:border-accent/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground">Flight Analytics</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
          </div>
          <div className="font-semibold text-accent" style={{ fontSize: '28px' }}>Analytics</div>
          <div className="text-sm text-muted-foreground mt-2">Open Advanced Analytics</div>
        </button>
      </div>
    </div>
  );
}
