import { createFileRoute } from "@tanstack/react-router";
import { AIScenarios } from "@/components/app/screens/AIScenarios";

export const Route = createFileRoute("/_app/conflict/$id/scenarios")({
  component: AIScenarios,
});
