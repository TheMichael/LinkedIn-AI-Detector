# LinkedIn AI Detector

**Spot AI-generated content on LinkedIn. Instantly. Privately.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/webstore)

---

## The Problem

LinkedIn is drowning in AI-generated content. Generic engagement posts, recycled thought leadership, and copy-paste "insights" flood your feed daily. These posts:

- **Waste your time** with low-value content that looks professional but says nothing
- **Erode trust** in your network when you can't distinguish authentic voices from AI spam
- **Devalue real expertise** by burying genuine insights under algorithmic noise
- **Harm your brand** when you unknowingly engage with or share AI-generated content

**Current solutions are broken:**
- Manual detection is time-consuming and unreliable
- Third-party tools require sending private data to external servers
- No transparency in how content is analyzed
- No control over your privacy

---

## The Solution

LinkedIn AI Detector gives you instant, private AI detection right in your browser. Select any post, get immediate analysis—no API calls, no data collection, no compromises.

**Built for professionals who value:**
- ⚡ **Speed** - Results in under 1 second
- 🔒 **Privacy** - 100% client-side, zero data leaves your browser
- 🎯 **Accuracy** - Multi-method analysis combining phrase patterns, structure, formatting, and style
- ⚙️ **Control** - Fully customizable sensitivity and detection methods

---

## Impact

### For Individual Professionals
- **Save 2-3 hours/week** by filtering AI spam from your feed
- **Protect your reputation** by avoiding engagement with low-quality AI content
- **Build authentic connections** by focusing on real human insights

### For Recruiters & Hiring Managers
- **Verify authenticity** of thought leadership from candidates
- **Assess genuine expertise** vs. AI-generated professional branding
- **Make better hiring decisions** with confidence in candidate authenticity

### For Content Creators
- **Benchmark your writing** against AI patterns to maintain authentic voice
- **Differentiate your content** in a sea of algorithmic posts
- **Maintain credibility** with your audience

---

## How It Works

**Simple 3-step workflow:**

1. **Select** - Click the extension icon, activate the post picker
2. **Analyze** - Click any LinkedIn post to analyze
3. **Decide** - Get instant AI likelihood (0-100%) with detected patterns

**Behind the scenes:**
- **Phrase Analysis** (40% weight) - Detects "delve into," "it's worth noting," and 50+ other AI tells
- **Structure Analysis** (30% weight) - Identifies perfect formatting, uniform bullets, systematic lists
- **Format Analysis** (20% weight) - Catches systematic emoji/hashtag patterns
- **Style Analysis** (10% weight) - Spots unnatural uniformity and missing human quirks

**Results you can trust:**
- 🟢 **0-33%** - Likely human-written
- 🟡 **34-66%** - Uncertain, mixed signals
- 🔴 **67-100%** - Likely AI-generated

---

## Key Features

### Privacy-First Design
- ✅ **Zero external API calls** - No OpenAI, no cloud services
- ✅ **Zero data collection** - No tracking, analytics, or telemetry
- ✅ **Zero data transmission** - Everything runs locally in your browser
- ✅ **Works offline** - Internet not required after installation

### Powerful Detection
- ✅ **Multi-language support** - English + Hebrew AI phrase detection
- ✅ **Four analysis methods** - Comprehensive pattern matching
- ✅ **Detailed breakdowns** - See exactly what triggered detection
- ✅ **Adjustable sensitivity** - Low/Medium/High to match your needs

### Professional UX
- ✅ **Instant results** - Sub-second analysis
- ✅ **Clean interface** - No clutter, just results
- ✅ **Keyboard shortcuts** - Coming soon
- ✅ **Fully customizable** - Control every aspect of detection

---

## Installation

### Option 1: Chrome Web Store (Recommended)
*Coming soon - pending review*

### Option 2: Install from Source

```bash
# Clone the repository
git clone https://github.com/TheMichael/LinkedIn-AI-Detector.git
cd LinkedIn-AI-Detector

# Load extension in Chrome
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the LinkedIn-AI-Detector directory
```

