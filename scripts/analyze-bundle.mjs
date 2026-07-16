import { build } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath, URL } from "node:url";

const result = await build({
  base: "/UE/",
  logLevel: "info",
  plugins: [
    tailwindcss(),
    react(),
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
  },
});

void result;
