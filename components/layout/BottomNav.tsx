'use client';

import React from 'react';
import {
  Home,
  LayoutDashboard,
  PieChart,
  Heart,
  Calendar,
  Sparkles,
  Crown,
  Calculator,
} from 'lucide-react';
import { GlowingOrb } from '@/components/ai/GlowingOrb';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useAuth } from '@/lib/state/auth-context';

export type NavTab =
  | 'home'
  | 'dashboard'
  | 'discover'
  | 'charts'
  | 'matching'
  | 'panchang'
  | 'tools'
  | 'reports'
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
  const { isAuthenticated } = useAuth();

  const isHomeOrDashboardActive =
    activeTab === 'home' || activeTab === 'dashboard' || activeTab === 'discover';

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
        height: '68px',
        backgroundColor: '#050608',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(249, 115, 22, 0.22)',
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.85)',
        padding: '0 8px',
      }}
      className="safe-bottom"
    >
      {/* 1. Home (or Dashboard if logged in) */}
      <button
        onClick={() => onTabChange(isAuthenticated ? 'dashboard' : 'home')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isHomeOrDashboardActive ? '#11A8EB' : '#A6A9AF',
          transition: 'all 180ms ease',
          padding: '6px 6px',
        }}
      >
        {isAuthenticated ? (
          <LayoutDashboard size={20} strokeWidth={isHomeOrDashboardActive ? 2.5 : 1.8} />
        ) : (
          <Home size={20} strokeWidth={isHomeOrDashboardActive ? 2.5 : 1.8} />
        )}
        <span style={{ fontSize: '10px', fontWeight: isHomeOrDashboardActive ? 750 : 500 }}>
          {isAuthenticated ? 'Dashboard' : 'Home'}
        </span>
      </button>

      {/* 2. Charts / Kundli */}
      <button
        onClick={() => onTabChange('charts')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'charts' ? '#11A8EB' : '#A6A9AF',
          transition: 'all 180ms ease',
          padding: '6px 6px',
        }}
      >
        <PieChart size={20} strokeWidth={activeTab === 'charts' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10px', fontWeight: activeTab === 'charts' ? 750 : 500 }}>
          Kundli
        </span>
      </button>

      {/* 3. Kundli Match */}
      <button
        onClick={() => onTabChange('matching')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'matching' ? '#11A8EB' : '#A6A9AF',
          transition: 'all 180ms ease',
          padding: '6px 6px',
        }}
      >
        <Heart size={20} strokeWidth={activeTab === 'matching' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10px', fontWeight: activeTab === 'matching' ? 750 : 500 }}>
          Matching
        </span>
      </button>

      {/* 4. Center Glowing Orb for AI Astrologer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-22px',
        }}
      >
        <GlowingOrb
          size={50}
          state={activeTab === 'ai' ? 'thinking' : 'idle'}
          onClick={() => onTabChange('ai')}
        />
        <span
          style={{
            fontSize: '9.5px',
            marginTop: '3px',
            fontWeight: activeTab === 'ai' ? 800 : 600,
            color: activeTab === 'ai' ? '#11A8EB' : '#A6A9AF',
          }}
        >
          Astrologers
        </span>
      </div>

      {/* 5. Panchang */}
      <button
        onClick={() => onTabChange('panchang')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'panchang' ? '#11A8EB' : '#A6A9AF',
          transition: 'all 180ms ease',
          padding: '6px 6px',
        }}
      >
        <Calendar size={20} strokeWidth={activeTab === 'panchang' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10px', fontWeight: activeTab === 'panchang' ? 750 : 500 }}>
          Panchang
        </span>
      </button>

      {/* 5b. Astrology Suite (33+ Calculators Hub) */}
      <button
        onClick={() => onTabChange('tools')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'tools' ? '#11A8EB' : '#A6A9AF',
          transition: 'all 180ms ease',
          padding: '6px 6px',
        }}
      >
        <Calculator size={20} strokeWidth={activeTab === 'tools' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10px', fontWeight: activeTab === 'tools' ? 750 : 500 }}>
          Tools
        </span>
      </button>

      {/* 6. Expert Astrologers */}
      <button
        onClick={() => onTabChange('consultants')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'consultants' ? '#FBBF24' : '#A6A9AF',
          transition: 'all 180ms ease',
          padding: '6px 6px',
        }}
      >
        <Sparkles size={20} strokeWidth={activeTab === 'consultants' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10px', fontWeight: activeTab === 'consultants' ? 750 : 500 }}>
          Experts
        </span>
      </button>

      {/* 7. My Plans */}
      <button
        onClick={() => onTabChange('subscription')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeTab === 'subscription' ? '#FBBF24' : '#A6A9AF',
          transition: 'all 180ms ease',
          padding: '6px 6px',
        }}
      >
        <Crown size={20} strokeWidth={activeTab === 'subscription' ? 2.5 : 1.8} />
        <span style={{ fontSize: '10px', fontWeight: activeTab === 'subscription' ? 750 : 500 }}>
          {isAuthenticated ? 'My Plans' : 'Subscriptions'}
        </span>
      </button>
    </nav>
  );
};
