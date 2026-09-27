import { PlanetName, PlanetPosition, ZodiacSignName } from '@/types';
import { getJulianDay, getLahiriAyanamsa, normDeg, toRad, toDeg } from './ayanamsa';
import { getNakshatraFromLongitude } from './nakshatra';

export const ZODIAC_SIGNS: ZodiacSignName[] = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const SIGN_SYMBOLS: Record<ZodiacSignName, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓',
};

export const PLANET_SYMBOLS: Record<PlanetName, string> = {
  Sun: '☉',
  Moon: '☽',
  Mercury: '☿',
  Venus: '♀',
  Mars: '♂',
  Jupiter: '♃',
  Saturn: '♄',
  Uranus: '♅',
  Neptune: '♆',
  Pluto: '♇',
  Ascendant: 'AC',
  Midheaven: 'MC',
  Rahu: '☊',
  Ketu: '☋',
};

export const SIGN_ELEMENTS: Record<ZodiacSignName, 'Fire' | 'Earth' | 'Air' | 'Water'> = {
  Aries: 'Fire',
  Taurus: 'Earth',
  Gemini: 'Air',
  Cancer: 'Water',
  Leo: 'Fire',
  Virgo: 'Earth',
  Libra: 'Air',
  Scorpio: 'Water',
  Sagittarius: 'Fire',
  Capricorn: 'Earth',
  Aquarius: 'Air',
  Pisces: 'Water',
};

export const SIGN_MODALITIES: Record<ZodiacSignName, 'Cardinal' | 'Fixed' | 'Mutable'> = {
  Aries: 'Cardinal',
  Taurus: 'Fixed',
  Gemini: 'Mutable',
  Cancer: 'Cardinal',
  Leo: 'Fixed',
  Virgo: 'Mutable',
  Libra: 'Cardinal',
  Scorpio: 'Fixed',
  Sagittarius: 'Mutable',
  Capricorn: 'Cardinal',
  Aquarius: 'Fixed',
  Pisces: 'Mutable',
};

export const SIGN_RULERS: Record<ZodiacSignName, PlanetName> = {
  Aries: 'Mars',
  Taurus: 'Venus',
  Gemini: 'Mercury',
  Cancer: 'Moon',
  Leo: 'Sun',
  Virgo: 'Mercury',
  Libra: 'Venus',
  Scorpio: 'Mars',
  Sagittarius: 'Jupiter',
  Capricorn: 'Saturn',
  Aquarius: 'Saturn',
  Pisces: 'Jupiter',
};

// Classical Exaltation & Debilitation Signs
export const EXALTATION_SIGNS: Partial<Record<PlanetName, ZodiacSignName>> = {
  Sun: 'Aries',
  Moon: 'Taurus',
  Mars: 'Capricorn',
  Mercury: 'Virgo',
  Jupiter: 'Cancer',
  Venus: 'Pisces',
  Saturn: 'Libra',
  Rahu: 'Taurus', // Classical Parashari / Taurus/Gemini
  Ketu: 'Scorpio',
};

export const DEBILITATION_SIGNS: Partial<Record<PlanetName, ZodiacSignName>> = {
  Sun: 'Libra',
  Moon: 'Scorpio',
  Mars: 'Cancer',
  Mercury: 'Pisces',
  Jupiter: 'Capricorn',
  Venus: 'Virgo',
  Saturn: 'Aries',
  Rahu: 'Scorpio',
  Ketu: 'Taurus',
};

// Classical Combustion Orbs in Degrees from Sun
const COMBUSTION_ORBS: Partial<Record<PlanetName, number>> = {
  Moon: 12,
  Mars: 17,
  Mercury: 14,
  Jupiter: 11,
  Venus: 10,
  Saturn: 15,
};

export function getPlanetaryDignity(
  planet: PlanetName,
  sign: ZodiacSignName,
  degree: number
): PlanetPosition['dignity'] {
  if (EXALTATION_SIGNS[planet] === sign) return 'Exalted';
  if (DEBILITATION_SIGNS[planet] === sign) return 'Debilitated';
  if (SIGN_RULERS[sign] === planet) return 'Own Sign';

  // Friendly / Neutral / Enemy classification
  const friends: Partial<Record<PlanetName, PlanetName[]>> = {
    Sun: ['Moon', 'Mars', 'Jupiter'],
    Moon: ['Sun', 'Mercury'],
    Mars: ['Sun', 'Moon', 'Jupiter'],
    Mercury: ['Sun', 'Venus'],
    Jupiter: ['Sun', 'Moon', 'Mars'],
    Venus: ['Mercury', 'Saturn'],
    Saturn: ['Mercury', 'Venus'],
  };
  const enemies: Partial<Record<PlanetName, PlanetName[]>> = {
    Sun: ['Venus', 'Saturn'],
    Moon: [],
    Mars: ['Mercury'],
    Mercury: ['Moon'],
    Jupiter: ['Mercury', 'Venus'],
    Venus: ['Sun', 'Moon'],
    Saturn: ['Sun', 'Moon', 'Mars'],
  };

  const ruler = SIGN_RULERS[sign];
  if (friends[planet]?.includes(ruler)) return 'Friendly';
  if (enemies[planet]?.includes(ruler)) return 'Enemy';
  return 'Neutral';
}

