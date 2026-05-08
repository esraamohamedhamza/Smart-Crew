import { createFileRoute } from "@tanstack/react-router";
import { FleetView } from "@/components/app/screens/FleetView";

export const Route = createFileRoute("/_app/fleet")({
  component: FleetView,
});
