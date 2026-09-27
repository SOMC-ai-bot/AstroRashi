import { NatalChart, PlanetPosition, ZodiacSignName } from '@/types';
import { ZODIAC_SIGNS } from './planetary';

export interface MangalDoshaResult {
  hasDosha: boolean;
  severity: 'None' | 'Mild' | 'Moderate' | 'High';
  marsHouseFromLagna: number;
  marsHouseFromMoon: number;
  marsHouseFromVenus: number;
  isCancelled: boolean;
  cancellationReasons: string[];
  traditionalMeaning: string;
}

export interface KaalSarpDoshaResult {
  type: 'None' | 'Partial' | 'Full';
  doshaName?: string;
  rahuHouse: number;
  ketuHouse: number;
  traditionalSignificance: string;
  educationalNote: string;
}

export interface SadeSatiResult {
  isActive: boolean;
  phase: 'Rising (1st Phase)' | 'Peak (2nd Phase)' | 'Setting (3rd Phase)' | 'Dhaiya (Small Panoti)' | 'Inactive';
  natalMoonSign: ZodiacSignName;
  currentSaturnSign: ZodiacSignName;
  saturnHouseFromMoon: number;
  startDateEstimate: string;
  endDateEstimate: string;
  traditionalMeaning: string;
}

export interface PitraDoshaResult {
  hasDosha: boolean;
  indicatorsFound: string[];
  sunAffliction: boolean;
  ninthHouseAffliction: boolean;
  classicalMitigations: string[];
  traditionalGuidance: string;
}

const DOSHA_HOUSES = [1, 2, 4, 7, 8, 12];

export function calculateMangalDosha(chart: NatalChart): MangalDoshaResult {
  const mars = chart.planets.find((p) => p.name === 'Mars');
  const moon = chart.planets.find((p) => p.name === 'Moon');
  const venus = chart.planets.find((p) => p.name === 'Venus');
  const asc = chart.ascendant;

  if (!mars) {
    return {
      hasDosha: false,
      severity: 'None',
      marsHouseFromLagna: 1,
      marsHouseFromMoon: 1,
      marsHouseFromVenus: 1,
      isCancelled: false,
      cancellationReasons: [],
      traditionalMeaning: 'Mars is neutrally positioned.',
    };
  }

  // House from Lagna
  const marsSignIdx = Math.floor(mars.absoluteDegree / 30);
  const ascSignIdx = Math.floor(asc.absoluteDegree / 30);
  const houseFromLagna = ((marsSignIdx - ascSignIdx + 12) % 12) + 1;

  // House from Moon
  const moonSignIdx = moon ? Math.floor(moon.absoluteDegree / 30) : ascSignIdx;
  const houseFromMoon = ((marsSignIdx - moonSignIdx + 12) % 12) + 1;

  // House from Venus
  const venusSignIdx = venus ? Math.floor(venus.absoluteDegree / 30) : ascSignIdx;
  const houseFromVenus = ((marsSignIdx - venusSignIdx + 12) % 12) + 1;

  const doshaInLagna = DOSHA_HOUSES.includes(houseFromLagna);
  const doshaInMoon = DOSHA_HOUSES.includes(houseFromMoon);
  const doshaInVenus = DOSHA_HOUSES.includes(houseFromVenus);

  const cancellationReasons: string[] = [];

  // Classical Cancellation / Exemption Rules:
  // 1. Mars in Aries or Scorpio (Own signs)
  if (mars.sign === 'Aries' || mars.sign === 'Scorpio') {
    cancellationReasons.push('Mars is in its own swakshetra sign (Aries/Scorpio), nullifying affliction.');
  }
  // 2. Mars in Capricorn (Exalted)
  if (mars.sign === 'Capricorn') {
    cancellationReasons.push('Mars is exalted (Uccha) in Capricorn, transforming energy into constructive discipline.');
  }
  // 3. Mars in 2nd house in Gemini or Virgo
  if (houseFromLagna === 2 && (mars.sign === 'Gemini' || mars.sign === 'Virgo')) {
    cancellationReasons.push('Mars in 2nd house in Mercury-ruled signs (Gemini/Virgo) is exempt in classical texts.');
  }
  // 4. Mars in 7th in Cancer or Capricorn
  if (houseFromLagna === 7 && (mars.sign === 'Cancer' || mars.sign === 'Capricorn')) {
    cancellationReasons.push('Classical exception applies for 7th house placement in Cancer or Capricorn.');
  }
  // 5. Jupiter conjunct or aspecting Mars
  const jupiter = chart.planets.find((p) => p.name === 'Jupiter');
  if (jupiter) {
    const diff = Math.abs(jupiter.absoluteDegree - mars.absoluteDegree);
    if (diff < 10 || Math.abs(diff - 120) < 8 || Math.abs(diff - 240) < 8) {
      cancellationReasons.push('Benefic Jupiter forms a protective aspect with Mars, mitigating marital friction.');
    }
  }

  const isCancelled = cancellationReasons.length > 0;
  let severity: MangalDoshaResult['severity'] = 'None';

  if (!doshaInLagna && !doshaInMoon && !doshaInVenus) {
    severity = 'None';
  } else if (isCancelled) {
    severity = 'Mild';
  } else {
    const count = (doshaInLagna ? 1 : 0) + (doshaInMoon ? 1 : 0) + (doshaInVenus ? 1 : 0);
    if (count === 1) severity = 'Mild';
    else if (count === 2) severity = 'Moderate';
    else severity = 'High';
  }

  const hasDosha = severity !== 'None' && !isCancelled;

  const traditionalMeaning = hasDosha
    ? `Traditional Vedic astrology observes Mars placed in house ${houseFromLagna} from Lagna. In classical texts, this signifies dynamic passion, high initiative, and direct communication in relationships.`
    : isCancelled
    ? `Mars occupies a sensitive house (${houseFromLagna}), but classical cancellation rules apply: ${cancellationReasons.join(' ')}`
    : `Mars is placed in house ${houseFromLagna}, which is free from classical Manglik affliction.`;

  return {
    hasDosha,
    severity,
    marsHouseFromLagna: houseFromLagna,
    marsHouseFromMoon: houseFromMoon,
    marsHouseFromVenus: houseFromVenus,
    isCancelled,
    cancellationReasons,
    traditionalMeaning,
  };
}