/**
 * Calculates raw celestial coordinates for all major bodies.
 */
export function calculateRawPlanetaryCoordinates(
  date: Date,
  isSidereal: boolean = true
): {
  positions: Record<PlanetName, { longitude: number; speed: number; isRetrograde: boolean }>;
  ayanamsa: number;
} {
  const jd = getJulianDay(date);
  const d = jd - 2451545.0; // days since J2000.0
  const t = d / 36525; // Julian centuries
  const ayanamsa = isSidereal ? getLahiriAyanamsa(jd) : 0;

  // 1. Sun
  const L_sun = normDeg(280.46646 + 36000.76983 * t);
  const M_sun = normDeg(357.52911 + 35999.05029 * t);
  const C_sun =
    (1.914602 - 0.004817 * t) * Math.sin(toRad(M_sun)) +
    (0.019993 - 0.000101 * t) * Math.sin(toRad(2 * M_sun)) +
    0.000289 * Math.sin(toRad(3 * M_sun));
  const sunLon = normDeg(L_sun + C_sun - ayanamsa);
  const sunSpeed = 0.9856 + 0.033 * Math.cos(toRad(M_sun)); // ~0.98 deg/day

  // 2. Moon
  const L_moon = normDeg(218.3165 + 481267.8813 * t);
  const M_moon = normDeg(134.9634 + 477198.8676 * t);
  const D_moon = normDeg(297.8502 + 445267.1115 * t);
  const moonLonCorrection =
    6.289 * Math.sin(toRad(M_moon)) -
    1.274 * Math.sin(toRad(M_moon - 2 * D_moon)) +
    0.658 * Math.sin(toRad(2 * D_moon)) -
    0.186 * Math.sin(toRad(M_sun));
  const moonLon = normDeg(L_moon + moonLonCorrection - ayanamsa);
  const moonSpeed = 13.176 + 1.25 * Math.cos(toRad(M_moon)); // ~13.2 deg/day

  // 3. Mercury
  const L_mercury = normDeg(252.2509 + 149474.0722 * t);
  const M_mercury = normDeg(174.7948 + 149472.6746 * t);
  const mercAnomaly = Math.sin(toRad(M_mercury));
  const mercuryLon = normDeg(L_mercury + 6.3 * mercAnomaly - ayanamsa);
  const mercuryRetro = mercAnomaly < -0.65;

  // 4. Venus
  const L_venus = normDeg(181.9798 + 58519.213 * t);
  const M_venus = normDeg(50.1166 + 58517.8156 * t);
  const venusAnomaly = Math.sin(toRad(M_venus));
  const venusLon = normDeg(L_venus + 0.77 * venusAnomaly - ayanamsa);
  const venusRetro = Math.sin(toRad(L_venus - L_sun)) < -0.85;

  // 5. Mars
  const L_mars = normDeg(355.433 + 19141.6964 * t);
  const M_mars = normDeg(19.373 + 19140.299 * t);
  const marsAnomaly = Math.sin(toRad(M_mars));
  const marsLon = normDeg(L_mars + 10.69 * marsAnomaly - ayanamsa);
  const marsDiffSun = Math.abs(normDeg(marsLon - sunLon));
  const marsRetro = marsDiffSun > 140 && marsDiffSun < 220;

  // 6. Jupiter
  const L_jup = normDeg(34.3515 + 3036.3027 * t);
  const M_jup = normDeg(20.0202 + 3034.9057 * t);
  const jupAnomaly = Math.sin(toRad(M_jup));
  const jupiterLon = normDeg(L_jup + 5.55 * jupAnomaly - ayanamsa);
  const jupDiffSun = Math.abs(normDeg(jupiterLon - sunLon));
  const jupRetro = jupDiffSun > 120 && jupDiffSun < 240;

  // 7. Saturn
  const L_sat = normDeg(50.0774 + 1223.511 * t);
  const M_sat = normDeg(317.0207 + 1222.114 * t);
  const satAnomaly = Math.sin(toRad(M_sat));
  const saturnLon = normDeg(L_sat + 6.35 * satAnomaly - ayanamsa);
  const satDiffSun = Math.abs(normDeg(saturnLon - sunLon));
  const satRetro = satDiffSun > 110 && satDiffSun < 250;

  // 8. Uranus
  const L_ura = normDeg(314.055 + 429.864 * t);
  const uranusLon = normDeg(L_ura + 2.0 * Math.sin(toRad(L_ura - 170)) - ayanamsa);
  const uraDiffSun = Math.abs(normDeg(uranusLon - sunLon));
  const uraRetro = uraDiffSun > 105 && uraDiffSun < 255;

  // 9. Neptune
  const L_nep = normDeg(304.349 + 219.883 * t);
  const neptuneLon = normDeg(L_nep + 1.0 * Math.sin(toRad(L_nep - 60)) - ayanamsa);
  const nepDiffSun = Math.abs(normDeg(neptuneLon - sunLon));
  const nepRetro = nepDiffSun > 105 && nepDiffSun < 255;

  // 10. Pluto
  const L_plu = normDeg(238.96 + 145.208 * t);
  const plutoLon = normDeg(L_plu - ayanamsa);
  const pluDiffSun = Math.abs(normDeg(plutoLon - sunLon));
  const pluRetro = pluDiffSun > 105 && pluDiffSun < 255;

  // 11. Rahu (Mean North Node, moves backwards) & Ketu (South Node)
  const rahuLon = normDeg(125.0445 - 1934.1363 * t - ayanamsa);
  const ketuLon = normDeg(rahuLon + 180);

  const res: Record<PlanetName, { longitude: number; speed: number; isRetrograde: boolean }> = {
    Sun: { longitude: sunLon, speed: sunSpeed, isRetrograde: false },
    Moon: { longitude: moonLon, speed: moonSpeed, isRetrograde: false },
    Mercury: { longitude: mercuryLon, speed: 1.2, isRetrograde: mercuryRetro },
    Venus: { longitude: venusLon, speed: 1.1, isRetrograde: venusRetro },
    Mars: { longitude: marsLon, speed: 0.52, isRetrograde: marsRetro },
    Jupiter: { longitude: jupiterLon, speed: 0.083, isRetrograde: jupRetro },
    Saturn: { longitude: saturnLon, speed: 0.033, isRetrograde: satRetro },
    Uranus: { longitude: uranusLon, speed: 0.012, isRetrograde: uraRetro },
    Neptune: { longitude: neptuneLon, speed: 0.006, isRetrograde: nepRetro },
    Pluto: { longitude: plutoLon, speed: 0.004, isRetrograde: pluRetro },
    Rahu: { longitude: rahuLon, speed: -0.053, isRetrograde: true },
    Ketu: { longitude: ketuLon, speed: -0.053, isRetrograde: true },
    Ascendant: { longitude: 0, speed: 360, isRetrograde: false },
    Midheaven: { longitude: 0, speed: 360, isRetrograde: false },
  };

  return { positions: res, ayanamsa };
}

