'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, Moon, ChevronRight, Info } from 'lucide-react';

interface MoonPhaseItem {
  name: string;
  sanskrit: string;
  tithiRange: string;
  minPhase: number; // 0 to 1
  maxPhase: number;
  illumination: string;
  meaning: string;
  spiritualAction: string;
  svgPath: (isLive: boolean) => React.ReactNode;
}

// Astronomical lunar synodic calculation
function getMoonPhaseData(date: Date = new Date()) {
  // Known new moon reference epoch: January 11, 2024 at 11:57 UTC
  const knownNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57, 0)).getTime();
  const synodicMonth = 29.53058867; // average lunar synodic month in days
  const now = date.getTime();
  const diffDays = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
  const phaseFraction = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth / synodicMonth;
  const moonAgeDays = phaseFraction * synodicMonth;
  const illuminationPercent = Math.round(((1 - Math.cos(phaseFraction * 2 * Math.PI)) / 2) * 100);

  // Determine Tithi (1 of 30 lunar days: 1-15 Shukla, 1-15 Krishna)
  const tithiIndex = Math.floor(phaseFraction * 30);
  const isShukla = tithiIndex < 15;
  const tithiNum = (tithiIndex % 15) + 1;

  const tithiNames = [
    'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi',
    isShukla ? 'Purnima (Full Moon)' : 'Amavasya (New Moon)'
  ];

  const currentTithi = `${isShukla ? 'Shukla' : 'Krishna'} ${tithiNames[tithiNum - 1]}`;

  return {
    phaseFraction,
    moonAgeDays: Number(moonAgeDays.toFixed(1)),
    illuminationPercent,
    currentTithi,
    isShukla,
  };
}

