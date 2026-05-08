import { createFileRoute } from "@tanstack/react-router";
import { AIRiskPanel } from "@/components/app/screens/AIRiskPanel";

export const Route = createFileRoute("/_app/flight/$id/risk")({
  component: AIRiskPanel,
});
