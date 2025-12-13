// Element picker state
let pickerActive = false;
let overlay = null;
let highlightedElement = null;
let currentHighlight = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startPicker') {
    activateElementPicker();
    sendResponse({ status: 'activated' });
  }
  return true;
});

// Activate element picker
function activateElementPicker() {
  if (pickerActive) return;

  pickerActive = true;
  createOverlay();
  attachEventListeners();
}

// Create overlay
function createOverlay() {
  overlay = document.createElement('div');
  overlay.id = 'linkedin-ai-detector-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999999;
    cursor: crosshair;
    pointer-events: none;
  `;

  // Add instruction text
  const instruction = document.createElement('div');
  instruction.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 15px 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    z-index: 1000000;
    pointer-events: none;
  `;
  instruction.textContent = 'Click on a LinkedIn post to analyze (Press ESC to cancel)';

  overlay.appendChild(instruction);
  document.body.appendChild(overlay);

  // Prevent scrolling while picker is active
  document.body.style.overflow = 'hidden';
}

// Attach event listeners
function attachEventListeners() {
  document.addEventListener('mouseover', handleMouseOver, true);
  document.addEventListener('mouseout', handleMouseOut, true);
  document.addEventListener('click', handleClick, true);
  document.addEventListener('keydown', handleKeyDown, true);
}

// Remove event listeners
function removeEventListeners() {
  document.removeEventListener('mouseover', handleMouseOver, true);
  document.removeEventListener('mouseout', handleMouseOut, true);
  document.removeEventListener('click', handleClick, true);
  document.removeEventListener('keydown', handleKeyDown, true);
}

// Handle mouse over
function handleMouseOver(e) {
  if (!pickerActive || !overlay) return;

  // Don't highlight the overlay itself
  if (e.target === overlay || overlay.contains(e.target)) return;

  // Remove previous highlight
  if (currentHighlight) {
    currentHighlight.remove();
  }

  highlightedElement = e.target;

  // Create highlight box
  const rect = highlightedElement.getBoundingClientRect();
  currentHighlight = document.createElement('div');
  currentHighlight.style.cssText = `
    position: fixed;
    top: ${rect.top}px;
    left: ${rect.left}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    border: 3px solid #0a66c2;
    pointer-events: none;
    z-index: 1000001;
    box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.2);
  `;

  document.body.appendChild(currentHighlight);
}

// Handle mouse out
function handleMouseOut(e) {
  if (!pickerActive) return;
  // Highlight will be removed on next mouseover
}

// Handle click
function handleClick(e) {
  if (!pickerActive || !overlay) return;

  e.preventDefault();
  e.stopPropagation();

  // Don't process clicks on overlay
  if (e.target === overlay || overlay.contains(e.target)) return;

  const clickedElement = highlightedElement || e.target;

  // Validate element
  if (validateElement(clickedElement)) {
    // Extract text and analyze
    const text = extractPostText(clickedElement);

    if (text && text.length >= 20) {
      // Deactivate picker
      deactivatePicker();

      // Analyze the text (call analyzer.js function)
      if (typeof analyzeText === 'function') {
        const results = analyzeText(text);
        // Send results to popup
        chrome.runtime.sendMessage({
          action: 'analyzeText',
          results: results
        });
      } else {
        chrome.runtime.sendMessage({
          action: 'error',
          error: 'Analysis engine not loaded. Please refresh the page.'
        });
      }
    } else {
      deactivatePicker();
      chrome.runtime.sendMessage({
        action: 'error',
        error: 'Selected content is too short to analyze. Please select a full post with at least 20 characters.'
      });
    }
  } else {
    deactivatePicker();
    chrome.runtime.sendMessage({
      action: 'error',
      error: 'Selected element does not appear to be a LinkedIn post. Please select a post from the feed.'
    });
  }
}

// Handle keyboard events
function handleKeyDown(e) {
  if (!pickerActive) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    deactivatePicker();
    chrome.runtime.sendMessage({ action: 'pickerCancelled' });
  }
}

// Deactivate picker
function deactivatePicker() {
  pickerActive = false;

  // Remove overlay
  if (overlay) {
    overlay.remove();
    overlay = null;
  }

  // Remove highlight
  if (currentHighlight) {
    currentHighlight.remove();
    currentHighlight = null;
  }

  // Restore scrolling
  document.body.style.overflow = '';

  // Remove event listeners
  removeEventListeners();

  highlightedElement = null;
}

// Validate element is a LinkedIn post
function validateElement(element) {
  if (!element) return false;

  // Check if element or its parents have LinkedIn post indicators
  let current = element;
  let depth = 0;
  const maxDepth = 10;

  while (current && depth < maxDepth) {
    // Check for common LinkedIn post container classes/attributes
    const className = current.className || '';
    const classList = typeof className === 'string' ? className : className.toString();

    // LinkedIn post containers typically have these patterns
    if (
      classList.includes('feed-shared-update-v2') ||
      classList.includes('occludable-update') ||
      classList.includes('scaffold-finite-scroll__content') ||
      current.hasAttribute('data-id') ||
      current.hasAttribute('data-urn')
    ) {
      return true;
    }

    current = current.parentElement;
    depth++;
  }

  // If we didn't find specific classes, check for post-like content
  const text = element.innerText || element.textContent || '';
  return text.length >= 20;
}

// Extract text from post element
function extractPostText(element) {
  if (!element) return '';

  // Clone element to avoid modifying DOM
  const clone = element.cloneNode(true);

  // Remove unwanted elements
  const removeSelectors = [
    'button',
    'svg',
    'img',
    'video',
    'iframe',
    '[role="button"]',
    'nav',
    'header.feed-shared-update-v2__control-menu',
    '.feed-shared-social-action-bar',
    '.feed-shared-social-counts',
    '.social-details-social-counts',
    '.feed-shared-actor__meta',
    '.feed-shared-actor__description',
    '.update-components-actor__description',
    '.comment',
    '.comments-comments-list',
    '.feed-shared-update-v2__comments-container'
  ];

  removeSelectors.forEach(selector => {
    const elements = clone.querySelectorAll(selector);
    elements.forEach(el => {
      if (el && el.parentNode) {
        el.remove();
      }
    });
  });

  // Extract text
  let text = clone.innerText || clone.textContent || '';

  // Clean and normalize
  text = text
    .trim()
    .replace(/\s+/g, ' ')           // Normalize whitespace
    .replace(/\n\s*\n/g, '\n')      // Remove multiple newlines
    .replace(/\t+/g, ' ');          // Remove tabs

  return text;
}
