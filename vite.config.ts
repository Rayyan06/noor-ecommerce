import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { installGlobals } from '@remix-run/node';
import path from 'path';
//import { remixDevTools } from 'remix-development-tools/vite';
import { vercelPreset } from '@vercel/remix/vite';

// This installs globals such as "fetch", "Response", "Request" and "Headers".
installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    //remixDevTools(),
    remix({
      presets: [vercelPreset()],
      basename: '/',
      buildDirectory: 'build',
      ignoredRouteFiles: ['**/*.css'],
      serverBuildFile: 'index.js',
    }),
  ],
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'app') }],
  },
});
