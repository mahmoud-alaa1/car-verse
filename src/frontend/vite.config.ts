// import { defineConfig } from ".pnpm/vite@5.4.19_@types+node@22.18.0/node_modules/vite";
// import react from ".pnpm/@vitejs+plugin-react-swc@3.11.0_vite@5.4.19_@types+node@22.18.0_/node_modules/@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from ".pnpm/lovable-tagger@1.1.9_vite@5.4.19_@types+node@22.18.0_/node_modules/lovable-tagger";

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { componentTagger } from 'lovable-tagger';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
