import { createFileRoute } from "@tanstack/react-router";
import { KPIDetails } from "@/components/app/screens/KPIDetails";

export const Route = createFileRoute("/_app/kpi/$metric")({
  component: KPIDetails,
});
