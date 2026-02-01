# Skjød Landsby Website

## Overview

A modern, serverless website for Skjød Landsby built with vanilla HTML, CSS, and JavaScript. Features a fixed sidebar navigation, dynamic content loading from JSON files, and responsive design.

**Live Site:** https://kaspermollerhansen.github.io/SkjoedLandsby/

## Directory Structure

```
SkjoedLandsby/
├── index.html                  # Main landing page with image gallery
├── .nojekyll                   # Disables Jekyll processing on GitHub Pages
├── shared/                     # Shared components
│   ├── sidebar.html            # Fixed navigation sidebar
│   ├── theme.css               # Global theme styles (max-width: 1100px)
│   └── content-loader.js       # Universal content loader with dynamic path resolution
├── forside/
│   └── images/                 # Homepage image gallery (0.jpg - 8.jpg)
├── tidende/                    # Newsletter section
│   ├── index.html
│   ├── content.json            # Section intro content
│   ├── arkiv/                  # Archive with Google Drive link
│   ├── historie/               # History subsection
│   └── redaktion/              # Editorial subsection
├── jagtforening/               # Hunting association
│   ├── index.html
│   ├── content.json
│   ├── images/                 # Shared images
│   ├── arrangementer/          # Events
│   ├── fuglekonge/             # Annual bird shooting competition
│   └── historie/               # History
└── sbif/                       # Skjød Borger og Idræts Forening (Sports)
    ├── index.html
    ├── content.json
    ├── arrangementer/          # Events
    ├── bestyrelse/             # Board members with profile images
    │   ├── content.json        # Member data
    │   └── images/             # Member photos + default.jpg
    ├── historie/               # History
    └── vedtaegter/             # Bylaws (PDF link)
```

## Architecture

### Navigation System

- **Fixed Sidebar**: `shared/sidebar.html` loaded dynamically into all pages
- **Expandable Sections**: Tidende, Jagtforening, and SBIF with collapsible submenus
- **LocalStorage Persistence**: Remembers which sections are expanded
- **Auto-expand**: Opens relevant section when navigating to its pages
- **Clean URLs**: All links use directory paths (no `index.html` in URLs)

### Content Loading

All pages follow this pattern:

```html
<!doctype html>
<html lang="da-DK">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../shared/theme.css" />
    <title>Page Title</title>
  </head>
  <body>
    <div id="sidebar"></div>
    <div class="content-wrapper">
      <main>
        <!-- Content loaded from content.json -->
      </main>
    </div>
    <script src="../shared/content-loader.js"></script>
  </body>
</html>
```

The `content-loader.js` automatically:

1. Calculates relative paths based on page depth
2. Loads and inserts the sidebar
3. Adjusts all sidebar links for current page location
4. Fetches local `content.json` and renders content

### Path Resolution

**GitHub Pages Compatibility:**

- All paths are relative (`./`, `../`, `../../`)
- No `<base>` tags needed
- Works both locally and on `https://kaspermollerhansen.github.io/SkjoedLandsby/`
- Path depth calculated dynamically, stripping `/SkjoedLandsby/` for GitHub Pages

**Examples:**

- Root: `index.html` → `./shared/theme.css`
- Level 1: `tidende/index.html` → `../shared/theme.css`
- Level 2: `tidende/arkiv/index.html` → `../../shared/theme.css`

### Content Types

**`content.json` supports multiple content types:**

#### Basic Intro

```json
{
  "intro": {
    "title": "Section Title",
    "text": "Description text"
  }
}
```

#### With Paragraphs

```json
{
  "intro": {
    "title": "Title",
    "paragraphs": ["First paragraph...", "Second paragraph..."]
  }
}
```

#### With List Items

```json
{
  "intro": {
    "title": "Title",
    "items": ["First item", "Second item"]
  }
}
```

#### Board Members (Bestyrelse)

```json
{
  "intro": {
    "title": "Bestyrelse",
    "members": [
      {
        "role": "Formand",
        "name": "Name",
        "phone": "12 34 56 78",
        "email": "email@example.com",
        "image": "./images/photo.jpg"
      }
    ]
  }
}
```

- Members without `image` property automatically use `./images/default.jpg`
- Renders in 2-column grid with profile photos

#### PDF Link (Vedtægter)

```json
{
  "intro": {
    "title": "Vedtægter",
    "pdf": "path/to/document.pdf"
  }
}
```

#### Fuglekonge (Special Format)

```json
{
  "title": "Årets Fuglekonge",
  "intro": "Description...",
  "image": "../images/Fugleemblem.jpeg",
  "fuglekonger": [{ "year": "2025", "name": "Winner Name" }]
}
```

## Features

### Dynamic Sidebar

- Fixed position with purple gradient background
- Expands/collapses with arrow indicators
- Active page highlighting
- Responsive mobile view

### Theme System

- Global styles in `shared/theme.css`
- Max-width: 1100px for content
- Consistent card-style design with rounded corners
- Gradient background
- Raleway font for headings, system fonts for body

### Image Handling

- All image paths are relative
- Default fallback image for members without photos
- Responsive image grids
- Circular profile photos for board members

## Development

### Local Testing

```bash
# Serve with any static server
python -m http.server 8000
# or
npx serve
```

### GitHub Pages Deployment

1. Push to `main` branch
2. GitHub Actions automatically deploys
3. Site available at: https://kaspermollerhansen.github.io/SkjoedLandsby/

### Adding New Content

**To add a new subsection:**

1. Create directory: `section/subsection/`
2. Add `index.html` (copy from existing subsection)
3. Create `content.json` with appropriate structure
4. Update `shared/sidebar.html` to add link
5. Adjust relative paths in HTML (`../../shared/` for level 2)

**To add board member:**

1. Add member object to `sbif/bestyrelse/content.json`
2. Upload photo to `sbif/bestyrelse/images/` (or omit for default)

**To update homepage images:**

1. Place images in `forside/images/`
2. Name them `0.jpg` through `8.jpg` (9 images total)

## Technical Notes

- No build process required
- No external dependencies
- Pure vanilla JavaScript
- localStorage for UI state persistence
- Fetch API for content loading
- CSS Grid and Flexbox for layouts

## Browser Support

Modern browsers with support for:

- ES6 JavaScript
- Fetch API
- CSS Grid
- CSS Flexbox
- LocalStorage
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

````

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
````

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
