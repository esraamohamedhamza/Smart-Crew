import { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { BackButton } from "../shared/BackButton";
import { Users, Plane, CheckCircle, Clock, TrendingUp, MapPin } from "lucide-react";
import { getCrew } from "@/data/operations";

export function CrewAssignment() {
  const { crewId } = useParams({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const crew = getCrew(crewId);

  const handleAssign = () => {
    setConfirmed(true);
    setTimeout(() => navigate({ to: "/crew/shift/success" }), 1500);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <BackButton />

        <div className="text-center">
          <h1>Confirm Crew Assignment</h1>
          <p className="text-muted-foreground mt-2 text-sm">Review assignment details before confirming</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3>Crew Member</h3>
                <p className="text-muted-foreground text-sm">{crew.name}</p>
              </div>
            </div>
            <div className="space-y-3">
              <Row label="ID"          value={crew.id} />
              <Row label="Role"        value={crew.role} />
              <Row label="Experience"  value={crew.experience} />
              <Row label="Match Score" value={`${crew.matchScore}%`} valueClass="text-accent" />
              <Row label="On-Time Rate" value={`${crew.onTimeRate}%`} valueClass="text-accent" />
              <Row label="Base"        value={crew.baseAirport} />
              <Row label="Total Flights" value={crew.flights.toLocaleString()} />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Plane className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3>Flight Details</h3>
                <p className="text-muted-foreground text-sm">AA-1523</p>
              </div>
            </div>
            <div className="space-y-3">
              <Row label="Route"     value="JFK → LHR" />
              <Row label="Aircraft"  value="Boeing 787-9" />
              <Row label="Departure" value="08:45" />
              <Row label="Duration"  value="7h 15m" />
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-6">
          <h3 className="mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {crew.certifications.map((c) => (
              <span key={c} className="px-3 py-1 rounded text-sm bg-secondary border border-border">
                {c}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-4">Pre-Assignment Checks</h3>
          <div className="space-y-3">
            {[
              `Aircraft certification verified (Boeing 787-9)`,
              `Rest period compliance confirmed (${crew.restCompliantHours}+ hours)`,
              `Medical certification current (expires 2027)`,
              `Route familiarization completed`,
              `No schedule conflicts detected`,
            ].map((check, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">{check}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Stat icon={Clock}       label="Assignment Time" value="Immediate" />
          <Stat icon={TrendingUp}  label="Success Rate"   value={`${crew.matchScore}%`} />
          <Stat icon={MapPin}      label="Crew Base"      value={crew.baseAirport} />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAssign}
            disabled={confirmed}
            className={`flex-1 px-6 py-3 rounded-lg transition-all ${
              confirmed ? 'bg-accent/50 text-accent-foreground cursor-not-allowed' : 'bg-accent text-accent-foreground hover:opacity-90'
            }`}
          >
            {confirmed ? 'Assigning Crew...' : 'Confirm Assignment'}
          </button>
          <button
            onClick={() => navigate({ to: "/crew/match" })}
            disabled={confirmed}
            className="px-6 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-accent" />
        <span className="text-muted-foreground">{label}</span>
      </div>
      <div className="font-semibold" style={{ fontSize: '20px' }}>{value}</div>
    </GlassCard>
  );
}
