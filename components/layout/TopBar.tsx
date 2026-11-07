'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Globe,
  Sparkles,
  Crown,
  User,
  Check,
  Menu,
  X,
  Home,
  LayoutDashboard,
  PieChart,
  Heart,
  Calendar,
  Calculator,
  FileText,
  Bot,
  ChevronDown,
  ShieldCheck,
  Gem,
  Award,
  Layers,
  LogOut,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/lib/state/auth-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { LanguageCode, PlanTier } from '@/types';
import { NavTab } from './BottomNav';
import { AstroRashiLogo } from '@/components/brand/AstroRashiLogo';

interface TopBarProps {
  activeTab?: NavTab;
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
  activeTab = 'home',
  onTabChange,
  onOpenNotifications,
  onOpenPremium,
  onOpenAuth,
  unreadCount = 2,
}) => {
  const { user, isAuthenticated, updatePlan, logout } = useAuth();
  const { language, setLanguage } = useI18n();
  const { currentPlan } = useSubscription();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPlanMenu, setShowPlanMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const planMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setShowLangMenu(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setShowProfileMenu(false);
      }
      if (planMenuRef.current && !planMenuRef.current.contains(target)) {
        setShowPlanMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    onTabChange(tab);
    setShowProfileMenu(false);
    setMobileMenuOpen(false);
  };

  const handleSwitchPlan = (tier: PlanTier) => {
    updatePlan(tier);
    setShowPlanMenu(false);
  };

  const currentTier: 'free' | 'premium' = user.isPremium || user.planTier === 'premium' ? 'premium' : 'free';

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 45, width: '100%' }}>
      {/* Top Glassmorphic Navigation Bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          padding: '0 20px',
          backgroundColor: '#050608',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderBottom: '1px solid #41454D',
          boxShadow: 'none',
        }}
      >
        {/* 1. Left: Brand & AstroRashi Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleSelectTab(isAuthenticated ? 'dashboard' : 'home')}
        >
          <AstroRashiLogo size="md" />
        </div>

        {/* 2. Middle: Horizontal Navigation Bar with Animated Dropdown Menu */}
        <nav
          className="topbar-nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            maxWidth: 'calc(100vw - 380px)',
            flexWrap: 'nowrap',
          }}
        >
          {/* Home Tab - Visible to all participants */}
          <button
            type="button"
            onClick={() => handleSelectTab('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              border:
                activeTab === 'home' || activeTab === 'discover'
                  ? '1.5px solid #11A8EB'
                  : '1px solid transparent',
              background:
                activeTab === 'home' || activeTab === 'discover'
                  ? '#101722'
                  : 'transparent',
              color: activeTab === 'home' || activeTab === 'discover' ? '#FFFFFF' : '#D5D7DA',
              fontSize: '13px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            <Home size={15} color={activeTab === 'home' ? '#11A8EB' : '#A6A9AF'} />
            <span>Home</span>
          </button>

          {/* Dashboard Tab - ONLY visible when user is logged in / registered */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => handleSelectTab('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '20px',
                border: activeTab === 'dashboard' ? '1.5px solid #11A8EB' : '1px solid transparent',
                background:
                  activeTab === 'dashboard'
                    ? 'linear-gradient(135deg, #101722 0%, rgba(234, 88, 12, 0.25) 100%)'
                    : 'transparent',
                color: activeTab === 'dashboard' ? '#FFFFFF' : '#D5D7DA',
                fontSize: '13px',
                fontWeight: 650,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                boxShadow:
                  activeTab === 'dashboard' ? 'none' : 'none',
              }}
            >
              <LayoutDashboard size={15} color={activeTab === 'dashboard' ? '#11A8EB' : '#A6A9AF'} />
              <span>Dashboard</span>
            </button>
          )}

          {/* Birth Chart Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('charts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              border: activeTab === 'charts' ? '1.5px solid #11A8EB' : '1px solid transparent',
              background: activeTab === 'charts' ? '#101722' : 'transparent',
              color: activeTab === 'charts' ? '#FFFFFF' : '#D5D7DA',
              fontSize: '13px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            <PieChart size={15} color={activeTab === 'charts' ? '#11A8EB' : '#A6A9AF'} />
            <span>Birth Chart</span>
          </button>

          {/* Kundli Match Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('matching')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              border: activeTab === 'matching' ? '1.5px solid #11A8EB' : '1px solid transparent',
              background: activeTab === 'matching' ? '#101722' : 'transparent',
              color: activeTab === 'matching' ? '#FFFFFF' : '#D5D7DA',
              fontSize: '13px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            <Heart size={15} color={activeTab === 'matching' ? '#11A8EB' : '#A6A9AF'} />
            <span>Kundli Match</span>
          </button>

          {/* Panchang Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('panchang')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              border: activeTab === 'panchang' ? '1.5px solid #11A8EB' : '1px solid transparent',
              background: activeTab === 'panchang' ? '#101722' : 'transparent',
              color: activeTab === 'panchang' ? '#FFFFFF' : '#D5D7DA',
              fontSize: '13px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            <Calendar size={15} color={activeTab === 'panchang' ? '#11A8EB' : '#A6A9AF'} />
            <span>Panchang</span>
          </button>

          {/* Astrologers (Consult AI Astrologers) Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('ai')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              border: activeTab === 'ai' ? '1.5px solid #11A8EB' : '1px solid transparent',
              background: activeTab === 'ai' ? '#101722' : 'transparent',
              color: activeTab === 'ai' ? '#FFFFFF' : '#D5D7DA',
              fontSize: '13px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            <Sparkles size={15} color={activeTab === 'ai' ? '#11A8EB' : '#A6A9AF'} />
            <span>Astrologers</span>
          </button>

          {/* Experts (Verified Human Astrologers & Consultants) Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('consultants')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              border: activeTab === 'consultants' ? '1.5px solid #11A8EB' : '1px solid transparent',
              background: activeTab === 'consultants' ? '#101722' : 'transparent',
              color: activeTab === 'consultants' ? '#FFFFFF' : '#D5D7DA',
              fontSize: '13px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            <Crown size={15} color={activeTab === 'consultants' ? '#11A8EB' : '#A6A9AF'} />
            <span>Experts</span>
          </button>

          {/* Astrology Tools Hub Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('tools')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              border: activeTab === 'tools' ? '1.5px solid #11A8EB' : '1px solid transparent',
              background: activeTab === 'tools' ? '#101722' : 'transparent',
              color: activeTab === 'tools' ? '#FFFFFF' : '#D5D7DA',
              fontSize: '13px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            <Calculator size={15} color={activeTab === 'tools' ? '#11A8EB' : '#A6A9AF'} />
            <span>Astrology Tools</span>
          </button>

          {/* MY REPORTS Tab (Astrological Reports & Deep Insights) - ONLY visible when user is logged in / signed in */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => handleSelectTab('reports')}
              title="Astrological Reports & Deep Insights — View & Download PDF"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '20px',
                border: activeTab === 'reports' ? '1.5px solid #11A8EB' : '1px solid transparent',
                background: activeTab === 'reports' ? '#101722' : 'transparent',
                color: activeTab === 'reports' ? '#FFFFFF' : '#D5D7DA',
                fontSize: '13px',
                fontWeight: 650,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              <FileText size={15} color={activeTab === 'reports' ? '#11A8EB' : '#A6A9AF'} />
              <span>My Reports</span>
            </button>
          )}

          {/* Store / Plans Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('subscription')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '20px',
              border: activeTab === 'subscription' ? '1.5px solid #11A8EB' : '1px solid transparent',
              background: activeTab === 'subscription' ? '#101722' : 'transparent',
              color: activeTab === 'subscription' ? '#FFFFFF' : '#D5D7DA',
              fontSize: '13px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <Crown size={15} color={activeTab === 'subscription' ? '#11A8EB' : '#A6A9AF'} />
            <span>{isAuthenticated ? 'My Plans' : 'Subscriptions'}</span>
          </button>
        </nav>

        {/* 3. Right: Plan Switcher, Language & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Multilingual Selector */}
          <div ref={langMenuRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '6px 12px',
                color: '#D5D7DA',
                fontSize: '12px',
                fontWeight: 650,
                cursor: 'pointer',
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
                  maxHeight: '260px',
                  overflowY: 'auto',
                  backgroundColor: 'rgba(16, 17, 26, 0.98)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  boxShadow: '0 18px 45px rgba(0, 0, 0, 0.9)',
                  padding: '6px',
                  zIndex: 100,
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
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: language === code ? '#41454D' : 'transparent',
                      color: language === code ? '#11A8EB' : '#FFFFFF',
                      fontSize: '12.5px',
                      fontWeight: language === code ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span>{LANGUAGE_LABELS[code].label}</span>
                    <span style={{ fontSize: '11px', color: '#A6A9AF' }}>
                      {LANGUAGE_LABELS[code].script}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications removed per user request */}

          {/* Account / Profile Button */}
          {isAuthenticated ? (
            <div ref={profileMenuRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px 4px 5px',
                  borderRadius: '24px',
                  background:
                    activeTab === 'profile'
                      ? '#41454D'
                      : 'rgba(255, 255, 255, 0.06)',
                  border:
                    activeTab === 'profile'
                      ? '1px solid #11A8EB'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    user.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                  }
                  alt={user.name}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#FFFFFF' }}>
                  {user.name ? user.name.split(' ')[0] : 'Profile'}
                </span>
                <ChevronDown size={12} color="#A6A9AF" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '44px',
                    right: 0,
                    width: '220px',
                    backgroundColor: 'rgba(16, 17, 26, 0.98)',
                    backdropFilter: 'blur(28px)',
                    border: '1.5px solid rgba(249, 115, 22, 0.35)',
                    borderRadius: '14px',
                    padding: '8px',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.9)',
                    zIndex: 100,
                  }}
                >
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '6px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>{user.name}</div>
                    <div style={{ fontSize: '11px', color: '#11A8EB', fontWeight: 650 }}>{user.email}</div>
                  </div>

                  <button
                    onClick={() => handleSelectTab('dashboard')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      color: '#D5D7DA',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <LayoutDashboard size={14} color="#11A8EB" />
                    <span>My Dashboard</span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('profile')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      color: '#D5D7DA',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <User size={14} color="#38BDF8" />
                    <span>Profile & Settings</span>
                  </button>



                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                      onTabChange('home');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      color: '#EF4444',
                      fontSize: '12.5px',
                      fontWeight: 650,
                      cursor: 'pointer',
                      textAlign: 'left',
                      marginTop: '4px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 16px',
                borderRadius: '20px',
                background: '#11A8EB',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 750,
                cursor: 'pointer',
                boxShadow: '0 2px 14px rgba(249, 115, 22, 0.45)',
                transition: 'transform 0.15s ease',
              }}
            >
              <User size={13} color="#FFFFFF" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Drawer Hamburger Button */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(249, 115, 22, 0.1)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              color: '#11A8EB',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#0A0B10',
            borderBottom: '1.5px solid rgba(249, 115, 22, 0.3)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.95)',
          }}
        >
          {[
            { tab: 'home', label: 'Home', icon: <Home size={16} /> },
            ...(isAuthenticated
              ? [{ tab: 'dashboard', label: 'My Dashboard', icon: <LayoutDashboard size={16} /> }]
              : []),
            { tab: 'charts', label: 'Birth Chart & Kundli', icon: <PieChart size={16} /> },
            { tab: 'matching', label: 'Kundli Matching (Guna Milan)', icon: <Heart size={16} /> },
            { tab: 'panchang', label: 'Vedic Panchang Calendar', icon: <Calendar size={16} /> },
            { tab: 'ai', label: 'AI Astrologers (Conversations)', icon: <Sparkles size={16} /> },
            { tab: 'consultants', label: 'Experts (Verified Astrologers)', icon: <Crown size={16} /> },
            { tab: 'tools', label: 'Astrology Tools (33+ Calculators)', icon: <Calculator size={16} /> },
            { tab: 'reports', label: 'My Reports (Dossiers & PDF)', icon: <FileText size={16} /> },
            { tab: 'subscription', label: 'My Plans', icon: <Crown size={16} /> },
            ...(isAuthenticated
              ? [{ tab: 'profile', label: 'My Profile & Birth Data', icon: <User size={16} /> }]
              : []),
          ].map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => handleSelectTab(item.tab as NavTab)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '8px',
                background:
                  activeTab === item.tab ? '#101722' : 'rgba(255, 255, 255, 0.03)',
                border:
                  activeTab === item.tab ? '1px solid #11A8EB' : '1px solid rgba(255, 255, 255, 0.06)',
                color: activeTab === item.tab ? '#FFFFFF' : '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 650,
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <span style={{ color: activeTab === item.tab ? '#11A8EB' : '#A6A9AF' }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}

          {!isAuthenticated && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth && onOpenAuth();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 16px',
                borderRadius: '8px',
                background: '#11A8EB',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                marginTop: '6px',
                boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
              }}
            >
              <User size={16} />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 1100px) {
          .topbar-nav-links {
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
