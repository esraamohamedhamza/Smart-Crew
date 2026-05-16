import { createApp } from "vinxi";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default createApp({
  routers: [
    {
      name: "client",
      type: "client",
      handler: "./src/start.ts",
      plugins: () => [
        TanStackRouterVite(),
        react(),
        tailwindcss(),
        tsconfigPaths(),
      ],
      // إجبار الفايل إنه يعامل حزم السيرفر كـ External ميعملش تضارب في المتصفح
      vite: {
        build: {
          rollupOptions: {
            external: ["node:async_hooks", "async_hooks"],
          },
        },
      },
    },
  ],
});
