import { createFileRoute } from "@tanstack/react-router";
import { AvailabilityGrid } from "@/components/app/screens/AvailabilityGrid";

export const Route = createFileRoute("/_app/crew/availability")({
  component: AvailabilityGrid,
});
