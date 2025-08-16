#!/bin/bash

echo "🚀 Building React TipTap Editor for NPM publication..."

# Exit on any error
set -e

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Create dist directory
mkdir -p dist

# Copy package-lib.json to package.json for build context
echo "📦 Preparing package configuration..."
cp package-lib.json package.json

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

# Run TypeScript type checking
echo "🔍 Running type checks..."
npm run type-check

# Build the library using tsup
echo "🔨 Building library..."
npm run build

# Copy README and LICENSE to dist
echo "📄 Copying documentation..."
cp README-LIB.md dist/README.md

# Create LICENSE if it doesn't exist
if [ ! -f "LICENSE" ]; then
    echo "📜 Creating LICENSE file..."
    cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2024 React TipTap Editor Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
fi

cp LICENSE dist/

# Copy the package.json to dist for publishing
cp package.json dist/

# Extract CSS from the component styles and create a separate CSS file
echo "🎨 Extracting CSS styles..."
cat > dist/styles.css << 'EOF'
/* React TipTap Editor Styles */

/* Editor container styles */
.ProseMirror {
  outline: none;
  font-family: inherit;
  line-height: 1.6;
}

.ProseMirror-focused {
  outline: none;
}

/* Selection styles */
.ProseMirror ::selection {
  background: oklch(0.6 0.25 240 / 0.2);
}

.ProseMirror::-moz-selection {
  background: oklch(0.6 0.25 240 / 0.2);
}

/* Drag and drop styles */
.ProseMirror-selectednode {
  outline: 2px solid oklch(0.6 0.25 240);
}

/* Placeholder styling */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: oklch(0.556 0 0);
  pointer-events: none;
  height: 0;
}

/* Text formatting */
.ProseMirror strong {
  font-weight: 700;
}

.ProseMirror em {
  font-style: italic;
}

.ProseMirror u {
  text-decoration: underline;
}

.ProseMirror s {
  text-decoration: line-through;
}

/* Headings */
.ProseMirror h1 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 1.5rem 0 1rem 0;
}

.ProseMirror h2 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 1.25rem 0 0.75rem 0;
}

.ProseMirror h3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 1rem 0 0.5rem 0;
}

.ProseMirror h4 {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0.75rem 0 0.5rem 0;
}

.ProseMirror h5 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  margin: 0.5rem 0 0.25rem 0;
}

.ProseMirror h6 {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  margin: 0.5rem 0 0.25rem 0;
}

/* Lists */
.ProseMirror ul,
.ProseMirror ol {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.ProseMirror ul {
  list-style-type: disc;
}

.ProseMirror ol {
  list-style-type: decimal;
}

.ProseMirror li {
  margin: 0.5rem 0;
  padding-left: 0.25rem;
}

/* Blockquotes */
.ProseMirror blockquote {
  border-left: 4px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 0 0.375rem 0.375rem 0;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
}

/* Code */
.ProseMirror code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: 'Courier New', monospace;
}

.ProseMirror pre {
  background: #1f2937;
  color: #f9fafb;
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.ProseMirror pre code {
  background: transparent;
  padding: 0;
  color: inherit;
}

/* Tables */
.ProseMirror table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 1em 0;
  overflow: hidden;
}

.ProseMirror td,
.ProseMirror th {
  min-width: 1em;
  border: 1px solid #e5e7eb;
  padding: 8px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
}

.ProseMirror th {
  font-weight: bold;
  text-align: left;
  background-color: #f3f4f6;
}

/* Links */
.ProseMirror a {
  color: #3b82f6;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.ProseMirror a:hover {
  text-decoration-color: #1d4ed8;
}

/* Images */
.ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
}

/* Text alignment */
.ProseMirror [style*="text-align: left"] {
  text-align: left;
}

.ProseMirror [style*="text-align: center"] {
  text-align: center;
}

.ProseMirror [style*="text-align: right"] {
  text-align: right;
}

.ProseMirror [style*="text-align: justify"] {
  text-align: justify;
}

/* Horizontal rule */
.ProseMirror hr {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 2rem 0;
}
EOF

# Show build summary
echo "📊 Build Summary:"
echo "   📁 Built files:"
ls -la dist/
echo ""
echo "   📦 Package contents:"
echo "   ✅ Main entry: $(ls dist/index.js 2>/dev/null && echo "✓" || echo "✗")"
echo "   ✅ ESM entry: $(ls dist/index.esm.js 2>/dev/null && echo "✓" || echo "✗")"
echo "   ✅ Types: $(ls dist/index.d.ts 2>/dev/null && echo "✓" || echo "✗")"
echo "   ✅ README: $(ls dist/README.md 2>/dev/null && echo "✓" || echo "✗")"
echo "   ✅ LICENSE: $(ls dist/LICENSE 2>/dev/null && echo "✓" || echo "✗")"
echo "   ✅ Styles: $(ls dist/styles.css 2>/dev/null && echo "✓" || echo "✗")"

# Restore original package.json
git checkout package.json 2>/dev/null || cp package-lib.json package.json

echo ""
echo "✅ Build complete! Your library is ready for publishing."
echo ""
echo "Next steps:"
echo "1. Review the built files in the dist/ directory"
echo "2. Test the package locally: npm pack"
echo "3. Publish to npm: npm publish"
echo ""
echo "🚀 Happy publishing!"