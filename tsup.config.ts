import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/lib/editor/index.ts'],
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
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
  onSuccess: async () => {
    console.log('✅ Build completed successfully!')
  },
})