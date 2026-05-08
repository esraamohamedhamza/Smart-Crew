import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  AlertTriangle,
  DollarSign,
  Percent,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { tooltipProps } from "../shared/chartTooltip";
import { useSegmentStroke } from "@/hooks/use-segment-stroke";

const kpiData = [
  {
    label: "Total Flights Today",
    value: "75",
    change: "+12%",
    positive: true,
    icon: TrendingUp,
  },
  {
    label: "Incident Reports",
    value: "3",
    change: "-67%",
    positive: true,
    icon: AlertTriangle,
  },
  {
    label: "Estimated Resolution Time",
    value: "12m",
    change: "-23%",
    positive: true,
    icon: Clock,
  },
  {
    label: "Efficiency",
    value: "92%",
    change: "+5%",
    positive: true,
    icon: Percent,
  },
];

const crewUtilizationData = [
  { name: "Assigned", value: 92, color: "#006937" },   // Royal Green
  { name: "Available", value: 8, color: "#6ABF4B" },   // Palm Green
];

const flightStatusData = [
  { name: "On-Time",   value: 95, color: "#006937" },  // Royal Green
  { name: "Delayed",   value: 4,  color: "#E77F00" },  // Sunrise
  { name: "Cancelled", value: 1,  color: "#7D1822" },  // Medjool
];

const conflictDistributionData = [
  { name: "Crew Shortage",    value: 33, count: 1, color: "#7D1822" }, // Medjool
  { name: "Schedule Overlap", value: 33, count: 1, color: "#E77F00" }, // Sunrise
  { name: "Maintenance",      value: 34, count: 1, color: "#002856" }, // Royal Blue
];

const financialImpact = [
  { label: "Projected Operational Loss", value: "- $50,000", positive: false },
  { label: "Time Saved (AI Auto-Heal)", value: "+ 2.5 hrs", positive: true },
  { label: "Cost Saved This Month", value: "+ $48,200", positive: true },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { segStroke, strokeWidth } = useSegmentStroke();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1>Main Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered operational overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <GlassCard
            key={i}
            className="p-5"
          >
            {kpi.label === "Efficiency" ? (
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative">
                  <svg width="112" height="112" className="transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      fill="none"
                      stroke="var(--secondary)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 48}`}
                      strokeDashoffset={`${2 * Math.PI * 48 * (1 - parseInt(kpi.value) / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-semibold text-accent" style={{ fontSize: '28px', lineHeight: '1' }}>{kpi.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">Efficiency</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-accent mt-3">
                  <TrendingUp className="w-4 h-4" />
                  {kpi.change}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <kpi.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${kpi.positive ? 'text-accent' : 'text-destructive'}`}>
                    {kpi.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {kpi.change}
                  </div>
                </div>
                <div className="font-semibold" style={{ fontSize: '26px', lineHeight: '1' }}>{kpi.value}</div>
                <div className="text-muted-foreground mt-2 text-sm">{kpi.label}</div>
              </>
            )}
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <h3 className="mb-6">Crew Utilization</h3>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={crewUtilizationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={false}
                  isAnimationActive={false}
                  id="dashboard-crew-pie"
                >
                  {crewUtilizationData.map((entry, index) => (
                    <Cell key={`dashboard-crew-cell-${index}`} fill={entry.color} stroke={segStroke} strokeWidth={strokeWidth} />
                  ))}
                </Pie>
                <Tooltip {...tooltipProps} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {crewUtilizationData.map((item, i) => (
              <div key={`crew-legend-${item.name}`} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-6">Flight Status</h3>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={flightStatusData} layout="vertical" margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} id="dashboard-status-grid" />
                <XAxis type="number" stroke="currentColor" opacity={0.5} id="dashboard-status-xaxis" />
                <YAxis dataKey="name" type="category" stroke="currentColor" opacity={0.5} width={80} id="dashboard-status-yaxis" />
                <Tooltip {...tooltipProps} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} label={false} isAnimationActive={false} id="dashboard-status-bar">
                  {flightStatusData.map((entry, index) => (
                    <Cell key={`dashboard-status-cell-${index}`} fill={entry.color} stroke={segStroke} strokeWidth={strokeWidth} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {flightStatusData.map((item, i) => (
              <div key={`flight-legend-${item.name}`} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-6">Conflict Distribution</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={conflictDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  label={false}
                  isAnimationActive={false}
                  id="dashboard-conflict-pie"
                >
                  {conflictDistributionData.map((entry, index) => (
                    <Cell key={`dashboard-conflict-cell-${index}`} fill={entry.color} stroke={segStroke} strokeWidth={strokeWidth} />
                  ))}
                </Pie>
                <Tooltip {...tooltipProps} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <div className="space-y-2">
              {conflictDistributionData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {financialImpact.map((item, i) => (
          <GlassCard key={i} className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">{item.label}</span>
            </div>
            <div
              className={`font-bold ${item.positive ? 'text-accent' : 'text-destructive'}`}
              style={{ fontSize: '28px', lineHeight: '1' }}
            >
              {item.value}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Recent Activity</h3>
          <button
            onClick={() => navigate({ to: "/conflicts" })}
            className="text-accent hover:underline text-sm"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {[
            {
              id: "CF-2401",
              type: "Crew Shortage",
              status: "Auto-Resolved",
              time: "14:30:04 08-05-2026",
            },
            {
              id: "CF-2402",
              type: "Schedule Overlap",
              status: "Pending",
              time: "14:17:22 08-05-2026",
            },
            {
              id: "CF-2403",
              type: "Maintenance Delay",
              status: "Review",
              time: "1h ago",
            },
          ].map((conflict) => (
            <div
              key={conflict.id}
              onClick={() => navigate({ to: `/conflict/${conflict.id}/scenarios` as never })}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <div>
                  <div className="font-medium">{conflict.id}</div>
                  <div className="text-sm text-muted-foreground">{conflict.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    conflict.status === "Auto-Resolved"
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {conflict.status}
                </span>
                <span className="text-sm text-muted-foreground">{conflict.time}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
