import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // Proxy Sanity API requests in development to prevent browser CORS 403 errors
      proxy: {
        '/sanity-api': {
          target: 'https://i1zx9y9l.api.sanity.io',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/sanity-api/, ''),
          headers: {
            Origin: 'https://i1zx9y9l.api.sanity.io',
          },
        },
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
