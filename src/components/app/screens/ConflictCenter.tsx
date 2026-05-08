import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

const conflicts = [
  {
    id: "CF-2401",
    type: "Crew Shortage",
    flight: "AA-1523",
    severity: "High",
    status: "Auto-Resolved",
    time: "2m ago",
    aiActions: 1,
  },
  {
    id: "CF-2402",
    type: "Schedule Overlap",
    flight: "DL-8847",
    severity: "Medium",
    status: "Pending",
    time: "15m ago",
    aiActions: 3,
  },
  {
    id: "CF-2403",
    type: "Maintenance Delay",
    flight: "UA-4521",
    severity: "Low",
    status: "Review Required",
    time: "1h ago",
    aiActions: 2,
  },
];

export function ConflictCenter() {
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1>Conflict Resolution Center</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered conflict detection and resolution
          </p>
        </div>
        <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
          Run AI Scan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span className="text-muted-foreground">Active</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>3</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Resolved Today</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>12</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Avg Resolution</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>8m</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">AI Success Rate</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>96%</div>
        </GlassCard>
      </div>

      <div className="space-y-4">
        <h3>Active Conflicts</h3>
        {conflicts.map((conflict) => (
          <GlassCard
            key={conflict.id}
            hover
            className="p-6 cursor-pointer"
            onClick={() => navigate({ to: `/conflict/${conflict.id}/scenarios` as never })}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="font-semibold" style={{ fontSize: '18px' }}>{conflict.id}</div>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    conflict.severity === "High"
                      ? "bg-destructive/10 text-destructive"
                      : conflict.severity === "Medium"
                      ? "bg-muted text-muted-foreground"
                      : "bg-accent/10 text-accent"
                  }`}>
                    {conflict.severity} Severity
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    conflict.status === "Auto-Resolved"
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {conflict.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Type</div>
                    <div className="font-medium">{conflict.type}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Flight</div>
                    <div className="font-medium">{conflict.flight}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">AI Scenarios</div>
                    <div className="font-medium">{conflict.aiActions} Generated</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Time</div>
                    <div className="font-medium">{conflict.time}</div>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate({ to: `/conflict/${conflict.id}/scenarios` as never });
                }}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                View Scenarios
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
