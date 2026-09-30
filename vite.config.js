import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-three',
              test: /node_modules[\\/](three|@react-three|@react-spring|three-stdlib|postprocessing|maath|meshline|camera-controls)/,
              priority: 3,
              maxSize: 450000,
            },
            {
              name: 'vendor-motion',
              test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)/,
              priority: 2,
            },
            {
              name: 'vendor-scroll',
              test: /node_modules[\\/](gsap|lenis)/,
              priority: 2,
            },
          ],
        },
      },
    },
  },
})
