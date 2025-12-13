// Settings page JavaScript

// DOM elements
const sensitivitySlider = document.getElementById('sensitivitySlider');
const sensitivityDisplay = document.getElementById('sensitivityDisplay');
const enablePhrases = document.getElementById('enablePhrases');
const enableStructure = document.getElementById('enableStructure');
const enableFormat = document.getElementById('enableFormat');
const enableStyle = document.getElementById('enableStyle');
const showBreakdown = document.getElementById('showBreakdown');
const showConfidence = document.getElementById('showConfidence');
const keepHistory = document.getElementById('keepHistory');
const historySection = document.getElementById('historySection');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const saveStatus = document.getElementById('saveStatus');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  setupEventListeners();
  loadHistory();
});

// Setup event listeners
function setupEventListeners() {
  sensitivitySlider.addEventListener('input', updateSensitivityDisplay);
  keepHistory.addEventListener('change', toggleHistorySection);
  saveBtn.addEventListener('click', saveSettings);
  resetBtn.addEventListener('click', resetSettings);
  clearHistoryBtn.addEventListener('click', clearHistory);
}

// Update sensitivity display
function updateSensitivityDisplay() {
  const value = parseInt(sensitivitySlider.value);
  const labels = ['Low', 'Medium', 'High'];
  sensitivityDisplay.textContent = labels[value - 1];
}

// Toggle history section visibility
function toggleHistorySection() {
  if (keepHistory.checked) {
    historySection.style.display = 'block';
  } else {
    historySection.style.display = 'none';
  }
}

// Load settings from storage
function loadSettings() {
  chrome.storage.sync.get(['settings'], (data) => {
    if (data.settings) {
      const settings = data.settings;

      // Set sensitivity
      const sensitivityMap = { 'low': 1, 'medium': 2, 'high': 3 };
      sensitivitySlider.value = sensitivityMap[settings.sensitivity] || 2;
      updateSensitivityDisplay();

      // Set detection methods
      enablePhrases.checked = settings.enabledMethods.phrases ?? true;
      enableStructure.checked = settings.enabledMethods.structure ?? true;
      enableFormat.checked = settings.enabledMethods.format ?? true;
      enableStyle.checked = settings.enabledMethods.style ?? true;

      // Set display preferences
      showBreakdown.checked = settings.showBreakdown ?? true;
      showConfidence.checked = settings.showConfidence ?? true;

      // Set history preference
      keepHistory.checked = settings.keepHistory ?? false;
      toggleHistorySection();
    } else {
      // Load defaults
      updateSensitivityDisplay();
      toggleHistorySection();
    }
  });
}

// Save settings
function saveSettings() {
  const sensitivityMap = { 1: 'low', 2: 'medium', 3: 'high' };

  const settings = {
    sensitivity: sensitivityMap[parseInt(sensitivitySlider.value)],
    enabledMethods: {
      phrases: enablePhrases.checked,
      structure: enableStructure.checked,
      format: enableFormat.checked,
      style: enableStyle.checked
    },
    showBreakdown: showBreakdown.checked,
    showConfidence: showConfidence.checked,
    keepHistory: keepHistory.checked
  };

  chrome.storage.sync.set({ settings: settings }, () => {
    if (chrome.runtime.lastError) {
      showSaveStatus('Error saving settings. Please try again.', 'error');
    } else {
      showSaveStatus('Settings saved successfully!', 'success');

      // If history is disabled, clear it
      if (!settings.keepHistory) {
        chrome.storage.local.remove(['history']);
        historyList.innerHTML = '<p class="empty-state">No analyses yet</p>';
      }
    }
  });
}

// Reset to default settings
function resetSettings() {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
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
      loadSettings();
      showSaveStatus('Settings reset to defaults', 'success');
    });
  }
}

// Show save status message
function showSaveStatus(message, type) {
  saveStatus.textContent = message;
  saveStatus.className = `save-status ${type} show`;

  setTimeout(() => {
    saveStatus.classList.remove('show');
  }, 3000);
}

// Load history
function loadHistory() {
  chrome.storage.local.get(['history'], (data) => {
    if (data.history && data.history.length > 0) {
      displayHistory(data.history);
    }
  });
}

// Display history
function displayHistory(history) {
  historyList.innerHTML = '';

  if (history.length === 0) {
    historyList.innerHTML = '<p class="empty-state">No analyses yet</p>';
    return;
  }

  history.reverse().forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';

    const score = item.likelihood;
    let scoreClass = 'uncertain';
    if (score <= 33) scoreClass = 'human';
    else if (score >= 67) scoreClass = 'ai';

    historyItem.innerHTML = `
      <div class="history-score ${scoreClass}">${score}%</div>
      <div class="history-details">
        <div class="history-text">${item.text.substring(0, 80)}${item.text.length > 80 ? '...' : ''}</div>
        <div class="history-date">${new Date(item.timestamp).toLocaleString()}</div>
      </div>
    `;

    historyList.appendChild(historyItem);
  });
}

// Clear history
function clearHistory() {
  if (confirm('Are you sure you want to clear your analysis history?')) {
    chrome.storage.local.set({ history: [] }, () => {
      historyList.innerHTML = '<p class="empty-state">No analyses yet</p>';
      showSaveStatus('History cleared', 'success');
    });
  }
}

// Refresh history every few seconds if section is visible
setInterval(() => {
  if (historySection.style.display !== 'none') {
    loadHistory();
  }
}, 5000);
