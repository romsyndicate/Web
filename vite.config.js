import { cpSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = import.meta.dirname;

function copyExistingAssets() {
  return {
    name: 'copy-existing-assets',
    closeBundle() {
      const output = resolve(root, 'dist');
      mkdirSync(resolve(output, 'assets'), { recursive: true });
      cpSync(resolve(root, 'assets/img'), resolve(output, 'assets/img'), { recursive: true });
      cpSync(resolve(root, 'assets/membros'), resolve(output, 'assets/membros'), { recursive: true });
      cpSync(resolve(root, 'favicon.png'), resolve(output, 'favicon.png'));
    },
  };
}

export default defineConfig({
  plugins: [react(), copyExistingAssets()],
  publicDir: false,
  build: {
    rollupOptions: {
      input: [
        resolve(root, 'index.html'),
        resolve(root, 'sobre.html'),
        ...[
          'driverGBC', 'initialdPSX', 'rainbowSixGBC', 'thps2', 'thps3gba',
          'thugGBA', 'turok2gbc', 'turok3gbc', 'turokRageWarsGBC', 'turokEvolutionGBA', 'turokdinogb',
        ].map((page) => resolve(root, `assets/Projetos/${page}.html`)),
      ],
    },
  },
});
