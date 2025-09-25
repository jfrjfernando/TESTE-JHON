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
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: 'Fusion Simulator - Yu-Gi-Oh! Forbidden Memories',
          short_name: 'Fusion Simulator',
          description: 'Test your Yu-Gi-Oh! fusion skills, explore fusion card combinations, and try your hand at the fusion playground.',
          theme_color: '#cc893d',
          background_color: '#3b2a1e',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'favicon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }),
      generateSitemap(env.VITE_DOMAIN),
    ],
    server: {
      host: "0.0.0.0",
      port: 5000,
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
