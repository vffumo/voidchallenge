import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react()],

    // 🔥 Add this to handle React Router routes
    base: '/',
    server: {
      historyApiFallback: true,
    },

})
