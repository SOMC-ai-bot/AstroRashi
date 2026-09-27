'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useSubscription } from '@/lib/state/subscription-context';
import { useAuth } from '@/lib/state/auth-context';
import {
  Crown,
  Calendar,
  CreditCard,
  FileText,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface ManageSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPricing: () => void;
}

export const ManageSubscriptionModal: React.FC<ManageSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onOpenPricing,
}) => {
  const { user } = useAuth();
  const {
    currentPlan,
    userSubscription,
    billingHistory,
    cancelSubscription,
    restorePurchases,
  } = useSubscription();

  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRestore = async () => {
    const success = await restorePurchases();
    if (success) {
      setRestoreMessage('Your active subscription has been restored!');
    } else {
      setRestoreMessage('No active subscription found to restore.');
    }
    setTimeout(() => setRestoreMessage(null), 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Subscription & Billing" maxWidth="560px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Active Plan Overview */}
        <div
          style={{
            padding: '18px 20px',
            borderRadius: 'var(--radius-lg)',
            background:
              user.isPremium
                ? 'linear-gradient(135deg, rgba(166, 56, 103, 0.3) 0%, rgba(216, 197, 138, 0.15) 100%)'
                : 'rgba(255, 255, 255, 0.04)',
            border: user.isPremium ? '1.5px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: user.isPremium ? 'var(--accent-wine)' : 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Crown size={22} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  AstroNex {currentPlan.name}
                </h3>
                <Badge variant={user.isPremium ? 'gold' : 'surface'} size="sm">
                  {user.isPremium ? 'Active' : 'Free'}
                </Badge>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {userSubscription?.renewalDate
                  ? `Next renewal: ${userSubscription.renewalDate} (₹${userSubscription.amount})`
                  : 'Free tier without recurring charges'}
              </p>
            </div>
          </div>

          <Button
            variant="glass"
            size="sm"
            onClick={() => {
              onClose();
              onOpenPricing();
            }}
          >
            {user.isPremium ? 'Change Plan' : 'Upgrade'}
          </Button>
        </div>

        {/* Restore Purchases / Status message */}
        {restoreMessage && (
          <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(52, 199, 89, 0.15)', color: '#4CD964', fontSize: '12px' }}>
            {restoreMessage}
          </div>
        )}

        {/* Billing Invoices History */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Billing & Invoices History
          </h4>

          {billingHistory.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '13px' }}>
              No billing transactions yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {billingHistory.map((inv) => (
                <div
                  key={inv.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={16} color="var(--gold-primary)" />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {inv.planName}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {inv.date} • {inv.invoiceNumber}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--gold-primary)' }}>
                      ₹{inv.amount}
                    </span>
                    <Badge variant="green" size="sm">
                      {inv.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cancellation Section (if paid) */}
        {user.isPremium && (
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            {!isCancelConfirmOpen ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h5 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Cancel Subscription
                  </h5>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    You will retain access until your current billing period ends.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCancelConfirmOpen(true)}
                  style={{ color: '#FF453A' }}
                >
                  Cancel Plan
                </Button>
              </div>
            ) : (
              <div style={{ padding: '14px', backgroundColor: 'rgba(255, 69, 58, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 69, 58, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <AlertTriangle size={16} color="#FF453A" />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#FF453A' }}>
                    Confirm Subscription Cancellation?
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.4 }}>
                  Auto-renewal will be paused. You will still have full access to all Expert Astrologer specialists until your billing cycle renewal date.
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCancelConfirmOpen(false)}
                    style={{ flex: 1 }}
                  >
                    Keep Subscription
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      cancelSubscription();
                      setIsCancelConfirmOpen(false);
                      onClose();
                    }}
                    style={{ flex: 1, backgroundColor: '#FF453A' }}
                  >
                    Confirm Cancellation
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Restore Purchases Action */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleRestore}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={13} />
            <span>Restore Previous Purchases</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
