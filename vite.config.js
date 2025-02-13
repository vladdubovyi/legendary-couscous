import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/legendary-couscous/',
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      '.ngrok-free.app'
    ]
  }
})
