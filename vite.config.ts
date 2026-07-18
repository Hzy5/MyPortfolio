import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Vercel serves from root; GitHub Pages needs the repo subpath
  base: process.env.VERCEL ? '/' : '/MyPortfolio/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/itunes': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/itunes/, ''),
      },
      '/api/appstore': {
        target: 'https://apps.apple.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/appstore/, ''),
      },
      '/api/playstore': {
        target: 'https://play.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/playstore/, ''),
      },
      '/api/vessel': {
        target: 'https://vesselhealth.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/vessel/, ''),
      },
    },
  },
})
