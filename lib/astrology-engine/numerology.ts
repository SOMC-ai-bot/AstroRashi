import { LoShuGridData, NumerologyAnalysis, PlanetName } from '@/types';

// Chaldean letter values:
// 1: A, I, J, Q, Y
// 2: B, K, R
// 3: C, G, L, S
// 4: D, M, T
// 5: E, H, N, X
// 6: U, V, W
// 7: O, Z
// 8: F, P
// (9 is sacred in Chaldean and not assigned to individual alphabet letters)
const CHALDEAN_VALUES: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

// Pythagorean letter values (1 to 9 sequentially):
const PYTHAGOREAN_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

const NUMEROLOGY_PLANETS: Record<number, PlanetName> = {
  1: 'Sun',
  2: 'Moon',
  3: 'Jupiter',
  4: 'Rahu',
  5: 'Mercury',
  6: 'Venus',
  7: 'Ketu',
  8: 'Saturn',
  9: 'Mars',
};

export function reduceToSingleDigit(num: number, preserveMasterNumbers = false): number {
  if (preserveMasterNumbers && (num === 11 || num === 22 || num === 33)) {
    return num;
  }
  let current = Math.abs(num);
  while (current > 9) {
    let sum = 0;
    const str = String(current);
    for (const ch of str) {
      sum += parseInt(ch, 10);
    }
    if (preserveMasterNumbers && (sum === 11 || sum === 22 || sum === 33)) {
      return sum;
    }
    current = sum;
  }
  return current;
}

export function calculateMulankAndBhagyank(birthDateStr: string): NumerologyAnalysis {
  // YYYY-MM-DD
  const [yStr, mStr, dStr] = birthDateStr.split('-');
  const dayNum = parseInt(dStr, 10);
  const mulank = reduceToSingleDigit(dayNum);

  // Full date sum
  const cleanDigits = `${yStr}${mStr}${dStr}`.split('').map(Number);
  const totalSum = cleanDigits.reduce((acc, d) => acc + d, 0);
  const bhagyank = reduceToSingleDigit(totalSum);

  const rulingPlanet = NUMEROLOGY_PLANETS[mulank] || 'Sun';

  const traitsMap: Record<number, { traits: string[]; element: string; colors: string[]; days: string[]; friends: number[]; challenges: number[] }> = {
    1: {
      traits: ['Pioneering leadership', 'Independent initiative', 'High self-respect', 'Dynamic vision'],
      element: 'Fire',
      colors: ['Gold', 'Orange', 'Yellow'],
      days: ['Sunday', 'Monday'],
      friends: [2, 3, 5, 9],
      challenges: [6, 8],
    },
    2: {
      traits: ['Empathetic intuition', 'Diplomatic harmony', 'Creative imagination', 'Gentle receptivity'],
      element: 'Water',
      colors: ['White', 'Cream', 'Silver'],
      days: ['Monday', 'Friday'],
      friends: [1, 3, 5],
      challenges: [4, 8, 9],
    },
    3: {
      traits: ['Optimistic wisdom', 'Verbal eloquence', 'Generous expansion', 'Philosophical insight'],
      element: 'Ether / Fire',
      colors: ['Yellow', 'Saffron', 'Purple'],
      days: ['Thursday', 'Tuesday'],
      friends: [1, 2, 9],
      challenges: [6],
    },
    4: {
      traits: ['Methodical discipline', 'Innovative unconventionality', 'Practical foundation', 'Resilience'],
      element: 'Air / Earth',
      colors: ['Blue', 'Grey', 'Brown'],
      days: ['Saturday', 'Sunday'],
      friends: [5, 6, 8],
      challenges: [1, 2, 9],
    },
    5: {
      traits: ['Agile adaptability', 'Commercial brilliance', 'Curious communication', 'Versatility'],
      element: 'Earth / Air',
      colors: ['Green', 'Emerald', 'Turquoise'],
      days: ['Wednesday', 'Friday'],
      friends: [1, 6],
      challenges: [2],
    },
    6: {
      traits: ['Aesthetic elegance', 'Nurturing domestic harmony', 'Romantic charm', 'Artistic luxury'],
      element: 'Water / Air',
      colors: ['Pastel Blue', 'Pink', 'White'],
      days: ['Friday', 'Tuesday'],
      friends: [4, 5, 8],
      challenges: [3],
    },
    7: {
      traits: ['Mystical contemplation', 'Deep analytical inquiry', 'Philosophical introspection', 'Intuition'],
      element: 'Water',
      colors: ['Light Green', 'White', 'Smoky Grey'],
      days: ['Monday', 'Thursday'],
      friends: [1, 2, 4],
      challenges: [9],
    },
    8: {
      traits: ['Material mastery', 'Enduring stoicism', 'Karmic justice', 'Organizational authority'],
      element: 'Earth',
      colors: ['Dark Blue', 'Black', 'Dark Purple'],
      days: ['Saturday'],
      friends: [3, 5, 6],
      challenges: [1, 2],
    },
    9: {
      traits: ['Humanitarian courage', 'Dynamic physical vitality', 'Fearless protection', 'Passionate drive'],
      element: 'Fire',
      colors: ['Red', 'Crimson', 'Pink'],
      days: ['Tuesday', 'Thursday'],
      friends: [1, 2, 3],
      challenges: [4, 7],
    },
  };

  const info = traitsMap[mulank] || traitsMap[1];

  return {
    mulank,
    bhagyank,
    rulingPlanet,
    element: info.element,
    luckyColors: info.colors,
    luckyDays: info.days,
    friendlyNumbers: info.friends,
    challengingNumbers: info.challenges,
    traits: info.traits,
    calculationSteps: [
      `Birth Day (${dayNum}) reduced: ${dStr.split('').join(' + ')} = ${mulank} (Mulank / Radical Number).`,
      `Full Birth Date (${birthDateStr}) sum of digits: ${cleanDigits.join(' + ')} = ${totalSum} -> reduced to ${bhagyank} (Bhagyank / Life Path).`,
    ],
  };
}

