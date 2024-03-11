import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { installGlobals } from '@remix-run/node';

// This installs globals such as "fetch", "Response", "Request" and "Headers".
installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [remix({ ignoredRouteFiles: ['**/*.css'] })],
});
