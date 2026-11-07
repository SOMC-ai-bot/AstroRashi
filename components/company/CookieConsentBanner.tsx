'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import {
  hasGivenCookieConsent,
  saveCookiePreferences,
} from '@/lib/cookies/cookie-manager';
import { CookiePreferencesModal } from './CookiePreferencesModal';
import Link from 'next/link';

export const CookieConsentBanner: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!hasGivenCookieConsent()) {
      setShowBanner(true);
    }

    const handleUpdate = () => {
      setShowBanner(!hasGivenCookieConsent());
    };

    window.addEventListener('astrorashi_cookie_update', handleUpdate);
    return () => window.removeEventListener('astrorashi_cookie_update', handleUpdate);
  }, []);

  if (!mounted || !showBanner) return (
    <CookiePreferencesModal
      isOpen={showManageModal}
      onClose={() => setShowManageModal(false)}
    />
  );

  const handleAcceptAll = () => {
    saveCookiePreferences({ all: true });
    setShowBanner(false);
  };

  const handleRejectOptional = () => {
    saveCookiePreferences({ rejectOptional: true });
    setShowBanner(false);
  };

  return (
    <>
      <CookiePreferencesModal
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
      />

      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          right: '20px',
          maxWidth: '920px',
          margin: '0 auto',
          backgroundColor: 'rgba(15, 16, 24, 0.96)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(249, 115, 22, 0.35)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
          padding: '20px 24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          animation: 'fadeSlideUp 0.3s ease-out forwards',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(249, 115, 22, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Cookie size={22} color="#F97316" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
                Your Privacy. Your Choice.
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8', lineHeight: 1.55 }}>
                AstroRashi uses cookies and similar technologies to help operate the platform, remember preferences, and understand website usage. You can accept all, reject optional cookies, or customize your preferences anytime. Read our{' '}
                <Link href="/privacy-policy" style={{ color: '#F97316', textDecoration: 'underline' }}>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRejectOptional}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              padding: '4px',
            }}
            title="Dismiss & Reject Optional"
          >
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            paddingTop: '6px',
          }}
        >
          <button
            type="button"
            onClick={() => setShowManageModal(true)}
            style={{
              padding: '9px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#CBD5E1',
              fontSize: '12.5px',
              fontWeight: 650,
              cursor: 'pointer',
            }}
          >
            Customize Preferences
          </button>
          <button
            type="button"
            onClick={handleRejectOptional}
            style={{
              padding: '9px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#CBD5E1',
              fontSize: '12.5px',
              fontWeight: 650,
              cursor: 'pointer',
            }}
          >
            Reject Optional Cookies
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            style={{
              padding: '9px 20px',
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 750,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </>
  );
};

