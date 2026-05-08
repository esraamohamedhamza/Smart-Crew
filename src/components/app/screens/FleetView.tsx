import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { MapPin, Clock, AlertCircle, CheckCircle, Filter } from "lucide-react";

type FleetStatus = "In-Flight" | "Ready" | "Standby" | "Maintenance";

const fleetData: Array<{
  id: string;
  aircraft: string;
  status: FleetStatus;
  route: string;
  eta: string;
  crew: string;
  health: number;
}> = [
  { id: "SV-1523", aircraft: "Boeing 787-9",  status: "In-Flight",  route: "JED → LHR", eta: "2h 15m",      crew: "Full",     health: 98 },
  { id: "SV-8847", aircraft: "Airbus A330-300", status: "Ready",     route: "RUH → DXB", eta: "Departs 1h",  crew: "Full",     health: 96 },
  { id: "SV-4521", aircraft: "Boeing 777-300ER", status: "Ready",   route: "JED → JFK", eta: "Departs 4h",  crew: "Full",     health: 97 },
  { id: "SV-2103", aircraft: "Airbus A321neo",  status: "Standby",   route: "Backup pool", eta: "On call",   crew: "Standby",  health: 100 },
  { id: "SV-7734", aircraft: "Boeing 787-10", status: "In-Flight",  route: "DMM → SFO", eta: "5h 30m",      crew: "Full",     health: 96 },
  { id: "SV-5521", aircraft: "Airbus A350-900", status: "In-Flight", route: "JED → CDG", eta: "3h 45m",      crew: "Full",     health: 99 },
  { id: "SV-6612", aircraft: "Boeing 777-300ER", status: "Maintenance", route: "Hangar 3", eta: "Scheduled 6h", crew: "—",     health: 87 },
  { id: "SV-3344", aircraft: "Airbus A320neo",  status: "Standby",   route: "Backup pool", eta: "On call",  crew: "Standby",  health: 100 },
  { id: "SV-9920", aircraft: "Boeing 787-9",   status: "Maintenance", route: "Hangar 1", eta: "Scheduled 12h", crew: "—",      health: 82 },
];

const STATUSES: Array<"All" | FleetStatus> = ["All", "In-Flight", "Ready", "Standby", "Maintenance"];

// Glassmorphism badges — translucent surface + colored ring + bold text.
// All four statuses share the same glass treatment for visual consistency.
const statusStyles: Record<FleetStatus, string> = {
  "In-Flight":   "bg-primary/10 text-primary border border-primary/30 backdrop-blur-md",
  "Ready":       "bg-info/10 text-info border border-info/30 backdrop-blur-md",
  "Standby":     "bg-[color:var(--sunrise)]/15 text-[color:var(--sunrise)] border border-[color:var(--sunrise)]/40 backdrop-blur-md dark:text-[color:var(--dune)] dark:border-[color:var(--dune)]/50",
  "Maintenance": "bg-destructive/10 text-destructive border border-destructive/30 backdrop-blur-md",
};

export function FleetView() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"All" | FleetStatus>("All");

  const filtered = useMemo(
    () => (filter === "All" ? fleetData : fleetData.filter((f) => f.status === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: fleetData.length };
    for (const s of ["In-Flight", "Ready", "Standby", "Maintenance"] as FleetStatus[]) {
      c[s] = fleetData.filter((f) => f.status === s).length;
    }
    return c;
  }, []);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1>Fleet Overview</h1>
        <p className="text-muted-foreground mt-1 text-sm">Real-time fleet &amp; backup availability</p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          Filter by status
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/60 border border-border">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === s
                  ? "bg-primary text-primary-foreground shadow-card-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
              <span className={`ml-2 text-xs ${filter === s ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{counts[s]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((flight) => (
          <GlassCard
            key={flight.id}
            hover
            className="p-5 cursor-pointer"
            onClick={() => navigate({ to: "/flight/$id", params: { id: flight.id } } as never)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-semibold" style={{ fontSize: "18px" }}>{flight.id}</div>
                <div className="text-muted-foreground text-sm">{flight.aircraft}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[flight.status]}`}>
                {flight.status}
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{flight.route}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{flight.eta}</span>
              </div>
              <div className="flex items-center gap-2">
                {flight.crew === "Full" ? (
                  <CheckCircle className="w-4 h-4 text-accent" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <span>Crew: {flight.crew}</span>
              </div>
            </div>
          </GlassCard>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full p-8 text-center text-muted-foreground">
            No aircraft match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
