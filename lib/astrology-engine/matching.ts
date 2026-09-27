import { AshtakootScoreItem, KundliMatchResult, ZodiacSignName } from '@/types';
import { getNakshatraFromLongitude, NAKSHATRAS } from './nakshatra';
import { SIGN_RULERS } from './planetary';

export function calculateAshtakootMatching(
  moonLonA: number,
  moonLonB: number,
  nameA: string = 'Person A',
  nameB: string = 'Person B',
  hasManglikA: boolean = false,
  hasManglikB: boolean = false
): KundliMatchResult {
  const nakA = getNakshatraFromLongitude(moonLonA);
  const nakB = getNakshatraFromLongitude(moonLonB);

  const ZODIAC_LIST: ZodiacSignName[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
  ];
  const signA = ZODIAC_LIST[Math.floor(moonLonA / 30)];
  const signB = ZODIAC_LIST[Math.floor(moonLonB / 30)];

  const kootas: AshtakootScoreItem[] = [];

  // 1. Varna (1 pt)
  const varnaRank: Record<string, number> = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1, Mleccha: 1, Farmer: 2, Butcher: 1 };
  const rankA = varnaRank[nakA.nakshatra.varna] || 2;
  const rankB = varnaRank[nakB.nakshatra.varna] || 2;
  let varnaScore = 1;
  let varnaDetails = 'Natural vocational harmony and mutual respect.';
  if (rankA < rankB) {
    varnaScore = 0;
    varnaDetails = 'Moderate difference in traditional vocational temperament.';
  }
  kootas.push({
    koota: 'Varna Koota',
    score: varnaScore,
    maxScore: 1,
    area: 'Spiritual ego, intellectual affinity & work temperament',
    meaning: 'Measures natural mutual respect and occupational harmony.',
    isFavourable: varnaScore === 1,
    details: varnaDetails,
  });

  // 2. Vashya (2 pts)
  let vashyaScore = 2;
  let vashyaDetails = 'Strong natural affinity and mutual cooperative resonance.';
  if (signA !== signB) {
    const diffSigns = Math.abs(ZODIAC_LIST.indexOf(signA) - ZODIAC_LIST.indexOf(signB));
    if (diffSigns === 6 || diffSigns === 8) {
      vashyaScore = 1;
      vashyaDetails = 'Requires conscious communication and compromise.';
    }
  }
  kootas.push({
    koota: 'Vashya Koota',
    score: vashyaScore,
    maxScore: 2,
    area: 'Mutual attraction, dynamic magnetism & influence',
    meaning: 'Assesses the magnetic rapport and ease of reaching shared decisions.',
    isFavourable: vashyaScore >= 1.5,
    details: vashyaDetails,
  });

  // 3. Tara (3 pts)
  const countAtoB = ((nakB.nakshatra.index - nakA.nakshatra.index + 27) % 27) + 1;
  const countBtoA = ((nakA.nakshatra.index - nakB.nakshatra.index + 27) % 27) + 1;
  const remA = countAtoB % 9;
  const remB = countBtoA % 9;
  const inauspiciousRem = [3, 5, 7]; // Vipat, Pratyak, Naidhana
  let taraScore = 3;
  if (inauspiciousRem.includes(remA) && inauspiciousRem.includes(remB)) {
    taraScore = 0;
  } else if (inauspiciousRem.includes(remA) || inauspiciousRem.includes(remB)) {
    taraScore = 1.5;
  }
  kootas.push({
    koota: 'Tara Koota',
    score: taraScore,
    maxScore: 3,
    area: 'Destiny, health, vitality & life longevity',
    meaning: 'Evaluates the cosmic rhythm and health auspiciousness between birth stars.',
    isFavourable: taraScore >= 1.5,
    details: taraScore >= 2 ? 'Highly auspicious cosmic alignment for longevity.' : 'Moderate star compatibility.',
  });

  // 4. Yoni (4 pts)
  let yoniScore = 4;
  if (nakA.nakshatra.animal === nakB.nakshatra.animal) {
    yoniScore = 4;
  } else {
    // Sworn enemies get 0, neutral gets 2, friendly gets 3
    const enemyPairs = [
      ['Cat', 'Rat'],
      ['Horse', 'Buffalo'],
      ['Elephant', 'Lion'],
      ['Serpent', 'Mongoose'],
      ['Dog', 'Deer'],
      ['Monkey', 'Sheep'],
    ];
    const isEnemy = enemyPairs.some(
      ([a, b]) =>
        (nakA.nakshatra.animal === a && nakB.nakshatra.animal === b) ||
        (nakA.nakshatra.animal === b && nakB.nakshatra.animal === a)
    );
    yoniScore = isEnemy ? 1 : 2.5;
  }
  kootas.push({
    koota: 'Yoni Koota',
    score: yoniScore,
    maxScore: 4,
    area: 'Biological, instinctive & psychological compatibility',
    meaning: 'Represents physical affinity, instinctual chemistry, and mutual warmth.',
    isFavourable: yoniScore >= 2.5,
    details: yoniScore >= 3 ? 'Excellent instinctual affinity.' : 'Moderate biological rapport requiring empathy.',
  });

  // 5. Graha Maitri (5 pts)
  const lordA = SIGN_RULERS[signA];
  const lordB = SIGN_RULERS[signB];
  let grahaMaitriScore = 5;
  if (lordA === lordB) {
    grahaMaitriScore = 5;
  } else {
    const neutralOrFriend = ['Sun', 'Moon', 'Jupiter'].includes(lordA) && ['Sun', 'Moon', 'Jupiter'].includes(lordB);
    grahaMaitriScore = neutralOrFriend ? 4 : 2.5;
  }
  kootas.push({
    koota: 'Graha Maitri Koota',
    score: grahaMaitriScore,
    maxScore: 5,
    area: 'Mental rapport, intellectual friendship & worldview',
    meaning: 'Examines planetary friendship between ruling planetary lords.',
    isFavourable: grahaMaitriScore >= 3,
    details: grahaMaitriScore >= 4 ? 'Deep philosophical friendship and easy mutual agreement.' : 'Moderate intellectual rapport.',
  });

  // 6. Gana (6 pts)
  const ganaA = nakA.nakshatra.gana;
  const ganaB = nakB.nakshatra.gana;
  let ganaScore = 6;
  if (ganaA === ganaB) {
    ganaScore = 6;
  } else if ((ganaA === 'Deva' && ganaB === 'Manushya') || (ganaA === 'Manushya' && ganaB === 'Deva')) {
    ganaScore = 5;
  } else if ((ganaA === 'Rakshasa' && ganaB === 'Deva') || (ganaA === 'Deva' && ganaB === 'Rakshasa')) {
    ganaScore = 1;
  } else {
    ganaScore = 3;
  }
  kootas.push({
    koota: 'Gana Koota',
    score: ganaScore,
    maxScore: 6,
    area: 'Temperament, behavioral instincts & social philosophy',
    meaning: 'Compares Deva (divine/gentle), Manushya (human/pragmatic), and Rakshasa (fiery/assertive) temperaments.',
    isFavourable: ganaScore >= 4,
    details: ganaScore >= 4 ? 'Harmonious behavioral rhythm.' : 'Contrasting temperaments that flourish through patience.',
  });

  // 7. Bhakoot (7 pts)
  const signIdxA = ZODIAC_LIST.indexOf(signA);
  const signIdxB = ZODIAC_LIST.indexOf(signB);
  const diffSignSteps = ((signIdxB - signIdxA + 12) % 12) + 1;
  let bhakootScore = 7;
  let bhakootDosha = false;

  // 6/8 (Shadashtaka), 9/5 (Navapanchama), 12/2 (Dwidwadasha)
  if ([6, 8, 12, 2].includes(diffSignSteps)) {
    bhakootScore = 0;
    bhakootDosha = true;
  }
  // Classical cancellation if lords are identical or friendly
  if (bhakootDosha && lordA === lordB) {
    bhakootScore = 7;
    bhakootDosha = false;
  }
  kootas.push({
    koota: 'Bhakoot Koota',
    score: bhakootScore,
    maxScore: 7,
    area: 'Emotional bonding, family prosperity & happiness',
    meaning: 'Focuses on shared emotional growth, household welfare, and long-term bonding.',
    isFavourable: bhakootScore === 7,
    details: bhakootScore === 7 ? 'Full points; auspicious for family joy and shared wealth.' : 'Bhakoot dosha present; requires mutual financial clarity.',
  });

  // 8. Nadi (8 pts)
  const nadiA = nakA.nakshatra.nadi;
  const nadiB = nakB.nakshatra.nadi;
  let nadiScore = 8;
  let nadiDosha = false;
  if (nadiA === nadiB) {
    nadiScore = 0;
    nadiDosha = true;
  }
  // Cancellation if different nakshatras or different padas
  if (nadiDosha && nakA.nakshatra.index !== nakB.nakshatra.index) {
    // If ruling lords or different signs, classical relaxation applies
    nadiScore = 8;
    nadiDosha = false;
  }
  kootas.push({
    koota: 'Nadi Koota',
    score: nadiScore,
    maxScore: 8,
    area: 'Genetic resonance, physiological health & progeny',
    meaning: 'Classical indicator of physiological health and nervous/vital energy constitution.',
    isFavourable: nadiScore === 8,
    details: nadiScore === 8 ? 'Flawless Nadi harmony, promoting vibrant health and progeny.' : 'Same Nadi identified; traditional mitigation advised.',
  });

  // Total Score (max 36)
  const totalScore = kootas.reduce((acc, k) => acc + k.score, 0);
  const percentage = Math.round((totalScore / 36) * 100);

  const traditionalVerdict =
    totalScore >= 28
      ? 'Exceptional compatibility according to classical Ashtakoot standards (Uttama).'
      : totalScore >= 18
      ? 'Good and viable compatibility (Madhyama). Normal communication fosters a flourishing union.'
      : 'Below the classical 18-point threshold (Adhama). Traditional practitioners suggest deeper mutual dialogue and planetary remedies.';

  const strengths: string[] = [];
  const cautions: string[] = [];

  if (varnaScore === 1) strengths.push('High mutual respect and complementary occupational values.');
  if (grahaMaitriScore >= 4) strengths.push('Strong mental rapport and shared intellectual interests.');
  if (nadiScore === 8) strengths.push('Pristine physiological and vital energy synergy.');
  if (bhakootScore === 7) strengths.push('Auspicious emotional harmony supporting family prosperity.');

  if (ganaScore < 4) cautions.push('Distinct behavioral temperaments; practice empathetic listening.');
  if (hasManglikA !== hasManglikB) cautions.push('Asymmetric Manglik status; classical texts recommend joint planetary mindfulness.');
  if (bhakootDosha) cautions.push('Bhakoot tension suggests maintaining independent creative outlets and transparent budgeting.');

  return {
    personA: {
      name: nameA,
      moonSign: signA,
      nakshatra: nakA.nakshatra.name,
      pada: nakA.pada,
    },
    personB: {
      name: nameB,
      moonSign: signB,
      nakshatra: nakB.nakshatra.name,
      pada: nakB.pada,
    },
    totalScore,
    maxScore: 36,
    percentage,
    kootas,
    doshaChecks: {
      mangalDoshaA: hasManglikA,
      mangalDoshaB: hasManglikB,
      nadiDosha,
      bhakootDosha,
      mitigationNotes: [
        'Classical Ashtakoot scoring is an interpretive framework. Mature love, emotional respect, and intentional communication always take precedence.',
      ],
    },
    traditionalCompatibilityVerdict: traditionalVerdict,
    relationshipStrengths: strengths,
    relationshipCautions: cautions,
  };
}
