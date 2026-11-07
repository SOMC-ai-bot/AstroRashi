'use client';

import React, { useState } from 'react';
import { useAstrology } from '@/lib/state/astrology-context';
import { useAuth } from '@/lib/state/auth-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { NorthIndianChart } from './NorthIndianChart';
import { SouthIndianChart } from './SouthIndianChart';
import { ZodiacWheel } from './ZodiacWheel';
import { EastIndianChart } from './EastIndianChart';
import { PlacementCards } from './PlacementCards';
import { AspectsTable } from './AspectsTable';
import { TransitsView } from './TransitsView';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Settings2, Compass, ArrowUpRight, ChevronDown, Lock, Download, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { BirthChartDownloadModal } from './BirthChartDownloadModal';
import { PlanetPosition, HousePosition } from '@/types';
import { ZODIAC_SIGNS } from '@/lib/astrology-engine/planetary';
import { getNavamsaSign } from '@/lib/astrology-engine/navamsa';

interface ChartsScreenProps {
  onAskAI: (prompt: string) => void;
  onOpenProfile: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const ChartsScreen: React.FC<ChartsScreenProps> = ({ onAskAI, onOpenProfile, onNavigateTab }) => {
  const { user } = useAuth();
  const {
    natalChart,
    transits,
    selectedPlacement,
    setSelectedPlacement,
    system,
    setSystem,
    activeProfile,
    familyProfiles = [],
    setActiveProfile,
    deleteProfile,
  } = useAstrology();
  const { openUpgradeModal } = useSubscription();

  const isBasicOrPremium = Boolean(user.isPremium || user.planTier === 'basic' || user.planTier === 'premium');
  const isPremium = user.planTier === 'premium';

  // Sub-chart tabs: 'lagna' | 'moon' | 'venus' | 'navamsa'
  const [subChartTab, setSubChartTab] = useState<'lagna' | 'moon' | 'venus' | 'navamsa'>('lagna');
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'east'>('north');
  const [selectedPlanetNames, setSelectedPlanetNames] = useState<string[]>([]);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Dynamically transform chart based on selected subChartTab
  const displayChart = React.useMemo(() => {
    if (subChartTab === 'lagna') {
      return natalChart;
    }

    if (subChartTab === 'moon') {
      const moonPlanet = natalChart.planets.find((p) => p.name === 'Moon');
      if (!moonPlanet) return natalChart;
      const moonSignIndex = ZODIAC_SIGNS.indexOf(moonPlanet.sign);

      const newAscendant: PlanetPosition = {
        ...natalChart.ascendant,
        sign: moonPlanet.sign,
        degree: moonPlanet.degree,
        minute: moonPlanet.minute,
        absoluteDegree: moonPlanet.absoluteDegree,
        house: 1,
      };

      const newPlanets: PlanetPosition[] = natalChart.planets.map((p) => {
        const pSignIndex = ZODIAC_SIGNS.indexOf(p.sign);
        const newHouse = ((pSignIndex - moonSignIndex + 12) % 12) + 1;
        return {
          ...p,
          house: newHouse,
        };
      });

      const newHouses: HousePosition[] = Array.from({ length: 12 }, (_, i) => {
        const hNum = i + 1;
        const sIndex = (moonSignIndex + i) % 12;
        return {
          house: hNum,
          sign: ZODIAC_SIGNS[sIndex],
          degree: 0,
          minute: 0,
          ruler: 'Moon' as any,
          planets: newPlanets.filter((p) => p.house === hNum).map((p) => p.name),
        };
      });

      return {
        ...natalChart,
        ascendant: newAscendant,
        planets: newPlanets,
        houses: newHouses,
      };
    }

    if (subChartTab === 'venus') {
      const venusPlanet = natalChart.planets.find((p) => p.name === 'Venus');
      if (!venusPlanet) return natalChart;
      const venusSignIndex = ZODIAC_SIGNS.indexOf(venusPlanet.sign);

      const newAscendant: PlanetPosition = {
        ...natalChart.ascendant,
        sign: venusPlanet.sign,
        degree: venusPlanet.degree,
        minute: venusPlanet.minute,
        absoluteDegree: venusPlanet.absoluteDegree,
        house: 1,
      };

      const newPlanets: PlanetPosition[] = natalChart.planets.map((p) => {
        const pSignIndex = ZODIAC_SIGNS.indexOf(p.sign);
        const newHouse = ((pSignIndex - venusSignIndex + 12) % 12) + 1;
        return {
          ...p,
          house: newHouse,
        };
      });

      const newHouses: HousePosition[] = Array.from({ length: 12 }, (_, i) => {
        const hNum = i + 1;
        const sIndex = (venusSignIndex + i) % 12;
        return {
          house: hNum,
          sign: ZODIAC_SIGNS[sIndex],
          degree: 0,
          minute: 0,
          ruler: 'Venus' as any,
          planets: newPlanets.filter((p) => p.house === hNum).map((p) => p.name),
        };
      });

      return {
        ...natalChart,
        ascendant: newAscendant,
        planets: newPlanets,
        houses: newHouses,
      };
    }

    if (subChartTab === 'navamsa') {
      const d9Asc = getNavamsaSign(natalChart.ascendant.absoluteDegree);
      const d9AscIndex = d9Asc.navamsaIndex;

      const newAscendant: PlanetPosition = {
        ...natalChart.ascendant,
        sign: d9Asc.navamsaSign,
        degree: Math.floor((natalChart.ascendant.absoluteDegree % (30 / 9)) * 9),
        minute: 0,
        absoluteDegree: d9AscIndex * 30 + 15,
        house: 1,
      };

      const newPlanets: PlanetPosition[] = natalChart.planets.map((p) => {
        const d9P = getNavamsaSign(p.absoluteDegree);
        const newHouse = ((d9P.navamsaIndex - d9AscIndex + 12) % 12) + 1;
        return {
          ...p,
          sign: d9P.navamsaSign,
          house: newHouse,
          absoluteDegree: d9P.navamsaIndex * 30 + (p.absoluteDegree % 3.333) * 9,
          degree: Math.floor((p.absoluteDegree % 3.333) * 9),
        };
      });

      const newHouses: HousePosition[] = Array.from({ length: 12 }, (_, i) => {
        const hNum = i + 1;
        const sIndex = (d9AscIndex + i) % 12;
        return {
          house: hNum,
          sign: ZODIAC_SIGNS[sIndex],
          degree: 0,
          minute: 0,
          ruler: 'Jupiter' as any,
          planets: newPlanets.filter((p) => p.house === hNum).map((p) => p.name),
        };
      });

      return {
        ...natalChart,
        ascendant: newAscendant,
        planets: newPlanets,
        houses: newHouses,
      };
    }

    return natalChart;
  }, [natalChart, subChartTab]);

  const sun = displayChart.planets.find((p) => p.name === 'Sun');
  const moon = displayChart.planets.find((p) => p.name === 'Moon');
  const asc = displayChart.ascendant;

  const handleSelectPlacement = (p: PlanetPosition) => {
    setSelectedPlacement(p);
    setSelectedPlanetNames((prev) =>
      prev.includes(p.name) ? prev.filter((n) => n !== p.name) : [...prev, p.name]
    );
  };

  const getPlanetSymbol = (name: string) => {
    switch (name) {
      case 'Sun': return '☀️';
      case 'Moon': return '🌙';
      case 'Mars': return '♂️';
      case 'Mercury': return '☿️';
      case 'Jupiter': return '♃';
      case 'Venus': return '♀️';
      case 'Saturn': return '♄';
      case 'Rahu': return '☊';
      case 'Ketu': return '☋';
      case 'Ascendant': return '🌅';
      default: return '🪐';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '90px' }}>
      <BirthChartDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
      {/* 1. Header & Multi-Profile Selector Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px' }}>
        
        {/* Native Birth Profile Details */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FB923C' }}>
            ✦ Birth Chart
          </span>
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>
            Viewing Vedic horoscope for: <strong style={{ color: '#F97316' }}>{user?.name || activeProfile?.name}</strong> • Born {activeProfile.birthDate || '1996-09-12'} at {activeProfile.birthTime || '14:30'} ({activeProfile.birthPlace || 'Varanasi, India'})
          </span>
        </div>

        {/* Big Title */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#FFFFFF',
            margin: '2px 0 0',
            letterSpacing: '-0.02em',
          }}
        >
          {system === 'western' ? 'Western Natal Chart' : 'Vedic Birth Chart (D1 Kundli)'}
        </h1>

        {/* System Toggle: Vedic vs Western */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#0C0D12',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            gap: '4px',
          }}
        >
          <button
            type="button"
            onClick={() => setSystem('vedic')}
            style={{
              padding: '7px 22px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: system === 'vedic' ? '#F97316' : 'transparent',
              color: system === 'vedic' ? '#FFFFFF' : '#94A3B8',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Vedic (Sidereal)
          </button>
          <button
            type="button"
            onClick={() => setSystem('western')}
            style={{
              padding: '7px 22px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: system === 'western' ? '#F97316' : 'transparent',
              color: system === 'western' ? '#FFFFFF' : '#94A3B8',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Western (Tropical)</span>
          </button>
        </div>

        {/* Sub-Chart Selector: Lagna | Moon | Venus | Navamsa */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            backgroundColor: '#111218',
            padding: '4px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { id: 'lagna' as const, label: 'Lagna (D1)' },
            { id: 'moon' as const, label: 'Moon' },
            { id: 'venus' as const, label: 'Venus' },
            { id: 'navamsa' as const, label: 'Navamsa (D9)' },
          ].map((item) => {
            const isSelected = subChartTab === item.id;
            const isLocked = (item.id === 'navamsa' || item.id === 'venus') && !isBasicOrPremium;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (isLocked) {
                    openUpgradeModal(`${item.label} Analysis`);
                  } else {
                    setSubChartTab(item.id);
                  }
                }}
                style={{
                  padding: '7px 16px',
                  borderRadius: '10px',
                  border: isSelected ? '1px solid #F97316' : '1px solid transparent',
                  backgroundColor: isSelected ? '#F97316' : 'transparent',
                  color: isSelected ? '#FFFFFF' : '#94A3B8',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>{item.label}</span>
                {isLocked && <Lock size={11} color="#F59E0B" />}
              </button>
            );
          })}
        </div>

        {/* "Ask about this Kundli" Pill Button (matches Screenshot 1) */}
        <button
          type="button"
          onClick={() =>
            onAskAI(
              `Please analyze my ${subChartTab.toUpperCase()} Kundli chart with Ascendant in ${asc.sign}, Sun in ${sun?.sign}, and Moon in ${moon?.sign}.`
            )
          }
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            border: 'none',
            borderRadius: '24px',
            padding: '9px 22px',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(249, 115, 22, 0.45)',
            transition: 'transform 0.15s ease',
            marginTop: '4px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <Sparkles size={15} color="#FFFFFF" />
          <span>Ask about this Kundli</span>
        </button>
      </div>

      {/* 2. Dual-Column Presentation: Chart Visualizer (Left) + Planet Positions (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(300px, 1fr)',
          gap: '24px',
          alignItems: 'start',
        }}
        className="lagna-dual-grid"
      >
        {/* ================= LEFT: KUNDLI CHART CARD ================= */}
        <Card
          variant="elevated"
          style={{
            padding: '24px 20px',
            backgroundColor: '#12141A',
            border: '1.5px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65)',
          }}
        >
          {/* North / South / East Style Tabs (matches Screenshot 1) */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#0C0D12',
              padding: '3px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              gap: '4px',
              marginBottom: '20px',
            }}
          >
            {[
              { id: 'north' as const, label: 'North' },
              { id: 'south' as const, label: 'South' },
              { id: 'east' as const, label: 'East' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setChartStyle(tab.id)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '7px',
                  border: 'none',
                  backgroundColor: chartStyle === tab.id ? '#F97316' : 'transparent',
                  color: chartStyle === tab.id ? '#FFFFFF' : '#94A3B8',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Chart Canvas */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {system === 'western' ? (
              <ZodiacWheel
                chart={displayChart}
                onSelectPlacement={handleSelectPlacement}
                selectedPlacement={selectedPlacement}
                size={340}
              />
            ) : chartStyle === 'south' ? (
              <SouthIndianChart
                chart={displayChart}
                onSelectPlacement={handleSelectPlacement}
                size={340}
              />
            ) : chartStyle === 'east' ? (
              <EastIndianChart
                chart={displayChart}
                onSelectPlacement={handleSelectPlacement}
                size={340}
              />
            ) : (
              <NorthIndianChart
                chart={displayChart}
                onSelectPlacement={handleSelectPlacement}
                onSelectHouse={(h) => onAskAI(`What does house ${h} indicate in my ${subChartTab.toUpperCase()} Kundli?`)}
                size={340}
              />
            )}
          </div>

          {/* Multi-Selection Summary Pill */}
          {selectedPlanetNames.length > 0 && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '14px',
                backgroundColor: 'rgba(249, 115, 22, 0.12)',
                border: '1.5px solid rgba(249, 115, 22, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#FB923C', textTransform: 'uppercase' }}>
                  ✦ {selectedPlanetNames.length} Planet{selectedPlanetNames.length > 1 ? 's' : ''} Selected:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPlanetNames([])}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    fontSize: '11px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Clear Selection
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedPlanetNames.map((pName) => {
                  const p = displayChart.planets.find((item) => item.name === pName);
                  if (!p) return null;
                  return (
                    <span
                      key={pName}
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        backgroundColor: '#1E1B18',
                        border: '1px solid #F97316',
                        color: '#FED7AA',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {getPlanetSymbol(pName)} {pName} in {p.sign} (H{p.house})
                    </span>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() =>
                  onAskAI(
                    `Analyze the astrological conjunction and aspect relationships of ${selectedPlanetNames.join(', ')} in my ${subChartTab.toUpperCase()} chart.`
                  )
                }
                style={{
                  marginTop: '4px',
                  alignSelf: 'flex-start',
                  padding: '5px 12px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Sparkles size={12} />
                <span>Ask Astrologer About Selected Planets</span>
              </button>
            </div>
          )}
        </Card>

        {/* ================= RIGHT: PLANET POSITIONS CARD ================= */}
        <Card
          variant="elevated"
          style={{
            padding: '24px 20px',
            backgroundColor: '#12141A',
            border: '1.5px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', color: '#F97316' }}>🪐</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Planet Positions
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>
              Tap multiple to compare
            </span>
          </div>

          {/* Planet Positions List (matches Screenshot 1) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {displayChart.planets.map((planet) => {
              const isSelected = selectedPlanetNames.includes(planet.name);
              return (
                <div
                  key={planet.name}
                  onClick={() => handleSelectPlacement(planet)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? 'rgba(249, 115, 22, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? '1px solid #F97316' : '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    }
                  }}
                >
                  {/* Planet Name & Symbol */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{getPlanetSymbol(planet.name)}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                      {planet.name}
                    </span>
                    {planet.isRetrograde && (
                      <span
                        style={{
                          fontSize: '9.5px',
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: '#EF4444',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          fontWeight: 800,
                        }}
                      >
                        [R]
                      </span>
                    )}
                  </div>

                  {/* Sign & Degrees & House Number */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '13px', color: '#10B981', fontWeight: 650 }}>
                      {planet.sign} {planet.degree}°{planet.minute}&apos;
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#FED7AA',
                        background: 'rgba(249, 115, 22, 0.15)',
                        padding: '3px 9px',
                        borderRadius: '8px',
                        fontWeight: 800,
                      }}
                    >
                      H{planet.house}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Ascendant Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                borderRadius: '12px',
                backgroundColor: 'rgba(249, 115, 22, 0.08)',
                border: '1px solid rgba(249, 115, 22, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>🌅</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                  Ascendant (Lagna)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '13px', color: '#F97316', fontWeight: 700 }}>
                  {asc.sign} {asc.degree}°{asc.minute}&apos;
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#FED7AA',
                    background: 'rgba(249, 115, 22, 0.2)',
                    padding: '3px 9px',
                    borderRadius: '8px',
                    fontWeight: 800,
                  }}
                >
                  H1
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      
      {/* Free Plan Upgrade Gate Banner for Birth Chart PDF */}
      {!user.isPremium && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1.5px solid #F59E0B',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              maxWidth: '680px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Lock size={22} color="#F59E0B" />
            <div style={{ textAlign: 'left', flex: 1 }}>
              <strong style={{ color: '#FDE68A', fontSize: '14px', display: 'block' }}>
                Birth Chart PDF Download is a Premium Feature
              </strong>
              <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                Free users can view online placements. Upgrade to Premium for full multi-page PDF chart downloads.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onNavigateTab) {
                  onNavigateTab('subscription');
                } else {
                  openUpgradeModal('Your Birth Chart (Full PDF Download)');
                }
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                backgroundColor: '#F59E0B',
                color: '#000000',
                fontWeight: 800,
                fontSize: '12.5px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* 3. Direct PDF Download (Only "your birth chart" PDF) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '16px', padding: '24px 16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <button
          type="button"
          onClick={() => {
            setIsDownloadModalOpen(true);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 42px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '17px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(249, 115, 22, 0.45)',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <Download size={22} />
          <span>your birth chart</span>
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .lagna-dual-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
