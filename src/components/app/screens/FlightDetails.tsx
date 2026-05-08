import { useParams, useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { BackButton } from "../shared/BackButton";
import { tooltipProps } from "../shared/chartTooltip";
import { Plane, MapPin, Clock, Users, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getFlight } from "@/data/operations";

export function FlightDetails() {
  const { id } = useParams({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const flight = getFlight(id);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <BackButton />

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1>Flight {flight.id}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{flight.aircraft} • {flight.route}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate({ to: "/flight/$id/history", params: { id: flight.id } })}
            className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
          >
            View History
          </button>
          <button
            onClick={() => navigate({ to: `/flight/${flight.id}/risk` as never })}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Risk Analysis
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Plane className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Status</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '20px' }}>{flight.status}</div>
          <div className={`text-sm mt-1 ${flight.status === "Delayed" ? "text-destructive" : "text-accent"}`}>
            {flight.statusNote}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">ETA</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '20px' }}>{flight.eta}</div>
          <div className="text-sm text-muted-foreground mt-1">{flight.etaSubtitle}</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Altitude</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '20px' }}>{flight.altitudeFt.toLocaleString()} ft</div>
          <div className="text-sm text-muted-foreground mt-1">{flight.altitudeNote}</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Speed</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '20px' }}>{flight.speedMph} mph</div>
          <div className="text-sm text-muted-foreground mt-1">Ground Speed</div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="mb-4">Altitude Profile</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={flight.altitudeProfile}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="time" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip {...tooltipProps} />
              <Line
                type="monotone"
                dataKey="altitude"
                stroke="#006937"
                strokeWidth={3}
                dot={{ fill: "#006937", r: 5 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-6">Crew Information</h3>
          <div className="space-y-4">
            {[flight.captain, flight.firstOfficer].map((member) => (
              <div key={member.crewId + member.name} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role} • {member.experience}</div>
                  </div>
                </div>
                {member.crewId !== "—" && (
                  <button
                    onClick={() => navigate({ to: `/crew/assign/${member.crewId}` as never })}
                    className="px-3 py-1 rounded bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm"
                  >
                    View
                  </button>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
