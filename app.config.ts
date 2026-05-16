import { createApp } from "vinxi";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default createApp({
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./.output/public",
      base: "/",
    },
    {
      name: "client",
      type: "client",
      handler: "./src/start.ts",
      target: "browser",
      plugins: () => [
        // الـ Plugin ده هو اللي بيولد ملفات الـ Routes ويربطها بالـ Client
        TanStackRouterVite(),
        react(),
        tailwindcss(),
        tsconfigPaths(),
        {
          name: "skip-async-hooks-for-browser",
          enforce: "pre",
          resolveId(source) {
            if (source === "node:async_hooks" || source === "async_hooks") {
              return "\0browser-async-hooks";
            }
          },
          load(id) {
            if (id === "\0browser-async-hooks") {
              return "export class AsyncLocalStorage { disable() {}; enable() {}; enterWith() {}; run(store, callback) { return callback(); }; getStore() { return undefined; } };";
            }
          },
        },
      ],
    },
    {
      name: "server",
      type: "http",
      handler: "./src/entry-server.ts", // أو المسار الخاص بـ entry-server عندك لو موجود
      target: "server",
    }
  ],
});
