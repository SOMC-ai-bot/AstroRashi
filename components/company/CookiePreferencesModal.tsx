'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import {
  Cookie,
  ShieldCheck,
  CheckCircle,
  X,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import {
  getCookiePreferences,
  saveCookiePreferences,
  CookiePreferences,
} from '@/lib/cookies/cookie-manager';
import Link from 'next/link';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [prefs, setPrefs] = useState<CookiePreferences>(getCookiePreferences());
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPrefs(getCookiePreferences());
      setSavedNotice(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    saveCookiePreferences({
      functional: prefs.functional,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
    });
    setSavedNotice(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleAcceptAll = () => {
    saveCookiePreferences({ all: true });
    setSavedNotice(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleRejectOptional = () => {
    saveCookiePreferences({ rejectOptional: true });
    setSavedNotice(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Cookie Preferences"
      size="md"
      maxWidth="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#E2E8F0', fontSize: '13.5px' }}>
        {/* Intro */}
        <div>
          <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
            Your Privacy. Your Choice.
          </h3>
          <p style={{ margin: 0, color: '#94A3B8', lineHeight: 1.6 }}>
            AstroRashi uses cookies and similar technologies to help operate the website, remember preferences, understand website usage and improve your experience. You can manage your cookie preferences at any time.
          </p>
        </div>

        {savedNotice && (
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#6EE7B7',
              fontWeight: 700,
            }}
          >
            <CheckCircle size={18} />
            <span>Your cookie preferences have been saved successfully!</span>
          </div>
        )}

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Strictly Necessary */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#10B981" />
                <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '14px' }}>
                  Strictly Necessary Cookies
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#10B981',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Always Active
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.55 }}>
              These cookies are essential for basic website functions, account authentication and security. They cannot be disabled through the cookie preference tool where they are strictly necessary.
            </p>
          </div>

          {/* Functional Cookies */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '14px' }}>
                Functional Cookies
              </span>
              <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                <input
                  type="checkbox"
                  checked={prefs.functional}
                  onChange={(e) => setPrefs({ ...prefs, functional: e.target.checked })}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: prefs.functional ? '#F97316' : 'rgba(255, 255, 255, 0.15)',
                    transition: '.2s',
                    borderRadius: '24px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      content: '""',
                      height: '18px',
                      width: '18px',
                      left: prefs.functional ? '22px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '.2s',
                      borderRadius: '50%',
                    }}
                  />
                </span>
              </label>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.55 }}>
              These remember preferences such as language selection, chart display preferences and user settings.
            </p>
          </div>

          {/* Analytics Cookies */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '14px' }}>
                Analytics Cookies
              </span>
              <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: prefs.analytics ? '#F97316' : 'rgba(255, 255, 255, 0.15)',
                    transition: '.2s',
                    borderRadius: '24px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      content: '""',
                      height: '18px',
                      width: '18px',
                      left: prefs.analytics ? '22px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '.2s',
                      borderRadius: '50%',
                    }}
                  />
                </span>
              </label>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.55 }}>
              These help us understand how visitors interact with AstroRashi so we can improve website performance and usability.
            </p>
          </div>

          {/* Marketing Cookies */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '14px' }}>
                Marketing Cookies
              </span>
              <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: prefs.marketing ? '#F97316' : 'rgba(255, 255, 255, 0.15)',
                    transition: '.2s',
                    borderRadius: '24px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      content: '""',
                      height: '18px',
                      width: '18px',
                      left: prefs.marketing ? '22px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '.2s',
                      borderRadius: '50%',
                    }}
                  />
                </span>
              </label>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.55 }}>
              These may be used to measure marketing performance or deliver relevant promotional content, where applicable.
            </p>
          </div>
        </div>

        {/* Footer info & Buttons */}
        <div style={{ fontSize: '12px', color: '#64748B' }}>
          For additional information, please read our{' '}
          <Link href="/privacy-policy" onClick={onClose} style={{ color: '#F97316', textDecoration: 'underline' }}>
            Privacy Policy
          </Link>
          .
        </div>

        {/* Three Required Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            type="button"
            onClick={handleRejectOptional}
            style={{
              padding: '10px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#CBD5E1',
              fontSize: '13px',
              fontWeight: 650,
              cursor: 'pointer',
            }}
          >
            Reject Optional Cookies
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '10px 16px',
              backgroundColor: 'rgba(249, 115, 22, 0.18)',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '8px',
              color: '#F97316',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Save My Preferences
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </Modal>
  );
};

