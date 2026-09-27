'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BillingCycle, SubscriptionPlan } from '@/types';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription/plans';
import { useSubscription } from '@/lib/state/subscription-context';
import { useAuth } from '@/lib/state/auth-context';
import { CheckoutSheet } from './CheckoutSheet';
import { Check, Sparkles, Crown, Zap } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<SubscriptionPlan | null>(
    null
  );

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="940px">
      <CheckoutSheet
        isOpen={!!selectedPlanForCheckout}
        plan={selectedPlanForCheckout}
        billingCycle={billingCycle}
        onClose={() => {
          setSelectedPlanForCheckout(null);
          onClose();
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', padding: '10px 4px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            AstroNex Plans
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
              Save up to 20%
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
            const isCurrent = user.planTier === plan.tier;
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const savings =
              billingCycle === 'yearly' && plan.monthlyPrice > 0
                ? plan.monthlyPrice * 12 - plan.yearlyPrice
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
                  backgroundColor: isBasic ? 'rgba(139, 47, 85, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                  border: isBasic
                    ? '1.5px solid var(--accent-rose)'
                    : isPremium
                    ? '1.5px solid rgba(216, 197, 138, 0.4)'
                    : '1px solid var(--border-subtle)',
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

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹{price}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {plan.monthlyPrice === 0 ? 'forever' : billingCycle === 'yearly' ? '/year' : '/month'}
                    </span>
                  </div>

                  {savings > 0 && (
                    <div style={{ fontSize: '11.5px', color: 'var(--gold-primary)', marginBottom: '14px', fontWeight: 600 }}>
                      Save ₹{savings} with yearly billing
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
                    <Button variant="ghost" size="md" disabled style={{ width: '100%', color: 'var(--text-muted)' }}>
                      Included
                    </Button>
                  ) : (
                    <Button
                      variant={isBasic ? 'primary' : 'gold'}
                      size="md"
                      onClick={() => setSelectedPlanForCheckout(plan)}
                      style={{ width: '100%' }}
                    >
                      <span>Choose {plan.name}</span>
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
