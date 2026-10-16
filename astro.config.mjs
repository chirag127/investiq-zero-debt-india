import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://chirag127.github.io',
  base: '/investiq-zero-debt-india/',
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory'
  }
});
