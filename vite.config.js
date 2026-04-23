import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["react-datepicker", "react-datepicker/dist/react-datepicker.css"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://prms-backend-rrdo.onrender.com/",
        // target: "http://localhost:5000",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
