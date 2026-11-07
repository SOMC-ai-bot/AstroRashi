'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BillingCycle, SubscriptionPlan } from '@/types';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription/plans';
import { useSubscription } from '@/lib/state/subscription-context';
import { useAuth } from '@/lib/state/auth-context';
import { Check, Sparkles, Crown, Zap, Loader2 } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { switchToFreePlan, subscribeToPlan } = useSubscription();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [isProcessingTier, setIsProcessingTier] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChoosePlan = async (plan: SubscriptionPlan) => {
    setIsProcessingTier(plan.tier);
    try {
      const ok = await subscribeToPlan(plan.tier, billingCycle, 'UPI');
      if (ok) {
        onClose();
      }
    } catch (e) {
      console.error('[Razorpay Direct Checkout Error]', e);
    } finally {
      setIsProcessingTier(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✦ AstroNex Celestial Membership Plans"
      maxWidth="1020px"
      size="xl"
      allowMaximize={true}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', padding: '10px 4px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#F5D061', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            ✦ Unlock All 33+ Vedic Engines & Master Consultation
          </span>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            Choose Your Plan
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Personalized astrology and expert guidance crafted for you.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            width: 'fit-content',
            margin: '0 auto',
          }}
        >
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: billingCycle === 'monthly' ? 'var(--accent-wine)' : 'transparent',
              color: billingCycle === 'monthly' ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: billingCycle === 'yearly' ? 'var(--accent-wine)' : 'transparent',
              color: billingCycle === 'yearly' ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Yearly</span>
            <Badge variant="gold" size="sm">
              Save 44% (₹599/yr)
            </Badge>
          </button>
        </div>

        {/* 3 Indian Plan Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginTop: '8px',
          }}
        >
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrent = (plan.tier === 'free' && !user.isPremium) || (plan.tier === 'premium' && user.isPremium);
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const monthlyEquivalent = plan.monthlyPrice * 12;
            const savings =
              billingCycle === 'yearly' && plan.monthlyPrice > 0
                ? monthlyEquivalent - plan.yearlyPrice
                : 0;
            const percentageSavings =
              billingCycle === 'yearly' && plan.monthlyPrice > 0
                ? Math.round(((monthlyEquivalent - plan.yearlyPrice) / monthlyEquivalent) * 100)
                : 0;

            const isBasic = plan.tier === 'basic';
            const isPremium = plan.tier === 'premium';

            return (
              <div
                key={plan.id}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px 20px',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: isPremium ? 'rgba(249, 115, 22, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                  border: isPremium ? '2px solid #F97316' : '1px solid var(--border-subtle)',
                  boxShadow: isBasic
                    ? '0 10px 32px rgba(194, 78, 120, 0.25)'
                    : '0 8px 24px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {plan.badge && (
                  <div style={{ position: 'absolute', top: '-11px', right: '18px' }}>
                    <Badge variant={isBasic ? 'plum' : 'gold'} size="sm">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', height: '28px' }}>
                    {plan.subtitle}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹{price}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {plan.monthlyPrice === 0 ? 'forever' : billingCycle === 'yearly' ? '/year' : '/month'}
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
                        }}
                      >
                        {percentageSavings}% OFF
                      </span>
                    )}
                  </div>

                  {savings > 0 && (
                    <div style={{ fontSize: '11.5px', color: 'var(--gold-primary)', marginBottom: '14px', fontWeight: 600 }}>
                      Save ₹{savings} ({percentageSavings}% discount) with yearly billing
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                    {plan.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        <Check size={14} color="var(--gold-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '22px' }}>
                  {isCurrent ? (
                    <Button variant="secondary" size="md" disabled style={{ width: '100%' }}>
                      Current Plan
                    </Button>
                  ) : plan.tier === 'free' ? (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => {
                        switchToFreePlan();
                        onClose();
                      }}
                      style={{ width: '100%', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      Switch to Free
                    </Button>
                  ) : (
                    <Button
                      variant={isBasic ? 'primary' : 'gold'}
                      size="md"
                      loading={isProcessingTier === plan.tier}
                      disabled={isProcessingTier !== null}
                      onClick={() => handleChoosePlan(plan)}
                      style={{ width: '100%' }}
                    >
                      <span>
                        {isProcessingTier === plan.tier
                          ? 'Opening Razorpay...'
                          : `Choose ${plan.name} Tier`}
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
