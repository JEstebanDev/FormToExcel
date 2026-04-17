import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          xlsx: ["xlsx"],
          vendor: ["react", "react-dom", "react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
  },
});
