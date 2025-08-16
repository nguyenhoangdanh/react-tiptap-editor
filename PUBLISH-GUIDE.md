# How to Publish React TipTap Editor to NPM

This comprehensive guide will walk you through publishing your React TipTap editor library to npm.

## 📋 Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **Git Repository**: Your code should be in a public Git repository
3. **Node.js**: Version 18+ (check with `node --version`)
4. **npm CLI**: Latest version (check with `npm --version`)

## 🔧 Pre-Publication Setup

### 1. Repository Structure Verification

Your current structure looks good! Key files are in place:

```
/workspaces/spark-template/
├── src/lib/editor/           # Main library code
├── package-lib.json          # NPM package configuration
├── tsup.config.ts           # Build configuration
├── README-LIB.md            # Library documentation
└── tsconfig.json            # TypeScript config
```

### 2. Update Package Configuration

First, let's finalize your `package-lib.json`:

```json
{
  "name": "react-tiptap-editor",
  "version": "1.0.0",
  "description": "A fully customizable and extensible React editor built on TipTap with drag-and-drop images, complete TypeScript support, and modern UI components",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "keywords": [
    "react",
    "tiptap",
    "editor",
    "rich-text",
    "wysiwyg",
    "markdown",
    "typescript",
    "drag-drop",
    "image",
    "extensible"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/react-tiptap-editor.git"
  },
  "bugs": {
    "url": "https://github.com/your-username/react-tiptap-editor/issues"
  },
  "homepage": "https://github.com/your-username/react-tiptap-editor#readme",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  }
}
```

### 3. Create Library Build Script

Create a dedicated build script for the library:

```bash
#!/bin/bash
# build-lib.sh

echo "🚀 Building React TipTap Editor for NPM..."

# Clean previous builds
rm -rf dist/

# Copy package-lib.json to package.json for build
cp package-lib.json package.json

# Build the library
npm run build

# Copy README and LICENSE
cp README-LIB.md dist/README.md
cp LICENSE dist/ 2>/dev/null || echo "LICENSE file not found, creating..."

# Create LICENSE if it doesn't exist
if [ ! -f "LICENSE" ]; then
cat > dist/LICENSE << EOF
MIT License

Copyright (c) $(date +%Y) Your Name

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

echo "✅ Build complete! Ready for publishing."
```

## 🚀 Publishing Steps

### Step 1: Prepare Your Environment

```bash
# Login to npm (run this once)
npm login

# Verify you're logged in
npm whoami

# Check if package name is available
npm view react-tiptap-editor
# If it returns 404, the name is available!
```

### Step 2: Final Pre-publish Checks

```bash
# Lint your code
npm run lint

# Run type checking
npm run type-check

# Test the build process
npm run build

# Verify the built files
ls -la dist/
```

### Step 3: Version Management

```bash
# For first release
npm version 1.0.0

# For subsequent releases
npm version patch    # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor    # 1.0.1 -> 1.1.0 (new features)
npm version major    # 1.1.0 -> 2.0.0 (breaking changes)
```

### Step 4: Test Your Package Locally

```bash
# Create a test project
mkdir test-react-tiptap-editor
cd test-react-tiptap-editor
npm init -y
npm install react react-dom

# Pack your library locally
cd /path/to/your/library
npm pack

# Install the packed version in test project
cd ../test-react-tiptap-editor
npm install ../react-tiptap-editor/react-tiptap-editor-1.0.0.tgz

# Test it works
cat > test.js << EOF
const { Editor } = require('react-tiptap-editor');
console.log('✅ Package imported successfully!');
EOF

node test.js
```

### Step 5: Publish to NPM

```bash
# Dry run to see what will be published
npm publish --dry-run

# Publish to npm (first time)
npm publish

# For scoped packages (if using @yourorg/react-tiptap-editor)
npm publish --access=public
```

## 🔄 Setting Up Automated Publishing

### GitHub Actions Workflow

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Build library
        run: npm run build

      - name: Publish to NPM
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Setting up NPM Token

1. Go to [npmjs.com](https://www.npmjs.com) → Profile → Access Tokens
2. Create a new "Automation" token
3. Add it to your GitHub repository secrets as `NPM_TOKEN`

## 📋 Post-Publication Checklist

### 1. Verify Publication

```bash
# Check your package on npm
npm view react-tiptap-editor

# Install it fresh
npm install react-tiptap-editor
```

### 2. Update Documentation

- Update your GitHub README with installation instructions
- Add badges for npm version, downloads, etc.
- Create or update CHANGELOG.md

### 3. Tag Your Release

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 4. Create GitHub Release

Go to your GitHub repository and create a release from the tag with:
- Release notes
- Changelog
- Breaking changes (if any)

## 🔧 Advanced Configuration

### Bundle Analysis

```bash
# Add to package.json scripts
"analyze": "npx bundlesize"

# Check bundle size
npm run analyze
```

### Automated Testing Before Publish

```bash
# Add to package.json scripts
"prepublishOnly": "npm run test && npm run build && npm run lint"
```

### Semantic Versioning Automation

```bash
# Install semantic-release
npm install --save-dev semantic-release @semantic-release/git @semantic-release/github

# Configure in .releaserc.json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

## 🛠 Troubleshooting

### Common Issues

1. **"Package name already exists"**
   - Choose a unique name or use a scoped package (@yourorg/package-name)

2. **"Build fails during publish"**
   - Ensure all dependencies are in package.json
   - Check TypeScript configurations

3. **"Module not found after install"**
   - Verify your exports in package.json
   - Check main, module, and types fields

4. **"Peer dependency warnings"**
   - Ensure React and TipTap are properly listed as peerDependencies

### Debugging Commands

```bash
# Check what files will be published
npm pack --dry-run

# View published package info
npm view react-tiptap-editor

# Check for outdated dependencies
npm outdated

# Audit for security issues
npm audit
```

## 📊 Success Metrics

After publishing, monitor:

- **Downloads**: npm stats
- **Issues**: GitHub issues
- **Stars**: GitHub stars
- **Community**: npm weekly downloads

## 🎯 Next Steps

1. **Documentation Site**: Create a documentation website
2. **Examples**: Add more usage examples
3. **Community**: Set up Discord/discussions
4. **Contributing**: Create contribution guidelines
5. **Roadmap**: Plan future features

---

## Quick Commands Reference

```bash
# Complete publishing workflow
npm login
npm run build
npm version patch
npm publish

# Check publication
npm view react-tiptap-editor
npm install react-tiptap-editor
```

Remember to update the repository URL, author information, and other package details specific to your project before publishing!