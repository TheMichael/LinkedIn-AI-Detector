# Contributing to LinkedIn AI Post Detector

Thank you for your interest in contributing to the LinkedIn AI Post Detector! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Chrome version and OS

### Suggesting Features

Feature suggestions are welcome! Please:
- Check existing issues first
- Provide clear use case
- Explain why the feature would be valuable
- Consider privacy and performance implications

### Code Contributions

#### Getting Started

1. **Fork the repository**
   ```bash
   git fork https://github.com/yourusername/linkedin-ai-detector.git
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/linkedin-ai-detector.git
   cd linkedin-ai-detector
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Set up development environment**
   - Create icon files (see assets/icons/README.md)
   - Load unpacked extension in Chrome
   - Make your changes

#### Development Guidelines

**Code Style:**
- Use 2 spaces for indentation
- Use descriptive variable names
- Comment complex logic
- Keep functions small and focused
- Follow existing code patterns

**File Organization:**
- Keep related functionality together
- Don't create unnecessary files
- Update manifest.json if adding new files

**Privacy First:**
- NO external API calls
- NO data collection
- NO tracking or analytics
- All processing must be client-side

**Testing:**
- Test on actual LinkedIn posts
- Test error cases
- Test on different screen sizes
- Verify no console errors

#### Commit Messages

Use clear, descriptive commit messages:
```
Add feature: Brief description

Longer explanation if needed.
- Bullet points for details
- Multiple lines okay
```

Good examples:
- `Fix: Element picker not working on article pages`
- `Add: Support for detecting additional AI phrases`
- `Improve: Text extraction accuracy for nested posts`

Bad examples:
- `fix bug`
- `updates`
- `changes`

#### Pull Request Process

1. **Update documentation**
   - Update README.md if needed
   - Add comments to complex code
   - Update CHANGELOG if we add one

2. **Test thoroughly**
   - Test your changes
   - Verify no regressions
   - Check console for errors

3. **Create pull request**
   - Fill out PR template
   - Link related issues
   - Describe changes clearly
   - Add screenshots if UI changes

4. **Respond to feedback**
   - Address review comments
   - Make requested changes
   - Be open to suggestions

## Areas for Contribution

### High Priority
- Improve detection algorithm accuracy
- Add support for more languages
- Better icon designs
- Comprehensive testing suite

### Medium Priority
- Performance optimizations
- Better error handling
- Accessibility improvements
- Documentation improvements

### Low Priority (Future)
- Export functionality
- Batch analysis mode
- Keyboard shortcuts
- Custom phrase dictionaries

## Development Tips

### Testing AI Detection

Create test cases:
```javascript
// Test with AI-generated content
const aiPost = "I'm excited to delve into the innovative landscape...";
const result = analyzeText(aiPost);
console.log(result); // Should be high score

// Test with human content
const humanPost = "Just shipped a new feature! Check it out 🚀";
const result2 = analyzeText(humanPost);
console.log(result2); // Should be low score
```

### Debugging

**Popup:**
- Right-click popup → Inspect

**Background Service Worker:**
- chrome://extensions → Click "service worker" link

**Content Scripts:**
- Open DevTools on LinkedIn page
- Check Console tab

**Storage:**
```javascript
// View stored data
chrome.storage.sync.get(null, (items) => console.log(items));
```

### Common Issues

**Extension won't load:**
- Check manifest.json syntax
- Verify all files exist
- Check for console errors

**Picker doesn't work:**
- Ensure content scripts are injected
- Check for JavaScript errors
- Verify LinkedIn page is fully loaded

**Analysis errors:**
- Test text extraction separately
- Log intermediate results
- Check for edge cases

## What NOT to Contribute

Please avoid:
- External API integrations
- Data collection features
- Analytics or tracking
- Overly complex algorithms
- Breaking privacy guarantees
- Features that violate LinkedIn ToS

## Questions?

If you have questions:
- Check existing issues and discussions
- Read the README thoroughly
- Open a discussion (not an issue) for questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README.md (Contributors section)
- Release notes
- Extension credits

Thank you for contributing! 🎉
