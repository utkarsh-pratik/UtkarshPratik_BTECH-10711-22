import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable the React Compiler
      compiler: {
        // This is the recommended way to enable the compiler
        // It automatically applies the correct Babel plugin
        enabled: true,
      },
    }),
  ],
})