export interface ToolGuideData {
  id: string;
  toolId: string;
  title: string;
  subtitle: string;
  category: string;
  branch: 'Vedic' | 'Western' | 'KP' | 'Numerology' | 'Panchang';
  estimatedReadTime: string;
  introduction: string;
  whatItIs: string;
  whatItCalculates: string;
  howItWorks: string;
  requiredInfo: { field: string; whyNeeded: string }[];
  howToInterpret: {
    overview: string;
    keyPoints: string[];
    matrix?: { indicator: string; meaning: string; advice: string }[];
  };
  relationToChart: string;
  whatItDoesNotMean: string[];
  limitations: string[];
  practicalExample: {
    scenario: string;
    inputs: string;
    finding: string;
    interpretation: string;
    actionableAdvice: string;
  };
  faqs: { question: string; answer: string }[];
  relatedToolIds: string[];
}

export const TOOL_GUIDES_DATABASE: Record<string, ToolGuideData> = {
  'moon-sign': {
    id: 'guide-moon-sign',
    toolId: 'moon-sign',
    title: 'Moon Sign (Chandra Rashi) Complete Guide',
    subtitle: 'Astronomical Sidereal Mechanics, Emotional Matrix & Mind Architecture',
    category: 'Birth & Chart',
    branch: 'Vedic',
    estimatedReadTime: '6 min read',
    introduction: 'In Vedic Jyotish (classical Hindu astrology), your Moon sign—termed Chandra Rashi—is regarded as the single most critical anchor of your psychological profile, personal biorhythms, and daily destiny.',
    whatItIs: 'Your Moon Sign is the zodiac constellation against which the Moon was positioned at the exact minute and geographical location of your birth. While Western astrology emphasizes the solar ego, Vedic astrology places the Moon at the absolute pinnacle of natal analysis because the mind (Manas) perceives and experiences all joy, grief, desire, and consciousness.',
    whatItCalculates: 'Calculates the Moon’s geocentric ecliptic longitude against the fixed sidereal stellar backdrop using the high-precision Lahiri (Chitra Paksha) Ayanamsa (~24° offset from the tropical seasonal equinox), pinpointing your Rashi, degree, minute, seconds, and ruling Nakshatra Pada.',
    howItWorks: 'The Moon traverses the complete 360-degree zodiac belt in approximately 27.3 solar days, remaining in a single sign for roughly 2.25 days (54 hours). Our calculation engine computes Julian ephemeris planetary mechanics, projects celestial longitude onto the local horizon using your birth coordinates, subtracts precession drift (Ayanamsa), and maps the resulting coordinate into one of twelve 30-degree zodiac spans.',
    requiredInfo: [
      { field: 'Birth Date (Day, Month, Year)', whyNeeded: 'Positions the astronomical epoch within the 100-year planetary ephemeris tables.' },
      { field: 'Exact Birth Time (Hour & Minute)', whyNeeded: 'Because the Moon moves approximately 13 degrees per day (~0.55° per hour), an inaccurate birth time can misplace the Moon into an adjacent sign or Nakshatra.' },
      { field: 'City / Birth Place Coordinates', whyNeeded: 'Enables precise Local Mean Time (LMT) and Greenwich Mean Time (GMT) coordinate conversion.' },
    ],
    howToInterpret: {
      overview: 'Your Moon Sign reveals how you instinctively react to emotional stimuli, stress, romantic attachments, and career challenges. It indicates your emotional immune system.',
      keyPoints: [
        'Water Moons (Cancer, Scorpio, Pisces): Intense intuitive depth, empathetic radar, need for emotional security.',
        'Earth Moons (Taurus, Virgo, Capricorn): Pragmatic groundedness, emotional resilience, need for material stability.',
        'Fire Moons (Aries, Leo, Sagittarius): Passionate spontaneous reactions, leadership drive, need for expressive freedom.',
        'Air Moons (Gemini, Libra, Aquarius): Intellectual processing of feelings, communicative curiosity, social connectivity.',
      ],
      matrix: [
        { indicator: 'Moon in Taurus', meaning: 'Exalted (Uchha) Moon', advice: 'Steadfast emotional equilibrium, high sensory appreciation, enduring loyalty.' },
        { indicator: 'Moon in Scorpio', meaning: 'Debilitated (Neecha) Moon', advice: 'Intense transformative feelings, hyper-vigilance; benefits deeply from meditation and Shiva mantras.' },
        { indicator: 'Moon in Cancer', meaning: 'Own Sign (Swa-Kshetra)', advice: 'Deeply maternal, protective, nourishing; watch out for psychic over-sensitivity.' },
      ],
    },
    relationToChart: 'Your Moon sign anchors your entire 120-year Vimshottari Dasha life timeline, determines Sade Sati transit timing, and establishes your Janma Nakshatra for marriage compatibility.',
    whatItDoesNotMean: [
      'It does NOT mean your personality is identical to newspaper horoscopes, which use Western solar dates.',
      'It does NOT condemn you if placed in a challenging sign like Scorpio; classical texts state Neecha planets often catalyze profound spiritual insight.',
      'It is NOT a static fate; conscious emotional awareness elevates lower shadow traits into higher gifts.',
    ],
    limitations: [
      'Birth time errors greater than 2 hours can shift the Moon across sign boundaries on border days.',
      'Planetary aspects (Drishti) from Saturn, Mars, or Rahu modify the pure sign expression.',
    ],
    practicalExample: {
      scenario: 'An individual born on September 12, 1996 in Varanasi at 14:30 discovers their Western sign is Virgo, but their Vedic Moon sign is Leo (Purva Phalguni).',
      inputs: 'Date: 1996-09-12 | Time: 14:30 | City: Varanasi, India',
      finding: 'Moon in Leo at 17°24′ in Purva Phalguni Nakshatra (Pada 2).',
      interpretation: 'Beneath an organized analytical exterior lies a royal, creative heart that craves authentic appreciation, theatrical expression, and warm camaraderie.',
      actionableAdvice: 'Engage in creative leadership ventures and avoid bottling up suppressed dignity.',
    },
    faqs: [
      {
        question: 'Why does my Vedic Moon sign differ from my Western Moon sign?',
        answer: 'Western astrology uses the moving Tropical equinox, while Vedic astrology utilizes the Sidereal constellation framework anchored to the fixed star Spica (Chitra). The ~24° Ayanamsa difference causes roughly 85% of people to shift backwards by one sign.',
      },
      {
        question: 'What is the difference between Moon Sign and Ascendant (Lagna)?',
        answer: 'Ascendant (Lagna) represents your physical body, vitality, and external path in the world. Moon Sign (Chandra) signifies your internal psychological matrix, subjective perception, and emotional well-being.',
      },
    ],
    relatedToolIds: ['nakshatra', 'lagna', 'sade-sati', 'vimshottari-dasha'],
  },

  'mangal-dosha': {
    id: 'guide-mangal-dosha',
    toolId: 'mangal-dosha',
    title: 'Mangal Dosha (Kuja / Manglik) Definitive Guide',
    subtitle: 'Classical Shastric Rules, Martian Energy, Exceptions & Authentic Cancellations',
    category: 'Doshas & Dashas',
    branch: 'Vedic',
    estimatedReadTime: '7 min read',
    introduction: 'Mangal Dosha (popularly termed Kuja Dosha or Manglik) is one of the most widely debated and misunderstood concepts in Indian astrology.',
    whatItIs: 'Mangal Dosha occurs when Mars (Mangal), the fiery planet of courage, passion, assertiveness, and combative drive, resides in specific sensitive relationship houses: the 1st (self), 2nd (family speech), 4th (domestic bliss), 7th (partnership), 8th (marital longevity), or 12th (bedroom harmony).',
    whatItCalculates: 'Calculates the house position of Mars simultaneously from three distinct reference points: Lagna (Ascendant), Chandra (Moon), and Shukra (Venus). It then evaluates all 16 classical Shastric cancellation rules (Bhanga) documented in the Brihat Parashara Hora Shastra and Phaladeepika.',
    howItWorks: 'The algorithm scans the natal degree of Mars and tests whether Mars is placed in houses 1, 2, 4, 7, 8, or 12. If present, it examines classical cancellation exceptions: Mars in Aries in 1st, Mars in Scorpio in 4th, Mars in Capricorn in 7th, Mars in Leo in 8th, Mars aspected by exalted Jupiter, or both partners possessing balanced Martian energy.',
    requiredInfo: [
      { field: 'Birth Date & Accurate Time', whyNeeded: 'Crucial for establishing the precise Ascendant degree and house boundaries.' },
      { field: 'Birth Location Coordinates', whyNeeded: 'Fixes the horizon cusps to determine exact house placements for Mars.' },
    ],
    howToInterpret: {
      overview: 'Mangal Dosha does not indicate an evil curse; it signifies an abundance of high-voltage Martian dynamic energy that requires healthy channels.',
      keyPoints: [
        'Anshik (Low) Mangal Dosha: Mars present from Moon or Venus only; minimal friction that naturally harmonizes after age 28.',
        'Purna (High) Mangal Dosha: Mars placed in 1st, 7th, or 8th from Lagna without benefic cancellation; demands clear assertive communication in marriage.',
        'Cancelled (Dosha Bhanga): Over 70% of charts possess classical planetary exemptions that completely neutralize negative manifestations.',
      ],
      matrix: [
        { indicator: 'Mars in 1st House', meaning: 'High independent drive', advice: 'Practice collaborative negotiation; avoid impulsive executive decisions in marriage.' },
        { indicator: 'Mars in 7th House', meaning: 'Direct partner friction', advice: 'Select an equally dynamic, ambitious partner; avoid passive-aggressive communication.' },
        { indicator: 'Mars in 8th House', meaning: 'Transformative marital intensity', advice: 'Transparency in joint financial assets; regular Hanuman Chalisa recitation.' },
      ],
    },
    relationToChart: 'Mangal Dosha directly influences the 7th Bhava of marriage and the 8th Bhava of longevity. It is synthesized with Ashtakoot Guna Milan for comprehensive relationship harmony.',
    whatItDoesNotMean: [
      'It does NOT mean the spouse will suffer bodily harm or death—this is a regressive superstition with zero textual backing.',
      'It does NOT mean a Manglik individual can only marry another Manglik.',
      'It does NOT indicate an unhappy marriage; many of the world’s most prosperous couples are Manglik.',
    ],
    limitations: [
      'Does not replace psychological maturity, mutual emotional respect, and ethical fidelity.',
      'Must be evaluated together with Venus condition and the 7th house lord.',
    ],
    practicalExample: {
      scenario: 'A native is concerned because Mars is placed in their 1st house in Aries.',
      inputs: 'Mars at 12° Aries in House 1 (Ascendant).',
      finding: 'Classical Cancellation Triggered (Mars in own sign Aries in Lagna forms Ruchaka Mahapurusha Yoga).',
      interpretation: 'Rather than a marriage impediment, this placement creates profound courage, executive stamina, and charisma.',
      actionableAdvice: 'Embrace leadership with empathy; Mars here bestows unshakeable perseverance.',
    },
    faqs: [
      {
        question: 'Does Mangal Dosha expire or lessen after age 28?',
        answer: 'Yes. Classical texts observe that Mars achieves natural psychological maturation around age 28, softening impulsive reactivity into mature discipline.',
      },
      {
        question: 'What are the most effective classical remedies?',
        answer: 'Regular chanting of the Hanuman Chalisa, honoring Lord Kartikeya, feeding birds on Tuesdays, and cultivating patient listening habits.',
      },
    ],
    relatedToolIds: ['kundli-matching', 'love-calculator', 'nadi-dosha', 'lagna'],
  },

  'sade-sati': {
    id: 'guide-sade-sati',
    toolId: 'sade-sati',
    title: 'Sade Sati Saturn Transit Complete Master Guide',
    subtitle: 'The 7.5-Year Cosmic Maturation Cycle, Three Phases & Transformative Growth',
    category: 'Doshas & Dashas',
    branch: 'Vedic',
    estimatedReadTime: '8 min read',
    introduction: 'Sade Sati is the revered 7.5-year celestial transit during which Saturn (Shani Bhagawan) travels through the sign preceding your natal Moon, your natal Moon sign itself, and the sign immediately following it.',
    whatItIs: 'Saturn takes approximately 29.5 years to complete an entire circuit around the Sun, spending roughly 2.5 years in each zodiac constellation. When Saturn passes through the 12th, 1st, and 2nd houses measured from your natal Moon, it conducts a rigorous spiritual and karmic inventory across 7.5 continuous years.',
    whatItCalculates: 'Calculates the real-time sidereal astronomical position of transiting Saturn, compares it to your natal Moon Rashi, identifies whether you are in Phase 1 (Rising), Phase 2 (Peak), Phase 3 (Setting), or Dhaiya (small 2.5-year panoti), and computes precise calendar start and end dates.',
    howItWorks: 'The engine evaluates transit ephemeris data. If natal Moon is in Aquarius, Sade Sati begins when Saturn enters Capricorn (12th from Moon), peaks while Saturn transits Aquarius (over Moon), and concludes when Saturn leaves Pisces (2nd from Moon).',
    requiredInfo: [
      { field: 'Birth Date, Time & Place', whyNeeded: 'Identifies the exact sidereal longitude of the natal Moon.' },
      { field: 'Current Calendar Year', whyNeeded: 'Calculates current transiting Saturn longitude against historical and future ephemeris tables.' },
    ],
    howToInterpret: {
      overview: 'Sade Sati is not a period of blind suffering; it is Saturn’s university of discipline, teaching focus, stripping away vanity, and laying unbreakable foundations.',
      keyPoints: [
        'Phase 1 (Rising / 12th from Moon): Financial audits, shifts in foreign connections, sleep adjustments, shedding superficial habits.',
        'Phase 2 (Peak / 1st House over Moon): Emotional testing, deep self-confrontation, heavy professional responsibilities, physical endurance.',
        'Phase 3 (Setting / 2nd House from Moon): Financial restructuring, family consolidation, integration of hard-won wisdom, renewed career rewards.',
      ],
      matrix: [
        { indicator: 'Phase 1: Rising', meaning: 'Subconscious cleansing', advice: 'Budget diligently; avoid speculative gambling; prioritize adequate sleep.' },
        { indicator: 'Phase 2: Peak', meaning: 'Identity distillation', advice: 'Work with steady devotion; practice daily meditation; avoid victim mindset.' },
        { indicator: 'Phase 3: Setting', meaning: 'Harvest & Stability', advice: 'Reinvest earnings thoughtfully; step into mature mentorship roles.' },
      ],
    },
    relationToChart: 'Sade Sati operates in synergy with your active Vimshottari Mahadasha. If running a favorable Jupiter or Venus period, Sade Sati often brings extraordinary elevation to leadership.',
    whatItDoesNotMean: [
      'It does NOT mean everything in your life will collapse.',
      'It does NOT mean you cannot get married, start a company, or purchase a home—countless historical figures reached their pinnacle during Sade Sati.',
      'It is NOT a curse; Saturn is the celestial judge (Karmaphala Daata) who rewards genuine humility and honest effort.',
    ],
    limitations: [
      'Retrograde Saturn periods create temporary pauses and re-evaluations during each 2.5-year phase.',
      'Moons ruled by Saturn (Capricorn, Aquarius) or friendly planets (Taurus, Libra) experience far milder effects.',
    ],
    practicalExample: {
      scenario: 'A native with natal Moon in Pisces enters the 1st phase as Saturn enters Aquarius.',
      inputs: 'Natal Moon: Pisces 14° | Transiting Saturn: Aquarius 22°',
      finding: 'Phase 1 Active (Rising Phase, 12th from natal Moon).',
      interpretation: 'Focus turns toward simplifying expenditure, decluttering relationships, and establishing deep contemplative spiritual practice.',
      actionableAdvice: 'Dedicate Saturdays to seva (selfless service), feeding disabled individuals or animals, and reciting Dasharatha Shani Stotram.',
    },
    faqs: [
      {
        question: 'How many times does an individual experience Sade Sati in a lifetime?',
        answer: 'Most people experience Sade Sati two or three times in their life (around ages 0-30, ages 30-60, and ages 60-90), with each cycle bringing distinct evolutionary milestones.',
      },
      {
        question: 'What are the classical remedies for Shani propitiation?',
        answer: 'Lighting a mustard oil lamp beneath a Peepal tree on Saturday evenings, selfless service to elders and laborers, wearing iron ring from horseshoe, and avoiding arrogance.',
      },
    ],
    relatedToolIds: ['moon-sign', 'vimshottari-dasha', 'planetary-dignities', 'gemstone'],
  },

  'kundli-matching': {
    id: 'guide-kundli-matching',
    toolId: 'kundli-matching',
    title: 'Ashtakoot Kundli Matching Master Guide',
    subtitle: 'The 36-Point Vedic Matrimonial Matrix & 8 Kootas Explained',
    category: 'Compatibility',
    branch: 'Vedic',
    estimatedReadTime: '8 min read',
    introduction: 'Ashtakoot Milan is the time-tested classical 36-point compatibility framework developed by Maharishis to evaluate mental, emotional, physiological, and spiritual harmony between two life partners.',
    whatItIs: 'The system evaluates the birth Nakshatras and Moon signs of both partners across 8 distinct dimensions (Kootas), assigning mathematical points totaling 36 Gunas.',
    whatItCalculates: 'Calculates the 8 Kootas: Varna (1 pt), Vashya (2 pts), Tara (3 pts), Yoni (4 pts), Graha Maitri (5 pts), Gana (6 pts), Bhakoot (7 pts), and Nadi (8 pts), with automatic classical cancellation checks for Nadi and Bhakoot doshas.',
    howItWorks: 'Each partner’s Moon longitude determines their birth Nakshatra, pada, and Rashi. The algorithm cross-references classical tables to score psychological compatibility, sexual harmony (Yoni), emotional friendship (Graha Maitri), and genetic longevity (Nadi).',
    requiredInfo: [
      { field: 'Partner A: Birth Date, Time, City', whyNeeded: 'Establishes primary partner Moon sign, degree, and Nakshatra.' },
      { field: 'Partner B: Birth Date, Time, City', whyNeeded: 'Establishes secondary partner Moon sign, degree, and Nakshatra.' },
    ],
    howToInterpret: {
      overview: 'Classical Shastras establish clear guidelines for total score evaluation out of 36 points.',
      keyPoints: [
        '28–36 Points: Outstanding compatibility (Uttam Milan); deep instinctive alignment.',
        '18–27 Points: Auspicious & workable (Madhyam Milan); sound foundation for long-term matrimony.',
        'Below 18 Points: Sub-optimal (Ashubh); requires careful examination of individual 7th houses and mature commitment.',
      ],
      matrix: [
        { indicator: 'Nadi Koota (8 pts)', meaning: 'Genetic & physiological resonance', advice: 'Ensures healthy lineage; if same Nadi occurs, check Nakshatra pada exception.' },
        { indicator: 'Bhakoot Koota (7 pts)', meaning: 'Emotional & financial flow', advice: 'Measures sign distance (6-8, 9-5, 12-2); mitigated when sign lords are natural friends.' },
        { indicator: 'Graha Maitri (5 pts)', meaning: 'Intellectual & psychological friendship', advice: 'Crucial for daily companionship, mutual humor, and collaborative decision making.' },
      ],
    },
    relationToChart: 'Matching points serve as an initial filter. Astrologers must also inspect both charts for individual character, financial stability, and D9 Navamsa marital strength.',
    whatItDoesNotMean: [
      'A 36/36 score does NOT guarantee an effortless marriage without ongoing love, emotional intelligence, and work.',
      'A score of 16 does NOT doom a couple to divorce if both partners share profound values and commitment.',
      'Doshas (such as Nadi Dosha) are not curses; classical texts list multiple automatic cancellations.',
    ],
    limitations: [
      'Focuses primarily on the Moon; does not evaluate ascendants, Sun signs, or 7th house lords.',
      'Requires accurate birth times for both partners to verify Nakshatra padas.',
    ],
    practicalExample: {
      scenario: 'Two partners score 24.5 / 36 points with high Graha Maitri and Yoni scores, but 0 on Bhakoot.',
      inputs: 'Partner A: Rohini (Taurus) | Partner B: Chitra (Libra)',
      finding: 'Total 24.5 / 36 (Good match, Bhakoot lord cancellation applied since Venus rules both signs).',
      interpretation: 'Both share Venusian aesthetic harmony and deep affectionate friendship; cancellation removes fear of financial discord.',
      actionableAdvice: 'Proceed with confidence while maintaining open communication regarding household roles.',
    },
    faqs: [
      {
        question: 'What is the minimum acceptable score for marriage?',
        answer: 'Classical texts recommend a minimum of 18 points, provided Nadi and Graha Maitri are reasonably balanced.',
      },
      {
        question: 'What happens if Nadi Dosha is present?',
        answer: 'Nadi Dosha carries 8 points. However, if partners share the same Nakshatra but different padas, or different Nakshatras within the same Rashi, the dosha is classically cancelled.',
      },
    ],
    relatedToolIds: ['love-calculator', 'nadi-dosha', 'mangal-dosha', 'navamsa'],
  },

  'numerology': {
    id: 'guide-numerology',
    toolId: 'numerology',
    title: 'Vedic & Pythagorean Numerology Master Guide',
    subtitle: 'Mulank (Birth Root), Bhagyank (Destiny), Lo Shu Grid & Karmic Numbers',
    category: 'Numerology',
    branch: 'Numerology',
    estimatedReadTime: '7 min read',
    introduction: 'Numerology is the ancient esoteric science of vibratory resonance that decodes the sacred numerical frequencies governing human character, destiny pathways, and timing cycles.',
    whatItIs: 'Every number from 1 to 9 embodies a specific planetary archetype: 1 (Sun), 2 (Moon), 3 (Jupiter), 4 (Rahu), 5 (Mercury), 6 (Venus), 7 (Ketu), 8 (Saturn), and 9 (Mars). By analyzing your birth date and name, numerology illuminates your core nature and life mission.',
    whatItCalculates: 'Calculates your Mulank (Driver / Radical Number from birth day), Bhagyank (Destiny / Life Path Number from full date sum), Lo Shu 3x3 Grid planes, Name Numerology value (Chaldean & Pythagorean), and Personal Year cycle.',
    howItWorks: 'Birth day digits are reduced via fadic addition (e.g. 29 -> 2+9=11 -> 1+1=2). The full date (Day + Month + Year) is reduced to a single digit or master number (11, 22, 33) to determine the Bhagyank.',
    requiredInfo: [
      { field: 'Day, Month, Year of Birth', whyNeeded: 'Calculates Mulank and Bhagyank.' },
      { field: 'Full Legal / Preferred Name', whyNeeded: 'Analyzes alphabet sound vibrations via Chaldean and Pythagorean numeric assignment.' },
    ],
    howToInterpret: {
      overview: 'Your Mulank represents your internal core nature and self-perception, while your Bhagyank signifies the broader life lessons, career opportunities, and destiny calling.',
      keyPoints: [
        'Numbers 1, 3, 5, 6, 9: Generally dynamic, expressive, expansive, and highly social frequencies.',
        'Numbers 2, 4, 7, 8: Deep, introspective, structured, analytical, and karmic frequencies.',
        'Compatibility between Mulank and Bhagyank indicates internal psychological ease vs productive inner friction.',
      ],
      matrix: [
        { indicator: 'Mulank 1 (Sun)', meaning: 'Pioneering Leader', advice: 'Take independent initiative; guard against authoritarian pride.' },
        { indicator: 'Mulank 5 (Mercury)', meaning: 'Versatile Communicator', advice: 'Thrives in fast-paced commerce, travel, and media; cultivate patience.' },
        { indicator: 'Mulank 8 (Saturn)', meaning: 'Karmic Builder & Executive', advice: 'Achieves massive worldly wealth through perseverance after initial early trials.' },
      ],
    },
    relationToChart: 'Numerology numbers align directly with your astrological chart rulers. For instance, a native with Mulank 6 aligns deeply with Venusian placements and arts.',
    whatItDoesNotMean: [
      'It does NOT mean changing your name on social media will magically erase karmic obligations without hard work.',
      'No number is "unlucky" or "cursed"—each number possesses supreme divine gifts when harmonized.',
    ],
    limitations: [
      'Does not substitute for detailed astrological transit and house analysis.',
      'Pronunciation nuances can influence Chaldean name vibration interpretations.',
    ],
    practicalExample: {
      scenario: 'An individual born on the 28th of November 1994.',
      inputs: 'Day: 28 | Month: 11 | Year: 1994',
      finding: 'Mulank: 1 (2+8=10 -> 1) | Bhagyank: 9 (2+8+1+1+1+9+9+4 = 35 -> 3+5 = 8).',
      interpretation: 'The native possesses the fiery executive drive of Sun (1) combined with the structural perseverance and institutional authority of Saturn (8).',
      actionableAdvice: 'Excel in large corporate leadership, engineering, or real estate development.',
    },
    faqs: [
      {
        question: 'Which system is more accurate: Chaldean or Pythagorean?',
        answer: 'Pythagorean numerology is ideal for psychological character analysis, while Chaldean numerology is considered more precise for name vibrations and energetic resonance.',
      },
      {
        question: 'What is a Personal Year cycle?',
        answer: 'Your Personal Year reflects your active 9-year evolutionary phase, showing whether the current year favors planting seeds (Year 1), partnerships (Year 2), or harvest (Year 8).',
      },
    ],
    relatedToolIds: ['sun-sign', 'moon-sign', 'atmakaraka', 'gemstone'],
  },
};

