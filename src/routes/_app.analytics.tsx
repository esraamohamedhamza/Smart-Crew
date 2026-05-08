import { createFileRoute } from "@tanstack/react-router";
import { AdvancedAnalytics } from "@/components/app/screens/AdvancedAnalytics";

export const Route = createFileRoute("/_app/analytics")({
  component: AdvancedAnalytics,
});
