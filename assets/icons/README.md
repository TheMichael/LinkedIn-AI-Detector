# Extension Icons

This directory contains the icons for the LinkedIn AI Post Detector extension.

## Required Icons

The extension requires three PNG icon sizes:
- `icon16.png` - 16x16 pixels (toolbar)
- `icon48.png` - 48x48 pixels (extension management)
- `icon128.png` - 128x128 pixels (Chrome Web Store)

## Creating Icons from SVG

The `icon.svg` file contains the base design. You can convert it to PNG using:

### Option 1: Online Converters
1. Visit https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`
3. Set dimensions to 16x16, 48x48, and 128x128
4. Download as `icon16.png`, `icon48.png`, and `icon128.png`

### Option 2: Using Inkscape (Free)
```bash
inkscape icon.svg --export-png=icon16.png --export-width=16 --export-height=16
inkscape icon.svg --export-png=icon48.png --export-width=48 --export-height=48
inkscape icon.svg --export-png=icon128.png --export-width=128 --export-height=128
```

### Option 3: Using ImageMagick
```bash
convert -density 1200 -resize 16x16 icon.svg icon16.png
convert -density 1200 -resize 48x48 icon.svg icon48.png
convert -density 1200 -resize 128x128 icon.svg icon128.png
```

### Option 4: Using Node.js (sharp library)
```bash
npm install sharp
node convert-icons.js
```

## Design Notes

The icon features:
- LinkedIn blue background (#0a66c2)
- AI brain symbol with neural network nodes
- Magnifying glass to represent detection/analysis
- Simple, recognizable design that works at small sizes

## Temporary Placeholder

If you need to test the extension immediately, you can use any 16x16, 48x48, and 128x128 PNG images as placeholders. However, for Chrome Web Store submission, you'll need proper branded icons.
