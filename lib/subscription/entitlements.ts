import { EntitlementKey, SubscriptionPlan, UserProfile } from '@/types';
import { getPlanByTier, SUBSCRIPTION_PLANS } from './plans';
import { canAccessSpecialist as checkSpecialistAccess, getSpecialistById } from '../specialists/config';

export function getUserPlan(user: UserProfile): SubscriptionPlan {
  const tier = user.planTier === 'premium' || user.isPremium ? 'premium' : 'free';
  return getPlanByTier(tier);
}

export function getUserEntitlements(user: UserProfile): EntitlementKey[] {
  const plan = getUserPlan(user);
  return plan.entitlements;
}

export function canUse(user: UserProfile, entitlement: EntitlementKey): boolean {
  const entitlements = getUserEntitlements(user);
  return entitlements.includes(entitlement);
}

export function canAccessSpecialist(user: UserProfile, specialistId: string): boolean {
  return checkSpecialistAccess(user, specialistId);
}

// Backward-compatible alias
export function canAccessConsultant(user: UserProfile, consultantId: string): boolean {
  return checkSpecialistAccess(user, consultantId);
}

export function getConsultationDurationLimit(user: UserProfile): number | null {
  const plan = getUserPlan(user);
  // Returns number in seconds (e.g. 1200 for 20 mins) or null if unlimited
  if (plan.consultationDurationLimitMinutes !== null) {
    return plan.consultationDurationLimitMinutes * 60;
  }
  return null;
}
