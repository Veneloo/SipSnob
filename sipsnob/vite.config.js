import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "SipSnob - Coffee Reviews",
        short_name: "SipSnob",
        description: "Rate and review coffee shops with ease.",
        theme_color: "#a77c51",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "./",
        icons: [
          { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
        ]
      },
      workbox: {
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,html,png,svg,ico,json,webp}"],
        globIgnores: ["dist/sw.js", "dist/workbox-*.js"],
        cleanupOutdatedCaches: true,
        swDest: "dist/sw.js"
      },
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html"
      }
    })
  ],
  build: {
    outDir: "dist",  
  },
  server: {
    fs: { strict: false }
  }
});
