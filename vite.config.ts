import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { generateSitemap } from "./src/generators/sitemap.generator";

export default defineConfig(() => {
  process.env.VITE_DOMAIN ??= "http://localhost:3333";
  process.env.VITE_GOOGLE_VERIFICATION ??= "";
  process.env.VITE_ASSETS_API ??= "/";

  return {
    plugins: [
      preact(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: false,
      }),
      generateSitemap(process.env.VITE_DOMAIN),
    ],
    server: {
      port: 3333,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "assets/[name]-[hash].js",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("lucide-react")) {
                return "a";
              }

              if (id.includes("@radix") || id.includes("preact-helmet")) {
                return "b";
              }

              if (id.includes("cmdk") || id.includes("pako")) {
                return "c";
              }

              if (
                id.includes("tailwind") ||
                id.includes("yup") ||
                id.includes("react-window")
              ) {
                return "d";
              }

              return "n";
            }

            return "z";
          },
        },
      },
    },
  };
});