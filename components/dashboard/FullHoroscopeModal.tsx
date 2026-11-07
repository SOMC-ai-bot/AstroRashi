'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Briefcase,
  Heart,
  Activity,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { HOROSCOPE_CATALOG, getHoroscopeChartForSign, ZodiacSignHoroscope } from '@/lib/astrology-engine/horoscope-data';
import { NorthIndianChart } from '@/components/charts/NorthIndianChart';

interface FullHoroscopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  signId: string;
  initialTimeframe?: 'today' | 'weekly' | 'monthly';
  onAskAI?: (prompt: string) => void;
}

export const FullHoroscopeModal: React.FC<FullHoroscopeModalProps> = ({
  isOpen,
  onClose,
  signId,
  initialTimeframe = 'today',
  onAskAI,
}) => {
  const [timeframe, setTimeframe] = useState<'today' | 'weekly' | 'monthly'>(initialTimeframe);

  if (!isOpen) return null;

  const signData: ZodiacSignHoroscope = HOROSCOPE_CATALOG[signId] || HOROSCOPE_CATALOG.scorpio;
  const content = signData[timeframe];
  const chart = getHoroscopeChartForSign(signId);

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#070913', display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflowY: 'auto' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '100%', minHeight: '100vh',
          backgroundColor: '#0F1015',
          border: '1.5px solid rgba(249, 115, 22, 0.35)',
          borderRadius: '20px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.95), 0 0 30px rgba(249, 115, 22, 0.15)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          color: '#E2E8F0',
          position: 'relative',
        }}
      >
        {/* Compact Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'rgba(15, 16, 21, 0.96)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(234, 88, 12, 0.1) 100%)',
                border: '1.5px solid #F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
              }}
            >
              {signData.symbol}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  {signData.name} Horoscope & Charts
                </h2>
                <span style={{ fontSize: '11px', color: '#F97316', fontWeight: 700 }}>
                  {signData.sanskritName}
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#94A3B8', margin: '1px 0 0' }}>
                {signData.dates} • Lord: <strong style={{ color: '#F5D061' }}>{signData.rulingPlanet}</strong> • Element: {signData.element}
              </p>
            </div>
          </div>

          {/* Timeframe Switcher & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                background: '#07080B',
                padding: '2px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {(['today', 'weekly', 'monthly'] as const).map((frame) => (
                <button
                  key={frame}
                  type="button"
                  onClick={() => setTimeframe(frame)}
                  style={{
                    padding: '5px 12px',
                    background: timeframe === frame ? 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' : 'transparent',
                    color: timeframe === frame ? '#FFFFFF' : '#94A3B8',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 120ms ease',
                  }}
                >
                  {frame}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              title="Close"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body: Single Page Split Grid (Zero Empty Spaces) */}
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Top Astro Alignment Metrics Pill Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              backgroundColor: '#07080B',
              borderRadius: '12px',
              padding: '10px 14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
            className="horoscope-modal-metrics"
          >
            <div>
              <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Cosmic Score</span>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#10B981', marginTop: '1px' }}>
                {content.score}% Harmony
              </div>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Lucky Hours</span>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                {content.luckyHours}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Favorable Color</span>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#F97316', marginTop: '2px' }}>
                {signData.luckyColor}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Auspicious Gem</span>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#A855F7', marginTop: '2px' }}>
                {signData.luckyGemstone}
              </div>
            </div>
          </div>

          {/* Balanced 2-Column Edge-to-Edge Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 0.95fr',
              gap: '14px',
              alignItems: 'start',
            }}
            className="horoscope-grid-overview"
          >
            {/* LEFT COLUMN: Overview Narrative + 3 Core Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Vedic Astrological Overview Card */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Sparkles size={14} color="#F97316" />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Astrological Synthesis ({timeframe.toUpperCase()})
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#CBD5E1', margin: 0 }}>
                  {content.summary}
                </p>
              </div>

              {/* Three Pillar Cards: Career, Love, Health */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }} className="horoscope-pillars">
                {/* Career & Wealth */}
                <div
                  style={{
                    backgroundColor: '#14151B',
                    borderRadius: '12px',
                    padding: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ padding: '4px', borderRadius: '6px', backgroundColor: 'rgba(249, 115, 22, 0.15)' }}>
                      <Briefcase size={13} color="#F97316" />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>Career</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: '#CBD5E1', lineHeight: 1.45, margin: 0 }}>
                    {content.career}
                  </p>
                </div>

                {/* Love & Relations */}
                <div
                  style={{
                    backgroundColor: '#14151B',
                    borderRadius: '12px',
                    padding: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ padding: '4px', borderRadius: '6px', backgroundColor: 'rgba(236, 72, 153, 0.15)' }}>
                      <Heart size={13} color="#EC4899" />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>Love</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: '#CBD5E1', lineHeight: 1.45, margin: 0 }}>
                    {content.love}
                  </p>
                </div>

                {/* Health & Vitality */}
                <div
                  style={{
                    backgroundColor: '#14151B',
                    borderRadius: '12px',
                    padding: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ padding: '4px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
                      <Activity size={13} color="#10B981" />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>Health</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: '#CBD5E1', lineHeight: 1.45, margin: 0 }}>
                    {content.health}
                  </p>
                </div>
              </div>

              {/* Shastric Remedy & Beej Mantra */}
              <div
                style={{
                  backgroundColor: '#14131A',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={15} color="#A855F7" />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                    Vedic Remedy & Chanting Frequency
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#CBD5E1', margin: 0, lineHeight: 1.45 }}>
                  {content.remedy}
                </p>
                <div
                  style={{
                    backgroundColor: '#07080B',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontFamily: 'monospace',
                    fontSize: '11.5px',
                    color: '#FBBF24',
                    marginTop: '2px',
                  }}
                >
                  ✦ Mantra: <strong>{signData.mantra}</strong> (108 times at sunrise)
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: North Indian Chart + Auspicious Timing + Ask AI Action */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Real Transit North Indian Diamond Chart */}
              <div
                style={{
                  backgroundColor: '#07080B',
                  borderRadius: '14px',
                  padding: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF' }}>
                    Transit Chart ({signData.name} Asc)
                  </span>
                  <span style={{ fontSize: '10px', color: '#F97316', fontWeight: 600 }}>Sidereal Lahiri</span>
                </div>
                <NorthIndianChart chart={chart} size={210} />
                <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '6px' }}>
                  Live planetary transits mapped across 12 Bhavas
                </span>
              </div>

              {/* Auspicious Timing Card */}
              <div
                style={{
                  backgroundColor: 'rgba(249, 115, 22, 0.08)',
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Clock size={15} color="#F97316" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '11.5px', color: '#E2E8F0', lineHeight: 1.4 }}>
                  <strong>Auspicious Window:</strong> Best hours: <strong>{content.luckyHours}</strong> on <strong>{content.favorableDay}</strong>.
                </span>
              </div>

              {/* Consultation Button */}
              {onAskAI && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onAskAI(`Please provide a comprehensive deep Vedic reading for ${signData.name} (${signData.sanskritName}) for the ${timeframe} cycle with specific house alignments and remedies.`);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '9px 16px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 750,
                    cursor: 'pointer',
                    boxShadow: '0 3px 12px rgba(249, 115, 22, 0.35)',
                    marginTop: '2px',
                  }}
                >
                  <Sparkles size={14} />
                  <span>Ask AI Specialist About {signData.name}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .horoscope-modal-metrics {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .horoscope-grid-overview {
            grid-template-columns: 1fr !important;
          }
          .horoscope-pillars {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
