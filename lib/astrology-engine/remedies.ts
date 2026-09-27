import { NatalChart, PlanetName } from '@/types';

export interface GemstoneRecommendation {
  primaryGemstone: string;
  sanskritName: string;
  associatedPlanet: PlanetName;
  recommendedMetal: string;
  fingerToWear: string;
  dayToWear: string;
  mantra: string;
  rationale: string;
  alternativeStones: string[];
  contraindications: string[];
  disclaimer: string;
}

export interface RudrakshaRecommendation {
  recommendedMukhi: string;
  mukhiNumber: number;
  associatedPlanet: PlanetName;
  associatedDeity: string;
  beejMantra: string;
  traditionalSignificance: string;
  wearingInstructions: string;
  disclaimer: string;
}

const GEMSTONE_DATA: Record<
  PlanetName,
  {
    gemstone: string;
    sanskritName: string;
    metal: string;
    finger: string;
    day: string;
    mantra: string;
    alternatives: string[];
  }
> = {
  Sun: {
    gemstone: 'Ruby (Manikya)',
    sanskritName: 'माणिक्य',
    metal: 'Gold or Copper',
    finger: 'Ring Finger',
    day: 'Sunday morning during Shukla Paksha',
    mantra: 'Om Hram Hreem Hroum Sah Suryaya Namah',
    alternatives: ['Red Garnet', 'Spinel'],
  },
  Moon: {
    gemstone: 'Pearl (Mukta / Moti)',
    sanskritName: 'मोती',
    metal: 'Silver',
    finger: 'Little Finger or Ring Finger',
    day: 'Monday evening',
    mantra: 'Om Shram Shreem Shroum Sah Chandraya Namah',
    alternatives: ['Moonstone'],
  },
  Mars: {
    gemstone: 'Red Coral (Moonga)',
    sanskritName: 'मूँगा',
    metal: 'Gold or Copper',
    finger: 'Ring Finger',
    day: 'Tuesday morning',
    mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah',
    alternatives: ['Carnelian'],
  },
  Mercury: {
    gemstone: 'Emerald (Panna)',
    sanskritName: 'पन्ना',
    metal: 'Gold or Bronze',
    finger: 'Little Finger',
    day: 'Wednesday morning',
    mantra: 'Om Bram Breem Broum Sah Budhaya Namah',
    alternatives: ['Peridot', 'Green Tourmaline'],
  },
  Jupiter: {
    gemstone: 'Yellow Sapphire (Pukhraj)',
    sanskritName: 'पुखराज',
    metal: 'Gold or Yellow Brass',
    finger: 'Index Finger',
    day: 'Thursday morning',
    mantra: 'Om Gram Greem Groum Sah Gurave Namah',
    alternatives: ['Yellow Topaz', 'Citrine'],
  },
  Venus: {
    gemstone: 'Diamond (Heera)',
    sanskritName: 'हीरा',
    metal: 'Platinum, White Gold, or Silver',
    finger: 'Middle Finger or Little Finger',
    day: 'Friday morning',
    mantra: 'Om Dram Dreem Droum Sah Shukraya Namah',
    alternatives: ['White Sapphire', 'Zircon'],
  },
  Saturn: {
    gemstone: 'Blue Sapphire (Neelam)',
    sanskritName: 'नीलम',
    metal: 'Silver, White Gold, or Panchadhatu',
    finger: 'Middle Finger',
    day: 'Saturday evening',
    mantra: 'Om Pram Preem Proum Sah Shanaishcharaya Namah',
    alternatives: ['Amethyst', 'Blue Topaz', 'Iolite'],
  },
  Rahu: {
    gemstone: 'Hessonite (Gomed)',
    sanskritName: 'गोमेद',
    metal: 'Silver or Panchadhatu',
    finger: 'Middle Finger',
    day: 'Saturday night',
    mantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namah',
    alternatives: ['Brown Zircon'],
  },
  Ketu: {
    gemstone: "Cat's Eye (Lehsuniya)",
    sanskritName: 'लहसुनिया',
    metal: 'Silver or Gold',
    finger: 'Middle or Ring Finger',
    day: 'Tuesday or Thursday evening',
    mantra: 'Om Stram Streem Stroum Sah Ketave Namah',
    alternatives: ['Tiger Eye', 'Chrysoberyl'],
  },
  Ascendant: { gemstone: 'Ruby', sanskritName: 'माणिक्य', metal: 'Gold', finger: 'Ring', day: 'Sunday', mantra: 'Om', alternatives: [] },
  Midheaven: { gemstone: 'Pukhraj', sanskritName: 'पुखराज', metal: 'Gold', finger: 'Index', day: 'Thursday', mantra: 'Om', alternatives: [] },
  Uranus: { gemstone: 'Blue Sapphire', sanskritName: 'नीलम', metal: 'Silver', finger: 'Middle', day: 'Saturday', mantra: 'Om', alternatives: [] },
  Neptune: { gemstone: 'Pearl', sanskritName: 'मोती', metal: 'Silver', finger: 'Little', day: 'Monday', mantra: 'Om', alternatives: [] },
  Pluto: { gemstone: 'Cat’s Eye', sanskritName: 'लहसुनिया', metal: 'Silver', finger: 'Middle', day: 'Tuesday', mantra: 'Om', alternatives: [] },
};

