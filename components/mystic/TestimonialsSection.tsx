'use client';

import React from 'react';
import { Star, Sparkles, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export const TestimonialsSection: React.FC = () => {
  const reviews: Testimonial[] = [
    {
      name: 'Elena Rostova',
      role: 'Verified Kundli Reading',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      text: 'The Shani Sade Sati calculation and remedies provided pinpoint clarity during my career transition. Exceptional Vedic precision!',
    },
    {
      name: 'Marcus Vance',
      role: 'Natal & Dasha Analysis',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      text: 'Accurate to the exact month my relocation happened. The diamond Kundli chart visualization is breathtaking and easy to understand.',
    },
    {
      name: 'Priya Sharma',
      role: 'Relationship Kundli Milan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      text: 'The Ashtakoota 36-point matching breakdown gave us deep peace of mind. Both families were impressed by the authentic Vedic depth.',
    },
    {
      name: 'Julian Hayes',
      role: 'Muhurat Consultation',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      text: 'Scheduled my firm’s product launch in the Abhijit Muhurat window suggested here. It was our highest performing quarter to date.',
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
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
          <span>Client Reflections</span>
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '28px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '0.03em',
          }}
        >
          What My Clients Say
        </h3>
        <p style={{ fontSize: '13px', color: '#A79BBF', maxWidth: '500px', margin: '6px auto 0' }}>
          Real seekers sharing transformative breakthroughs guided by authentic planetary calculations.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '16px',
        }}
      >
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              borderRadius: '8px',
              padding: '24px 20px',
              background: 'linear-gradient(180deg, rgba(22, 14, 44, 0.8) 0%, rgba(11, 7, 22, 0.95) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.22)',
              boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 200ms ease, border-color 200ms ease',
            }}
            className="card-hover"
          >
            <img
              src={rev.avatar}
              alt={rev.name}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #A855F7',
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.4)',
                marginBottom: '12px',
              }}
            />

            <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} size={14} fill="#FBBF24" color="#FBBF24" />
              ))}
            </div>

            <p
              style={{
                fontSize: '12px',
                color: '#E4DCF9',
                lineHeight: 1.55,
                fontStyle: 'italic',
                marginBottom: '14px',
                flex: 1,
              }}
            >
              &ldquo;{rev.text}&rdquo;
            </p>

            <span
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
              }}
            >
              {rev.name}
            </span>
            <span style={{ fontSize: '10.5px', color: '#C084FC', marginTop: '2px' }}>
              {rev.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