export function calculateNameNumerology(
  fullName: string,
  system: 'Chaldean' | 'Pythagorean' | 'Vedic' = 'Chaldean'
): {
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  calculationBreakdown: { letter: string; value: number; isVowel: boolean }[];
  interpretation: string;
} {
  const table = system === 'Pythagorean' ? PYTHAGOREAN_VALUES : CHALDEAN_VALUES;
  const VOWELS = ['A', 'E', 'I', 'O', 'U'];

  const clean = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const breakdown: { letter: string; value: number; isVowel: boolean }[] = [];

  let totalSum = 0;
  let vowelSum = 0;
  let consonantSum = 0;

  for (const char of clean) {
    const val = table[char] || 0;
    const isVowel = VOWELS.includes(char);
    breakdown.push({ letter: char, value: val, isVowel });
    totalSum += val;
    if (isVowel) vowelSum += val;
    else consonantSum += val;
  }

  const destinyNumber = reduceToSingleDigit(totalSum);
  const soulUrgeNumber = reduceToSingleDigit(vowelSum);
  const personalityNumber = reduceToSingleDigit(consonantSum);

  const interpretation = `Under the ${system} system, the Expression/Destiny number is ${destinyNumber} (${NUMEROLOGY_PLANETS[destinyNumber]}), reflecting your outward life purpose and signature impact. The Soul Urge number of ${soulUrgeNumber} reveals your private core emotional motives, and Personality number ${personalityNumber} indicates your initial presence.`;

  return {
    destinyNumber,
    soulUrgeNumber,
    personalityNumber,
    calculationBreakdown: breakdown,
    interpretation,
  };
}

