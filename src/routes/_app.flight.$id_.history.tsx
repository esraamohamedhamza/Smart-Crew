import { createFileRoute } from "@tanstack/react-router";
import { FlightHistory } from "@/components/app/screens/FlightHistory";

export const Route = createFileRoute("/_app/flight/$id_/history")({
  component: FlightHistory,
});
