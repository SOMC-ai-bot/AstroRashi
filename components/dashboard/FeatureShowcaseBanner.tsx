'use client';

import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  Calendar,
  FileText,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface FeatureShowcaseBannerProps {
  onNavigateTab: (tab: string) => void;
}

interface FeatureItem {
  id: string;
  tab: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  ctaText: string;
  gradient: string;
  icon: React.ReactNode;
  statLabel: string;
  statValue: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'matching',
    tab: 'matching',
    badge: 'KUNDLI MATCHING',
    title: '36-Guna Milan & Marriage Synergy',
    tagline: 'Deep Ashtakoota compatibility analysis with Manglik & Nadi Dosha audits',
    description: 'Compare two birth charts across all 8 Vedic kootas. Get instant astrological harmony scores, dosha cancellations, and downloadable PDF reports.',
    highlights: ['36 Guna Ashtakoot Score', 'Mangal & Nadi Dosha Audits', 'Side-by-Side Dual Charts'],
    ctaText: 'Match Horoscopes Now',
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(249, 115, 22, 0.1) 100%)',
    icon: <Heart size={20} color="#EC4899" />,
    statLabel: 'Accuracy',
    statValue: '36 Gunas',
  },
  {
    id: 'ai',
    tab: 'ai',
    badge: 'AI VEDIC ADVISOR',
    title: 'Instant 24/7 Astrological Counsel',
    tagline: 'Empowered by authentic Parashari calculations and astronomical ephemerides',
    description: 'Ask any question on love, career, health, or Sade Sati. Receive structured, multi-column insights with verified planetary placements and remedies.',
    highlights: ['Deep Classical Synthesis', 'Multi-Language Responses', 'Instant Astrological Remedies'],
    ctaText: 'Consult AstroRashi AI',
    gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)',
    icon: <Sparkles size={20} color="#F97316" />,
    statLabel: 'Response Time',
    statValue: 'Real-time',
  },
  {
    id: 'panchang',
    tab: 'panchang',
    badge: 'DAILY PANCHANG',
    title: 'Auspicious Muhurats & Multi-Month Calendar',
    tagline: 'Real-time Tithi, Nakshatra, Rahu Kaal, and festive auspicious windows',
    description: 'Plan ceremonies, business investments, and journeys with verified planetary hours, Choghadiya, and full multi-month Gregorian-Vedic calendar navigation.',
    highlights: ['Live Rahu Kaal Alerts', 'Abhijit Muhurat Timing', 'Complete Month Navigation'],
    ctaText: 'Open Full Panchang',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)',
    icon: <Calendar size={20} color="#3B82F6" />,
    statLabel: 'Calendar',
    statValue: '12 Months',
  },
  {
    id: 'reports',
    tab: 'reports',
    badge: 'CERTIFIED DOSSIERS',
    title: 'In-Depth Vedic Life & Planetary Reports',
    tagline: '10-Chapter master dossiers covering career, love, Sade Sati & gemstones',
    description: 'Uncover the planetary blueprint of your life with exhaustive shastric interpretations, dasha timelines, and verified gemstone prescriptions.',
    highlights: ['10-Chapter Dossiers', 'Vimshottari Timeline', 'Print & PDF Ready'],
    ctaText: 'Explore All Reports',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
    icon: <FileText size={20} color="#10B981" />,
    statLabel: 'Reports',
    statValue: '10+ Types',
  },
  {
    id: 'charts',
    tab: 'charts',
    badge: 'INTERACTIVE KUNDLI',
    title: 'Sacred Diamond Charts & Transit Matrix',
    tagline: 'Authentic North Indian chart rendering with real-time planetary transits',
    description: 'Inspect every Bhava, planetary degree, retrogradation, and functional dignity with responsive interactive visual diamond charts.',
    highlights: ['North Indian Diamond SVG', 'Planetary Strengths (Shadbala)', 'Real-Time Transits (Gochar)'],
    ctaText: 'View Your Kundli',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(249, 115, 22, 0.1) 100%)',
    icon: <Compass size={20} color="#A855F7" />,
    statLabel: 'Houses',
    statValue: '12 Bhavas',
  },
];

export const FeatureShowcaseBanner: React.FC<FeatureShowcaseBannerProps> = ({ onNavigateTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const active = FEATURES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        backgroundColor: '#131418',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 200ms ease',
      }}
    >
      {/* Dynamic Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: '140px',
          background: active.gradient,
          pointerEvents: 'none',
          transition: 'background 400ms ease',
        }}
      />

      {/* Top Tab Bar Pills */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '12px 14px 10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {FEATURES.map((item, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '10px',
                border: isSelected ? '1px solid rgba(249, 115, 22, 0.6)' : '1px solid transparent',
                backgroundColor: isSelected ? 'rgba(249, 115, 22, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: isSelected ? '#FFFFFF' : '#94A3B8',
                fontSize: '11px',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 160ms ease',
                flexShrink: 0,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
              <span>{item.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '20px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                color: '#F97316',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                backgroundColor: 'rgba(249, 115, 22, 0.12)',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(249, 115, 22, 0.25)',
              }}
            >
              {active.badge}
            </span>
            <span style={{ fontSize: '11px', color: '#64748B' }}>
              ✦ Feature Spotlight
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>{active.statValue}</span>
            <span style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase' }}>{active.statLabel}</span>
          </div>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px' }}>
          {active.title}
        </h3>

        <p style={{ fontSize: '12px', color: '#CBD5E1', margin: '0 0 14px', lineHeight: 1.45 }}>
          {active.description}
        </p>

        {/* Feature Highlights Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {active.highlights.map((h, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '10.5px',
                color: '#94A3B8',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '3px 9px',
                borderRadius: '6px',
              }}
            >
              <CheckCircle2 size={12} color="#10B981" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* CTA Action Button with side next arrow button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => onNavigateTab(active.tab)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '11px 18px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(249, 115, 22, 0.35)',
              transition: 'transform 140ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span>{active.ctaText}</span>
            <ArrowRight size={15} />
          </button>

          {/* Side Next Arrow Button */}
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % FEATURES.length)}
            title="Next Feature Spotlight"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              color: '#F97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.2)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Progress Dots Indicator with Side Navigation Arrows */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', paddingBottom: '14px' }}>
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length)}
          title="Previous Feature"
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '2px 6px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ChevronLeft size={15} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {FEATURES.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? '22px' : '6px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: idx === currentIndex ? '#F97316' : 'rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % FEATURES.length)}
          title="Next Feature"
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '2px 6px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};
