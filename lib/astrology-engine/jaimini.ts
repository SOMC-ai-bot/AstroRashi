import { NatalChart, PlanetName, ZodiacSignName } from '@/types';
import { getNavamsaSign } from './navamsa';
import { SIGN_RULERS } from './planetary';

export type CharaKarakaRole =
  | 'Atmakaraka (AK - Soul)'
  | 'Amatyakaraka (AmK - Career)'
  | 'Bhratrukaraka (BK - Guru & Siblings)'
  | 'Matrukaraka (MK - Mother & Heart)'
  | 'Pitrukaraka (PiK - Father)'
  | 'Putrakaraka (PK - Intellect & Children)'
  | 'Gnatikaraka (GK - Obstacles & Competitors)'
  | 'Darakaraka (DK - Spouse & Partner)';

export interface CharaKarakaItem {
  planet: PlanetName;
  role: CharaKarakaRole;
  degreeInSign: number;
  sign: ZodiacSignName;
  meaning: string;
}

export interface IshtaDevataResult {
  atmakarakaPlanet: PlanetName;
  atmakarakaDegree: number;
  karakamsaSign: ZodiacSignName;
  twelfthFromKarakamsaSign: ZodiacSignName;
  rulerOfTwelfth: PlanetName;
  deityName: string;
  mantra: string;
  spiritualThemes: string;
}

const DEITY_MAP: Record<PlanetName, { deity: string; mantra: string; themes: string }> = {
  Sun: {
    deity: 'Lord Shiva / Lord Rama',
    mantra: 'Om Namah Shivaya',
    themes: 'Illumination of soul, righteous authority, spiritual kingship, and pure truth.',
  },
  Moon: {
    deity: 'Goddess Parvati / Lord Krishna',
    mantra: 'Om Namo Bhagavate Vasudevaya',
    themes: 'Unconditional cosmic compassion, devotional love (Bhakti), and inner peace.',
  },
  Mars: {
    deity: 'Lord Kartikeya / Lord Hanuman',
    mantra: 'Om Hanumate Namah',
    themes: 'Courage, victory over inner demons, disciplined willpower, and selfless service.',
  },
  Mercury: {
    deity: 'Lord Vishnu / Goddess Saraswati',
    mantra: 'Om Namo Narayanaya',
    themes: 'Divine intelligence, sacred eloquence, harmony in relationships, and discernment.',
  },
  Jupiter: {
    deity: 'Lord Shiva / Guru Brihaspati',
    mantra: 'Om Gurave Namah',
    themes: 'Supreme spiritual wisdom, grace, higher consciousness, and dharma.',
  },
  Venus: {
    deity: 'Goddess Mahalakshmi',
    mantra: 'Om Shreem Maha Lakshmyai Namah',
    themes: 'Aesthetic devotion, spiritual beauty, abundance, and divine grace.',
  },
  Saturn: {
    deity: 'Lord Shiva (Kala Bhairava) / Lord Kurma',
    mantra: 'Om Namah Shivaya / Om Sham Shanaishcharaya Namah',
    themes: 'Deep meditative stillness, karmic liberation (Moksha), humility, and detachment.',
  },
  Rahu: {
    deity: 'Goddess Durga',
    mantra: 'Om Dum Durgaye Namah',
    themes: 'Dissolution of worldly illusions (Maya) and fierce maternal protection.',
  },
  Ketu: {
    deity: 'Lord Ganesha / Lord Matsya',
    mantra: 'Om Gam Ganapataye Namah',
    themes: 'Direct mystical illumination, removal of spiritual obstacles, and final Moksha.',
  },
  Ascendant: { deity: 'Lord Shiva', mantra: 'Om', themes: 'Universal' },
  Midheaven: { deity: 'Lord Vishnu', mantra: 'Om', themes: 'Universal' },
  Uranus: { deity: 'Lord Shiva', mantra: 'Om', themes: 'Universal' },
  Neptune: { deity: 'Lord Varuna', mantra: 'Om', themes: 'Universal' },
  Pluto: { deity: 'Lord Yama', mantra: 'Om', themes: 'Universal' },
};

