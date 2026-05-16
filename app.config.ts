import { createApp } from "vinxi";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default createApp({
  routers: [
    {
      name: "client",
      type: "client",
      handler: "./src/start.ts",
      plugins: () => [
        nodePolyfills({
          // تفعيل الـ Polyfill الخاص بـ async_hooks للمتصفح لمنع خطأ البناء
          include: ["async_hooks"],
          globals: {
            Buffer: true,
            process: true,
          },
        }),
        TanStackRouterVite(),
        react(),
        tailwindcss(),
        tsconfigPaths(),
      ],
    },
  ],
});
