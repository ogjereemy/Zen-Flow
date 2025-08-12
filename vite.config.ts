import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(dirname(fileURLToPath(import.meta.url)), "client", "src"),
      "@shared": path.resolve(dirname(fileURLToPath(import.meta.url)), "shared"),
      "@assets": path.resolve(dirname(fileURLToPath(import.meta.url)), "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(dirname(fileURLToPath(import.meta.url)), "client"),
  build: {
    outDir: path.resolve(dirname(fileURLToPath(import.meta.url)), "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
