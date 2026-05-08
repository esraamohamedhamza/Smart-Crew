import { useParams, useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { PassengerImpactCard } from "../shared/PassengerImpactCard";
import { BackButton } from "../shared/BackButton";
import { tooltipProps } from "../shared/chartTooltip";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const riskFactors = [
  { factor: "Crew",     score: 38 },
  { factor: "Weather",  score: 22 },
  { factor: "Tech",     score: 30 },
  { factor: "Traffic",  score: 45 },
  { factor: "Schedule", score: 28 },
  { factor: "Fuel",     score: 18 },
];

const riskTrend = [
  { time: "T-6h", risk: 58 },
  { time: "T-5h", risk: 52 },
  { time: "T-4h", risk: 47 },
  { time: "T-3h", risk: 44 },
  { time: "T-2h", risk: 39 },
  { time: "T-1h", risk: 36 },
  { time: "Now",  risk: 35 },
];

const recommendations = [
  { priority: "High",   action: "Assign backup crew from standby pool", impact: "Resolves crew shortage immediately",            cost: -2400,  time: 15  },
  { priority: "Medium", action: "Delay departure by 30 minutes",        impact: "Allows current crew to complete rest period",   cost: -4800,  time: 30  },
  { priority: "Low",    action: "Cancel and reschedule flight",         impact: "Full passenger rebooking required",             cost: -18500, time: 240 },
];

const fmtMoney = (n: number) => `${n >= 0 ? "+" : "-"} $${Math.abs(n).toLocaleString()}`;
const fmtTime  = (n: number) => `${n >= 0 ? "-" : "+"} ${Math.abs(n)} min`; // delay = operational loss => red minus

export function AIRiskPanel() {
  const { id } = useParams({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <BackButton />

      <div>
        <h1>AI Risk Analysis — Flight {id}</h1>
        <p className="text-muted-foreground mt-1 text-sm">Real-time risk assessment & AI recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="text-muted-foreground mb-2 text-sm">Overall Risk Score</div>
          <div className="font-semibold text-accent" style={{ fontSize: "36px" }}>35/100</div>
          <div className="mt-2 text-accent text-sm">Low Risk</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-muted-foreground mb-2 text-sm">Confidence Level</div>
          <div className="font-semibold" style={{ fontSize: "36px" }}>94%</div>
          <div className="mt-2 text-muted-foreground text-sm">AI Analysis Certainty</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-muted-foreground mb-3 text-sm">Risk Trend (last 6 hours)</div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={riskTrend} margin={{ left: -16, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="time" stroke="currentColor" opacity={0.6} fontSize={11} />
              <YAxis stroke="currentColor" opacity={0.6} fontSize={11} domain={[0, 100]} />
              <Tooltip {...tooltipProps} />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#006937"
                strokeWidth={2.5}
                dot={{ fill: "#6ABF4B", r: 3 }}
                activeDot={{ fill: "#006937", r: 5 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Risk Factor Breakdown</h3>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Multi-factor radar</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={riskFactors} outerRadius={100}>
              <PolarGrid stroke="currentColor" opacity={0.15} />
              <PolarAngleAxis dataKey="factor" tick={{ fill: "currentColor", fontSize: 12, opacity: 0.75 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "currentColor", fontSize: 10, opacity: 0.4 }} />
              <Radar
                name="Risk"
                dataKey="score"
                stroke="#6ABF4B"
                fill="#6ABF4B"
                fillOpacity={0.35}
                strokeWidth={2}
                isAnimationActive={false}
              />
              <Tooltip {...tooltipProps} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>

        <PassengerImpactCard />
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3>AI Recommendations (Ranked by Efficiency)</h3>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="p-5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
              onClick={() => navigate({ to: "/flight/$id", params: { id } } as never)}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        rec.priority === "High"
                          ? "bg-accent/10 text-accent"
                          : rec.priority === "Medium"
                          ? "bg-gold/40 text-gold-foreground"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {rec.priority} Priority
                    </span>
                  </div>
                  <h4>{rec.action}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">{rec.impact}</p>
                </div>
              </div>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-destructive" />
                  <span className="font-semibold text-destructive">{fmtMoney(rec.cost)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-destructive" />
                  <span className="text-destructive font-medium">{fmtTime(rec.time)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate({ to: "/flight/$id", params: { id } } as never)}
          className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          View Full Flight Details
        </button>
        <button
          onClick={() => navigate({ to: "/conflict/$id/scenarios", params: { id: "CF-2401" } } as never)}
          className="flex-1 px-6 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Generate Resolution Scenarios
        </button>
      </div>
    </div>
  );
}
