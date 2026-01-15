import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // FIX: If the key is missing, use a "dummy" key so the app doesn't crash on load.
  // The AI features won't work without the real key, but the screen won't be white.
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || "TEMPORARY_BUILD_KEY";

  return {
    base: "/Hero-World/",
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
