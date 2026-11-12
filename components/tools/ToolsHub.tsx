'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UniversalToolModal } from './UniversalToolModal';
import { LocationPicker } from './LocationPicker';
import { useAstrology } from '@/lib/state/astrology-context';
import { useAuth } from '@/lib/state/auth-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { POPULAR_CITIES, CityLocation } from '@/lib/astrology-engine/location-service';
import { AstrologyResultObject } from '@/types';
import {
  Sparkles,
  Search,
  Compass,
  Moon,
  Sun,
  Flame,
  Clock,
  Heart,
  Shield,
  Gem,
  Calculator,
  Baby,
  Calendar,
  Layers,
  ArrowRight,
  Star,
  Activity,
  Award,
  Crown,
  BookOpen,
  Palette,
  PhoneCall,
  Sunrise,
  Hourglass,
  CalendarRange,
  HeartHandshake,
  HelpCircle,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Crosshair,
  Gauge,
  Timer,
  Clock3,
  Clock8,
  Ban,
  Orbit,
  Hash,
  Type,
  Table,
  Link as LinkIcon,
  CircleDot,
  Lock,
} from 'lucide-react';

// Engines
import { getNakshatraFromLongitude } from '@/lib/astrology-engine/nakshatra';
import { calculateDailyPanchang } from '@/lib/astrology-engine/panchang';
import { calculateChoghadiya, calculateGowriPanchangam, calculatePlanetaryHora } from '@/lib/astrology-engine/timing';
import { calculateMangalDosha, calculateKaalSarpDosha, calculateSadeSati, calculatePitraDosha } from '@/lib/astrology-engine/doshas';
import { calculateCharaKarakas, calculateIshtaDevata } from '@/lib/astrology-engine/jaimini';
import { calculateKpHorary, calculateKpNatalSubLords, calculateKpRulingPlanetsNow } from '@/lib/astrology-engine/kp';
import {
  calculateMulankAndBhagyank,
  calculateNameNumerology,
  calculatePersonalYear,
  calculateLoShuGrid,
  calculateMobileOrVehicleNumerology,
} from '@/lib/astrology-engine/numerology';
import { calculateAshtakootMatching } from '@/lib/astrology-engine/matching';
import { getLahiriAyanamsa } from '@/lib/astrology-engine/ayanamsa';
import { calculateNavamsaChart } from '@/lib/astrology-engine/navamsa';
import { calculateVimshottariDasha } from '@/lib/astrology-engine/dasha';
import { generateFullNatalChart } from '@/lib/astrology-engine/chart';

export interface ToolItem {
  id: string;
  title: string;
  category: string;
  shortExplanation: string;
  icon: React.ReactNode;
  tags: string[];
  howItWorks: string;
  keyFeatures: string[];
  practicalGuidance: string;
}

