'use client';

import React from 'react';
import { Compass, PieChart, Sparkles, Calculator, Crown } from 'lucide-react';
import { GlowingOrb } from '@/components/ai/GlowingOrb';
import { useI18n } from '@/lib/i18n/i18n-context';

export type NavTab =
  | 'discover'
  | 'charts'
  | 'tools'
  | 'reports'
  | 'learn'
  | 'ai'
  | 'consultants'
  | 'subscription'
  | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const { t } = useI18n();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '70px',
        backgroundColor: 'rgba(8, 5, 18, 0.94)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(168, 85, 247, 0.2)',
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.85)',
        padding: '0 10px',
      }}
      className="safe-bottom"
    >
      {/* 1. Discover */}
      <button
        onClick={() => onTabChange('discover')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'discover' ? 'var(--theme-orange)' : 'var(--text-muted)',
          transition: 'all 180ms ease',
          padding: '6px 8px',
        }}
      >
        <Compass size={20} strokeWidth={activeTab === 'discover' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10.5px', fontWeight: activeTab === 'discover' ? 700 : 500 }}>
          {t.nav.discover}
        </span>
      </button>

      {/* 2. Charts */}
      <button
        onClick={() => onTabChange('charts')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'charts' ? 'var(--theme-orange)' : 'var(--text-muted)',
          transition: 'all 180ms ease',
          padding: '6px 8px',
        }}
      >
        <PieChart size={20} strokeWidth={activeTab === 'charts' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10.5px', fontWeight: activeTab === 'charts' ? 700 : 500 }}>
          {t.nav.charts}
        </span>
      </button>

      {/* 3. Tools (33+) */}
      <button
        onClick={() => onTabChange('tools')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'tools' ? 'var(--theme-orange)' : 'var(--text-muted)',
          transition: 'all 180ms ease',
          padding: '6px 8px',
        }}
      >
        <Calculator size={20} strokeWidth={activeTab === 'tools' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10.5px', fontWeight: activeTab === 'tools' ? 700 : 500 }}>
          Tools
        </span>
      </button>

      {/* 4. Center Glowing Cosmic Chat Orb */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-24px',
        }}
      >
        <GlowingOrb
          size={52}
          state={activeTab === 'ai' ? 'thinking' : 'idle'}
          onClick={() => onTabChange('ai')}
        />
        <span
          style={{
            fontSize: '10px',
            marginTop: '4px',
            fontWeight: activeTab === 'ai' ? 800 : 600,
            color: activeTab === 'ai' ? 'var(--theme-orange)' : 'var(--text-muted)',
          }}
        >
          Astrologer
        </span>
      </div>

      {/* 5. Expert Astrologers (Specialists) */}
      <button
        onClick={() => onTabChange('consultants')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'consultants' ? '#FACC15' : 'var(--text-muted)',
          transition: 'all 180ms ease',
          padding: '6px 8px',
        }}
      >
        <Sparkles size={20} strokeWidth={activeTab === 'consultants' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10.5px', fontWeight: activeTab === 'consultants' ? 700 : 500 }}>
          Experts
        </span>
      </button>

      {/* 6. Subscriptions */}
      <button
        onClick={() => onTabChange('subscription')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'subscription' ? 'var(--gold-primary)' : 'var(--text-muted)',
          transition: 'all 180ms ease',
          padding: '6px 8px',
        }}
      >
        <Crown size={20} strokeWidth={activeTab === 'subscription' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10.5px', fontWeight: activeTab === 'subscription' ? 700 : 500 }}>
          Plans
        </span>
      </button>
    </nav>
  );
};
