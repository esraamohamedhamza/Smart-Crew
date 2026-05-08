import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import { tooltipProps } from "../shared/chartTooltip";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Plane, Clock, DollarSign, Download, Calendar, Loader2 } from "lucide-react";

// Pop colors from secondary palette: Vision Blue, Wadi, Futuristic Green, Sunrise
const FLEET_BY_RANGE: Record<RangeKey, { name: string; value: number; color: string }[]> = {
  "1M":  [
    { name: "Boeing 787",  value: 38, color: "#80CBEC" }, // Vision Blue
    { name: "Airbus A350", value: 30, color: "#7ED487" }, // Momentum Green
    { name: "Boeing 777",  value: 20, color: "#FEBA86" }, // Dune
    { name: "Airbus A380", value: 12, color: "#B6DFFF" }, // Wadi
  ],
  "3M":  [
    { name: "Boeing 787",  value: 36, color: "#80CBEC" },
    { name: "Airbus A350", value: 29, color: "#7ED487" },
    { name: "Boeing 777",  value: 21, color: "#FEBA86" },
    { name: "Airbus A380", value: 14, color: "#B6DFFF" },
  ],
  "6M":  [
    { name: "Boeing 787",  value: 35, color: "#80CBEC" },
    { name: "Airbus A350", value: 28, color: "#7ED487" },
    { name: "Boeing 777",  value: 22, color: "#FEBA86" },
    { name: "Airbus A380", value: 15, color: "#B6DFFF" },
  ],
  "1Y":  [
    { name: "Boeing 787",  value: 32, color: "#80CBEC" },
    { name: "Airbus A350", value: 27, color: "#7ED487" },
    { name: "Boeing 777",  value: 24, color: "#FEBA86" },
    { name: "Airbus A380", value: 17, color: "#B6DFFF" },
  ],
  "YTD": [
    { name: "Boeing 787",  value: 34, color: "#80CBEC" },
    { name: "Airbus A350", value: 28, color: "#7ED487" },
    { name: "Boeing 777",  value: 23, color: "#FEBA86" },
    { name: "Airbus A380", value: 15, color: "#B6DFFF" },
  ],
};

type RangeKey = "1M" | "3M" | "6M" | "1Y" | "YTD";

const RANGE_LABEL: Record<RangeKey, string> = {
  "1M": "Last Month",
  "3M": "Last 3 Months",
  "6M": "Last 6 Months",
  "1Y": "Last 12 Months",
  "YTD": "Year to Date",
};

const PERFORMANCE_DATASETS: Record<RangeKey, { month: string; onTime: number; delayed: number; cancelled: number }[]> = {
  "1M": [
    { month: "Wk 1", onTime: 95, delayed: 4, cancelled: 1 },
    { month: "Wk 2", onTime: 96, delayed: 3, cancelled: 1 },
    { month: "Wk 3", onTime: 94, delayed: 5, cancelled: 1 },
    { month: "Wk 4", onTime: 97, delayed: 3, cancelled: 0 },
  ],
  "3M": [
    { month: "Apr", onTime: 89, delayed: 9, cancelled: 2 },
    { month: "May", onTime: 96, delayed: 3, cancelled: 1 },
    { month: "Jun", onTime: 98, delayed: 2, cancelled: 0 },
  ],
  "6M": [
    { month: "Jan", onTime: 87, delayed: 11, cancelled: 2 },
    { month: "Feb", onTime: 92, delayed: 6, cancelled: 2 },
    { month: "Mar", onTime: 95, delayed: 4, cancelled: 1 },
    { month: "Apr", onTime: 89, delayed: 9, cancelled: 2 },
    { month: "May", onTime: 96, delayed: 3, cancelled: 1 },
    { month: "Jun", onTime: 98, delayed: 2, cancelled: 0 },
  ],
  "1Y": [
    { month: "Jul", onTime: 84, delayed: 13, cancelled: 3 },
    { month: "Aug", onTime: 86, delayed: 12, cancelled: 2 },
    { month: "Sep", onTime: 88, delayed: 10, cancelled: 2 },
    { month: "Oct", onTime: 90, delayed: 9,  cancelled: 1 },
    { month: "Nov", onTime: 92, delayed: 7,  cancelled: 1 },
    { month: "Dec", onTime: 91, delayed: 8,  cancelled: 1 },
    { month: "Jan", onTime: 87, delayed: 11, cancelled: 2 },
    { month: "Feb", onTime: 92, delayed: 6,  cancelled: 2 },
    { month: "Mar", onTime: 95, delayed: 4,  cancelled: 1 },
    { month: "Apr", onTime: 89, delayed: 9,  cancelled: 2 },
    { month: "May", onTime: 96, delayed: 3,  cancelled: 1 },
    { month: "Jun", onTime: 98, delayed: 2,  cancelled: 0 },
  ],
  "YTD": [
    { month: "Jan", onTime: 87, delayed: 11, cancelled: 2 },
    { month: "Feb", onTime: 92, delayed: 6,  cancelled: 2 },
    { month: "Mar", onTime: 95, delayed: 4,  cancelled: 1 },
    { month: "Apr", onTime: 89, delayed: 9,  cancelled: 2 },
  ],
};