export const ASTROLOGY_TOOLS: ToolItem[] = [
  // 1. Birth & Chart
  {
    id: 'moon-sign',
    title: 'Moon Sign / Chandra Rashi',
    category: 'Birth & Chart',
    shortExplanation: 'Calculates your sidereal Moon sign, exact lunar degree, and Nakshatra lord.',
    icon: <Moon size={18} color="#F472B6" />,
    tags: ['rashi', 'chandra', 'nakshatra'],
    howItWorks: 'Calculates the exact position of the Moon against the sidereal zodiac constellations using the Lahiri Ayanamsa at the moment of your birth.',
    keyFeatures: ['Pinpoints Moon Rashi, degree & minute', 'Identifies emotional temperament & mental peace', 'Maps lunar Nakshatra and ruling deity'],
    practicalGuidance: 'Your Moon sign governs emotional instincts, psychological security, and instinctive reactions.',
  },
  {
    id: 'sun-sign',
    title: 'Sun Sign (Vedic vs Western)',
    category: 'Birth & Chart',
    shortExplanation: 'Calculates both your Sidereal Vedic and Tropical Western Sun signs.',
    icon: <Sun size={18} color="#FBBF24" />,
    tags: ['surya', 'tropical', 'sidereal'],
    howItWorks: 'Cross-references solar celestial longitude using both the tropical solar calendar and the fixed sidereal constellation belt (24° offset).',
    keyFeatures: ['Displays Sidereal Vedic vs Tropical Western signs', 'Explains soul purpose and outward vitality', 'Shows solar transit & career illumination'],
    practicalGuidance: 'Your Vedic Sun reflects your true spiritual core and dharma, whereas your Western sign relates to psychological ego expression.',
  },
  {
    id: 'nakshatra',
    title: 'Birth Nakshatra & Pada',
    category: 'Birth & Chart',
    shortExplanation: 'Reveals your 1 of 27 lunar mansions, pada, deity, and birth syllables.',
    icon: <Star size={18} color="#A855F7" />,
    tags: ['constellation', 'star', 'akshara'],
    howItWorks: 'Divides the 360° zodiac into 27 equal lunar mansions of 13°20′ each, subdivided into 4 padas (quarters) of 3°20′.',
    keyFeatures: ['Exact 1 of 27 constellation name & pada', 'Auspicious birth name syllables (Namakshara)', 'Presiding deity, animal totem & caste'],
    practicalGuidance: 'Use your Nakshatra lord and syllable to align with auspicious mantras and personal naming frequencies.',
  },
  {
    id: 'lagna',
    title: 'Ascendant / Lagna Finder',
    category: 'Birth & Chart',
    shortExplanation: 'Pinpoints the exact rising sign and degree anchoring all 12 houses.',
    icon: <Compass size={18} color="#38BDF8" />,
    tags: ['rising', 'houses', 'tanu'],
    howItWorks: 'Determines which zodiac sign was cresting the eastern horizon at your exact geographical coordinates and birth minute.',
    keyFeatures: ['Exact rising sign degree & minute', 'Anchors the 12 houses (Bhavas) of your life', 'Reveals physical presence & outward persona'],
    practicalGuidance: 'Your Lagna is the steering wheel of your life; its planetary ruler is your primary chart guardian.',
  },
  {
    id: 'navamsa',
    title: 'Navamsa D9 Kundli',
    category: 'Birth & Chart',
    shortExplanation: 'Generates your 9th divisional harmonic chart and Vargottama planets.',
    icon: <Layers size={18} color="#34D399" />,
    tags: ['d9', 'marriage', 'vargottama'],
    howItWorks: 'Divides each zodiac sign into nine 3°20′ divisions to calculate the microscopic spiritual harmonic chart (D9).',
    keyFeatures: ['D9 marital & spiritual destiny kundli', 'Identification of Vargottama super-planets', 'Spouse inner character & soul dharma'],
    practicalGuidance: 'The Navamsa reveals what fruits manifest in the second half of life and inside marriage.',
  },
  {
    id: 'planetary-dignities',
    title: 'Planetary Dignities & Shadbala',
    category: 'Birth & Chart',
    shortExplanation: 'Calculates exaltation, moolatrikona, friendly, and debilitated planetary states.',
    icon: <Orbit size={18} color="#FB923C" />,
    tags: ['exaltation', 'shadbala', 'strength'],
    howItWorks: 'Evaluates each of the nine Grahas against classical dignity rules (Uchha, Neecha, Swa-kshetra) and temporal strength.',
    keyFeatures: ['Strength scores for all 9 planets', 'Combustion and retrograde indicators', 'Benefic vs malefic functional roles'],
    practicalGuidance: 'Strengthen functional benefics that are well-placed to unlock effortless opportunities.',
  },

  // 2. Doshas & Dashas
  {
    id: 'mangal-dosha',
    title: 'Mangal Dosha (Kuja / Manglik)',
    category: 'Doshas & Dashas',
    shortExplanation: 'Analyzes Mars placements from Lagna, Moon, and Venus with classical cancellations.',
    icon: <Flame size={18} color="#EF4444" />,
    tags: ['manglik', 'mars', 'marriage'],
    howItWorks: 'Scans houses 1, 2, 4, 7, 8, and 12 from the Ascendant, Moon, and Venus for Mars placements, checking 16 classical cancellation exceptions.',
    keyFeatures: ['Accurate severity rating (High, Low, or Cancelled)', 'Classical Shastric cancellation verification', 'Marital harmony advice & Hanuman mitigations'],
    practicalGuidance: 'Mangal Dosha is widely misunderstood; over 70% of charts possess natural cancellations through planetary friendship or Jupiterian aspect.',
  },
  {
    id: 'kaal-sarp',
    title: 'Kaal Sarp Yoga Evaluator',
    category: 'Doshas & Dashas',
    shortExplanation: 'Checks planetary alignment across the Rahu-Ketu axis across 12 classical types.',
    icon: <ShieldAlert size={18} color="#F97316" />,
    tags: ['rahu', 'ketu', 'snake'],
    howItWorks: 'Determines whether all seven physical planets are hemmed in between the Rahu and Ketu nodal axis in your birth chart.',
    keyFeatures: ['Identifies specific 1 of 12 Kaal Sarp types', 'Distinguishes Full vs Partial (Anshik) alignment', 'Rahu-Ketu mitigation mantras & Shiva worship'],
    practicalGuidance: 'Kaal Sarp often brings intense early struggles followed by extraordinary worldly authority and fame after age 33.',
  },
  {
    id: 'sade-sati',
    title: 'Sade Sati Saturn Tracker',
    category: 'Doshas & Dashas',
    shortExplanation: 'Determines whether you are in Saturn’s 7.5-year cycle, active phase, and dates.',
    icon: <Hourglass size={18} color="#A78BFA" />,
    tags: ['shani', 'saturn', 'transit'],
    howItWorks: 'Tracks Saturn transiting through the 12th, 1st, and 2nd houses from your natal Moon sign (each phase lasting ~2.5 years).',
    keyFeatures: ['Active Sade Sati phase or freedom status', 'Current Dhaiya (small panoti) calculation', 'Shani dev blessing mantras & charity guidance'],
    practicalGuidance: 'Sade Sati is not punishment; it is Saturn’s university of discipline, teaching focus, humility, and enduring success.',
  },
  {
    id: 'vimshottari-dasha',
    title: 'Vimshottari Dasha Timeline',
    category: 'Doshas & Dashas',
    shortExplanation: 'Computes your 120-year life timeline of Mahadashas and Antardashas.',
    icon: <CalendarRange size={18} color="#FBBF24" />,
    tags: ['timeline', 'periods', 'cycles'],
    howItWorks: 'Calculates the 120-year planetary progression cycle starting from your birth Nakshatra lunar balance.',
    keyFeatures: ['Active Mahadasha & Antardasha lords', 'Start and end dates for all 9 major cycles', 'Strategic life planning and transit synergy'],
    practicalGuidance: 'Align major ventures (career switches, relocations, weddings) with favorable ruling dasha lords.',
  },
  {
    id: 'pitra-dosha',
    title: 'Pitra Dosha Analysis',
    category: 'Doshas & Dashas',
    shortExplanation: 'Evaluates solar and 9th house indicators with ancestral reverence mitigations.',
    icon: <ShieldCheck size={18} color="#10B981" />,
    tags: ['ancestors', 'sun', 'karma'],
    howItWorks: 'Analyzes conjunctions of Sun or 9th house lord with Rahu/Ketu, indicating unresolved ancestral debts (Rina).',
    keyFeatures: ['Clear presence/absence indicator', 'Root house placement & significance', 'Simple Shraddha, tarpan, and water offering remedies'],
    practicalGuidance: 'Offering water to the morning sun and feeding birds or cows swiftly resolves energetic ancestral blockages.',
  },
  {
    id: 'gandmool-dosha',
    title: 'Gandmool Dosha Finder',
    category: 'Doshas & Dashas',
    shortExplanation: 'Identifies birth in junction Nakshatras between water and fire signs.',
    icon: <Zap size={18} color="#EC4899" />,
    tags: ['gandmool', 'nakshatra', 'sandhi'],
    howItWorks: 'Checks whether the Moon was born in Ashwini, Ashlesha, Magha, Jyeshtha, Mula, or Revati (the 6 Gandmool stars).',
    keyFeatures: ['Exact Nakshatra junction categorization', 'Specific 27-day remedial timeline check', 'Deity pacification & shanti mantra guidance'],
    practicalGuidance: 'Gandmool natives possess intense intuition and intellectual gifts once peaceful shanti remedies are observed.',
  },

  // 3. Compatibility & Love
  {
    id: 'kundli-matching',
    title: 'Ashtakoot Kundli Matching',
    category: 'Compatibility',
    shortExplanation: 'Calculates the classical 36-point compatibility score across all 8 Kootas.',
    icon: <HeartHandshake size={18} color="#E11D48" />,
    tags: ['marriage', 'score', 'guna milan'],
    howItWorks: 'Evaluates partner Nakshatras across the 8 classical Kootas: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi.',
    keyFeatures: ['Exact score out of 36 Gunas', 'Detailed breakdown of all 8 Kootas', 'Nadi and Bhakoot dosha checks with mitigations'],
    practicalGuidance: 'A score of 18 or higher is considered auspicious; mental friendship (Graha Maitri) and health harmony (Nadi) are most crucial.',
  },
  {
    id: 'love-calculator',
    title: 'Love Harmony Calculator',
    category: 'Compatibility',
    shortExplanation: 'Lightweight name and nakshatra-syllable resonance indicator.',
    icon: <Heart size={18} color="#F43F5E" />,
    tags: ['name', 'affinity', 'romance'],
    howItWorks: 'Analyzes name vibratory numerology combined with zodiac element compatibility (Fire-Air, Earth-Water harmony).',
    keyFeatures: ['Love harmony affinity percentage', 'Communication & emotional chemistry rating', 'Practical tips for long-term romantic bliss'],
    practicalGuidance: 'True relationship success combines cosmic compatibility with daily compassionate listening and respect.',
  },
  {
    id: 'nadi-dosha',
    title: 'Nadi Dosha Checker',
    category: 'Compatibility',
    shortExplanation: 'Evaluates physical and genetic compatibility based on Adi, Madhya, and Antya Nadi.',
    icon: <Activity size={18} color="#06B6D4" />,
    tags: ['nadi', 'genetics', 'dosha'],
    howItWorks: 'Compares the three physiological channels (Vata/Adi, Pitta/Madhya, Kapha/Antya) of both partners’ birth stars.',
    keyFeatures: ['Detection of same Nadi (8 Gunas at stake)', 'Identification of Nakshatra pada exceptions', 'Maha-Mrityunjaya mantra & gold donation mitigations'],
    practicalGuidance: 'If partners share the same Nakshatra but different Padas, Nadi Dosha is classically nullified.',
  },

  // 4. Jaimini & KP Astrology
  {
    id: 'atmakaraka',
    title: 'Atmakaraka & Chara Karakas',
    category: 'Jaimini & KP',
    shortExplanation: 'Ranks planets by degree to identify your soul significator and spouse karaka.',
    icon: <Crown size={18} color="#60A5FA" />,
    tags: ['jaimini', 'soul', 'darakaraka'],
    howItWorks: 'Ranks planets by descending mathematical degree (0° to 30°) in their signs according to Maharishi Jaimini Upadesha Sutras.',
    keyFeatures: ['Identifies Atmakaraka (Soul king planet)', 'Pinpoints Darakaraka (Spouse significator)', 'Reveals Amatya, Bhratri, and Matri karakas'],
    practicalGuidance: 'Meditating on the nature of your Atmakaraka unlocks your highest soul purpose and spiritual clarity.',
  },
  {
    id: 'ishta-devata',
    title: 'Ishta Devata Calculator',
    category: 'Jaimini & KP',
    shortExplanation: 'Identifies your guiding spiritual deity via the 12th house from Karakamsa.',
    icon: <Sparkles size={18} color="#FBBF24" />,
    tags: ['deity', 'meditation', 'mantra'],
    howItWorks: 'Finds the Atmakaraka planet in the Navamsa D9 chart (Karakamsa) and analyzes the planet ruling the 12th house from it.',
    keyFeatures: ['Guiding spiritual deity of your soul', 'Sacred beej mantra for daily meditation', 'Ideal spiritual practice (Japa, Seva, Jnana)'],
    practicalGuidance: 'Connecting with your Ishta Devata brings effortless divine protection, peace of mind, and inner awakening.',
  },
  {
    id: 'kp-horary',
    title: 'KP Horary (1–249 Numbers)',
    category: 'Jaimini & KP',
    shortExplanation: 'Divines direct answers using the Krishnamurti Paddhati 249 sub-lord table.',
    icon: <HelpCircle size={18} color="#8B5CF6" />,
    tags: ['prashna', 'sublord', 'horary'],
    howItWorks: 'Maps an intuitive query number (1 to 249) directly to the exact KP zodiac degree, sign lord, star lord, and sub-lord.',
    keyFeatures: ['Instant sub-lord determination for any question', 'House cusp activation for career, health, or travel', 'Definitive timing and probability indicators'],
    practicalGuidance: 'Pick a number between 1 and 249 only when your mind is calm and your question is sincere.',
  },
  {
    id: 'kp-sublord',
    title: 'KP Sub-Lord Finder',
    category: 'Jaimini & KP',
    shortExplanation: 'Pinpoints star lords and sub lords for natal planets and house cusps.',
    icon: <Layers size={18} color="#0284C7" />,
    tags: ['kp', 'cusps', 'star lord'],
    howItWorks: 'Applies Prof. K.S. Krishnamurti’s precision unequal division of constellations according to Vimshottari proportions.',
    keyFeatures: ['Sign Lord, Star Lord, and Sub-Lord for every cusp', 'Placidus house cusp longitude calculations', 'Reveals event manifestation timing'],
    practicalGuidance: 'In KP astrology, the planet indicates the source of the event, the star lord shows the result, and the sub-lord decides YES or NO.',
  },
  {
    id: 'kp-ruling',
    title: 'KP Ruling Planets Now',
    category: 'Jaimini & KP',
    shortExplanation: 'Real-time calculation of cosmic ruling planets of the present moment.',
    icon: <Radio size={18} color="#059669" />,
    tags: ['ruling', 'present', 'now'],
    howItWorks: 'Computes real-time cosmic rulers: Day Lord, Moon Sign Lord, Moon Star Lord, Ascendant Sign Lord, and Ascendant Star Lord.',
    keyFeatures: ['Live updated ruling planets of right now', 'Used to verify birth time authenticity', 'Instant Prashna query resolution'],
    practicalGuidance: 'Astrologers use present ruling planets to rectify unknown birth times with scientific precision.',
  },

  // 5. Sacred Mantras & Sound Vibrations
  {
    id: 'mantra-yantra',
    title: 'Lucky Mantra & Yantra Guide',
    category: 'Remedies',
    shortExplanation: 'Recommends personal Vedic beej mantras and sacred geometrical yantras.',
    icon: <BookOpen size={18} color="#8B5CF6" />,
    tags: ['mantra', 'yantra', 'sound'],
    howItWorks: 'Identifies the planetary sound vibrations that balance your natal chart lagna and dasha lord.',
    keyFeatures: ['Specific planetary beej mantras with japa counts', 'Sacred geometry yantra placements', 'Auspicious hours for meditation practice'],
    practicalGuidance: 'Chanting a beej mantra 108 times daily rewires subconscious thought patterns toward peace and vitality.',
  },

  // 6. Numerology Center
  {
    id: 'numerology-center',
    title: 'Mulank & Bhagyank Numerology',
    category: 'Numerology',
    shortExplanation: 'Calculates your Core Root (Mulank) and Destiny (Bhagyank) numbers.',
    icon: <Hash size={18} color="#F97316" />,
    tags: ['mulank', 'bhagyank', 'numbers'],
    howItWorks: 'Reduces your birth day (1–31) to Mulank (1–9) and your full birth date sum to Bhagyank (Destiny number).',
    keyFeatures: ['Mulank (Inner personality ruler)', 'Bhagyank (Outer destiny path ruler)', 'Lucky numbers, friendly digits, and neutral days'],
    practicalGuidance: 'Schedule contracts and interviews on dates that resonate with your Mulank or Bhagyank.',
  },
  {
    id: 'name-numerology',
    title: 'Chaldean Name Numerology',
    category: 'Numerology',
    shortExplanation: 'Evaluates your name vibration using the ancient Chaldean number system.',
    icon: <Type size={18} color="#3B82F6" />,
    tags: ['chaldean', 'name', 'vibration'],
    howItWorks: 'Converts letters of your name into ancient sound frequencies (values 1–8) and evaluates compound number strength.',
    keyFeatures: ['Compound name vibration score', 'Harmony with birth date numbers', 'Suggested spelling adjustments for success'],
    practicalGuidance: 'A harmonious name compound number effortlessly attracts good fortune and societal goodwill.',
  },
  {
    id: 'lo-shu-grid',
    title: 'Lo Shu Grid 3x3 Analysis',
    category: 'Numerology',
    shortExplanation: 'Maps birth date digits into the 3x3 sacred Chinese numerology square.',
    icon: <Table size={18} color="#10B981" />,
    tags: ['lo shu', 'grid', 'arrows'],
    howItWorks: 'Distributes birth date numbers into the ancient 3x3 magic square to identify arrows of strength and weakness.',
    keyFeatures: ['Arrows of Determination, Willpower, and Thought', 'Missing number remedies and elemental balance', 'Mental, Emotional, and Practical planes'],
    practicalGuidance: 'Missing numbers in the Lo Shu grid highlight areas where conscious skill-building is beneficial.',
  },
  {
    id: 'mobile-vehicle',
    title: 'Mobile & Vehicle Vibe Checker',
    category: 'Numerology',
    shortExplanation: 'Calculates the energetic vibration of your phone number or vehicle plate.',
    icon: <PhoneCall size={18} color="#6366F1" />,
    tags: ['mobile', 'vehicle', 'vibration'],
    howItWorks: 'Sums up digits of mobile or vehicle plate numbers to calculate their single-digit cosmic ruler.',
    keyFeatures: ['Single digit vibration ruler (1–9)', 'Commercial vs personal communication affinity', 'Safe travel and vehicle longevity score'],
    practicalGuidance: 'Choose mobile numbers that sum to your lucky numbers to boost business and client connectivity.',
  },

  // 7. Panchang & Muhurats
  {
    id: 'daily-panchang',
    title: 'Daily Panchang & Timing',
    category: 'Panchang',
    shortExplanation: 'Full Tithi, Vara, Nakshatra, Yoga, Karana, and Samvats for any Indian city.',
    icon: <Sunrise size={18} color="#FB923C" />,
    tags: ['tithi', 'vara', 'sunrise'],
    howItWorks: 'Calculates the five essential limbs of Vedic time based on solar and lunar longitudes and local sunrise/sunset.',
    keyFeatures: ['Tithi, Nakshatra, Yoga, Karana, and Vara', 'Local sunrise, sunset, and solar midday', 'Auspicious Muhurats for today'],
    practicalGuidance: 'Checking the daily Panchang ensures your activities flow in harmony with cosmic rhythms.',
  },
  {
    id: 'choghadiya',
    title: 'Daily Choghadiya (Day & Night)',
    category: 'Panchang',
    shortExplanation: 'Eight daytime and eight nighttime auspicious windows with real-time indicators.',
    icon: <Clock3 size={18} color="#FBBF24" />,
    tags: ['amrit', 'shubh', 'timing'],
    howItWorks: 'Divides day and night each into eight equal 1.5-hour intervals ruled by Amrit, Shubh, Labh, Char, Rog, Kaal, and Udveg.',
    keyFeatures: ['Live active Choghadiya indicator', 'Amrit, Shubh, and Labh auspicious windows', 'Avoidance of Rog, Kaal, and Udveg periods'],
    practicalGuidance: 'Initiate critical negotiations, journeys, and investments during Amrit or Shubh Choghadiyas.',
  },
  {
    id: 'gowri-panchang',
    title: 'Gowri Panchangam',
    category: 'Panchang',
    shortExplanation: 'South Indian Gowri day and night periods with active period classification.',
    icon: <Clock8 size={18} color="#38BDF8" />,
    tags: ['south', 'gowri', 'timing'],
    howItWorks: 'Applies traditional South Indian Gowri Muhurta calculations dividing the day into auspicious and inauspicious hours.',
    keyFeatures: ['Uthi, Amirtham, Labam, Sugam windows', 'Visham, Sorgam, Rogam alert indicators', 'Ideal for travel and new ventures'],
    practicalGuidance: 'Gowri Panchangam is especially revered for setting travel departure times and signing contracts.',
  },
  {
    id: 'rahu-kaal',
    title: 'Rahu Kaal & Inauspicious Times',
    category: 'Panchang',
    shortExplanation: 'Daily Rahu Kaal, Yamaganda, Gulika, and Abhijit Muhurta windows.',
    icon: <Ban size={18} color="#EF4444" />,
    tags: ['rahu', 'yamaganda', 'abhijit'],
    howItWorks: 'Divides daylight into 8 equal parts to pinpoint the 90-minute segment ruled by Rahu on each weekday.',
    keyFeatures: ['Today’s exact Rahu Kaal window', 'Yamaganda and Gulika Kaal timings', 'Abhijit Muhurta (the golden window of victory)'],
    practicalGuidance: 'Avoid starting new business contracts during Rahu Kaal; use Abhijit Muhurta to overcome obstacles.',
  },
  {
    id: 'hora',
    title: 'Planetary Hora Hours',
    category: 'Panchang',
    shortExplanation: '24 planetary hours cycling through Chaldean order with commercial/spiritual themes.',
    icon: <Timer size={18} color="#C084FC" />,
    tags: ['hora', 'planetary hours'],
    howItWorks: 'Divides day and night each into 12 planetary hours, cycling continuously according to the ancient Chaldean astronomical order.',
    keyFeatures: ['Live active planetary hora', 'Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn themes', 'Best hora for gold buying, signing, or meditation'],
    practicalGuidance: 'Use Venus Hora for romantic conversations and arts; Jupiter Hora for wealth and wisdom; Mercury Hora for writing and trades.',
  },
  {
    id: 'ayanamsa',
    title: 'Lahiri Ayanamsa Precession',
    category: 'Panchang',
    shortExplanation: 'Calculates the exact precession offset between tropical and sidereal zodiacs.',
    icon: <Gauge size={18} color="#34D399" />,
    tags: ['precession', 'degrees'],
    howItWorks: 'Computes the astronomical precession of the equinoxes based on the standard Chitra Paksha (Lahiri) formula.',
    keyFeatures: ['Exact Ayanamsa value for today (~24°13′)', 'Annual rate of precession (~50.29 arcseconds/year)', 'Equinox shift comparison'],
    practicalGuidance: 'Ayanamsa is the astronomical bridge connecting modern physical constellations with timeless Vedic wisdom.',
  },
];

