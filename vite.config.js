import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are loaded correctly when deployed
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      '.ngrok-free.app'
    ]
  }
})
