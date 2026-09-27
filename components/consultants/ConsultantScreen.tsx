'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useConsultant } from '@/lib/state/consultant-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { useAuth } from '@/lib/state/auth-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { AIConsultantChatModal } from './AIConsultantChatModal';
import {
  Sparkles,
  Heart,
  Briefcase,
  Clock,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Crown,
} from 'lucide-react';

export const ConsultantScreen: React.FC = () => {
  const {
    specialists,
    startSpecialistSession,
  } = useConsultant();
  const { openUpgradeModal } = useSubscription();
  const { user } = useAuth();
  const { natalChart, activeProfile } = useAstrology();

  const [activeTab, setActiveTab] = useState<'specialists' | 'history'>('specialists');

  const sun = natalChart.planets.find((p) => p.name === 'Sun');
  const moon = natalChart.planets.find((p) => p.name === 'Moon');
  const asc = natalChart.ascendant;

  const getSpecialistIcon = (id: string) => {
    switch (id) {
      case 'love_relationships':
        return <Heart size={22} color="#FBBF24" />;
      case 'career_wealth':
        return <Briefcase size={22} color="#F59E0B" />;
      case 'daily_guidance':
        return <Clock size={22} color="#38BDF8" />;
      case 'classic':
      default:
        return <Sparkles size={22} color="#F59E0B" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '90px' }}>
      {/* Consultant Chat Modal */}
      <AIConsultantChatModal />

      {/* 1. Header & Specialist Disclosure */}
      <div
        style={{
          background: 'radial-gradient(circle at 10% 20%, rgba(245, 158, 11, 0.16) 0%, rgba(13, 11, 22, 0.98) 70%)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: '24px',
          padding: '28px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Badge variant="gold" size="sm" dot>
                AstroNex Certified Faculty
              </Badge>
              <span style={{ fontSize: '12px', color: '#FBBF24', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                Lahiri Ephemeris Verified
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sacred), serif',
                fontSize: '30px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              Expert Astrologers & Specialists
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Dedicated AstroNex specialists focused on love, career, timing, and comprehensive birth chart synthesis with Google Search ephemeris grounding and Google Maps geocoded verification.
            </p>
          </div>

          {/* User's Verified Chart Context Card */}
          <div
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(10, 9, 18, 0.85)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Chart Verification
            </div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
              {activeProfile.name}
            </div>
            <div style={{ fontSize: '12px', color: '#FBBF24', fontWeight: 700 }}>
              ☉ {sun?.sign} • ☽ {moon?.sign} • AC {asc.sign}
            </div>
          </div>
        </div>

        {/* Pro Unlock Banner if Free */}
        {!user.isPremium && (
          <div
            style={{
              marginTop: '20px',
              padding: '14px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Crown size={18} color="#FBBF24" />
              <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 700 }}>
                Unlock all specialist modes with unlimited consultations for just ₹199/year (₹29/mo).
              </span>
            </div>
            <Button
              variant="gold"
              size="sm"
              onClick={() => openUpgradeModal('All Expert Astrologer Specialists')}
            >
              Upgrade to Pro
            </Button>
          </div>
        )}
      </div>

      {/* 2. Navigation Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
        <button
          onClick={() => setActiveTab('specialists')}
          style={{
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'specialists' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'specialists' ? '#000000' : '#FFFFFF',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            boxShadow: activeTab === 'specialists' ? '0 4px 16px rgba(245, 158, 11, 0.4)' : 'none',
          }}
        >
          Specialist Consultations
        </button>

        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: activeTab === 'history' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'history' ? '#000000' : '#FFFFFF',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            boxShadow: activeTab === 'history' ? '0 4px 16px rgba(245, 158, 11, 0.4)' : 'none',
          }}
        >
          Consultation History
        </button>
      </div>

      {/* Tab Content 1: Specialists List - ZERO DESCRIPTIONS OR SUBTEXT UNDER CARDS */}
      {activeTab === 'specialists' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
          {specialists.map((spec) => (
            <Card
              key={spec.id}
              variant="elevated"
              interactive
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(245, 158, 11, 0.22)',
                background: 'linear-gradient(180deg, rgba(20, 18, 33, 0.95) 0%, rgba(10, 9, 18, 0.98) 100%)',
                boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-lg)',
                minHeight: '170px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: `linear-gradient(135deg, ${spec.accentColor}33 0%, rgba(14, 15, 24, 0.95) 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 20px ${spec.accentColor}44`,
                      border: `1.5px solid ${spec.accentColor}66`,
                    }}
                  >
                    {getSpecialistIcon(spec.id)}
                  </div>

                  <Badge variant={spec.isFreeTier ? 'yellow' : (user.isPremium ? 'orange' : 'outline')} size="sm" dot={spec.isFreeTier}>
                    {spec.isFreeTier ? 'Free • AstroNex Specialist' : (user.isPremium ? 'Pro Specialist' : 'Pro Only')}
                  </Badge>
                </div>

                {/* Specialist Title */}
                <h4
                  style={{
                    fontSize: '17.5px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: '1.3',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {spec.name}
                </h4>
              </div>

              {/* Action Button */}
              <div style={{ paddingTop: '18px' }}>
                <Button
                  variant={spec.isFreeTier || user.isPremium ? 'gold' : 'outline'}
                  size="sm"
                  fullWidth
                  onClick={() => {
                    if (spec.isFreeTier || user.isPremium) {
                      startSpecialistSession(spec.id);
                    } else {
                      openUpgradeModal(spec.name);
                    }
                  }}
                >
                  {spec.isFreeTier || user.isPremium ? (
                    <>
                      <span>Consult Specialist</span>
                      <ChevronRight size={14} />
                    </>
                  ) : (
                    <>
                      <span>Unlock with Pro</span>
                      <Crown size={14} color="var(--gold-primary)" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab Content 2: History */}
      {activeTab === 'history' && (
        <Card style={{ padding: '40px', textAlign: 'center', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '1px solid rgba(245, 158, 11, 0.35)',
            }}
          >
            <MessageSquare size={26} color="#FBBF24" />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
            No Archived Consultations
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 auto 20px', lineHeight: 1.5 }}>
            Your consultations with our specialists will appear here. Messages are saved securely with verified chart coordinates.
          </p>
          <Button
            variant="gold"
            size="md"
            onClick={() => setActiveTab('specialists')}
          >
            Start a New Consultation
          </Button>
        </Card>
      )}
    </div>
  );
};