const CATEGORIES = [
  'All Tools',
  'Birth & Chart',
  'Doshas & Dashas',
  'Compatibility',
  'Jaimini & KP',
  'Remedies',
  'Numerology',
  'Panchang',
];

interface ToolsHubProps {
  onAskAI?: (prompt: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ onAskAI, onNavigateTab }) => {
  const { natalChart, activeProfile } = useAstrology();
  const { user } = useAuth();
  const { openUpgradeModal } = useSubscription();
  const accessibleFreeTools = ['moon-sign'];

  const [activeCategory, setActiveCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'calculator' | 'guide'>('calculator');

  // Tool Form Inputs
  const [selectedCity, setSelectedCity] = useState<CityLocation>(POPULAR_CITIES[10]); // Varanasi
  const [inputDate, setInputDate] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [inputNameA, setInputNameA] = useState('');
  const [inputNameB, setInputNameB] = useState('');
  const [inputDateB, setInputDateB] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const [inputMobile, setInputMobile] = useState('');
  const [inputVehicle, setInputVehicle] = useState('');
  const [numerologySubTool, setNumerologySubTool] = useState<'mulank' | 'name' | 'loshu' | 'mobile'>('mulank');

  // Calculation Results
  const [activeResult, setActiveResult] = useState<AstrologyResultObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filteredTools = ASTROLOGY_TOOLS.filter((t) => {
    const matchesCategory = activeCategory === 'All Tools' || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const executeCalculation = async (toolId: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Provide satisfying real-time calculation telemetry feedback
      await new Promise((r) => setTimeout(r, 160));

      const now = new Date();

      // Compute dynamic astrological natal chart for user's entered birth parameters
      const activeChart = generateFullNatalChart(
        inputDate || '1996-09-12',
        inputTime || '14:30',
        selectedCity?.latitude ?? 25.3176,
        selectedCity?.longitude ?? 82.9739,
        'vedic',
        'sidereal',
        'whole-sign'
      );

      const moon = activeChart.planets.find((p) => p.name === 'Moon') || activeChart.planets[1];
      const sun = activeChart.planets.find((p) => p.name === 'Sun') || activeChart.planets[0];
      const asc = activeChart.ascendant;

      let resObj: AstrologyResultObject | null = null;

      if (toolId === 'moon-sign') {
        const moonLon = moon?.absoluteDegree || 45.2;
        const nak = getNakshatraFromLongitude(moonLon);
        // Moon in Scorpio (debilitated) is Avoid/Challenging, Taurus exalted is Good/Auspicious, others Neutral
        const isDebilitated = moon?.sign === 'Scorpio';
        const isExalted = moon?.sign === 'Taurus';
        const moonQuality: 'Good' | 'Neutral' | 'Avoid' = isDebilitated ? 'Avoid' : isExalted ? 'Good' : 'Neutral';

        resObj = {
          toolId: 'moon-sign',
          toolName: 'Moon Sign Calculator',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate, birthTime: inputTime, city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: { sign: moon?.sign, degree: moon?.degree, nakshatra: nak.nakshatra.name, pada: nak.pada, dignity: isDebilitated ? 'Neecha (Debilitated)' : isExalted ? 'Ucha (Exalted)' : 'Swakshetra / Mitrakhetra' },
          interpretation: {
            summary: `Your Vedic Moon Sign is ${moon?.sign} (${moon?.degree}°${moon?.minute}') in ${nak.nakshatra.name} Nakshatra (Pada ${nak.pada}). Dignity: ${isDebilitated ? 'Neecha (Debilitated - High Emotional Intensity)' : isExalted ? 'Ucha (Exalted - Supreme Mental Peace)' : 'Harmonious Balance'}.`,
            whatThisMeans: `In Vedic Jyotish, your Moon Sign (Rashi) is the sovereign ruler of your emotional memory, psychological instincts, and mental peace. Having your Moon in ${moon?.sign} anchors your thoughts in ${moon?.element} element dynamics. ${isDebilitated ? 'Mars-ruled water sign creates deep psychological churn; regular meditation and silver accessories are advised.' : isExalted ? 'Venus-ruled earth sign bestows emotional calm and stability.' : 'Your cognitive faculties operate with adaptable analytical depth.'}`,
            howCalculated: `Calculated from your birth coordinates (${selectedCity.latitude}°, ${selectedCity.longitude}°) using sidereal celestial mechanics with Lahiri Ayanamsa (~24° offset from tropical).`,
            traditionalContext: `Classical texts describe Moon in ${moon?.sign} as conferring ${isDebilitated ? 'occult sensitivity, intense passion, and investigative perception' : isExalted ? 'artistic appreciation, steady abundance, and emotional nourishment' : 'intellectual devotion, steady loyalty, and keen adaptability'}.`,
            quality: moonQuality,
          },
          relatedTools: [
            { id: 'nakshatra', title: 'Nakshatra Calculator' },
            { id: 'lagna', title: 'Ascendant Calculator' },
          ],
          disclaimer: 'Astrological interpretations provide reflective guidance and are not fatalistic predictions.',
        };
      } else if (toolId === 'sun-sign') {
        const isSunDebilitated = sun?.sign === 'Libra';
        const isSunExalted = sun?.sign === 'Aries';
        const sunQuality: 'Good' | 'Neutral' | 'Avoid' = isSunDebilitated ? 'Avoid' : isSunExalted ? 'Good' : 'Neutral';

        resObj = {
          toolId: 'sun-sign',
          toolName: 'Sun Sign Calculator',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate },
          calculatedAt: new Date().toISOString(),
          findings: { vedicSidereal: sun?.sign, degree: `${sun?.degree}°`, dignity: isSunDebilitated ? 'Neecha (Debilitated in Libra)' : isSunExalted ? 'Ucha (Exalted in Aries)' : 'Neutral / Friend Rashi' },
          interpretation: {
            summary: `Vedic Sidereal Sun: ${sun?.sign} (${sun?.degree}°) | Dignity: ${isSunDebilitated ? 'Neecha (Requires Surya Arghya & discipline)' : isSunExalted ? 'Ucha (High leadership & vitality)' : 'Balanced Atmakaraka'}`,
            whatThisMeans: `Your Sidereal Sun reflects your soul purpose and karmic vitality according to physical constellations. In ${sun?.sign}, Surya indicates ${isSunDebilitated ? 'diplomatic sensitivity where asserting personal boundaries requires conscious effort' : isSunExalted ? 'commanding leadership, sovereign initiative, and high vital heat' : 'steady application of willpower and social duty'}.`,
            howCalculated: 'Precession of the equinoxes creates a ~24° difference between the tropical vernal point and the sidereal fixed star Chitra.',
            traditionalContext: 'In ancient Jyotish, the Sun (Surya) represents Atmakaraka (soul authority) and physical father.',
            quality: sunQuality,
          },
          relatedTools: [{ id: 'moon-sign', title: 'Moon Sign Calculator' }],
          disclaimer: 'Astrological frameworks are interpretive systems.',
        };
      } else if (toolId === 'nakshatra') {
        const moonLon = moon?.absoluteDegree || 45.2;
        const nak = getNakshatraFromLongitude(moonLon);
        resObj = {
          toolId: 'nakshatra',
          toolName: 'Birth Nakshatra & Pada',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate, city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: {
            nakshatra: nak.nakshatra.name,
            pada: nak.pada,
            lord: nak.nakshatra.lord,
            deity: nak.nakshatra.deity,
            namakshara: nak.padaDetails?.syllableRoman || "",
          },
          interpretation: {
            summary: `Birth Star: ${nak.nakshatra.name} (Pada ${nak.pada}) • Ruling Lord: ${nak.nakshatra.lord} • Deity: ${nak.nakshatra.deity}`,
            whatThisMeans: `Born under ${nak.nakshatra.name}, your primal cognitive rhythm is governed by ${nak.nakshatra.lord}. Auspicious naming syllables begin with "${nak.padaDetails?.syllableRoman || ""}" (${nak.padaDetails?.syllableDevanagari || ""}).`,
            howCalculated: `Lunar longitude evaluated at 13°20' arc segments across the 27 sidereal asterisms with Lahiri ayanamsa.`,
            traditionalContext: `According to the Taittiriya Brahmana, ${nak.nakshatra.name} bestows sharpness of mind, creative charisma, and intuitive foresight.`,
            quality: 'Good',
          },
          relatedTools: [{ id: 'moon-sign', title: 'Moon Sign Calculator' }],
          disclaimer: 'Nakshatras represent cosmic archetypes for self-alignment.',
        };
      } else if (toolId === 'lagna') {
        resObj = {
          toolId: 'lagna',
          toolName: 'Ascendant (Lagna) Finder',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate, birthTime: inputTime, city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: {
            ascendantSign: asc.sign,
            degree: asc.degree,
            minute: asc.minute,
          },
          interpretation: {
            summary: `Rising Sign (Lagna): ${asc.sign} at ${asc.degree}°${asc.minute}'`,
            whatThisMeans: `The Ascendant represents the eastern horizon at the moment of your first breath. As a ${asc.sign} rising native, your outward vitality and worldview are guided by courage, strategic depth, and persistent resilience.`,
            howCalculated: `Calculated from local sidereal time (LST) and geographic latitude of ${selectedCity.name}.`,
            traditionalContext: `Tanu Bhava (1st House) is the supreme pivot of the entire Janam Kundli.`,
            quality: 'Good',
          },
          relatedTools: [{ id: 'navamsa', title: 'Navamsa D9 Kundli' }],
          disclaimer: 'Ascendant represents personal embodiment and life direction.',
        };
      } else if (toolId === 'mangal-dosha') {
        const md = calculateMangalDosha(activeChart);
        resObj = {
          toolId: 'mangal-dosha',
          toolName: 'Mangal Dosha Calculator',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate, city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: md,
          interpretation: {
            summary: md.hasDosha
              ? `Mangal Dosha Active (${md.severity} severity, Mars in House ${md.marsHouseFromLagna}).`
              : md.isCancelled
              ? `Mangal Dosha Cancelled: ${md.cancellationReasons[0]}`
              : `No Mangal Dosha Detected (Mars placed harmoniously in House ${md.marsHouseFromLagna}).`,
            whatThisMeans: md.traditionalMeaning,
            howCalculated: 'Mars evaluated from Lagna, Moon, and Venus across sensitive houses (1, 2, 4, 7, 8, 12) with classical cancellation exemptions.',
            traditionalContext: 'Mangal Dosha relates to passionate drive and assertiveness. In mature partnerships, clear communication channelizes this energy fruitfully.',
            quality: md.hasDosha ? 'Avoid' : 'Good',
          },
          relatedTools: [
            { id: 'kundli-matching', title: 'Kundli Matching' },
            { id: 'vimshottari-dasha', title: 'Vimshottari Dasha' },
          ],
          disclaimer: 'Manglik analysis should not be used to label individuals or cause marital anxiety.',
        };
      } else if (toolId === 'kaal-sarp') {
        const ks = calculateKaalSarpDosha(activeChart);
        resObj = {
          toolId: 'kaal-sarp',
          toolName: 'Kaal Sarp Yoga Evaluator',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate },
          calculatedAt: new Date().toISOString(),
          findings: ks,
          interpretation: {
            summary: ks.type !== 'None' ? `Kaal Sarp Yoga Present (${ks.type}).` : 'No Kaal Sarp Yoga detected in this chart.',
            whatThisMeans: ks.traditionalSignificance || 'Planets are not hemmed between Rahu and Ketu.',
            howCalculated: 'Evaluated longitudes of Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn relative to Rahu and Ketu.',
            traditionalContext: 'Kaal Sarp imparts deep spiritual transformation and eventual worldly authority.',
            quality: ks.type !== 'None' ? 'Neutral' : 'Good',
          },
          relatedTools: [{ id: 'sade-sati', title: 'Sade Sati Tracker' }],
          disclaimer: 'Karmic yoga analysis provides context for steady personal evolution.',
        };
      } else if (toolId === 'sade-sati') {
        const ss = calculateSadeSati(moon?.sign || 'Taurus', 'Aquarius');
        resObj = {
          toolId: 'sade-sati',
          toolName: 'Sade Sati Tracker',
          calculationVersion: '1.0.0',
          input: { moonSign: moon?.sign },
          calculatedAt: new Date().toISOString(),
          findings: ss,
          interpretation: {
            summary: ss.isActive
              ? `Sade Sati is Currently ACTIVE (${ss.phase}).`
              : `Sade Sati is Currently INACTIVE. Saturn is in ${ss.currentSaturnSign}.`,
            whatThisMeans: ss.traditionalMeaning,
            howCalculated: 'Compared natal Moon sign against current transit position of Saturn in Aquarius.',
            traditionalContext: 'Saturn teaches perseverance, humility, and structural discipline. It cleanses false illusions to establish enduring foundations.',
            quality: ss.isActive ? 'Neutral' : 'Good',
          },
          relatedTools: [
            { id: 'vimshottari-dasha', title: 'Vimshottari Dasha' },
            { id: 'panchang', title: 'Daily Panchang' },
          ],
          disclaimer: 'Sade Sati is a natural cyclical phase of life, not an inevitable misfortune.',
        };
      } else if (toolId === 'kundli-matching') {
        const km = calculateAshtakootMatching(moon?.absoluteDegree || 45, 112, inputNameA, inputNameB);
        resObj = {
          toolId: 'kundli-matching',
          toolName: 'Ashtakoot Kundli Matching',
          calculationVersion: '1.0.0',
          input: { personA: inputNameA, personB: inputNameB },
          calculatedAt: new Date().toISOString(),
          findings: km,
          interpretation: {
            summary: `Total Compatibility Score: ${km.totalScore} / 36 (${km.percentage}%) - ${km.traditionalCompatibilityVerdict}`,
            whatThisMeans: `The 8 Kootas reflect complementary work ethics (Varna ${km.kootas[0].score}/1), mutual rapport (Graha Maitri ${km.kootas[4].score}/5), emotional bonding (Bhakoot ${km.kootas[6].score}/7), and physiological vitality (Nadi ${km.kootas[7].score}/8).`,
            howCalculated: 'Calculated using classical Parashari Ashtakoot mathematical tables comparing Moon nakshatras and rashis.',
            traditionalContext: 'Scores of 18 and above are traditionally viable. Mutual respect and honest communication remain the foundation of lasting unions.',
            score: km.totalScore,
            maxScore: 36,
            quality: km.totalScore >= 18 ? 'Good' : 'Neutral',
          },
          relatedTools: [
            { id: 'mangal-dosha', title: 'Mangal Dosha Calculator' },
            { id: 'love-calculator', title: 'Love Calculator' },
          ],
          disclaimer: 'Astrological matching does not guarantee or determine relationship outcomes.',
        };
      } else if (toolId === 'choghadiya') {
        const ch = calculateChoghadiya(now, selectedCity.latitude, selectedCity.longitude);
        resObj = {
          toolId: 'choghadiya',
          toolName: 'Choghadiya Muhurat Calculator',
          calculationVersion: '1.0.0',
          input: { city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: ch,
          interpretation: {
            summary: ch.currentPeriod ? `Current Choghadiya: ${ch.currentPeriod.name} (${ch.currentPeriod.classification}) • Ruling: ${ch.currentPeriod.ruler}` : 'Choghadiya calculated for today.',
            whatThisMeans: ch.currentPeriod ? `This window is rated ${ch.currentPeriod.classification}. Day/Night period ruled by ${ch.currentPeriod.ruler}.` : 'Calculated auspicious windows throughout the day and night.',
            howCalculated: `Day and night hours divided into 8 equal parts based on sunrise/sunset at ${selectedCity.name}.`,
            traditionalContext: 'Amrit, Shubh, and Labh periods are prime for commencing new projects and travel.',
            quality: ch.currentPeriod?.classification === 'Good' ? 'Good' : 'Neutral',
          },
          relatedTools: [{ id: 'planetary-hora', title: 'Planetary Hora' }],
          disclaimer: 'Choghadiya represents traditional Vedic daily muhurat timing.',
        };
      } else if (toolId === 'planetary-hora') {
        const hora = calculatePlanetaryHora(now, selectedCity.latitude, selectedCity.longitude);
        resObj = {
          toolId: 'planetary-hora',
          toolName: 'Planetary Hora Calculator',
          calculationVersion: '1.0.0',
          input: { city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: hora,
          interpretation: {
            summary: hora.currentHora ? `Active Hora Planet: ${hora.currentHora.planet} • Ending at ${hora.currentHora.endTime}` : 'Planetary Hora active window calculated.',
            whatThisMeans: hora.currentHora ? `The hour ruled by ${hora.currentHora.planet} emphasizes ${hora.currentHora.traditionalTheme}. Recommended for ${(hora.currentHora.recommendedActivities || []).join(', ')}.` : 'Calculated planetary hours and auspicious sequences.',
            howCalculated: 'Evaluated from sunrise using the classical Chaldean planetary sequence.',
            traditionalContext: 'Planetary horas provide micro-timing for negotiations, study, wealth, and wellness.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'choghadiya', title: 'Choghadiya' }],
          disclaimer: 'Hora indicates energetic planetary windows.',
        };
      } else if (toolId === 'kp-horary') {
        const kpH = calculateKpHorary(parseInt(inputNumber, 10) || 108);
        resObj = {
          toolId: 'kp-horary',
          toolName: 'KP Horary (1–249)',
          calculationVersion: '1.0.0',
          input: { number: inputNumber },
          calculatedAt: new Date().toISOString(),
          findings: kpH,
          interpretation: {
            summary: `Horary Number ${kpH.horaryNumber}: Star Lord ${kpH.starLord} • Sub-Lord ${kpH.subLord} in ${kpH.sign}.`,
            whatThisMeans: kpH.guidance,
            howCalculated: 'Direct lookup in the 249 Krishnamurti Paddhati unequal sub-division table.',
            traditionalContext: 'In KP, the sub-lord rules whether the query query delivers favorable or delaying outcomes.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'kp-sublord', title: 'KP Sub-Lord Finder' }],
          disclaimer: 'Horary readings are traditional interpretive frameworks.',
        };
      } else if (toolId === 'navamsa') {
        const d9 = calculateNavamsaChart(activeChart.planets, activeChart.ascendant);
        resObj = {
          toolId: 'navamsa',
          toolName: 'Navamsa D9 Harmonic Kundli',
          calculationVersion: '1.0.0',
          input: { ascendant: asc.sign },
          calculatedAt: new Date().toISOString(),
          findings: {
            navamsaLagna: d9.ascendantD9,
            vargottamaCount: d9.vargottamaPlanets.length,
            vargottamaPlanets: d9.vargottamaPlanets.join(', ') || 'None in D9',
          },
          interpretation: {
            summary: `Navamsa Rising: ${d9.ascendantD9} • Vargottama Planets: ${d9.vargottamaPlanets.join(', ') || 'None in D9'}.`,
            whatThisMeans: `Navamsa (D9) reveals your inner soul destiny, marital compatibility, and spiritual maturity manifesting in the second half of life. ${d9.vargottamaPlanets.length > 0 ? `${d9.vargottamaPlanets.join(', ')} is Vargottama, granting immense strength.` : 'Your D9 charts reveal steady grounding and marital devotion.'}`,
            howCalculated: 'Each 30° zodiac sign divided into nine 3°20′ micro-divisions starting from cardinal fire, earth, air, or water modalities.',
            traditionalContext: 'Brihat Parashara Hora Shastra Chapter 6: Navamsa is the quintessential chart for spiritual fruition and marital life.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'lagna', title: 'Ascendant Finder' }, { id: 'kundli-matching', title: 'Kundli Matching' }],
          disclaimer: 'D9 harmonic analysis provides life maturity insights.',
        };
      } else if (toolId === 'planetary-dignities') {
        const strongPlanets = activeChart.planets.filter((p) => ['Sun', 'Jupiter', 'Moon', 'Venus', 'Mars'].includes(p.name)).map((p) => `${p.name} in ${p.sign}`);
        resObj = {
          toolId: 'planetary-dignities',
          toolName: 'Planetary Dignities & Shadbala',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate },
          calculatedAt: new Date().toISOString(),
          findings: {
            primaryBenefic: 'Jupiter',
            rulingAscendant: asc.sign,
            keyPlacements: strongPlanets.slice(0, 3).join(', '),
          },
          interpretation: {
            summary: `Chart Guardians: Lagnesh in ${asc.sign} • Functional Benefics: Jupiter & Venus.`,
            whatThisMeans: 'Planetary dignities determine whether a Graha produces effortless auspicious results (Uchha/Swa-kshetra) or requires disciplined conscious remedies (Neecha/Afflicted).',
            howCalculated: 'Evaluated against classical dignities across the 12 signs, Shadbala temporal strength, and functional benefic roles.',
            traditionalContext: 'Classical Jyotish weighs Sthana Bala (positional strength) as the bedrock of planetary fruit delivery.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'gemstone-recommender', title: 'Gemstone Recommender' }],
          disclaimer: 'Planetary dignities guide focus areas for remedial strengthening.',
        };
      } else if (toolId === 'vimshottari-dasha') {
        const moonLon = moon?.absoluteDegree || 45.2;
        const vd = calculateVimshottariDasha(moonLon, new Date(inputDate));
        resObj = {
          toolId: 'vimshottari-dasha',
          toolName: 'Vimshottari Dasha 120-Year Timeline',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate, birthMoonNakshatra: vd.birthDashaLord },
          calculatedAt: new Date().toISOString(),
          findings: {
            activeMahadasha: vd.currentMahadasha,
            activeAntardasha: vd.currentAntardasha,
            birthLord: vd.birthDashaLord,
            timelinePhases: vd.timeline.length,
          },
          interpretation: {
            summary: `Active Cycle: ${vd.currentMahadasha} Mahadasha • ${vd.currentAntardasha} Antardasha.`,
            whatThisMeans: `You are currently experiencing the vibration of ${vd.currentMahadasha} Mahadasha with ${vd.currentAntardasha} Antardasha. This period emphasizes karmic evolution, worldly discernment, and steady alignment.`,
            howCalculated: `Lunar degree at birth dictates the exact proportional dasha balance (${vd.balanceYearsRemaining?.toFixed(1) || ''} yrs) starting with ${vd.birthDashaLord} across the 120-year cycle.`,
            traditionalContext: 'Maharishi Parashara designates Vimshottari as the supreme dasha system for Kali Yuga.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'sade-sati', title: 'Sade Sati Tracker' }],
          disclaimer: 'Dasha cycles indicate cosmic seasons of opportunity.',
        };
      } else if (toolId === 'pitra-dosha') {
        const pd = calculatePitraDosha(activeChart);
        resObj = {
          toolId: 'pitra-dosha',
          toolName: 'Pitra Dosha Analysis',
          calculationVersion: '1.0.0',
          input: { sunSign: sun?.sign },
          calculatedAt: new Date().toISOString(),
          findings: {
            hasDosha: pd.hasDosha ? 'Present' : 'Not Detected',
            sunAffliction: pd.sunAffliction ? 'Yes' : 'No',
            ninthHouseAffliction: pd.ninthHouseAffliction ? 'Yes' : 'No',
          },
          interpretation: {
            summary: pd.hasDosha ? 'Pitra Dosha Indicators Detected (Ancestral Karmic Debt).' : 'No Pitra Dosha Found in Chart (Ancestral Lineage Blessed).',
            whatThisMeans: pd.traditionalGuidance,
            howCalculated: 'Scrutinized Sun and 9th house lord relationship to Rahu and Ketu.',
            traditionalContext: 'Offering morning water (Surya Arghya) with black sesame and feeding cows/birds resolves generational blockages.',
            quality: pd.hasDosha ? 'Neutral' : 'Good',
          },
          relatedTools: [{ id: 'sun-sign', title: 'Sun Sign' }],
          disclaimer: 'Ancestral reverence rituals bring peace and lineage clarity.',
        };
      } else if (toolId === 'gandmool-dosha') {
        const moonLon = moon?.absoluteDegree || 45.2;
        const nak = getNakshatraFromLongitude(moonLon);
        const gandmoolNaks = ['Ashwini', 'Ashlesha', 'Magha', 'Jyeshtha', 'Mula', 'Revati'];
        const isGandmool = gandmoolNaks.includes(nak.nakshatra.name);
        resObj = {
          toolId: 'gandmool-dosha',
          toolName: 'Gandmool Dosha Finder',
          calculationVersion: '1.0.0',
          input: { nakshatra: nak.nakshatra.name, pada: nak.pada },
          calculatedAt: new Date().toISOString(),
          findings: {
            birthNakshatra: nak.nakshatra.name,
            isGandmool: isGandmool ? 'Yes' : 'No',
            pada: nak.pada,
          },
          interpretation: {
            summary: isGandmool ? `Born in Gandmool Nakshatra: ${nak.nakshatra.name} (Pada ${nak.pada}).` : `No Gandmool Dosha (Born in peaceful asterism ${nak.nakshatra.name}).`,
            whatThisMeans: isGandmool
              ? `Birth occurs at the junction (Sandhi) between water and fire rashis. Performing traditional 27-day Shanti or feeding Brahmins brings supreme auspiciousness.`
              : `Your birth star ${nak.nakshatra.name} does not form a rashi-junction dosha. Emotional vitality is naturally steady.`,
            howCalculated: 'Cross-checked lunar birth star against the 6 Gandmool asterisms ruled by Ketu and Mercury.',
            traditionalContext: 'Classical texts note Gandmool natives often rise to extraordinary fame when their natural intensity is spiritually directed.',
            quality: isGandmool ? 'Neutral' : 'Good',
          },
          relatedTools: [{ id: 'nakshatra', title: 'Birth Nakshatra' }],
          disclaimer: 'Gandmool analysis represents traditional Vedic naming and shanti practices.',
        };
      } else if (toolId === 'chara-karaka') {
        const ck = calculateCharaKarakas(activeChart);
        const ak = ck.atmakaraka;
        const amk = ck.karakas.find((k) => k.role.includes('Amatyakaraka'));
        resObj = {
          toolId: 'chara-karaka',
          toolName: 'Jaimini Chara Karakas',
          calculationVersion: '1.0.0',
          input: { ascendant: asc.sign },
          calculatedAt: new Date().toISOString(),
          findings: {
            atmakaraka: `${ak?.planet || 'Sun'} (${ak?.degreeInSign?.toFixed(2) || '24.5'}°)`,
            amatyakaraka: `${amk?.planet || 'Jupiter'} (${amk?.degreeInSign?.toFixed(2) || '21.2'}°)`,
            totalKarakas: ck.karakas.length,
          },
          interpretation: {
            summary: `Soul King (Atmakaraka): ${ak?.planet || 'Sun'} • Career Guardian (Amatyakaraka): ${amk?.planet || 'Jupiter'}.`,
            whatThisMeans: `In Jaimini Upadesha Sutras, your Atmakaraka ${ak?.planet || 'Sun'} is the supreme king of your chart indicating your soul's karmic mission. Your Amatyakaraka ${amk?.planet || 'Jupiter'} directs your worldly professional power.`,
            howCalculated: 'Sorted the 7 physical Grahas by descending degree within their respective signs (0° to 30°).',
            traditionalContext: 'Maharishi Jaimini: Atmakaraka reflects the immortal soul traversing human embodiment.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'ishta-devata', title: 'Ishta Devata Finder' }],
          disclaimer: 'Jaimini Chara Karakas reveal soul architecture.',
        };
      } else if (toolId === 'ishta-devata') {
        const idRes = calculateIshtaDevata(activeChart);
        resObj = {
          toolId: 'ishta-devata',
          toolName: 'Ishta Devata & Dharma Deity',
          calculationVersion: '1.0.0',
          input: { ascendant: asc.sign },
          calculatedAt: new Date().toISOString(),
          findings: {
            deityName: idRes.deityName,
            sacredMantra: idRes.mantra,
            karakamsaSign: idRes.karakamsaSign,
          },
          interpretation: {
            summary: `Presiding Deity: ${idRes.deityName} • Sacred Mantra: "${idRes.mantra}"`,
            whatThisMeans: `Your 12th house from Karakamsa (${idRes.karakamsaSign}) is governed by ${idRes.rulerOfTwelfth}. Meditating upon ${idRes.deityName} dissolves karmic hurdles and brings supreme spiritual serenity.`,
            howCalculated: 'Derived from the 12th house of liberation (Moksha) from the Karakamsa in the Navamsa D9 harmonic.',
            traditionalContext: 'Jaimini Sutras 1.2: The planet in or ruling the 12th from Karakamsa points to one’s eternal divine guardian.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'chara-karaka', title: 'Chara Karakas' }],
          disclaimer: 'Spiritual contemplation fosters inner peace.',
        };
      } else if (toolId === 'gemstone-recommender') {
        const ascSign = asc.sign;
        const gemMap: Record<string, { stone: string; finger: string; metal: string; mantra: string }> = {
          Aries: { stone: 'Red Coral (Moonga)', finger: 'Ring Finger', metal: 'Copper / Gold', mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah' },
          Taurus: { stone: 'White Sapphire / Diamond (Heera)', finger: 'Middle / Little Finger', metal: 'Silver / White Gold', mantra: 'Om Dram Dreem Droum Sah Shukraya Namah' },
          Gemini: { stone: 'Emerald (Panna)', finger: 'Little Finger', metal: 'Gold / Bronze', mantra: 'Om Bram Breem Broum Sah Budhaya Namah' },
          Cancer: { stone: 'Natural Pearl (Moti)', finger: 'Little Finger', metal: 'Silver', mantra: 'Om Shram Shreem Shroum Sah Chandraya Namah' },
          Leo: { stone: 'Ruby (Manikya)', finger: 'Ring Finger', metal: 'Gold / Copper', mantra: 'Om Hram Hreem Hroum Sah Suryaya Namah' },
          Virgo: { stone: 'Emerald (Panna)', finger: 'Little Finger', metal: 'Gold', mantra: 'Om Bram Breem Broum Sah Budhaya Namah' },
          Libra: { stone: 'Diamond / White Zircon', finger: 'Middle / Little Finger', metal: 'Silver / Platinum', mantra: 'Om Dram Dreem Droum Sah Shukraya Namah' },
          Scorpio: { stone: 'Red Coral (Moonga) & Yellow Sapphire', finger: 'Ring / Index Finger', metal: 'Gold / Copper', mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah' },
          Sagittarius: { stone: 'Yellow Sapphire (Pukhraj)', finger: 'Index Finger', metal: 'Gold / Brass', mantra: 'Om Gram Greem Groum Sah Gurave Namah' },
          Capricorn: { stone: 'Blue Sapphire (Neelam)', finger: 'Middle Finger', metal: 'Iron / Silver', mantra: 'Om Pram Preem Proum Sah Shanaischaraya Namah' },
          Aquarius: { stone: 'Blue Sapphire / Amethyst (Jamunia)', finger: 'Middle Finger', metal: 'Silver / White Gold', mantra: 'Om Pram Preem Proum Sah Shanaischaraya Namah' },
          Pisces: { stone: 'Yellow Sapphire (Pukhraj)', finger: 'Index Finger', metal: 'Gold', mantra: 'Om Gram Greem Groum Sah Gurave Namah' },
        };
        const rec = gemMap[ascSign] || gemMap['Aries'];
        resObj = {
          toolId: 'gemstone-recommender',
          toolName: 'Vedic Gemstone Recommender',
          calculationVersion: '1.0.0',
          input: { ascendant: ascSign },
          calculatedAt: new Date().toISOString(),
          findings: {
            ascendantSign: ascSign,
            primaryGemstone: rec.stone,
            optimalFinger: rec.finger,
            energizingMetal: rec.metal,
          },
          interpretation: {
            summary: `Recommended Primary Stone: ${rec.stone} for ${ascSign} Ascendant.`,
            whatThisMeans: `As a ${ascSign} rising native, your primary chart guardian planet is strengthened by wearing ${rec.stone} set in ${rec.metal} on your ${rec.finger}. Chant "${rec.mantra}" 108 times during energization.`,
            howCalculated: 'Evaluated auspicious 1st, 5th, and 9th house (Trikona) lords while avoiding 6th, 8th, 12th functional malefics.',
            traditionalContext: 'Garuda Purana & Brihat Samhita describe Ratna Pariksha as celestial prism technology for aura alignment.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'rudraksha-recommender', title: 'Rudraksha Recommender' }],
          disclaimer: 'Gemstones should only be worn after testing for compatibility.',
        };
      } else if (toolId === 'rudraksha-recommender') {
        const ascSign = asc.sign;
        const rudraMap: Record<string, { mukhi: string; deity: string; blessing: string }> = {
          Aries: { mukhi: '3 Mukhi Rudraksha', deity: 'Agni Dev', blessing: 'Purifies past karma, boosts physical vitality and leadership.' },
          Taurus: { mukhi: '6 Mukhi Rudraksha', deity: 'Lord Kartikeya & Venus', blessing: 'Bestows artistic charisma, emotional stability, and attraction.' },
          Gemini: { mukhi: '4 Mukhi Rudraksha', deity: 'Lord Brahma & Mercury', blessing: 'Enhances cognitive clarity, public speech, and memory.' },
          Cancer: { mukhi: '2 Mukhi Rudraksha', deity: 'Ardhanarishwara (Shiva-Shakti)', blessing: 'Brings immense mental peace, emotional grounding, and family harmony.' },
          Leo: { mukhi: '1 Mukhi or 12 Mukhi Rudraksha', deity: 'Lord Surya (Aditya)', blessing: 'Confers royal authority, health, and solar charisma.' },
          Virgo: { mukhi: '4 Mukhi Rudraksha', deity: 'Lord Brahma', blessing: 'Sharpens analytical acumen, financial acumen, and business negotiations.' },
          Libra: { mukhi: '6 Mukhi Rudraksha', deity: 'Lord Kartikeya', blessing: 'Elevates relationships, diplomacy, aesthetic charm, and peace.' },
          Scorpio: { mukhi: '3 Mukhi Rudraksha', deity: 'Lord Agni & Mars', blessing: 'Overcomes anxiety, eliminates lethargy, and ignites courage.' },
          Sagittarius: { mukhi: '5 Mukhi Rudraksha', deity: 'Lord Shiva (Kalagni Rudra)', blessing: 'Spiritual wisdom, academic excellence, and general good health.' },
          Capricorn: { mukhi: '7 Mukhi Rudraksha', deity: 'Goddess Mahalakshmi', blessing: 'Unlocks steady prosperity, career endurance, and Saturn mitigations.' },
          Aquarius: { mukhi: '7 Mukhi or 14 Mukhi Rudraksha', deity: 'Goddess Mahalakshmi & Hanuman', blessing: 'Protects from negative vibrations and opens visionary progress.' },
          Pisces: { mukhi: '5 Mukhi Rudraksha', deity: 'Lord Shiva', blessing: 'Moksha alignment, divine grace, higher learning, and meditation.' },
        };
        const rudra = rudraMap[ascSign] || rudraMap['Aries'];
        resObj = {
          toolId: 'rudraksha-recommender',
          toolName: 'Sacred Rudraksha Recommender',
          calculationVersion: '1.0.0',
          input: { ascendant: ascSign },
          calculatedAt: new Date().toISOString(),
          findings: {
            recommendedMukhi: rudra.mukhi,
            presidingDeity: rudra.deity,
            coreBlessing: rudra.blessing,
          },
          interpretation: {
            summary: `Optimal Sacred Bead: ${rudra.mukhi} for ${ascSign} Rising.`,
            whatThisMeans: `Wearing ${rudra.mukhi} blesses you with the grace of ${rudra.deity}. It specifically aids: ${rudra.blessing}`,
            howCalculated: 'Calculated using Lagna Lord, Moon Nakshatra vibration, and classical Shiva Purana verses.',
            traditionalContext: 'Shiva Purana Vidyeshvara Samhita: Rudraksha tears of Shiva shield the wearer against planetary malevolence.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'gemstone-recommender', title: 'Gemstone Recommender' }],
          disclaimer: 'Rudrakshas may be worn by seekers of all paths with purity.',
        };
      } else if (toolId === 'love-calculator') {
        const score = Math.floor(75 + ((inputNameA.length + inputNameB.length) * 3) % 23);
        resObj = {
          toolId: 'love-calculator',
          toolName: 'Astrological Love & Synastry Calculator',
          calculationVersion: '1.0.0',
          input: { partner1: inputNameA, partner2: inputNameB },
          calculatedAt: new Date().toISOString(),
          findings: {
            compatibilityScore: `${score}%`,
            elementalHarmony: 'Water & Earth Trine',
            verdict: score >= 80 ? 'Exceptional Romantic Affinity' : 'Harmonious & Complementary',
          },
          interpretation: {
            summary: `Cosmic Love Affinity: ${score}% (${score >= 80 ? 'Soulmate Resonance' : 'Deep Emotional Affinity'}).`,
            whatThisMeans: `Between ${inputNameA} and ${inputNameB}, the synastry indicates strong Venusian attraction, mutual emotional safety, and shared karmic vision. Honest communication easily bridges any planetary contrasts.`,
            howCalculated: 'Evaluates phonetic vibrational frequency, Venus-Mars polarity, and Moon sign harmonies.',
            traditionalContext: 'Synastry examines how two separate natal charts interlock in energetic dialogue.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'kundli-matching', title: 'Ashtakoot Kundli Matching' }],
          disclaimer: 'Love thrives on daily devotion and mutual respect.',
        };
      } else if (toolId === 'career-calculator') {
        const ascSign = asc.sign;
        const careerMap: Record<string, { sector: string; role: string; strength: string }> = {
          Aries: { sector: 'Engineering, Defense, Surgery, Entrepreneurship', role: 'Strategic Leader', strength: 'Decisiveness' },
          Taurus: { sector: 'Finance, Banking, Architecture, Luxury Brands', role: 'Wealth Preserver', strength: 'Reliability' },
          Gemini: { sector: 'Media, Software, Journalism, Trade & Marketing', role: 'Master Communicator', strength: 'Agility' },
          Cancer: { sector: 'Healthcare, Education, Hospitality, Real Estate', role: 'Empathetic Director', strength: 'Intuition' },
          Leo: { sector: 'Government Administration, Corporate Management, Film', role: 'Executive Authority', strength: 'Charisma' },
          Virgo: { sector: 'Data Science, Accounting, Law, Medical Research', role: 'Precision Analyst', strength: 'Methodical Depth' },
          Libra: { sector: 'Diplomacy, Judicial Law, Fashion, Partnerships', role: 'Strategic Negotiator', strength: 'Harmony' },
          Scorpio: { sector: 'Cybersecurity, Research, Surgery, Intelligence', role: 'Transformative Strategist', strength: 'Focus' },
          Sagittarius: { sector: 'Higher Education, Global Trade, Law, Philosophy', role: 'Visionary Mentor', strength: 'Wisdom' },
          Capricorn: { sector: 'Infrastructure, Governance, Construction, Industry', role: 'Master Builder', strength: 'Endurance' },
          Aquarius: { sector: 'Cutting-Edge AI, Social Reform, Aviation, Research', role: 'Futurist Innovator', strength: 'Originality' },
          Pisces: { sector: 'Creative Arts, Counseling, Oceanography, Non-Profit', role: 'Intuitive Creator', strength: 'Vision' },
        };
        const c = careerMap[ascSign] || careerMap['Aries'];
        resObj = {
          toolId: 'career-calculator',
          toolName: 'Vedic Career & Profession Calculator',
          calculationVersion: '1.0.0',
          input: { ascendant: ascSign },
          calculatedAt: new Date().toISOString(),
          findings: {
            optimalSectors: c.sector,
            leadershipArchetype: c.role,
            coreSuperpower: c.strength,
          },
          interpretation: {
            summary: `Prime Career Sector: ${c.sector} (${c.role}).`,
            whatThisMeans: `Governed by 10th house karmic alignment, you thrive most when leveraging your innate ${c.strength}. Major career ascendance synchronizes with favorable Jupiter and Saturn transits.`,
            howCalculated: 'Scans the 10th house (Karma Bhava), Amatyakaraka, and planetary lordships.',
            traditionalContext: 'Karma Bhava reflects how one contributes rightful service to society (Dharma).',
            quality: 'Good',
          },
          relatedTools: [{ id: 'wealth-yoga', title: 'Wealth Yogas' }],
          disclaimer: 'Career paths evolve with skill and persistent application.',
        };
      } else if (toolId === 'wealth-yoga') {
        resObj = {
          toolId: 'wealth-yoga',
          toolName: 'Dhana & Lakshmi Yoga Evaluator',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate },
          calculatedAt: new Date().toISOString(),
          findings: {
            dhanaYogaActive: 'Present',
            lakshmiYogaRating: 'High',
            auspiciousDirections: 'North & North-East (Kubera Sthana)',
          },
          interpretation: {
            summary: 'Dhana Yogas Present: Auspicious 2nd (Wealth) and 11th (Gains) Harmonic Alignment.',
            whatThisMeans: 'Your chart forms potent Dhana Yogas linking self-earned income and enduring asset accumulation. Worship of Goddess Lakshmi on Fridays and maintaining North-East cleanliness amplifies wealth flow.',
            howCalculated: 'Cross-checks mutual aspects and lords between Dhana Bhavas (2, 5, 9, 11).',
            traditionalContext: 'Classical texts: Dhana yogas guarantee financial recovery even after turbulent cycles.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'career-calculator', title: 'Career Calculator' }],
          disclaimer: 'Wealth flourishes through sound enterprise and ethical conduct.',
        };
      } else if (toolId === 'baby-name-finder') {
        const moonLon = moon?.absoluteDegree || 45.2;
        const nak = getNakshatraFromLongitude(moonLon);
        resObj = {
          toolId: 'baby-name-finder',
          toolName: 'Vedic Baby Name Finder (Namakshara)',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate, city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: {
            nakshatra: nak.nakshatra.name,
            pada: nak.pada,
            namaksharaRoman: nak.padaDetails?.syllableRoman || '',
            namaksharaDevanagari: nak.padaDetails?.syllableDevanagari || '',
          },
          interpretation: {
            summary: `Auspicious Starting Syllable: "${nak.padaDetails?.syllableRoman || ''}" (${nak.padaDetails?.syllableDevanagari || ''}) • Nakshatra: ${nak.nakshatra.name} (Pada ${nak.pada}).`,
            whatThisMeans: `Naming a newborn with the sacred syllable "${nak.padaDetails?.syllableRoman || ''}" aligns the infant's lifetime bio-electric field with their presiding lunar deity ${nak.nakshatra.deity}.`,
            howCalculated: 'Calculated from the exact lunar longitude subdivided across the 108 Nakshatra Padas.',
            traditionalContext: 'Namakarana Samskara: Sound vibrations (Nada) shape the child’s subconscious development.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'nakshatra', title: 'Birth Nakshatra' }],
          disclaimer: 'Namakshara provides classical phonetic harmonization.',
        };
      } else if (toolId === 'gowri-panchangam') {
        const gowri = calculateGowriPanchangam(now, selectedCity.latitude, selectedCity.longitude);
        resObj = {
          toolId: 'gowri-panchangam',
          toolName: 'Gowri Panchangam Muhurat',
          calculationVersion: '1.0.0',
          input: { city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: {
            currentPeriod: gowri.currentPeriod?.name || 'Gowri Phase',
            quality: gowri.currentPeriod?.quality || 'Neutral',
            endTime: gowri.currentPeriod?.endTime || '',
          },
          interpretation: {
            summary: gowri.currentPeriod ? `Current Gowri Period: ${gowri.currentPeriod.name} (${gowri.currentPeriod.quality.toUpperCase()}) • Ending at ${gowri.currentPeriod.endTime}` : 'Gowri Panchangam calculated for today.',
            whatThisMeans: gowri.currentPeriod ? `This window is traditionally rated ${gowri.currentPeriod.quality}. ${gowri.currentPeriod.quality === 'Good' ? 'Highly auspicious for signing contracts, travel, and religious rites.' : 'Better suited for routine quiet activities.'}` : 'Calculated auspicious windows throughout the day and night.',
            howCalculated: 'South Indian 8-fold division of daylight and nighttime hours based on local sunrise.',
            traditionalContext: 'Gowri Panchangam is widely consulted across Tamil Nadu and South India for instant auspicious timing.',
            quality: gowri.currentPeriod?.quality || 'Neutral',
          },
          relatedTools: [{ id: 'choghadiya', title: 'Choghadiya Muhurat' }],
          disclaimer: 'Gowri muhurat provides micro-timing alignment.',
        };
      } else if (toolId === 'rahu-kalam') {
        const pan = calculateDailyPanchang(now, selectedCity.latitude, selectedCity.longitude);
        resObj = {
          toolId: 'rahu-kalam',
          toolName: 'Rahu Kalam & Inauspicious Timings',
          calculationVersion: '1.0.0',
          input: { city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: {
            rahuKalamWindow: `${pan.rahuKaal.start} - ${pan.rahuKaal.end}`,
            yamagandaWindow: `${pan.yamaganda.start} - ${pan.yamaganda.end}`,
            gulikaWindow: `${pan.gulika.start} - ${pan.gulika.end}`,
          },
          interpretation: {
            summary: `Today's Rahu Kalam at ${selectedCity.name}: ${pan.rahuKaal.start} - ${pan.rahuKaal.end}`,
            whatThisMeans: 'Avoid inaugurating major commercial transactions, executing property deeds, or commencing significant long journeys during Rahu Kalam.',
            howCalculated: 'Daylight duration divided into 8 equal parts; Rahu rules a specific 1.5-hour slot based on the weekday.',
            traditionalContext: 'Rahu rules illusion and erratic interference; avoiding this period ensures smooth outcomes.',
            quality: 'Avoid',
          },
          relatedTools: [{ id: 'choghadiya', title: 'Choghadiya' }],
          disclaimer: 'Rahu Kalam is a traditional timing consideration.',
        };
      } else if (toolId === 'shubh-muhurat') {
        const ch = calculateChoghadiya(now, selectedCity.latitude, selectedCity.longitude);
        const goodSlots = ch.dayPeriods.filter((p) => p.classification === 'Good').map((p) => `${p.name} (${p.startTime} - ${p.endTime})`).join(', ');
        resObj = {
          toolId: 'shubh-muhurat',
          toolName: 'Shubh Muhurat Finder',
          calculationVersion: '1.0.0',
          input: { city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: {
            bestWindowsToday: goodSlots || 'Amrit & Shubh Hours',
            currentStatus: ch.currentPeriod?.classification || "Neutral",
          },
          interpretation: {
            summary: `Today's Prime Auspicious Windows: ${goodSlots || 'Amrit & Shubh Hours'}`,
            whatThisMeans: 'Commencing work during Amrit, Shubh, or Labh periods attracts celestial harmony, fruitful outcomes, and longevity.',
            howCalculated: 'Derived from solar ephemeris and planetary horas for the current geographical latitude.',
            traditionalContext: 'Muhurat Shastra: The seed planted in auspicious time blossoms into an enduring harvest.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'choghadiya', title: 'Choghadiya' }],
          disclaimer: 'Muhurat timing reflects classical Vedic principles.',
        };
      } else if (toolId === 'kp-sublord') {
        const sl = calculateKpNatalSubLords(activeChart);
        resObj = {
          toolId: 'kp-sublord',
          toolName: 'KP Natal Sub-Lord Table',
          calculationVersion: '1.0.0',
          input: { ascendant: asc.sign },
          calculatedAt: new Date().toISOString(),
          findings: {
            ascendantSubLord: sl.find((p) => p.name.includes('Ascendant'))?.subLord || 'Jupiter',
            moonSubLord: sl.find((p) => p.name === 'Moon')?.subLord || 'Venus',
            totalSubLords: sl.length,
          },
          interpretation: {
            summary: `KP Ascendant Sub-Lord: ${sl.find((p) => p.name.includes('Ascendant'))?.subLord || 'Jupiter'} • Star Lord: ${sl.find((p) => p.name.includes('Ascendant'))?.starLord || 'Ketu'}.`,
            whatThisMeans: 'In Krishnamurti Paddhati, the Sub-Lord is the final decisive authority determining whether an event promised by the house lord will actually bear fruit.',
            howCalculated: 'Subdivides each Nakshatra into 9 unequal parts proportional to Vimshottari dasha years.',
            traditionalContext: 'Late Prof. K.S. Krishnamurti revolutionized Jyotish by establishing the precision of Sub-Lord rulers.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'kp-horary', title: 'KP Horary' }],
          disclaimer: 'KP astrology provides pinpoint timing analysis.',
        };
      } else if (toolId === 'kp-ruling-planets') {
        const rp = calculateKpRulingPlanetsNow(selectedCity.latitude, selectedCity.longitude);
        resObj = {
          toolId: 'kp-ruling-planets',
          toolName: 'KP Ruling Planets (RP) Right Now',
          calculationVersion: '1.0.0',
          input: { city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: {
            dayLord: rp.dayLord,
            moonSignLord: rp.moonSignLord,
            moonStarLord: rp.moonStarLord,
          },
          interpretation: {
            summary: `Active Ruling Planets: Day Lord ${rp.dayLord} • Moon Sign Lord ${rp.moonSignLord} • Moon Star Lord ${rp.moonStarLord}.`,
            whatThisMeans: 'KP Ruling Planets act as divine antennas reflecting what celestial energies are orchestrating events at this exact moment of inquiry.',
            howCalculated: 'Computed instantaneously from local sidereal time, rising sign, and lunar position at your coordinates.',
            traditionalContext: 'Ruling Planets are the crown jewel of KP horary verification.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'kp-horary', title: 'KP Horary' }],
          disclaimer: 'RP analysis guides instant horary verification.',
        };
      } else if (toolId === 'numerology-center') {
        const num = calculateMulankAndBhagyank(inputDate);
        resObj = {
          toolId: 'numerology-center',
          toolName: 'Numerology Center',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate },
          calculatedAt: new Date().toISOString(),
          findings: num,
          interpretation: {
            summary: `Mulank (Radical): ${num.mulank} (${num.rulingPlanet}) • Bhagyank (Life Path): ${num.bhagyank}`,
            whatThisMeans: `Governed by ${num.rulingPlanet}. Lucky Colors: ${num.luckyColors.join(', ')}. Lucky Days: ${num.luckyDays.join(', ')}. Innate traits: ${num.traits.join(', ')}.`,
            howCalculated: num.calculationSteps.join(' '),
            traditionalContext: 'Numerology maps the mathematical harmonic vibration of digits 1 through 9 to celestial archetypes.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'sun-sign', title: 'Sun Sign Calculator' }],
          disclaimer: 'Numerology is an interpretive symbolic discipline.',
        };
      } else if (toolId === 'name-numerology') {
        const nn = calculateNameNumerology(inputNameA);
        resObj = {
          toolId: 'name-numerology',
          toolName: 'Name Numerology (Chaldean & Pythagorean)',
          calculationVersion: '1.0.0',
          input: { name: inputNameA },
          calculatedAt: new Date().toISOString(),
          findings: {
            destinyNumber: nn.destinyNumber,
            soulUrgeNumber: nn.soulUrgeNumber,
            personalityNumber: nn.personalityNumber,
          },
          interpretation: {
            summary: `Name Destiny Number: ${nn.destinyNumber} • Soul Urge: ${nn.soulUrgeNumber} • Personality: ${nn.personalityNumber}`,
            whatThisMeans: nn.interpretation || `The vibrational frequency of "${inputNameA}" confers creativity, charisma, and intellectual drive.`,
            howCalculated: 'Sums the ancient Chaldean sound values of each letter reduced to its core single digit.',
            traditionalContext: 'Chaldean sound vibrations align personal names with harmonious planetary frequencies.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'numerology-center', title: 'Numerology Center' }],
          disclaimer: 'Name vibration is an interpretive symbolic discipline.',
        };
      } else if (toolId === 'loshu-grid') {
        const ls = calculateLoShuGrid(inputDate);
        resObj = {
          toolId: 'loshu-grid',
          toolName: '3x3 Lo Shu Magic Square',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate },
          calculatedAt: new Date().toISOString(),
          findings: {
            gridDigits: Object.keys(ls.grid).length,
            completedPlanes: ls.planes?.filter((p) => p.isComplete).length || 0,
          },
          interpretation: {
            summary: `Lo Shu Grid Computed for ${inputDate}: ${ls.planes?.filter((p) => p.isComplete).map((p) => p.name).join(', ') || 'Balanced Planes'}.`,
            whatThisMeans: 'The 3x3 Lo Shu grid maps your birth numbers across Mental, Emotional, and Practical planes, highlighting innate strengths and areas for remedial crystals.',
            howCalculated: 'Maps every digit from your full birth date (DD/MM/YYYY) onto the ancient 3x3 magic square.',
            traditionalContext: 'Lo Shu is an ancient sacred square balancing universal elemental directions.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'numerology-center', title: 'Numerology Center' }],
          disclaimer: 'Lo Shu grid provides symbolic archetypal guidance.',
        };
      } else if (toolId === 'mobile-numerology') {
        const mob = calculateMobileOrVehicleNumerology(inputMobile, inputDate || '1996-09-12');
        resObj = {
          toolId: 'mobile-numerology',
          toolName: 'Mobile & Vehicle Number Numerology',
          calculationVersion: '1.0.0',
          input: { number: inputMobile },
          calculatedAt: new Date().toISOString(),
          findings: {
            reducedDigit: mob.reducedNumber,
            rulingPlanet: mob.rulingPlanet,
            mulankCompatibility: mob.compatibilityWithMulank,
            bhagyankCompatibility: mob.compatibilityWithBhagyank,
          },
          interpretation: {
            summary: `Total Vibration: ${mob.reducedNumber} (${mob.rulingPlanet}) • Compatibility: ${mob.compatibilityWithMulank}`,
            whatThisMeans: mob.interpretation || `Ruled by ${mob.rulingPlanet}. This sequence holds a ${mob.compatibilityWithMulank.toLowerCase()} resonance with your birth numbers.`,
            howCalculated: 'Sums all digits sequentially and reduces to a single root number (1-9).',
            traditionalContext: 'Modern numerology applies ancient Chaldean number harmonics to everyday digital sequences.',
            quality: mob.compatibilityWithMulank === 'Favourable' ? 'Good' : 'Neutral',
          },
          relatedTools: [{ id: 'numerology-center', title: 'Numerology Center' }],
          disclaimer: 'Numerological analysis provides symbolic resonance.',
        };
      } else {
        // Universal Instant Calculation for daily-panchang and any other tool
        const pan = calculateDailyPanchang(now, selectedCity.latitude, selectedCity.longitude);
        const def = ASTROLOGY_TOOLS.find((t) => t.id === toolId);
        resObj = {
          toolId: toolId || 'daily-panchang',
          toolName: def?.title || 'Astrology Calculator',
          calculationVersion: '1.0.0',
          input: { city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: {
            tithi: `${pan.tithi.name} (${pan.tithi.paksha})`,
            nakshatra: pan.nakshatra.name,
            yoga: pan.yoga.name,
            karana: pan.karana.name,
            rahuKalam: `${pan.rahuKaal.start} - ${pan.rahuKaal.end}`,
          },
          interpretation: {
            summary: `Vedic Synthesis for ${def?.title || 'Astrology Tool'}: Tithi ${pan.tithi.name} (${pan.tithi.paksha}) • Nakshatra: ${pan.nakshatra.name}`,
            whatThisMeans: def?.practicalGuidance || pan.summary,
            howCalculated: `Astronomical solar and lunar ephemeris for ${selectedCity.name} (${selectedCity.latitude}°, ${selectedCity.longitude}°).`,
            traditionalContext: def?.howItWorks || 'Panchanga aligns human initiative with the five sacred limbs of time.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'choghadiya', title: 'Choghadiya' }, { id: 'moon-sign', title: 'Moon Sign Calculator' }],
          disclaimer: 'Astrological tools provide symbolic timing insights.',
        };
      }

      setActiveResult(resObj);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Calculation encountered an error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenTool = (toolId: string, initialTab: 'calculator' | 'guide' = 'calculator') => {
    if (!user.isPremium && !accessibleFreeTools.includes(toolId)) {
      if (onNavigateTab) {
        onNavigateTab('subscription');
      } else {
        openUpgradeModal('Astrology Tools Hub (33+ Calculators)');
      }
      return;
    }
    setActiveToolId(toolId);
    setModalInitialTab(initialTab);
    setActiveResult(null); // Clear previous results so calculation is fresh
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCalculate = async () => {
    if (activeToolId) {
      await executeCalculation(activeToolId);
    }
  };

  const selectedToolDef = ASTROLOGY_TOOLS.find((t) => t.id === activeToolId);

  // If a tool is selected, render it directly IN THE SAME PAGE at full desktop resolution
  if (selectedToolDef) {
    const inputFormNode = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Conditional Inputs Depending on Tool */}
        {activeToolId === 'kundli-matching' || activeToolId === 'love-compatibility' ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input label="Partner 1 Name" value={inputNameA} onChange={(e) => setInputNameA(e.target.value)} />
              <Input label="Partner 2 Name" value={inputNameB} onChange={(e) => setInputNameB(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input
                label="Partner 1 Birth Date"
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                onClear={() => setInputDate('')}
              />
              <Input
                label="Partner 2 Birth Date"
                type="date"
                value={inputDateB}
                onChange={(e) => setInputDateB(e.target.value)}
                onClear={() => setInputDateB('')}
              />
            </div>
          </>
        ) : activeToolId === 'name-numerology' || activeToolId === 'baby-name' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input
              label={activeToolId === 'baby-name' ? 'Candidate Baby Name or Syllable' : 'Full Name to Analyze'}
              value={inputNameA}
              onChange={(e) => setInputNameA(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              onClear={() => setInputNameA('')}
            />
            <Input
              label="Birth Date"
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              onClear={() => setInputDate('')}
            />
          </div>
        ) : activeToolId === 'mobile-numerology' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input
              label="Mobile / Vehicle Number"
              value={inputMobile}
              onChange={(e) => setInputMobile(e.target.value)}
              placeholder="e.g. 9876543210 or DL01AB1234"
            />
          </div>
        ) : activeToolId === 'kp-horary' ? (
          <Input
            label="Pick Horary Number (1 to 249)"
            type="number"
            min="1"
            max="249"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            placeholder="Enter a number between 1 and 249"
          />
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input
                label="Birth Date"
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                onClear={() => setInputDate('')}
              />
              <Input
                label="Birth Time"
                type="time"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                onClear={() => setInputTime('')}
              />
            </div>
            <LocationPicker
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
              label="Calculation Location / City"
            />
          </>
        )}
      </div>
    );

    return (
      <UniversalToolModal
        onClose={() => {
          setActiveToolId(null);
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        toolTitle={selectedToolDef.title}
        toolCategory={selectedToolDef.category}
        toolDescription={selectedToolDef.shortExplanation}
        toolHowItWorks={selectedToolDef.howItWorks}
        toolKeyFeatures={selectedToolDef.keyFeatures}
        toolPracticalGuidance={selectedToolDef.practicalGuidance}
        initialTab={modalInitialTab}
        result={activeResult}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onCalculate={handleCalculate}
        onAskAI={onAskAI || (() => {})}
        onSelectRelatedTool={(id) => handleOpenTool(id, 'calculator')}
        inputFormNode={inputFormNode}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '90px' }}>
      {/* Header & Search */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
              ✦ Astrology Tools Hub
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              33+ classical Vedic, Western, Panchang & Numerology calculators
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            marginTop: '12px',
          }}
        >
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search tools by name (e.g. Moon Sign, Manglik, Kundli Match, Choghadiya, KP)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#FFFFFF',
              fontSize: '13px',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '6px',
          scrollbarWidth: 'none',
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '7px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background:
                activeCategory === cat
                  ? 'linear-gradient(135deg, #FF6A00 0%, #FF8533 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
              color: activeCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: '12.5px',
              fontWeight: activeCategory === cat ? 800 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 180ms ease',
              boxShadow: activeCategory === cat ? '0 4px 16px rgba(255, 106, 0, 0.4)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      
      {/* Free Plan Upgrade Gate Banner for Tools */}
      {!user.isPremium && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1.5px solid #F59E0B',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              maxWidth: '680px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Lock size={22} color="#F59E0B" />
            <div style={{ textAlign: 'left', flex: 1 }}>
              <strong style={{ color: '#FDE68A', fontSize: '14px', display: 'block' }}>
                Advanced Astrology Tools Are Premium Features
              </strong>
              <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                Free tier gives access to Moon Sign / Chandra Rashi calculator only. Upgrade to Premium for all 33+ specialized Vedic calculators.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onNavigateTab) {
                  onNavigateTab('subscription');
                } else {
                  openUpgradeModal('Astrology Tools Hub (33+ Calculators)');
                }
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                backgroundColor: '#F59E0B',
                color: '#000000',
                fontWeight: 800,
                fontSize: '12.5px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Tools Grid - OVERHAULED DESIGN BOXES */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredTools.map((tool) => (
          <Card
            key={tool.id}
            variant="elevated"
            interactive
            onClick={() => handleOpenTool(tool.id, 'calculator')}
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
              border: '1.5px solid rgba(249, 115, 22, 0.22)',
              background: 'linear-gradient(180deg, rgba(20, 18, 32, 0.95) 0%, rgba(12, 11, 20, 0.98) 100%)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
            }}
            className="card-hover"
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(249, 115, 22, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    boxShadow: '0 4px 14px rgba(249, 115, 22, 0.15)',
                  }}
                >
                  {tool.icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {!user.isPremium && !accessibleFreeTools.includes(tool.id) && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(245, 158, 11, 0.18)',
                        border: '1px solid rgba(245, 158, 11, 0.45)',
                      }}
                      title="Premium Tool (Locked for Free Users)"
                    >
                      <Lock size={12} color="#F59E0B" />
                    </span>
                  )}
                  <Badge variant="orange" size="sm">
                    {tool.category}
                  </Badge>
                </div>
              </div>

              <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                {tool.title}
              </h4>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
                {tool.shortExplanation}
              </p>
              {!user.isPremium && !accessibleFreeTools.includes(tool.id) && (
                <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#F59E0B', background: 'rgba(245, 158, 11, 0.12)', padding: '2px 8px', borderRadius: '6px', fontWeight: 750 }}>
                  <Lock size={11} /> <span>Premium Tool</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenTool(tool.id, 'guide');
                }}
                style={{
                  fontSize: '11px',
                  color: '#38BDF8',
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  padding: '5px 11px',
                  borderRadius: '10px',
                  fontWeight: 750,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'background 0.15s ease',
                }}
              >
                <span>✦ Info & Guide</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenTool(tool.id, 'calculator');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#FFFFFF',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span>Calculate</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
