// AI Detection Engine
// This file contains all the algorithms for detecting AI-generated content

// High-confidence AI phrases
const highAIPhrases = [
  'delve into',
  'it is important to note',
  'it\'s worth noting',
  'in conclusion',
  'in summary',
  'dive deep into',
  'let\'s explore',
  'it\'s crucial to understand',
  'as we navigate',
  'landscape of',
  'realm of',
  'tapestry of',
  'journey of',
  'intricate dance',
  'multifaceted',
  'holistic approach',
  'it\'s important to',
  'plays a crucial role',
  'serves as a testament',
  'in today\'s fast-paced world',
  'in this ever-evolving',
  'moreover',
  'furthermore',
  'consequently',
  'it\'s essential to',
  'one cannot overstate',
  'underscores the importance',
  'serves to illustrate',
  'pivotal moment',
  'transformative journey'
];

// Medium-confidence AI phrases
const mediumAIPhrases = [
  'leverage',
  'utilize',
  'facilitate',
  'optimize',
  'streamline',
  'game-changer',
  'game changer',
  'paradigm shift',
  'cutting-edge',
  'innovative solution',
  'revolutionary',
  'transformative',
  'synergy',
  'ecosystem',
  'thought leader',
  'circle back',
  'moving forward',
  'at the end of the day',
  'value proposition',
  'best practices',
  'key takeaway',
  'deep dive',
  'robust',
  'seamless',
  'dynamic',
  'comprehensive',
  'strategic',
  'actionable insights',
  'unlock potential',
  'drive innovation',
  'empower',
  'scalable',
  'sustainable growth',
  'mission-critical',
  'end-to-end'
];

// Low-confidence indicators
const lowAIPhrases = [
  'excited to announce',
  'thrilled to share',
  'proud to share',
  'pleased to announce',
  'happy to share',
  'honored to',
  'grateful for',
  'delighted to',
  'excited to share'
];

// Hebrew high-confidence AI phrases
const hebrewHighAIPhrases = [
  'חשוב לציין',
  'בסיכום',
  'לסיכום',
  'בנוסף לכך',
  'יתרה מזאת',
  'בעידן המודרני',
  'בעולם המשתנה',
  'חיוני להבין',
  'ניתן לומר',
  'מהווה נקודת מפנה',
  'בהקשר זה',
  'יש לקחת בחשבון'
];

// Hebrew medium-confidence AI phrases
const hebrewMediumAIPhrases = [
  'למנף',
  'לייעל',
  'חדשני',
  'פורץ דרך',
  'מהפכני',
  'אקוסיסטם',
  'סינרגיה',
  'שינוי פרדיגמה',
  'פתרון יצירתי',
  'ערך מוסף',
  'מיטבי',
  'אסטרטגי',
  'מקיף'
];

/**
 * Main analysis function
 * @param {string} text - The text to analyze
 * @returns {object} Analysis results
 */
function analyzeText(text) {
  if (!text || text.length < 20) {
    return {
      likelihood: 0,
      confidence: 'Low',
      patterns: ['Text too short to analyze'],
      breakdown: {
        phrases: 0,
        structure: 0,
        format: 0,
        style: 0
      }
    };
  }

  // Get settings
  const settings = getSettingsSync();

  // Run all detection methods
  const phraseScore = settings.enabledMethods.phrases ? calculatePhraseScore(text) : 0;
  const structureScore = settings.enabledMethods.structure ? analyzeStructure(text) : 0;
  const hashtagScore = settings.enabledMethods.format ? analyzeHashtags(text) : 0;
  const emojiScore = settings.enabledMethods.format ? analyzeEmojis(text) : 0;
  const formatScore = (hashtagScore + emojiScore) / 2;
  const styleScore = settings.enabledMethods.style ? analyzeSentencePatterns(text) : 0;

  // Apply sensitivity adjustment
  const sensitivityMultiplier = getSensitivityMultiplier(settings.sensitivity);

  // Weighted combination
  let finalScore = (
    phraseScore * 0.40 +
    structureScore * 0.30 +
    formatScore * 0.20 +
    styleScore * 0.10
  );

  // Apply sensitivity adjustment
  finalScore = Math.min(100, Math.max(0, finalScore * sensitivityMultiplier));

  // Determine confidence level
  let confidence = 'Medium';
  if (finalScore >= 75 || finalScore <= 25) {
    confidence = 'High';
  } else if (finalScore >= 45 && finalScore <= 55) {
    confidence = 'Low';
  }

  // Collect detected patterns
  const patterns = collectPatterns(phraseScore, structureScore, formatScore, styleScore, text);

  return {
    likelihood: Math.round(finalScore),
    confidence: confidence,
    patterns: patterns,
    breakdown: {
      phrases: Math.round(phraseScore),
      structure: Math.round(structureScore),
      format: Math.round(formatScore),
      style: Math.round(styleScore)
    }
  };
}

