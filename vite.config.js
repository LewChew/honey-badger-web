import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  root: 'public',
  publicDir: false,
  plugins: [
    {
      // index.html loads script.js as a classic (non-module) script, which Vite
      // leaves out of the bundle. Copy it into dist so production serves it.
      name: 'copy-classic-script',
      closeBundle() {
        copyFileSync(resolve(__dirname, 'public/script.js'), resolve(__dirname, 'dist/script.js'));
      }
    }
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        about: resolve(__dirname, 'public/about.html'),
        gifts: resolve(__dirname, 'public/gifts.html'),
        privacy: resolve(__dirname, 'public/privacy.html'),
        terms: resolve(__dirname, 'public/terms.html'),
        smsConsent: resolve(__dirname, 'public/sms-consent.html'),
        smsTerms: resolve(__dirname, 'public/sms-terms.html'),
      }
    }
  }
});
