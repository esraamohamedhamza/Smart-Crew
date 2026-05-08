import { createFileRoute } from "@tanstack/react-router";
import { ScenarioMetrics } from "@/components/app/screens/ScenarioMetrics";

export const Route = createFileRoute("/_app/conflict/$id/scenario/$scenarioId")({
  component: ScenarioMetrics,
});
