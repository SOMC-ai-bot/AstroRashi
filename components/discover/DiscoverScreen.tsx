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
import { CompanyFooter } from '@/components/layout/CompanyFooter';
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
  onOpenAuth?: () => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  onTabChange,
  onAskAI,
  onOpenPremium,
  onOpenAuth,
}) => {
  const { user, isAuthenticated } = useAuth();
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
            {mounted ? timeInfo.greeting : 'Good afternoon'}, {(activeProfile.name || 'Cosmic Soul').trim().split(/\s+/)[0]} • {mounted ? timeInfo.timeString : '1:15 PM'} ({mounted ? timeInfo.periodLabel : 'Afternoon'})
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
          {onOpenAuth && !isAuthenticated && (
            <button
              onClick={onOpenAuth}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 750,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(249, 115, 22, 0.45)',
              }}
            >
              <Sparkles size={16} />
              <span>Sign In / Register</span>
            </button>
          )}

          <button
            onClick={() => onTabChange('ai')}
            className="btn-mystic-outline"
          >
            Consult Astrologers
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

          {/* Portal 2: Reports - only visible to signed in users */}
          {isAuthenticated && (
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
                Life Reports
              </h4>
              <p style={{ fontSize: '12px', color: '#A79BBF', lineHeight: 1.4 }}>
                Life Blueprint, Career, Marriage & Vimshottari Timeline
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#C084FC', fontSize: '12px', fontWeight: 700, marginTop: '12px' }}>
              <span>Access Life Reports</span>
              <ArrowUpRight size={14} />
            </div>
          </Card>
          )}


          {/* Portal 4: Vedic Panchang */}
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
            onClick={() => onTabChange('panchang')}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(249, 115, 22, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(249, 115, 22, 0.45)',
                  }}
                >
                  <Calendar size={20} color="#F97316" />
                </div>
                <Badge size="sm" variant="orange">
                  Panchang
                </Badge>
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                Vedic Panchang
              </h4>
              <p style={{ fontSize: '12px', color: '#A79BBF', lineHeight: 1.4 }}>
                Daily Tithi, Nakshatra, Rahu Kaal, Abhijit & Festival calendar
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F97316', fontSize: '12px', fontWeight: 700, marginTop: '12px' }}>
              <span>Open Panchang</span>
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

      {/* 7. EXACT TEMPLATE: Overlapping Mystic Circles (Become A Member & Kundli Matrix) */}
      <section>
        <MysticCircles
          onOpenMembership={() => onTabChange('subscription')}
          onOpenLearning={() => onTabChange('matching')}
        />
      </section>

      {/* Testimonials ("What My Clients Say") */}
      <section>
        <TestimonialsSection />
      </section>

      {/* Website Footer — always visible on Home page */}
      <CompanyFooter
        onTabChange={onTabChange}
        onOpenPremium={onOpenPremium}
        onOpenAuth={onOpenAuth}
      />
    </div>
  );
};