const KAALSARP_NAMES = [
  'Anant Kaal Sarp (1st House)',
  'Kulik Kaal Sarp (2nd House)',
  'Vasuki Kaal Sarp (3rd House)',
  'Shankhpal Kaal Sarp (4th House)',
  'Padma Kaal Sarp (5th House)',
  'Mahapadma Kaal Sarp (6th House)',
  'Takshak Kaal Sarp (7th House)',
  'Karkotak Kaal Sarp (8th House)',
  'Shankhachur Kaal Sarp (9th House)',
  'Ghatak Kaal Sarp (10th House)',
  'Vishdhar Kaal Sarp (11th House)',
  'Sheshnag Kaal Sarp (12th House)',
];

export function calculateKaalSarpDosha(chart: NatalChart): KaalSarpDoshaResult {
  const rahu = chart.planets.find((p) => p.name === 'Rahu');
  const ketu = chart.planets.find((p) => p.name === 'Ketu');

  if (!rahu || !ketu) {
    return {
      type: 'None',
      rahuHouse: 1,
      ketuHouse: 7,
      traditionalSignificance: 'No Kaal Sarp condition detected.',
      educationalNote: 'Kaal Sarp Yoga is a specialized 20th-century configuration with varied interpretations among classical traditions.',
    };
  }

  const classicalPlanets = chart.planets.filter(
    (p) => !['Rahu', 'Ketu', 'Uranus', 'Neptune', 'Pluto', 'Ascendant', 'Midheaven'].includes(p.name)
  );

  const rahuDeg = rahu.absoluteDegree;
  const ketuDeg = ketu.absoluteDegree;

  // Check which side of Rahu-Ketu axis each planet falls on
  let sideA = 0;
  let sideB = 0;

  for (const p of classicalPlanets) {
    const pDeg = p.absoluteDegree;
    const diff = (pDeg - rahuDeg + 360) % 360;
    if (diff > 0 && diff < 180) {
      sideA++;
    } else {
      sideB++;
    }
  }

  let type: 'None' | 'Partial' | 'Full' = 'None';
  if (sideA === classicalPlanets.length || sideB === classicalPlanets.length) {
    type = 'Full';
  } else if (sideA === classicalPlanets.length - 1 || sideB === classicalPlanets.length - 1) {
    type = 'Partial';
  }

  const rahuHouse = rahu.house || 1;
  const doshaName = KAALSARP_NAMES[(rahuHouse - 1) % 12];

  const traditionalSignificance =
    type === 'Full'
      ? `All classical planets reside on one side of the nodal axis, forming ${doshaName}. Traditional interpreters suggest intense early-life determination and karmic focus.`
      : type === 'Partial'
      ? `A partial alignment is observed (${doshaName}), with one planet breaking the nodal boundary.`
      : 'Planets are balanced across both hemispheres of the Rahu-Ketu axis. No Kaal Sarp pattern exists.';

  return {
    type,
    doshaName: type !== 'None' ? doshaName : undefined,
    rahuHouse,
    ketuHouse: ketu.house || 7,
    traditionalSignificance,
    educationalNote:
      'Kaal Sarp is interpreted differently across schools of astrology. Many revered scholars consider it a yoga of intense perseverance and worldly accomplishment rather than an affliction.',
  };
}

