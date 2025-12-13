# Installation Guide

This guide will help you install the LinkedIn AI Post Detector Chrome extension.

## Prerequisites

- Google Chrome (version 88 or later) or any Chromium-based browser (Edge, Brave, etc.)
- Basic command line knowledge (for development installation)

## Installation Methods

### Method 1: Chrome Web Store (Recommended - Coming Soon)

*The extension is pending Chrome Web Store review. Check back soon!*

Once published:
1. Visit the Chrome Web Store page
2. Click "Add to Chrome"
3. Confirm permissions
4. Extension installed!

### Method 2: Load Unpacked (For Development/Testing)

#### Step 1: Download the Extension

**Option A: Download ZIP**
1. Go to the GitHub repository
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file to a permanent location (e.g., `Documents/Extensions/`)

**Option B: Clone with Git**
```bash
git clone https://github.com/yourusername/linkedin-ai-detector.git
cd linkedin-ai-detector
```

#### Step 2: Create Icon Files

⚠️ **IMPORTANT**: The extension requires icon files before it can be loaded.

Navigate to the icons directory:
```bash
cd assets/icons
```

Choose one of these methods:

**Option A: Using Python (Recommended)**
```bash
pip install pillow
python3 create-placeholder-icons.py
```

**Option B: Using Node.js**
```bash
npm install sharp
node convert-icons.js
```

**Option C: Manual Creation**
- Create three PNG files: `icon16.png`, `icon48.png`, `icon128.png`
- Use any image editor (Photoshop, GIMP, etc.)
- Or use an online SVG to PNG converter with the provided `icon.svg`

You should now have:
- ✅ `icon16.png` (16x16 pixels)
- ✅ `icon48.png` (48x48 pixels)
- ✅ `icon128.png` (128x128 pixels)

#### Step 3: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Open Chrome
   - Navigate to `chrome://extensions/`
   - Or: Menu (⋮) → More Tools → Extensions

2. **Enable Developer Mode**
   - Look for "Developer mode" toggle in the top-right corner
   - Turn it ON (should turn blue)

3. **Load the Extension**
   - Click "Load unpacked" button (appears after enabling Developer Mode)
   - Navigate to and select the `linkedin-ai-detector` folder
   - Click "Select Folder" or "Open"

4. **Verify Installation**
   - You should see "LinkedIn AI Post Detector" in your extensions list
   - Look for the extension icon in your Chrome toolbar
   - If you don't see the icon, click the puzzle piece (🧩) and pin it

#### Step 4: Test the Extension

1. **Go to LinkedIn**
   - Navigate to [linkedin.com](https://linkedin.com)
   - Make sure you're logged in

2. **Open the Extension**
   - Click the extension icon in your toolbar
   - You should see the popup interface

3. **Try Analyzing a Post**
   - Click "Select Post to Analyze"
   - Hover over a LinkedIn post (it should highlight)
   - Click the post
   - View the analysis results

## Troubleshooting

### Extension Won't Load

**Error: "Manifest file is missing or unreadable"**
- Check that `manifest.json` exists in the extension directory
- Verify the JSON syntax is correct

**Error: "Cannot load extension with file or directory name _metadata"**
- Make sure you're not loading from the .git directory
- Load the main extension folder, not a subfolder

**Missing icons error**
- Follow Step 2 above to create the icon files
- Check that all three icon files exist in `assets/icons/`

### Extension Loads But Doesn't Work

**Icon is grayed out**
- Make sure you're on linkedin.com
- The extension only works on LinkedIn

**Popup doesn't open**
- Right-click the extension icon → "Inspect popup"
- Check Console for errors
- Try reloading the extension

**Element picker doesn't activate**
- Refresh the LinkedIn page
- Check that you're on the main feed or a post page
- Open DevTools (F12) and check Console for errors

### Element Picker Issues

**Picker activates but nothing happens when clicking**
- Make sure you're clicking on an actual post, not an ad or sidebar
- Try selecting the main post content area
- Look for a border highlight when hovering

**"Text too short" error**
- Select a larger area that includes the full post content
- Some posts may have hidden content - try expanding them first

### Analysis Issues

**Always getting 0% or 100%**
- Check Settings → Detection Methods (make sure methods are enabled)
- Try adjusting sensitivity in Settings
- Verify the extension is analyzing the actual post text

**Results seem inaccurate**
- Remember: these are estimations, not definitive proof
- Some human posts may score high (professional writing)
- Some AI posts may score low (well-prompted or edited)

## Updating the Extension

### From Chrome Web Store
- Extensions update automatically
- You'll see a notification when updates are available

### Development Installation
1. Pull latest changes from GitHub
   ```bash
   git pull origin main
   ```

2. Go to `chrome://extensions/`

3. Click the refresh icon (🔄) on the extension card

4. Verify the version number updated

## Uninstalling

### Chrome Web Store Version
1. Go to `chrome://extensions/`
2. Find "LinkedIn AI Post Detector"
3. Click "Remove"
4. Confirm removal

### Development Version
1. Go to `chrome://extensions/`
2. Find "LinkedIn AI Post Detector"
3. Click "Remove"
4. Delete the extension folder from your computer (optional)

## Permissions Explained

The extension requests these permissions:

- **activeTab**: To interact with LinkedIn when you click the extension
- **storage**: To save your settings locally
- **scripting**: To inject the element picker into LinkedIn pages
- **host_permissions (linkedin.com)**: To work only on LinkedIn

All permissions are used exclusively for the stated functionality. No data is collected or transmitted.

## Getting Help

If you encounter issues:

1. **Check this guide** - Many common issues are covered above
2. **Read the README** - Contains additional information
3. **Check GitHub Issues** - Someone may have had the same problem
4. **Open a new issue** - Provide details about your problem

## Security Note

This extension:
- ✅ Works entirely offline (no internet needed after installation)
- ✅ Doesn't collect any data
- ✅ Doesn't transmit any information
- ✅ Stores settings locally only
- ✅ Open source - you can review the code

## Next Steps

After installation:
- Read the [README](README.md) for usage instructions
- Check out [Settings](chrome-extension://YOUR_ID/settings/settings.html) to customize
- Review the [Privacy Policy](assets/privacy-policy.html)
- Start analyzing LinkedIn posts!

---

**Need more help?** Open an issue on GitHub or email support.
