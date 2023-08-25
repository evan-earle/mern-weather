import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/index.jsx",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
      },
    },
  },
});