/**
 * Calculate phrase score (40% weight)
 */
function calculatePhraseScore(text) {
  const textLower = text.toLowerCase();
  let score = 0;

  // Count occurrences
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;

  // Check English phrases
  highAIPhrases.forEach(phrase => {
    if (textLower.includes(phrase.toLowerCase())) {
      highCount++;
    }
  });

  mediumAIPhrases.forEach(phrase => {
    if (textLower.includes(phrase.toLowerCase())) {
      mediumCount++;
    }
  });

  lowAIPhrases.forEach(phrase => {
    if (textLower.includes(phrase.toLowerCase())) {
      lowCount++;
    }
  });

  // Check Hebrew phrases (case-sensitive for Hebrew)
  hebrewHighAIPhrases.forEach(phrase => {
    if (text.includes(phrase)) {
      highCount++;
    }
  });

  hebrewMediumAIPhrases.forEach(phrase => {
    if (text.includes(phrase)) {
      mediumCount++;
    }
  });

  // Weighted scoring
  score = (highCount * 30) + (mediumCount * 15) + (lowCount * 5);

  // Normalize to 0-100 scale
  return Math.min(score, 100);
}

/**
 * Analyze structure (30% weight)
 */
function analyzeStructure(text) {
  let score = 0;

  // Check for bullet points
  const bulletPattern = /^[•\-\*]\s/gm;
  const bulletCount = (text.match(bulletPattern) || []).length;
  if (bulletCount >= 3 && bulletCount <= 7) {
    score += 25; // AI loves 3-7 bullets
  }

  // Check for numbered lists
  const numberedPattern = /^\d+\.\s/gm;
  const numberedCount = (text.match(numberedPattern) || []).length;
  if (numberedCount >= 3) {
    score += 25;
  }

  // Check for perfect emoji placement (emoji at start of each paragraph)
  const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
  if (paragraphs.length > 1) {
    const emojiStartCount = paragraphs.filter(p => /^[\u{1F300}-\u{1F9FF}]/u.test(p)).length;
    if (emojiStartCount === paragraphs.length) {
      score += 30;
    }
  }

  // Check for consistent paragraph length (AI tends to be uniform)
  if (paragraphs.length > 2) {
    const paragraphLengths = paragraphs.map(p => p.length);
    const avgLength = paragraphLengths.reduce((a, b) => a + b, 0) / paragraphLengths.length;
    const variance = paragraphLengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / paragraphLengths.length;
    const stdDev = Math.sqrt(variance);

    // Low variance = AI (too consistent)
    if (stdDev < avgLength * 0.2) {
      score += 20;
    }
  }

  return Math.min(score, 100);
}

/**
 * Analyze hashtags
 */
