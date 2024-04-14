import { defineConfig } from 'vite';
import dotenv from 'dotenv';

export default defineConfig({
  plugins: [],
  define: {
    'process.env': dotenv.config().parsed
  }
});