export function calculatePersonalYear(birthDateStr: string, targetYear: number): {
  personalYear: number;
  rulingPlanet: PlanetName;
  theme: string;
  advice: string;
} {
  const [, mStr, dStr] = birthDateStr.split('-');
  const month = parseInt(mStr, 10);
  const day = parseInt(dStr, 10);

  // Personal Year = (Day + Month + Target Year) reduced
  const yearSum = String(targetYear).split('').map(Number).reduce((a, b) => a + b, 0);
  const total = day + month + yearSum;
  const personalYear = reduceToSingleDigit(total);
  const rulingPlanet = NUMEROLOGY_PLANETS[personalYear] || 'Sun';

  const themes: Record<number, { theme: string; advice: string }> = {
    1: { theme: 'New Beginnings, Pioneering Action & Fresh Cycles', advice: 'Plant seeds, initiate bold ventures, and embrace confident autonomy.' },
    2: { theme: 'Patience, Partnerships, Diplomacy & Intuition', advice: 'Cultivate alliances, practice emotional diplomacy, and avoid rushing outcomes.' },
    3: { theme: 'Creative Expansion, Self-Expression & Optimism', advice: 'Engage in writing, artistic sharing, networking, and celebration.' },
    4: { theme: 'Foundation Building, Hard Work & Structural Order', advice: 'Focus on systems, routines, financial management, and endurance.' },
    5: { theme: 'Dynamic Transformation, Travel & Freedom', advice: 'Embrace constructive flexibility, welcome unexpected pivots, and broaden horizons.' },
    6: { theme: 'Home Sanctuary, Relationships, Family & Harmony', advice: 'Focus on domestic stability, loving commitments, and healing environments.' },
    7: { theme: 'Spiritual Introspection, Research & Inner Wisdom', advice: 'Prioritize meditation, deep analytical study, retreat, and self-discovery.' },
    8: { theme: 'Material Mastery, Executive Authority & Karmic Rewards', advice: 'Step into financial governance, executive leadership, and strategic investments.' },
    9: { theme: 'Completion, Release, Humanitarian Synthesis & Closure', advice: 'Clear out outdated attachments, forgive old grievances, and prepare for renewal.' },
  };

  const item = themes[personalYear] || themes[1];

  return {
    personalYear,
    rulingPlanet,
    theme: item.theme,
    advice: item.advice,
  };
}

/**
 * Lo Shu 3x3 Grid
 * Classical layout:
 * 4  9  2  (Mind / Mental plane)
 * 3  5  7  (Soul / Emotional plane)
 * 8  1  6  (Practical / Physical plane)
 */
export function calculateLoShuGrid(birthDateStr: string): LoShuGridData {
  const cleanDigits = birthDateStr.replace(/[^0-9]/g, '').split('').map(Number);
  const numberFrequency: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
  };

  for (const d of cleanDigits) {
    if (d >= 1 && d <= 9) {
      numberFrequency[d]++;
    }
  }

  const presentNumbers = Object.keys(numberFrequency)
    .map(Number)
    .filter((n) => numberFrequency[n] > 0);

  const missingNumbers = Object.keys(numberFrequency)
    .map(Number)
    .filter((n) => numberFrequency[n] === 0);

  // Build 3x3 layout
  const grid: (number | null)[][] = [
    [numberFrequency[4] ? 4 : null, numberFrequency[9] ? 9 : null, numberFrequency[2] ? 2 : null],
    [numberFrequency[3] ? 3 : null, numberFrequency[5] ? 5 : null, numberFrequency[7] ? 7 : null],
    [numberFrequency[8] ? 8 : null, numberFrequency[1] ? 1 : null, numberFrequency[6] ? 6 : null],
  ];

  const planes = [
    {
      name: 'Mental Plane (Row 1: 4-9-2)',
      numbers: [4, 9, 2],
      isComplete: !!(numberFrequency[4] && numberFrequency[9] && numberFrequency[2]),
      interpretation: 'Governs intellectual memory, analytical thinking, and strategic foresight.',
    },
    {
      name: 'Emotional Plane (Row 2: 3-5-7)',
      numbers: [3, 5, 7],
      isComplete: !!(numberFrequency[3] && numberFrequency[5] && numberFrequency[7]),
      interpretation: 'Governs heart-centered intuition, artistic sensitivity, and spiritual warmth.',
    },
    {
      name: 'Practical Plane (Row 3: 8-1-6)',
      numbers: [8, 1, 6],
      isComplete: !!(numberFrequency[8] && numberFrequency[1] && numberFrequency[6]),
      interpretation: 'Governs material execution, tangible craftsmanship, and physical discipline.',
    },
    {
      name: 'Thought Plane (Col 1: 4-3-8)',
      numbers: [4, 3, 8],
      isComplete: !!(numberFrequency[4] && numberFrequency[3] && numberFrequency[8]),
      interpretation: 'Capacity to conceptualize original ideas and structure long-term plans.',
    },
    {
      name: 'Will Plane (Col 2: 9-5-1)',
      numbers: [9, 5, 1],
      isComplete: !!(numberFrequency[9] && numberFrequency[5] && numberFrequency[1]),
      interpretation: 'Unshakeable willpower, perseverance, and determination to conquer hurdles.',
    },
    {
      name: 'Action Plane (Col 3: 2-7-6)',
      numbers: [2, 7, 6],
      isComplete: !!(numberFrequency[2] && numberFrequency[7] && numberFrequency[6]),
      interpretation: 'Ability to translate thoughts into immediate, pragmatic real-world action.',
    },
  ];

  return {
    grid,
    presentNumbers,
    missingNumbers,
    numberFrequency,
    planes,
  };
}

