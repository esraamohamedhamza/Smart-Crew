import { useEffect } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export function SuccessState() {
  const { id } = useParams({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#006937', '#6ABF4B', '#0082CA', '#FED7C1'],
    });
  }, []);

  return (
    <div className="p-4 lg:p-8 flex items-center justify-center min-h-[80vh]">
      <div className="max-w-2xl w-full space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="mb-2">Resolution Successful!</h1>
          <p className="text-muted-foreground">
            Conflict {id} has been resolved using AI-powered automation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6 text-accent">
              <Sparkles className="w-5 h-5" />
              <h3>Resolution Summary</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Conflict ID</span>
                <span className="font-medium">{id}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Resolution Type</span>
                <span className="font-medium">Backup Crew Assignment</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Execution Time</span>
                <span className="font-medium text-accent">8 minutes</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Cost</span>
                <span className="font-medium">$2,400</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Flight Status</span>
                <span className="font-medium text-accent">On Schedule</span>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-accent mb-1">All Systems Updated</div>
                  <p className="text-sm text-muted-foreground">
                    Flight manifest, crew roster, and gate information have been automatically synchronized across all systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate({ to: "/" })}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Back to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate({ to: "/conflicts" })}
                className="px-6 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                View All Conflicts
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
