'use client';

import React from 'react';
import { Crown, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

interface MysticCirclesProps {
  onOpenMembership?: () => void;
  onOpenLearning?: () => void;
}

export const MysticCircles: React.FC<MysticCirclesProps> = ({
  onOpenMembership,
  onOpenLearning,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '24px',
        padding: '30px 10px',
      }}
    >
      {/* Background Celtic Knotwork Wireframe Pattern */}
      <svg
        width="440"
        height="260"
        viewBox="0 0 440 260"
        fill="none"
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0.18,
          zIndex: 0,
        }}
      >
        <circle cx="160" cy="130" r="100" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="280" cy="130" r="100" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="220" cy="130" r="70" stroke="#A855F7" strokeWidth="1" />
        <path d="M 120 70 Q 220 130 320 70 Q 220 190 120 70 Z" stroke="#E9D5FF" strokeWidth="1.2" />
        <path d="M 120 190 Q 220 130 320 190 Q 220 70 120 190 Z" stroke="#E9D5FF" strokeWidth="1.2" />
      </svg>

      {/* Circle 1: Become A Member */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '24px',
          background: 'radial-gradient(circle at 45% 35%, rgba(36, 20, 68, 0.95) 0%, rgba(13, 8, 25, 0.98) 75%)',
          border: '1.5px solid rgba(168, 85, 247, 0.45)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(124, 58, 237, 0.25)',
          transition: 'transform 240ms ease, box-shadow 240ms ease',
        }}
        className="card-hover"
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(168, 85, 247, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
            border: '1px solid rgba(192, 132, 252, 0.4)',
          }}
        >
          <Crown size={20} color="#FBBF24" />
        </div>

        <h4
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '18px',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '6px',
            letterSpacing: '0.02em',
          }}
        >
          Become A Member
        </h4>
        <p
          style={{
            fontSize: '11.5px',
            color: '#A79BBF',
            lineHeight: 1.4,
            marginBottom: '14px',
            maxWidth: '190px',
          }}
        >
          Unlock certified birth chart dossiers, unlimited transit forecasts, and sacred muhurat alerts.
        </p>

        <button
          onClick={onOpenMembership}
          className="btn-mystic-outline"
          style={{ padding: '6px 16px', fontSize: '11.5px' }}
        >
          Learn More
        </button>
      </div>

      {/* Circle 2: Learning Center */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '24px',
          background: 'radial-gradient(circle at 45% 35%, rgba(42, 22, 80, 0.95) 0%, rgba(15, 9, 30, 0.98) 75%)',
          border: '1.5px solid rgba(192, 132, 252, 0.55)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(168, 85, 247, 0.3)',
          transition: 'transform 240ms ease, box-shadow 240ms ease',
        }}
        className="card-hover"
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(124, 58, 237, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
            border: '1px solid rgba(216, 180, 254, 0.5)',
          }}
        >
          <BookOpen size={20} color="#C084FC" />
        </div>

        <h4
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '18px',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '6px',
            letterSpacing: '0.02em',
          }}
        >
          Learning Center
        </h4>
        <p
          style={{
            fontSize: '11.5px',
            color: '#A79BBF',
            lineHeight: 1.4,
            marginBottom: '14px',
            maxWidth: '190px',
          }}
        >
          Master the secrets of 27 Nakshatras, Mahadasha cycles, and planetary aspects with authentic lessons.
        </p>

        <button
          onClick={onOpenLearning}
          className="btn-mystic-primary"
          style={{ padding: '6px 16px', fontSize: '11.5px' }}
        >
          Check It Out
        </button>
      </div>
    </div>
  );
};
