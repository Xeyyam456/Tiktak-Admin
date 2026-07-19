import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const VENDOR_PACKAGES = /node_modules[\\/](react|react-dom|react-router-dom|@tanstack|axios|zustand|sonner)[\\/]/

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (VENDOR_PACKAGES.test(id)) return 'vendor'
        },
      },
    },
  },
})
