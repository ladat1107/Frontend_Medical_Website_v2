// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import sass from 'sass';
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'flowbite': path.resolve(__dirname, 'node_modules/flowbite'),
    },

  },
  build: {
    commonjsOptions: {
      esmExternals: true,
    },
  },
  server: {
    port: 3000,
    open: true, // Mở trình duyệt khi chạy dev
  },
  optimizeDeps: {
    include: ["swiper"], // Đảm bảo Swiper được tối ưu hóa
  },
});
