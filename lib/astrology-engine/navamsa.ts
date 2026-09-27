import { PlanetName, PlanetPosition, ZodiacSignName } from '@/types';
import { ZODIAC_SIGNS } from './planetary';

/**
 * Calculates the Navamsa (D9) sign for a given longitude in degrees [0, 360).
 */
export function getNavamsaSign(longitude: number): {
  navamsaSign: ZodiacSignName;
  navamsaIndex: number;
  partIndex: number; // 0 to 8
} {
  const normLon = (longitude % 360 + 360) % 360;
  const d1SignIndex = Math.floor(normLon / 30);
  const degInSign = normLon % 30;
  const partIndex = Math.floor(degInSign / (30 / 9)); // 3° 20' = 3.333333°

  let startSignIndex = 0;
  // Determine starting Navamsa based on D1 sign modality:
  // Fire signs (Aries, Leo, Sag): 0, 4, 8 -> start from Aries (0)
  // Earth signs (Taurus, Virgo, Cap): 1, 5, 9 -> start from Capricorn (9)
  // Air signs (Gemini, Libra, Aqua): 2, 6, 10 -> start from Libra (6)
  // Water signs (Cancer, Scorpio, Pisces): 3, 7, 11 -> start from Cancer (3)
  const elementGroup = d1SignIndex % 4;
  if (elementGroup === 0) startSignIndex = 0; // Aries
  else if (elementGroup === 1) startSignIndex = 9; // Capricorn
  else if (elementGroup === 2) startSignIndex = 6; // Libra
  else if (elementGroup === 3) startSignIndex = 3; // Cancer

  const navamsaIndex = (startSignIndex + partIndex) % 12;
  return {
    navamsaSign: ZODIAC_SIGNS[navamsaIndex],
    navamsaIndex,
    partIndex,
  };
}

export interface NavamsaPlacement {
  planet: PlanetName;
  d1Sign: ZodiacSignName;
  d9Sign: ZodiacSignName;
  isVargottama: boolean;
  navamsaLord: PlanetName;
}

export function calculateNavamsaChart(
  planets: PlanetPosition[],
  ascendant: PlanetPosition
): {
  ascendantD9: ZodiacSignName;
  placements: NavamsaPlacement[];
  vargottamaPlanets: PlanetName[];
} {
  const ascD9 = getNavamsaSign(ascendant.absoluteDegree).navamsaSign;
  const vargottamaPlanets: PlanetName[] = [];

  const placements: NavamsaPlacement[] = planets.map((p) => {
    const d9Result = getNavamsaSign(p.absoluteDegree);
    const isVargottama = p.sign === d9Result.navamsaSign;
    if (isVargottama) {
      vargottamaPlanets.push(p.name);
    }

    return {
      planet: p.name,
      d1Sign: p.sign,
      d9Sign: d9Result.navamsaSign,
      isVargottama,
      navamsaLord: 'Jupiter', // filled dynamically if needed
    };
  });

  return {
    ascendantD9: ascD9,
    placements,
    vargottamaPlanets,
  };
}
