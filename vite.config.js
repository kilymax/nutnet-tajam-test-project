import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  base: "/nutnet-tajam-test-project",
  plugins: [
    ViteImageOptimizer({
      jpg: {
        quality: 50,
      },
    }),
  ],
});