const RUDRAKSHA_MAP: Record<
  PlanetName,
  {
    mukhi: string;
    number: number;
    deity: string;
    mantra: string;
    significance: string;
  }
> = {
  Sun: {
    mukhi: '1 Mukhi (Eka Mukhi)',
    number: 1,
    deity: 'Lord Shiva',
    mantra: 'Om Hreem Namah',
    significance: 'Heightens spiritual awareness, super-consciousness, and sovereign leadership.',
  },
  Moon: {
    mukhi: '2 Mukhi (Dwi Mukhi)',
    number: 2,
    deity: 'Ardhanarishvara (Shiva & Parvati)',
    mantra: 'Om Namah',
    significance: 'Promotes emotional harmony, mutual partnership balance, and peace of mind.',
  },
  Mars: {
    mukhi: '3 Mukhi (Tri Mukhi)',
    number: 3,
    deity: 'Lord Agni (Sacred Fire)',
    mantra: 'Om Kleem Namah',
    significance: 'Burns away past guilt and lethargy, igniting radiant self-confidence and vitality.',
  },
  Mercury: {
    mukhi: '4 Mukhi (Chatur Mukhi)',
    number: 4,
    deity: 'Lord Brahma',
    mantra: 'Om Hreem Namah',
    significance: 'Enhances creative intelligence, analytical memory, vocal eloquence, and logic.',
  },
  Jupiter: {
    mukhi: '5 Mukhi (Pancha Mukhi)',
    number: 5,
    deity: 'Lord Kalagni Rudra',
    mantra: 'Om Hreem Namah',
    significance: 'Cultivates spiritual wisdom, inner tranquility, general wellbeing, and dharma.',
  },
  Venus: {
    mukhi: '6 Mukhi (Shad Mukhi)',
    number: 6,
    deity: 'Lord Kartikeya',
    mantra: 'Om Hreem Hoom Namah',
    significance: 'Bestows magnetic charisma, emotional grounding, willpower, and artistic skill.',
  },
  Saturn: {
    mukhi: '7 Mukhi (Sapta Mukhi)',
    number: 7,
    deity: 'Goddess Mahalakshmi',
    mantra: 'Om Hoom Namah',
    significance: 'Overcomes financial blockages, unlocks prosperity, and provides Saturnian protection.',
  },
  Rahu: {
    mukhi: '8 Mukhi (Ashta Mukhi)',
    number: 8,
    deity: 'Lord Ganesha',
    mantra: 'Om Hoom Namah',
    significance: 'Removes unforeseen obstacles, stabilizes erratic ambitions, and sharpens intellect.',
  },
  Ketu: {
    mukhi: '9 Mukhi (Nava Mukhi)',
    number: 9,
    deity: 'Goddess Durga (Nava Durga)',
    mantra: 'Om Hreem Hoom Namah',
    significance: 'Shields against fear, instills fearlessness, and clears karmic obstructions.',
  },
  Ascendant: { mukhi: '5 Mukhi', number: 5, deity: 'Lord Shiva', mantra: 'Om', significance: 'General' },
  Midheaven: { mukhi: '1 Mukhi', number: 1, deity: 'Lord Shiva', mantra: 'Om', significance: 'General' },
  Uranus: { mukhi: '8 Mukhi', number: 8, deity: 'Lord Ganesha', mantra: 'Om', significance: 'General' },
  Neptune: { mukhi: '2 Mukhi', number: 2, deity: 'Ardhanarishvara', mantra: 'Om', significance: 'General' },
  Pluto: { mukhi: '9 Mukhi', number: 9, deity: 'Goddess Durga', mantra: 'Om', significance: 'General' },
};

