import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const OUT_DIR = "./dist";
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        include: ["src/**/*.ts", "src/**/*.tsx"],
        exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      }),
    ],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    build: {
      outDir: OUT_DIR,
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "TimelessUI",
        formats: ["es", "cjs"],
        fileName: "main",
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react-router",
          "@floating-ui/react",
          "clsx",
          "date-fns",
          "embla-carousel-auto-scroll",
          "embla-carousel-autoplay",
          "embla-carousel-react",
          "lodash-es",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  };
});
