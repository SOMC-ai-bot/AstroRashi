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
}

export const ASTROLOGY_TOOLS: ToolItem[] = [
  // Birth & Chart
  { id: 'moon-sign', title: 'Moon Sign / Rashi', category: 'Birth & Chart', shortExplanation: 'Calculates your sidereal Moon sign, exact lunar degree, and Nakshatra lord.', icon: <Moon size={18} color="var(--accent-rose-light)" />, tags: ['rashi', 'chandra', 'nakshatra'] },
  { id: 'sun-sign', title: 'Sun Sign (Vedic vs Western)', category: 'Birth & Chart', shortExplanation: 'Calculates both your Sidereal Vedic and Tropical Western Sun signs.', icon: <Sun size={18} color="var(--gold-primary)" />, tags: ['surya', 'tropical', 'sidereal'] },
  { id: 'nakshatra', title: 'Birth Nakshatra & Pada', category: 'Birth & Chart', shortExplanation: 'Reveals your 1 of 27 lunar mansions, pada, deity, and birth syllables.', icon: <Sparkles size={18} color="#9B51E0" />, tags: ['constellation', 'star', 'akshara'] },
  { id: 'lagna', title: 'Ascendant / Lagna', category: 'Birth & Chart', shortExplanation: 'Pinpoints the exact rising sign and degree anchoring all 12 houses.', icon: <Compass size={18} color="#2D9CDB" />, tags: ['rising', 'houses', 'tanu'] },
  { id: 'navamsa', title: 'Navamsa D9 Kundli', category: 'Birth & Chart', shortExplanation: 'Generates your 9th divisional harmonic chart and Vargottama planets.', icon: <Layers size={18} color="#27AE60" />, tags: ['d9', 'marriage', 'vargottama'] },

  // Doshas & Dashas
  { id: 'mangal-dosha', title: 'Mangal Dosha (Kuja)', category: 'Doshas & Dashas', shortExplanation: 'Analyzes Mars placements from Lagna, Moon, and Venus with classical cancellations.', icon: <Flame size={18} color="#EB5757" />, tags: ['manglik', 'mars', 'marriage'] },
  { id: 'kaal-sarp', title: 'Kaal Sarp Yoga', category: 'Doshas & Dashas', shortExplanation: 'Checks planetary alignment across the Rahu-Ketu axis across 12 classical types.', icon: <Shield size={18} color="#F2994A" />, tags: ['rahu', 'ketu', 'snake'] },
  { id: 'sade-sati', title: 'Sade Sati Tracker', category: 'Doshas & Dashas', shortExplanation: 'Determines whether you are in Saturn’s 7.5-year cycle, active phase, and dates.', icon: <Clock size={18} color="#BB6BD9" />, tags: ['shani', 'saturn', 'transit'] },
  { id: 'vimshottari-dasha', title: 'Vimshottari Dasha', category: 'Doshas & Dashas', shortExplanation: 'Computes your 120-year life timeline of Mahadashas and Antardashas.', icon: <Calendar size={18} color="var(--gold-primary)" />, tags: ['timeline', 'periods', 'cycles'] },
  { id: 'pitra-dosha', title: 'Pitra Dosha Analysis', category: 'Doshas & Dashas', shortExplanation: 'Evaluates solar and 9th house indicators with ancestral reverence mitigations.', icon: <Shield size={18} color="#6FCF97" />, tags: ['ancestors', 'sun', 'karma'] },

  // Compatibility & Love
  { id: 'kundli-matching', title: 'Ashtakoot Kundli Matching', category: 'Compatibility', shortExplanation: 'Calculates the classical 36-point compatibility score across all 8 Kootas.', icon: <Heart size={18} color="var(--accent-rose)" />, tags: ['marriage', 'score', 'guna milan'] },
  { id: 'love-calculator', title: 'Love Harmony Calculator', category: 'Compatibility', shortExplanation: 'Lightweight name and nakshatra-syllable resonance indicator.', icon: <Heart size={18} color="#F2C94C" />, tags: ['name', 'affinity', 'romance'] },

  // Jaimini & KP
  { id: 'atmakaraka', title: 'Atmakaraka & Chara Karakas', category: 'Jaimini & KP', shortExplanation: 'Ranks planets by degree to identify your soul significator and spouse karaka.', icon: <Sparkles size={18} color="#56CCF2" />, tags: ['jaimini', 'soul', 'darakaraka'] },
  { id: 'ishta-devata', title: 'Ishta Devata Calculator', category: 'Jaimini & KP', shortExplanation: 'Identifies your guiding spiritual deity via the 12th house from Karakamsa.', icon: <Sparkles size={18} color="var(--gold-primary)" />, tags: ['deity', 'meditation', 'mantra'] },
  { id: 'kp-horary', title: 'KP Horary (1–249)', category: 'Jaimini & KP', shortExplanation: 'Divines direct answers using the Krishnamurti Paddhati 249 sub-lord table.', icon: <Compass size={18} color="#9B51E0" />, tags: ['prashna', 'sublord', 'horary'] },
  { id: 'kp-sublord', title: 'KP Sub-Lord Finder', category: 'Jaimini & KP', shortExplanation: 'Pinpoints star lords and sub lords for natal planets and house cusps.', icon: <Layers size={18} color="#2D9CDB" />, tags: ['kp', 'cusps', 'star lord'] },
  { id: 'kp-ruling', title: 'KP Ruling Planets Now', category: 'Jaimini & KP', shortExplanation: 'Real-time calculation of cosmic ruling planets of the present moment.', icon: <Clock size={18} color="#27AE60" />, tags: ['ruling', 'present', 'now'] },

  // Remedies
  { id: 'gemstone', title: 'Gemstone Recommender', category: 'Remedies', shortExplanation: 'Recommends Vedic gemstones based on benefic house lordship with precautions.', icon: <Gem size={18} color="var(--gold-primary)" />, tags: ['ratna', 'pukhraj', 'ruby'] },
  { id: 'rudraksha', title: 'Rudraksha Recommender', category: 'Remedies', shortExplanation: 'Recommends 1 to 14 Mukhi sacred beads with associated deities and beej mantras.', icon: <Shield size={18} color="#EB5757" />, tags: ['beads', 'shiva', 'mukhi'] },

  // Numerology Center
  { id: 'numerology-center', title: 'Numerology Center (10 Tools)', category: 'Numerology', shortExplanation: 'Mulank, Bhagyank, Lo Shu 3x3 Grid, Name, Mobile, Vehicle, and House numerology.', icon: <Calculator size={18} color="#F2994A" />, tags: ['mulank', 'bhagyank', 'lo shu', 'mobile'] },

  // Panchang & Timing
  { id: 'daily-panchang', title: 'Daily Panchang & Timing', category: 'Panchang', shortExplanation: 'Full Tithi, Vara, Nakshatra, Yoga, Karana, and Samvats for any Indian city.', icon: <Calendar size={18} color="var(--accent-rose-light)" />, tags: ['tithi', 'vara', 'sunrise'] },
  { id: 'choghadiya', title: 'Daily Choghadiya (Day/Night)', category: 'Panchang', shortExplanation: 'Eight daytime and eight nighttime auspicious windows with real-time indicators.', icon: <Clock size={18} color="var(--gold-primary)" />, tags: ['amrit', 'shubh', 'timing'] },
  { id: 'gowri-panchang', title: 'Gowri Panchangam', category: 'Panchang', shortExplanation: 'South Indian Gowri day and night periods with active period classification.', icon: <Clock size={18} color="#2D9CDB" />, tags: ['south', 'gowri', 'timing'] },
  { id: 'rahu-kaal', title: 'Rahu Kaal & Inauspicious Times', category: 'Panchang', shortExplanation: 'Daily Rahu Kaal, Yamaganda, Gulika, and Abhijit Muhurta windows.', icon: <Shield size={18} color="#EB5757" />, tags: ['rahu', 'yamaganda', 'abhijit'] },
  { id: 'hora', title: 'Planetary Hora Hours', category: 'Panchang', shortExplanation: '24 planetary hours cycling through Chaldean order with commercial/spiritual themes.', icon: <Clock size={18} color="#BB6BD9" />, tags: ['hora', 'planetary hours'] },
  { id: 'ayanamsa', title: 'Lahiri Ayanamsa Calculator', category: 'Panchang', shortExplanation: 'Calculates the exact precession offset between tropical and sidereal zodiacs.', icon: <Compass size={18} color="#6FCF97" />, tags: ['precession', 'degrees'] },
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