export function calculateSadeSati(
  natalMoonSign: ZodiacSignName,
  currentSaturnSign: ZodiacSignName = 'Aquarius'
): SadeSatiResult {
  const moonIdx = ZODIAC_SIGNS.indexOf(natalMoonSign);
  const saturnIdx = ZODIAC_SIGNS.indexOf(currentSaturnSign);

  const houseFromMoon = ((saturnIdx - moonIdx + 12) % 12) + 1;

  let isActive = false;
  let phase: SadeSatiResult['phase'] = 'Inactive';
  let startDateEstimate = '2023-01-17';
  let endDateEstimate = '2028-03-29';

  if (houseFromMoon === 12) {
    isActive = true;
    phase = 'Rising (1st Phase)';
    startDateEstimate = '2022-04-29';
    endDateEstimate = '2025-03-29';
  } else if (houseFromMoon === 1) {
    isActive = true;
    phase = 'Peak (2nd Phase)';
    startDateEstimate = '2023-01-17';
    endDateEstimate = '2027-06-03';
  } else if (houseFromMoon === 2) {
    isActive = true;
    phase = 'Setting (3rd Phase)';
    startDateEstimate = '2025-03-29';
    endDateEstimate = '2030-02-23';
  } else if (houseFromMoon === 4 || houseFromMoon === 8) {
    isActive = true;
    phase = 'Dhaiya (Small Panoti)';
    startDateEstimate = 'Active transit';
    endDateEstimate = 'Approx 2.5 years duration';
  }

  const traditionalMeaning = isActive
    ? `Saturn is transiting house ${houseFromMoon} relative to your natal Moon sign (${natalMoonSign}). Traditional Jyotish regards Sade Sati as a 7.5-year metamorphic cycle teaching discipline, emotional maturity, resilience, and stripping away superficial illusions.`
    : `Saturn currently transits ${currentSaturnSign} (House ${houseFromMoon} from your Moon), meaning you are not currently in Sade Sati.`;

  return {
    isActive,
    phase,
    natalMoonSign,
    currentSaturnSign,
    saturnHouseFromMoon: houseFromMoon,
    startDateEstimate,
    endDateEstimate,
    traditionalMeaning,
  };
}

export function calculatePitraDosha(chart: NatalChart): PitraDoshaResult {
  const sun = chart.planets.find((p) => p.name === 'Sun');
  const rahu = chart.planets.find((p) => p.name === 'Rahu');
  const saturn = chart.planets.find((p) => p.name === 'Saturn');
  const ketu = chart.planets.find((p) => p.name === 'Ketu');

  const indicatorsFound: string[] = [];
  let sunAffliction = false;
  let ninthHouseAffliction = false;

  // 1. Sun conjunct Rahu, Ketu, or Saturn
  if (sun && rahu) {
    const diffRahu = Math.abs(sun.absoluteDegree - rahu.absoluteDegree);
    if (diffRahu < 12 || diffRahu > 348) {
      sunAffliction = true;
      indicatorsFound.push('Sun in close proximity to Rahu (Grahan Yoga).');
    }
  }
  if (sun && saturn) {
    const diffSat = Math.abs(sun.absoluteDegree - saturn.absoluteDegree);
    if (diffSat < 10 || diffSat > 350) {
      sunAffliction = true;
      indicatorsFound.push('Sun-Saturn conjunction in natal chart.');
    }
  }

  // 2. 9th house analysis (Bhagya / Dharma / Ancestry)
  const h9 = chart.houses.find((h) => h.house === 9);
  if (h9) {
    if (h9.planets.includes('Rahu')) {
      ninthHouseAffliction = true;
      indicatorsFound.push('Rahu placed in the 9th house (Bhagya Bhava).');
    }
    if (h9.planets.includes('Ketu')) {
      ninthHouseAffliction = true;
      indicatorsFound.push('Ketu placed in the 9th house.');
    }
  }

  const hasDosha = indicatorsFound.length > 0;
  const classicalMitigations = [
    'Honoring elders and performing regular gratitude rituals for lineage ancestors (Pitru Tarpan).',
    'Chanting Gayatri Mantra or Aditya Hridaya Stotram on Sundays.',
    'Planting and caring for sacred trees (Peepal, Banyan) or supporting educational charities.',
  ];

  const traditionalGuidance = hasDosha
    ? `Traditional astrology identifies subtle lineage influences (${indicatorsFound.join(' ')}). In ancient philosophy, this signifies an invitation to resolve intergenerational patterns through conscious integrity and service.`
    : 'No classical Pitra Dosha planetary afflictions detected in your 9th house or solar placements.';

  return {
    hasDosha,
    indicatorsFound,
    sunAffliction,
    ninthHouseAffliction,
    classicalMitigations,
    traditionalGuidance,
  };
}
