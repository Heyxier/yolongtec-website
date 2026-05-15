#!/usr/bin/env python3
"""Generate missing category pages from _data/categories.yml.

Reads _data/categories.yml and checks pages/products/ for each category.
If a category has no corresponding product-{slug}.md file, creates one
using category-page-template.md as the template.

This script is idempotent — it only generates files that don't exist.
"""

import os
import sys
import yaml

# Paths relative to this script's location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_DIR = os.path.dirname(SCRIPT_DIR)
DATA_FILE = os.path.join(REPO_DIR, '_data', 'categories.yml')
PAGES_DIR = os.path.join(REPO_DIR, 'pages', 'products')
TEMPLATE_FILE = os.path.join(SCRIPT_DIR, 'category-page-template.md')

# Ensure pages/products/ exists
os.makedirs(PAGES_DIR, exist_ok=True)

# Read categories
with open(DATA_FILE, 'r', encoding='utf-8') as f:
    categories = yaml.safe_load(f)

if not categories:
    print('No categories found in _data/categories.yml')
    sys.exit(0)

# Read template
with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
    template = f.read()

generated = 0
skipped = 0

for slug, cat in categories.items():
    page_path = os.path.join(PAGES_DIR, f'product-{slug}.md')

    if os.path.exists(page_path):
        skipped += 1
        continue

    # Build content with template substitution
    content = template
    content = content.replace('{slug}', slug)
    content = content.replace('{name}', cat.get('name', slug.upper()))
    content = content.replace('{section_title}', cat.get('section_title', cat.get('name', slug.upper())))
    content = content.replace('{desc}', cat.get('desc', ''))

    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'✓ Generated: pages/products/product-{slug}.md')
    generated += 1

total = len(categories)
print(f'\nDone: {generated} generated, {skipped} skipped (existing), {total} total categories')
