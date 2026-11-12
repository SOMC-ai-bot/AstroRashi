'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Shield,
  Flame,
  Droplet,
  Wind,
  Mountain,
  ChevronRight,
  X,
  ExternalLink,
  BookOpen,
  PieChart,
  Heart,
  Briefcase,
  Gem,
} from 'lucide-react';

export interface ZodiacSignData {
  id: string;
  name: string;
  sanskrit: string;
  month: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Movable (Chara)' | 'Fixed (Sthira)' | 'Dual (Dwiswabhava)';
  lord: string;
  symbol: string;
  nakshatras: string;
  bodyPart: string;
  coreTrait: string;
  karmicGift: string;
  strengths: string[];
  challenges: string[];
  careerPaths: string[];
  compatibleSigns: string[];
  luckyColor: string;
  luckyNumber: string;
  gemstone: string;
  mantra: string;
  deepArticle: string;
  iconSvg: React.ReactNode;
}

interface ZodiacWheelCardsProps {
  onSelectSign?: (sign: string) => void;
  onOpenChart?: (sign: string) => void;
  onAskAI?: (prompt: string) => void;
}

export const ZodiacWheelCards: React.FC<ZodiacWheelCardsProps> = ({
  onSelectSign,
  onOpenChart,
  onAskAI,
}) => {
  const [activeSign, setActiveSign] = useState<string>('sagittarius');
  const [modalSign, setModalSign] = useState<ZodiacSignData | null>(null);

  const signs: ZodiacSignData[] = [
    {
      id: 'aries',
      name: 'Aries',
      sanskrit: 'Mesha',
      month: 'Month 1 (March - April)',
      dates: 'Mar 21 - Apr 19',
      element: 'Fire',
      modality: 'Movable (Chara)',
      lord: 'Mars (Mangala)',
      symbol: '♈',
      nakshatras: 'Ashwini (4 padas), Bharani (4 padas), Krittika (1st pada)',
      bodyPart: 'Head, Brain, Cranium, Facial bones',
      coreTrait: 'Pioneering initiative, relentless courage, and fiery vitality.',
      karmicGift: 'Ability to break through stagnancy and spark courageous new beginnings.',
      strengths: ['Fearless leadership', 'Unshakeable willpower', 'Decisive execution', 'Generous chivalry'],
      challenges: ['Impulsiveness', 'Quick temper', 'Impatience with slow progress', 'Burnout'],
      careerPaths: ['Entrepreneurship', 'Military / Defense', 'Surgery / Medicine', 'Civil Engineering', 'Sports'],
      compatibleSigns: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      luckyColor: 'Coral Red & Saffron Gold',
      luckyNumber: '9 & 1',
      gemstone: 'Natural Red Coral (Moonga)',
      mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namaha',
      deepArticle: `Aries (Mesha) is the primordial spark of the Kalapurusha (Universal Being). Ruled by the kinetic fire of Mars, Aries represents the raw will to exist and conquer. The soul born under this sign has contracted to master courage, personal sovereignty, and righteous initiative.

In classical Vedic Jyotish, Mesha contains the entire asterisms of Ashwini (the divine twin physicians) and Bharani (the womb of cosmic transformation), alongside the initial fiery pada of Krittika. This gives Aries an innate drive to heal through action, initiate groundbreaking ventures, and remove stagnant obstacles.

Your primary karmic lesson is cultivating patience. While Mars grants unyielding stamina to start battles and projects, mastering the stamina to complete them transforms Aries from a fiery warrior into a revered cosmic leader.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21V9a7 7 0 0 0-7-7c-2.5 0-4 1.8-4 4 0 3 2 4 4 4 1.5 0 2.5-.5 3-1" />
          <path d="M12 9a7 7 0 0 1 7-7c2.5 0 4 1.8 4 4 0 3-2 4-4 4-1.5 0-2.5-.5-3-1" />
        </svg>
      ),
    },
    {
      id: 'taurus',
      name: 'Taurus',
      sanskrit: 'Vrishabha',
      month: 'Month 2 (April - May)',
      dates: 'Apr 20 - May 20',
      element: 'Earth',
      modality: 'Fixed (Sthira)',
      lord: 'Venus (Shukra)',
      symbol: '♉',
      nakshatras: 'Krittika (padas 2-4), Rohini (4 padas), Mrigashira (padas 1-2)',
      bodyPart: 'Throat, Vocal cords, Neck, Thyroid',
      coreTrait: 'Unshakable stability, sensory refinement, and compounding abundance.',
      karmicGift: 'Mastery of tangible wealth, devotional loyalty, and enduring peace.',
      strengths: ['Enduring patience', 'Financial wisdom', 'Aesthetic taste', 'Steadfast loyalty'],
      challenges: ['Stubbornness', 'Reluctance to change', 'Material possessiveness'],
      careerPaths: ['Banking / Wealth Management', 'Architecture', 'Culinary Arts', 'Music / Fine Arts', 'Agriculture'],
      compatibleSigns: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      luckyColor: 'Lotus White, Cream & Silken Pink',
      luckyNumber: '6 & 2',
      gemstone: 'Natural Diamond or White Zircon',
      mantra: 'Om Dram Dreem Droum Sah Shukraya Namaha',
      deepArticle: `Taurus (Vrishabha) anchors cosmic spiritual energy into tangible physical matter. Ruled by Shukra (Venus), it represents the second house of resources, voice, family lineage, and material abundance. 

The Moon attains its supreme exaltation at 3° of Taurus in the Nakshatra of Rohini, signaling that true peace comes from emotional groundedness and communion with natural rhythms. Taurus builds foundations that withstand generations.

The spiritual journey of Taurus is learning the art of non-attachment: recognizing that true wealth is an internal state of grace rather than a stockpile of worldly possessions.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="15" r="6" />
          <path d="M6 3c0 3.5 2.7 6 6 6s6-2.5 6-6" />
        </svg>
      ),
    },
    {
      id: 'gemini',
      name: 'Gemini',
      sanskrit: 'Mithuna',
      month: 'Month 3 (May - June)',
      dates: 'May 21 - Jun 20',
      element: 'Air',
      modality: 'Dual (Dwiswabhava)',
      lord: 'Mercury (Budha)',
      symbol: '♊',
      nakshatras: 'Mrigashira (padas 3-4), Ardra (4 padas), Punarvasu (padas 1-3)',
      bodyPart: 'Shoulders, Arms, Hands, Respiratory airways',
      coreTrait: 'Agile intellect, versatile communication, and curiosity.',
      karmicGift: 'Bridging ideas, synthesizing diverse knowledge, and inspiring dialogue.',
      strengths: ['Linguistic fluency', 'Rapid learning', 'Adaptability', 'Witty humor'],
      challenges: ['Restlessness', 'Nervous tension', 'Superficial focus'],
      careerPaths: ['Media / Journalism', 'Software Architecture', 'Public Relations', 'Diplomacy', 'Publishing'],
      compatibleSigns: ['Libra', 'Aquarius', 'Aries', 'Leo'],
      luckyColor: 'Emerald Green & Pale Mint',
      luckyNumber: '5 & 3',
      gemstone: 'Natural Emerald (Panna)',
      mantra: 'Om Bram Breem Broum Sah Budhaya Namaha',
      deepArticle: `Gemini (Mithuna) is the celestial pollinator, governed by Budha (Mercury). Representing the third house of courage, communication, and manual skill, Gemini connects disparate worlds through the power of the spoken and written word.

Containing the tempestuous, transformative Nakshatra of Ardra (ruled by Rudra) and the rejuvenating Punarvasu (ruled by Jupiter), Gemini experiences intense intellectual transformations that evolve into profound wisdom.

The karmic purpose of Gemini is moving beyond mere information gathering to synthesize genuine spiritual understanding that uplifts collective human dialogue.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4c4 2 12 2 16 0" />
          <path d="M4 20c4-2 12-2 16 0" />
          <line x1="9" y1="5.5" x2="9" y2="18.5" />
          <line x1="15" y1="5.5" x2="15" y2="18.5" />
        </svg>
      ),
    },
    {
      id: 'cancer',
      name: 'Cancer',
      sanskrit: 'Karka',
      month: 'Month 4 (June - July)',
      dates: 'Jun 21 - Jul 22',
      element: 'Water',
      modality: 'Movable (Chara)',
      lord: 'Moon (Chandra)',
      symbol: '♋',
      nakshatras: 'Punarvasu (pada 4), Pushya (4 padas), Ashlesha (4 padas)',
      bodyPart: 'Chest, Breasts, Stomach, Alimentary canal',
      coreTrait: 'Empathetic depth, protective sanctuary, and intuitive wisdom.',
      karmicGift: 'Emotional healing, honoring roots, and safeguarding sacred bonds.',
      strengths: ['Profound intuition', 'Unconditional loyalty', 'Nourishing care', 'Psychic insight'],
      challenges: ['Moody defensiveness', 'Holding grudges', 'Fear of vulnerability'],
      careerPaths: ['Psychology / Counseling', 'Pediatrics / Nursing', 'Interior Design', 'Hospitality', 'Marine Biology'],
      compatibleSigns: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      luckyColor: 'Moonlight Pearl, Silver & Milky White',
      luckyNumber: '2 & 7',
      gemstone: 'Natural South Sea Pearl (Moti)',
      mantra: 'Om Shram Shreem Shroum Sah Chandraya Namaha',
      deepArticle: `Cancer (Karka) is the sacred womb of the zodiac, governed by Chandra (the Moon). It rules the fourth house of the heart (Hridaya), domestic shelter, ancestral lineages, and emotional peace.

Cancer houses Pushya Nakshatra—considered the most auspicious of all 27 lunar mansions—ruled by Saturn and presided over by Brihaspati, making Cancer an extraordinary vehicle for spiritual nourishment and benevolent leadership.

Your spiritual evolution centers on emotional detachment: learning that the ultimate sanctuary you seek is not outside in worldly circumstances, but within the unshakeable stillness of the soul.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="12" r="3" />
          <path d="M6 9a6 6 0 0 1 12 0" />
          <path d="M18 15a6 6 0 0 1-12 0" />
        </svg>
      ),
    },
    {
      id: 'leo',
      name: 'Leo',
      sanskrit: 'Simha',
      month: 'Month 5 (July - August)',
      dates: 'Jul 23 - Aug 22',
      element: 'Fire',
      modality: 'Fixed (Sthira)',
      lord: 'Sun (Surya)',
      symbol: '♌',
      nakshatras: 'Magha (4 padas), Purva Phalguni (4 padas), Uttara Phalguni (pada 1)',
      bodyPart: 'Heart, Spine, Upper Back, Solar Plexus',
      coreTrait: 'Radiant sovereignty, generous leadership, and creative majesty.',
      karmicGift: 'Inspiring collective confidence, warmth, and noble purpose.',
      strengths: ['Charismatic presence', 'Magnanimous generosity', 'Creative brilliance', 'Unflinching loyalty'],
      challenges: ['Wounded pride', 'Need for applause', 'Autocratic impatience'],
      careerPaths: ['Executive Leadership', 'Creative Arts / Film', 'Government & Politics', 'Brand Strategy', 'Public Philanthropy'],
      compatibleSigns: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      luckyColor: 'Solar Gold, Saffron & Crimson',
      luckyNumber: '1 & 5',
      gemstone: 'Natural Unheated Ruby (Manikya)',
      mantra: 'Om Hram Hreem Hroum Sah Suryaya Namaha',
      deepArticle: `Leo (Simha) represents the supreme sovereign solar consciousness. Ruled by Surya (the Sun), it governs the fifth house of creative genius, romantic nobility, Purva Punya (past-life merits), and spiritual mantras.

Containing Magha Nakshatra (linked to the royal Pitris/ancestors) and Purva Phalguni (ruled by Bhaga, deity of prosperity), Leo is naturally endowed with regal poise and the responsibility to govern fairly.

The elevated destiny of Leo is transforming the personal ego into an instrument of divine radiance: understanding that true royalty is selfless service to all living beings.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="16" r="3" />
          <path d="M9 16c0-5 3-10 6-10s4 3 4 5c0 4-4 7-4 7" />
          <circle cx="17" cy="19" r="2" />
        </svg>
      ),
    },
    {
      id: 'virgo',
      name: 'Virgo',
      sanskrit: 'Kanya',
      month: 'Month 6 (August - September)',
      dates: 'Aug 23 - Sep 22',
      element: 'Earth',
      modality: 'Dual (Dwiswabhava)',
      lord: 'Mercury (Budha)',
      symbol: '♍',
      nakshatras: 'Uttara Phalguni (padas 2-4), Hasta (4 padas), Chitra (padas 1-2)',
      bodyPart: 'Intestines, Digestive system, Spleen, Abdomen',
      coreTrait: 'Diagnostic precision, analytical craftsmanship, and selfless service.',
      karmicGift: 'Mastering functional details to bring healing order to chaos.',
      strengths: ['Meticulous accuracy', 'Diagnostic insight', 'Practical problem-solving', 'Humility'],
      challenges: ['Perfectionist anxiety', 'Hypercritical judgment', 'Overthinking'],
      careerPaths: ['Data Science', 'Clinical Medicine', 'Auditing / Accounting', 'Biotechnology', 'Quality Assurance'],
      compatibleSigns: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      luckyColor: 'Olive Green, Slate Grey & Khaki',
      luckyNumber: '5 & 6',
      gemstone: 'Natural Green Emerald (Panna)',
      mantra: 'Om Bram Breem Broum Sah Budhaya Namaha',
      deepArticle: `Virgo (Kanya) is the master alchemist and healer of the physical realm. Governing the sixth house of health, daily duties (Seva), and overcoming obstacles, Virgo evaluates systems with clinical precision.

Mercury achieves both its sign rulership and deep exaltation (at 15° Virgo), highlighting that practical, discriminative intellect (Buddhi) reaches its zenith when applied to solving human suffering.

The spiritual realization of Virgo is transcending perfectionism: accepting the world in its beautiful imperfection while continuing to serve with an open and devoted heart.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4c2 0 3 2 3 5 0 3.5-1 9-1 11" />
          <path d="M7 9c0-3 2-5 4-5s3 2 3 5c0 3.5-1 9-1 11" />
          <path d="M14 9c0-3 2-5 4-5s3 2 3 5c0 4-1 9-1 11 0 2-1 3-3 3" />
        </svg>
      ),
    },
    {
      id: 'libra',
      name: 'Libra',
      sanskrit: 'Tula',
      month: 'Month 7 (September - October)',
      dates: 'Sep 23 - Oct 22',
      element: 'Air',
      modality: 'Movable (Chara)',
      lord: 'Venus (Shukra)',
      symbol: '♎',
      nakshatras: 'Chitra (padas 3-4), Swati (4 padas), Vishakha (padas 1-3)',
      bodyPart: 'Kidneys, Lower Back, Adrenal Glands, Pelvic Floor',
      coreTrait: 'Harmonious diplomacy, aesthetic balance, and social justice.',
      karmicGift: 'Creating equitable bridges, peaceful consensus, and timeless elegance.',
      strengths: ['Diplomatic poise', 'Relational intelligence', 'Artistic symmetry', 'Fairness'],
      challenges: ['Chronic indecision', 'Conflict avoidance', 'Over-compromising'],
      careerPaths: ['Corporate Law', 'Mediation / Diplomacy', 'Fashion & Luxury Design', 'Public Relations', 'Fine Art Curation'],
      compatibleSigns: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      luckyColor: 'Sky Blue, Ivory & Pastel Rose',
      luckyNumber: '6 & 9',
      gemstone: 'Natural Diamond or White Sapphire',
      mantra: 'Om Dram Dreem Droum Sah Shukraya Namaha',
      deepArticle: `Libra (Tula) is the celestial scale of cosmic equilibrium, ruled by Venus (Shukra). It represents the seventh house of social contracts, sacred partnerships, trade, and reciprocal justice.

Saturn reaches its highest exaltation at 20° of Libra, demonstrating that true balance and justice require Saturnian discipline, integrity, and long-term ethical commitment.

The spiritual test of Libra is finding internal alignment so that your external diplomacy is rooted in authentic truth rather than a fearful desire for superficial approval.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19h16" />
          <path d="M4 15h16" />
          <path d="M8 15a4 4 0 0 1 8 0" />
        </svg>
      ),
    },
    {
      id: 'scorpio',
      name: 'Scorpio',
      sanskrit: 'Vrishchika',
      month: 'Month 8 (October - November)',
      dates: 'Oct 23 - Nov 21',
      element: 'Water',
      modality: 'Fixed (Sthira)',
      lord: 'Mars (Mangala) & Ketu',
      symbol: '♏',
      nakshatras: 'Vishakha (pada 4), Anuradha (4 padas), Jyeshtha (4 padas)',
      bodyPart: 'Reproductive organs, Excretory systems, Pelvic bones',
      coreTrait: 'Deep psychological perception, regenerative power, and mystic intensity.',
      karmicGift: 'Transforming base trauma into luminous spiritual gold through alchemical rebirth.',
      strengths: ['Uncanny psychological intuition', 'Unbreakable focus', 'Loyalty through crises', 'Fearless courage'],
      challenges: ['Vindictiveness', 'Possessive jealousy', 'Obsessive secrecy'],
      careerPaths: ['Investigative Intelligence', 'Psychiatry', 'Cybersecurity', 'Surgeon / Oncology', 'Occult / Esoteric Sciences'],
      compatibleSigns: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      luckyColor: 'Deep Maroon, Rust Red & Midnight Crimson',
      luckyNumber: '9 & 8',
      gemstone: 'Red Coral (Moonga) or Cat’s Eye (Lehsuniya)',
      mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namaha',
      deepArticle: `Scorpio (Vrishchika) is the profound alchemical crucible of the cosmos. Co-ruled by Mars (kinetic will) and Ketu (spiritual liberation), it represents the eighth house of psychological transformation, hidden wealth (Kundalini), and occult mysteries.

Containing the gentle, devoted Anuradha Nakshatra and the authoritative Jyeshtha, Scorpio operates with immense emotional depth. It detects deception effortlessly and thrives in high-stakes environments where others falter.

The sacred purpose of Scorpio is the journey from the venomous Scorpion, through the soaring Eagle of intellectual clarity, to the Phoenix of complete spiritual enlightenment.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4c2 0 3 2 3 5 0 3.5-1 9-1 11" />
          <path d="M7 9c0-3 2-5 4-5s3 2 3 5c0 3.5-1 9-1 11" />
          <path d="M14 9c0-3 2-5 4-5s3 2 3 5c0 4-1 9-1 11l4-4" />
          <path d="m19 14 2 2-2 2" />
        </svg>
      ),
    },
    {
      id: 'sagittarius',
      name: 'Sagittarius',
      sanskrit: 'Dhanu',
      month: 'Month 9 (November - December)',
      dates: 'Nov 22 - Dec 21',
      element: 'Fire',
      modality: 'Dual (Dwiswabhava)',
      lord: 'Jupiter (Brihaspati)',
      symbol: '♐',
      nakshatras: 'Mula (4 padas), Purva Ashadha (4 padas), Uttara Ashadha (pada 1)',
      bodyPart: 'Hips, Thighs, Sacral nerves, Arterial circulation',
      coreTrait: 'Philosophical optimism, pursuit of universal truth, and visionary wisdom.',
      karmicGift: 'Inspiring collective faith and expanding human consciousness toward divine Dharma.',
      strengths: ['Unshakeable optimism', 'Ethical vision', 'Expansive intellect', 'Spiritual preceptor'],
      challenges: ['Dogmatic preachiness', 'Reckless overpromising', 'Tactless bluntness'],
      careerPaths: ['Higher Education / Academia', 'Judiciary / Supreme Law', 'Philosophical Author', 'International Travel / Import', 'Spiritual Leadership'],
      compatibleSigns: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      luckyColor: 'Bright Saffron, Golden Yellow & Royal Indigo',
      luckyNumber: '3 & 9',
      gemstone: 'Natural Unheated Yellow Sapphire (Pukhraj)',
      mantra: 'Om Gram Greem Groum Sah Gurave Namaha',
      deepArticle: `Sagittarius (Dhanu) represents the divine arrow of human consciousness aimed toward the celestial heights. Governed by Brihaspati (Jupiter), it rules the auspicious ninth house of Dharma, higher philosophy, cosmic law, and sacred pilgrimages.

The sign commences with Mula Nakshatra—governed by Ketu and aligned with the Galactic Center—giving Sagittarius an irresistible urge to dig down to the foundational root of any mystery and shatter superficial illusions. It progresses through Purva Ashadha (invincible early victory) to Uttara Ashadha (permanent universal victory).

The spiritual destiny of Sagittarius is becoming a living lighthouse of wisdom: combining broad global vision with deep humility and ethical integrity.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="19" x2="19" y2="5" />
          <path d="M10 5h9v9" />
          <line x1="12" y1="12" x2="8" y2="16" />
        </svg>
      ),
    },
    {
      id: 'capricorn',
      name: 'Capricorn',
      sanskrit: 'Makara',
      month: 'Month 10 (December - January)',
      dates: 'Dec 22 - Jan 19',
      element: 'Earth',
      modality: 'Movable (Chara)',
      lord: 'Saturn (Shani)',
      symbol: '♑',
      nakshatras: 'Uttara Ashadha (padas 2-4), Shravana (4 padas), Dhanishta (padas 1-2)',
      bodyPart: 'Knees, Joints, Skeletal framework, Bones & Teeth',
      coreTrait: 'Strategic pragmatism, institutional discipline, and stoic endurance.',
      karmicGift: 'Building monumental, enduring systems that anchor societal order.',
      strengths: ['Unrivaled work ethic', 'Strategic patience', 'Administrative leadership', 'Dependability'],
      challenges: ['Cold cynicism', 'Workaholic isolation', 'Emotional suppression'],
      careerPaths: ['Corporate Governance', 'Government Administration', 'Civil Infrastructure', 'Heavy Industry', 'Financial Banking'],
      compatibleSigns: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      luckyColor: 'Charcoal Black, Navy Blue & Forest Brown',
      luckyNumber: '8 & 4',
      gemstone: 'Natural Blue Sapphire (Neelam) or Amethyst',
      mantra: 'Om Pram Preem Proum Sah Shanaischaraya Namaha',
      deepArticle: `Capricorn (Makara) is the mountain crocodile ascending the steepest peaks through patience and structural discipline. Ruled by Shani (Saturn), it governs the tenth house of vocational karma, public distinction, and governance.

Mars achieves its highest exaltation at 28° of Capricorn, demonstrating that raw warrior kinetic energy operates at maximum effectiveness when harnessed by Saturnian discipline and long-term planning.

The spiritual transformation of Capricorn is moving from seeking earthly status to becoming a humble trustee of cosmic order: building structures that outlive the ego and shelter future generations.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14c2-4 5-8 8-8s3 3 3 6c0 4-4 8-4 8" />
          <path d="M11 16c2 2 4 4 7 4a3 3 0 0 0 3-3c0-3-4-4-4-7" />
        </svg>
      ),
    },
    {
      id: 'aquarius',
      name: 'Aquarius',
      sanskrit: 'Kumbha',
      month: 'Month 11 (January - February)',
      dates: 'Jan 20 - Feb 18',
      element: 'Air',
      modality: 'Fixed (Sthira)',
      lord: 'Saturn (Shani) & Rahu',
      symbol: '♒',
      nakshatras: 'Dhanishta (padas 3-4), Shatabhisha (4 padas), Purva Bhadrapada (padas 1-3)',
      bodyPart: 'Calves, Shins, Ankles, Blood Circulation',
      coreTrait: 'Visionary humanitarianism, scientific innovation, and collective upliftment.',
      karmicGift: 'Channeling futuristic breakthroughs to liberate society from outdated dogma.',
      strengths: ['Inventive genius', 'Humanitarian empathy', 'Egalitarian vision', 'Unconventional insight'],
      challenges: ['Aloof emotional detachment', 'Stubborn eccentricity', 'Ideological fanaticism'],
      careerPaths: ['Artificial Intelligence / Tech', 'Aviation / Aerospace', 'Social Reform / NGOs', 'Quantum Physics', 'Renewable Energy'],
      compatibleSigns: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
      luckyColor: 'Electric Cyan, Royal Violet & Obsidian Blue',
      luckyNumber: '4 & 8',
      gemstone: 'Natural Blue Sapphire (Neelam) or Hessonite (Gomed)',
      mantra: 'Om Pram Preem Proum Sah Shanaischaraya Namaha',
      deepArticle: `Aquarius (Kumbha) is the celestial Water Bearer pouring out the urn of divine nectar for all humanity. Co-ruled by Saturn (duty) and Rahu (futuristic innovation), it governs the eleventh house of collective gains, social networks, and visionary fulfillment.

Containing Shatabhisha Nakshatra (the Star of a Hundred Healers/Physicians), Aquarius possesses deep capacity for scientific discovery, technological liberation, and holistic healing.

The sacred purpose of Aquarius is realizing universal brotherhood: understanding that true individuality shines brightest when serving the collective evolution of humanity.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10c3-3 6 3 9 0s6-3 9 0" />
          <path d="M3 16c3-3 6 3 9 0s6-3 9 0" />
        </svg>
      ),
    },
    {
      id: 'pisces',
      name: 'Pisces',
      sanskrit: 'Meena',
      month: 'Month 12 (February - March)',
      dates: 'Feb 19 - Mar 20',
      element: 'Water',
      modality: 'Dual (Dwiswabhava)',
      lord: 'Jupiter (Brihaspati) & Ketu',
      symbol: '♓',
      nakshatras: 'Purva Bhadrapada (pada 4), Uttara Bhadrapada (4 padas), Revati (4 padas)',
      bodyPart: 'Feet, Toes, Lymphatic fluids, Immune T-cells',
      coreTrait: 'Universal compassion, transcendent mysticism, and poetic imagination.',
      karmicGift: 'Dissolving ego boundaries to experience the unconditioned oneness of all existence.',
      strengths: ['Boundless empathy', 'Mystical insight', 'Artistic sensitivity', 'Spiritual devotion'],
      challenges: ['Escapist tendencies', 'Savior complex', 'Lack of practical boundaries'],
      careerPaths: ['Spiritual Ministry / Yoga', 'Music Composition', 'Cinematography', 'Philanthropy / Hospice', 'Oceanography'],
      compatibleSigns: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
      luckyColor: 'Sea Foam Green, Saffron & Pure Aqua',
      luckyNumber: '3 & 7',
      gemstone: 'Yellow Sapphire (Pukhraj) or Natural Pearl',
      mantra: 'Om Gram Greem Groum Sah Gurave Namaha',
      deepArticle: `Pisces (Meena) represents the oceanic dissolution of the individual ego back into the supreme source of Brahman. Co-ruled by Jupiter and Ketu, it rules the twelfth house of spiritual liberation (Moksha), dreams, deep meditation, and transcendental surrender.

Venus attains its supreme exaltation at 27° of Pisces in Revati Nakshatra, demonstrating that unconditional divine love (Prema) transcends worldly calculations and achieves immortality.

The ultimate destination of Pisces is pure self-realization: navigating earthly existence as a conscious vessel of divine grace, recognizing all beings as mirrors of the singular divine consciousness.`,
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16" />
          <path d="M7 4c3 4 3 12 0 16" />
          <path d="M17 4c-3 4-3 12 0 16" />
        </svg>
      ),
    },
  ];

  const currentSelectedSign = signs.find((s) => s.id === activeSign) || signs[0];

  const handleCardClick = (sign: ZodiacSignData) => {
    setActiveSign(sign.id);
    setModalSign(sign); // Immediately opens the full referred article & chart view!
    if (onSelectSign) {
      onSelectSign(sign.id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      {/* 1. Header Information */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F5D061', fontWeight: 700 }}>
            ✦ Sidereal Zodiac Masterclasses
          </span>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
            Know Yourself Through Your Sign
          </h3>
          <p style={{ fontSize: '13px', color: '#CBD5E1' }}>
            Click any of the 12 cosmic constellations to open its comprehensive natal blueprint, planetary rulership, and full chart dossier.
          </p>
        </div>
      </div>

      {/* 2. Responsive 12 Signs Grid */}
      <div
        className="zodiac-signs-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 130px), 1fr))',
          gap: '12px',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        {signs.map((sign) => {
          const isSelected = activeSign === sign.id;

          return (
            <div
              key={sign.id}
              onClick={() => handleCardClick(sign)}
              style={{
                cursor: 'pointer',
                borderRadius: '12px',
                padding: '16px 12px',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(245, 208, 97, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)'
                  : 'rgba(14, 18, 36, 0.75)',
                border: isSelected ? '1.5px solid #F5D061' : '1px solid rgba(245, 208, 97, 0.16)',
                boxShadow: isSelected ? '0 10px 30px rgba(245, 208, 97, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 180ms ease',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(245, 208, 97, 0.45)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(245, 208, 97, 0.16)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <div style={{ marginBottom: '10px' }}>{sign.iconSvg}</div>

              <span
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: isSelected ? '#FFFFFF' : '#F1F5F9',
                  marginBottom: '2px',
                }}
              >
                {sign.name}
              </span>

              <span style={{ fontSize: '11px', color: '#F5D061', fontWeight: 600, marginBottom: '4px' }}>
                {sign.sanskrit} • {sign.symbol}
              </span>

              <span style={{ fontSize: '10px', color: '#94A3B8' }}>
                {sign.dates}
              </span>

              <span
                style={{
                  marginTop: '8px',
                  fontSize: '10px',
                  color: '#38BDF8',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                View Chart →
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. Selected Sign Highlight Banner */}
      <div
        className="zodiac-highlight-banner"
        style={{
          padding: '22px 26px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(16, 22, 44, 0.95) 0%, rgba(9, 12, 24, 0.98) 100%)',
          border: '1.5px solid rgba(245, 208, 97, 0.35)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '22px',
          alignItems: 'center',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.85)',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '28px', color: '#F5D061' }}>{currentSelectedSign.symbol}</span>
            <div>
              <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
                {currentSelectedSign.name} ({currentSelectedSign.sanskrit})
              </h4>
              <span style={{ fontSize: '12px', color: '#F5D061', fontWeight: 600 }}>
                {currentSelectedSign.month} • {currentSelectedSign.dates}
              </span>
            </div>
          </div>
          <p style={{ fontSize: '13.5px', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '14px' }}>
            {currentSelectedSign.coreTrait}
          </p>

          <button
            type="button"
            onClick={() => setModalSign(currentSelectedSign)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              background: 'linear-gradient(135deg, #F5D061 0%, #D97706 100%)',
              color: '#06070E',
              fontWeight: 800,
              fontSize: '13px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(245, 208, 97, 0.4)',
            }}
          >
            <BookOpen size={16} />
            <span>Open Complete {currentSelectedSign.name} Chart & Deep Guide</span>
          </button>
        </div>

        <div className="zodiac-highlight-right" style={{ borderLeft: '1px solid rgba(245, 208, 97, 0.2)', paddingLeft: '22px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px', fontSize: '12.5px' }}>
            <div>
              <span style={{ color: '#94A3B8', display: 'block' }}>Element:</span>
              <strong style={{ color: '#FFFFFF' }}>{currentSelectedSign.element}</strong>
            </div>
            <div>
              <span style={{ color: '#94A3B8', display: 'block' }}>Ruling Lord:</span>
              <strong style={{ color: '#F5D061' }}>{currentSelectedSign.lord}</strong>
            </div>
            <div>
              <span style={{ color: '#94A3B8', display: 'block' }}>Modality:</span>
              <strong style={{ color: '#FFFFFF' }}>{currentSelectedSign.modality}</strong>
            </div>
            <div>
              <span style={{ color: '#94A3B8', display: 'block' }}>Body Anatomy:</span>
              <strong style={{ color: '#38BDF8' }}>{currentSelectedSign.bodyPart}</strong>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11.5px', color: '#10B981', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
              ✦ Karmic Superpower:
            </span>
            <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
              {currentSelectedSign.karmicGift}
            </p>
          </div>
        </div>
      </div>

      {/* 4. EXPANSIVE SIGN MASTERCLASS & CHART MODAL */}
      {modalSign && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(6, 7, 14, 0.88)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              backgroundColor: '#0A0D1B',
              border: '1.5px solid rgba(245, 208, 97, 0.35)',
              borderRadius: '16px',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 208, 97, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(245, 208, 97, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, rgba(245, 208, 97, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '36px', color: '#F5D061' }}>{modalSign.symbol}</span>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
                    {modalSign.name} ({modalSign.sanskrit})
                  </h2>
                  <span style={{ fontSize: '12.5px', color: '#F5D061', fontWeight: 600 }}>
                    {modalSign.month} • {modalSign.dates} • Lord: {modalSign.lord}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalSign(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  color: '#CBD5E1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div
              style={{
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Quick Specs Pill Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '10px',
                }}
              >
                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Element & Modality</span>
                  <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{modalSign.element} • {modalSign.modality}</strong>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Governing Lord</span>
                  <strong style={{ fontSize: '13px', color: '#F5D061' }}>{modalSign.lord}</strong>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Lucky Colors & Numbers</span>
                  <strong style={{ fontSize: '13px', color: '#38BDF8' }}>{modalSign.luckyColor} (Nos: {modalSign.luckyNumber})</strong>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Vedic Gemstone</span>
                  <strong style={{ fontSize: '13px', color: '#34D399' }}>{modalSign.gemstone}</strong>
                </div>
              </div>

              {/* Constellation Nakshatras */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(245, 208, 97, 0.08)',
                  border: '1px solid rgba(245, 208, 97, 0.25)',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#F5D061', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '4px' }}>
                  ✦ Stellar Constellations Inside {modalSign.name}
                </span>
                <p style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>
                  {modalSign.nakshatras}
                </p>
              </div>

              {/* Deep Article Explanation */}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} color="#F5D061" />
                  <span>The Cosmic Blueprint of {modalSign.name} ({modalSign.sanskrit})</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {modalSign.deepArticle.split('\n\n').map((para, i) => (
                    <p key={i} style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: 1.7 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Strengths & Challenges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(52, 211, 153, 0.06)', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#34D399', display: 'block', marginBottom: '8px' }}>
                    ✦ Core Strengths & Powers
                  </span>
                  <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#E2E8F0' }}>
                    {modalSign.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(248, 113, 113, 0.06)', border: '1px solid rgba(248, 113, 113, 0.2)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#F87171', display: 'block', marginBottom: '8px' }}>
                    ✦ Karmic Pitfalls & Growth Edges
                  </span>
                  <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#E2E8F0' }}>
                    {modalSign.challenges.map((ch, idx) => (
                      <li key={idx}>{ch}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Career & Love Synastry */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Briefcase size={16} />
                    <span>Prime Vocational Trajectories</span>
                  </span>
                  <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                    {modalSign.careerPaths.join(' • ')}
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#F472B6', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Heart size={16} />
                    <span>Auspicious Partner Synastry</span>
                  </span>
                  <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                    Best compatibility with: <strong style={{ color: '#FFFFFF' }}>{modalSign.compatibleSigns.join(', ')}</strong>
                  </p>
                </div>
              </div>

              {/* Sacred Mantra Box */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(245, 208, 97, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
                  border: '1px solid rgba(245, 208, 97, 0.3)',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5D061', fontWeight: 700 }}>
                  Sacred Planetary Beej Mantra
                </span>
                <p style={{ fontSize: '15px', color: '#FFFFFF', fontFamily: 'monospace', fontWeight: 700, margin: '6px 0' }}>
                  {modalSign.mantra}
                </p>
                <span style={{ fontSize: '11px', color: '#CBD5E1' }}>
                  Recite 108 times at sunrise or dusk to harmonize planetary energies.
                </span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(245, 208, 97, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <button
                type="button"
                onClick={() => setModalSign(null)}
                style={{
                  padding: '10px 18px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '8px',
                  color: '#CBD5E1',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close Dossier
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                {onAskAI && (
                  <button
                    type="button"
                    onClick={() => {
                      setModalSign(null);
                      onAskAI(`Tell me my complete astrological forecast and karma lessons for ${modalSign.name} (${modalSign.sanskrit})`);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      background: 'rgba(139, 92, 246, 0.2)',
                      border: '1px solid rgba(139, 92, 246, 0.5)',
                      borderRadius: '8px',
                      color: '#C084FC',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <Sparkles size={15} />
                    <span>Ask Astrologer about {modalSign.name}</span>
                  </button>
                )}

                {onOpenChart && (
                  <button
                    type="button"
                    onClick={() => {
                      setModalSign(null);
                      onOpenChart(modalSign.id);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 18px',
                      background: 'linear-gradient(135deg, #F5D061 0%, #D97706 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#06070E',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(245, 208, 97, 0.4)',
                    }}
                  >
                    <PieChart size={15} />
                    <span>Calculate Birth Chart</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          .zodiac-highlight-banner {
            padding: 16px !important;
            gap: 16px !important;
          }
          .zodiac-highlight-right {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid rgba(245, 208, 97, 0.2) !important;
            padding-top: 14px !important;
          }
        }
      `}</style>
    </div>
  );
};
