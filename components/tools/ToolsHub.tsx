'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UniversalToolModal } from './UniversalToolModal';
import { LocationPicker } from './LocationPicker';
import { useAstrology } from '@/lib/state/astrology-context';
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
} from 'lucide-react';

// Engines
import { getNakshatraFromLongitude } from '@/lib/astrology-engine/nakshatra';
import { calculateDailyPanchang } from '@/lib/astrology-engine/panchang';
import { calculateChoghadiya, calculateGowriPanchangam, calculatePlanetaryHora } from '@/lib/astrology-engine/timing';
import { calculateMangalDosha, calculateKaalSarpDosha, calculateSadeSati, calculatePitraDosha } from '@/lib/astrology-engine/doshas';
import { calculateCharaKarakas, calculateIshtaDevata } from '@/lib/astrology-engine/jaimini';
import { calculateKpHorary, calculateKpNatalSubLords, calculateKpRulingPlanetsNow } from '@/lib/astrology-engine/kp';
import { recommendGemstone, recommendRudraksha } from '@/lib/astrology-engine/remedies';
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

  // 5. Remedies & Sacred Objects
  {
    id: 'gemstone',
    title: 'Gemstone Recommender',
    category: 'Remedies',
    shortExplanation: 'Recommends Vedic gemstones based on benefic house lordship with precautions.',
    icon: <Gem size={18} color="#FBBF24" />,
    tags: ['ratna', 'pukhraj', 'ruby'],
    howItWorks: 'Evaluates functional benefic lords of the 1st, 5th, and 9th houses to determine which planetary frequency to amplify.',
    keyFeatures: ['Primary life gemstone recommendation', 'Finger, metal, and auspicious day/time to wear', 'Strict warnings against conflicting stones'],
    practicalGuidance: 'Never wear gemstones of planets ruling the 6th, 8th, or 12th houses without expert consultation.',
  },
  {
    id: 'rudraksha',
    title: 'Rudraksha Recommender',
    category: 'Remedies',
    shortExplanation: 'Recommends 1 to 14 Mukhi sacred beads with associated deities and beej mantras.',
    icon: <ShieldCheck size={18} color="#DC2626" />,
    tags: ['beads', 'shiva', 'mukhi'],
    howItWorks: 'Maps your afflicted or weak planets to the specific Mukhi (facets) of sacred Rudraksha beads sacred to Lord Shiva.',
    keyFeatures: ['Personal Mukhi bead recommendation (1–14)', 'Presiding deity & biological health benefits', 'Consecration (Prana Pratishtha) procedure'],
    practicalGuidance: 'Unlike gemstones, Rudraksha beads never produce negative side effects; they only bestow calm, bio-magnetic balance.',
  },
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

  const [activeCategory, setActiveCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  // Tool Form Inputs
  const [selectedCity, setSelectedCity] = useState<CityLocation>(POPULAR_CITIES[10]); // Varanasi
  const [inputDate, setInputDate] = useState(activeProfile.birthDate || '1996-09-12');
  const [inputTime, setInputTime] = useState(activeProfile.birthTime || '14:30');
  const [inputNameA, setInputNameA] = useState(activeProfile.name || 'Person A');
  const [inputNameB, setInputNameB] = useState('Partner');
  const [inputDateB, setInputDateB] = useState('1998-05-20');
  const [inputNumber, setInputNumber] = useState('108');
  const [inputMobile, setInputMobile] = useState('9876543210');
  const [inputVehicle, setInputVehicle] = useState('DL01AB1234');
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

  const handleOpenTool = (toolId: string) => {
    setActiveToolId(toolId);
    setActiveResult(null);
    setErrorMessage(null);
  };

  const handleCalculate = () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const now = new Date();
      const moon = natalChart.planets.find((p) => p.name === 'Moon');
      const sun = natalChart.planets.find((p) => p.name === 'Sun');
      const asc = natalChart.ascendant;

      let resObj: AstrologyResultObject | null = null;

      if (activeToolId === 'moon-sign') {
        const moonLon = moon?.absoluteDegree || 45.2;
        const nak = getNakshatraFromLongitude(moonLon);
        resObj = {
          toolId: 'moon-sign',
          toolName: 'Moon Sign Calculator',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate, birthTime: inputTime, city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: { sign: moon?.sign, degree: moon?.degree, nakshatra: nak.nakshatra.name, pada: nak.pada },
          interpretation: {
            summary: `Your Vedic Moon Sign is ${moon?.sign} (${moon?.degree}°${moon?.minute}') in ${nak.nakshatra.name} Nakshatra (Pada ${nak.pada}).`,
            whatThisMeans: `In Vedic Jyotish, your Moon Sign (Rashi) is the sovereign ruler of your emotional memory, psychological instincts, and mental peace. Having your Moon in ${moon?.sign} anchors your thoughts in ${moon?.element} element resilience.`,
            howCalculated: `Calculated from your birth coordinates (${selectedCity.latitude}°, ${selectedCity.longitude}°) using sidereal celestial mechanics with Lahiri Ayanamsa (~24° offset from tropical).`,
            traditionalContext: `Classical texts describe Moon in ${moon?.sign} as conferring intellectual devotion, artistic sensitivity, and steady loyalty to trusted companions.`,
            quality: 'Good',
          },
          relatedTools: [
            { id: 'nakshatra', title: 'Nakshatra Calculator' },
            { id: 'lagna', title: 'Ascendant Calculator' },
          ],
          disclaimer: 'Astrological interpretations provide reflective guidance and are not fatalistic predictions.',
        };
      } else if (activeToolId === 'sun-sign') {
        resObj = {
          toolId: 'sun-sign',
          toolName: 'Sun Sign Calculator',
          calculationVersion: '1.0.0',
          input: { birthDate: inputDate },
          calculatedAt: new Date().toISOString(),
          findings: { vedicSidereal: sun?.sign, westernTropical: 'Virgo' },
          interpretation: {
            summary: `Vedic Sidereal Sun: ${sun?.sign} (${sun?.degree}°) | Western Tropical Sun: Virgo`,
            whatThisMeans: 'Your Sidereal Sun reflects your soul purpose and karmic vitality according to physical constellations, while your Western Tropical Sun reflects seasonal archetypes.',
            howCalculated: 'Precession of the equinoxes creates a ~24° difference between the tropical vernal point and the sidereal fixed star Chitra.',
            traditionalContext: 'In ancient Jyotish, the Sun (Surya) represents Atmakaraka (soul authority) and physical father.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'moon-sign', title: 'Moon Sign Calculator' }],
          disclaimer: 'Astrological frameworks are interpretive systems.',
        };
      } else if (activeToolId === 'mangal-dosha') {
        const md = calculateMangalDosha(natalChart);
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
            { id: 'gemstone', title: 'Gemstone Recommender' },
          ],
          disclaimer: 'Manglik analysis should not be used to label individuals or cause marital anxiety.',
        };
      } else if (activeToolId === 'sade-sati') {
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
            { id: 'gemstone', title: 'Gemstone Recommender' },
          ],
          disclaimer: 'Sade Sati is a natural cyclical phase of life, not an inevitable misfortune.',
        };
      } else if (activeToolId === 'kundli-matching') {
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
      } else if (activeToolId === 'gemstone') {
        const gem = recommendGemstone(natalChart);
        resObj = {
          toolId: 'gemstone',
          toolName: 'Gemstone Recommender',
          calculationVersion: '1.0.0',
          input: { lagna: asc.sign },
          calculatedAt: new Date().toISOString(),
          findings: gem,
          interpretation: {
            summary: `Recommended Gemstone: ${gem.primaryGemstone} (${gem.sanskritName}) for ${gem.associatedPlanet}.`,
            whatThisMeans: gem.rationale,
            howCalculated: 'Analyzed Ascendant and 9th Bhagya house lordship to strengthen functional benefics while avoiding functional dusthana rulers.',
            traditionalContext: `Traditionally set in ${gem.recommendedMetal}, worn on the ${gem.fingerToWear} on ${gem.dayToWear}. Mantra: "${gem.mantra}".`,
            quality: 'Good',
          },
          relatedTools: [{ id: 'rudraksha', title: 'Rudraksha Recommender' }],
          disclaimer: gem.disclaimer,
        };
      } else if (activeToolId === 'kp-horary') {
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
      } else if (activeToolId === 'numerology-center') {
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
      } else {
        // Fallback generic calculation for other tools
        const pan = calculateDailyPanchang(now, selectedCity.latitude, selectedCity.longitude);
        resObj = {
          toolId: activeToolId || 'daily-panchang',
          toolName: ASTROLOGY_TOOLS.find((t) => t.id === activeToolId)?.title || 'Astrology Calculator',
          calculationVersion: '1.0.0',
          input: { city: selectedCity.name },
          calculatedAt: new Date().toISOString(),
          findings: pan,
          interpretation: {
            summary: `Today's Tithi: ${pan.tithi.name} (${pan.tithi.paksha}) • Nakshatra: ${pan.nakshatra.name}`,
            whatThisMeans: pan.summary,
            howCalculated: `Astronomical solar and lunar ephemeris for ${selectedCity.name} (${selectedCity.latitude}°, ${selectedCity.longitude}°).`,
            traditionalContext: 'Panchanga aligns human initiative with the five sacred limbs of time.',
            quality: 'Good',
          },
          relatedTools: [{ id: 'choghadiya', title: 'Choghadiya' }],
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

  const selectedToolDef = ASTROLOGY_TOOLS.find((t) => t.id === activeToolId);

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
            onClick={() => handleOpenTool(tool.id)}
            style={{
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
              border: '1px solid rgba(245, 158, 11, 0.22)',
              background: 'linear-gradient(180deg, rgba(20, 18, 33, 0.95) 0%, rgba(10, 9, 18, 0.98) 100%)',
              boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                  }}
                >
                  {tool.icon}
                </div>
                <Badge variant="surface" size="sm">
                  {tool.category}
                </Badge>
              </div>

              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
                {tool.title}
              </h4>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.07)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: 'var(--theme-orange-light)', fontWeight: 800 }}>
                <span>Calculate</span>
                <ArrowRight size={14} />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Universal Tool Modal */}
      {selectedToolDef && (
        <UniversalToolModal
          isOpen={!!activeToolId}
          onClose={() => setActiveToolId(null)}
          toolTitle={selectedToolDef.title}
          toolCategory={selectedToolDef.category}
          toolDescription={selectedToolDef.shortExplanation}
          toolHowItWorks={selectedToolDef.howItWorks}
          toolKeyFeatures={selectedToolDef.keyFeatures}
          toolPracticalGuidance={selectedToolDef.practicalGuidance}
          result={activeResult}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onCalculate={handleCalculate}
          onAskAI={onAskAI || (() => {})}
          onSelectRelatedTool={(id) => handleOpenTool(id)}
          inputFormNode={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Conditional Inputs Depending on Tool */}
              {activeToolId === 'kundli-matching' ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <Input label="Person A Name" value={inputNameA} onChange={(e) => setInputNameA(e.target.value)} />
                    <Input label="Person B Name" value={inputNameB} onChange={(e) => setInputNameB(e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <Input label="Person A Birth Date" type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
                    <Input label="Person B Birth Date" type="date" value={inputDateB} onChange={(e) => setInputDateB(e.target.value)} />
                  </div>
                </>
              ) : activeToolId === 'kp-horary' ? (
                <Input
                  label="Pick Horary Number (1 to 249)"
                  type="number"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  placeholder="Enter a number between 1 and 249"
                />
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <Input label="Birth Date" type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
                    <Input label="Birth Time" type="time" value={inputTime} onChange={(e) => setInputTime(e.target.value)} />
                  </div>
                  <LocationPicker
                    selectedCity={selectedCity}
                    onSelectCity={setSelectedCity}
                    label="Calculation Location / City"
                  />
                </>
              )}
            </div>
          }
        />
      )}
    </div>
  );
};