export function calculateMobileOrVehicleNumerology(
  inputString: string,
  birthDateStr: string
): {
  reducedNumber: number;
  rulingPlanet: PlanetName;
  compatibilityWithMulank: 'Favourable' | 'Neutral' | 'Challenging';
  compatibilityWithBhagyank: 'Favourable' | 'Neutral' | 'Challenging';
  interpretation: string;
} {
  // Extract alphanumeric characters
  const clean = inputString.toUpperCase().replace(/[^A-Z0-9]/g, '');
  let sum = 0;
  for (const ch of clean) {
    if (/[0-9]/.test(ch)) {
      sum += parseInt(ch, 10);
    } else if (CHALDEAN_VALUES[ch]) {
      sum += CHALDEAN_VALUES[ch];
    }
  }

  const reducedNumber = reduceToSingleDigit(sum);
  const rulingPlanet = NUMEROLOGY_PLANETS[reducedNumber] || 'Mercury';

  const { mulank, bhagyank } = calculateMulankAndBhagyank(birthDateStr);

  const getComp = (target: number, test: number): 'Favourable' | 'Neutral' | 'Challenging' => {
    if (target === test) return 'Favourable';
    const friendlyMap: Record<number, number[]> = {
      1: [2, 3, 5, 9],
      2: [1, 3, 5],
      3: [1, 2, 9],
      4: [5, 6, 8],
      5: [1, 6],
      6: [4, 5, 8],
      7: [1, 2, 4],
      8: [3, 5, 6],
      9: [1, 2, 3],
    };
    if (friendlyMap[target]?.includes(test)) return 'Favourable';
    const hostileMap: Record<number, number[]> = {
      1: [6, 8],
      2: [4, 8, 9],
      3: [6],
      4: [1, 2, 9],
      5: [2],
      6: [3],
      7: [9],
      8: [1, 2],
      9: [4, 7],
    };
    if (hostileMap[target]?.includes(test)) return 'Challenging';
    return 'Neutral';
  };

  const compMulank = getComp(mulank, reducedNumber);
  const compBhagyank = getComp(bhagyank, reducedNumber);

  const interpretation = `This identifier reduces to Root Number ${reducedNumber} governed by ${rulingPlanet}. In traditional numerological analysis, its relationship with your birth day number ${mulank} is ${compMulank} and with your life path ${bhagyank} is ${compBhagyank}. It supports communication and stability.`;

  return {
    reducedNumber,
    rulingPlanet,
    compatibilityWithMulank: compMulank,
    compatibilityWithBhagyank: compBhagyank,
    interpretation,
  };
}
