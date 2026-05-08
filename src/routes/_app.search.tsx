import { createFileRoute } from "@tanstack/react-router";
import { AISearch } from "@/components/app/screens/AISearch";

export const Route = createFileRoute("/_app/search")({
  component: AISearch,
});
