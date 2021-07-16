import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'ReduceYourUseBizMap',
    },
  },
  server: {
    proxy: {
      '/participating-businesses?format=json': {
        target: 'https://www.reduceyourusetampabay.org',
        changeOrigin: true,
      },
    },
  },
})
