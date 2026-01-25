# Automated Gallery System

## How to Add Images to the Gallery

Simply add any image files to the `images/gallery/` folder, and they will automatically appear on the website.

### Supported Image Formats

- JPG/JPEG
- PNG
- GIF
- WebP

### Image Guidelines

**Important:** All images will be displayed with uniform sizing (4:3 aspect ratio) using CSS object-fit.

**For best results:**

- Use images with similar aspect ratios (preferably 4:3 or close to it)
- Recommended minimum dimensions: 1200x900 pixels
- Images are automatically centered and cropped to fit

### How It Works

1. **Add images:** Place any supported image files in `images/gallery/`
2. **Automatic loading:** The gallery JavaScript automatically detects and displays all images
3. **Uniform sizing:** CSS ensures all images appear the same size regardless of original dimensions
4. **No coding needed:** No need to edit HTML - just add/remove images from the folder!

### Current Images

The gallery currently contains:

- forsamlingshus.jpg (1508x2048)
- forsamlingshus1.jpg (2048x1536)
- forsamlingshuset-1200x1200.png (1200x1200)

### Optimizing Image Sizes

While the gallery handles different sizes automatically, you can optimize images before uploading:

**Using ImageMagick (if installed):**

```bash
# Resize image to 1200px width maintaining aspect ratio
convert your-image.jpg -resize 1200x your-image.jpg

# Convert to 4:3 ratio (1200x900)
convert your-image.jpg -resize 1200x900^ -gravity center -extent 1200x900 your-image.jpg
```

**Using online tools:**

- Use free tools like TinyPNG, Squoosh, or Photopea
- Resize to around 1200x900 pixels for optimal quality/performance balance

### Removing Images

Simply delete image files from the `images/gallery/` folder - they will no longer appear on the website.

### Order of Images

Images are displayed in alphabetical order by filename. To control the order:

- Name files with numbers: `01-image.jpg`, `02-image.jpg`, etc.
- Or use alphabetical naming: `a-image.jpg`, `b-image.jpg`, etc.
