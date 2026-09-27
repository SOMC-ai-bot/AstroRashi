'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BillingCycle,
  BillingInvoice,
  EntitlementKey,
  PaymentMethodType,
  PlanTier,
  SubscriptionPlan,
  UserSubscription,
} from '@/types';
import { useAuth } from './auth-context';
import { getPlanByTier, SUBSCRIPTION_PLANS } from '../subscription/plans';
import {
  canAccessConsultant,
  canUse,
  getConsultationDurationLimit,
  getUserEntitlements,
  getUserPlan,
} from '../subscription/entitlements';
import { paymentProvider } from '../subscription/payment-provider';

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan;
  userSubscription: UserSubscription | null;
  billingHistory: BillingInvoice[];
  isUpgradeModalOpen: boolean;
  requiredFeatureName: string | null;
  openUpgradeModal: (featureName?: string) => void;
  closeUpgradeModal: () => void;
  subscribeToPlan: (
    tier: PlanTier,
    cycle: BillingCycle,
    method: PaymentMethodType
  ) => Promise<boolean>;
  cancelSubscription: () => void;
  restorePurchases: () => Promise<boolean>;
  canAccess: (key: EntitlementKey) => boolean;
  canAccessPersona: (consultantId: string) => boolean;
  consultationDurationLimit: number | null;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

const STORAGE_SUB_KEY = 'astronex_active_sub_v2';
const STORAGE_INVOICES_KEY = 'astronex_invoices_v2';

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user, updatePlan } = useAuth();

  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [billingHistory, setBillingHistory] = useState<BillingInvoice[]>([]);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [requiredFeatureName, setRequiredFeatureName] = useState<string | null>(null);

  // Initialize subscription from localStorage
  useEffect(() => {
    try {
      const savedSub = localStorage.getItem(STORAGE_SUB_KEY);
      if (savedSub) {
        setUserSubscription(JSON.parse(savedSub));
      }
      const savedInvoices = localStorage.getItem(STORAGE_INVOICES_KEY);
      if (savedInvoices) {
        setBillingHistory(JSON.parse(savedInvoices));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const currentPlan = getUserPlan(user);

  const openUpgradeModal = (featureName?: string) => {
    setRequiredFeatureName(featureName || null);
    setIsUpgradeModalOpen(true);
  };

  const closeUpgradeModal = () => {
    setIsUpgradeModalOpen(false);
    setRequiredFeatureName(null);
  };

  const subscribeToPlan = async (
    tier: PlanTier,
    cycle: BillingCycle,
    method: PaymentMethodType
  ): Promise<boolean> => {
    const plan = getPlanByTier(tier);
    const session = await paymentProvider.createCheckoutSession({
      userId: user.id,
      tier,
      billingCycle: cycle,
      method,
    });

    const verification = await paymentProvider.verifyPayment(session.transactionId);
    if (verification.success) {
      const now = new Date();
      const renewalDays = cycle === 'yearly' ? 365 : 30;
      const renewalDate = new Date(now.getTime() + renewalDays * 86400000)
        .toISOString()
        .split('T')[0];

      const newSub: UserSubscription = {
        ...verification.subscription,
        tier,
        billingCycle: cycle,
        amount: cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice,
        renewalDate,
        paymentMethod: method === 'UPI' ? 'UPI (Google Pay / PhonePe)' : `${method} Payment`,
      };

      const invoice: BillingInvoice = {
        ...verification.invoice,
        planName: `AstroNex ${plan.name} (${cycle === 'yearly' ? 'Annual' : 'Monthly'})`,
        amount: newSub.amount,
      };

      const updatedHistory = [invoice, ...billingHistory];

      setUserSubscription(newSub);
      setBillingHistory(updatedHistory);

      // Persist in localStorage
      try {
        localStorage.setItem(STORAGE_SUB_KEY, JSON.stringify(newSub));
        localStorage.setItem(STORAGE_INVOICES_KEY, JSON.stringify(updatedHistory));
      } catch (e) {
        console.error(e);
      }

      // Update user profile tier
      updatePlan(tier);

      return true;
    }

    return false;
  };

  const cancelSubscription = () => {
    if (!userSubscription) return;
    const updated: UserSubscription = {
      ...userSubscription,
      status: 'cancelled',
      autoRenew: false,
      cancelDate: new Date().toISOString().split('T')[0],
    };
    setUserSubscription(updated);
    try {
      localStorage.setItem(STORAGE_SUB_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const restorePurchases = async (): Promise<boolean> => {
    // Re-verifies active state from server storage
    if (userSubscription && userSubscription.status === 'active') {
      updatePlan(userSubscription.tier);
      return true;
    }
    return false;
  };

  const canAccess = (key: EntitlementKey): boolean => {
    return canUse(user, key);
  };

  const canAccessPersona = (consultantId: string): boolean => {
    return canAccessConsultant(user, consultantId);
  };

  const consultationDurationLimit = getConsultationDurationLimit(user);

  return (
    <SubscriptionContext.Provider
      value={{
        currentPlan,
        userSubscription,
        billingHistory,
        isUpgradeModalOpen,
        requiredFeatureName,
        openUpgradeModal,
        closeUpgradeModal,
        subscribeToPlan,
        cancelSubscription,
        restorePurchases,
        canAccess,
        canAccessPersona,
        consultationDurationLimit,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return ctx;
}