export const MoonPhasesRibbon: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [lunarData, setLunarData] = useState(() => getMoonPhaseData(new Date()));
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentDate(now);
      setLunarData(getMoonPhaseData(now));
    };
    update();
    const interval = setInterval(update, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const moonPhases: MoonPhaseItem[] = [
    {
      name: 'New Moon',
      sanskrit: 'Amavasya',
      tithiRange: 'Krishna 15 / Shukla 0',
      minPhase: 0.97,
      maxPhase: 0.03,
      illumination: '0% - 2%',
      meaning: 'Karmic reset, quiet introspection, seed planting, and mental purification.',
      spiritualAction: 'Ideal for Shiva mantra sadhana, ancestral gratitude (Tarpanam), and stillness.',
      svgPath: (isLive) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#0C0719" stroke={isLive ? '#C084FC' : '#7C3AED'} strokeWidth="1.5" />
          <circle cx="20" cy="20" r="16" fill="radial-gradient(circle, #1E1238 0%, #0A0614 85%)" />
        </svg>
      ),
    },
    {
      name: 'Waxing Crescent',
      sanskrit: 'Shukla Dvitiya',
      tithiRange: 'Shukla 1 - 4',
      minPhase: 0.03,
      maxPhase: 0.22,
      illumination: '3% - 34%',
      meaning: 'Awakening of creative prana, initial momentum, and setting deliberate intentions.',
      spiritualAction: 'Chant Chandra Beej Mantra for mental peace; initiate new creative ideas.',
      svgPath: (isLive) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#120B24" stroke={isLive ? '#C084FC' : '#7C3AED'} strokeWidth="1" />
          <path d="M 20 2 A 18 18 0 0 1 20 38 A 12 18 0 0 0 20 2 Z" fill={isLive ? '#FFFFFF' : '#E9D5FF'} />
        </svg>
      ),
    },
    {
      name: 'First Quarter',
      sanskrit: 'Shukla Ashtami',
      tithiRange: 'Shukla 5 - 9',
      minPhase: 0.22,
      maxPhase: 0.28,
      illumination: '35% - 65%',
      meaning: 'Overcoming obstacles, energetic commitment, resilience, and conscious resolve.',
      spiritualAction: 'Durga and Lakshmi sadhana; make definitive decisions on career ventures.',
      svgPath: (isLive) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#120B24" stroke={isLive ? '#C084FC' : '#7C3AED'} strokeWidth="1" />
          <path d="M 20 2 A 18 18 0 0 1 20 38 Z" fill={isLive ? '#FFFFFF' : '#F3EEFF'} />
        </svg>
      ),
    },
    {
      name: 'Waxing Gibbous',
      sanskrit: 'Shukla Ekadashi',
      tithiRange: 'Shukla 10 - 14',
      minPhase: 0.28,
      maxPhase: 0.47,
      illumination: '66% - 96%',
      meaning: 'High pranic accumulation, intellectual refinement, expansion, and nourishment.',
      spiritualAction: 'Ekadashi fasting, spiritual study, meditation, and benevolent charity.',
      svgPath: (isLive) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#120B24" stroke={isLive ? '#C084FC' : '#7C3AED'} strokeWidth="1" />
          <path d="M 20 2 A 18 18 0 0 1 20 38 A 12 18 0 0 1 20 2 Z" fill={isLive ? '#FFFFFF' : '#F5F3FF'} />
        </svg>
      ),
    },
    {
      name: 'Full Moon',
      sanskrit: 'Purnima',
      tithiRange: 'Shukla 15',
      minPhase: 0.47,
      maxPhase: 0.53,
      illumination: '97% - 100%',
      meaning: 'Peak consciousness, spiritual illumination, emotional clarity, and culmination.',
      spiritualAction: 'Satyanarayan Puja, Moon bath meditation, and charging crystals.',
      svgPath: (isLive) => (
        <svg width="42" height="42" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="19" fill="#FFFFFF" filter="drop-shadow(0 0 8px #E9D5FF)" stroke="#DDD6FE" strokeWidth="1.2" />
          <circle cx="16" cy="18" r="3" fill="#C4B5FD" opacity="0.35" />
          <circle cx="26" cy="24" r="4.5" fill="#C4B5FD" opacity="0.25" />
        </svg>
      ),
    },
    {
      name: 'Waning Gibbous',
      sanskrit: 'Krishna Pratipada',
      tithiRange: 'Krishna 1 - 5',
      minPhase: 0.53,
      maxPhase: 0.72,
      illumination: '96% - 66%',
      meaning: 'Gratitude, dissemination of earned wisdom, sharing blessings, and release.',
      spiritualAction: 'Journaling, teaching, resolving debts, and offering gratitude.',
      svgPath: (isLive) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#120B24" stroke={isLive ? '#C084FC' : '#7C3AED'} strokeWidth="1" />
          <path d="M 20 2 A 18 18 0 0 0 20 38 A 12 18 0 0 0 20 2 Z" fill={isLive ? '#FFFFFF' : '#F5F3FF'} />
        </svg>
      ),
    },
    {
      name: 'Third Quarter',
      sanskrit: 'Krishna Ashtami',
      tithiRange: 'Krishna 6 - 9',
      minPhase: 0.72,
      maxPhase: 0.78,
      illumination: '65% - 35%',
      meaning: 'Emotional release, forgiveness, clearing outworn energetic ties, and discernment.',
      spiritualAction: 'Kala Bhairava sadhana, de-cluttering physical and mental spaces.',
      svgPath: (isLive) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#120B24" stroke={isLive ? '#C084FC' : '#7C3AED'} strokeWidth="1" />
          <path d="M 20 2 A 18 18 0 0 0 20 38 Z" fill={isLive ? '#FFFFFF' : '#F3EEFF'} />
        </svg>
      ),
    },
    {
      name: 'Waning Crescent',
      sanskrit: 'Krishna Trayodashi',
      tithiRange: 'Krishna 10 - 14',
      minPhase: 0.78,
      maxPhase: 0.97,
      illumination: '34% - 3%',
      meaning: 'Deep surrender, quiet recuperation, spiritual detox, and preparation for renewal.',
      spiritualAction: 'Maha Shivratri / Masa Shivaratri fast, silent japa, deep restorative sleep.',
      svgPath: (isLive) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#120B24" stroke={isLive ? '#C084FC' : '#7C3AED'} strokeWidth="1" />
          <path d="M 20 2 A 18 18 0 0 0 20 38 A 12 18 0 0 1 20 2 Z" fill={isLive ? '#FFFFFF' : '#E9D5FF'} />
        </svg>
      ),
    },
  ];

  // Find active phase index based on live phaseFraction
  const activePhaseIdx = moonPhases.findIndex((p) => {
    if (p.minPhase > p.maxPhase) {
      // Wraps around New Moon (0.97 to 0.03)
      return lunarData.phaseFraction >= p.minPhase || lunarData.phaseFraction < p.maxPhase;
    }
    return lunarData.phaseFraction >= p.minPhase && lunarData.phaseFraction < p.maxPhase;
  });

  const currentPhase = moonPhases[activePhaseIdx >= 0 ? activePhaseIdx : 0];
  const displayedPhase = selectedPhaseIdx !== null ? moonPhases[selectedPhaseIdx] : currentPhase;
  const isSelectedCurrent = selectedPhaseIdx === null || selectedPhaseIdx === activePhaseIdx;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        padding: '24px 20px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.22) 0%, rgba(13, 8, 25, 0.95) 75%)',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Header with Live Astro Time */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#C084FC',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4px',
          }}
        >
          <Sparkles size={13} />
          <span>Real-Time Ephemeris Lunar Cycle</span>
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '24px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '0.04em',
            marginBottom: '8px',
          }}
        >
          Psychic Readings & Lunar Calendar
        </h3>

        {/* Live Date, Illumination & Tithi Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#34D399',
              fontSize: '11px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            Live Now: {currentPhase.name} ({lunarData.illuminationPercent}% Illumination)
          </span>

          <span
            style={{
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#DDD6FE',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            Tithi: {lunarData.currentTithi} • Age: {lunarData.moonAgeDays} days
          </span>
        </div>
      </div>

      {/* Moon Phases Horizontal Ribbon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          overflowX: 'auto',
          padding: '8px 4px 16px',
        }}
      >
        {moonPhases.map((phase, idx) => {
          const isLiveNow = idx === activePhaseIdx;
          const isSelected = selectedPhaseIdx === idx || (selectedPhaseIdx === null && isLiveNow);

          return (
            <div
              key={idx}
              onClick={() => setSelectedPhaseIdx(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                minWidth: '76px',
                cursor: 'pointer',
                padding: '8px 4px',
                borderRadius: '8px',
                background: isSelected ? 'rgba(168, 85, 247, 0.18)' : 'transparent',
                border: isSelected ? '1px solid rgba(192, 132, 252, 0.45)' : '1px solid transparent',
                transition: 'all 200ms ease',
                transform: isSelected ? 'translateY(-2px)' : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  borderRadius: '50%',
                  background: isLiveNow ? 'rgba(168, 85, 247, 0.3)' : 'transparent',
                  boxShadow: isLiveNow ? '0 0 20px rgba(168, 85, 247, 0.6)' : 'none',
                }}
              >
                {phase.svgPath(isLiveNow)}
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#FFFFFF' : '#A79BBF',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {phase.name}
              </span>

              <span
                style={{
                  fontSize: '10px',
                  color: isLiveNow ? '#FBBF24' : '#C084FC',
                  fontWeight: 600,
                }}
              >
                {isLiveNow ? 'Active Today' : phase.sanskrit}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detail Drawer for Selected / Live Lunar Energy */}
      <div
        style={{
          marginTop: '6px',
          padding: '14px 18px',
          borderRadius: '8px',
          background: 'rgba(8, 5, 18, 0.75)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
              {displayedPhase.name} ({displayedPhase.sanskrit})
            </span>
            {isSelectedCurrent && (
              <span style={{ fontSize: '10px', color: '#34D399', fontWeight: 700, background: 'rgba(16, 185, 129, 0.2)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                Current Sky
              </span>
            )}
          </div>
          <p style={{ fontSize: '12px', color: '#DDD6FE', lineHeight: 1.45 }}>
            {displayedPhase.meaning}
          </p>
        </div>

        <div style={{ borderLeft: '1px solid rgba(168, 85, 247, 0.2)', paddingLeft: '14px' }}>
          <span style={{ fontSize: '11px', color: '#FBBF24', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
            ✦ Cosmic Guidance & Sadhana:
          </span>
          <p style={{ fontSize: '12px', color: '#A79BBF', lineHeight: 1.45 }}>
            {displayedPhase.spiritualAction}
          </p>
        </div>
      </div>
    </div>
  );
};
