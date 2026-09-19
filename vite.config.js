import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // The @react-pdf/renderer library is lazy-loaded into its own chunk
    // (PdfDownloadButton), so it never blocks initial page load. It is
    // inherently large, so raise the size-warning threshold to keep build
    // output clean.
    chunkSizeWarningLimit: 1400,
  },
})
