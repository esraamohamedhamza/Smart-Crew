import { useParams } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { BackButton } from "../shared/BackButton";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { getFlightHistory, getFlight } from "@/data/operations";

export function FlightHistory() {
  const { id } = useParams({ strict: false }) as Record<string, string>;
  const flight = getFlight(id);
  const events = getFlightHistory(id);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <BackButton />

      <div>
        <h1>Flight History — {flight.id}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{flight.aircraft} • {flight.route}</p>
      </div>

      <GlassCard className="p-6">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {events.map((event, i) => (
              <div key={i} className="relative flex gap-4">
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    event.status === "success" ? "bg-accent/10" : "bg-destructive/10"
                  }`}>
                    {event.status === "success" ? (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm text-muted-foreground">{event.time}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      event.status === "success" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                    }`}>
                      {event.status === "success" ? "Completed" : "Action Taken"}
                    </span>
                  </div>
                  <h4>{event.event}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
