// Background Service Worker for LinkedIn AI Detector
// Coordinates messages between popup and content scripts

// Initialize extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings on first install
    const defaultSettings = {
      sensitivity: 'medium',
      enabledMethods: {
        phrases: true,
        structure: true,
        format: true,
        style: true
      },
      showBreakdown: true,
      showConfidence: true,
      keepHistory: false
    };

    chrome.storage.sync.set({ settings: defaultSettings }, () => {
      console.log('LinkedIn AI Detector: Default settings initialized');
    });

    // Open welcome page or options page (optional)
    // chrome.runtime.openOptionsPage();
  } else if (details.reason === 'update') {
    console.log('LinkedIn AI Detector: Extension updated to version', chrome.runtime.getManifest().version);
  }
});

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);

  // Forward messages between popup and content script
  if (message.action === 'activatePicker') {
    // Forward to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'startPicker' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message to content script:', chrome.runtime.lastError);
          }
        });
      }
    });
    sendResponse({ status: 'forwarded' });
  } else if (message.action === 'analyzeText') {
    // Message from content script with analysis results
    // This is already handled by direct messaging to popup
    // But we can log it here for debugging
    console.log('Analysis complete:', message.results);
  } else if (message.action === 'pickerCancelled') {
    console.log('Picker was cancelled by user');
  } else if (message.action === 'error') {
    console.error('Error from content script:', message.error);
  }

  return true; // Keep message channel open for async responses
});

// Handle extension icon click (optional - already handled by default_popup)
chrome.action.onClicked.addListener((tab) => {
  // This won't fire if default_popup is set in manifest
  // But keeping it here for reference
  console.log('Extension icon clicked on tab:', tab.id);
});

// Listen for tab updates to check if we're on LinkedIn
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isLinkedIn = tab.url.includes('linkedin.com');

    // Update icon based on whether we're on LinkedIn
    if (isLinkedIn) {
      chrome.action.setIcon({
        tabId: tabId,
        path: {
          16: 'assets/icons/icon16.png',
          48: 'assets/icons/icon48.png',
          128: 'assets/icons/icon128.png'
        }
      });
      chrome.action.setTitle({
        tabId: tabId,
        title: 'LinkedIn AI Post Detector - Click to analyze posts'
      });
    } else {
      // Optional: Use a disabled/grayed out icon for non-LinkedIn pages
      chrome.action.setTitle({
        tabId: tabId,
        title: 'LinkedIn AI Post Detector - Only works on LinkedIn'
      });
    }
  }
});

// Handle storage changes (for debugging)
chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log('Storage changed in', areaName, ':', changes);
});

// Utility function to log errors
function logError(context, error) {
  console.error(`[LinkedIn AI Detector] ${context}:`, error);
}

console.log('LinkedIn AI Detector service worker loaded');
