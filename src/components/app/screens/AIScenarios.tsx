import { useParams, useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { BackButton } from "../shared/BackButton";
import { Sparkles, DollarSign, Clock, TrendingUp } from "lucide-react";
import { SCENARIOS, getConflict } from "@/data/operations";

export function AIScenarios() {
  const { id } = useParams({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const conflict = getConflict(id);
  const scenarios = Object.values(SCENARIOS);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <BackButton />

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-accent" />
          <h1>AI Resolution Scenarios — {conflict.id}</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {conflict.type} on {conflict.flight} • {conflict.severity} severity
        </p>
      </div>

      <div className="space-y-4">
        {scenarios.map((scenario) => (
          <GlassCard
            key={scenario.id}
            hover
            className={`p-6 cursor-pointer ${scenario.recommended ? 'border-2 border-accent/50' : ''}`}
            onClick={() => navigate({ to: `/conflict/${id}/scenario/${scenario.id}` as never })}
          >
            {scenario.recommended && (
              <div className="flex items-center gap-2 mb-4 px-3 py-1.5 bg-accent/10 rounded-lg w-fit">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-accent">AI Recommended</span>
              </div>
            )}

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h3 className="mb-2">{scenario.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{scenario.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-destructive" />
                    <div>
                      <div className="text-sm text-muted-foreground">Estimated Cost</div>
                      <div className="font-medium text-destructive">- ${Math.abs(scenario.cost).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-destructive" />
                    <div>
                      <div className="text-sm text-muted-foreground">Delay</div>
                      <div className="font-medium text-destructive">- {scenario.delayMinutes} min</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                      <div className="font-medium text-accent">{scenario.successRate}%</div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate({ to: `/conflict/${id}/scenario/${scenario.id}` as never });
                }}
                className={`px-6 py-2.5 rounded-lg transition-opacity whitespace-nowrap ${
                  scenario.recommended ? 'bg-accent text-accent-foreground hover:opacity-90' : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                View Details
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate({ to: `/conflict/${id}/confirm` as never })}
          className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Select Recommended Scenario
        </button>
        <button
          onClick={() => navigate({ to: "/conflicts" })}
          className="px-6 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
