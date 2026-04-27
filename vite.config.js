import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { compression } from "vite-plugin-compression2";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // Hasilkan file .gz (Gzip) untuk semua aset JS/CSS/HTML
    compression({
      algorithm: "gzip",
      exclude: [/\.(avif|png|jpg|jpeg|gif|webp|svg|ico)$/],
    }),

    // Hasilkan file .br (Brotli) — lebih kecil dari gzip
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(avif|png|jpg|jpeg|gif|webp|svg|ico)$/],
    }),

    // Analisis bundle — aktif hanya saat ANALYZE=true npm run build
    process.env.ANALYZE === "true" &&
      visualizer({
        filename: "dist/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: "treemap",
      }),
  ].filter(Boolean),

  build: {
    // Target browser modern — output lebih kecil, tidak perlu banyak polyfill
    target: "esnext",

    // Batas warning ukuran chunk (KB)
    chunkSizeWarningLimit: 600,

    // Pisah CSS per chunk supaya tidak dimuat sekaligus
    cssCodeSplit: true,

    // Minifikasi pakai oxc (default Vite 8, lebih cepat dari esbuild)
    minify: "oxc",

    rollupOptions: {
      output: {
        // Pisah vendor besar ke chunk terpisah agar browser bisa cache secara independen
        manualChunks(id) {
          // React core & routing
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router")
          ) {
            return "chunk-react";
          }

          // GSAP & integrasi React-nya
          if (
            id.includes("node_modules/gsap/") ||
            id.includes("node_modules/@gsap/")
          ) {
            return "chunk-gsap";
          }

          // Lenis smooth scroll
          if (id.includes("node_modules/lenis/")) {
            return "chunk-lenis";
          }

          // Lucide icon library
          if (id.includes("node_modules/lucide-react/")) {
            return "chunk-lucide";
          }
        },

        // Penamaan file chunk supaya mudah diidentifikasi di DevTools
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
