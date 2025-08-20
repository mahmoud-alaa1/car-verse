// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// Load env vars
dotenv.config({ path: '../../.env' })

export default defineConfig({
  envPrefix: ['CANISTER_', 'DFX_'],
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
      interval: 100, // check every 100ms
    },
  },
  build: {
    emptyOutDir: true,
  },
  resolve: {
    alias: {

      "@": path.resolve(__dirname, "./src"),

    },
    dedupe: ['@dfinity/agent'],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
})
