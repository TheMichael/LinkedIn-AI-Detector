# 🚀 Quick Start Guide - LinkedIn AI Post Detector

## Step 1: Create the Pull Request

Since you've pushed your code to branch `claude/linkedin-ai-detector-extension-01JmpZVdSxJZULzooMgdaGnL`, here's how to create a PR:

### Option A: Via GitHub Web Interface (Easiest)

1. **Go to your GitHub repository:**
   ```
   https://github.com/TheMichael/LinkedIn-AI-Detector
   ```

2. **You'll see a yellow banner** saying "Your recently pushed branches" with a button:
   - Click **"Compare & pull request"**

3. **If you don't see the banner:**
   - Click the **"Pull requests"** tab
   - Click **"New pull request"**
   - Set base branch to `main` (or your default branch)
   - Set compare branch to `claude/linkedin-ai-detector-extension-01JmpZVdSxJZULzooMgdaGnL`
   - Click **"Create pull request"**

4. **Fill in the PR details:**
   - **Title:** `LinkedIn AI Post Detector - Chrome Extension v1.0.0`
   - **Body:** Copy from `PR_BODY.md` (I created this file for you)
   - Click **"Create pull request"**

### Option B: Using Git Command Line

```bash
# If you have gh CLI installed:
gh pr create --fill
```

---

## Step 2: Install the Extension Locally

### A. Create the Icon Files (REQUIRED)

Navigate to the icons directory and create the PNG files:

```bash
cd /home/user/LinkedIn-AI-Detector/assets/icons

# Install Python Pillow library
pip install pillow

# Run the icon creation script
python3 create-placeholder-icons.py
```

**You should see:**
```
✓ Created icon16.png
✓ Created icon48.png
✓ Created icon128.png
Placeholder icons created successfully!
```

### B. Load the Extension in Chrome

1. **Open Google Chrome**

2. **Go to Extensions page:**
   - Type in address bar: `chrome://extensions/`
   - OR: Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode:**
   - Look for toggle switch in the **top-right corner**
   - Turn it **ON** (should turn blue/purple)

4. **Load the Extension:**
   - Click **"Load unpacked"** button (appears after enabling Developer mode)
   - Navigate to `/home/user/LinkedIn-AI-Detector`
   - Click **"Select Folder"** or **"Open"**

5. **Verify Installation:**
   - You should see **"LinkedIn AI Post Detector"** card in your extensions list
   - Status should show **"Enabled"**
   - Look for the extension icon in your Chrome toolbar
   - If you don't see the icon, click the puzzle piece 🧩 and pin it

---

## Step 3: Use the Extension

### First Time Setup

1. **Navigate to LinkedIn:**
   ```
   https://www.linkedin.com
   ```
   Make sure you're logged in!

2. **Click the Extension Icon:**
   - Look for the LinkedIn AI Detector icon in your toolbar
   - Click it to open the popup

3. **You should see:**
   - Title: "LinkedIn AI Detector"
   - Description about selecting posts
   - Big blue button: **"Select Post to Analyze"**
   - Settings gear icon (⚙️) in top-right

### Analyzing Your First Post

**Step-by-step:**

1. **Click "Select Post to Analyze"**
   - The popup will show "Click on a LinkedIn post to analyze..."
   - A semi-transparent overlay appears on the LinkedIn page

2. **Hover Over a LinkedIn Post**
   - Move your mouse over any post in your feed
   - You'll see a **blue border** highlight around the post
   - The element under your cursor will be highlighted

3. **Click the Post**
   - Click anywhere on the highlighted post
   - The overlay disappears
   - You'll see a loading spinner "Analyzing post..."

4. **View Results** (appears in ~0.5 seconds)
   - **Large percentage number** (0-100%)
   - **Color-coded circle:**
     - 🟢 Green (0-33%) = Likely human
     - 🟡 Yellow (34-66%) = Uncertain
     - 🔴 Red (67-100%) = Likely AI
   - **Confidence level:** Low/Medium/High
   - **Detected patterns:** List of what was found

5. **See Details (Optional):**
   - Click **"Show Detailed Breakdown"** to expand
   - View individual scores:
     - Phrases: X%
     - Structure: X%
     - Format: X%
     - Style: X%

6. **Analyze Another:**
   - Click **"Analyze Another Post"** button
   - Repeat the process!

### Keyboard Shortcuts

- **ESC key** - Cancel element picker (when overlay is active)

### Tips for Best Results

✅ **DO:**
- Select the entire post container (including text and author)
- Wait for LinkedIn to fully load before analyzing
- Try analyzing 5-10 posts to get a feel for it
- Test on posts you know are AI vs human

❌ **DON'T:**
- Click on ads or sponsored content
- Select just a headline or snippet
- Expect 100% accuracy (these are estimations!)
- Select comments or reply sections

---

## Step 4: Customize Settings

1. **Open Settings:**
   - Click the ⚙️ gear icon in the popup
   - OR right-click extension icon → "Options"

2. **Adjust Detection Sensitivity:**
   - **Low:** More lenient, fewer false positives
   - **Medium:** Balanced (default)
   - **High:** Stricter, catches more AI

3. **Toggle Detection Methods:**
   - ✅ Phrase Analysis
   - ✅ Structure Analysis
   - ✅ Format Analysis
   - ✅ Style Analysis

   *Uncheck to disable specific methods*

4. **Display Preferences:**
   - ✅ Show Detailed Breakdown
   - ✅ Show Confidence Level

