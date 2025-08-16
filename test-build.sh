#!/bin/bash

echo "🧪 Testing React TipTap Editor build process..."

# Create a temporary test directory
TEST_DIR="test-package-$(date +%s)"
mkdir -p "/tmp/$TEST_DIR"
ORIGINAL_DIR=$(pwd)

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up test directory..."
    rm -rf "/tmp/$TEST_DIR"
    cd "$ORIGINAL_DIR"
}

# Set up cleanup on exit
trap cleanup EXIT

# Copy package-lib.json to package.json temporarily
cp package-lib.json package.json

echo "📦 Running build process..."

# Check if tsup is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js and npm."
    exit 1
fi

# Run the build
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Check required files
echo "🔍 Checking build output..."

REQUIRED_FILES=("dist/index.js" "dist/index.esm.js" "dist/index.d.ts")
MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo "✅ All required files present:"
    ls -la dist/
else
    echo "❌ Missing required files:"
    printf '%s\n' "${MISSING_FILES[@]}"
    exit 1
fi

# Test package creation
echo "📦 Testing package creation..."
npm pack --quiet

PACKAGE_FILE=$(ls react-richtext-tiptap-*.tgz | head -n 1)

if [ -f "$PACKAGE_FILE" ]; then
    echo "✅ Package created: $PACKAGE_FILE"
    
    # Extract and examine package contents
    cd "/tmp/$TEST_DIR"
    tar -xzf "$ORIGINAL_DIR/$PACKAGE_FILE"
    
    echo "📋 Package contents:"
    find package -type f | head -20
    
    # Test if main entry points exist
    if [ -f "package/dist/index.js" ] && [ -f "package/dist/index.d.ts" ]; then
        echo "✅ Package structure looks good!"
    else
        echo "❌ Package structure is invalid!"
        exit 1
    fi
    
    cd "$ORIGINAL_DIR"
    rm "$PACKAGE_FILE"
else
    echo "❌ Package creation failed!"
    exit 1
fi

# Restore original package.json
git checkout package.json 2>/dev/null || echo "Note: Could not restore package.json from git"

echo ""
echo "🎉 All tests passed! Your package is ready for publication."
echo ""
echo "To publish:"
echo "1. Make sure you're logged in to npm: npm login"
echo "2. Run the build script: ./build-lib.sh"
echo "3. Publish: npm publish"