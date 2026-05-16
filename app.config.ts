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
      routes: (router) => {
        // تحديد إن الـ Routes موجودة جوه src/routes بشكل صريح
        return router.dir("./src/routes");
      },
      plugins: () => [
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
  ],
});
