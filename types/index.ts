export type LanguageCode =
  | 'en'
  | 'hi'
  | 'hinglish'
  | 'bn'
  | 'ta'
  | 'te'
  | 'mr'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or'
  | 'as'
  | 'ur'
  | 'ar';

export type AstrologySystem = 'western' | 'vedic';
export type ZodiacSystem = 'tropical' | 'sidereal';
export type HouseSystem = 'placidus' | 'whole-sign';

export interface BirthProfile {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthPlace: string;
  latitude: number;
  longitude: number;
  timezone: string;
  gender?: string;
  astrologySystem: AstrologySystem;
  zodiacSystem: ZodiacSystem;
  houseSystem: HouseSystem;
  preferredLanguage: LanguageCode;
}

export type ProfileRelationship =
  | 'Me'
  | 'Partner'
  | 'Child'
  | 'Parent'
  | 'Sibling'
  | 'Friend'
  | 'Other';

export interface UserFamilyProfile extends BirthProfile {
  id: string;
  relationship: ProfileRelationship;
  isDefault?: boolean;
  avatarUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type PlanTier = 'free' | 'basic' | 'premium';
export type BillingCycle = 'monthly' | 'yearly';

export interface UserProfile extends BirthProfile {
  id: string;
  email: string;
  avatarUrl?: string;
  isPremium: boolean; // true if basic or premium
  planTier: PlanTier;
  createdAt: string;
}

export type ZodiacSignName =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type PlanetName =
  | 'Sun'
  | 'Moon'
  | 'Mercury'
  | 'Venus'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune'
  | 'Pluto'
  | 'Ascendant'
  | 'Midheaven'
  | 'Rahu'
  | 'Ketu';

export interface PlanetPosition {
  name: PlanetName;
  symbol: string;
  sign: ZodiacSignName;
  signSymbol: string;
  degree: number;
  minute: number;
  absoluteDegree: number;
  house: number;
  isRetrograde: boolean;
  isCombust?: boolean;
  speed?: number;
  dignity?: 'Exalted' | 'Moolatrikona' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy' | 'Debilitated';
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  nakshatra?: {
    name: string;
    lord: string;
    pada: number;
  };
}

export type PlanetaryPlacement = PlanetPosition;

export interface HousePosition {
  house: number;
  sign: ZodiacSignName;
  degree: number;
  minute: number;
  ruler: PlanetName;
  planets: PlanetName[];
}

export type AspectType = 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';

export interface AspectData {
  planet1: PlanetName;
  planet2: PlanetName;
  type: AspectType;
  angle: number;
  orb: number;
  isHarmonious: boolean;
  symbol: string;
}

export interface TransitData {
  planet: PlanetName;
  currentSign: ZodiacSignName;
  degree: number;
  isRetrograde: boolean;
  aspectsNatalPlanet?: PlanetName;
  aspectType?: AspectType;
  impactTheme: string;
  duration: string;
}

export interface DashaPeriod {
  planet: PlanetName | string;
  startDate: string;
  endDate: string;
  durationYears: number;
  isCurrent?: boolean;
}

export interface VimshottariDashaData {
  birthDashaLord: string;
  balanceYearsRemaining: number;
  currentMahadasha: string;
  currentAntardasha: string;
  currentPratyantardasha?: string;
  timeline: {
    mahadasha: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    antardashas: {
      antardasha: string;
      startDate: string;
      endDate: string;
      isCurrent: boolean;
    }[];
  }[];
}

export interface NatalChart {
  userId?: string;
  calculatedAt: string;
  system: AstrologySystem;
  zodiac: ZodiacSystem;
  houseSystem: HouseSystem;
  ascendant: PlanetPosition;
  midheaven: PlanetPosition;
  planets: PlanetPosition[];
  houses: HousePosition[];
  aspects: AspectData[];
  ascendantSign?: ZodiacSignName;
  ascendantDegree?: number;
  moonSign?: ZodiacSignName;
  nakshatra?: string;
  nakshatraPada?: number;
  currentMahadasha?: { planet: string; endsAt: string };
  vedic?: {
    moonSign: ZodiacSignName;
    sunSign: ZodiacSignName;
    ascendantSign: ZodiacSignName;
    birthNakshatra: string;
    nakshatraPada: number;
    currentDasha: {
      mahadasha: string;
      antardasha: string;
      endsAt: string;
    };
    d9Navamsa?: {
      ascendantSign: ZodiacSignName;
      planetaryNavamsas: { planet: PlanetName; sign: ZodiacSignName; isVargottama: boolean }[];
    };
  };
}

export type AIIntent =
  | 'GENERAL_CHAT'
  | 'ASTROLOGY_QUERY'
  | 'CHART_ANALYSIS'
  | 'TRANSIT_QUERY'
  | 'CAREER_ASTROLOGY'
  | 'RELATIONSHIP_ASTROLOGY'
  | 'FINANCE_ASTROLOGY'
  | 'HEALTH_ASTROLOGY'
  | 'SPECIALIST_CHAT'
  | 'CALCULATOR_QUERY'
  | 'REPORT_QUERY'
  | 'COMMUNITY'
  | 'SAFETY_DISCLAIMER';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  text?: string;
  timestamp: string;
  intent?: AIIntent;
  specialistId?: string;
  astrologyContextUsed?: boolean;
  astrologyContextData?: {
    planet?: string;
    house?: string;
    sign?: string;
    theme?: string;
    toolUsed?: string;
    findings?: Record<string, any>;
  };
  sources?: any[];
  feedback?: 'like' | 'dislike';
  isSaved?: boolean;
  thinking?: string;
  thoughtDuration?: number;
  searchGrounding?: any[];
  mapsGrounding?: any;
}

