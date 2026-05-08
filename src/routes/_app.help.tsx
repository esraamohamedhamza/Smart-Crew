import { createFileRoute } from "@tanstack/react-router";
import { HelpSupport } from "@/components/app/screens/HelpSupport";

export const Route = createFileRoute("/_app/help")({
  component: HelpSupport,
});
