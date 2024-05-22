import { defineConfig } from 'vite';
import dotenv from 'dotenv';

export default defineConfig({
  plugins: [],
  define: {
    'process.env': dotenv.config().parsed
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'plugin.js',
        assetFileNames: 'plugin.css',
        chunkFileNames: "chunk.js",
        manualChunks: undefined,
      }
    }
  }
});
