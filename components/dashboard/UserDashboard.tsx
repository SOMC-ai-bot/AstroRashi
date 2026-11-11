'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/state/auth-context';
import { useChat } from '@/lib/state/chat-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { REPORT_CATALOGUE } from '@/components/reports/ReportsHub';
import { useAstrology } from '@/lib/state/astrology-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { NorthIndianChart } from '@/components/charts/NorthIndianChart';
import { ReportType } from '@/types';
import { FeatureShowcaseBanner } from './FeatureShowcaseBanner';
import { FullHoroscopeModal } from './FullHoroscopeModal';
import { HOROSCOPE_CATALOG } from '@/lib/astrology-engine/horoscope-data';
import {
  Sparkles,
  Heart,
  Briefcase,
  Sun,
  Flame,
  Shield,
  Clock,
  Compass,
  Gem,
  Award,
  Globe,
  Plus,
  Users,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Search,
  HeartHandshake,
  UserCheck,
} from 'lucide-react';

interface UserDashboardProps {
  onNavigateTab: (tab: any) => void;
  onAskAI: (prompt: string) => void;
  onSelectReport?: (reportType: ReportType) => void;
  onOpenCoinsModal?: () => void;
  onOpenPricing?: () => void;
  onAddProfile?: () => void;
}

