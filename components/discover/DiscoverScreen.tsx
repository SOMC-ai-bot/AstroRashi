'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/state/auth-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { useConsultant } from '@/lib/state/consultant-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { getRealTimeGreeting } from '@/lib/utils/time-greeting';
import { PremiumBanner } from './PremiumBanner';
import { AnimatedKundliChart } from '@/components/charts/AnimatedKundliChart';
import { SacredMandala } from '@/components/mystic/SacredMandala';
import { MoonPhasesRibbon } from '@/components/mystic/MoonPhasesRibbon';
import { ZodiacWheelCards } from '@/components/mystic/ZodiacWheelCards';
import { MysticCircles } from '@/components/mystic/MysticCircles';
import { TestimonialsSection } from '@/components/mystic/TestimonialsSection';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Heart,
  Briefcase,
  Clock,
  Calculator,
  Calendar,
  FileText,
  BookOpen,
  ChevronRight,
  ArrowUpRight,
  Sun,
  Moon,
  Compass,
  Lock,
} from 'lucide-react';
import { NavTab } from '../layout/BottomNav';

interface DiscoverScreenProps {
  onTabChange: (tab: NavTab) => void;
  onAskAI: (query: string) => void;
  onOpenPremium: () => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  onTabChange,
  onAskAI,
  onOpenPremium,
}) => {
  const { user } = useAuth();
  const { natalChart, activeProfile } = useAstrology();
  const { specialists, startSpecialistSession } = useConsultant();
  const { t } = useI18n();

  // Accurate Real-time Local Greeting & Day Calculation
  const [mounted, setMounted] = useState(false);
  const [timeInfo, setTimeInfo] = useState(() => getRealTimeGreeting(activeProfile.name));

  useEffect(() => {
    setMounted(true);
    setTimeInfo(getRealTimeGreeting(activeProfile.name));
    const timer = setInterval(() => {
      setTimeInfo(getRealTimeGreeting(activeProfile.name));
    }, 30000);
    return () => clearInterval(timer);
  }, [activeProfile.name]);

  const sun = natalChart.planets.find((p) => p.name === 'Sun');
  const moon = natalChart.planets.find((p) => p.name === 'Moon');
  const asc = natalChart.ascendant;

  const getSpecialistIcon = (id: string) => {
    switch (id) {
      case 'love_relationships':
        return <Heart size={20} color="#C084FC" />;
      case 'career_wealth':
        return <Briefcase size={20} color="#FBBF24" />;
      case 'daily_guidance':
        return <Clock size={20} color="#38BDF8" />;
      case 'classic':
      default:
        return <Sparkles size={20} color="#A855F7" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', paddingBottom: '90px' }}>
      {/* 1. EXACT TEMPLATE HERO 1: Centered Classical Heading */}
      <div
        style={{
          textAlign: 'center',
          padding: '40px 16px 20px',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#C084FC',
            fontWeight: 700,
            display: 'block',
            marginBottom: '8px',
          }}
        >
          Welcome To
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '44px',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '14px',
            textShadow: '0 0 40px rgba(168, 85, 247, 0.45)',
          }}
        >
          Vedic Wisdom & Astrological Readings
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          <Badge variant="orange" size="sm" dot>
            {mounted ? timeInfo.formattedDate : 'Sunday, Sep 27'}
          </Badge>
          <span style={{ fontSize: '12.5px', color: '#E4DCF9', fontWeight: 600 }}>
            {mounted ? timeInfo.greeting : 'Good afternoon'}, {activeProfile.name} • {mounted ? timeInfo.timeString : '1:15 PM'} ({mounted ? timeInfo.periodLabel : 'Afternoon'})
          </span>
        </div>

        <p
          style={{
            fontSize: '14px',
            color: '#A79BBF',
            maxWidth: '620px',
            margin: '0 auto 24px',
            lineHeight: 1.6,
          }}
        >
          Unveil your sacred destiny through authentic Vedic ephemeris calculations, 27 Nakshatras, Lahiri Ayanamsa, and timeless planetary alignments.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onTabChange('consultants')}
            className="btn-mystic-outline"
          >
            Schedule a Reading
          </button>
          <button
            onClick={() => onTabChange('charts')}
            className="btn-mystic-primary"
          >
            <span>Explore Natal Chart</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 2. EXACT TEMPLATE HERO 2: Left Glowing Sacred Astrolabe Mandala + Right Feature */}
      <div
        style={{
          position: 'relative',
          borderRadius: '12px',
          padding: '32px 28px',
          background: 'radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.22) 0%, rgba(14, 9, 28, 0.95) 75%)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.9)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        {/* Left: Glowing Sacred Geometry Mandala */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SacredMandala size={320} />
        </div>

        {/* Right: Pitch & CTA */}
        <div>
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
              marginBottom: '8px',
            }}
          >
            <Sparkles size={13} />
            <span>Divine Timing & Karmic Roadmaps</span>
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: '32px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.03em',
              lineHeight: 1.2,
              marginBottom: '14px',
            }}
          >
            We Can Help Find Your Future With Authentic Vedic Astrology
          </h2>

          <p
            style={{
              fontSize: '13.5px',
              color: '#A79BBF',
              lineHeight: 1.6,
              marginBottom: '22px',
            }}
          >
            Our calculation engine cross-references real-time sidereal planetary degrees with classical Vedic Jyotish principles. Receive pinpoint timelines for career ascendance, marriage muhurats, and Shani Sade Sati remedies.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onTabChange('tools')}
              className="btn-mystic-primary"
            >
              <span>Learn More</span>
              <ArrowUpRight size={15} />
            </button>

            {/* Triad Badges Capsule */}
            <div
              onClick={() => onTabChange('charts')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                borderRadius: '4px',
                background: 'rgba(8, 5, 18, 0.8)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Sun size={13} color="#FBBF24" />
                <span style={{ fontSize: '12px', color: '#FBBF24', fontWeight: 700 }}>
                  {sun?.sign}
                </span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Moon size={13} color="#38BDF8" />
                <span style={{ fontSize: '12px', color: '#38BDF8', fontWeight: 700 }}>
                  {moon?.sign}
                </span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Compass size={13} color="#10B981" />
                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 700 }}>
                  AC {asc.sign}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EXACT TEMPLATE: 9 Moon Phases Ribbon */}
      <section>
        <MoonPhasesRibbon />
      </section>

      {/* 4. ANIMATED DIAMOND KUNDLI CHART DRAWING */}
      <section>
        <AnimatedKundliChart onAskAI={onAskAI} />
      </section>

      {/* 5. Core Feature Portals (4 Redesigned Dark Obsidian Glass Boxes) */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Portal 1: Tools */}
          <Card
            variant="glass"
            interactive
            style={{
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '170px',
              borderRadius: '8px',
            }}
            onClick={() => onTabChange('tools')}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(124, 58, 237, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(168, 85, 247, 0.45)',
                  }}
                >
                  <Calculator size={20} color="#C084FC" />
                </div>
                <Badge size="sm" variant="orange">
                  33+ Tools
                </Badge>
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                Astrology Tools
              </h4>
              <p style={{ fontSize: '12px', color: '#A79BBF', lineHeight: 1.4 }}>
                Kundli Match, Sade Sati, Yogas, KP, Numerology & Lo Shu
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#C084FC', fontSize: '12px', fontWeight: 700, marginTop: '12px' }}>
              <span>Launch Calculator</span>
              <ArrowUpRight size={14} />
            </div>
          </Card>

          {/* Portal 2: Reports */}
          <Card
            variant="glass"
            interactive
            style={{
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '170px',
              borderRadius: '8px',
            }}
            onClick={() => onTabChange('reports')}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(124, 58, 237, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(168, 85, 247, 0.45)',
                  }}
                >
                  <FileText size={20} color="#C084FC" />
                </div>
                <Badge size="sm" variant="orange">
                  10 Dossiers
                </Badge>
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                Deep Reports
              </h4>
              <p style={{ fontSize: '12px', color: '#A79BBF', lineHeight: 1.4 }}>
                Life Blueprint, Career, Marriage & Vimshottari Timeline
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#C084FC', fontSize: '12px', fontWeight: 700, marginTop: '12px' }}>
              <span>Access Dossiers</span>
              <ArrowUpRight size={14} />
            </div>
          </Card>

          {/* Portal 4: Academy */}
          <Card
            variant="glass"
            interactive
            style={{
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '170px',
              borderRadius: '8px',
            }}
            onClick={() => onTabChange('learn')}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(124, 58, 237, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(168, 85, 247, 0.45)',
                  }}
                >
                  <BookOpen size={20} color="#C084FC" />
                </div>
                <Badge size="sm" variant="orange">
                  Academy
                </Badge>
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                Learn Astrology
              </h4>
              <p style={{ fontSize: '12px', color: '#A79BBF', lineHeight: 1.4 }}>
                Vedic, Western & KP guides with 50+ term glossary
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#C084FC', fontSize: '12px', fontWeight: 700, marginTop: '12px' }}>
              <span>Enter Academy</span>
              <ArrowUpRight size={14} />
            </div>
          </Card>
        </div>
      </section>

      {/* 6. EXACT TEMPLATE: "Know Yourself Through Your Sign" Arched Fan Cards */}
        <ZodiacWheelCards
          onOpenChart={() => onTabChange('charts')}
          onAskAI={onAskAI}
        />

      {/* 7. EXACT TEMPLATE: Overlapping Mystic Circles (Become A Member & Learning Center) */}
      <section>
        <MysticCircles
          onOpenMembership={onOpenPremium}
          onOpenLearning={() => onTabChange('learn')}
        />
      </section>

      {/* Expert Astrologers & Specialists */}
      <section>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
                ✦ Expert Astrologers
              </h3>
              <Badge variant="orange" size="sm">
                Certified Faculty
              </Badge>
            </div>
          </div>

          <button
            onClick={() => onTabChange('consultants')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              color: '#C084FC',
              fontSize: '13.5px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            <span>View All</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Specialist Cards - Only 1 unlocked for free users, others locked with Pro */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '16px',
          }}
        >
          {specialists.map((spec) => {
            const isAccessible = spec.isFreeTier || user.isPremium;

            return (
              <Card
                key={spec.id}
                variant="glass"
                interactive
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  minHeight: '170px',
                  border: isAccessible
                    ? '1px solid rgba(168, 85, 247, 0.25)'
                    : '1px dashed rgba(250, 204, 21, 0.35)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '4px',
                        background: 'rgba(124, 58, 237, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 16px rgba(124, 58, 237, 0.4)',
                        border: '1px solid rgba(168, 85, 247, 0.45)',
                      }}
                    >
                      {getSpecialistIcon(spec.id)}
                    </div>

                    <Badge variant={spec.isFreeTier ? 'yellow' : isAccessible ? 'orange' : 'outline'} size="sm" dot={spec.isFreeTier}>
                      {spec.isFreeTier ? 'Standard Access' : isAccessible ? 'Pro Unlocked' : 'Pro Only'}
                    </Badge>
                  </div>

                  <h4
                    style={{
                      fontSize: '17px',
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
                  <button
                    onClick={() => {
                      if (isAccessible) {
                        startSpecialistSession(spec.id);
                      } else {
                        onOpenPremium();
                      }
                    }}
                    className={isAccessible ? 'btn-mystic-primary' : 'btn-mystic-outline'}
                    style={{ width: '100%', fontSize: '12px', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    {isAccessible ? (
                      <>
                        <span>Consult Specialist</span>
                        <ChevronRight size={14} />
                      </>
                    ) : (
                      <>
                        <Lock size={12} color="#FACC15" />
                        <span>Unlock with Pro</span>
                      </>
                    )}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials ("What My Clients Say") */}
      <section>
        <TestimonialsSection />
      </section>
    </div>
  );
};