export interface AIConversation {
  id: string;
  userId: string;
  specialistId?: string;
  title: string;
  language: LanguageCode;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  mode: 'astrology' | 'general' | 'auto';
  messages: AIMessage[];
}

// -------------------------------------------------------------
// SPECIALIST AI ASTROLOGER SYSTEM (REPLACES 8 CONSULTANTS)
// -------------------------------------------------------------
export type SpecialistId =
  | 'classic'
  | 'love_relationships'
  | 'career_wealth'
  | 'daily_guidance';

export interface AISpecialist {
  id: SpecialistId | string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string; // lucide icon identifier
  accentColor: string;
  badgeLabel: string;
  isFreeTier: boolean; // Accessible on Free plan
  focusAreas: string[];
  preferredTools: string[];
  allowedTools: string[];
  suggestedPrompts: string[];
  systemPrompt: string;
  responseStyle: string;
  active: boolean;
}

export interface SpecialistSession {
  id: string;
  userId: string;
  specialistId: string;
  specialistName: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  maxDurationSeconds: number; // 1200 for Free (20 min), Infinity for Pro
  status: 'not_started' | 'active' | 'warning' | 'ended' | 'expired';
  messages: AIMessage[];
}

// Legacy aliases for backwards compatibility during migration
export type AIConsultantPersona = AISpecialist;
export type ConsultationSession = SpecialistSession;

// -------------------------------------------------------------
// SUBSCRIPTION, ENTITLEMENTS & PAYMENTS (INDIA-FIRST INR)
// -------------------------------------------------------------
export type EntitlementKey =
  | 'AI_BASIC_CHAT'
  | 'AI_UNLIMITED_CHAT'
  | 'BASIC_CHART'
  | 'ADVANCED_CHART'
  | 'ADVANCED_TRANSITS'
  | 'LOVE_COMPATIBILITY'
  | 'MONTHLY_PREDICTIONS'
  | 'SPECIALIST_CLASSIC'
  | 'SPECIALIST_ALL'
  | 'SPECIALIST_ALL_MODES'
  | 'VIP_SUPPORT'
  | 'CONSULTATION_TIMED_20MIN'
  | 'CONSULTATION_UNLIMITED'
  | 'FAMILY_CHARTS'
  | 'BUSINESS_ASTROLOGY'
  | 'PREMIUM_COMMUNITY'
  | 'PRIORITY_AI_QUEUE'
  | 'FULL_REPORTS_ACCESS';

export interface SubscriptionPlan {
  id: string;
  tier: PlanTier;
  name: string;
  subtitle: string;
  monthlyPrice: number; // in INR ₹
  yearlyPrice: number; // in INR ₹
  currency: '₹';
  badge?: string;
  features: string[];
  entitlements: EntitlementKey[];
  consultantLimit?: number;
  consultationDurationLimitMinutes: number | null; // 20 or null (unlimited)
  isPopular?: boolean;
}

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'paused'
  | 'cancelled'
  | 'expired';

