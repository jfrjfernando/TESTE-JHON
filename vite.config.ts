import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { generateSitemap } from "./src/generators/sitemap.generator";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      preact(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: false,
      }),
      generateSitemap(env.VITE_DOMAIN),
    ],
    server: {
      port: 3333,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
