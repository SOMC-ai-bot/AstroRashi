'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/state/auth-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription/plans';
import { CheckoutSheet } from './CheckoutSheet';
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
    restorePurchases,
  } = useSubscription();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<any>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlanForCheckout(plan);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    setSuccessBanner('Congratulations! Your Pro Astrological Membership is now active.');
    setTimeout(() => setSuccessBanner(null), 6000);
  };

  const handleCancelSub = () => {
    cancelSubscription();
    setSuccessBanner('Your subscription has been cancelled. You will retain access until the end of your billing cycle.');
    setTimeout(() => setSuccessBanner(null), 6000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '90px' }}>
      {/* Checkout Sheet */}
      <CheckoutSheet
        isOpen={isCheckoutOpen}
        plan={selectedPlanForCheckout}
        billingCycle={billingCycle}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
          }}
        >
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: billingCycle === 'monthly' ? '#C084FC' : 'transparent',
              color: billingCycle === 'monthly' ? '#000000' : '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: billingCycle === 'yearly' ? 'linear-gradient(135deg, #FF6A00 0%, #FF8533 100%)' : 'transparent',
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Annual (Save 40%)</span>
            <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
              POPULAR
            </span>
          </button>
        </div>
      </div>

      {/* 3. Subscription Plans Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = (plan.tier === 'free' && !user.isPremium) || (plan.tier !== 'free' && user.isPremium);
          const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

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
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF' }}>
                      ₹{price}
                    </span>
                    <span style={{ fontSize: '13px', color: '#A79BBF' }}>
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
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
                    onClick={() => handleSelectPlan(plan)}
                  >
                    <span>{plan.tier === 'free' ? 'Switch to Free' : 'Upgrade & Activate Now'}</span>
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