export interface UserSubscription {
  id: string;
  userId: string;
  tier: PlanTier;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  startDate: string;
  renewalDate: string;
  cancelDate?: string;
  autoRenew: boolean;
  currency: '₹';
  amount: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethodType = 'UPI' | 'Card' | 'NetBanking' | 'Wallet';

export type PaymentStatus =
  | 'created'
  | 'pending'
  | 'processing'
  | 'successful'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface PaymentTransaction {
  id: string;
  userId: string;
  subscriptionId: string;
  tier: PlanTier;
  billingCycle: BillingCycle;
  amount: number;
  currency: '₹';
  method: PaymentMethodType;
  status: PaymentStatus;
  provider: 'Razorpay' | 'UPI_Direct';
  invoiceId: string;
  createdAt: string;
}

export interface BillingInvoice {
  id: string;
  transactionId: string;
  date: string;
  planName: string;
  amount: number;
  currency: '₹';
  status: 'Paid' | 'Refunded' | 'Failed';
  invoiceNumber: string;
}

// -------------------------------------------------------------
// NORMALIZED ASTROLOGY RESULT STANDARD (SECTION 86)
// -------------------------------------------------------------
export interface RelatedToolLink {
  id: string;
  title: string;
  category?: string;
  actionPayload?: any;
}

export interface AstrologyResultObject<T = any> {
  toolId: string;
  toolName: string;
  calculationVersion: string;
  input: Record<string, any>;
  calculatedAt: string;
  chartData?: any;
  findings: T;
  interpretation: {
    summary: string;
    whatThisMeans: string;
    howCalculated: string;
    traditionalContext: string;
    guidance?: string[];
    quality?: 'Good' | 'Neutral' | 'Avoid';
    score?: number;
    maxScore?: number;
  };
  warnings?: string[];
  relatedTools: RelatedToolLink[];
  disclaimer: string;
}

// -------------------------------------------------------------
// DAILY PANCHANG & TIMING MODELS (SECTIONS 10-16)
// -------------------------------------------------------------
export interface ChoghadiyaPeriod {
  name: string;
  ruler: string;
  startTime: string;
  endTime: string;
  classification: 'Good' | 'Neutral' | 'Avoid';
  isDay: boolean;
  isCurrent?: boolean;
}

export interface GowriPeriod {
  name: string;
  startTime: string;
  endTime: string;
  quality: 'Good' | 'Neutral' | 'Avoid';
  isDay: boolean;
  isCurrent?: boolean;
}

export interface HoraPeriod {
  hourNumber: number;
  planet: PlanetName;
  startTime: string;
  endTime: string;
  traditionalTheme: string;
  recommendedActivities: string[];
  isCurrent?: boolean;
}

export interface DailyPanchangData {
  date: string;
  locationName: string;
  latitude: number;
  longitude: number;
  timezone: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  tithi: {
    number: number;
    name: string;
    paksha: 'Shukla' | 'Krishna';
    progressPercent: number;
  };
  vara: {
    name: string;
    lord: PlanetName;
  };
  nakshatra: {
    name: string;
    lord: string;
    pada: number;
  };
  yoga: {
    name: string;
    meaning: string;
  };
  karana: {
    name: string;
    type: string;
  };
  sunSign: ZodiacSignName;
  moonSign: ZodiacSignName;
  vikramSamvat: number;
  shakaSamvat: number;
  rahuKaal: { start: string; end: string };
  yamaganda: { start: string; end: string };
  gulika: { start: string; end: string };
  abhijitMuhurta: { start: string; end: string };
  brahmaMuhurta: { start: string; end: string };
  summary: string;
}

// -------------------------------------------------------------
// KUNDLI MATCHING ASHTAKOOT MODELS (SECTION 19)
// -------------------------------------------------------------
export interface AshtakootScoreItem {
  koota: string;
  score: number;
  maxScore: number;
  area: string;
  meaning: string;
  isFavourable: boolean;
  details: string;
}

export interface KundliMatchResult {
  personA: {
    name: string;
    moonSign: ZodiacSignName;
    nakshatra: string;
    pada: number;
  };
  personB: {
    name: string;
    moonSign: ZodiacSignName;
    nakshatra: string;
    pada: number;
  };
  totalScore: number;
  maxScore: 36;
  percentage: number;
  kootas: AshtakootScoreItem[];
  doshaChecks: {
    mangalDoshaA: boolean;
    mangalDoshaB: boolean;
    nadiDosha: boolean;
    bhakootDosha: boolean;
    mitigationNotes?: string[];
  };
  traditionalCompatibilityVerdict: string;
  relationshipStrengths: string[];
  relationshipCautions: string[];
}

// -------------------------------------------------------------
// NUMEROLOGY MODELS (SECTIONS 48-58)
// -------------------------------------------------------------
export interface NumerologyAnalysis {
  mulank: number; // Radical / birth day number (1-9)
  bhagyank: number; // Life Path / full date sum (1-9, or 11/22/33)
  rulingPlanet: PlanetName;
  element: string;
  luckyColors: string[];
  luckyDays: string[];
  friendlyNumbers: number[];
  challengingNumbers: number[];
  traits: string[];
  calculationSteps: string[];
}

export interface LoShuGridData {
  grid: (number | null)[][]; // 3x3 array
  presentNumbers: number[];
  missingNumbers: number[];
  numberFrequency: Record<number, number>;
  planes: {
    name: string;
    numbers: number[];
    isComplete: boolean;
    interpretation: string;
  }[];
}

// -------------------------------------------------------------
// ASTROLOGY REPORTS MODELS (SECTIONS 60-73)
// -------------------------------------------------------------
export type ReportType =
  | 'life-insights'
  | 'love-marriage'
  | 'career-wealth'
  | 'dosha-analysis'
  | 'dasha-timeline'
  | 'remedies-gemstones'
  | 'varshaphala'
  | 'transit-forecast'
  | 'compatibility'
  | 'numerology-blueprint'
  | 'dasha'
  | 'saturn'
  | 'mangal-dosha'
  | 'kalsarp-dosha'
  | 'pitra-dosha'
  | 'raj-yoga'
  | 'gemstone'
  | 'videsh-yoga';

export interface ReportEvidence {
  factor?: string;
  placement?: string;
  influence?: string;
  finding?: string;
  source?: 'calculated_chart' | 'ephemeris' | 'dasha_engine' | 'transit_engine';
  confidence?: 'astronomical' | 'traditional_rule';
  interpretationRuleId?: string;
}

export interface ReportChapter {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  summary: string;
  content?: string;
  evidence?: ReportEvidence[];
  evidencePoints?: ReportEvidence[];
  contentParagraphs?: string[];
  traditionalInsights?: string[];
  practicalRemedies?: string[];
}

export interface AstrologyReport {
  id: string;
  userId: string;
  profileName: string;
  type?: ReportType;
  reportType: ReportType;
  title: string;
  generatedAt: string;
  chapters: ReportChapter[];
  keyStrengths: string[];
  keyGrowthAreas: string[];
  traditionalRemedies: string[];
  disclaimer: string;
  isSaved?: boolean;
}

// -------------------------------------------------------------
// SAVED CALCULATION / HISTORY (SECTION 89)
// -------------------------------------------------------------
export interface SavedCalculationItem {
  id: string;
  toolId: string;
  toolName: string;
  calculatedAt: string;
  inputSummary: string;
  resultSummary: string;
  profileName: string;
  resultData?: any;
  title?: string;
  summary?: string;
  timestamp?: string;
}

export type CalculationHistoryItem = SavedCalculationItem;

// -------------------------------------------------------------
// BABY NAMES DIRECTORY (SECTION 59)
// -------------------------------------------------------------
export interface BabyNameEntry {
  id: string;
  name: string;
  gender: 'Boy' | 'Girl' | 'Unisex';
  rashi: ZodiacSignName;
  startingSound: string;
  nakshatra: string;
  meaning: string;
  origin: string;
  isFavorite?: boolean;
}

// -------------------------------------------------------------
// SHUBH MUHURAT (SECTION 17)
// -------------------------------------------------------------
export interface ShubhMuhuratEntry {
  id: string;
  category: 'Marriage' | 'Vehicle' | 'Griha Pravesh' | 'Property' | 'Business' | 'Ceremony';
  title: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  nakshatra: string;
  tithi: string;
  auspiciousness: 'Most Auspicious' | 'Auspicious' | 'Moderate';
  notes: string;
}

// -------------------------------------------------------------
// LEARN ASTROLOGY & GLOSSARY (SECTIONS 74-81)
// -------------------------------------------------------------
export interface LearningArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  branch: 'Vedic' | 'Western' | 'KP' | 'Numerology' | 'Reports';
  category: string;
  readingTime: string;
  content: string[];
  keyTakeaways: string[];
  relatedTools: { id: string; title: string }[];
  faqs: { question: string; answer: string }[];
  lastUpdated: string;
}

export interface GlossaryEntry {
  term: string;
  sanskritName?: string;
  transliteration?: string;
  category: 'Vedic' | 'Western' | 'Panchang' | 'Timing' | 'KP' | 'Remedies';
  definition: string;
  simpleExplanation: string;
  technicalExplanation: string;
  relatedTerms: string[];
  relatedTools: { id: string; title: string }[];
}

// -------------------------------------------------------------
// COMMUNITY & NOTIFICATIONS
// -------------------------------------------------------------
export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorSign?: ZodiacSignName;
  isVerified?: boolean;
  isPremiumPost?: boolean;
  createdAt: string;
  title: string;
  content: string;
  hashtags: string[];
  astrologyTag: string;
  imageUrl?: string;
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  isFollowingAuthor?: boolean;
  commentCount: number;
  comments?: PostComment[];
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorSign?: ZodiacSignName;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'insight' | 'specialist' | 'community' | 'system' | 'ai';
  isRead: boolean;
  link?: string;
}