**Requirements:**
- Chrome 88+ or any Chromium-based browser
- Active LinkedIn account (obviously)

---

## Usage

### Quick Start

1. **Navigate to LinkedIn** - Open your LinkedIn feed
2. **Click extension icon** - Opens the detector popup
3. **Click "Select Post to Analyze"** - Activates picker mode
4. **Hover over any post** - Post highlights on hover
5. **Click to analyze** - Results appear instantly

### Understanding Results

**Likelihood Score**
- The main percentage (0-100%) indicates AI-generation probability
- Color-coded for quick scanning: Green (human), Yellow (uncertain), Red (AI)

**Detected Patterns**
- Shows specific red flags found in the content
- Examples: "AI-typical phrases detected," "Overly structured formatting"

**Detailed Breakdown** (optional, toggle in settings)
- Phrase Score: Common AI language patterns
- Structure Score: Formatting consistency and list patterns
- Format Score: Hashtag/emoji usage patterns
- Style Score: Sentence uniformity and writing quirks

### Customization

**Adjust Sensitivity:**
- **Low** - Fewer false positives, more conservative
- **Medium** - Balanced (recommended)
- **High** - Stricter detection, may flag human posts

**Toggle Detection Methods:**
- Disable any of the 4 analysis methods if they create false positives for your use case
- Useful for regional variations in writing style

**Display Preferences:**
- Show/hide detailed breakdown
- Show/hide confidence level
- Enable/disable analysis history

---

## Technical Details

### Detection Methods

**1. Phrase Analysis (40% weight)**
Scans for telltale AI phrases across three confidence tiers:
- High confidence: "delve into," "it is important to note," "tapestry of"
- Medium confidence: "leverage," "paradigm shift," "game-changer"
- Low confidence: "excited to announce," "thrilled to share"

**2. Structure Analysis (30% weight)**
Identifies unnatural formatting patterns:
- Perfect bullet counts (3-7 bullets = AI sweet spot)
- Numbered lists with 10+ items
- Uniform sub-structure (every section has exactly 3 bullets)
- Excessive special characters (→, •, etc.)

**3. Format Analysis (20% weight)**
Detects systematic usage:
- Hashtag clustering at post end
- Emoji count in the 2-8 range
- Perfect emoji-per-paragraph ratios

**4. Style Analysis (10% weight)**
Catches writing uniformity:
- Identical sentence lengths
- Zero typos or contractions
- Ultra-short bullet points (2-4 words each)

### Privacy & Security

**What we DON'T do:**
- ❌ No external API calls
- ❌ No data collection or storage
- ❌ No tracking or analytics
- ❌ No access to LinkedIn credentials
- ❌ No access to private messages or data

**What we DO:**
- ✅ Extract visible post text (only when you click it)
- ✅ Analyze text locally using JavaScript algorithms
- ✅ Display results only to you
- ✅ Store only your settings (sensitivity, preferences)

**Permissions explained:**
- `activeTab` - Read visible content from current LinkedIn tab
- `storage` - Save your settings preferences locally
- `scripting` - Inject the post picker interface
- `host_permissions` - Limited to linkedin.com only

### Architecture

```
Extension Type: Chrome Manifest V3
Primary Language: Vanilla JavaScript (zero dependencies)
Storage: Chrome Storage API (local only)
Processing: Client-side only
Data Flow: LinkedIn → Your Browser → Display (nothing leaves your device)
```

**File Structure:**
```
linkedin-ai-detector/
├── manifest.json           # Extension config
├── popup/                  # Main UI
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── content/                # LinkedIn integration
│   ├── selector.js         # Post picker
│   ├── analyzer.js         # Detection engine
│   └── content-styles.css
├── background/
│   └── service-worker.js   # Background tasks
└── settings/               # Settings page
    ├── settings.html
    ├── settings.js
    └── settings.css
```

---

## Development

### Building from Source

