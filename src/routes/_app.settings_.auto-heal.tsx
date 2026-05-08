import { createFileRoute } from "@tanstack/react-router";
import { AutoHealConfig } from "@/components/app/screens/AutoHealConfig";

export const Route = createFileRoute("/_app/settings_/auto-heal")({
  component: AutoHealConfig,
});
