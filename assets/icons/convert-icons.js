// Icon conversion script
// Run: npm install sharp
// Then: node convert-icons.js

const sharp = require('sharp');
const fs = require('fs');

const sizes = [16, 48, 128];
const inputFile = 'icon.svg';

async function convertIcons() {
  for (const size of sizes) {
    try {
      await sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(`icon${size}.png`);

      console.log(`✓ Created icon${size}.png`);
    } catch (error) {
      console.error(`✗ Error creating icon${size}.png:`, error.message);
    }
  }

  console.log('\nAll icons created successfully!');
}

convertIcons();
