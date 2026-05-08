import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { BackButton } from "../shared/BackButton";
import { AlertTriangle, Clock, Users } from "lucide-react";

const delayedFlights = [
  {
    id: "AA-1523",
    route: "JFK → LHR",
    scheduled: "08:00",
    actual: "08:45",
    delay: 45,
    reason: "Crew Shortage",
    aiStatus: "Auto-Resolved",
    impact: "Low",
  },
  {
    id: "BA-2103",
    route: "LHR → DXB",
    scheduled: "15:45",
    actual: "16:30",
    delay: 45,
    reason: "Maintenance Check",
    aiStatus: "Monitoring",
    impact: "Medium",
  },
];

export function FlightDelays() {
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <BackButton />

      <div>
        <h1>Delayed Flights</h1>
        <p className="text-muted-foreground mt-1">
          All flights with delays and AI-powered risk analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span className="text-muted-foreground">Total Delayed</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>2 Flights</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Avg Delay</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>45 min</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">AI Resolved</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>1 Flight</div>
        </GlassCard>
      </div>

      <div className="space-y-4">
        {delayedFlights.map((flight) => (
          <GlassCard
            key={flight.id}
            hover
            className="p-6 cursor-pointer"
            onClick={() => navigate({ to: `/flight/${flight.id}/risk` as never })}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="font-semibold" style={{ fontSize: '20px' }}>{flight.id}</div>
                  <span className="px-2 py-0.5 rounded text-xs bg-destructive/10 text-destructive font-medium">
                    - {flight.delay} min
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    flight.aiStatus === "Auto-Resolved"
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {flight.aiStatus}
                  </span>
                </div>
                <div className="text-muted-foreground mb-3">{flight.route}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Scheduled</div>
                    <div className="font-medium">{flight.scheduled}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Actual</div>
                    <div className="font-medium">{flight.actual}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Reason</div>
                    <div className="font-medium">{flight.reason}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Impact</div>
                    <div className={`font-medium ${
                      flight.impact === "Low" ? "text-accent" : "text-destructive"
                    }`}>
                      {flight.impact}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate({ to: `/flight/${flight.id}/risk` as never });
                }}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                View AI Analysis
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
