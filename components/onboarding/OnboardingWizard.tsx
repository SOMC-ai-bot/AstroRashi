'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Orbit, Bot, Users } from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: () => void;
}

const ONBOARDING_SLIDES = [
  {
    icon: <Orbit size={38} color="#D8C58A" />,
    badge: 'Precision Natal Astronomy',
    title: 'Discover Your Authentic Cosmic Blueprint',
    description:
      'Explore planetary placements, houses, and aspects calculated from real astronomical ephemeris algorithms. Switch effortlessly between Western Tropical and Vedic Sidereal systems.',
  },
  {
    icon: <Bot size={38} color="#C24E78" />,
    badge: 'Dual-Mode Intelligence',
    title: 'Expert Astrological Guidance with Cosmic Context',
    description:
      'Ask deep questions about your birth chart and transits—or ask completely normal questions about programming, career, philosophy, and everyday problem solving.',
  },
  {
    icon: <Users size={38} color="#D96A8D" />,
    badge: 'Verified Marketplace & Community',
    title: 'Connect with Master Astrologers',
    description:
      'Book private chat or video consultations with verified traditional practitioners, share insights in community feeds, and track real-time planetary transits.',
  },
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const slide = ONBOARDING_SLIDES[currentSlide];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        backgroundColor: '#171719',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 24px 40px',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      <div className="stars-overlay" />

      {/* Top Bar with Skip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--accent-rose)" />
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em' }}>
            ASTRONEX
          </span>
        </div>
        <button
          onClick={onComplete}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>

      {/* Slide Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 2,
          padding: '0 8px',
        }}
      >
        {/* Visual Icon Halo */}
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(194, 78, 120, 0.25) 0%, rgba(27, 27, 30, 0.8) 70%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 0 35px rgba(194, 78, 120, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
            animation: 'orbBreathe 4s infinite ease-in-out',
          }}
        >
          {slide.icon}
        </div>

        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--gold-primary)',
            background: 'rgba(216, 197, 138, 0.12)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(216, 197, 138, 0.25)',
            marginBottom: '16px',
          }}
        >
          {slide.badge}
        </span>

        <h2
          style={{
            fontSize: '26px',
            fontWeight: 700,
            lineHeight: 1.25,
            color: 'var(--text-primary)',
            marginBottom: '14px',
          }}
        >
          {slide.title}
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '380px',
          }}
        >
          {slide.description}
        </p>
      </div>

      {/* Footer Navigation */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          zIndex: 2,
        }}
      >
        {/* Progress Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {ONBOARDING_SLIDES.map((_, index) => (
            <div
              key={index}
              style={{
                width: index === currentSlide ? '28px' : '8px',
                height: '8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor:
                  index === currentSlide ? 'var(--accent-rose)' : 'rgba(255, 255, 255, 0.18)',
                transition: 'all 250ms ease',
              }}
            />
          ))}
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          style={{ width: '100%' }}
        >
          <span>{currentSlide === ONBOARDING_SLIDES.length - 1 ? 'Get Started' : 'Continue'}</span>
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};
