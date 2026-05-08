import { createFileRoute } from "@tanstack/react-router";
import { FlightDetails } from "@/components/app/screens/FlightDetails";

export const Route = createFileRoute("/_app/flight/$id")({
  component: FlightDetails,
});
