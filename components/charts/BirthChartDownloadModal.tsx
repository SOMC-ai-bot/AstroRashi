'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/state/auth-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { generateFullBirthChartPDF } from '@/lib/utils/full-birth-chart-pdf';
import {
  FileText,
  CheckCircle,
  Sparkles,
  Lock,
  Download,
  CreditCard,
  QrCode,
  ShieldCheck,
  X,
  Star,
  Award,
} from 'lucide-react';

import { useSubscription } from '@/lib/state/subscription-context';
import { paymentProvider } from '@/lib/subscription/payment-provider';

interface BirthChartDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPricing?: () => void;
}

export const BirthChartDownloadModal: React.FC<BirthChartDownloadModalProps> = ({
  isOpen,
  onClose,
  onOpenPricing,
}) => {
  const { user } = useAuth();
  const { subscribeToPlan, openUpgradeModal } = useSubscription();
  const { natalChart, activeProfile } = useAstrology();
  const { language } = useI18n();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card'>('upi');

  if (!isOpen) return null;

  const isLockedForFree = !user.isPremium;

  const handleDownload = () => {
    if (isLockedForFree) {
      onClose();
      openUpgradeModal('Full Birth Chart PDF Download');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      generateFullBirthChartPDF(natalChart, activeProfile, language);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  const handlePay80Rupees = async () => {
    setIsProcessing(true);
    try {
      await paymentProvider.openRazorpayCheckout({
        amountInRupees: 80,
        name: 'Kundli Birth Chart PDF',
        description: `Authentic 20+ page Vedic Horoscope PDF for ${activeProfile?.name || 'Seeker'}`,
        userEmail: user?.email || undefined,
        userPhone: user?.phone || undefined,
        notes: {
          item: 'birth_chart_pdf',
          profileId: activeProfile?.id || '',
        },
      });
      setHasPaid(true);
      generateFullBirthChartPDF(natalChart, activeProfile, language);
    } catch (err: any) {
      console.warn('[Razorpay Chart Download]', err?.message || err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 15, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'modalFadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0D1122',
          border: '1.5px solid rgba(245, 208, 97, 0.4)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          padding: '28px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 208, 97, 0.2)',
          position: 'relative',
          color: '#FFFFFF',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#CBD5E1',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #F5D061 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(245, 208, 97, 0.45)',
            }}
          >
            <FileText size={26} color="#070912" />
          </div>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#F5D061',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              Certified Vedic Dossier
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '2px 0 0', color: '#FFFFFF' }}>
              Full Precision Birth Chart (Kundli) PDF
            </h3>
          </div>
        </div>

        {/* Dossier Features Checklist */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#FDE68A', marginBottom: '10px' }}>
            ✨ Included in this Comprehensive 4-Page Master Dossier:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '12px', color: '#E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={14} color="#34D399" />
              <span>Full North Indian Kundli SVG</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={14} color="#34D399" />
              <span>All 9 Graha Degrees & Dignities</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={14} color="#34D399" />
              <span>12 Bhavas Detailed Synthesis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={14} color="#34D399" />
              <span>Vimshottari Dasha Timeline</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={14} color="#34D399" />
              <span>Shadbala & Planetary Strengths</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={14} color="#34D399" />
              <span>Gemstones, Rudraksha & Mantras</span>
            </div>
          </div>
        </div>

        {/* Direct Download Action Section */}
        <div>
          <div
            style={{
              background: 'rgba(249, 115, 22, 0.1)',
              border: '1.5px solid rgba(249, 115, 22, 0.35)',
              borderRadius: '14px',
              padding: '16px 18px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Award size={24} color="#F97316" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
                  Complete Precision Vedic Horoscope Dossier
                </span>
                <span style={{ fontSize: '11px', backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#34D399', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  Active Profile: {activeProfile?.name || 'Seeker'}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#CBD5E1', margin: '4px 0 0', lineHeight: 1.4 }}>
                Personalized for {activeProfile?.name || 'Seeker'} • Born {activeProfile?.birthDate} at {activeProfile?.birthTime} ({activeProfile?.birthPlace}). Includes embedded SVG chart, 12 Bhavas, planetary strengths & remedies.
              </p>
            </div>
          </div>

          {isLockedForFree && (
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1.5px solid #F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                <Lock size={18} color="#F59E0B" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#FDE68A', fontSize: '13px', display: 'block' }}>
                    PDF Chart Download is Locked
                  </strong>
                  <span style={{ fontSize: '11.5px', color: '#CBD5E1' }}>
                    Upgrade to Premium to download certified 4-page precision Kundli PDF dossiers.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openUpgradeModal('Master Kundli Birth Chart PDF');
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#F59E0B',
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Upgrade Now
              </button>
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: isLockedForFree
                ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                : 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '15px',
              fontWeight: 800,
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(249, 115, 22, 0.4)',
              transition: 'all 0.18s ease',
            }}
          >
            {isLockedForFree ? <Lock size={18} /> : <Download size={18} />}
            <span>{isProcessing ? 'Generating your birth chart...' : isLockedForFree ? 'Locked • Upgrade to Download PDF' : 'Download your birth chart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
