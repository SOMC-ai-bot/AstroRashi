'use client';

import React from 'react';
import { NavTab } from './BottomNav';
import { useAuth } from '@/lib/state/auth-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import {
  Compass,
  PieChart,
  Bot,
  Sparkles,
  Calculator,
  Calendar,
  FileText,
  BookOpen,
  Crown,
  ChevronRight,
  User,
  MessageSquare,
} from 'lucide-react';

interface DesktopSidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenPremium: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenPremium,
}) => {
  const { user } = useAuth();
  const { natalChart, activeProfile } = useAstrology();
  const { t } = useI18n();

  const sun = natalChart.planets.find((p) => p.name === 'Sun');
  const moon = natalChart.planets.find((p) => p.name === 'Moon');
  const asc = natalChart.ascendant;

  const mainNavItems: { tab: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'discover', label: t.nav.discover, icon: <Compass size={18} /> },
    { tab: 'charts', label: t.nav.charts, icon: <PieChart size={18} /> },
    { tab: 'tools', label: 'All Calculators (33+)', icon: <Calculator size={18} />, badge: '33+' },
    { tab: 'reports', label: 'Certified Reports', icon: <FileText size={18} />, badge: '10' },
    { tab: 'learn', label: 'Learn Astrology', icon: <BookOpen size={18} /> },
  ];

  const expertNavItems: { tab: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'consultants', label: 'Expert Astrologers', icon: <Sparkles size={18} />, badge: 'Verified' },
    { tab: 'ai', label: 'Chat with Expert Astrologers', icon: <Bot size={18} /> },
  ];

  const secondaryNavItems: { tab: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'subscription', label: 'Subscription & Plans', icon: <Crown size={18} />, badge: user.isPremium ? 'PRO' : 'Upgrade' },
    { tab: 'profile', label: 'My Profiles & Settings', icon: <User size={18} /> },
  ];

  return (
    <aside
      style={{
        width: '280px',
        minHeight: '100vh',
        backgroundColor: 'rgba(8, 5, 18, 0.94)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        borderRight: '1px solid rgba(168, 85, 247, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 18px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        flexShrink: 0,
        boxShadow: '10px 0 40px rgba(0, 0, 0, 0.85)',
        zIndex: 40,
      }}
    >
      <div>
        {/* Brand Header */}
        <div
          onClick={() => onTabChange('discover')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '6px 8px 24px',
            cursor: 'pointer',
            borderBottom: '1px solid rgba(168, 85, 247, 0.16)',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
              border: '1px solid rgba(192, 132, 252, 0.5)',
              position: 'relative',
            }}
          >
            {/* Sacred Star Pentagram SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div>
            <h1
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
            </h1>
            <span style={{ fontSize: '10px', color: '#C084FC', fontWeight: 600, letterSpacing: '0.06em' }}>
              VEDIC WISDOM
            </span>
          </div>
        </div>

        {/* Section 1: Exploration & Tools */}
        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0 10px 8px',
            }}
          >
            Exploration & Tools
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {mainNavItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => onTabChange(item.tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive
                      ? 'linear-gradient(90deg, rgba(124, 58, 237, 0.28) 0%, rgba(26, 17, 50, 0.8) 100%)'
                      : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s ease',
                    boxShadow: isActive ? '0 4px 18px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none',
                    borderLeft: isActive ? '3px solid #C084FC' : '3px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                    <span style={{ color: isActive ? '#C084FC' : 'var(--text-muted)' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 7px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(250, 204, 21, 0.15)',
                        border: '1px solid rgba(250, 204, 21, 0.3)',
                        color: '#FACC15',
                        fontWeight: 700,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Expert Astrologers */}
        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0 10px 8px',
            }}
          >
            Expert Astrologers
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {expertNavItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => onTabChange(item.tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive
                      ? 'linear-gradient(90deg, rgba(250, 204, 21, 0.18) 0%, rgba(20, 21, 33, 0.8) 100%)'
                      : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s ease',
                    boxShadow: isActive ? '0 4px 18px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none',
                    borderLeft: isActive ? '3px solid #FACC15' : '3px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                    <span style={{ color: isActive ? '#FACC15' : 'var(--text-muted)' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '10.5px',
                        padding: '2px 7px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(250, 204, 21, 0.15)',
                        border: '1px solid rgba(250, 204, 21, 0.3)',
                        color: '#FACC15',
                        fontWeight: 700,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Account & Hub */}
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0 10px 8px',
            }}
          >
            Account & Hub
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {secondaryNavItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => onTabChange(item.tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <span style={{ color: isActive ? '#38BDF8' : 'var(--text-muted)' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Area: User Profile Snapshot & Pro CTA */}
      <div
        style={{
          paddingTop: '18px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Active Profile Pill */}
        <div
          onClick={() => onTabChange('charts')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(14, 15, 24, 0.9) 100%)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {activeProfile.name}
            </div>
            <div style={{ fontSize: '11px', color: '#FACC15', fontWeight: 600 }}>
              ☉ {sun?.sign} • ☽ {moon?.sign}
            </div>
          </div>
          <span
            style={{
              fontSize: '11.5px',
              color: '#38BDF8',
              fontWeight: 700,
              background: 'rgba(37, 99, 235, 0.15)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
            }}
          >
            AC {asc.sign}
          </span>
        </div>

        {/* Upgrade / Pro Button if Free */}
        {!user.isPremium ? (
          <button
            onClick={onOpenPremium}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'linear-gradient(135deg, #FF6A00 0%, #FACC15 100%)',
              color: '#08080B',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(255, 106, 0, 0.45)',
              transition: 'transform 0.2s ease',
            }}
          >
            <Crown size={16} />
            <span>Unlock AstroNex PRO</span>
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(250, 204, 21, 0.12)',
              border: '1px solid rgba(250, 204, 21, 0.35)',
              color: '#FACC15',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            <span>VIP Pro Access Active</span>
            <Crown size={15} />
          </div>
        )}
      </div>
    </aside>
  );
};
