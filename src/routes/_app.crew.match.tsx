import { createFileRoute } from "@tanstack/react-router";
import { CrewMatching } from "@/components/app/screens/CrewMatching";

export const Route = createFileRoute("/_app/crew/match")({
  component: CrewMatching,
});
