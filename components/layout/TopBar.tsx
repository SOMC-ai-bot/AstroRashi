'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  PieChart,
  Calculator,
  FileText,
  BookOpen,
  Sparkles,
  Bot,
  Crown,
  User,
  ChevronDown,
  Bell,
  Globe,
  Check,
  Menu,
  X,
  Flame,
  Moon,
  Shield,
  Clock,
  Heart,
  Gem,
} from 'lucide-react';
import { useAuth } from '@/lib/state/auth-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { LanguageCode } from '@/types';
import { NavTab } from './BottomNav';

interface TopBarProps {
  activeTab: NavTab;
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
  activeTab,
  onTabChange,
  onOpenNotifications,
  onOpenPremium,
  onOpenAuth,
  unreadCount = 2,
}) => {
  const { user } = useAuth();
  const { language, setLanguage } = useI18n();

  const [activeDropdown, setActiveDropdown] = useState<'tools' | 'reports' | 'astrologers' | 'lang' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    onTabChange(tab);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <div ref={navRef} style={{ position: 'sticky', top: 0, zIndex: 50, width: '100%' }}>
      {/* Horizontal Navigation Bar Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
          padding: '0 24px',
          backgroundColor: 'rgba(7, 9, 18, 0.94)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderBottom: '1px solid rgba(245, 208, 97, 0.22)',
          boxShadow: '0 8px 36px rgba(0, 0, 0, 0.85)',
          gap: '16px',
        }}
      >
        {/* 1. Left: Brand Sacred Sun-Moon Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={() => handleSelectTab('discover')}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #F5D061 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(245, 208, 97, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              border: '1.5px solid #FDE89C',
            }}
          >
            {/* Celestial Sun/Moon Emblem */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06070E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '21px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F5D061 55%, #FBBF24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
              }}
            >
              ASTRONEX
            </span>
            <span
              style={{
                fontSize: '9.5px',
                letterSpacing: '0.22em',
                color: '#F5D061',
                fontWeight: 700,
                textTransform: 'uppercase',
                opacity: 0.9,
              }}
            >
              VEDIC INTELLIGENCE
            </span>
          </div>
        </div>

        {/* 2. Center: Horizontal Tab Bars with Dropdown Menus (Desktop / Tablet) */}
        <nav
          className="desktop-horizontal-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {/* Discover Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('discover')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeTab === 'discover' ? '1px solid rgba(245, 208, 97, 0.6)' : '1px solid transparent',
              background: activeTab === 'discover' ? 'rgba(245, 208, 97, 0.14)' : 'transparent',
              color: activeTab === 'discover' ? '#FFFFFF' : '#CBD5E1',
              fontSize: '13.5px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 160ms ease',
            }}
          >
            <Compass size={16} color={activeTab === 'discover' ? '#F5D061' : '#94A3B8'} />
            <span>Discover</span>
          </button>

          {/* Charts Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('charts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeTab === 'charts' ? '1px solid rgba(245, 208, 97, 0.6)' : '1px solid transparent',
              background: activeTab === 'charts' ? 'rgba(245, 208, 97, 0.14)' : 'transparent',
              color: activeTab === 'charts' ? '#FFFFFF' : '#CBD5E1',
              fontSize: '13.5px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 160ms ease',
            }}
          >
            <PieChart size={16} color={activeTab === 'charts' ? '#F5D061' : '#94A3B8'} />
            <span>Birth Charts</span>
          </button>

          {/* Dropdown 1: Astrology Tools Hub */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: activeTab === 'tools' || activeDropdown === 'tools' ? '1px solid rgba(245, 208, 97, 0.6)' : '1px solid transparent',
                background: activeTab === 'tools' || activeDropdown === 'tools' ? 'rgba(245, 208, 97, 0.14)' : 'transparent',
                color: activeTab === 'tools' || activeDropdown === 'tools' ? '#FFFFFF' : '#CBD5E1',
                fontSize: '13.5px',
                fontWeight: 650,
                cursor: 'pointer',
                transition: 'all 160ms ease',
              }}
            >
              <Calculator size={16} color="#F5D061" />
              <span>Tools Hub (33+)</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'tools' ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }} />
            </button>

            {/* Tools Dropdown Menu */}
            {activeDropdown === 'tools' && (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '360px',
                  backgroundColor: '#0B0E1B',
                  border: '1px solid rgba(245, 208, 97, 0.35)',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 20px rgba(245, 208, 97, 0.15)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '6px',
                  zIndex: 100,
                  animation: 'dropdownFade 160ms ease',
                }}
              >
                <div style={{ gridColumn: 'span 2', padding: '4px 8px 8px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#F5D061', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Popular Calculators
                  </span>
                  <span
                    onClick={() => handleSelectTab('tools')}
                    style={{ fontSize: '11px', color: '#93C5FD', cursor: 'pointer', fontWeight: 600 }}
                  >
                    View All 33+ →
                  </span>
                </div>

                {[
                  { name: 'Moon Sign / Rashi', icon: <Moon size={14} color="#C084FC" /> },
                  { name: 'Ascendant (Lagna)', icon: <Compass size={14} color="#38BDF8" /> },
                  { name: 'Mangal Dosha', icon: <Flame size={14} color="#F87171" /> },
                  { name: 'Sade Sati Tracker', icon: <Clock size={14} color="#FBBF24" /> },
                  { name: 'Kundli Matching', icon: <Heart size={14} color="#F472B6" /> },
                  { name: 'Kaal Sarp Yoga', icon: <Shield size={14} color="#FB923C" /> },
                  { name: 'Gemstone Guide', icon: <Gem size={14} color="#34D399" /> },
                  { name: 'Numerology Center', icon: <Calculator size={14} color="#FBBF24" /> },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectTab('tools')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                      color: '#E2E8F0',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 140ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245, 208, 97, 0.12)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown 2: Certified Reports */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'reports' ? null : 'reports')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: activeTab === 'reports' || activeDropdown === 'reports' ? '1px solid rgba(245, 208, 97, 0.6)' : '1px solid transparent',
                background: activeTab === 'reports' || activeDropdown === 'reports' ? 'rgba(245, 208, 97, 0.14)' : 'transparent',
                color: activeTab === 'reports' || activeDropdown === 'reports' ? '#FFFFFF' : '#CBD5E1',
                fontSize: '13.5px',
                fontWeight: 650,
                cursor: 'pointer',
                transition: 'all 160ms ease',
              }}
            >
              <FileText size={16} color="#F5D061" />
              <span>Certified Reports</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'reports' ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }} />
            </button>

            {/* Reports Dropdown Menu */}
            {activeDropdown === 'reports' && (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '320px',
                  backgroundColor: '#0B0E1B',
                  border: '1px solid rgba(245, 208, 97, 0.35)',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 20px rgba(245, 208, 97, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  zIndex: 100,
                }}
              >
                <div style={{ padding: '4px 8px 8px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#F5D061', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Certified Vedic Reports
                  </span>
                  <span
                    onClick={() => handleSelectTab('reports')}
                    style={{ fontSize: '11px', color: '#93C5FD', cursor: 'pointer', fontWeight: 600 }}
                  >
                    View All 10 →
                  </span>
                </div>

                {[
                  { name: 'Life Insights Blueprint (Free)', badge: 'UNLOCKED', color: '#34D399' },
                  { name: 'Career & Financial Destiny', badge: 'PRO', color: '#FBBF24' },
                  { name: 'Marriage & Soulmate Synastry', badge: 'PRO', color: '#FBBF24' },
                  { name: 'Sade Sati Survival Dossier', badge: 'PRO', color: '#FBBF24' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectTab('reports')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                      color: '#E2E8F0',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span>{item.name}</span>
                    <span style={{ fontSize: '10px', color: item.color, fontWeight: 700 }}>{item.badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Learn Astrology Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('learn')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeTab === 'learn' ? '1px solid rgba(245, 208, 97, 0.6)' : '1px solid transparent',
              background: activeTab === 'learn' ? 'rgba(245, 208, 97, 0.14)' : 'transparent',
              color: activeTab === 'learn' ? '#FFFFFF' : '#CBD5E1',
              fontSize: '13.5px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 160ms ease',
            }}
          >
            <BookOpen size={16} color={activeTab === 'learn' ? '#F5D061' : '#94A3B8'} />
            <span>Learn Astrology</span>
          </button>

          {/* Dropdown 3: Expert Astrologers & Chat */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'astrologers' ? null : 'astrologers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: activeTab === 'consultants' || activeTab === 'ai' || activeDropdown === 'astrologers' ? '1px solid rgba(245, 208, 97, 0.6)' : '1px solid transparent',
                background: activeTab === 'consultants' || activeTab === 'ai' || activeDropdown === 'astrologers' ? 'rgba(245, 208, 97, 0.14)' : 'transparent',
                color: activeTab === 'consultants' || activeTab === 'ai' || activeDropdown === 'astrologers' ? '#FFFFFF' : '#CBD5E1',
                fontSize: '13.5px',
                fontWeight: 650,
                cursor: 'pointer',
                transition: 'all 160ms ease',
              }}
            >
              <Sparkles size={16} color="#F5D061" />
              <span>Astrologers</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'astrologers' ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }} />
            </button>

            {/* Astrologers Dropdown Menu */}
            {activeDropdown === 'astrologers' && (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '280px',
                  backgroundColor: '#0B0E1B',
                  border: '1px solid rgba(245, 208, 97, 0.35)',
                  borderRadius: '12px',
                  padding: '10px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 20px rgba(245, 208, 97, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  zIndex: 100,
                }}
              >
                <button
                  type="button"
                  onClick={() => handleSelectTab('consultants')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    background: activeTab === 'consultants' ? 'rgba(245, 208, 97, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <Sparkles size={16} color="#F5D061" />
                  <div>
                    <div>Expert Astrologers</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 400 }}>Specialist consultations</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectTab('ai')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    background: activeTab === 'ai' ? 'rgba(245, 208, 97, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <Bot size={16} color="#A78BFA" />
                  <div>
                    <div>Chat with Expert Astrologers</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 400 }}>Deep reasoning AI counsel</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Subscription Plans Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('subscription')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeTab === 'subscription' ? '1.5px solid #F5D061' : '1px solid rgba(245, 208, 97, 0.3)',
              background: activeTab === 'subscription' ? 'linear-gradient(135deg, rgba(245, 208, 97, 0.25) 0%, rgba(217, 119, 6, 0.25) 100%)' : 'rgba(245, 208, 97, 0.08)',
              color: '#FDE89C',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 160ms ease',
            }}
          >
            <Crown size={15} color="#F5D061" />
            <span>Plans (₹199/yr)</span>
          </button>
        </nav>

        {/* 3. Right: Language, Notifications, Profile & Upgrade CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'lang' ? null : 'lang')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                padding: '6px 10px',
                color: '#E2E8F0',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Globe size={14} color="#F5D061" />
              <span>{LANGUAGE_LABELS[language]?.script || 'EN'}</span>
            </button>

            {activeDropdown === 'lang' && (
              <div
                style={{
                  position: 'absolute',
                  top: '38px',
                  right: 0,
                  width: '180px',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  backgroundColor: '#0B0E1B',
                  border: '1px solid rgba(245, 208, 97, 0.35)',
                  borderRadius: '10px',
                  padding: '6px',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.9)',
                  zIndex: 100,
                }}
              >
                {(Object.keys(LANGUAGE_LABELS) as LanguageCode[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setLanguage(code);
                      setActiveDropdown(null);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 10px',
                      background: language === code ? 'rgba(245, 208, 97, 0.15)' : 'none',
                      border: 'none',
                      borderRadius: '6px',
                      color: language === code ? '#F5D061' : '#E2E8F0',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span>{LANGUAGE_LABELS[code].label}</span>
                    {language === code && <Check size={12} color="#F5D061" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            type="button"
            onClick={onOpenNotifications}
            style={{
              position: 'relative',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#CBD5E1',
              cursor: 'pointer',
            }}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#F5D061',
                  boxShadow: '0 0 8px #F5D061',
                }}
              />
            )}
          </button>

          {/* My Profile Quick Avatar */}
          <button
            type="button"
            onClick={() => handleSelectTab('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px 4px 4px',
              borderRadius: '24px',
              background: activeTab === 'profile' ? 'rgba(245, 208, 97, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: activeTab === 'profile' ? '1px solid #F5D061' : '1px solid rgba(255, 255, 255, 0.12)',
              cursor: 'pointer',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={user.name}
              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF' }}>
              Profile
            </span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'rgba(245, 208, 97, 0.1)',
              border: '1px solid rgba(245, 208, 97, 0.3)',
              color: '#F5D061',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Responsive when window is narrow) */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#090C18',
            borderBottom: '1px solid rgba(245, 208, 97, 0.3)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.9)',
          }}
        >
          {[
            { tab: 'discover', label: 'Discover & Overview', icon: <Compass size={16} /> },
            { tab: 'charts', label: 'Birth Charts & Kundli', icon: <PieChart size={16} /> },
            { tab: 'tools', label: 'Astrology Tools Hub (33+)', icon: <Calculator size={16} /> },
            { tab: 'reports', label: 'Certified Reports', icon: <FileText size={16} /> },
            { tab: 'learn', label: 'Learn Astrology', icon: <BookOpen size={16} /> },
            { tab: 'consultants', label: 'Expert Astrologers', icon: <Sparkles size={16} /> },
            { tab: 'ai', label: 'Chat with Expert Astrologers', icon: <Bot size={16} /> },
            { tab: 'subscription', label: 'Subscription & Plans (₹199/yr)', icon: <Crown size={16} /> },
            { tab: 'profile', label: 'My Profile & Settings', icon: <User size={16} /> },
          ].map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => handleSelectTab(item.tab as NavTab)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                background: activeTab === item.tab ? 'rgba(245, 208, 97, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                border: activeTab === item.tab ? '1px solid #F5D061' : '1px solid rgba(255, 255, 255, 0.06)',
                color: activeTab === item.tab ? '#F5D061' : '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translate(-50%, -6px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @media (max-width: 900px) {
          .desktop-horizontal-nav {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
