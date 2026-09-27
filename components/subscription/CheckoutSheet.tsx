'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { BillingCycle, PaymentMethodType, PlanTier, SubscriptionPlan } from '@/types';
import { useSubscription } from '@/lib/state/subscription-context';
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Smartphone,
  Building,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutSheetProps {
  isOpen: boolean;
  onClose: () => void;
  plan: SubscriptionPlan | null;
  billingCycle: BillingCycle;
  onSuccess?: () => void;
}

export const CheckoutSheet: React.FC<CheckoutSheetProps> = ({
  isOpen,
  onClose,
  plan,
  billingCycle,
  onSuccess,
}) => {
  const { subscribeToPlan } = useSubscription();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('UPI');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  const gstInclusive = Math.round(price * (18 / 118));
  const subtotalBeforeGst = price - gstInclusive;

  const handlePay = async () => {
    setIsProcessing(true);
    const success = await subscribeToPlan(plan.tier, billingCycle, selectedMethod);
    setIsProcessing(false);

    if (success) {
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} maxWidth="500px">
      {!isSuccess ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gold-primary)', textTransform: 'uppercase' }}>
                AstroNex India Checkout
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Subscribe to {plan.name} Plan
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gold-primary)' }}>
                ₹{price}
              </span>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {billingCycle === 'yearly' ? '/year' : '/month'}
              </p>
            </div>
          </div>

          {/* Payment Method Selector (India-First) */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Select Payment Method
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {/* UPI */}
              <button
                type="button"
                onClick={() => setSelectedMethod('UPI')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedMethod === 'UPI' ? '1.5px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                  background: selectedMethod === 'UPI' ? 'rgba(194, 78, 120, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedMethod === 'UPI' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <Smartphone size={16} color="var(--accent-rose-light)" />
                <span>UPI (GPay / PhonePe)</span>
              </button>

              {/* Cards */}
              <button
                type="button"
                onClick={() => setSelectedMethod('Card')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedMethod === 'Card' ? '1.5px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                  background: selectedMethod === 'Card' ? 'rgba(194, 78, 120, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedMethod === 'Card' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <CreditCard size={16} />
                <span>RuPay / Cards</span>
              </button>

              {/* Net Banking */}
              <button
                type="button"
                onClick={() => setSelectedMethod('NetBanking')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedMethod === 'NetBanking' ? '1.5px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                  background: selectedMethod === 'NetBanking' ? 'rgba(194, 78, 120, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedMethod === 'NetBanking' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <Building size={16} />
                <span>Net Banking</span>
              </button>

              {/* Wallets */}
              <button
                type="button"
                onClick={() => setSelectedMethod('Wallet')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedMethod === 'Wallet' ? '1.5px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                  background: selectedMethod === 'Wallet' ? 'rgba(194, 78, 120, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedMethod === 'Wallet' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <span>⚡</span>
                <span>Paytm / Wallets</span>
              </button>
            </div>
          </div>

          {/* UPI VPA input if UPI selected */}
          {selectedMethod === 'UPI' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Enter UPI ID / VPA</label>
              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="mobile@upi or user@okaxis"
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
          )}

          {/* Order Breakdown */}
          <div style={{ padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-secondary)' }}>
              <span>Base Subscription ({billingCycle})</span>
              <span>₹{subtotalBeforeGst}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}>
              <span>GST (18% inclusive)</span>
              <span>₹{gstInclusive}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '14.5px', color: 'var(--text-primary)' }}>
              <span>Total Amount Payable</span>
              <span style={{ color: 'var(--gold-primary)' }}>₹{price}</span>
            </div>
          </div>

          {/* Security Guarantee */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} color="#34C759" />
            <span>256-Bit SSL Encrypted Razorpay Gateway • Instant Activation</span>
          </div>

          <Button
            variant="gold"
            size="lg"
            onClick={handlePay}
            disabled={isProcessing}
            style={{ width: '100%' }}
          >
            <span>{isProcessing ? 'Verifying with Bank...' : `Pay ₹${price} Securely`}</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      ) : (
        /* Payment Success Confirmation */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', padding: '12px 0' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(52, 199, 89, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle2 size={36} color="#34C759" />
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Your Cosmic Journey Just Expanded!
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              <strong>{plan.name} Plan Activated</strong> via {selectedMethod}.
            </p>
          </div>

          <div style={{ width: '100%', padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-md)', textAlign: 'left', fontSize: '12.5px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Plan: <strong style={{ color: '#FFFFFF' }}>{plan.name} ({billingCycle})</strong></p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Amount Paid: <strong style={{ color: 'var(--gold-primary)' }}>₹{price}</strong></p>
            <p style={{ color: 'var(--text-muted)' }}>Entitlement: <strong style={{ color: '#4CD964' }}>All Expert Astrologer Specialists Unlocked (Unlimited)</strong></p>
          </div>

          <Button variant="primary" size="lg" onClick={resetAndClose} style={{ width: '100%' }}>
            Explore All Features
          </Button>
        </div>
      )}
    </Modal>
  );
};
