import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Build timestamp for cache busting: 2026-01-09T18:59
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
    proxy: {
      '/n8n-api': {
        target: 'https://n8n.protradersystems.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/n8n-api/, ''),
        secure: true,
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    mode === 'development' && {
      name: 'playwright-test-runner',
      configureServer(server: any) {
        server.middlewares.use('/api/run-n8n-test', async (req: any, res: any) => {
          const { exec } = await import('child_process');
          res.setHeader('Content-Type', 'application/json');

          exec('npx playwright test tests/e2e/n8n_lab.spec.ts', (error, stdout, stderr) => {
            res.end(JSON.stringify({
              success: !error,
              stdout: stdout,
              stderr: stderr
            }));
          });
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Force new hash on each build
        entryFileNames: `assets/[name]-[hash]-v2.js`,
        chunkFileNames: `assets/[name]-[hash]-v2.js`,
      }
    }
  }
}));

