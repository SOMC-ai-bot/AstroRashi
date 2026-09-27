import { AIIntent } from '@/types';

const ASTROLOGY_KEYWORDS = [
  'horoscope',
  'zodiac',
  'chart',
  'natal',
  'birth chart',
  'kundli',
  'kundali',
  'house',
  '1st house',
  '2nd house',
  '3rd house',
  '4th house',
  '5th house',
  '6th house',
  '7th house',
  '8th house',
  '9th house',
  '10th house',
  '11th house',
  '12th house',
  'sun sign',
  'moon sign',
  'rising',
  'ascendant',
  'midheaven',
  'lagna',
  'graha',
  'dasha',
  'mahadasha',
  'nakshatra',
  'retrograde',
  'transit',
  'saturn return',
  'jupiter',
  'saturn',
  'mercury',
  'venus',
  'mars',
  'pluto',
  'neptune',
  'uranus',
  'rahu',
  'ketu',
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
  'synastry',
  'vedic',
  'sidereal',
  'tropical',
  'trine',
  'sextile',
  'square',
  'conjunction',
  'opposition',
  'shani',
  'mangal',
  'guru',
  'budh',
  'surya',
  'chandra',
];

const GENERAL_KEYWORDS = [
  'python',
  'javascript',
  'typescript',
  'code',
  'function',
  'algorithm',
  'debug',
  'quantum computing',
  'business plan',
  'pitch deck',
  'email',
  'draft an email',
  'summarize',
  'resume',
  'cv',
  'interview prep',
  'recipe',
  'workout',
  'essay',
  'write a story',
  'math',
  'science',
  'physics',
  'chemistry',
  'translate',
  'grammar',
  'marketing strategy',
  'startup',
];

const SAFETY_KEYWORDS = [
  'cure disease',
  'diagnose',
  'cancer',
  'suicide',
  'kill',
  'lottery numbers',
  'guaranteed stock',
  'when will i die',
  'exact death date',
];

export function classifyIntent(query: string, useAstrologyContext = true): AIIntent {
  const lower = query.toLowerCase().trim();

  // Safety trigger check
  for (const word of SAFETY_KEYWORDS) {
    if (lower.includes(word)) {
      return 'SAFETY_DISCLAIMER';
    }
  }

  // Check for specialist AI intent
  if (lower.includes('specialist') || lower.includes('consultation') || lower.includes('talk to an astrologer') || lower.includes('consultant')) {
    return 'SPECIALIST_CHAT';
  }

  // If astrology context is forcefully disabled by the user, treat as general unless explicitly astrological
  const hasAstroWord = ASTROLOGY_KEYWORDS.some((kw) => lower.includes(kw));
  const hasGeneralWord = GENERAL_KEYWORDS.some((kw) => lower.includes(kw));

  if (!useAstrologyContext && !hasAstroWord) {
    return 'GENERAL_CHAT';
  }

  if (hasGeneralWord && !hasAstroWord) {
    return 'GENERAL_CHAT';
  }

  if (hasAstroWord) {
    if (lower.includes('career') || lower.includes('job') || lower.includes('profession') || lower.includes('business')) {
      return 'CAREER_ASTROLOGY';
    }
    if (lower.includes('love') || lower.includes('relationship') || lower.includes('marriage') || lower.includes('partner') || lower.includes('compatibility')) {
      return 'RELATIONSHIP_ASTROLOGY';
    }
    if (lower.includes('money') || lower.includes('wealth') || lower.includes('finance') || lower.includes('2nd house') || lower.includes('11th house')) {
      return 'FINANCE_ASTROLOGY';
    }
    if (lower.includes('transit') || lower.includes('current planetary') || lower.includes('retrograde')) {
      return 'TRANSIT_QUERY';
    }
    if (lower.includes('chart') || lower.includes('wheel') || lower.includes('natal') || lower.includes('placements')) {
      return 'CHART_ANALYSIS';
    }
    return 'ASTROLOGY_QUERY';
  }

  // If query is ambiguous (e.g. "what should I focus on this year?")
  if (lower.includes('focus') || lower.includes('timing') || lower.includes('growth') || lower.includes('future')) {
    return useAstrologyContext ? 'ASTROLOGY_QUERY' : 'GENERAL_CHAT';
  }

  return 'GENERAL_CHAT';
}