export function calculateCharaKarakas(chart: NatalChart): {
  karakas: CharaKarakaItem[];
  atmakaraka: CharaKarakaItem;
  darakaraka: CharaKarakaItem;
} {
  // Parashari 7-planet or 8-planet Jaimini ranking
  const eligiblePlanets = chart.planets.filter((p) =>
    ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu'].includes(p.name)
  );

  // Compute degree in sign: lon % 30 (for Rahu, classical Jaimini uses 30 - (lon % 30))
  const ranked = eligiblePlanets.map((p) => {
    let degInSign = p.absoluteDegree % 30;
    if (p.name === 'Rahu') {
      degInSign = 30 - degInSign;
    }
    return {
      planet: p.name,
      degInSign,
      sign: p.sign,
    };
  });

  // Sort descending by degree
  ranked.sort((a, b) => b.degInSign - a.degInSign);

  const roles: CharaKarakaRole[] = [
    'Atmakaraka (AK - Soul)',
    'Amatyakaraka (AmK - Career)',
    'Bhratrukaraka (BK - Guru & Siblings)',
    'Matrukaraka (MK - Mother & Heart)',
    'Pitrukaraka (PiK - Father)',
    'Putrakaraka (PK - Intellect & Children)',
    'Gnatikaraka (GK - Obstacles & Competitors)',
    'Darakaraka (DK - Spouse & Partner)',
  ];

  const meanings = [
    'Represents the soul’s deepest desire, innate karmic lessons, and primary life mission.',
    'Signifies career authority, professional intellect, administrative advisory, and executive status.',
    'Guides interactions with mentors, spiritual teachers, courageous ventures, and siblings.',
    'Reflects emotional equilibrium, motherly nurturing, internal happiness, and home sanctuary.',
    'Embodies legacy, fatherly heritage, traditional dharma, and ancestral continuity.',
    'Governs creative self-expression, children, speculative intelligence, and mantra sadhana.',
    'Highlights areas requiring resilience, karmic hurdles, competition, and healing stamina.',
    'Points to relationship patterns, the essential nature of the spouse, and commercial partnerships.',
  ];

  const karakas: CharaKarakaItem[] = ranked.slice(0, 8).map((r, i) => ({
    planet: r.planet,
    role: roles[i],
    degreeInSign: Number(r.degInSign.toFixed(2)),
    sign: r.sign,
    meaning: meanings[i],
  }));

  return {
    karakas,
    atmakaraka: karakas[0],
    darakaraka: karakas[karakas.length - 1],
  };
}

export function calculateIshtaDevata(chart: NatalChart): IshtaDevataResult {
  const { atmakaraka } = calculateCharaKarakas(chart);
  const akPlanet = chart.planets.find((p) => p.name === atmakaraka.planet);
  const akDegree = akPlanet ? akPlanet.absoluteDegree : 0;

  // 1. Karakamsa: Navamsa sign of Atmakaraka
  const karakamsaData = getNavamsaSign(akDegree);
  const karakamsaSign = karakamsaData.navamsaSign;

  // 2. 12th house from Karakamsa
  const karakamsaIdx = karakamsaData.navamsaIndex;
  const twelfthIdx = (karakamsaIdx + 11) % 12; // 12th house is +11 steps
  const ZODIAC_LIST: ZodiacSignName[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
  ];
  const twelfthSign = ZODIAC_LIST[twelfthIdx];
  const rulerOfTwelfth = SIGN_RULERS[twelfthSign] || 'Jupiter';

  const deityInfo = DEITY_MAP[rulerOfTwelfth] || DEITY_MAP.Jupiter;

  return {
    atmakarakaPlanet: atmakaraka.planet,
    atmakarakaDegree: atmakaraka.degreeInSign,
    karakamsaSign,
    twelfthFromKarakamsaSign: twelfthSign,
    rulerOfTwelfth,
    deityName: deityInfo.deity,
    mantra: deityInfo.mantra,
    spiritualThemes: deityInfo.themes,
  };
}