export function recommendGemstone(chart: NatalChart): GemstoneRecommendation {
  // Parashari rule: strengthen the Ascendant Lord (Trikona 1), 5th Lord, or 9th Lord.
  // Avoid stones of functional malefics (6th, 8th, 12th lords).
  const h1 = chart.houses.find((h) => h.house === 1);
  const h5 = chart.houses.find((h) => h.house === 5);
  const h9 = chart.houses.find((h) => h.house === 9);

  let targetPlanet: PlanetName = h1?.ruler || 'Jupiter';
  let rationale = `Recommended based on your Ascendant lord (${targetPlanet}), which strengthens personal vitality and life direction.`;

  // Prefer 9th lord (Bhagya) if 1st is malefic
  if (h9?.ruler && ['Sun', 'Jupiter', 'Venus', 'Moon'].includes(h9.ruler)) {
    targetPlanet = h9.ruler;
    rationale = `Recommended based on your 9th house Bhagya lord (${targetPlanet}), enhancing fortune, spiritual alignment, and prosperity.`;
  } else if (h5?.ruler && ['Sun', 'Jupiter', 'Venus', 'Mercury'].includes(h5.ruler)) {
    targetPlanet = h5.ruler;
    rationale = `Recommended based on your 5th house lord of creative intellect and merit (${targetPlanet}).`;
  }

  const data = GEMSTONE_DATA[targetPlanet] || GEMSTONE_DATA.Jupiter;

  return {
    primaryGemstone: data.gemstone,
    sanskritName: data.sanskritName,
    associatedPlanet: targetPlanet,
    recommendedMetal: data.metal,
    fingerToWear: data.finger,
    dayToWear: data.day,
    mantra: data.mantra,
    rationale,
    alternativeStones: data.alternatives,
    contraindications: [
      'Do not wear gemstones associated with natural adversary planets simultaneously.',
      'Always test natural gemstones for a brief period before permanent setting.',
    ],
    disclaimer:
      'Gemstone recommendations are traditional spiritual suggestions and should never be viewed as medical treatment or guaranteed financial outcomes.',
  };
}

export function recommendRudraksha(chart: NatalChart): RudrakshaRecommendation {
  const moon = chart.planets.find((p) => p.name === 'Moon');
  const saturn = chart.planets.find((p) => p.name === 'Saturn');

  // If Saturn afflicted or Sade Sati, recommend 7 Mukhi or 14 Mukhi
  let targetPlanet: PlanetName = 'Jupiter';
  if (saturn && saturn.isRetrograde) {
    targetPlanet = 'Saturn';
  } else if (moon && ['Scorpio', 'Capricorn'].includes(moon.sign)) {
    targetPlanet = 'Moon';
  }

  const data = RUDRAKSHA_MAP[targetPlanet] || RUDRAKSHA_MAP.Jupiter;

  return {
    recommendedMukhi: data.mukhi,
    mukhiNumber: data.number,
    associatedPlanet: targetPlanet,
    associatedDeity: data.deity,
    beejMantra: data.mantra,
    traditionalSignificance: data.significance,
    wearingInstructions:
      'Cleanse with holy water (Ganga Jal) or raw milk on an auspicious Monday or Thursday. Chant the beej mantra 108 times before wearing around neck on silk or silver thread.',
    disclaimer:
      'Rudraksha beads are sacred spiritual tools for meditation and mindfulness. This guidance is based on traditional references.',
  };
}
