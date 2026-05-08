import { createFileRoute } from "@tanstack/react-router";
import { FlightDelays } from "@/components/app/screens/FlightDelays";

export const Route = createFileRoute("/_app/delayed")({
  component: FlightDelays,
});
