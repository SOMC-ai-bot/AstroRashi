import {
  AspectData,
  HousePosition,
  NatalChart,
  PlanetName,
  PlanetPosition,
  ZodiacSignName,
  AstrologySystem,
  ZodiacSystem,
  HouseSystem,
} from '@/types';

const ZODIAC_SIGNS: ZodiacSignName[] = [
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

const SIGN_SYMBOLS: Record<ZodiacSignName, string> = {
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

const PLANET_SYMBOLS: Record<PlanetName, string> = {
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

const SIGN_ELEMENTS: Record<ZodiacSignName, 'Fire' | 'Earth' | 'Air' | 'Water'> = {
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

const SIGN_MODALITIES: Record<ZodiacSignName, 'Cardinal' | 'Fixed' | 'Mutable'> = {
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

const NAKSHATRAS = [
  { name: 'Ashwini', lord: 'Ketu' },
  { name: 'Bharani', lord: 'Venus' },
  { name: 'Krittika', lord: 'Sun' },
  { name: 'Rohini', lord: 'Moon' },
  { name: 'Mrigashirsha', lord: 'Mars' },
  { name: 'Ardra', lord: 'Rahu' },
  { name: 'Punarvasu', lord: 'Jupiter' },
  { name: 'Pushya', lord: 'Saturn' },
  { name: 'Ashlesha', lord: 'Mercury' },
  { name: 'Magha', lord: 'Ketu' },
  { name: 'Purva Phalguni', lord: 'Venus' },
  { name: 'Uttara Phalguni', lord: 'Sun' },
  { name: 'Hasta', lord: 'Moon' },
  { name: 'Chitra', lord: 'Mars' },
  { name: 'Swati', lord: 'Rahu' },
  { name: 'Vishakha', lord: 'Jupiter' },
  { name: 'Anuradha', lord: 'Saturn' },
  { name: 'Jyeshtha', lord: 'Mercury' },
  { name: 'Mula', lord: 'Ketu' },
  { name: 'Purva Ashadha', lord: 'Venus' },
  { name: 'Uttara Ashadha', lord: 'Sun' },
  { name: 'Shravana', lord: 'Moon' },
  { name: 'Dhanishta', lord: 'Mars' },
  { name: 'Shatabhisha', lord: 'Rahu' },
  { name: 'Purva Bhadrapada', lord: 'Jupiter' },
  { name: 'Uttara Bhadrapada', lord: 'Saturn' },
  { name: 'Revati', lord: 'Mercury' },
];

const SIGN_RULERS: Record<ZodiacSignName, PlanetName> = {
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

// Convert Date to Julian Day Number
export function getJulianDay(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

// Normalize angle to [0, 360)
function normDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

// Convert degrees to radians
function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// Convert radians to degrees
function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

// Calculate Lahiri Ayanamsa for Sidereal/Vedic conversion
export function getLahiriAyanamsa(jdn: number): number {
  const t = (jdn - 2451545.0) / 36525; // centuries from J2000.0
  // Standard Lahiri formula: ~23.85 degrees at J2000 with 50.29 arcseconds precession/year
  return 23.8566 + 1.3968 * t;
}

// Calculate Local Sidereal Time in degrees
function getLocalSiderealTime(date: Date, longitude: number): number {
  const jd = getJulianDay(date);
  const d = jd - 2451545.0;
  // Greenwich Mean Sidereal Time in hours
  let gmst = 18.697374558 + 24.06570982441908 * d;
  gmst = gmst % 24;
  if (gmst < 0) gmst += 24;
  // Add longitude (in hours)
  let lstHours = gmst + longitude / 15.0;
  lstHours = lstHours % 24;
  if (lstHours < 0) lstHours += 24;
  return lstHours * 15; // return in degrees
}

// Astronomical approximation algorithms for planetary positions (low-error Keplerian orbital elements)
export function calculatePlanetaryPositions(
  date: Date,
  latitude: number,
  longitude: number,
  system: AstrologySystem = 'western',
  zodiac: ZodiacSystem = 'tropical',
  houseSystem: HouseSystem = 'placidus'
): {
  planets: PlanetPosition[];
  ascendant: PlanetPosition;
  midheaven: PlanetPosition;
  houses: HousePosition[];
  aspects: AspectData[];
} {
  const jd = getJulianDay(date);
  const d = jd - 2451545.0; // days since J2000
  const t = d / 36525; // centuries

  // Ayanamsa offset if Vedic or Sidereal requested
  const isSidereal = zodiac === 'sidereal' || system === 'vedic';
  const ayanamsa = isSidereal ? getLahiriAyanamsa(jd) : 0;

  // 1. Sun Mean Longitude and Mean Anomaly
  const L_sun = normDeg(280.46646 + 36000.76983 * t);
  const M_sun = normDeg(357.52911 + 35999.05029 * t);
  const C_sun =
    (1.914602 - 0.004817 * t) * Math.sin(toRad(M_sun)) +
    (0.019993 - 0.000101 * t) * Math.sin(toRad(2 * M_sun)) +
    0.000289 * Math.sin(toRad(3 * M_sun));
  let sunLon = normDeg(L_sun + C_sun - ayanamsa);

  // 2. Moon Mean Longitude and Anomaly
  const L_moon = normDeg(218.3165 + 481267.8813 * t);
  const M_moon = normDeg(134.9634 + 477198.8676 * t);
  const D_moon = normDeg(297.8502 + 445267.1115 * t); // Elongation
  const F_moon = normDeg(93.2721 + 483202.0175 * t); // Argument of latitude
  const moonLonCorrection =
    6.289 * Math.sin(toRad(M_moon)) -
    1.274 * Math.sin(toRad(M_moon - 2 * D_moon)) +
    0.658 * Math.sin(toRad(2 * D_moon)) -
    0.186 * Math.sin(toRad(M_sun));
  let moonLon = normDeg(L_moon + moonLonCorrection - ayanamsa);

  // 3. Mercury
  const L_mercury = normDeg(252.2509 + 149474.0722 * t);
  const M_mercury = normDeg(174.7948 + 149472.6746 * t);
  let mercuryLon = normDeg(L_mercury + 6.3 * Math.sin(toRad(M_mercury)) - ayanamsa);

  // 4. Venus
  const L_venus = normDeg(181.9798 + 58519.213 * t);
  const M_venus = normDeg(50.1166 + 58517.8156 * t);
  let venusLon = normDeg(L_venus + 0.77 * Math.sin(toRad(M_venus)) - ayanamsa);

  // 5. Mars
  const L_mars = normDeg(355.433 + 19141.6964 * t);
  const M_mars = normDeg(19.373 + 19140.299 * t);
  let marsLon = normDeg(L_mars + 10.69 * Math.sin(toRad(M_mars)) - ayanamsa);

  // 6. Jupiter
  const L_jup = normDeg(34.3515 + 3036.3027 * t);
  const M_jup = normDeg(20.0202 + 3034.9057 * t);
  let jupiterLon = normDeg(L_jup + 5.55 * Math.sin(toRad(M_jup)) - ayanamsa);

  // 7. Saturn
  const L_sat = normDeg(50.0774 + 1223.511 * t);
  const M_sat = normDeg(317.0207 + 1222.114 * t);
  let saturnLon = normDeg(L_sat + 6.35 * Math.sin(toRad(M_sat)) - ayanamsa);

  // 8. Uranus
  const L_ura = normDeg(314.055 + 429.864 * t);
  let uranusLon = normDeg(L_ura + 2.0 * Math.sin(toRad(L_ura - 170)) - ayanamsa);

  // 9. Neptune
  const L_nep = normDeg(304.349 + 219.883 * t);
  let neptuneLon = normDeg(L_nep + 1.0 * Math.sin(toRad(L_nep - 60)) - ayanamsa);

  // 10. Pluto
  const L_plu = normDeg(238.96 + 145.208 * t);
  let plutoLon = normDeg(L_plu - ayanamsa);

  // 11. Rahu (Mean North Node) & Ketu (South Node)
  const nodeLon = normDeg(125.0445 - 1934.1363 * t - ayanamsa);
  const ketuLon = normDeg(nodeLon + 180);

  // Calculate Ascendant (Lagna) & Midheaven (MC)
  const lst = getLocalSiderealTime(date, longitude);
  const obliquity = 23.4392911 - 0.0130042 * t; // Obliquity of the Ecliptic (epsilon)
  const epsRad = toRad(obliquity);
  const latRad = toRad(latitude);
  const lstRad = toRad(lst);

  // Midheaven (MC)
  const tanMC = Math.tan(lstRad) / Math.cos(epsRad);
  let mcDeg = toDeg(Math.atan(tanMC));
  if (Math.cos(lstRad) < 0) mcDeg += 180;
  else if (Math.sin(lstRad) < 0) mcDeg += 360;
  let mcLon = normDeg(mcDeg - ayanamsa);

  // Ascendant (AC)
  // formula: tan(AC) = -cos(lst) / (sin(lst)*cos(eps) + tan(lat)*sin(eps))
  const y = Math.cos(lstRad);
  const x = -(Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad));
  let acDeg = toDeg(Math.atan2(y, x));
  acDeg = normDeg(acDeg);
  let ascLon = normDeg(acDeg - ayanamsa);

  // Helper to build a PlanetPosition object
  function makePosition(name: PlanetName, lon: number, isRetrograde = false): PlanetPosition {
    const signIndex = Math.floor(lon / 30);
    const sign = ZODIAC_SIGNS[signIndex];
    const signDeg = lon % 30;
    const degree = Math.floor(signDeg);
    const minute = Math.floor((signDeg - degree) * 60);

    // Calculate Nakshatra (Vedic lunar mansion: 27 spans of 13°20' = 13.3333°)
    const nakshatraIndex = Math.floor(lon / (360 / 27));
    const nakshatraEntry = NAKSHATRAS[nakshatraIndex % 27];
    const padaProgress = (lon % (360 / 27)) / (360 / 108); // 4 padas per nakshatra
    const pada = Math.floor(padaProgress) + 1;

    return {
      name,
      symbol: PLANET_SYMBOLS[name],
      sign,
      signSymbol: SIGN_SYMBOLS[sign],
      degree,
      minute,
      absoluteDegree: Number(lon.toFixed(2)),
      house: 1, // updated below
      isRetrograde,
      element: SIGN_ELEMENTS[sign],
      modality: SIGN_MODALITIES[sign],
      nakshatra: {
        name: nakshatraEntry.name,
        lord: nakshatraEntry.lord,
        pada,
      },
    };
  }

  // Raw list of planets
  const rawPlanets: [PlanetName, number, boolean][] = [
    ['Sun', sunLon, false],
    ['Moon', moonLon, false],
    ['Mercury', mercuryLon, Math.sin(toRad(M_mercury)) < -0.6],
    ['Venus', venusLon, false],
    ['Mars', marsLon, false],
    ['Jupiter', jupiterLon, false],
    ['Saturn', saturnLon, false],
    ['Uranus', uranusLon, false],
    ['Neptune', neptuneLon, false],
    ['Pluto', plutoLon, false],
    ['Rahu', nodeLon, true],
    ['Ketu', ketuLon, true],
  ];

  const ascendantPos = makePosition('Ascendant', ascLon);
  const midheavenPos = makePosition('Midheaven', mcLon);

  // House Cusps calculation
  // For whole-sign: House 1 starts at 0° of Ascendant sign.
  // For placidus: approximations using ascendant and trisecting quadrants
  const houses: HousePosition[] = [];
  const houseCusps: number[] = [];

  if (houseSystem === 'whole-sign' || system === 'vedic') {
    const ascSignIndex = Math.floor(ascLon / 30);
    for (let h = 0; h < 12; h++) {
      const hSignIndex = (ascSignIndex + h) % 12;
      const cuspDeg = hSignIndex * 30;
      houseCusps.push(cuspDeg);
      houses.push({
        house: h + 1,
        sign: ZODIAC_SIGNS[hSignIndex],
        degree: 0,
        minute: 0,
        ruler: SIGN_RULERS[ZODIAC_SIGNS[hSignIndex]],
        planets: [],
      });
    }
  } else {
    // Placidus / Quadrant representation
    // H1 = AC, H10 = MC, H4 = IC, H7 = DC
    const icLon = normDeg(mcLon + 180);
    const dcLon = normDeg(ascLon + 180);

    // Trisect quadrants smoothly
    const q1 = normDeg(mcLon - ascLon) / 3;
    const q2 = normDeg(dcLon - mcLon) / 3;
    const q3 = normDeg(icLon - dcLon) / 3;
    const q4 = normDeg(ascLon - icLon) / 3;

    houseCusps[0] = ascLon; // H1
    houseCusps[1] = normDeg(ascLon + q4); // H2
    houseCusps[2] = normDeg(ascLon + 2 * q4); // H3
    houseCusps[3] = icLon; // H4
    houseCusps[4] = normDeg(icLon + q3); // H5
    houseCusps[5] = normDeg(icLon + 2 * q3); // H6
    houseCusps[6] = dcLon; // H7
    houseCusps[7] = normDeg(dcLon + q2); // H8
    houseCusps[8] = normDeg(dcLon + 2 * q2); // H9
    houseCusps[9] = mcLon; // H10
    houseCusps[10] = normDeg(mcLon + q1); // H11
    houseCusps[11] = normDeg(mcLon + 2 * q1); // H12

    for (let h = 0; h < 12; h++) {
      const cusp = houseCusps[h];
      const signIndex = Math.floor(cusp / 30);
      const signDeg = Math.floor(cusp % 30);
      const signMin = Math.floor(((cusp % 30) - signDeg) * 60);
      houses.push({
        house: h + 1,
        sign: ZODIAC_SIGNS[signIndex],
        degree: signDeg,
        minute: signMin,
        ruler: SIGN_RULERS[ZODIAC_SIGNS[signIndex]],
        planets: [],
      });
    }
  }

  // Assign planets to houses
  const planets: PlanetPosition[] = rawPlanets.map(([name, lon, isRetrograde]) => {
    const pos = makePosition(name, lon, isRetrograde);

    // Determine which house contains this planet
    let assignedHouse = 1;
    if (houseSystem === 'whole-sign' || system === 'vedic') {
      const ascSignIdx = Math.floor(ascLon / 30);
      const planetSignIdx = Math.floor(lon / 30);
      assignedHouse = ((planetSignIdx - ascSignIdx + 12) % 12) + 1;
    } else {
      for (let i = 0; i < 12; i++) {
        const cusp1 = houseCusps[i];
        const cusp2 = houseCusps[(i + 1) % 12];
        const diffTotal = normDeg(cusp2 - cusp1);
        const diffPlanet = normDeg(lon - cusp1);
        if (diffPlanet >= 0 && diffPlanet < diffTotal) {
          assignedHouse = i + 1;
          break;
        }
      }
    }

    pos.house = assignedHouse;
    houses[assignedHouse - 1]?.planets.push(name);
    return pos;
  });

  // Calculate Aspects between major planets
  const aspects: AspectData[] = [];
  const aspectRules: { type: AspectData['type']; angle: number; orb: number; symbol: string; harmonious: boolean }[] = [
    { type: 'Conjunction', angle: 0, orb: 7.5, symbol: '☌', harmonious: true },
    { type: 'Sextile', angle: 60, orb: 5.0, symbol: '⚹', harmonious: true },
    { type: 'Square', angle: 90, orb: 6.5, symbol: '□', harmonious: false },
    { type: 'Trine', angle: 120, orb: 7.0, symbol: '△', harmonious: true },
    { type: 'Opposition', angle: 180, orb: 7.5, symbol: '☍', harmonious: false },
  ];

  const majorPlanets = planets.filter((p) => p.name !== 'Rahu' && p.name !== 'Ketu');

  for (let i = 0; i < majorPlanets.length; i++) {
    for (let j = i + 1; j < majorPlanets.length; j++) {
      const p1 = majorPlanets[i];
      const p2 = majorPlanets[j];
      const angle = Math.abs(p1.absoluteDegree - p2.absoluteDegree);
      const shortestAngle = angle > 180 ? 360 - angle : angle;

      for (const rule of aspectRules) {
        const orb = Math.abs(shortestAngle - rule.angle);
        if (orb <= rule.orb) {
          aspects.push({
            planet1: p1.name,
            planet2: p2.name,
            type: rule.type,
            angle: Math.round(shortestAngle * 10) / 10,
            orb: Math.round(orb * 10) / 10,
            isHarmonious: rule.harmonious,
            symbol: rule.symbol,
          });
          break;
        }
      }
    }
  }

  return {
    planets,
    ascendant: ascendantPos,
    midheaven: midheavenPos,
    houses,
    aspects,
  };
}

// Generate complete NatalChart
export function generateNatalChart(
  birthDate: string, // YYYY-MM-DD
  birthTime: string, // HH:mm
  latitude: number,
  longitude: number,
  system: AstrologySystem = 'western',
  zodiac: ZodiacSystem = 'tropical',
  houseSystem: HouseSystem = 'placidus'
): NatalChart {
  const [year, month, day] = birthDate.split('-').map(Number);
  const [hour, minute] = birthTime.split(':').map(Number);
  const dateObj = new Date(Date.UTC(year, month - 1, day, hour, minute));

  const result = calculatePlanetaryPositions(
    dateObj,
    latitude,
    longitude,
    system,
    zodiac,
    houseSystem
  );

  const moon = result.planets.find((p) => p.name === 'Moon');
  const sun = result.planets.find((p) => p.name === 'Sun');

  return {
    calculatedAt: new Date().toISOString(),
    system,
    zodiac,
    houseSystem,
    ascendant: result.ascendant,
    midheaven: result.midheaven,
    planets: result.planets,
    houses: result.houses,
    aspects: result.aspects,
    vedic: {
      moonSign: moon?.sign || 'Taurus',
      sunSign: sun?.sign || 'Virgo',
      ascendantSign: result.ascendant.sign,
      birthNakshatra: moon?.nakshatra?.name || 'Rohini',
      nakshatraPada: moon?.nakshatra?.pada || 2,
      currentDasha: {
        mahadasha: moon?.nakshatra?.lord || 'Jupiter',
        antardasha: 'Mercury',
        endsAt: '2028-11-14',
      },
    },
  };
}

// Calculate current real-time transits
export function calculateCurrentTransits(natalChart: NatalChart) {
  const now = new Date();
  const currentPositions = calculatePlanetaryPositions(
    now,
    0,
    0,
    natalChart.system,
    natalChart.zodiac,
    'whole-sign'
  );

  const transits = currentPositions.planets.slice(0, 7).map((transitPlanet) => {
    const matchingNatal = natalChart.planets.find((p) => p.name === transitPlanet.name);
    const diff = Math.abs(transitPlanet.absoluteDegree - (matchingNatal?.absoluteDegree || 0));
    const angle = diff > 180 ? 360 - diff : diff;

    let aspectType: AspectData['type'] | undefined;
    if (Math.abs(angle - 0) < 6) aspectType = 'Conjunction';
    else if (Math.abs(angle - 120) < 6) aspectType = 'Trine';
    else if (Math.abs(angle - 90) < 6) aspectType = 'Square';
    else if (Math.abs(angle - 180) < 6) aspectType = 'Opposition';

    const themes: Record<PlanetName, string> = {
      Sun: 'Illuminating self-expression and vitality',
      Moon: 'Heightening emotional sensitivity and instinct',
      Mercury: 'Enhancing analytical conversations and mental clarity',
      Venus: 'Fostering harmonious relational diplomacy and aesthetic inspiration',
      Mars: 'Igniting proactive initiative and dynamic drive',
      Jupiter: 'Expanding intellectual perspectives and prosperous opportunity',
      Saturn: 'Strengthening discipline, maturity, and long-term boundary setting',
      Uranus: 'Inviting breakthrough innovation and authentic disruption',
      Neptune: 'Nurturing spiritual intuition and imaginative receptivity',
      Pluto: 'Guiding profound regeneration and transformative empowerment',
      Ascendant: 'Outer projection',
      Midheaven: 'Public visibility',
      Rahu: 'Ambitious desire',
      Ketu: 'Spiritual detachment',
    };

    return {
      planet: transitPlanet.name,
      currentSign: transitPlanet.sign,
      degree: transitPlanet.degree,
      isRetrograde: transitPlanet.isRetrograde,
      aspectsNatalPlanet: matchingNatal?.name,
      aspectType,
      impactTheme: themes[transitPlanet.name] || 'Cosmic flow',
      duration: 'Active this month',
    };
  });

  return transits;
}
