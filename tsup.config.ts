import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/lib/editor/index.ts'], // Standard library entry point
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  treeshake: true,
  splitting: false,
  external: [
    'react',
    'react-dom',
    '@tiptap/react',
    '@tiptap/core',
    '@tiptap/pm',
    '@tiptap/starter-kit',
    '@tiptap/extension-*',
    'lucide-react',
    '@dnd-kit/core',
    '@dnd-kit/modifiers',
    '@dnd-kit/sortable',
    '@dnd-kit/utilities',
    'tiptap-extension-resize-image',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
    // Suppress unused import warnings for external modules
    options.ignoreAnnotations = true
  },
  // Remove unused imports during build
  noExternal: [],
  onSuccess: async () => {
    console.log('✅ Build completed successfully!')
  },
})