const ZODIAC_SIGNS_DATA = [
  { id: 'aries', name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
  { id: 'leo', name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
  { id: 'libra', name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' },
];

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onNavigateTab,
  onAskAI,
  onSelectReport,
  onOpenCoinsModal,
  onOpenPricing,
  onAddProfile,
}) => {
  const { user } = useAuth();
  const { natalChart, activeProfile, profiles = [], setActiveProfile } = useAstrology();
  const { t } = useI18n();
  const { setSelectedAstrologerMode } = useChat();
  const { openUpgradeModal } = useSubscription();

  const [promptText, setPromptText] = useState('');
  const [selectedHoroscopeSign, setSelectedHoroscopeSign] = useState('scorpio');
  const [horoscopeTimeframe, setHoroscopeTimeframe] = useState<'today' | 'weekly' | 'monthly'>('monthly');
  const [isHoroscopeModalOpen, setIsHoroscopeModalOpen] = useState(false);

  const currentSignData = HOROSCOPE_CATALOG[selectedHoroscopeSign] || HOROSCOPE_CATALOG.scorpio;
  const currentSignContent = currentSignData[horoscopeTimeframe];

  const handlePrevSign = () => {
    const currentIndex = ZODIAC_SIGNS_DATA.findIndex((s) => s.id === selectedHoroscopeSign);
    const prevIndex = (currentIndex - 1 + ZODIAC_SIGNS_DATA.length) % ZODIAC_SIGNS_DATA.length;
    setSelectedHoroscopeSign(ZODIAC_SIGNS_DATA[prevIndex].id);
  };

  const handleNextSign = () => {
    const currentIndex = ZODIAC_SIGNS_DATA.findIndex((s) => s.id === selectedHoroscopeSign);
    const nextIndex = (currentIndex + 1) % ZODIAC_SIGNS_DATA.length;
    setSelectedHoroscopeSign(ZODIAC_SIGNS_DATA[nextIndex].id);
  };

  const handlePromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    onAskAI(promptText);
  };

  const displayName = user?.name || activeProfile?.name || 'Cosmic Seeker';
  const firstName = displayName.split(' ')[0] || 'Seeker';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '80px', color: '#E2E8F0', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Top Welcome Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '12.5px', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.04em' }}>
            Good Day, Cosmic Soul
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Namaste, <span style={{ color: '#F97316' }}>{firstName}</span>
          </h1>
        </div>
      </div>

      {/* Main 2-Column Responsive Dashboard Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.65fr) minmax(0, 1fr)',
          gap: '24px',
          alignItems: 'start',
          width: '100%',
          maxWidth: '100%',
        }}
        className="dashboard-main-grid"
      >
        {/* ================= LEFT COLUMN ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
          
          {/* Hero Cosmic Search Banner */}
          <div
            style={{
              backgroundColor: '#131418',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
            }}
          >
            {/* Subtle glow effect */}
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#F97316', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ✦ Vedic AI Insights
              </span>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px' }}>
              Ready to decode your destiny?
            </h2>

            {/* Input Box with Coin CTA */}
            <form onSubmit={handlePromptSubmit} style={{ position: 'relative', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Ask about your future..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 105px 14px 18px',
                  backgroundColor: '#0C0D10',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 150ms ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
              />

              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(249, 115, 22, 0.35)',
                }}
              >
                <span>Ask</span>
                <ArrowUpRight size={14} />
              </button>
            </form>

            {/* Suggested Topic Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { label: 'Love', emoji: '❤️', prompt: 'When will I meet my life partner and how will our connection feel?' },
                { label: 'Career', emoji: '💼', prompt: 'What does my 10th house planetary position say about career growth?' },
                { label: 'Health', emoji: '🌿', prompt: 'What planetary transit influences my health and vitality right now?' },
                { label: 'Finance', emoji: '📈', prompt: 'What are my favorable wealth creation periods according to my D1 chart?' },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => onAskAI(chip.prompt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    borderRadius: '20px',
                    color: '#CBD5E1',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 140ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.15)';
                    e.currentTarget.style.borderColor = '#F97316';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                    e.currentTarget.style.color = '#CBD5E1';
                  }}
                >
                  <span style={{ fontSize: '13px' }}>{chip.emoji}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Consult Astrologers */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Consult Astrologers
                </h3>
                <p style={{ fontSize: '12.5px', color: '#94A3B8', margin: '2px 0 0' }}>
                  Pick a specialist mode to open directly into live astrologer chat
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '14px' }}>
              {[
                {
                  id: 'vedic-master',
                  name: 'Vedic Master Astrologer',
                  tag: 'CLASSIC',
                  desc: 'Comprehensive Vedic birth chart synthesis & planetary guidance',
                  icon: <Sparkles size={24} color="#F97316" />,
                  bg: 'rgba(249, 115, 22, 0.12)',
                  borderColor: 'rgba(249, 115, 22, 0.35)',
                },
                {
                  id: 'love-relationship',
                  name: 'Love & Relationship Astrologer',
                  tag: 'ROMANCE',
                  desc: 'Marriage timing, 7th house partner dynamics & soulmate synergy',
                  icon: <HeartHandshake size={24} color="#EC4899" />,
                  bg: 'rgba(236, 72, 153, 0.12)',
                  borderColor: 'rgba(236, 72, 153, 0.35)',
                },
                {
                  id: 'career-wealth',
                  name: 'Career & Wealth Astrologer',
                  tag: 'CAREER',
                  desc: 'Professions, Dhana yogas and vocational pathways from 10th house',
                  icon: <Briefcase size={24} color="#10B981" />,
                  bg: 'rgba(16, 185, 129, 0.12)',
                  borderColor: 'rgba(16, 185, 129, 0.35)',
                },
                {
                  id: 'kundli-milan',
                  name: 'Kundli Milan & Marriage',
                  tag: 'MATCHING',
                  desc: '36-Gunas Ashtakoot compatibility & vivaha timing analysis',
                  icon: <UserCheck size={24} color="#F59E0B" />,
                  bg: 'rgba(245, 158, 11, 0.12)',
                  borderColor: 'rgba(245, 158, 11, 0.35)',
                },
                {
                  id: 'dosha-remedies',
                  name: 'Dosha & Remedial Specialist',
                  tag: 'REMEDIES',
                  desc: 'Sade Sati, Kaal Sarp, gemstone prescriptions & sacred mantras',
                  icon: <Shield size={24} color="#3B82F6" />,
                  bg: 'rgba(59, 130, 246, 0.12)',
                  borderColor: 'rgba(59, 130, 246, 0.35)',
                },
              ].map((engine) => (
                <div
                  key={engine.id}
                  onClick={() => {
                    const isFreeOrGuest = !user?.isPremium && user?.planTier !== 'premium';
                    if (isFreeOrGuest && engine.id !== 'vedic-master') {
                      if (onOpenPricing) {
                        onOpenPricing();
                      } else {
                        openUpgradeModal('Unlock Specialized Niche Astrologers');
                      }
                      return;
                    }
                    setSelectedAstrologerMode(engine.id);
                    onNavigateTab('ai');
                  }}
                  style={{
                    backgroundColor: '#131418',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    cursor: 'pointer',
                    transition: 'all 160ms ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.6)';
                    e.currentTarget.style.backgroundColor = '#181A20';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.backgroundColor = '#131418';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      backgroundColor: engine.bg,
                      border: `1.5px solid ${engine.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {engine.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.06)', color: '#F97316', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                        {engine.tag}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {engine.name}
                    </h4>
                    <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '3px 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3 }}>
                      {engine.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Your Horoscope */}
          <div
            style={{
              backgroundColor: '#131418',
              borderRadius: '20px',
              padding: '22px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>📌</span> Your Horoscope — {currentSignData.name} ({currentSignData.sanskritName})
                        </h3>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
                          <button
                            type="button"
                            onClick={handlePrevSign}
                            aria-label="Previous Sign"
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              color: '#F97316',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 120ms ease',
                            }}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={handleNextSign}
                            aria-label="Next Sign"
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              color: '#F97316',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 120ms ease',
                            }}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                        Ruler: {currentSignData.rulingPlanet} • Element: {currentSignData.element}
                      </span>
                    </div>
                  </div>

                  {/* Timeframe Toggles */}
                  <div style={{ display: 'flex', background: '#0C0D10', padding: '3px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    {(['today', 'weekly', 'monthly'] as const).map((frame) => (
                      <button
                        key={frame}
                        type="button"
                        onClick={() => setHoroscopeTimeframe(frame)}
                        style={{
                          padding: '5px 12px',
                          background: horoscopeTimeframe === frame ? 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' : 'transparent',
                          color: horoscopeTimeframe === frame ? '#FFFFFF' : '#94A3B8',
                          border: 'none',
                          borderRadius: '8px',
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
                </div>

                {/* Zodiac Sign Strip */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '10px',
                    marginBottom: '16px',
                    scrollbarWidth: 'none',
                  }}
                >
                  {ZODIAC_SIGNS_DATA.map((sign) => {
                    const isSelected = selectedHoroscopeSign === sign.id;
                    return (
                      <button
                        key={sign.id}
                        type="button"
                        onClick={() => setSelectedHoroscopeSign(sign.id)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px 12px',
                          borderRadius: '12px',
                          background: isSelected ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '1.5px solid #F97316' : '1px solid rgba(255, 255, 255, 0.06)',
                          color: isSelected ? '#FFFFFF' : '#94A3B8',
                          cursor: 'pointer',
                          flexShrink: 0,
                          minWidth: '60px',
                          transition: 'all 140ms ease',
                        }}
                      >
                        <span style={{ fontSize: '18px', color: isSelected ? '#F97316' : '#E2E8F0' }}>{sign.symbol}</span>
                        <span style={{ fontSize: '11px', fontWeight: 650 }}>{sign.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Real-Time Horoscope Reading */}
                <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#CBD5E1', margin: '0 0 14px' }}>
                  {currentSignContent.summary}
                </p>

                {/* Quick Astrological Metrics Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '16px',
                  }}
                >
                  <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', padding: '3px 9px', borderRadius: '6px', fontWeight: 700 }}>
                    ✨ {currentSignContent.score}% Harmony
                  </span>
                  <span style={{ fontSize: '11px', background: 'rgba(249, 115, 22, 0.1)', color: '#F97316', padding: '3px 9px', borderRadius: '6px', fontWeight: 650 }}>
                    ⏰ {currentSignContent.luckyHours}
                  </span>
                  <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.05)', color: '#CBD5E1', padding: '3px 9px', borderRadius: '6px', fontWeight: 600 }}>
                    🎨 Color: {currentSignData.luckyColor}
                  </span>
                  <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.05)', color: '#CBD5E1', padding: '3px 9px', borderRadius: '6px', fontWeight: 600 }}>
                    💎 Gem: {currentSignData.luckyGemstone}
                  </span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setIsHoroscopeModalOpen(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '8px 18px',
                      color: '#FFFFFF',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(249, 115, 22, 0.35)',
                    }}
                  >
                    <span>Read Full Horoscope & Charts</span>
                    <ChevronRight size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onAskAI(`What is the comprehensive horoscope forecast for ${currentSignData.name} (${currentSignData.sanskritName}) for ${horoscopeTimeframe}?`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      padding: '7px 16px',
                      color: '#E2E8F0',
                      fontSize: '12px',
                      fontWeight: 650,
                      cursor: 'pointer',
                    }}
                  >
                    <Sparkles size={13} color="#F97316" />
                    <span>Ask AI Specialist</span>
                  </button>
            </div>
          </div>

          {/* Section: Your Astrology Readings (Dynamic from Astrological Reports Catalogue) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Your Astrology Readings
                </h3>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                  Complete Certified Reports & Deep Insights ({REPORT_CATALOGUE.length} Dossiers)
                </span>
              </div>
              <span
                onClick={() => onNavigateTab('reports')}
                style={{ fontSize: '12px', color: '#F97316', cursor: 'pointer', fontWeight: 700 }}
              >
                View all reports →
              </span>
            </div>

            {/* Featured Hero Report: 1st Report in catalogue (Life Insights & Cosmic Blueprint) */}
            {REPORT_CATALOGUE[0] && (
              <div
                onClick={() => {
                  if (onSelectReport) onSelectReport(REPORT_CATALOGUE[0].type);
                  else onNavigateTab('reports');
                }}
                style={{
                  background: 'linear-gradient(135deg, #1C1917 0%, #171513 100%)',
                  border: '1.5px solid rgba(249, 115, 22, 0.35)',
                  borderRadius: '18px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                  marginBottom: '16px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                  transition: 'transform 140ms ease, border-color 140ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#F97316';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(249, 115, 22, 0.15)',
                      border: '1.5px solid #F97316',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0,
                    }}
                  >
                    ✨
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px' }}>
                      {REPORT_CATALOGUE[0].title}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 8px', maxWidth: '420px', lineHeight: 1.4 }}>
                      {REPORT_CATALOGUE[0].description}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', background: 'rgba(249, 115, 22, 0.1)', color: '#F97316', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                        Lagna: {natalChart.ascendant?.sign || 'Aries'}
                      </span>
                      <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.05)', color: '#CBD5E1', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                        Moon: {natalChart.planets.find(p => p.name === 'Moon')?.sign || 'Taurus'}
                      </span>
                      <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.05)', color: '#CBD5E1', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                        Sun: {natalChart.planets.find(p => p.name === 'Sun')?.sign || 'Leo'}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(249, 115, 22, 0.18)', border: '1px solid rgba(249, 115, 22, 0.4)', padding: '8px 16px', borderRadius: '20px', color: '#F97316', fontWeight: 800, fontSize: '12.5px', flexShrink: 0 }}>
                  <span>Open Dossier →</span>
                </div>
              </div>
            )}

            {/* All Remaining Reports from Astrological Reports Catalogue */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '12px' }} className="reports-subgrid">
              {REPORT_CATALOGUE.slice(1).map((rep) => (
                <div
                  key={rep.type}
                  onClick={() => {
                    if (onSelectReport) onSelectReport(rep.type);
                    else onNavigateTab('reports');
                  }}
                  style={{
                    backgroundColor: '#131418',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 140ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.6)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ padding: '5px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                          {rep.icon}
                        </div>
                        <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'capitalize' }}>{rep.category}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#F97316', fontWeight: 700 }}>Open →</span>
                    </div>

                    <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px' }}>
                      {rep.title}
                    </h4>
                    <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {rep.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Animated Feature Showcase Tabs Advertisement (Replaces old static launch banner) */}
          <FeatureShowcaseBanner onNavigateTab={onNavigateTab} />

          {/* Kundli Match Quick Card */}
          <div
            style={{
              backgroundColor: '#131418',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Kundli Match
                </h4>
                <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '2px 0 0' }}>
                  Discover your cosmic compatibility with Vedic astrology
                </p>
              </div>
            </div>

            {/* 2 Partner Slots */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', margin: '16px 0' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: '#1F1B24', border: '1px solid rgba(236, 72, 153, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                👤
              </div>
              <div style={{ color: '#EF4444', fontSize: '16px' }}>❤️</div>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: '#1F1B24', border: '1px solid rgba(236, 72, 153, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                👤
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <button
                type="button"
                onClick={() => onNavigateTab('matching')}
                style={{
                  padding: '9px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Girl Details
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('matching')}
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Match Now
              </button>
            </div>
          </div>

          {/* Your Janam Kundli Card (Diagram + Triad Pills) */}
          <div
            style={{
              backgroundColor: '#131418',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              onClick={() => onNavigateTab('charts')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', cursor: 'pointer' }}
            >
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔶</span> Your Janam Kundli
                </h4>
                <p style={{ fontSize: '11px', color: '#94A3B8', margin: '2px 0 0' }}>
                  {activeProfile.birthDate || 'Oct 12, 2018'} • {activeProfile.birthTime || '11:10 AM'} • {activeProfile.birthPlace || 'Barmer, India'}
                </p>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </div>

            {/* Embedded North Indian Diamond SVG Chart */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <NorthIndianChart chart={natalChart} size={280} />
            </div>

            {/* 3 Sign Badges at bottom */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <div style={{ backgroundColor: '#0C0D10', padding: '8px 6px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#F97316' }}>In Scorpio</div>
                <div style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', marginTop: '2px' }}>ASCENDANT</div>
              </div>
              <div style={{ backgroundColor: '#0C0D10', padding: '8px 6px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>In Virgo</div>
                <div style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', marginTop: '2px' }}>SUN SIGN</div>
              </div>
              <div style={{ backgroundColor: '#0C0D10', padding: '8px 6px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7' }}>In Scorpio</div>
                <div style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase', marginTop: '2px' }}>MOON SIGN</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Detailed Horoscope & Transit Chart Modal */}
      <FullHoroscopeModal
        isOpen={isHoroscopeModalOpen}
        onClose={() => setIsHoroscopeModalOpen(false)}
        signId={selectedHoroscopeSign}
        initialTimeframe={horoscopeTimeframe}
        onAskAI={onAskAI}
      />

      <style jsx>{`
        @media (max-width: 900px) {
          .dashboard-main-grid {
            grid-template-columns: 100% !important;
            min-width: 0 !important;
            width: 100% !important;
          }
          .reports-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .reports-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
