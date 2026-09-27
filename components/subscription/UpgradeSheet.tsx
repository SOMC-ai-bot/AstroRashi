'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useSubscription } from '@/lib/state/subscription-context';
import { Sparkles, Crown, ArrowRight } from 'lucide-react';

interface UpgradeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  requiredFeature?: string | null;
  onOpenPricing: () => void;
}

export const UpgradeSheet: React.FC<UpgradeSheetProps> = ({
  isOpen,
  onClose,
  requiredFeature,
  onOpenPricing,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="480px">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', padding: '10px 4px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--gold-primary) 0%, #A63867 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(216, 197, 138, 0.35)',
          }}
        >
          <Crown size={28} color="#171719" />
        </div>

        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            AstroNex Pro Entitlement
          </span>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            Unlock {requiredFeature || 'Premium Feature'}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
            Access all AstroNex Expert Astrologer specialists without session time limits, full natal chart transits, and family profiles starting at just <strong>₹199/month</strong>.
          </p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
          <Button
            variant="gold"
            size="lg"
            onClick={() => {
              onClose();
              onOpenPricing();
            }}
            style={{ width: '100%' }}
          >
            <span>View Plans (From ₹199/mo)</span>
            <ArrowRight size={16} />
          </Button>

          <Button variant="ghost" size="sm" onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            Maybe Later
          </Button>
        </div>
      </div>
    </Modal>
  );
};
