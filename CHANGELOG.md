# Changelog

All notable changes to the LinkedIn AI Post Detector extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Multi-language support
- Export results to CSV/JSON
- Batch analysis mode
- Keyboard shortcuts
- Custom phrase dictionaries
- Visual badges on analyzed posts
- Comparison mode

## [1.0.0] - 2024-12-13

### Added
- Initial release of LinkedIn AI Post Detector
- Element picker interface for selecting LinkedIn posts
- Client-side AI detection engine with four analysis methods:
  - Phrase Analysis (40% weight)
  - Structure Analysis (30% weight)
  - Format Analysis (20% weight)
  - Style Analysis (10% weight)
- Real-time analysis results with likelihood percentage (0-100%)
- Confidence level indicator (Low/Medium/High)
- Detailed pattern detection and breakdown
- Settings page with customization options:
  - Detection sensitivity adjustment (Low/Medium/High)
  - Individual detection method toggles
  - Display preference controls
  - Optional analysis history (last 10 analyses)
- Privacy-focused design:
  - 100% client-side processing
  - Zero data collection
  - No external API calls
  - No tracking or analytics
- Chrome Manifest V3 compliance
- Responsive popup interface with color-coded results
- Comprehensive privacy policy
- Complete documentation (README, INSTALL, CONTRIBUTING)
- MIT License

### Features
- Manual post selection using intuitive element picker
- Hover highlighting for target posts
- ESC key to cancel selection
- Visual results with color coding:
  - Green (0-33%): Likely human-written
  - Yellow (34-66%): Uncertain
  - Red (67-100%): Likely AI-generated
- Collapsible detailed breakdown section
- Settings persistence using Chrome storage
- Error handling with user-friendly messages
- Works on all LinkedIn page types (feed, articles, etc.)

### Technical
- Manifest V3 compliance
- Background service worker for message coordination
- Content scripts for LinkedIn page interaction
- Minimal permissions (activeTab, storage, scripting)
- SVG icon source with conversion scripts
- Vanilla JavaScript (no external dependencies)
- Modular code structure
- Comprehensive inline documentation

### Documentation
- Complete README with features, usage, and FAQ
- Step-by-step installation guide (INSTALL.md)
- Contributing guidelines (CONTRIBUTING.md)
- Privacy policy (privacy-policy.html)
- Code comments throughout

### Known Limitations
- English language only
- Requires manual icon creation before first load
- Single post analysis only (no batch mode)
- No export functionality
- Results are estimations, not definitive proof

## Version History

### Versioning Scheme
- **Major.Minor.Patch** (e.g., 1.0.0)
- **Major**: Breaking changes or major new features
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes and minor improvements

### Release Channels
- **Stable**: Chrome Web Store releases
- **Development**: GitHub releases
- **Beta**: Pre-release versions (tagged with -beta suffix)

## Upgrade Notes

### Upgrading to 1.0.0
- Initial release - no upgrade needed
- First-time installation only

## Deprecation Notices

None at this time.

---

## Release Checklist (For Maintainers)

Before releasing a new version:

- [ ] Update version number in manifest.json
- [ ] Update CHANGELOG.md with new changes
- [ ] Test all features thoroughly
- [ ] Run on actual LinkedIn posts
- [ ] Check console for errors
- [ ] Verify privacy policy is current
- [ ] Update README if needed
- [ ] Create Git tag with version number
- [ ] Build and test .crx file
- [ ] Submit to Chrome Web Store (if stable)
- [ ] Create GitHub release with notes

## Feedback

Found a bug or have a feature request?
[Open an issue on GitHub](https://github.com/yourusername/linkedin-ai-detector/issues)

---

*This changelog follows the Keep a Changelog format for easy version tracking and release management.*
