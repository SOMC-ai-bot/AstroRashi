import { NatalChart, PlanetName } from '@/types';
import { EXALTATION_SIGNS } from './planetary';

export interface DetectedYoga {
  id: string;
  name: string;
  sanskritName: string;
  category: 'Raj Yoga' | 'Dhana Yoga' | 'Mahapurusha' | 'Special Yoga';
  planetsInvolved: PlanetName[];
  housesInvolved: number[];
  formationLogic: string;
  traditionalInterpretation: string;
  strengthScore: number; // 1 to 10
}

export function detectChartYogas(chart: NatalChart): DetectedYoga[] {
  const yogas: DetectedYoga[] = [];

  const sun = chart.planets.find((p) => p.name === 'Sun');
  const moon = chart.planets.find((p) => p.name === 'Moon');
  const mars = chart.planets.find((p) => p.name === 'Mars');
  const mercury = chart.planets.find((p) => p.name === 'Mercury');
  const jupiter = chart.planets.find((p) => p.name === 'Jupiter');
  const venus = chart.planets.find((p) => p.name === 'Venus');
  const saturn = chart.planets.find((p) => p.name === 'Saturn');

  // 1. Gaja Kesari Yoga (Jupiter in Kendra from Moon: 1, 4, 7, 10)
  if (jupiter && moon) {
    const moonSignIdx = Math.floor(moon.absoluteDegree / 30);
    const jupSignIdx = Math.floor(jupiter.absoluteDegree / 30);
    const diffHouses = ((jupSignIdx - moonSignIdx + 12) % 12) + 1;
    if ([1, 4, 7, 10].includes(diffHouses)) {
      yogas.push({
        id: 'gaja-kesari',
        name: 'Gaja Kesari Yoga',
        sanskritName: 'गजकेसरी योग',
        category: 'Raj Yoga',
        planetsInvolved: ['Jupiter', 'Moon'],
        housesInvolved: [moon.house, jupiter.house],
        formationLogic: `Jupiter is in house ${diffHouses} (Kendra) relative to natal Moon.`,
        traditionalInterpretation:
          'Bestows wisdom, enduring reputation, intellectual eloquence, moral courage, and noble prosperity. A hallmark of respect in society.',
        strengthScore: 9,
      });
    }
  }

  // 2. Budhaditya Yoga (Sun + Mercury conjunct)
  if (sun && mercury) {
    const diff = Math.abs(sun.absoluteDegree - mercury.absoluteDegree);
    if (diff < 12) {
      yogas.push({
        id: 'budhaditya',
        name: 'Budhaditya Yoga',
        sanskritName: 'बुधादित्य योग',
        category: 'Raj Yoga',
        planetsInvolved: ['Sun', 'Mercury'],
        housesInvolved: [sun.house],
        formationLogic: `Sun and Mercury are conjunct within ${diff.toFixed(1)}° in ${sun.sign}.`,
        traditionalInterpretation:
          'Sharp intellect, analytical acumen, administrative authority, eloquence, and capacity to master intricate commercial or scientific systems.',
        strengthScore: 8,
      });
    }
  }

  // 3. Chandra Mangala Yoga (Moon + Mars conjunct or mutual aspect)
  if (moon && mars) {
    const diff = Math.abs(moon.absoluteDegree - mars.absoluteDegree);
    const shortest = diff > 180 ? 360 - diff : diff;
    if (shortest < 10 || Math.abs(shortest - 180) < 10) {
      yogas.push({
        id: 'chandra-mangala',
        name: 'Chandra Mangala Yoga',
        sanskritName: 'चन्द्र मंगल योग',
        category: 'Dhana Yoga',
        planetsInvolved: ['Moon', 'Mars'],
        housesInvolved: [moon.house, mars.house],
        formationLogic: 'Moon and Mars form an intimate conjunction or 180° mutual aspect.',
        traditionalInterpretation:
          'Dynamic commercial drive, high financial enterprise, self-earned wealth through persistent initiative and resourcefulness.',
        strengthScore: 7,
      });
    }
  }

  // 4. Pancha Mahapurusha Yogas (Mars=Ruchaka, Mercury=Bhadra, Jupiter=Hamsa, Venus=Malavya, Saturn=Sasa)
  const kendraHouses = [1, 4, 7, 10];
  const checkMahapurusha = (
    planet: typeof mars,
    planetName: PlanetName,
    yogaName: string,
    sanskritName: string,
    interp: string
  ) => {
    if (!planet) return;
    const inKendra = kendraHouses.includes(planet.house);
    const isExaltedOrOwn = planet.dignity === 'Exalted' || planet.dignity === 'Own Sign';
    if (inKendra && isExaltedOrOwn) {
      yogas.push({
        id: yogaName.toLowerCase(),
        name: `${yogaName} Yoga`,
        sanskritName,
        category: 'Mahapurusha',
        planetsInvolved: [planetName],
        housesInvolved: [planet.house],
        formationLogic: `${planetName} is placed in a Kendra house (${planet.house}) in its ${planet.dignity} sign (${planet.sign}).`,
        traditionalInterpretation: interp,
        strengthScore: 10,
      });
    }
  };

  checkMahapurusha(
    mars,
    'Mars',
    'Ruchaka',
    'रुचक महापुरुष योग',
    'Imbues immense physical vigor, leadership in competitive arenas, tactical fearlessness, and technical mastery.'
  );
  checkMahapurusha(
    mercury,
    'Mercury',
    'Bhadra',
    'भद्र महापुरुष योग',
    'Confers profound intellectual stature, photographic memory, scholarly distinction, and eloquence in statecraft.'
  );
  checkMahapurusha(
    jupiter,
    'Jupiter',
    'Hamsa',
    'हंस महापुरुष योग',
    'Spiritual righteousness, revered philosophical authority, pristine moral character, and divine protection.'
  );
  checkMahapurusha(
    venus,
    'Venus',
    'Malavya',
    'मालव्य महापुरुष योग',
    'Aesthetic refinement, luxurious comforts, magnetic charm, artistic mastery, and happy conjugal prosperity.'
  );
  checkMahapurusha(
    saturn,
    'Saturn',
    'Sasa',
    'शश महापुरुष योग',
    'Command over masses, enduring institutional authority, stoic patience, organizational genius, and unshakeable discipline.'
  );

  // 5. Dharma-Karmadhipati Yoga (9th lord and 10th lord)
  const h9 = chart.houses.find((h) => h.house === 9);
  const h10 = chart.houses.find((h) => h.house === 10);
  if (h9 && h10 && h9.ruler && h10.ruler) {
    const lord9 = chart.planets.find((p) => p.name === h9.ruler);
    const lord10 = chart.planets.find((p) => p.name === h10.ruler);
    if (lord9 && lord10 && lord9.name === lord10.name) {
      yogas.push({
        id: 'dharma-karmadhipati-single',
        name: 'Dharma-Karmadhipati Yoga',
        sanskritName: 'धर्मकर्माधिपति योग',
        category: 'Raj Yoga',
        planetsInvolved: [lord9.name],
        housesInvolved: [9, 10],
        formationLogic: `Single planet ${lord9.name} simultaneously rules both the 9th (Dharma) and 10th (Karma) houses.`,
        traditionalInterpretation:
          'Exceptional professional purpose aligned with righteous duty, leading to significant societal legacy and career eminence.',
        strengthScore: 9,
      });
    } else if (lord9 && lord10 && lord9.house === lord10.house) {
      yogas.push({
        id: 'dharma-karmadhipati-conjunct',
        name: 'Dharma-Karmadhipati Yoga',
        sanskritName: 'धर्मकर्माधिपति योग',
        category: 'Raj Yoga',
        planetsInvolved: [lord9.name, lord10.name],
        housesInvolved: [lord9.house],
        formationLogic: `9th lord (${lord9.name}) and 10th lord (${lord10.name}) are conjunct in house ${lord9.house}.`,
        traditionalInterpretation:
          'Highest auspicious Raj Yoga uniting wisdom (Bhagya) with dynamic action (Karma). Bestows executive power and lasting prestige.',
        strengthScore: 9,
      });
    }
  }

  // 6. Viparita Raja Yoga (Lords of 6, 8, 12 placed in 6, 8, or 12)
  const dusthanaHouses = [6, 8, 12];
  for (const dh of dusthanaHouses) {
    const houseObj = chart.houses.find((h) => h.house === dh);
    if (houseObj && houseObj.ruler) {
      const lord = chart.planets.find((p) => p.name === houseObj.ruler);
      if (lord && dusthanaHouses.includes(lord.house)) {
        yogas.push({
          id: `viparita-${dh}`,
          name: 'Viparita Raja Yoga',
          sanskritName: 'विपरीत राज योग',
          category: 'Raj Yoga',
          planetsInvolved: [lord.name],
          housesInvolved: [dh, lord.house],
          formationLogic: `Lord of dusthana house ${dh} (${lord.name}) is placed in another dusthana house (${lord.house}).`,
          traditionalInterpretation:
            'Triumph over adversity, sudden breakthroughs rising from difficult crises, and turning competitors into unintentional allies.',
          strengthScore: 8,
        });
        break; // Add only one instance for clarity
      }
    }
  }

  return yogas;
}
