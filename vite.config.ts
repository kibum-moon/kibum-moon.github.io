
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base is '/' by default, which is correct for User/Organization root domains
  base: '/',
})
