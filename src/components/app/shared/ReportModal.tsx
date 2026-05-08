import { X, Download, TrendingUp, Clock, DollarSign } from "lucide-react";
import { GlassCard } from "./GlassCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { tooltipProps } from "./chartTooltip";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  flightId: string;
}

const performanceData = [
  { time: "08:00", efficiency: 92 },
  { time: "10:00", efficiency: 95 },
  { time: "12:00", efficiency: 89 },
  { time: "14:00", efficiency: 97 },
  { time: "16:00", efficiency: 94 },
];

const costData = [
  { category: "Fuel", amount: 24500 },
  { category: "Crew", amount: 8200 },
  { category: "Operations", amount: 5300 },
];

export function ReportModal({ isOpen, onClose, flightId }: ReportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2>Flight Report - {flightId}</h2>
              <p className="text-muted-foreground mt-1">
                Detailed analytics and performance metrics
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <GlassCard className="p-4 bg-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground text-sm">
                  Overall Efficiency
                </span>
              </div>
              <div className="font-bold text-accent" style={{ fontSize: '24px' }}>
                94%
              </div>
            </GlassCard>

            <GlassCard className="p-4 bg-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground text-sm">
                  Time Performance
                </span>
              </div>
              <div className="font-bold text-accent" style={{ fontSize: '24px' }}>
                On-Time
              </div>
            </GlassCard>

            <GlassCard className="p-4 bg-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground text-sm">
                  Total Cost
                </span>
              </div>
              <div className="font-bold" style={{ fontSize: '24px' }}>
                $38,000
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <GlassCard className="p-5 bg-secondary/30">
              <h4 className="mb-4">Performance Trend</h4>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData} margin={{ left: 0, right: 10 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="currentColor"
                      opacity={0.1}
                      id="report-perf-grid"
                    />
                    <XAxis
                      dataKey="time"
                      stroke="currentColor"
                      opacity={0.5}
                      id="report-perf-xaxis"
                    />
                    <YAxis stroke="currentColor" opacity={0.5} id="report-perf-yaxis" />
                    <Tooltip {...tooltipProps} />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#006937"
                      strokeWidth={3}
                      dot={{ fill: "#006937", r: 4 }}
                      isAnimationActive={false}
                      id="report-perf-line"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard className="p-5 bg-secondary/30">
              <h4 className="mb-4">Cost Breakdown</h4>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={costData} margin={{ left: 0, right: 10 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="currentColor"
                      opacity={0.1}
                      id="report-cost-grid"
                    />
                    <XAxis
                      dataKey="category"
                      stroke="currentColor"
                      opacity={0.5}
                      id="report-cost-xaxis"
                    />
                    <YAxis stroke="currentColor" opacity={0.5} id="report-cost-yaxis" />
                    <Tooltip {...tooltipProps} />
                    <Bar
                      dataKey="amount"
                      fill="#006937"
                      radius={[6, 6, 0, 0]}
                      isAnimationActive={false}
                      id="report-cost-bar"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-5 bg-secondary/30">
            <h4 className="mb-4">Key Insights</h4>
            <div className="space-y-3">
              {[
                "Flight operated at 94% efficiency, exceeding target by 2%",
                "Zero safety incidents reported during operation",
                "Fuel consumption optimized, saving $2,400 vs. baseline",
                "All crew certifications verified and up-to-date",
              ].map((insight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-accent/5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </GlassCard>
      </div>
    </div>
  );
}
