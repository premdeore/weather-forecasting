import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }
  // server: {
  //   port: 8080,
  //   host: "0.0.0.0",
  //   hmr: {
  //     clientPort: 8081,
  //   },
  // }
})
