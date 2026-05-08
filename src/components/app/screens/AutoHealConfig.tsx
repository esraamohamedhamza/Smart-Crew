import { useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import { BackButton } from "../shared/BackButton";
import { Zap, CheckCircle } from "lucide-react";

const autoHealMetrics = [
  { label: "Total Auto-Resolutions", value: "147", change: "+23%" },
  { label: "Success Rate", value: "96%", change: "+5%" },
  { label: "Avg Resolution Time", value: "8m", change: "-34%" },
  { label: "Cost Savings", value: "$48.2K", change: "+18%" },
];

const recentAutoHeals = [
  {
    id: "CF-2401",
    type: "Crew Shortage",
    resolution: "Backup crew assigned from standby pool",
    time: "2m ago",
    cost: "$2,400",
  },
  {
    id: "CF-2398",
    type: "Minor Delay",
    resolution: "Gate reassignment to optimize turnaround",
    time: "1h ago",
    cost: "$800",
  },
  {
    id: "CF-2395",
    type: "Schedule Conflict",
    resolution: "Crew rotation adjusted automatically",
    time: "3h ago",
    cost: "$1,200",
  },
];

export function AutoHealConfig() {
  const [autoHealEnabled, setAutoHealEnabled] = useState(true);
  const [autoResolveMinor, setAutoResolveMinor] = useState(true);
  const [autoNotify, setAutoNotify] = useState(true);
  const [costThreshold, setCostThreshold] = useState(5000);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <BackButton />

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-accent" />
          <h1>AI Auto-Heal Configuration</h1>
        </div>
        <p className="text-muted-foreground">
          Configure automatic conflict resolution and system behavior
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {autoHealMetrics.map((metric, i) => (
          <GlassCard key={i} className="p-5">
            <div className="text-muted-foreground mb-1">{metric.label}</div>
            <div className="flex items-baseline gap-2">
              <div className="font-semibold" style={{ fontSize: '24px' }}>{metric.value}</div>
              <span className="text-sm text-accent">{metric.change}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-6">Auto-Heal Settings</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <div className="flex-1">
              <h4 className="mb-1">Enable AI Auto-Heal</h4>
              <p className="text-muted-foreground">
                Automatically resolve conflicts without manual intervention
              </p>
            </div>
            <button
              onClick={() => setAutoHealEnabled(!autoHealEnabled)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                autoHealEnabled ? 'bg-accent' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  autoHealEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <div className="flex-1">
              <h4 className="mb-1">Auto-Resolve Minor Conflicts</h4>
              <p className="text-muted-foreground">
                Automatically handle low-risk conflicts without approval
              </p>
            </div>
            <button
              onClick={() => setAutoResolveMinor(!autoResolveMinor)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                autoResolveMinor ? 'bg-accent' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  autoResolveMinor ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <div className="flex-1">
              <h4 className="mb-1">Notification on Auto-Heal</h4>
              <p className="text-muted-foreground">
                Send alerts when conflicts are automatically resolved
              </p>
            </div>
            <button
              onClick={() => setAutoNotify(!autoNotify)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                autoNotify ? 'bg-accent' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  autoNotify ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="p-4 rounded-lg bg-secondary/30">
            <h4 className="mb-4">Cost Approval Threshold</h4>
            <p className="text-muted-foreground mb-4">
              Auto-resolve only if cost is below: ${costThreshold.toLocaleString()}
            </p>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={costThreshold}
              onChange={(e) => setCostThreshold(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>$1,000</span>
              <span>$10,000</span>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="mb-6">Recent Auto-Heal Activity</h3>
        <div className="space-y-3">
          {recentAutoHeals.map((heal) => (
            <div
              key={heal.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-4 flex-1">
                <CheckCircle className="w-5 h-5 text-accent" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{heal.id}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{heal.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{heal.resolution}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{heal.cost}</div>
                <div className="text-xs text-muted-foreground">{heal.time}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
