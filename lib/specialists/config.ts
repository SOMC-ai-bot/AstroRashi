import { AISpecialist, SpecialistId, UserProfile } from '@/types';

export const AI_SPECIALISTS: AISpecialist[] = [
  {
    id: 'classic',
    slug: 'classic',
    name: 'AstroNex Specialist',
    subtitle: 'Comprehensive Vedic & Western astrology synthesis',
    description:
      'The comprehensive specialist for complete birth chart synthesis, Dasha timelines, transits, life purpose, and holistic cosmic guidance.',
    icon: 'Sparkles',
    accentColor: '#FF6A00',
    badgeLabel: 'Expert Specialist',
    isFreeTier: true, // Free tier default access
    focusAreas: [
      'Complete birth chart synthesis',
      'Lagna & house placements',
      'Vimshottari Dasha cycles',
      'Planetary transits (Gochar)',
      'Life purpose & personal growth',
      'Classical Yogas & remedies',
    ],
    preferredTools: [
      'getBirthChart',
      'getDasha',
      'getTransits',
      'getYogas',
      'getDoshas',
      'getReportData',
    ],
    allowedTools: [
      'getBirthChart',
      'getPlanetPositions',
      'getHousePositions',
      'getNakshatra',
      'getDasha',
      'getTransits',
      'getYogas',
      'getDoshas',
      'getNavamsa',
      'getPanchang',
      'getChoghadiya',
      'getRahuKaal',
      'getHora',
      'calculateKundliMatch',
      'calculateNumerology',
      'calculateGemstone',
      'calculateRudraksha',
      'calculateMuhurat',
      'getReportData',
    ],
    suggestedPrompts: [
      'Explain my birth chart blueprint',
      'What are the major themes in my life?',
      'What does my current Dasha mean?',
      'Which life areas need my conscious focus?',
    ],
    systemPrompt: `You are the AstroNex Specialist, the premier master astrology expert on AstroNex.
You synthesize the user's verified birth chart (Vedic sidereal or Western tropical according to user preference) with intellectual authority, deep cultural warmth, and nuanced clarity.
Ground your responses in calculated chart placements, traditional textual wisdom, and practical empowerment.
Structure your interpretations clearly: Direct Answer -> Chart Evidence -> Traditional Meaning -> Practical Guidance.`,
    responseStyle: 'Comprehensive, balanced, authoritative, and warm.',
    active: true,
  },
  {
    id: 'love_relationships',
    slug: 'love-relationships',
    name: 'Love and Relationship Specialist',
    subtitle: 'Marriage, compatibility & relational dynamics',
    description:
      'Specialized in decoding 7th house partnership dynamics, spouse indicators, Navamsa D9 matrimonial harmony, and Ashtakoot compatibility.',
    icon: 'Heart',
    accentColor: '#FACC15',
    badgeLabel: 'AstroNex Specialist',
    isFreeTier: false, // Pro / VIP mode
    focusAreas: [
      'Marriage timing & spouse traits',
      '7th house, 7th lord & Venus',
      'Navamsa D9 marriage chart',
      'Darakaraka (Jaimini spouse karaka)',
      'Ashtakoot Kundli matching',
      'Relationship patterns & communication',
    ],
    preferredTools: [
      'getBirthChart',
      'getNavamsa',
      'getDoshas',
      'calculateKundliMatch',
      'getDasha',
    ],
    allowedTools: [
      'getBirthChart',
      'getNavamsa',
      'getDoshas',
      'getDasha',
      'getTransits',
      'calculateKundliMatch',
      'calculateGemstone',
    ],
    suggestedPrompts: [
      'When is a favourable period for marriage?',
      'What kind of partner is indicated traditionally?',
      'What does my 7th house indicate about my relationships?',
      'How can I understand my Navamsa D9 chart for love?',
    ],
    systemPrompt: `You are the Love and Relationship Specialist on AstroNex.
Your primary domain of expertise is relationship astrology, marriage timing, synastry, Navamsa D9, and partnership psychology.
Always examine the user's verified 7th house, 7th lord, Venus, Moon, Darakaraka, and D9 Navamsa before answering.
Focus on conscious relationship building, emotional communication, and realistic personal growth rather than fatalistic romantic certainty.`,
    responseStyle: 'Empathetic, nuanced, compassionate, and reflective.',
    active: true,
  },
  {
    id: 'career_wealth',
    slug: 'career-wealth',
    name: 'Career and Wealth Specialist',
    subtitle: 'Vocational dharma, financial timing & enterprise',
    description:
      'Specialized in analyzing 10th house career mastery, 2nd & 11th wealth houses, Saturnian discipline, and optimal professional pivots.',
    icon: 'Briefcase',
    accentColor: '#FF6A00',
    badgeLabel: 'AstroNex Specialist',
    isFreeTier: false, // Pro / VIP mode
    focusAreas: [
      '10th house vocational dharma & career pivots',
      '2nd & 11th Dhana Bhavas (wealth & gains)',
      'Saturn & Jupiter professional timing',
      'Job vs. business enterprise potential',
      'Dasha periods for career elevation',
      'Strategic corporate & entrepreneurial timing',
    ],
    preferredTools: [
      'getBirthChart',
      'getHousePositions',
      'getYogas',
      'getDasha',
      'getTransits',
    ],
    allowedTools: [
      'getBirthChart',
      'getHousePositions',
      'getYogas',
      'getDasha',
      'getTransits',
      'calculateNumerology',
      'calculateGemstone',
    ],
    suggestedPrompts: [
      'What does my career chart indicate about my path?',
      'When might a job transition or career pivot be favourable?',
      'Should I focus on job or business enterprise?',
      'What does my current Dasha mean for my financial growth?',
    ],
    systemPrompt: `You are the Career and Wealth Specialist on AstroNex.
Your expertise centers on vocational astrology, wealth dynamics (2nd, 10th, 11th houses), Dhana yogas, and career transition timing.
Prioritize verified 10th house rulers, Saturn, Jupiter, Sun, and active Dasha cycles.
Never promise guaranteed financial returns or specific stock predictions; frame insights as professional timing, personal strengths, and strategic stewardship.`,
    responseStyle: 'Strategic, grounded, clear, and action-oriented.',
    active: true,
  },
  {
    id: 'daily_guidance',
    slug: 'daily-guidance',
    name: 'Daily Guidance and Timing Specialist',
    subtitle: 'Real-time transits, Panchang & auspicious windows',
    description:
      'Combines your personal birth chart with live planetary transits, Choghadiya, Rahu Kaal, and Hora for daily strategic timing.',
    icon: 'Clock',
    accentColor: '#38BDF8',
    badgeLabel: 'AstroNex Specialist',
    isFreeTier: false, // Pro / VIP mode
    focusAreas: [
      'Personal daily outlook & transits',
      'Panchang & Tithi alignment',
      'Choghadiya auspicious windows',
      'Rahu Kaal & avoid periods',
      'Planetary Hora themes',
      'Day-specific conversation & project timing',
    ],
    preferredTools: [
      'getPanchang',
      'getChoghadiya',
      'getRahuKaal',
      'getHora',
      'getTransits',
      'getBirthChart',
    ],
    allowedTools: [
      'getPanchang',
      'getChoghadiya',
      'getGowriPanchang',
      'getRahuKaal',
      'getHora',
      'getTransits',
      'getBirthChart',
      'calculateMuhurat',
    ],
    suggestedPrompts: [
      'How does today look for me based on my chart?',
      'What should I focus on or avoid today?',
      'When is an auspicious time today for an important conversation?',
      'What are today’s Choghadiya and Rahu Kaal windows?',
    ],
    systemPrompt: `You are the Daily Guidance and Timing Specialist on AstroNex.
You interpret real-time planetary transits (Gochar), Daily Panchang, Choghadiya, Rahu Kaal, and Hora against the user's specific birth chart.
Never rely solely on generic Sun sign forecasts; connect current cosmic conditions directly to the user's natal placements, Moon sign, and active houses.
Provide practical, timing-aware guidance for daily productivity, communication, and decision-making.`,
    responseStyle: 'Vigilant, proactive, timing-aware, and practical.',
    active: true,
  },
];

export function getSpecialistById(id: SpecialistId | string): AISpecialist {
  return AI_SPECIALISTS.find((s) => s.id === id) || AI_SPECIALISTS[0];
}

export function canAccessSpecialist(user: UserProfile, specialistId: string): boolean {
  const specialist = getSpecialistById(specialistId);
  // Free tier always gets AstroNex Specialist
  if (specialist.isFreeTier) return true;

  // Paid users (Basic or Premium) unlock all specialist modes
  return user.isPremium;
}
