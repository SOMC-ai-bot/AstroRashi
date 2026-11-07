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
        height: '66px',
        backgroundColor: 'rgba(7, 9, 14, 0.96)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 -6px 24px rgba(0, 0, 0, 0.75)',
        padding: '0 8px',
        maxWidth: '100vw',
      }}
      className="safe-bottom"
    >
      {/* 1. Home / Dashboard */}
      <button
        onClick={() => onTabChange(isAuthenticated ? 'dashboard' : 'home')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flex: 1,
          color: isHomeOrDashboardActive ? '#11A8EB' : '#8E95A3',
          transition: 'all 160ms ease',
          padding: '6px 2px',
        }}
      >
        {isAuthenticated ? (
          <LayoutDashboard size={22} strokeWidth={isHomeOrDashboardActive ? 2.4 : 1.7} />
        ) : (
          <Home size={22} strokeWidth={isHomeOrDashboardActive ? 2.4 : 1.7} />
        )}
        <span style={{ fontSize: '11px', fontWeight: isHomeOrDashboardActive ? 700 : 500, letterSpacing: '0.01em' }}>
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
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flex: 1,
          color: activeTab === 'charts' ? '#11A8EB' : '#8E95A3',
          transition: 'all 160ms ease',
          padding: '6px 2px',
        }}
      >
        <PieChart size={22} strokeWidth={activeTab === 'charts' ? 2.4 : 1.7} />
        <span style={{ fontSize: '11px', fontWeight: activeTab === 'charts' ? 700 : 500, letterSpacing: '0.01em' }}>
          Kundli
        </span>
      </button>

      {/* 3. Center Glowing AI Astrologer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-24px',
          flex: 1.1,
          cursor: 'pointer',
        }}
        onClick={() => onTabChange('ai')}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3px',
            borderRadius: '50%',
            background: activeTab === 'ai'
              ? 'linear-gradient(135deg, #11A8EB 0%, #7C3AED 100%)'
              : 'rgba(255, 255, 255, 0.08)',
            boxShadow: activeTab === 'ai'
              ? '0 6px 20px rgba(17, 168, 235, 0.45)'
              : '0 4px 14px rgba(0, 0, 0, 0.5)',
          }}
        >
          <GlowingOrb
            size={48}
            state={activeTab === 'ai' ? 'thinking' : 'idle'}
          />
        </div>
        <span
          style={{
            fontSize: '11px',
            marginTop: '3px',
            fontWeight: activeTab === 'ai' ? 800 : 600,
            color: activeTab === 'ai' ? '#11A8EB' : '#A6A9AF',
            letterSpacing: '0.01em',
          }}
        >
          AI Chat
        </span>
      </div>

      {/* 4. Panchang / Tools */}
      <button
        onClick={() => onTabChange('panchang')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flex: 1,
          color: activeTab === 'panchang' ? '#11A8EB' : '#8E95A3',
          transition: 'all 160ms ease',
          padding: '6px 2px',
        }}
      >
        <Calendar size={22} strokeWidth={activeTab === 'panchang' ? 2.4 : 1.7} />
        <span style={{ fontSize: '11px', fontWeight: activeTab === 'panchang' ? 700 : 500, letterSpacing: '0.01em' }}>
          Panchang
        </span>
      </button>

      {/* 5. Expert Astrologers */}
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
          flex: 1,
          color: activeTab === 'consultants' ? '#FBBF24' : '#8E95A3',
          transition: 'all 160ms ease',
          padding: '6px 2px',
        }}
      >
        <Sparkles size={22} strokeWidth={activeTab === 'consultants' ? 2.4 : 1.7} />
        <span style={{ fontSize: '11px', fontWeight: activeTab === 'consultants' ? 700 : 500, letterSpacing: '0.01em' }}>
          Experts
        </span>
      </button>
    </nav>
  );
};
