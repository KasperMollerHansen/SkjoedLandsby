#!/bin/bash

# Gallery Test Script for Skjød Forsamlingshus

echo "=== Automated Gallery System Test ==="
echo ""

# Check if gallery folder exists
if [ -d "images/gallery" ]; then
    echo "✓ Gallery folder exists: images/gallery/"
else
    echo "✗ Gallery folder missing!"
    exit 1
fi

# Count images
IMAGE_COUNT=$(find images/gallery -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | wc -l)
echo "✓ Found $IMAGE_COUNT image(s) in gallery"
echo ""

# List images with dimensions
echo "Gallery images:"
shopt -s nullglob
for img in images/gallery/*.jpg images/gallery/*.jpeg images/gallery/*.png images/gallery/*.gif images/gallery/*.webp; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        size=$(du -h "$img" | cut -f1)
        if command -v identify &> /dev/null; then
        
            dimensions=$(identify -format "%wx%h" "$img" 2>/dev/null)
            echo "  - $filename ($size, ${dimensions}px)"
        else
            echo "  - $filename ($size)"
        fi
    fi
done

echo ""
echo "=== How to Add More Images ==="
echo "1. Copy image files to: images/gallery/"
echo "2. Supported formats: JPG, PNG, GIF, WebP"
echo "3. Refresh webpage - images will load automatically!"
echo ""
echo "=== For Best Results ==="
echo "• Use images around 1200x900 pixels (4:3 ratio)"
echo "• All images will be displayed uniformly with CSS"
echo "• Name files alphabetically to control order (01-, 02-, etc.)"
echo ""
