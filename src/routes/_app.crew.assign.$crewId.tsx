import { createFileRoute } from "@tanstack/react-router";
import { CrewAssignment } from "@/components/app/screens/CrewAssignment";

export const Route = createFileRoute("/_app/crew/assign/$crewId")({
  component: CrewAssignment,
});
