import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "src/index.js",
        core: "src/core.js",
      },
      formats: ["es"],
      name: "dragmate",
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        dir: "dist",
      },
    },
  },
});
