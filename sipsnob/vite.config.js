import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  publicDir: 'public',    
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      manifest: {
        name: "SipSnob – Coffee Reviews",
        short_name: "SipSnob",
        description: "Rate and review coffee shops with ease.",
        start_url: ".",
        display: "standalone",
        theme_color: "#a77c51",
        background_color: "#ffffff",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json,webp}'],
        globIgnores: ['sw.js', 'workbox-*.js'],
        cleanupOutdatedCaches: true,
        swDest: 'dist/sw.js'
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      }
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html'
    }
  },
  server: {
    fs: { strict: false }
  }
});
