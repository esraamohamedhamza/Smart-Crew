import { useParams } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { BackButton } from "../shared/BackButton";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { tooltipProps } from "../shared/chartTooltip";

const kpiDatasets: Record<string, any> = {
  flights: {
    title: "Active Flights",
    current: "147",
    target: "150",
    trend: "+12%",
    data: [
      { date: "Mon", value: 132, target: 145 },
      { date: "Tue", value: 138, target: 145 },
      { date: "Wed", value: 141, target: 148 },
      { date: "Thu", value: 145, target: 148 },
      { date: "Fri", value: 147, target: 150 },
      { date: "Sat", value: 149, target: 150 },
      { date: "Sun", value: 147, target: 150 },
    ],
  },
  crew: {
    title: "Crew Utilization",
    current: "94.2%",
    target: "95%",
    trend: "+5.3%",
    data: [
      { date: "Mon", value: 89, target: 95 },
      { date: "Tue", value: 90, target: 95 },
      { date: "Wed", value: 92, target: 95 },
      { date: "Thu", value: 93, target: 95 },
      { date: "Fri", value: 94.2, target: 95 },
      { date: "Sat", value: 94.5, target: 95 },
      { date: "Sun", value: 94.2, target: 95 },
    ],
  },
  delay: {
    title: "Average Delay Time",
    current: "12 min",
    target: "10 min",
    trend: "-23%",
    data: [
      { date: "Mon", value: 18, target: 10 },
      { date: "Tue", value: 16, target: 10 },
      { date: "Wed", value: 14, target: 10 },
      { date: "Thu", value: 13, target: 10 },
      { date: "Fri", value: 12, target: 10 },
      { date: "Sat", value: 11, target: 10 },
      { date: "Sun", value: 12, target: 10 },
    ],
  },
  conflicts: {
    title: "Active Conflicts",
    current: "3",
    target: "0",
    trend: "-67%",
    data: [
      { date: "Mon", value: 9, target: 0 },
      { date: "Tue", value: 7, target: 0 },
      { date: "Wed", value: 5, target: 0 },
      { date: "Thu", value: 4, target: 0 },
      { date: "Fri", value: 3, target: 0 },
      { date: "Sat", value: 2, target: 0 },
      { date: "Sun", value: 3, target: 0 },
    ],
  },
};

export function KPIDetails() {
  const { metric } = useParams({ strict: false }) as Record<string, string>;
  const kpi = kpiDatasets[metric || "flights"];

  if (!kpi) {
    return <div>KPI not found</div>;
  }

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <BackButton />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="text-muted-foreground mb-2">Current Value</div>
          <div className="font-semibold" style={{ fontSize: '36px', lineHeight: '1' }}>{kpi.current}</div>
          <div className="flex items-center gap-2 mt-2 text-accent">
            <TrendingUp className="w-4 h-4" />
            <span>{kpi.trend}</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-muted-foreground mb-2">Target</div>
          <div className="font-semibold" style={{ fontSize: '36px', lineHeight: '1' }}>{kpi.target}</div>
          <div className="mt-2 text-muted-foreground">Weekly Goal</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-muted-foreground mb-2">Performance</div>
          <div className="font-semibold" style={{ fontSize: '36px', lineHeight: '1' }}>98%</div>
          <div className="mt-2 text-accent">On Track</div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-6">{kpi.title} - 7 Day Trend</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={kpi.data}>
            <defs>
              <linearGradient id="kpiDetailGradient" x1="0" y1="0" x2="0" y2="1">
              <stop key="kpi-stop-0" offset="0%" stopColor="#006937" stopOpacity={0.3} />
              <stop key="kpi-stop-100" offset="100%" stopColor="#006937" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} id="kpi-detail-grid" />
            <XAxis dataKey="date" stroke="currentColor" opacity={0.5} id="kpi-detail-xaxis" />
            <YAxis stroke="currentColor" opacity={0.5} id="kpi-detail-yaxis" />
            <Tooltip {...tooltipProps} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#006937"
              strokeWidth={3}
              fill="url(#kpiDetailGradient)"
              id="kpi-detail-area"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#5B6470"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              id="kpi-detail-line"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
