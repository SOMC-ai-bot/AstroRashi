'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/state/auth-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription/plans';
import { ManageSubscriptionModal } from './ManageSubscriptionModal';
import {
  Crown,
  CheckCircle2,
  Sparkles,
  Shield,
  CreditCard,
  RotateCcw,
  Zap,
  Calendar,
  AlertCircle,
  Clock,
  Loader2,
} from 'lucide-react';

interface SubscriptionScreenProps {
  onOpenPricing?: () => void;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ onOpenPricing }) => {
  const { user } = useAuth();
  const {
    currentPlan,
    userSubscription,
    billingHistory,
    cancelSubscription,
    switchToFreePlan,
    restorePurchases,
    subscribeToPlan,
  } = useSubscription();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessingTier, setIsProcessingTier] = useState<string | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const handleSelectPlan = async (plan: any) => {
    if (plan.tier === 'free' || plan.monthlyPrice === 0) {
      switchToFreePlan();
      setSuccessBanner('Switched to Free Tier successfully. No payment needed!');
      setTimeout(() => setSuccessBanner(null), 5000);
      return;
    }

    setIsProcessingTier(plan.tier);
    try {
      // Directly open Razorpay payment gateway
      const success = await subscribeToPlan(plan.tier, billingCycle, 'UPI');
      if (success) {
        setSuccessBanner(`Congratulations! Your ${plan.name} Celestial Membership is now active.`);
        setTimeout(() => setSuccessBanner(null), 6000);
      }
    } catch (err: any) {
      console.error('[Razorpay Direct Checkout Error]', err);
    } finally {
      setIsProcessingTier(null);
    }
  };

  const handleCancelSub = () => {
    switchToFreePlan();
    setSuccessBanner('Your subscription has been switched to the Free Tier. No recurring payment.');
    setTimeout(() => setSuccessBanner(null), 6000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '90px' }}>
      <ManageSubscriptionModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        onOpenPricing={() => setIsManageModalOpen(false)}
      />

      {/* Success Notification */}
      {successBanner && (
        <div
          style={{
            padding: '14px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid #10B981',
            color: '#34D399',
            fontSize: '13.5px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{successBanner}</span>
        </div>
      )}

      {/* 1. Header Banner */}
      <div
        style={{
          borderRadius: '16px',
          padding: '36px 28px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.3) 0%, rgba(14, 9, 28, 0.98) 75%)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.9)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Badge variant="gold" size="sm" dot>
            {user.isPremium ? 'PRO MEMBER' : 'FREE TIER ACTIVE'}
          </Badge>
          <span style={{ fontSize: '12px', color: '#DDD6FE', fontWeight: 600 }}>
            Account: {user.email}
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '34px',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '0.02em',
            marginBottom: '10px',
          }}
        >
          Manage Your Celestial Membership
        </h2>

        <p style={{ fontSize: '14px', color: '#A79BBF', maxWidth: '620px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          Unlock certified birth chart dossiers, unlimited transit forecasts, and sacred muhurat alerts.
        </p>

        {/* Current Status Capsule */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '18px',
            padding: '12px 24px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(8, 5, 18, 0.85)',
            border: user.isPremium ? '1.5px solid #10B981' : '1px solid rgba(168, 85, 247, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crown size={18} color={user.isPremium ? '#FBBF24' : '#71648A'} />
            <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>
              Current Plan: {user.isPremium ? 'Pro Astrologer Member' : 'Free Standard Tier'}
            </span>
          </div>

          {user.isPremium && (
            <button
              onClick={handleCancelSub}
              style={{
                background: 'none',
                border: 'none',
                color: '#F87171',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      {/* 2. Billing Cycle Toggle */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(15, 12, 28, 0.95)',
            padding: '6px',
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid rgba(245, 158, 11, 0.35)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
          }}
        >
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: billingCycle === 'monthly' ? 'linear-gradient(135deg, #FF6A00 0%, #FF8533 100%)' : 'transparent',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: billingCycle === 'monthly' ? '0 2px 10px rgba(255, 106, 0, 0.4)' : 'none',
            }}
          >
            Monthly Billing
          </button>
            <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: billingCycle === 'yearly' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'transparent',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: billingCycle === 'yearly' ? '0 2px 12px rgba(16, 185, 129, 0.4)' : 'none',
            }}
          >
            <span>Yearly (Save Up To 44%)</span>
            <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '10px', fontWeight: 900 }}>
              BEST VALUE
            </span>
          </button>
        </div>
        <span style={{ fontSize: '11.5px', color: '#CBD5E1' }}>
          {billingCycle === 'yearly'
            ? 'Yearly billing: Premium ₹599/yr (Save 44%)'
            : 'Monthly billing: Premium ₹89/mo (Flexible cancel anytime)'}
        </span>
      </div>

      {/* 3. Subscription Plans Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = (plan.tier === 'free' && !user.isPremium) || (plan.tier !== 'free' && user.isPremium);
          const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
          const monthlyEquivalent = plan.monthlyPrice * 12;
          const yearlySavings = billingCycle === 'yearly' && plan.monthlyPrice > 0 ? monthlyEquivalent - plan.yearlyPrice : 0;
          const percentageSavings =
            billingCycle === 'yearly' && plan.monthlyPrice > 0
              ? Math.round(((monthlyEquivalent - plan.yearlyPrice) / monthlyEquivalent) * 100)
              : 0;

          return (
            <Card
              key={plan.id}
              variant={plan.isPopular ? 'gradient' : 'glass'}
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '12px',
                border: plan.isPopular
                  ? '1.5px solid #FF6A00'
                  : '1px solid rgba(168, 85, 247, 0.25)',
                position: 'relative',
              }}
            >
              {plan.isPopular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #FF6A00 0%, #FF8533 100%)',
                    color: '#FFFFFF',
                    padding: '3px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                  }}
                >
                  MOST POPULAR CHOICE
                </div>
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
                    {plan.name}
                  </h3>
                  {isCurrent && (
                    <Badge variant="gold" size="sm">
                      Active Plan
                    </Badge>
                  )}
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF' }}>
                      ₹{price}
                    </span>
                    <span style={{ fontSize: '13px', color: '#A79BBF' }}>
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                    {percentageSavings > 0 && (
                      <span
                        style={{
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: '#34D399',
                          border: '1px solid #10B981',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 800,
                          marginLeft: '4px',
                        }}
                      >
                        {percentageSavings}% OFF
                      </span>
                    )}
                  </div>
                  {yearlySavings > 0 && (
                    <div style={{ fontSize: '11.5px', color: '#FBBF24', marginTop: '4px', fontWeight: 700 }}>
                      ✦ Save ₹{yearlySavings} ({percentageSavings}% discount) compared to monthly
                    </div>
                  )}
                  <p style={{ fontSize: '12.5px', color: '#DDD6FE', marginTop: '6px', lineHeight: 1.45 }}>
                    {plan.subtitle}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2 size={16} color="#34D399" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '12.5px', color: '#E4DCF9', lineHeight: 1.4 }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {isCurrent ? (
                  <Button variant="outline" fullWidth disabled>
                    Current Active Tier
                  </Button>
                ) : (
                  <Button
                    variant={plan.isPopular ? 'primary' : 'glass'}
                    fullWidth
                    loading={isProcessingTier === plan.tier}
                    disabled={isProcessingTier !== null}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    <span>
                      {plan.tier === 'free'
                        ? 'Switch to Free'
                        : isProcessingTier === plan.tier
                        ? 'Opening Razorpay Gateway...'
                        : 'Upgrade & Activate Now'}
                    </span>
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* 4. Real Payment Security Guarantee */}
      <div
        style={{
          padding: '20px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shield size={24} color="#34D399" />
          <div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>Instant Cancellation</h4>
            <p style={{ fontSize: '11.5px', color: '#A79BBF' }}>Cancel anytime with 1 click; no hidden fees or charges.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CreditCard size={24} color="#FBBF24" />
          <div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>UPI, Cards & NetBanking</h4>
            <p style={{ fontSize: '11.5px', color: '#A79BBF' }}>Encrypted payments via RBI compliant 256-bit gateway.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={24} color="#C084FC" />
          <div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>Instant Activation</h4>
            <p style={{ fontSize: '11.5px', color: '#A79BBF' }}>All reports & specialist chats unlock immediately upon confirmation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
