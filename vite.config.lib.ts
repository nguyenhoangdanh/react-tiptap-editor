import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactTipTapEditor",
      fileName: (format) => `index.${format === "es" ? "esm" : format}.js`,
      formats: ["es", "cjs"],
    },
    outDir: "dist",
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@tiptap/core",
        "@tiptap/react",
        "@tiptap/pm",
        "@tiptap/starter-kit",
        "@tiptap/extension-image",
        "@tiptap/extension-text-align",
        "@tiptap/extension-text-style",
        "@tiptap/extension-color",
        "@tiptap/extension-highlight",
        "@tiptap/extension-font-family",
        "@tiptap/extension-link",
        "@tiptap/extension-table",
        "@tiptap/extension-table-row",
        "@tiptap/extension-table-cell",
        "@tiptap/extension-table-header",
        "@tiptap/extension-blockquote",
        "@tiptap/extension-bullet-list",
        "@tiptap/extension-ordered-list",
        "@tiptap/extension-list-item",
        "@tiptap/extension-code-block",
        "@tiptap/extension-horizontal-rule",
        "@tiptap/extension-history",
        "@tiptap/extension-gapcursor",
        "@tiptap/extension-dropcursor",
        "tiptap-extension-resize-image",
        "@dnd-kit/core",
        "@dnd-kit/sortable",
        "@dnd-kit/utilities"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime"
        }
      }
    },
    minify: false,
    sourcemap: true
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ["**/*.stories.*", "**/*.test.*"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
