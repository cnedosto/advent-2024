import { defineConfig } from 'vite'

export default defineConfig({
  assetsInclude: ['**/*.txt'],
  resolve: {
    alias: {
      path: 'path-browserify'
    }
  },
  define: {
    'process.env': process.env
  }
})