function analyzeHashtags(text) {
  let score = 0;

  // Extract hashtags
  const hashtags = text.match(/#\w+/g) || [];

  // AI typically uses 3-10 hashtags
  if (hashtags.length >= 3 && hashtags.length <= 10) {
    score += 30;
  }

  // AI tends to group hashtags at end
  const lines = text.split('\n');
  if (lines.length > 0) {
    const lastLine = lines[lines.length - 1];
    const hashtagsInLastLine = (lastLine.match(/#\w+/g) || []).length;
    if (hashtagsInLastLine === hashtags.length && hashtags.length > 0) {
      score += 40;
    }
  }

  // Check for hashtag spam (too many = human trying too hard or AI)
  if (hashtags.length > 15) {
    score += 30;
  }

  return Math.min(score, 100);
}

/**
 * Analyze emojis
 */
function analyzeEmojis(text) {
  let score = 0;

  // Count emojis
  const emojiPattern = /[\u{1F300}-\u{1F9FF}]/gu;
  const emojis = text.match(emojiPattern) || [];

  // AI uses moderate emojis (2-8)
  if (emojis.length >= 2 && emojis.length <= 8) {
    score += 20;
  }

  // Perfect spacing (one emoji per paragraph)
  const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
  if (paragraphs.length > 1 && emojis.length === paragraphs.length) {
    score += 50;
  }

  // No emojis can also indicate AI (some prompts exclude them)
  if (emojis.length === 0 && text.length > 300) {
    score += 10;
  }

  return Math.min(score, 100);
}

/**
 * Analyze sentence patterns (10% weight)
 */
function analyzeSentencePatterns(text) {
  let score = 0;

  // Split into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

  if (sentences.length < 2) {
    return 0;
  }

  // Calculate sentence length variance
  const lengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
  const stdDev = Math.sqrt(variance);

  // AI has very consistent sentence lengths
  if (stdDev < 3 && sentences.length > 3) {
    score += 40;
  }

  // Check for no typos (AI rarely makes typos)
  const commonTypos = /\b(teh|taht|thier|recieve|seperate|definately|occured)\b/gi;
  if (!commonTypos.test(text)) {
    score += 30;
  }

  // AI rarely uses contractions in formal posts
  const contractions = text.match(/\b\w+\'(s|t|re|ve|ll|d|m)\b/g) || [];
  if (contractions.length === 0 && text.length > 200) {
    score += 30;
  }

  return Math.min(score, 100);
}

/**
 * Collect detected patterns for display
 */
function collectPatterns(phraseScore, structureScore, formatScore, styleScore, text) {
  const patterns = [];

  if (phraseScore > 30) {
    patterns.push('AI-typical phrases detected');
  }

  if (structureScore > 40) {
    patterns.push('Overly structured formatting');
  }

  if (formatScore > 50) {
    patterns.push('Systematic hashtag/emoji usage');
  }

  if (styleScore > 50) {
    patterns.push('Uniform writing style');
  }

  // Additional specific patterns
  const bulletPattern = /^[•\-\*]\s/gm;
  const bulletCount = (text.match(bulletPattern) || []).length;
  if (bulletCount >= 5) {
    patterns.push('Extensive use of bullet points');
  }

  const hashtags = text.match(/#\w+/g) || [];
  if (hashtags.length > 10) {
    patterns.push('High hashtag density');
  }

  const textLower = text.toLowerCase();
  if (textLower.includes('delve into') || textLower.includes('it is important to note')) {
    patterns.push('Classic AI phrases present');
  }

  // Limit to 5 patterns
  return patterns.slice(0, 5);
}

/**
 * Get sensitivity multiplier based on setting
 */
function getSensitivityMultiplier(sensitivity) {
  switch (sensitivity) {
    case 'low':
      return 0.8; // More lenient
    case 'high':
      return 1.2; // Stricter
    case 'medium':
    default:
      return 1.0; // Normal
  }
}

/**
 * Get settings synchronously (from localStorage as fallback)
 */
function getSettingsSync() {
  // Default settings
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

  // Try to get from chrome storage (this is async, so we use defaults)
  // In a real scenario, settings would be loaded before analysis
  return defaultSettings;
}

// Export for use in selector.js
if (typeof window !== 'undefined') {
  window.analyzeText = analyzeText;
}
