import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: join(__dirname, 'renderer'),
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
