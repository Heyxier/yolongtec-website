#!/bin/bash
# Validate all product files have at least one language field
# Fails with exit code 1 if a product has BOTH name and name_zh missing
# Usage: bash scripts/validate-products.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PRODUCTS_DIR="$SCRIPT_DIR/_products"

ERRORS=0

echo "=== Product Validation ==="

for product_file in "$PRODUCTS_DIR"/*.md; do
    filename=$(basename "$product_file")
    
    has_name=$(grep -cE '^name\b' "$product_file" || true)
    has_name_zh=$(grep -cE '^name_zh\b' "$product_file" || true)
    
    if [ "$has_name" -eq 0 ] && [ "$has_name_zh" -eq 0 ]; then
        echo "❌ FAIL: $filename — name AND name_zh both missing!"
        ERRORS=$((ERRORS + 1))
    else
        echo "✅ $filename — name=$([ "$has_name" -gt 0 ] && echo '✓' || echo '✗') name_zh=$([ "$has_name_zh" -gt 0 ] && echo '✓' || echo '✗')"
    fi
done

echo ""
if [ "$ERRORS" -gt 0 ]; then
    echo "❌ Validation FAILED — $ERRORS file(s) with missing language fields!"
    exit 1
else
    echo "✅ All products validated successfully!"
fi