/**
 * Fallback generator for tools that do not have custom deep-dive guide entries
 */
export function getToolGuide(toolId: string, toolMeta?: { title: string; category: string; shortExplanation: string; howItWorks: string }): ToolGuideData {
  if (TOOL_GUIDES_DATABASE[toolId]) {
    return TOOL_GUIDES_DATABASE[toolId];
  }

  const title = toolMeta?.title || `${toolId.replace(/-/g, ' ').toUpperCase()} Calculator`;
  const category = toolMeta?.category || 'Astrology & Calculation';
  const explanation = toolMeta?.shortExplanation || 'Calculates astronomical and astrological placements with mathematical precision.';
  const mechanics = toolMeta?.howItWorks || 'Evaluates celestial longitude against sidereal ephemeris algorithms using standard astronomical formulas.';

  return {
    id: `guide-${toolId}`,
    toolId,
    title: `${title} Complete Educational Guide`,
    subtitle: `Methodology, Astronomical Mechanics & Reading Guidelines for ${title}`,
    category,
    branch: 'Vedic',
    estimatedReadTime: '5 min read',
    introduction: `Welcome to the comprehensive guide for the ${title}. This educational resource clarifies the underlying astronomical calculations, astrological significance, required birth inputs, and correct interpretation principles.`,
    whatItIs: `${title} is a dedicated computational tool designed to analyze specific planetary frequencies and harmonic configurations in your astrological blueprint. ${explanation}`,
    whatItCalculates: `Computes precise mathematical coordinates, divisional harmonics, house activations, or numerological matrices based upon classical Jyotish and ephemeris tables.`,
    howItWorks: mechanics,
    requiredInfo: [
      { field: 'Birth Date (Day, Month, Year)', whyNeeded: 'Anchors planetary positions in the astronomical ephemeris.' },
      { field: 'Accurate Birth Time', whyNeeded: 'Essential for fixing local ascendant and rapid lunar or cusp movements.' },
      { field: 'Birth City / Geographical Coordinates', whyNeeded: 'Determines local horizon, sidereal time, and exact house cusps.' },
    ],
    howToInterpret: {
      overview: `Interpret findings holistically rather than in isolation. Planetary influences represent energetic predispositions that blossom through personal choices and conscious awareness.`,
      keyPoints: [
        'Consider planetary dignity (exalted, moolatrikona, friendly, or debilitated).',
        'Examine aspects (Drishti) cast by benefic planets such as Jupiter and Venus.',
        'Synthesize findings with your active Vimshottari Mahadasha timeline.',
      ],
    },
    relationToChart: `This tool illuminates a specialized quadrant of your life blueprint, linking directly to your Ascendant (physical persona), Moon (mind), and Sun (soul).`,
    whatItDoesNotMean: [
      'It does NOT dictate an unchangeable fatalistic destiny.',
      'Challenging configurations do NOT indicate failure; they pinpoint evolutionary growth areas.',
    ],
    limitations: [
      'Requires accurate birth coordinates and time to guarantee mathematical validity.',
      'Should be read in harmony with your complete natal chart.',
    ],
    practicalExample: {
      scenario: `Analyzing ${title} for a seeker seeking clarity.`,
      inputs: 'Standard verified birth parameters.',
      finding: 'Clear calculation result verified against astronomical algorithms.',
      interpretation: 'Provides actionable self-knowledge and reveals favorable planetary timing.',
      actionableAdvice: 'Apply classical remedies, maintain disciplined focus, and consult an astrologer for deeper synthesis.',
    },
    faqs: [
      {
        question: `How often should I consult the ${title}?`,
        answer: 'Natal calculations remain fixed for life. For transit-related or timing tools, review whenever entering new life milestones or annual cycles.',
      },
      {
        question: 'Are classical remedies mandatory?',
        answer: 'Remedies (Upayas) are spiritual alignment tools—such as meditation, selfless service, and mantras—that consciously harmonize internal psychological states.',
      },
    ],
    relatedToolIds: ['moon-sign', 'sun-sign', 'lagna', 'kundli-matching'],
  };
}
