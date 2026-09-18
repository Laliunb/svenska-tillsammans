import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Deployed to GitHub Pages at https://<user>.github.io/svenska-tillsammans/
// so all assets must be served from that sub-path.
export default defineConfig({
  base: '/svenska-tillsammans/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Svenska Tillsammans',
        short_name: 'Tillsammans',
        description: 'Learn Swedish together — flashcards, grammar, pronunciation.',
        theme_color: '#006aa7',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/svenska-tillsammans/',
        scope: '/svenska-tillsammans/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
})
