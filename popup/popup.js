// State management
let currentState = 'initial';

// DOM elements
const states = {
  initial: document.getElementById('initialState'),
  selection: document.getElementById('selectionState'),
  analyzing: document.getElementById('analyzingState'),
  results: document.getElementById('resultsState'),
  error: document.getElementById('errorState')
};

const buttons = {
  selectPost: document.getElementById('selectPostBtn'),
  settings: document.getElementById('settingsBtn'),
  analyzeAnother: document.getElementById('analyzeAnotherBtn'),
  tryAgain: document.getElementById('tryAgainBtn'),
  toggleBreakdown: document.getElementById('toggleBreakdown')
};

const results = {
  likelihoodValue: document.getElementById('likelihoodValue'),
  likelihoodCircle: null, // Will be set dynamically
  confidenceValue: document.getElementById('confidenceValue'),
  patternsList: document.getElementById('patternsList'),
  phrasesBar: document.getElementById('phrasesBar'),
  phrasesValue: document.getElementById('phrasesValue'),
  structureBar: document.getElementById('structureBar'),
  structureValue: document.getElementById('structureValue'),
  formatBar: document.getElementById('formatBar'),
  formatValue: document.getElementById('formatValue'),
  styleBar: document.getElementById('styleBar'),
  styleValue: document.getElementById('styleValue'),
  breakdownContent: document.getElementById('breakdownContent')
};

const errorMessage = document.getElementById('errorMessage');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  setupEventListeners();
  checkLinkedInTab();
  checkForResults();
});

// Setup event listeners
function setupEventListeners() {
  buttons.selectPost.addEventListener('click', startPicker);
  buttons.settings.addEventListener('click', openSettings);
  buttons.analyzeAnother.addEventListener('click', resetToInitial);
  buttons.tryAgain.addEventListener('click', resetToInitial);
  buttons.toggleBreakdown.addEventListener('click', toggleBreakdown);
}

// Check if current tab is LinkedIn
function checkLinkedInTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      const url = tabs[0].url || '';
      if (!url.includes('linkedin.com')) {
        showError('This extension only works on LinkedIn. Please navigate to linkedin.com.');
        buttons.selectPost.disabled = true;
      }
    }
  });
}

// Check for stored results from recent analysis
function checkForResults() {
  chrome.storage.local.get(['latestResults'], (data) => {
    if (data.latestResults) {
      // Show results immediately
      displayResults(data.latestResults);
      // Clear the stored results
      chrome.storage.local.remove(['latestResults']);
    }
  });
}

// State management functions
function setState(state) {
  // Hide all states
  Object.values(states).forEach(el => el.classList.remove('active'));

  // Show current state
  if (states[state]) {
    states[state].classList.add('active');
    currentState = state;
  }
}

function resetToInitial() {
  setState('initial');
  buttons.selectPost.disabled = false;
}

// Start element picker
function startPicker() {
  buttons.selectPost.disabled = true;
  setState('selection');

  // Send message to content script to activate picker
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startPicker' }, (response) => {
        if (chrome.runtime.lastError) {
          showError('Failed to activate picker. Please refresh the LinkedIn page and try again.');
          resetToInitial();
        }
      });
    }
  });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'pickerCancelled') {
    resetToInitial();
  } else if (message.action === 'analyzeText') {
    setState('analyzing');
    setTimeout(() => {
      displayResults(message.results);
    }, 500); // Small delay for better UX
  } else if (message.action === 'error') {
    showError(message.error);
  }
  sendResponse({ received: true });
});

// Display analysis results
function displayResults(analysisResults) {
  if (!analysisResults) {
    showError('No results received. Please try again.');
    return;
  }

  const { likelihood, confidence, patterns, breakdown } = analysisResults;

  // Update likelihood value
  results.likelihoodValue.textContent = `${likelihood}%`;

  // Update circle color based on likelihood
  const circle = document.querySelector('.likelihood-circle');
  circle.classList.remove('human', 'uncertain', 'ai');
  if (likelihood <= 33) {
    circle.classList.add('human');
  } else if (likelihood <= 66) {
    circle.classList.add('uncertain');
  } else {
    circle.classList.add('ai');
  }

  // Load settings to check what to display
  chrome.storage.sync.get(['settings'], (data) => {
    const settings = data.settings || getDefaultSettings();

    // Update confidence (if enabled)
    if (settings.showConfidence) {
      results.confidenceValue.textContent = confidence;
      document.getElementById('confidenceSection').style.display = 'block';
    } else {
      document.getElementById('confidenceSection').style.display = 'none';
    }

    // Update patterns list
    results.patternsList.innerHTML = '';
    if (patterns && patterns.length > 0) {
      patterns.forEach(pattern => {
        const li = document.createElement('li');
        li.textContent = pattern;
        results.patternsList.appendChild(li);
      });
      document.getElementById('patternsSection').style.display = 'block';
    } else {
      const li = document.createElement('li');
      li.textContent = 'No specific patterns detected';
      results.patternsList.appendChild(li);
    }

    // Update breakdown (if enabled)
    if (settings.showBreakdown && breakdown) {
      updateBreakdown(breakdown);
      document.getElementById('breakdownSection').style.display = 'block';
    } else {
      document.getElementById('breakdownSection').style.display = 'none';
    }

    // Show results state
    setState('results');
  });
}

// Update breakdown bars
function updateBreakdown(breakdown) {
  results.phrasesBar.style.width = `${breakdown.phrases}%`;
  results.phrasesValue.textContent = `${breakdown.phrases}%`;

  results.structureBar.style.width = `${breakdown.structure}%`;
  results.structureValue.textContent = `${breakdown.structure}%`;

  results.formatBar.style.width = `${breakdown.format}%`;
  results.formatValue.textContent = `${breakdown.format}%`;

  results.styleBar.style.width = `${breakdown.style}%`;
  results.styleValue.textContent = `${breakdown.style}%`;
}

// Toggle breakdown section
function toggleBreakdown() {
  const content = results.breakdownContent;
  const toggle = buttons.toggleBreakdown;

  if (content.classList.contains('show')) {
    content.classList.remove('show');
    toggle.classList.remove('expanded');
  } else {
    content.classList.add('show');
    toggle.classList.add('expanded');
  }
}

// Show error
function showError(message) {
  errorMessage.textContent = message;
  setState('error');
}

// Open settings page
function openSettings() {
  chrome.runtime.openOptionsPage();
}

// Load settings
function loadSettings() {
  chrome.storage.sync.get(['settings'], (data) => {
    if (!data.settings) {
      // Set default settings if none exist
      chrome.storage.sync.set({ settings: getDefaultSettings() });
    }
  });
}

// Default settings
function getDefaultSettings() {
  return {
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
}
