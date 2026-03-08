# Admin Panel & Manifest Generation

## Automated Content Management

This project includes an admin panel and automated manifest generation system for easy content updates.

### Quick Start

#### 1. Open Admin Panel

```bash
# Option A: Open directly in browser
open admin.html

# Option B: Serve locally first
python3 -m http.server 8000
# Then visit: http://localhost:8000/admin.html
```

#### 2. Edit Content

- Select a file from the dropdown
- Edit in the JSON editor (left) or click text to edit inline (right)
- Preview updates in real-time
- Download updated JSON

#### 3. Apply Changes

- Download the updated JSON from admin panel
- Share with tech expert who commits changes

---

## Automatic Manifest Generation

The admin panel loads files from `manifest.json`, which is automatically generated from your directory structure.

### Regenerate Manifest

Whenever you add a new `content.json` file:

```bash
# Option A: Run the shell script
./generate-manifest.sh

# Option B: Run Python directly
python3 generate-manifest.py
```

This scans your directory for all `content.json` files and creates/updates `manifest.json` with proper labels.

### Adding New Sections

To add a new section:

1. Create directory structure with `content.json`:

   ```
   newsection/
   └── content.json
   ```

2. Run the manifest generator:

   ```bash
   ./generate-manifest.sh
   ```

3. The admin panel automatically shows the new section in the dropdown

**No code changes needed!**

---

## How It Works

### Admin Panel (`admin.html`)

- Loads all available files from `manifest.json`
- Provides two editing modes:
  - **JSON Editor**: Direct JSON editing
  - **Live Preview**: Click to edit text inline
- Downloads updated JSON for tech experts

### Manifest Generator (`generate-manifest.py`)

- Recursively scans directory for `content.json` files
- Auto-generates human-readable labels based on paths
- Handles special characters (Danish characters, etc.)
- Sorts files alphabetically for consistency

---

## Files

- `admin.html` - Web-based content editor
- `manifest.json` - Auto-generated file list (don't edit manually)
- `generate-manifest.py` - Python script to generate manifest
- `generate-manifest.sh` - Shell wrapper for easy execution

---

## Tips

- **Always use the script** to regenerate manifest when adding new sections
- The script ignores: `.git/`, `node_modules/`, `.github/`, `images/`
- Labels are auto-generated from directory names using a mapping system
- Customize label generation in `generate-manifest.py` if needed
