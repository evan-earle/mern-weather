import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  include: ["pdfjs-dist"],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
      },
    },
  },
});
