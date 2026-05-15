#!/bin/bash
# Generate Chinese product stub files from _products/*.md
# Usage: bash scripts/generate-zh-products.sh
# Creates minimal stub files in _zh_products/ for bilingual product pages

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PRODUCTS_DIR="$SCRIPT_DIR/_products"
ZH_DIR="$SCRIPT_DIR/_zh_products"

mkdir -p "$ZH_DIR"

# Track if any files have issues
VALIDATION_ERRORS=0

for product_file in "$PRODUCTS_DIR"/*.md; do
    filename=$(basename "$product_file")
    stub_file="$ZH_DIR/$filename"
    
    # Extract model from frontmatter
    model=$(grep -E '^model:' "$product_file" | sed 's/^model:\s*"\{0,1\}\([^"]*\)"\{0,1\}/\1/' | xargs)
    
    if [ -z "$model" ]; then
        echo "⚠️  WARNING: No model found in $filename — language fallback handled by layout"
        VALIDATION_ERRORS=1
    fi
    
    # Check if product has required fields
    has_name=$(grep -cE '^name:' "$product_file" || true)
    has_name_zh=$(grep -cE '^name_zh:' "$product_file" || true)
    
    if [ "$has_name" -eq 0 ] && [ "$has_name_zh" -eq 0 ]; then
        echo "❌ ERROR: $filename has NEITHER name nor name_zh! Missing both languages."
        VALIDATION_ERRORS=1
    fi
    
    # Generate stub - just layout + model reference
    cat > "$stub_file" << STUBEOF
---
layout: product_zh
model: $model
---
STUBEOF
    
    echo "✅ Generated: _zh_products/$filename (model: $model)"
done

echo ""
echo "--- Summary ---"
echo "Processed $(ls "$PRODUCTS_DIR"/*.md 2>/dev/null | wc -l) product files"
echo "Generated $(ls "$ZH_DIR"/*.md 2>/dev/null | wc -l) Chinese stubs"

if [ "$VALIDATION_ERRORS" -ne 0 ]; then
    echo ""
    echo "⚠️  Some files had warnings — check output above."
    exit 1
fi

echo "✅ All products validated successfully!"
