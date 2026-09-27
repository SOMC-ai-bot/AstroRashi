import {
  AspectData,
  AstrologySystem,
  HouseSystem,
  NatalChart,
  PlanetPosition,
  ZodiacSignName,
  ZodiacSystem,
} from '@/types';
import { getLahiriAyanamsa, normDeg } from './ayanamsa';
import {
  buildPlanetPosition,
  calculateRawPlanetaryCoordinates,
  ZODIAC_SIGNS,
} from './planetary';
import { assignPlanetsToHouses, calculateAscendantAndMC, calculateHouses } from './houses';
import { calculateNavamsaChart } from './navamsa';
import { calculateVimshottariDasha } from './dasha';

export function generateFullNatalChart(
  birthDate: string, // YYYY-MM-DD
  birthTime: string, // HH:mm
  latitude: number,
  longitude: number,
  system: AstrologySystem = 'vedic',
  zodiac: ZodiacSystem = 'sidereal',
  houseSystem: HouseSystem = 'whole-sign'
): NatalChart {
  const [year, month, day] = birthDate.split('-').map(Number);
  const [hour, minute] = birthTime.split(':').map(Number);
  const dateObj = new Date(Date.UTC(year, month - 1, day, hour, minute));

  const isSidereal = zodiac === 'sidereal' || system === 'vedic';
  const { positions, ayanamsa } = calculateRawPlanetaryCoordinates(dateObj, isSidereal);

  const sunLon = positions.Sun.longitude;

  // Build raw PlanetPositions
  const rawPlanets: PlanetPosition[] = (
    Object.keys(positions) as (keyof typeof positions)[]
  )
    .filter((k) => k !== 'Ascendant' && k !== 'Midheaven')
    .map((name) => {
      const p = positions[name];
      return buildPlanetPosition(name, p.longitude, p.isRetrograde, sunLon, p.speed);
    });

  // Calculate Ascendant & MC
  const { ascendantDeg, midheavenDeg } = calculateAscendantAndMC(
    dateObj,
    latitude,
    longitude,
    ayanamsa
  );

  const ascendantPos = buildPlanetPosition('Ascendant', ascendantDeg, false, sunLon, 360);
  const midheavenPos = buildPlanetPosition('Midheaven', midheavenDeg, false, sunLon, 360);

  // Calculate Houses
  const effectiveHouseSystem: HouseSystem = system === 'vedic' ? 'whole-sign' : houseSystem;
  const { houses, houseCusps } = calculateHouses(ascendantDeg, midheavenDeg, effectiveHouseSystem);

  // Assign planets into houses
  const planets = assignPlanetsToHouses(
    rawPlanets,
    houses,
    houseCusps,
    ascendantDeg,
    effectiveHouseSystem
  );

  // Calculate Aspects
  const aspects: AspectData[] = [];
  const aspectRules = [
    { type: 'Conjunction' as const, angle: 0, orb: 7.5, symbol: '☌', harmonious: true },
    { type: 'Sextile' as const, angle: 60, orb: 5.0, symbol: '⚹', harmonious: true },
    { type: 'Square' as const, angle: 90, orb: 6.5, symbol: '□', harmonious: false },
    { type: 'Trine' as const, angle: 120, orb: 7.0, symbol: '△', harmonious: true },
    { type: 'Opposition' as const, angle: 180, orb: 7.5, symbol: '☍', harmonious: false },
  ];

  const majorPlanets = planets.filter((p) => p.name !== 'Rahu' && p.name !== 'Ketu');
  for (let i = 0; i < majorPlanets.length; i++) {
    for (let j = i + 1; j < majorPlanets.length; j++) {
      const p1 = majorPlanets[i];
      const p2 = majorPlanets[j];
      const angle = Math.abs(p1.absoluteDegree - p2.absoluteDegree);
      const shortest = angle > 180 ? 360 - angle : angle;

      for (const rule of aspectRules) {
        const diffOrb = Math.abs(shortest - rule.angle);
        if (diffOrb <= rule.orb) {
          aspects.push({
            planet1: p1.name,
            planet2: p2.name,
            type: rule.type,
            angle: Math.round(shortest * 10) / 10,
            orb: Math.round(diffOrb * 10) / 10,
            isHarmonious: rule.harmonious,
            symbol: rule.symbol,
          });
          break;
        }
      }
    }
  }

  const moon = planets.find((p) => p.name === 'Moon');
  const sun = planets.find((p) => p.name === 'Sun');
  const d9Chart = calculateNavamsaChart(planets, ascendantPos);
  const dashaData = calculateVimshottariDasha(
    moon ? moon.absoluteDegree : 0,
    dateObj,
    new Date()
  );

  return {
    calculatedAt: new Date().toISOString(),
    system,
    zodiac,
    houseSystem: effectiveHouseSystem,
    ascendant: ascendantPos,
    midheaven: midheavenPos,
    planets,
    houses,
    aspects,
    vedic: {
      moonSign: moon?.sign || 'Taurus',
      sunSign: sun?.sign || 'Virgo',
      ascendantSign: ascendantPos.sign,
      birthNakshatra: moon?.nakshatra?.name || 'Rohini',
      nakshatraPada: moon?.nakshatra?.pada || 1,
      currentDasha: {
        mahadasha: dashaData.currentMahadasha,
        antardasha: dashaData.currentAntardasha,
        endsAt: '2028-11-14',
      },
      d9Navamsa: {
        ascendantSign: d9Chart.ascendantD9,
        planetaryNavamsas: d9Chart.placements.map((pl) => ({
          planet: pl.planet,
          sign: pl.d9Sign,
          isVargottama: pl.isVargottama,
        })),
      },
    },
  };
}
