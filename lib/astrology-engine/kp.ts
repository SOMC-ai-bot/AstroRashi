import { NatalChart, PlanetName, ZodiacSignName } from '@/types';
import { getNakshatraFromLongitude, NAKSHATRAS } from './nakshatra';
import { calculateAscendantAndMC } from './houses';
import { calculateRawPlanetaryCoordinates, SIGN_RULERS, ZODIAC_SIGNS } from './planetary';
import { WEEKDAY_LORDS } from './panchang';

// Classical KP Sub Lord division of a Nakshatra (9 unequal parts proportional to Vimshottari years)
const KP_SUB_YEARS: { planet: PlanetName; years: number }[] = [
  { planet: 'Ketu', years: 7 },
  { planet: 'Venus', years: 20 },
  { planet: 'Sun', years: 6 },
  { planet: 'Moon', years: 10 },
  { planet: 'Mars', years: 7 },
  { planet: 'Rahu', years: 18 },
  { planet: 'Jupiter', years: 16 },
  { planet: 'Saturn', years: 19 },
  { planet: 'Mercury', years: 17 },
];

export interface KpSubLordInfo {
  name: string;
  sign: ZodiacSignName;
  signLord: PlanetName;
  starLord: string;
  subLord: PlanetName;
  degree: number;
}

export interface KpHoraryResult {
  horaryNumber: number;
  sign: ZodiacSignName;
  signLord: PlanetName;
  nakshatra: string;
  starLord: string;
  subLord: PlanetName;
  startingDegree: number;
  guidance: string;
}

export interface KpRulingPlanetsResult {
  calculatedAt: string;
  dayLord: PlanetName;
  moonSignLord: PlanetName;
  moonStarLord: string;
  moonSubLord: PlanetName;
  ascendantSignLord: PlanetName;
  ascendantStarLord: string;
  ascendantSubLord: PlanetName;
}

/**
 * Computes the KP Sub-Lord for any given celestial longitude [0, 360).
 */
export function getKpSubLord(longitude: number): {
  starLord: string;
  subLord: PlanetName;
  signLord: PlanetName;
  sign: ZodiacSignName;
} {
  const norm = (longitude % 360 + 360) % 360;
  const signIdx = Math.floor(norm / 30);
  const sign = ZODIAC_SIGNS[signIdx];
  const signLord = SIGN_RULERS[sign];

  const nakSpan = 360 / 27; // 13.333333°
  const nakIdx = Math.floor(norm / nakSpan);
  const nak = NAKSHATRAS[nakIdx % 27];
  const starLord = String(nak.lord);

  // Position within nakshatra (0 to 13.333333°)
  const degInNak = norm - nakIdx * nakSpan;

  // Starting sub-lord is the star lord itself, then cycles in Vimshottari order
  const startSubIdx = KP_SUB_YEARS.findIndex(
    (k) => k.planet.toLowerCase() === starLord.toLowerCase()
  );
  const safeStart = startSubIdx >= 0 ? startSubIdx : 0;

  let elapsedDeg = 0;
  let subLord: PlanetName = 'Jupiter';

  for (let i = 0; i < 9; i++) {
    const item = KP_SUB_YEARS[(safeStart + i) % 9];
    const subSpan = (nakSpan * item.years) / 120;
    if (degInNak >= elapsedDeg && degInNak < elapsedDeg + subSpan) {
      subLord = item.planet;
      break;
    }
    elapsedDeg += subSpan;
  }

  return { starLord, subLord, signLord, sign };
}

/**
 * KP Horary 1 to 249 Table
 * The 360° zodiac is mapped to 249 unequal sub-divisions.
 */
export function calculateKpHorary(number: number): KpHoraryResult {
  const safeNum = Math.max(1, Math.min(249, Math.round(number)));

  // Approximate longitude for horary number 1 to 249 (avg 1.4457° per horary number)
  const estLongitude = ((safeNum - 0.5) * 360) / 249;
  const { starLord, subLord, signLord, sign } = getKpSubLord(estLongitude);
  const nakData = getNakshatraFromLongitude(estLongitude);

  const guidance = `In Krishnamurti Paddhati (KP), Horary Number ${safeNum} connects to the ruling sub-lord ${subLord} in the constellation of ${starLord} (${sign}). KP horary principles analyze whether the sub-lord signifies fruitful houses (2, 6, 11 for career/success; 2, 7, 11 for marriage/partnerships) to judge outcomes.`;

  return {
    horaryNumber: safeNum,
    sign,
    signLord,
    nakshatra: nakData.nakshatra.name,
    starLord,
    subLord,
    startingDegree: Number(estLongitude.toFixed(2)),
    guidance,
  };
}

export function calculateKpNatalSubLords(chart: NatalChart): KpSubLordInfo[] {
  const list: KpSubLordInfo[] = [];

  // Ascendant
  const ascSub = getKpSubLord(chart.ascendant.absoluteDegree);
  list.push({
    name: 'Ascendant (Cusp 1)',
    sign: ascSub.sign,
    signLord: ascSub.signLord,
    starLord: ascSub.starLord,
    subLord: ascSub.subLord,
    degree: chart.ascendant.absoluteDegree,
  });

  // Planets
  for (const p of chart.planets) {
    const subInfo = getKpSubLord(p.absoluteDegree);
    list.push({
      name: p.name,
      sign: subInfo.sign,
      signLord: subInfo.signLord,
      starLord: subInfo.starLord,
      subLord: subInfo.subLord,
      degree: p.absoluteDegree,
    });
  }

  return list;
}

export function calculateKpRulingPlanetsNow(
  latitude: number = 25.3176,
  longitude: number = 82.9739
): KpRulingPlanetsResult {
  const now = new Date();
  const weekday = now.getDay();
  const dayLord = WEEKDAY_LORDS[weekday].lord;

  const { positions, ayanamsa } = calculateRawPlanetaryCoordinates(now, true);
  const moonLon = positions.Moon.longitude;
  const moonSub = getKpSubLord(moonLon);

  const { ascendantDeg } = calculateAscendantAndMC(now, latitude, longitude, ayanamsa);
  const ascSub = getKpSubLord(ascendantDeg);

  return {
    calculatedAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    dayLord,
    moonSignLord: moonSub.signLord,
    moonStarLord: moonSub.starLord,
    moonSubLord: moonSub.subLord,
    ascendantSignLord: ascSub.signLord,
    ascendantStarLord: ascSub.starLord,
    ascendantSubLord: ascSub.subLord,
  };
}
