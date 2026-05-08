import { createFileRoute } from "@tanstack/react-router";
import { CrewProfiles } from "@/components/app/screens/CrewProfiles";

export const Route = createFileRoute("/_app/crew/profiles")({
  component: CrewProfiles,
});