```bash
# Clone
git clone https://github.com/TheMichael/LinkedIn-AI-Detector.git
cd LinkedIn-AI-Detector

# No build step required - pure vanilla JS
# Just load unpacked in Chrome

# Testing
# 1. Generate 10 AI posts with ChatGPT
# 2. Find 10 authentic human posts
# 3. Analyze both sets
# 4. Expected: AI posts score 60-90%, human posts score 10-40%
```

### Contributing

Contributions welcome! Areas needing help:

**High Priority:**
- [ ] Improve detection accuracy with more AI phrase patterns
- [ ] Add support for more languages (Spanish, French, German, etc.)
- [ ] Reduce false positives for naturally structured human writing

**Nice to Have:**
- [ ] Keyboard shortcuts (analyze post under cursor)
- [ ] Batch analysis mode
- [ ] Export results to CSV
- [ ] Visual badges overlaid on analyzed posts

**Contribution Process:**
1. Fork repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## FAQ

**Q: How accurate is this?**
A: The detector provides probability estimates, not definitive proof. Accuracy varies by post type—highly structured listicles with AI phrases score very accurately, while short posts or edge cases may be harder to classify. Use results as one signal among many, not gospel truth.

**Q: Can this get me banned from LinkedIn?**
A: No. The extension only reads visible content you manually select—equivalent to copying/pasting text. No scraping, no automation, no ToS violations. You're analyzing one post at a time, by choice.

**Q: Does it work on comments?**
A: Yes! You can select and analyze any text element on LinkedIn—posts, comments, articles, even profile summaries.

**Q: What about false positives?**
A: They happen. Some humans naturally write in structured, formal styles that trigger AI patterns. That's why we show detailed breakdowns—you can see exactly what triggered the score and judge for yourself.

**Q: Why not use GPTZero or similar tools?**
A: Three reasons: (1) Privacy—they require sending data to external servers, (2) Speed—API calls add latency, (3) Control—you can't customize their algorithms or sensitivity.

**Q: Can I use this for hiring decisions?**
A: Use it as one data point, not a definitive test. If a candidate's thought leadership consistently scores 85%+ AI likelihood, that's worth investigating. But don't reject someone solely based on one high score.

---

## Roadmap

### v1.0 (Current)
- [x] Core detection engine with 4 analysis methods
- [x] Element picker for manual post selection
- [x] Customizable settings and sensitivity
- [x] Privacy-first architecture

### v1.1 (Next)
- [ ] Keyboard shortcuts
- [ ] Improved Hebrew language support
- [ ] Performance optimizations
- [ ] Chrome Web Store launch

### v2.0 (Future)
- [ ] Batch analysis mode (analyze multiple posts)
- [ ] Visual badges overlaid on LinkedIn feed
- [ ] Export analysis results to CSV/JSON
- [ ] Support for other social platforms (Twitter, Facebook)
- [ ] Custom phrase dictionaries (add your own AI tells)

---

## Legal & Disclaimers

**Not affiliated with LinkedIn:** This is an independent project. LinkedIn is a registered trademark of LinkedIn Corporation.

**Results are estimates:** AI detection is probabilistic, not deterministic. False positives and false negatives occur. Use results as guidance, not proof.

**For personal use:** This tool is for individual, educational, and research purposes. Not for commercial surveillance or bulk data collection.

**No warranties:** Provided as-is under MIT license. Use at your own discretion and risk.

---

## Support & Contact

- **Issues:** [GitHub Issues](https://github.com/TheMichael/LinkedIn-AI-Detector/issues)
- **Privacy Policy:** [View Policy](assets/privacy-policy.html)
- **License:** [MIT License](LICENSE)

---

## Acknowledgments

Built with frustration at LinkedIn's AI spam problem and a commitment to user privacy.

**Special thanks to:**
- The open-source community for Chrome extension development resources
- Early testers who provided feedback on detection accuracy
- Everyone fighting to keep the internet authentic

---

**If this tool helps you cut through the noise, star ⭐ this repo and share it with your network.**

**Built by humans, for humans. 🚫🤖**
