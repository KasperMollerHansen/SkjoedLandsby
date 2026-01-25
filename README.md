# Skjød Landsby Website - New Structure

## Overview

The website has been restructured into a modular architecture with a main landing page and separate subpages for different sections.

## Directory Structure

```
SkjoedForsamlingshus/
├── index.html                  # Main landing page for Skjød Landsby
├── forsamlingshus/
│   ├── forsamlingshus.html     # Forsamlingshus page
│   ├── styles.css              # Forsamlingshus-specific styles
│   ├── gallery.js              # Gallery functionality
│   └── contact.js              # Contact form functionality
├── shared/
│   └── styles.css              # Shared styles across all pages
├── css/                        # Existing CSS files
├── js/                         # Existing JavaScript files
├── images/
│   └── gallery/                # Gallery images
└── fonts/                      # Font files
```

## Pages

### 1. Main Landing Page (`index.html`)

- Simple, modern landing page for Skjød Landsby
- Cards linking to different sections:
  - Forsamlingshus (implemented)
  - Om Skjød By (coming soon)
  - Arrangementer (coming soon)
- About section describing the village
- Footer with contact information

### 2. Forsamlingshus Page (`forsamlingshus/forsamlingshus.html`)

- Hero section with background image
- Calendar section (Google Calendar embed)
- About section with gallery
- Info & Prices section
- Contact form with date picker
- All functionality from the original site

## Features

### Modular Architecture

- Each page has its own HTML, CSS, and JavaScript files
- Shared styles are in `shared/styles.css`
- Easy to add new pages without affecting existing ones

### Responsive Design

- Mobile-friendly navigation
- Flexible grid layouts
- Optimized for all screen sizes

### Gallery System

- Dynamic image loading from `images/gallery/` folder
- Automatic slideshow
- Fallback images if PHP endpoint fails

### Contact Form

- Flatpickr date picker with Danish locale
- Form validation
- Mailto functionality with clipboard copy
- User feedback messages

## How to Use

### Viewing the Site

1. Open `index.html` in a browser to see the landing page
2. Click "Læs mere" on the Forsamlingshus card to navigate to the forsamlingshus page

### Adding New Pages

1. Create a new folder in the root directory (e.g., `om-skjoed/`)
2. Create HTML, CSS, and JS files for the new section
3. Link shared styles: `<link rel="stylesheet" href="../shared/styles.css" />`
4. Add navigation links in the header
5. Update the landing page cards to link to the new page

### Testing

1. Test all links and functionality
2. Check responsive design on different screen sizes
3. Verify gallery images load correctly
4. Test contact form submission
5. Deploy to your web server

## Technical Details

### CSS Architecture

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
