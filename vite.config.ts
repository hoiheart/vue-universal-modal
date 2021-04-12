import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-universal-modal/demo/',
  build: {
    outDir: 'demo',
    assetsDir: './'
  },
  plugins: [vue()]
})
