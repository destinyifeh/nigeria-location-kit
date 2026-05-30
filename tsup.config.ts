import { defineConfig } from "tsup";

export default defineConfig([
  // Core library
  {
    entry: {
      index: "src/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    splitting: false,
    external: ["react", "react-native"],
    outDir: "dist",
  },
  // React components
  {
    entry: {
      react: "src/react/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    external: ["react", "react-native"],
    outDir: "dist",
    esbuildOptions(options) {
      options.jsx = "automatic";
    },
  },
  // React Native components
  {
    entry: {
      "react-native": "src/react-native/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    external: ["react", "react-native"],
    outDir: "dist",
    esbuildOptions(options) {
      options.jsx = "automatic";
    },
  }
]);
