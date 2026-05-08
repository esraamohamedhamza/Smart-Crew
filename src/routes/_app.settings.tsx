import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "@/components/app/screens/Settings";

export const Route = createFileRoute("/_app/settings")({
  component: Settings,
});
