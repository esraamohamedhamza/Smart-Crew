import { useParams, useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { BackButton } from "../shared/BackButton";
import { tooltipProps } from "../shared/chartTooltip";
import { DollarSign, Clock, Users, TrendingUp, AlertCircle, UserX } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getScenario, getConflict } from "@/data/operations";

const impactMetrics = [
  { factor: "Crew Availability",     score: 88 },
  { factor: "Schedule Compliance",   score: 95 },
  { factor: "Cost Efficiency",       score: 91 },
  { factor: "Operational Impact",    score: 93 },
];

export function ScenarioMetrics() {
  const { id, scenarioId } = useParams({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const scenario = getScenario(scenarioId);
  const conflict = getConflict(id);

  const costBreakdown = [
    { category: "Crew",        amount: Math.round(Math.abs(scenario.cost) * 0.5) },
    { category: "Operations",  amount: Math.round(Math.abs(scenario.cost) * 0.33) },
    { category: "Fuel",        amount: Math.round(Math.abs(scenario.cost) * 0.17) },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <BackButton />

      <div>
        <h1>{scenario.name}</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Scenario {scenario.id} • Conflict {conflict.id} ({conflict.type})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-destructive" />
            <span className="text-muted-foreground">Total Cost</span>
          </div>
          <div className="font-semibold text-destructive" style={{ fontSize: '28px' }}>
            - ${Math.abs(scenario.cost).toLocaleString()}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-destructive" />
            <span className="text-muted-foreground">Delay</span>
          </div>
          {/* Loss => red minus */}
          <div className="font-semibold text-destructive" style={{ fontSize: '28px' }}>
            - {scenario.delayMinutes} min
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Success Rate</span>
          </div>
          <div className="font-semibold text-accent" style={{ fontSize: '28px' }}>{scenario.successRate}%</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Crew Impact</span>
          </div>
          <div className="font-semibold text-accent" style={{ fontSize: '28px' }}>
            {scenario.delayMinutes <= 15 ? "Low" : scenario.delayMinutes <= 30 ? "Medium" : "High"}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-4">Pax Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <UserX className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">Pax Affected</span>
            </div>
            <div className="font-semibold" style={{ fontSize: '32px' }}>287</div>
            <div className="text-sm text-muted-foreground mt-1">passengers impacted</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-muted-foreground text-sm">Connection Risks</span>
            </div>
            <div className="font-semibold text-destructive" style={{ fontSize: '32px' }}>12</div>
            <div className="text-sm text-muted-foreground mt-1">missed connections</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground text-sm">Rebooking Status</span>
            </div>
            <div className="font-semibold text-accent" style={{ fontSize: '32px' }}>98%</div>
            <div className="text-sm text-muted-foreground mt-1">auto-rebooked</div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="mb-6">Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={costBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="category" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="amount" fill="#006937" radius={[6, 6, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-6">Impact Assessment</h3>
          <div className="space-y-4">
            {impactMetrics.map((metric) => (
              <div key={metric.factor}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">{metric.factor}</span>
                  <span className="text-accent">{metric.score}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${metric.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-4">Implementation Steps</h3>
        <div className="space-y-3">
          {scenario.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-accent text-sm">{i + 1}</span>
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="flex gap-4">
        <button
          onClick={() => navigate({ to: `/conflict/${id}/confirm` as never })}
          className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Approve & Execute
        </button>
        <button
          onClick={() => navigate({ to: `/conflict/${id}/scenarios` as never })}
          className="px-6 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Compare Other Scenarios
        </button>
      </div>
    </div>
  );
}
