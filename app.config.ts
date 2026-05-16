import { defineConfigFile } from "@tanstack/react-start/config";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// استخدام المعالج الرسمي لـ TanStack لضمان أعلى توافق بدون مشاكل مسارات Vinxi
export default defineConfigFile({
  routers: {
    client: {
      plugins: () => [
        TanStackRouterVite(),
        react(),
        tailwindcss(),
        tsconfigPaths(),
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