const CREW_EFFICIENCY_BY_RANGE: Record<RangeKey, { hour: string; efficiency: number }[]> = {
  "1M":  [{hour:"00:00",efficiency:80},{hour:"04:00",efficiency:74},{hour:"08:00",efficiency:90},{hour:"12:00",efficiency:96},{hour:"16:00",efficiency:93},{hour:"20:00",efficiency:86}],
  "3M":  [{hour:"00:00",efficiency:78},{hour:"04:00",efficiency:73},{hour:"08:00",efficiency:89},{hour:"12:00",efficiency:95},{hour:"16:00",efficiency:92},{hour:"20:00",efficiency:85}],
  "6M":  [{hour:"00:00",efficiency:78},{hour:"04:00",efficiency:72},{hour:"08:00",efficiency:88},{hour:"12:00",efficiency:95},{hour:"16:00",efficiency:92},{hour:"20:00",efficiency:85}],
  "1Y":  [{hour:"00:00",efficiency:75},{hour:"04:00",efficiency:70},{hour:"08:00",efficiency:85},{hour:"12:00",efficiency:92},{hour:"16:00",efficiency:89},{hour:"20:00",efficiency:82}],
  "YTD": [{hour:"00:00",efficiency:77},{hour:"04:00",efficiency:71},{hour:"08:00",efficiency:87},{hour:"12:00",efficiency:94},{hour:"16:00",efficiency:91},{hour:"20:00",efficiency:84}],
};

export function AdvancedAnalytics() {
  const [range, setRange] = useState<RangeKey>("6M");
  const [refreshing, setRefreshing] = useState(false);
  const performanceData = useMemo(() => PERFORMANCE_DATASETS[range], [range]);
  const fleetDistribution = useMemo(() => FLEET_BY_RANGE[range], [range]);
  const crewEfficiency = useMemo(() => CREW_EFFICIENCY_BY_RANGE[range], [range]);

  // Trigger a brief refresh state on every range change.
  useEffect(() => {
    setRefreshing(true);
    const t = setTimeout(() => setRefreshing(false), 550);
    return () => clearTimeout(t);
  }, [range]);

  // Simulated KPIs that respond to the range selection
  const kpis = useMemo(() => {
    const sum = performanceData.reduce((acc, d) => acc + d.onTime, 0);
    const onTime = (sum / performanceData.length).toFixed(1);
    return [
      { label: "On-Time Rate",       value: `${onTime}%`, icon: Clock,        change: range === "1M" ? "+2%" : "+5%" },
      { label: "Fleet Utilization",  value: range === "1Y" ? "91.7%" : "94.2%", icon: Plane,        change: "+6%" },
      { label: "Crew Utilization",   value: range === "YTD" ? "90%" : "92%",    icon: Users,        change: "+7%" },
      { label: "Efficiency Score",   value: range === "1M" ? "96.1%" : "94.5%", icon: TrendingUp,   change: "+8%" },
      { label: "Period Revenue",     value: range === "1Y" ? "$32.4M" : "$2.8M", icon: DollarSign,  change: "+8.3%" },
    ];
  }, [performanceData, range]);

  // Date range state — drives the global refresh
  const today = new Date();
  const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(fmt(sixMonthsAgo));
  const [endDate, setEndDate] = useState(fmt(today));

  const rangeFromDates = useMemo<RangeKey>(() => {
    const ms = new Date(endDate).getTime() - new Date(startDate).getTime();
    const days = Math.max(0, ms / 86400000);
    if (days <= 31) return "1M";
    if (days <= 95) return "3M";
    if (days <= 200) return "6M";
    return "1Y";
  }, [startDate, endDate]);

  useEffect(() => { setRange(rangeFromDates); }, [rangeFromDates]);

  const [isDark, setIsDark] = useState(typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  const segStroke = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.35)";

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1>Advanced Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">Operational performance insights</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/60 border border-border">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
              aria-label="Start date"
            />
            <span className="text-muted-foreground text-xs">→</span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={fmt(today)}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
              aria-label="End date"
            />
          </div>

          {refreshing && (
            <div className="flex items-center gap-2 text-xs text-accent">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Refreshing…
            </div>
          )}

          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((stat, i) => (
          <GlassCard key={i} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5 text-accent" />
              <div className="text-accent text-sm">{stat.change}</div>
            </div>
            <div className="font-semibold" style={{ fontSize: '24px' }}>{stat.value}</div>
            <div className="text-muted-foreground mt-1 text-sm">{stat.label}</div>
          </GlassCard>
        ))}
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-300 ${refreshing ? "opacity-40" : "opacity-100"}`}>
        <GlassCard key={`fleet-${range}`} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Fleet Distribution</h3>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{RANGE_LABEL[range]}</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={fleetDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" nameKey="name" isAnimationActive={false}>
                {fleetDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke={segStroke} strokeWidth={1.5} />
                ))}
              </Pie>
              <Tooltip {...tooltipProps} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {fleetDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">{item.name} · {item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard key={`crew-${range}`} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Crew Efficiency by Time</h3>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{RANGE_LABEL[range]}</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={crewEfficiency} margin={{ left: 0, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="hour" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip {...tooltipProps} />
              <Line type="monotone" dataKey="efficiency" stroke="#80CBEC" strokeWidth={3} dot={{ fill: "#7ED487", r: 5 }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard className={`p-6 transition-opacity duration-300 ${refreshing ? "opacity-40" : "opacity-100"}`}>
        <div className="flex items-center justify-between mb-6">
          <h3>Flight Performance — {RANGE_LABEL[range]}</h3>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Real-time simulation</span>
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={performanceData} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
            <YAxis stroke="currentColor" opacity={0.5} domain={[0, 100]} />
            <Tooltip {...tooltipProps} />
            <Legend />
            <Bar dataKey="onTime"    fill="#7ED487" stroke={segStroke} strokeWidth={1.2} radius={[6, 6, 0, 0]} name="On Time %"   isAnimationActive={false} />
            <Bar dataKey="delayed"   fill="#FEBA86" stroke={segStroke} strokeWidth={1.2} radius={[6, 6, 0, 0]} name="Delayed %"   isAnimationActive={false} />
            <Bar dataKey="cancelled" fill="#E77F00" stroke={segStroke} strokeWidth={1.2} radius={[6, 6, 0, 0]} name="Cancelled %" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
