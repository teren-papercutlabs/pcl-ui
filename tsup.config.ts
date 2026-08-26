import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['antd', 'react', 'react-dom', 'tailwindcss'],
  onSuccess: 'cp src/theme.css dist/theme.css',
})
