# LinkedIn AI Post Detector

A Chrome extension that allows users to manually select LinkedIn posts and analyze the likelihood that they were written by AI. The extension uses an intuitive element picker interface (similar to browser DevTools element selection) and performs all analysis client-side with no external API calls.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue.svg)](https://chrome.google.com/webstore)

## Features

✅ **Manual Selection** - You choose what to analyze, one post at a time
✅ **Client-Side Analysis** - No data leaves your browser
✅ **Pattern Detection** - Identifies common AI writing patterns
✅ **Detailed Breakdown** - See individual scores for different detection methods
✅ **No API Required** - Works completely offline
✅ **Privacy-Focused** - Zero data collection, zero tracking
✅ **Customizable** - Adjust sensitivity and detection methods

## How It Works

1. Click the extension icon while browsing LinkedIn
2. Click "Select Post to Analyze"
3. Click on any LinkedIn post
4. Get instant AI likelihood percentage (0-100%)

## Installation

### Option 1: Install from Chrome Web Store (Recommended)
*Coming soon - pending Chrome Web Store review*

### Option 2: Load Unpacked (Development)

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/linkedin-ai-detector.git
   cd linkedin-ai-detector
   ```

2. **Create icon files** (required before loading)
   ```bash
   cd assets/icons
   # See ICONS_REQUIRED.txt for instructions on creating the required PNG files
   ```

3. **Load extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `linkedin-ai-detector` directory
   - The extension icon should appear in your toolbar

4. **Navigate to LinkedIn**
   - Go to [linkedin.com](https://linkedin.com)
   - Click the extension icon to start analyzing posts

## Usage

### Basic Analysis

1. **Open LinkedIn** - Navigate to your LinkedIn feed
2. **Click Extension Icon** - The popup will appear
3. **Select Post** - Click "Select Post to Analyze"
4. **Pick a Post** - Hover over a post and click to select it
5. **View Results** - See the AI likelihood percentage and detected patterns

### Understanding Results

#### Likelihood Score
- **0-33% (Green)** - Likely human-written
- **34-66% (Yellow)** - Uncertain, could be either
- **67-100% (Red)** - Likely AI-generated

#### Confidence Level
- **High** - Strong indicators present
- **Medium** - Moderate indicators
- **Low** - Weak or mixed signals

#### Detected Patterns
The extension shows which specific patterns were found:
- AI-typical phrases (e.g., "delve into", "it's worth noting")
- Overly structured formatting (perfect bullet points, numbered lists)
- Systematic hashtag/emoji usage
- Uniform writing style (consistent sentence lengths, no typos)

### Settings & Customization

Access settings by clicking the gear icon in the popup.

#### Detection Sensitivity
- **Low** - More lenient, fewer false positives
- **Medium** - Balanced (default)
- **High** - Stricter, more detections

#### Detection Methods
Enable/disable individual analysis methods:
- **Phrase Analysis** - Common AI phrases and language patterns
- **Structure Analysis** - Formatting and paragraph consistency
- **Format Analysis** - Hashtag and emoji patterns
- **Style Analysis** - Sentence uniformity and writing style

#### Display Preferences
- **Show Detailed Breakdown** - Display individual method scores
- **Show Confidence Level** - Display confidence rating

#### Analysis History (Optional)
- Enable to keep last 10 analyses stored locally
- View and clear history from settings page
- Data never leaves your device

## Detection Methods

The extension uses four complementary analysis methods:

### 1. Phrase Analysis (40% weight)
Detects common AI phrases:
- High-confidence: "delve into", "it's worth noting", "in conclusion"
- Medium-confidence: "leverage", "paradigm shift", "game-changer"
- Low-confidence: "excited to announce", "thrilled to share"

### 2. Structure Analysis (30% weight)
Examines formatting patterns:
- Perfect bullet point usage (3-7 bullets)
- Numbered lists
- Overly consistent paragraph lengths
- Perfect emoji placement

### 3. Format Analysis (20% weight)
Analyzes hashtags and emojis:
- Hashtag count and positioning
- Emoji count and distribution
- Pattern-like usage vs. natural variation

### 4. Style Analysis (10% weight)
Evaluates writing patterns:
- Sentence length uniformity
- Absence of typos
- Lack of contractions in formal posts

## Privacy & Security

### Zero Data Collection
This extension does NOT collect, store, or transmit any data:
- No personal information
- No LinkedIn credentials
- No analyzed posts
- No usage statistics
- No tracking or analytics

### Local-Only Processing
All analysis happens in your browser:
- Text extraction is client-side only
- AI detection algorithms run locally
- Results displayed only to you
- No external API calls
- No internet connection required (after installation)

### Minimal Permissions
The extension requests only essential permissions:
- `activeTab` - Interact with current LinkedIn tab
- `storage` - Save your settings locally
- `scripting` - Inject element picker interface
- `host_permissions` - Limited to linkedin.com only

[Read full Privacy Policy](assets/privacy-policy.html)

## Legal & Compliance

### Chrome Web Store Compliance
✅ 100% client-side (no external servers)
✅ Minimal permissions
✅ Clear privacy policy
✅ Single, well-defined purpose
✅ Transparent functionality

### LinkedIn ToS Considerations
✅ User-initiated only (no automatic scraping)
✅ Analyzes publicly visible content
✅ No bulk data collection
✅ Equivalent to manual copy-paste

### Disclaimers
⚠️ **Results are estimations, not definitive proof**
⚠️ **For personal use only**
⚠️ **Educational purposes - use at own risk**
⚠️ **Not affiliated with LinkedIn Corporation**

## Project Structure

```
linkedin-ai-detector/
├── manifest.json              # Extension manifest (Manifest V3)
├── popup/
│   ├── popup.html            # Main popup interface
│   ├── popup.js              # Popup logic and messaging
│   └── popup.css             # Popup styling
├── content/
│   ├── selector.js           # Element picker implementation
│   ├── analyzer.js           # AI detection algorithms
│   └── content-styles.css    # Content script styles
├── background/
│   └── service-worker.js     # Background service worker
├── settings/
│   ├── settings.html         # Settings page
│   ├── settings.js           # Settings logic
│   └── settings.css          # Settings styling
├── assets/
│   ├── icons/                # Extension icons (16, 48, 128)
│   └── privacy-policy.html   # Privacy policy page
└── README.md                 # This file
```

## Development

### Prerequisites
- Chrome browser (or Chromium-based browser)
- Basic understanding of JavaScript, HTML, CSS
- Text editor or IDE

### Building from Source

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/linkedin-ai-detector.git
   ```

2. Create icon files (see `assets/icons/README.md`)

3. Load unpacked extension (see Installation instructions)

4. Make changes to source files

5. Reload extension in `chrome://extensions/`

### Testing

**Functional Testing:**
- Test element picker on various LinkedIn layouts
- Verify text extraction accuracy
- Test AI detection with known AI and human posts
- Check settings persistence
- Test error handling

**Test Cases:**
- Create 10 AI-generated posts (use ChatGPT)
- Collect 10 human-written posts
- Analyze both sets and compare results
- Expected: AI posts score 60-90%, human posts score 10-40%

### Debugging

Enable debug logging:
```javascript
// In background/service-worker.js
console.log() statements are already included
```

View console:
- Popup: Right-click popup → Inspect
- Background: chrome://extensions → "service worker" link
- Content Script: Open DevTools on LinkedIn page

## Troubleshooting

### Extension doesn't load
- Check that all required icon files exist (icon16.png, icon48.png, icon128.png)
- Verify manifest.json is valid JSON
- Check Chrome DevTools console for errors

### Picker doesn't activate
- Ensure you're on linkedin.com
- Refresh the LinkedIn page
- Check content scripts are injected (DevTools → Sources)

### Analysis returns 0% or errors
- Verify selected element contains text
- Check that text is at least 20 characters
- Try selecting the entire post container

### Settings don't save
- Check Chrome storage permissions
- Try clearing extension data and reinstalling

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Ideas
- Improve detection algorithms
- Add support for other languages
- Create better icons
- Write comprehensive tests
- Improve documentation

## Roadmap

### Version 1.0 (Current)
- [x] Basic element picker
- [x] AI detection algorithms
- [x] Settings page
- [x] Privacy-focused design

### Future Enhancements
- [ ] Multi-language support
- [ ] Export results to CSV/JSON
- [ ] Batch analysis mode
- [ ] Keyboard shortcuts
- [ ] Custom phrase dictionaries
- [ ] Visual badges on analyzed posts
- [ ] Comparison mode

## FAQ

**Q: Is this 100% accurate?**
A: No. The extension provides estimations based on patterns, not definitive proof. Use results as guidance, not conclusive evidence.

**Q: Does it work on other social media platforms?**
A: Currently only LinkedIn. Other platforms may be added in future versions.

**Q: Can I use this for commercial purposes?**
A: This extension is for personal, educational use only. Commercial use is not recommended.

**Q: Why do I need to manually select posts?**
A: To respect LinkedIn's ToS and user privacy. No automatic scraping or bulk collection.

**Q: Does it send data to external servers?**
A: No. All analysis happens locally in your browser. Zero external API calls.

**Q: Can I trust the results?**
A: Results are based on pattern matching and statistical analysis. They're useful indicators but not definitive proof. False positives and false negatives can occur.

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the need for transparency in AI-generated content
- Built with privacy and user control as top priorities
- Thanks to the open-source community

## Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/linkedin-ai-detector/issues)
- **Email:** your-email@example.com
- **Privacy Policy:** [View Policy](assets/privacy-policy.html)

## Disclaimer

This extension is an independent project and is not affiliated with, endorsed by, or sponsored by LinkedIn Corporation. LinkedIn is a registered trademark of LinkedIn Corporation.

Results provided by this extension are estimations based on writing patterns and should not be considered definitive proof of AI-generated content. Use at your own discretion and risk.

---

**Made with ❤️ for transparency in the age of AI**

**Star ⭐ this repo if you find it useful!**