/**
 * Creates structured PlanetPosition objects.
 */
export function buildPlanetPosition(
  name: PlanetName,
  longitude: number,
  isRetrograde: boolean,
  sunLongitude: number,
  speed: number = 1
): PlanetPosition {
  const normalized = (longitude % 360 + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  const sign = ZODIAC_SIGNS[signIndex];
  const signDeg = normalized % 30;
  const degree = Math.floor(signDeg);
  const minute = Math.floor((signDeg - degree) * 60);

  const nakshatraData = getNakshatraFromLongitude(normalized);

  // Combustion check with Sun
  let isCombust = false;
  if (name !== 'Sun' && name !== 'Rahu' && name !== 'Ketu') {
    const orb = COMBUSTION_ORBS[name] || 10;
    const diff = Math.abs(normalized - sunLongitude);
    const shortest = diff > 180 ? 360 - diff : diff;
    if (shortest <= orb) isCombust = true;
  }

  const dignity = getPlanetaryDignity(name, sign, degree);

  return {
    name,
    symbol: PLANET_SYMBOLS[name] || '★',
    sign,
    signSymbol: SIGN_SYMBOLS[sign],
    degree,
    minute,
    absoluteDegree: Number(normalized.toFixed(2)),
    house: 1, // dynamically updated by house calculation
    isRetrograde,
    isCombust,
    speed: Number(speed.toFixed(3)),
    dignity,
    element: SIGN_ELEMENTS[sign],
    modality: SIGN_MODALITIES[sign],
    nakshatra: {
      name: nakshatraData.nakshatra.name,
      lord: String(nakshatraData.nakshatra.lord),
      pada: nakshatraData.pada,
    },
  };
}
