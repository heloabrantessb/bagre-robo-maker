import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminho de publicação no GitHub Pages: https://<usuario>.github.io/bagre-robo-maker/
  base: '/bagre-robo-maker/',
  plugins: [react(), tailwindcss()],
})
