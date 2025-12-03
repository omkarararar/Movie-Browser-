/*
 * Vite Configuration - The build tool that powers our development server
 * 
 * Vite is super fast! It gives us instant hot-reloading when we make changes.
 * We're using the React plugin so Vite knows how to handle JSX and React features.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // Enable React support with JSX and Fast Refresh
})
