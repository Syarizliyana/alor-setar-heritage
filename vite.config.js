import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],

      manifest: {
        id: '/',
        name: 'Alor Setar Heritage Trail',
        short_name: 'Heritage Trail',
        description: 'Explore Kedah Heritage Through AR',
        theme_color: '#0f766e',
        background_color: '#0f766e',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',

        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})