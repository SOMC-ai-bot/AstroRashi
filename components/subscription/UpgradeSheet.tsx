'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useSubscription } from '@/lib/state/subscription-context';
import { useAuth } from '@/lib/state/auth-context';
import { BillingCycle, PlanTier } from '@/types';
import { Crown, CheckCircle2, ShieldCheck, Lock, Sparkles } from 'lucide-react';

interface UpgradeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  requiredFeature?: string | null;
  onOpenPricing?: () => void;
}

export const UpgradeSheet: React.FC<UpgradeSheetProps> = ({
  isOpen,
  onClose,
  requiredFeature,
}) => {
  const { user } = useAuth();
  const { subscribeToPlan, switchToFreePlan } = useSubscription();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [processingTier, setProcessingTier] = useState<PlanTier | null>(null);

  if (!isOpen) return null;

  const handleSubscribe = async (tier: PlanTier) => {
    setProcessingTier(tier);
    try {
      if (tier === 'free') {
        switchToFreePlan();
        onClose();
        return;
      }
      const success = await subscribeToPlan(tier, billingCycle, 'UPI');
      if (success) {
        onClose();
      }
    } catch (err: any) {
      console.error('[Razorpay Direct Upgrade Error]', err);
    } finally {
      setProcessingTier(null);
    }
  };

  const isPremiumActive = Boolean(user.isPremium || user.planTier === 'premium');

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="600px">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', padding: '6px 4px' }}>
        {/* Crown Orb Icon */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6A00 0%, #D95300 50%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(255, 106, 0, 0.45)',
            border: '2px solid rgba(255, 255, 255, 0.25)',
          }}
        >
          <Crown size={28} color="#FFFFFF" />
        </div>

        <div>
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 800,
              color: '#FFB800',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(255, 184, 0, 0.12)',
              border: '1px solid rgba(255, 184, 0, 0.3)',
              borderRadius: '20px',
              padding: '3px 10px',
              display: 'inline-block',
              marginBottom: '6px',
            }}
          >
            Celestial Membership Privilege
          </span>
          <h3 style={{ fontSize: '21px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 6px' }}>
            Unlock Complete Access
          </h3>
          <p style={{ fontSize: '13px', color: '#CBD5E1', margin: 0, lineHeight: 1.5, maxWidth: '460px' }}>
            {requiredFeature ? (
              <>
                <strong style={{ color: '#FFB800' }}>{requiredFeature}</strong> is a celestial feature available to Premium members.
              </>
            ) : (
              'Choose your cosmic plan: enjoy free foundational astrology or elevate to unlimited celestial mastery.'
            )}
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(15, 12, 28, 0.95)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: billingCycle === 'monthly' ? 'linear-gradient(135deg, #FF6A00 0%, #FF8533 100%)' : 'transparent',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: billingCycle === 'yearly' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'transparent',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            <span>Yearly (Save 44%)</span>
            <span style={{ fontSize: '9px', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '8px', fontWeight: 900 }}>
              BEST VALUE
            </span>
          </button>
        </div>

        {/* Plan Cards Grid: FREE vs PREMIUM */}
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
          {/* Free Plan */}
          <div
            style={{
              background: 'linear-gradient(180deg, rgba(20, 20, 28, 0.95) 0%, rgba(12, 12, 18, 0.98) 100%)',
              border: !isPremiumActive ? '1.5px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '18px 16px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Free Starter</span>
                <span style={{ fontSize: '10px', background: 'rgba(255, 255, 255, 0.1)', color: '#CBD5E1', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
                  BASIC ACCESS
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#FFFFFF' }}>₹0</span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>/forever</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', color: '#CBD5E1', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="#34D399" style={{ flexShrink: 0 }} />
                  <span>Daily Horoscope & Panchang</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="#34D399" style={{ flexShrink: 0 }} />
                  <span>Moon Sign Calculator Unlocked</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="#34D399" style={{ flexShrink: 0 }} />
                  <span>Vedic Master AI (20 Min Limit)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8' }}>
                  <Lock size={13} color="#F59E0B" style={{ flexShrink: 0 }} />
                  <span>PDF Downloads & Matching Locked</span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="md"
              fullWidth
              disabled={!isPremiumActive}
              onClick={() => handleSubscribe('free')}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: !isPremiumActive ? '#34D399' : '#CBD5E1',
                fontWeight: 700,
              }}
            >
              <span>{!isPremiumActive ? '✓ Current Plan' : 'Switch to Free'}</span>
            </Button>
          </div>

          {/* Premium Plan */}
          <div
            style={{
              background: 'linear-gradient(180deg, rgba(30, 20, 48, 0.95) 0%, rgba(18, 12, 32, 0.98) 100%)',
              border: '2px solid rgba(168, 85, 247, 0.75)',
              borderRadius: '16px',
              padding: '18px 16px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 30px rgba(168, 85, 247, 0.3)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Premium Plan</span>
                <span style={{ fontSize: '10px', background: 'rgba(168, 85, 247, 0.25)', color: '#C084FC', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
                  UNLIMITED
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#FFFFFF' }}>
                  {billingCycle === 'yearly' ? '₹599' : '₹89'}
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                  /{billingCycle === 'yearly' ? 'year' : 'month'}
                </span>
                {billingCycle === 'yearly' && (
                  <span style={{ fontSize: '10px', color: '#34D399', fontWeight: 800, marginLeft: '4px' }}>
                    Save 44%
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', color: '#E2E8F0', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="#C084FC" style={{ flexShrink: 0 }} />
                  <span>Unlimited AI Astrologer Chat & All Modes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="#C084FC" style={{ flexShrink: 0 }} />
                  <span>Full Precision Birth Chart (Kundli) PDF</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="#C084FC" style={{ flexShrink: 0 }} />
                  <span>Kundli Match 36-Point Guna Milan</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="#C084FC" style={{ flexShrink: 0 }} />
                  <span>All 33+ Astrology Tools & Calculators</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="#C084FC" style={{ flexShrink: 0 }} />
                  <span>All 10 Stored Astrological Dossiers</span>
                </div>
              </div>
            </div>

            <Button
              variant="gold"
              size="md"
              fullWidth
              loading={processingTier === 'premium'}
              disabled={processingTier !== null}
              onClick={() => handleSubscribe('premium')}
              style={{
                background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                border: 'none',
              }}
            >
              <span>{processingTier === 'premium' ? 'Opening Razorpay...' : isPremiumActive ? '✓ Current Plan' : 'Upgrade to Premium'}</span>
            </Button>
          </div>
        </div>

        {/* Security guarantee line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
          <ShieldCheck size={14} color="#34D399" />
          <span>Direct Razorpay Gateway • 256-Bit SSL Encrypted • Instant Activation</span>
        </div>

        <Button variant="ghost" size="sm" onClick={onClose} style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          Maybe Later
        </Button>
      </div>
    </Modal>
  );
};
