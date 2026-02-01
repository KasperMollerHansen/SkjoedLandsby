# Skjød Landsby Website

## Overview

A modern, serverless website for Skjød Landsby with a modular architecture. All pages use a consistent structure with content managed through JSON files.

## Directory Structure

```
SkjoedLandsby/
├── index.html                  # Main landing page
├── shared/                     # Shared components (NEW)
│   ├── menubar.html            # Navigation bar
│   ├── theme.css               # Shared theme styles
│   ├── content-loader.js       # Universal content loader
│   └── footer-loader.js        # Footer content loader
├── assets/                     # Static assets (renamed from defaults/)
│   ├── css/                    # Stylesheets
│   ├── js/                     # JavaScript libraries
│   ├── fonts/                  # Font files
│   ├── images/                 # Images
│   └── shared/
│       ├── content.json        # Footer content
│       ├── menubar.html        # Menubar template
│       └── styles.css          # Legacy styles
├── forsamlingshus/             # Community house section
│   ├── index.html
│   ├── content.json            # All page content
│   ├── styles.css              # Section-specific styles
│   ├── gallery.js              # Gallery functionality
│   ├── contact.js              # Contact form
│   └── images/gallery/         # Gallery images
├── tidende/                    # Newsletter section
│   ├── index.html
│   ├── content.json
│   ├── arkiv/                  # Archive subsection
│   ├── historie/               # History subsection
│   └── redaktion/              # Editorial subsection
├── jagtforening/               # Hunting association
│   ├── index.html
│   └── content.json
└── sbif/                       # Sports association
    ├── index.html
    └── content.json
```

## Architecture

### Consistent Pattern

All sections follow the tidende pattern:

1. **HTML Structure**: Minimal, semantic HTML with content placeholders
2. **Content Management**: All text content in `content.json`
3. **Universal Loader**: Single `shared/content-loader.js` handles all pages
4. **Shared Styling**: Common theme in `shared/theme.css`
5. **Section Styles**: Additional styles in local `styles.css`

### Key Files

#### `/shared/content-loader.js`

Universal content loader that:

- Loads menubar from `/shared/menubar.html`
- Detects page type from `content.json` structure
- Renders content appropriately for each section type

#### `/shared/footer-loader.js`

Loads footer content from `/assets/shared/content.json`

#### `content.json` Format

**Intro-style pages** (tidende, jagtforening, sbif):

```json
{
  "intro": {
    "title": "Page Title",
    "text": "Multi-line text content",
    "image": "path/to/image.jpg",
    "imageAlt": "Image description"
  }
}
```

**Complex pages** (forsamlingshus):

```json
{
  "hero": { "title": "...", "buttonText": "..." },
  "calendar": { "title": "..." },
  "about": { "title": "...", "paragraphs": [], "facilities": {} },
  "prices": { "title": "...", "pricesSection": {}, "rulesSection": {} },
  "contact": { "title": "...", "formIntro": "...", "contactInfo": {} }
}
```

## Features

### Modular Architecture

- Each section is self-contained
- Easy to add new sections
- No dependencies between sections

### Content-Driven

- All text managed in JSON files
- No hardcoded content in HTML
- Easy updates without touching code

### Consistent Navigation

- Shared menubar across all pages
- Section-specific menu items injected via JavaScript
- Absolute paths (`/shared/`, `/assets/`) for reliability

### Responsive Design

- Mobile-friendly navigation
- Flexible layouts
- Works on all screen sizes

## Adding a New Section

1. **Create directory**: `newsection/`

2. **Create `index.html`**:

```html
<!doctype html>
<html lang="da-DK">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/shared/theme.css" />
    <title>Your Title</title>
  </head>
  <body>
    <div id="menubar"></div>
    <main style="max-width: 800px; margin: 40px auto; padding: 20px">
      <!-- Content loaded from content.json -->
    </main>
    <script src="/shared/content-loader.js"></script>
    <script>
      setTimeout(() => {
        const ul = document.querySelector(".menubar-links");
        if (ul) {
          ul.innerHTML = '<li><a href="/index.html">Forside</a></li>';
        }
      }, 100);
    </script>
  </body>
</html>
```

3. **Create `content.json`**:

```json
{
  "intro": {
    "title": "Section Title",
    "text": "Your content here",
    "image": "",
    "imageAlt": ""
  }
}
```

4. **Update main `index.html`**: Add card linking to new section

## Development

### Local Testing

Simply open `index.html` in a browser. All paths use absolute URLs from root, so you may need a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### File Paths

All shared resources use absolute paths from root:

- `/shared/content-loader.js`
- `/shared/theme.css`
- `/assets/shared/content.json`

This ensures consistency regardless of page nesting depth.

## Migration Notes

### Changes from Old Structure

- `defaults/` → `assets/`
- Individual `content-loader.js` → single `/shared/content-loader.js`
- Individual menubars → shared `/shared/menubar.html`
- `subpage-theme.css` → `theme.css`
- Relative paths → absolute paths

### Removed Files

- `forsamlingshus/content-loader.js` (now uses shared)
- `forsamlingshus/menubar.html` (now uses shared)
- `tidende/content-loader.js` (now uses shared)
- `forside/` (unused directory)
- `assets/shared/footer-loader.js` (moved to `/shared/`)

## Technical Details

- **Shared styles** (`pages/shared/styles.css`): Base styles, header, footer, buttons
- **Page-specific styles**: Unique styles for each section

### JavaScript Modules

- **gallery.js**: Image loading and slideshow
- **contact.js**: Form handling and date picker initialization

### Dependencies

- Flatpickr (date picker)
- Google Fonts (Raleway, Open Sans)
- Google Calendar (embedded)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with some degradation)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Add "Om Skjød By" page with village history and information
- Add "Arrangementer" page with upcoming events
- Implement a news/blog section
- Add image lightbox for gallery
- Improve mobile navigation (hamburger menu)

## Notes

- All existing assets (images, CSS, JS) remain in their original locations
- The gallery images are loaded from `images/gallery/` regardless of page location
- The PHP endpoint `get_gallery_images.php` is used if available, with fallback to hardcoded images
- Each page folder (like `forsamlingshus/`) is at the root level for clean URLs
- Shared styles are in the `shared/` folder at root level
