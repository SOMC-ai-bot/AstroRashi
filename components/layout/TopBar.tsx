'use client';

import React, { useState } from 'react';
import { Bell, Globe, Sparkles, Crown, User } from 'lucide-react';
import { useAuth } from '@/lib/state/auth-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { LanguageCode } from '@/types';
import { NavTab } from './BottomNav';

interface TopBarProps {
  onTabChange: (tab: NavTab) => void;
  onOpenNotifications: () => void;
  onOpenPremium: () => void;
  onOpenAuth?: () => void;
  unreadCount?: number;
}

const LANGUAGE_LABELS: Record<LanguageCode, { label: string; script: string }> = {
  en: { label: 'English', script: 'EN' },
  hi: { label: 'हिन्दी', script: 'HI' },
  hinglish: { label: 'Hinglish', script: 'HING' },
  bn: { label: 'বাংলা', script: 'BN' },
  ta: { label: 'தமிழ்', script: 'TA' },
  te: { label: 'తెలుగు', script: 'TE' },
  mr: { label: 'मराठी', script: 'MR' },
  gu: { label: 'ગુજરાતી', script: 'GU' },
  kn: { label: 'ಕನ್ನಡ', script: 'KN' },
  ml: { label: 'മലയാളം', script: 'ML' },
  pa: { label: 'ਪੰਜਾਬੀ', script: 'PA' },
  or: { label: 'ଓଡ଼ିଆ', script: 'OR' },
  as: { label: 'অসমীয়া', script: 'AS' },
  ur: { label: 'اردو', script: 'UR' },
  ar: { label: 'العربية', script: 'AR' },
};

export const TopBar: React.FC<TopBarProps> = ({
  onTabChange,
  onOpenNotifications,
  onOpenPremium,
  onOpenAuth,
  unreadCount = 2,
}) => {
  const { user } = useAuth();
  const { language, setLanguage } = useI18n();
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 40, width: '100%' }}>
      {/* Main Header Bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '66px',
          padding: '0 24px',
          backgroundColor: 'rgba(10, 6, 20, 0.92)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Brand & Sacred Star Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
          onClick={() => onTabChange('discover')}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '4px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
              border: '1px solid rgba(192, 132, 252, 0.5)',
            }}
          >
            {/* Sacred Star Pentagram SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E9D5FF 60%, #C084FC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
              }}
            >
              ASTRONEX
            </span>
            <span style={{ fontSize: '9.5px', color: '#C084FC', fontWeight: 600, letterSpacing: '0.06em' }}>
              VEDIC ASTROLOGY & WISDOM
            </span>
          </div>
        </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Premium Upgrade Pill */}
        {!user.isPremium ? (
          <button
            onClick={onOpenPremium}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              background: 'linear-gradient(135deg, rgba(255, 106, 0, 0.22) 0%, rgba(250, 204, 21, 0.25) 100%)',
              border: '1px solid rgba(250, 204, 21, 0.45)',
              borderRadius: 'var(--radius-full)',
              color: '#FACC15',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 200ms ease',
              boxShadow: '0 0 16px rgba(250, 204, 21, 0.2)',
            }}
          >
            <Crown size={14} color="#FACC15" />
            <span>GET VIP</span>
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11px',
              fontWeight: 800,
              color: '#FACC15',
              background: 'rgba(250, 204, 21, 0.16)',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(250, 204, 21, 0.4)',
              boxShadow: '0 0 14px rgba(250, 204, 21, 0.25)',
            }}
          >
            <Crown size={12} color="#FACC15" />
            <span>VIP PRO</span>
          </div>
        )}

        {/* Multilingual Selector */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-secondary)',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'border-color 0.18s ease',
            }}
          >
            <Globe size={14} color="#38BDF8" />
            <span>{LANGUAGE_LABELS[language]?.script || 'EN'}</span>
          </button>

          {showLangMenu && (
            <div
              style={{
                position: 'absolute',
                top: '44px',
                right: 0,
                width: '190px',
                backgroundColor: 'rgba(16, 17, 26, 0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 18px 45px rgba(0, 0, 0, 0.85)',
                padding: '6px',
                zIndex: 100,
                animation: 'modalFadeIn 180ms ease',
              }}
            >
              {(Object.keys(LANGUAGE_LABELS) as LanguageCode[]).map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code);
                    setShowLangMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: language === code ? 'rgba(255, 106, 0, 0.22)' : 'transparent',
                    color: language === code ? '#FF8C33' : 'var(--text-primary)',
                    fontSize: '13px',
                    fontWeight: language === code ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span>{LANGUAGE_LABELS[code].label}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {LANGUAGE_LABELS[code].script}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'border-color 0.18s ease',
          }}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--theme-orange)',
                boxShadow: '0 0 10px var(--theme-orange)',
              }}
            />
          )}
        </button>

        {/* Account / Auth Button */}
        {onOpenAuth && (
          <button
            onClick={onOpenAuth}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-full)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <User size={13} color="#FBBF24" />
            <span style={{ maxWidth: '85px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.name ? user.name.split(' ')[0] : 'Sign In'}
            </span>
          </button>
        )}

        {/* Avatar / Profile */}
        <button
          onClick={() => onTabChange('profile')}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(245, 158, 11, 0.6)',
            boxShadow: '0 0 14px rgba(245, 158, 11, 0.3)',
            padding: 0,
            cursor: 'pointer',
            background: 'none',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={user.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </button>
      </div>
    </header>
    </div>
  );
};
