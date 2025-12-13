#!/usr/bin/env python3
"""
Create placeholder PNG icons for the extension.
Requires: pip install pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """Create a simple placeholder icon"""
    # Create image with LinkedIn blue background
    img = Image.new('RGB', (size, size), color='#0a66c2')
    draw = ImageDraw.Draw(img)

    # Draw a simple "AI" text or circle
    if size >= 32:
        # Try to load a font, fall back to default
        try:
            font_size = size // 3
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except:
            font = ImageFont.load_default()

        # Draw "AI" text
        text = "AI"
        # Get text bounding box
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]

        # Center text
        x = (size - text_width) // 2
        y = (size - text_height) // 2

        draw.text((x, y), text, fill='white', font=font)
    else:
        # For small icons, just draw a circle
        margin = size // 4
        draw.ellipse([margin, margin, size - margin, size - margin], fill='white')

    # Save the image
    img.save(filename, 'PNG')
    print(f"✓ Created {filename}")

def main():
    sizes = [16, 48, 128]

    for size in sizes:
        filename = f'icon{size}.png'
        create_icon(size, filename)

    print("\nPlaceholder icons created successfully!")
    print("Note: These are basic placeholders. For production, create proper branded icons.")

if __name__ == '__main__':
    main()
