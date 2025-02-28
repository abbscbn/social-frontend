import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT || "10000", 10), // Render'ın kullanacağı port
    host: "0.0.0.0", // Uygulamanızın dışarıdan erişilebilir olması için
  },
});