5. **Enable History (Optional):**
   - ✅ Keep Analysis History
   - Stores last 10 analyses locally
   - View and clear from settings page

6. **Save Settings:**
   - Click **"Save Settings"** button
   - You'll see "Settings saved successfully!"

---

## Step 5: Understanding Results

### What Do The Scores Mean?

**0-33% (Green Circle) - Likely Human**
- Natural language variation
- Personal anecdotes
- Informal tone
- Minor typos or grammar quirks
- Inconsistent formatting

**34-66% (Yellow Circle) - Uncertain**
- Mixed signals
- Could be well-edited AI or professional human
- Some AI patterns present
- Not enough indicators either way

**67-100% (Red Circle) - Likely AI**
- Multiple AI-typical phrases
- Perfect formatting and structure
- Systematic hashtag/emoji use
- Very uniform writing style
- No typos or natural variation

### Detected Patterns Explained

- **"AI-typical phrases detected"** - Found phrases like "delve into", "it's worth noting"
- **"Overly structured formatting"** - Perfect bullet points, numbered lists
- **"Systematic hashtag/emoji usage"** - Too perfect, pattern-like placement
- **"Uniform writing style"** - All sentences same length, no typos
- **"Extensive use of bullet points"** - 5+ bullet points
- **"High hashtag density"** - 10+ hashtags
- **"Classic AI phrases present"** - Signature AI phrases detected

### Confidence Levels

- **High:** Strong indicators present, very confident in the score
- **Medium:** Moderate indicators, reasonable confidence
- **Low:** Weak or mixed signals, less confident

---

## Common Use Cases

### 1. Checking Job Applicants
- Analyze posts from candidates' LinkedIn profiles
- Look for authentic vs AI-generated content
- Balance with other evaluation methods

### 2. Competitive Research
- See if competitors are using AI for content
- Analyze patterns in their posting strategy
- Don't rely solely on this tool!

### 3. Content Review
- Check your own AI-assisted posts
- See what triggers AI detection
- Edit to make more human-like if desired

### 4. Curiosity & Research
- Explore AI trends on LinkedIn
- See how prevalence changes over time
- Educational purposes

---

## Troubleshooting

### Extension Won't Load
**Problem:** "Manifest file is missing or unreadable"
**Solution:**
```bash
cd /home/user/LinkedIn-AI-Detector
cat manifest.json  # Verify it exists and is valid JSON
```

**Problem:** "Could not load icon 'assets/icons/icon16.png'"
**Solution:** Create the icons (see Step 2A above)

### Picker Doesn't Activate
**Problem:** Nothing happens when clicking "Select Post to Analyze"
**Solution:**
- Refresh the LinkedIn page
- Check you're actually on linkedin.com
- Open DevTools (F12) and check Console for errors
- Try reloading the extension in chrome://extensions/

### "Text too short" Error
**Problem:** Getting error after selecting post
**Solution:**
- Select a larger area (the whole post container)
- Make sure post has at least 20 characters
- Try clicking the main text area, not just the author section

### Results Always Show 0% or 100%
**Problem:** Scores seem extreme
**Solution:**
- Check Settings → Detection Methods (make sure some are enabled)
- Try adjusting sensitivity
- Test on posts you know are human/AI to calibrate

### Settings Don't Save
**Problem:** Changes revert after closing
**Solution:**
- Click "Save Settings" button (don't just close the page)
- Check Chrome storage permissions
- Try clearing extension data and reinstalling

---

## Advanced Tips

### Testing the Accuracy

Create a test set:

1. **AI Posts (Should score 60-90%):**
   - Go to ChatGPT
   - Prompt: "Write a LinkedIn post about [topic] in professional style"
   - Copy to a LinkedIn draft or document
   - Use extension to analyze

2. **Human Posts (Should score 10-40%):**
   - Find informal, personal posts from real people
   - Look for posts with typos, casual language
   - Analyze these

3. **Compare Results:**
   - Does the extension distinguish correctly?
   - Adjust sensitivity in settings if needed

### Creating Better Icons

The placeholder icons work, but you can create custom ones:

1. Edit `assets/icons/icon.svg` in a vector editor
2. Export as 16x16, 48x48, 128x128 PNGs
3. Replace the placeholder files
4. Reload extension

### Viewing Debug Info

**Popup Console:**
```
Right-click popup → Inspect → Console tab
```

**Background Worker:**
```
chrome://extensions/ → "service worker" link → Console
```

**Content Script:**
```
Open DevTools on LinkedIn page (F12) → Console
Look for messages from the extension
```

---

## Next Steps

### After Testing

1. **Share Feedback:**
   - What works well?
   - What needs improvement?
   - False positives/negatives?

2. **Customize:**
   - Adjust settings based on your use case
   - Experiment with sensitivity levels
   - Enable/disable specific methods

3. **Contribute:**
   - Found a bug? Open an issue
   - Have an idea? Suggest a feature
   - Want to improve? Submit a PR!

---

## Support

**Found an issue?**
- Check this guide first
- Read INSTALL.md and README.md
- Open an issue on GitHub

**Want to contribute?**
- Read CONTRIBUTING.md
- Fork and create a PR
- Follow the code style

**Privacy concerns?**
- Read assets/privacy-policy.html
- All processing is client-side
- Zero data collection

---

## Enjoy! 🎉

You now have a fully functional LinkedIn AI Post Detector!

**Remember:** Results are estimations, not proof. Use responsibly and ethically.

Happy analyzing! 🔍🤖
