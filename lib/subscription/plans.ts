import { SubscriptionPlan } from '@/types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_free',
    tier: 'free',
    name: 'Free',
    subtitle: 'Begin your cosmic journey',
    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: '₹',
    consultantLimit: 1,
    consultationDurationLimitMinutes: 20,
    features: [
      'Daily Horoscope & Panchang Summary',
      'Basic Zodiac Insights & Energy',
      'Weekly Cosmic Forecast',
      'Community Discussions Access',
      'Basic Birth Chart (Sun, Moon, Rising)',
      'Cosmic Chat Assistant',
      'AstroNex Specialist Access',
      '20 Minutes consultation session limit',
    ],
    entitlements: [
      'AI_BASIC_CHAT',
      'BASIC_CHART',
      'SPECIALIST_CLASSIC',
      'CONSULTATION_TIMED_20MIN',
    ],
  },
  {
    id: 'plan_basic',
    tier: 'basic',
    name: 'Basic',
    subtitle: 'Unlock deeper insights & unlimited consultations',
    monthlyPrice: 199,
    yearlyPrice: 1999, // saves ~₹389/year
    currency: '₹',
    badge: 'Most Popular',
    isPopular: true,
    consultantLimit: 4,
    consultationDurationLimitMinutes: null, // Unlimited
    features: [
      'Everything in Free Plan',
      'Advanced Birth Chart Analysis & Aspects',
      'Advanced Cosmic Intelligence with chart memory',
      'Unlimited Assistant Chat',
      'Unlimited Expert Astrologer Consultation (No Timer)',
      'Access to All AstroNex Specialist Modes',
      '33+ Calculators (Kundli Match, Sade Sati, Yogas)',
      '10 In-Depth Certified Reports',
      'Vedic Sidereal & Western Tropical Systems',
      'Priority Response Queue & Multilingual Engine',
    ],
    entitlements: [
      'AI_BASIC_CHAT',
      'AI_UNLIMITED_CHAT',
      'BASIC_CHART',
      'ADVANCED_CHART',
      'ADVANCED_TRANSITS',
      'LOVE_COMPATIBILITY',
      'MONTHLY_PREDICTIONS',
      'SPECIALIST_ALL_MODES',
      'CONSULTATION_UNLIMITED',
      'PREMIUM_COMMUNITY',
      'PRIORITY_AI_QUEUE',
    ],
  },
  {
    id: 'plan_premium',
    tier: 'premium',
    name: 'Premium',
    subtitle: 'The complete cosmic & family experience',
    monthlyPrice: 799,
    yearlyPrice: 7990, // saves ~₹1598/year
    currency: '₹',
    badge: 'Ultimate Power',
    consultantLimit: 4,
    consultationDurationLimitMinutes: null, // Unlimited
    features: [
      'Everything in Basic Plan',
      'Unlimited Astrologer Chat & All Specialist Modes',
      'Advanced Sidereal & Tropical Natal Suite',
      'Full Transit Analysis & Sade Sati Tracker',
      'Career & Financial Cycles Astrology',
      'Family Chart Multi-Profile Support',
      'Business Astrology (Founding Chart Timing)',
      'VIP Priority Support & Early Feature Access',
      'Premium Community Verified Badge',
    ],
    entitlements: [
      'AI_BASIC_CHAT',
      'AI_UNLIMITED_CHAT',
      'BASIC_CHART',
      'ADVANCED_CHART',
      'ADVANCED_TRANSITS',
      'LOVE_COMPATIBILITY',
      'MONTHLY_PREDICTIONS',
      'SPECIALIST_ALL_MODES',
      'CONSULTATION_UNLIMITED',
      'FAMILY_CHARTS',
      'PREMIUM_COMMUNITY',
      'PRIORITY_AI_QUEUE',
      'VIP_SUPPORT',
    ],
  },
];

export function getPlanByTier(tier: 'free' | 'basic' | 'premium'): SubscriptionPlan {
  return SUBSCRIPTION_PLANS.find((p) => p.tier === tier) || SUBSCRIPTION_PLANS[0];
}

export function getPlanPrice(plan: SubscriptionPlan, cycle: 'monthly' | 'yearly'): number {
  return cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
}
