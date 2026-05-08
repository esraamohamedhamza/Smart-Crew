import { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { BackButton } from "../shared/BackButton";
import { AlertCircle, CheckCircle, DollarSign, Clock, Users } from "lucide-react";
import { getConflict, getScenario } from "@/data/operations";

export function ResolutionConfirm() {
  const { id } = useParams({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const conflict = getConflict(id);
  const scenario = getScenario("SC-1");

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      navigate({ to: `/conflict/${id}/success` as never });
    }, 1500);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <BackButton />

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertCircle className="w-6 h-6 text-accent" />
            <h1>Confirm Resolution</h1>
          </div>
          <p className="text-muted-foreground text-sm">Review and approve the AI-recommended resolution</p>
        </div>

        <GlassCard className="p-8">
          <div className="text-center mb-6">
            <h2>{scenario.name}</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Conflict {conflict.id} • {conflict.type}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>Cost</span>
              </div>
              <div className="font-semibold text-destructive" style={{ fontSize: '24px' }}>
                - ${Math.abs(scenario.cost).toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Delay</span>
              </div>
              {/* Operational loss → red minus per spec */}
              <div className="font-semibold text-destructive" style={{ fontSize: '24px' }}>
                - {scenario.delayMinutes} min
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Success Rate</span>
              </div>
              <div className="font-semibold text-accent" style={{ fontSize: '24px' }}>{scenario.successRate}%</div>
            </div>
          </div>

          <div className="bg-secondary/30 rounded-lg p-6 mb-6">
            <h4 className="mb-4">Resolution Summary</h4>
            <ul className="space-y-2 text-muted-foreground">
              {scenario.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-accent mb-1">AI Confidence: High ({scenario.successRate}%)</div>
                <p className="text-sm text-muted-foreground">
                  This solution has been successfully applied in 47 similar scenarios with an average resolution time of 12 minutes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleConfirm}
              disabled={confirmed}
              className={`flex-1 px-6 py-3 rounded-lg transition-all ${
                confirmed
                  ? 'bg-accent/50 text-accent-foreground cursor-not-allowed'
                  : 'bg-accent text-accent-foreground hover:opacity-90'
              }`}
            >
              {confirmed ? 'Executing Resolution...' : 'Confirm & Execute'}
            </button>
            <button
              onClick={() => navigate({ to: `/conflict/${id}/scenarios` as never })}
              disabled={confirmed}
              className="px-6 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              Back
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
