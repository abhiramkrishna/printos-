// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://abhiramkrishna.github.io',
  base: '/printos-',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});