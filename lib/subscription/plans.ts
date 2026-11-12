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
    consultationDurationLimitMinutes: 15,
    features: [
      'Daily Horoscope & Panchang Summary',
      'Basic Zodiac Insights & Energy',
      'Weekly Cosmic Forecast',
      'Community Discussions Access',
      'Basic Birth Chart (Sun, Moon, Rising)',
      'AstroRashi Specialist Access (1 Mode only)',
      '15 Minutes consultation session limit ONLY AFTER THAT NO ACCESS',
      'Life Insights & Cosmic Blueprint ACCESS ONLY (Birth chart PDF & Kundli match locked)',
      'Only 2 Astrology Tools accessible (Others locked)',
      'Only 2 Reports download accessible',
    ],
    entitlements: [
      'AI_BASIC_CHAT',
      'BASIC_CHART',
      'SPECIALIST_CLASSIC',
      'CONSULTATION_TIMED_20MIN',
    ],
  },
  {
    id: 'plan_premium',
    tier: 'premium',
    name: 'Premium',
    subtitle: 'Everything unlimited available features (₹89/mo or ₹599/yr)',
    monthlyPrice: 89,
    yearlyPrice: 599, // ₹599/year (Save ~44%)
    currency: '₹',
    badge: 'Ultimate VIP',
    isPopular: true,
    consultantLimit: 4,
    consultationDurationLimitMinutes: null, // Unlimited
    features: [
      'Everything Unlimited & 100% Accessible (No Restrictions)',
      'Unlimited Astrologer Chat & All Specialist Modes',
      'Advanced Sidereal & Tropical Natal Suite',
      'Full Transit Analysis & Sade Sati Tracker',
      'Career & Financial Cycles Astrology',
      'Family Chart Multi-Profile Support',
      'Business Astrology (Founding Chart Timing)',
      'Full Birth Chart Dossier PDF Direct Download',
      'Kundli Match with Ashtakoot 36-Point Analysis',
      'All 33+ Calculators & Astrology Tools Unlocked',
      'All 10 In-Depth Certified Reports Unlocked',
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

export function getPlanByTier(tier: 'free' | 'basic' | 'premium' | string): SubscriptionPlan {
  if (tier === 'basic' || tier === 'premium') {
    return SUBSCRIPTION_PLANS.find((p) => p.tier === 'premium') || SUBSCRIPTION_PLANS[1];
  }
  return SUBSCRIPTION_PLANS.find((p) => p.tier === 'free') || SUBSCRIPTION_PLANS[0];
}

export function getPlanPrice(plan: SubscriptionPlan, cycle: 'monthly' | 'yearly'): number {
  return cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
}
