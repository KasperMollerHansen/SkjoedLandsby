#!/usr/bin/env python3

import os
import json
from pathlib import Path
from datetime import datetime

# Root directory to scan
root_dir = os.path.dirname(os.path.abspath(__file__))

def generate_label(file_path):
    """Generate a human-readable label from file path"""
    # Remove 'content.json' and split path
    parts = file_path.replace('content.json', '').strip('/').split('/')
    parts = [p for p in parts if p]  # Remove empty strings
    
    if not parts:
        return 'Root'
    
    # Map directory names to display labels
    label_map = {
        'sbif': 'SBIF',
        'tidende': 'Tidende',
        'jagtforening': 'Jagtforening',
        'bestyrelse': 'Bestyrelse',
        'arrangementer': 'Arrangementer',
        'fuglekonge': 'Fuglekonge',
        'historie': 'Historie',
        'vedtaegter': 'Vedtægter',
        'arkiv': 'Arkiv',
        'redaktion': 'Redaktion'
    }
    
    # Convert parts to display names
    display_parts = []
    for part in parts:
        if part in label_map:
            display_parts.append(label_map[part])
        else:
            display_parts.append(part.capitalize())
    
    # Special case: if only 1 part, add "Forside"
    if len(display_parts) == 1:
        display_parts.append('Forside')
    
    return ' - '.join(display_parts)

def find_content_json_files(directory):
    """Recursively find all content.json files"""
    files = []
    
    for root, dirs, filenames in os.walk(directory):
        # Skip certain directories
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.github', 'images']]
        
        if 'content.json' in filenames:
            # Get relative path from root_dir
            full_path = os.path.join(root, 'content.json')
            rel_path = os.path.relpath(full_path, root_dir).replace('\\', '/')
            
            files.append({
                'path': rel_path,
                'label': generate_label(rel_path)
            })
    
    return files

# Find all content.json files
files = find_content_json_files(root_dir)

# Sort by path for consistency
files.sort(key=lambda x: x['path'])

# Create manifest
manifest = {
    'files': files,
    'generated': datetime.now().isoformat(),
    'count': len(files)
}

# Write manifest.json
manifest_path = os.path.join(root_dir, 'manifest.json')
with open(manifest_path, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)

print(f'✓ Generated manifest.json with {len(files)} files:\n')
for file in files:
    print(f'  {file["path"]}')
    print(f'    → {file["label"]}')
