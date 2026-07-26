import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/layouts': resolve(__dirname, './src/layouts'),
      '@/routes': resolve(__dirname, './src/routes'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/context': resolve(__dirname, './src/context'),
      '@/firebase': resolve(__dirname, './src/firebase'),
      '@/services': resolve(__dirname, './src/services'),
      '@/api': resolve(__dirname, './src/api'),
      '@/types': resolve(__dirname, './src/types'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/assets': resolve(__dirname, './src/assets'),
      '@/constants': resolve(__dirname, './src/constants'),
    },
  },
})