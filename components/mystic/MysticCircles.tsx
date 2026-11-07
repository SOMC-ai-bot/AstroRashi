'use client';

import React from 'react';
import { Crown, BookOpen, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/state/auth-context';

interface MysticCirclesProps {
  onOpenMembership?: () => void;
  onOpenLearning?: () => void;
}

export const MysticCircles: React.FC<MysticCirclesProps> = ({
  onOpenMembership,
  onOpenLearning,
}) => {
  const { user } = useAuth();
  const isPaidMember = user.isPremium || user.planTier === 'basic' || user.planTier === 'premium';

  const handleMemberClick = () => {
    if (isPaidMember) {
      // For basic or premium users, do not prompt upgrade; navigate to subscription/store to view active benefits
      onOpenMembership && onOpenMembership();
    } else {
      // For free users, open the store subscription page
      onOpenMembership && onOpenMembership();
    }
  };

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
          {isPaidMember ? (
            <CheckCircle2 size={20} color="#10B981" />
          ) : (
            <Crown size={20} color="#FBBF24" />
          )}
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
          {isPaidMember ? `${user.planTier.toUpperCase()} VIP Active` : 'Become A Member'}
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
          {isPaidMember
            ? 'All 33+ Vedic calculation tools, certified PDF dossiers and unlimited consults are active on your account.'
            : 'Unlock certified birth chart dossiers, unlimited transit forecasts, and sacred muhurat alerts.'}
        </p>

        <button
          onClick={handleMemberClick}
          className="btn-mystic-outline"
          style={{ padding: '6px 16px', fontSize: '11.5px' }}
        >
          {isPaidMember ? 'View Benefits' : 'Join Membership'}
        </button>
      </div>

      {/* Circle 2: Kundli Matching */}
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
          background: 'radial-gradient(circle at 45% 35%, rgba(60, 20, 20, 0.95) 0%, rgba(20, 10, 15, 0.98) 75%)',
          border: '1.5px solid rgba(249, 115, 22, 0.55)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(249, 115, 22, 0.3)',
          transition: 'transform 240ms ease, box-shadow 240ms ease',
        }}
        className="card-hover"
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(249, 115, 22, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
            border: '1px solid rgba(251, 146, 60, 0.5)',
          }}
        >
          <Sparkles size={20} color="#F97316" />
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
          Kundli Matching
        </h4>
        <p
          style={{
            fontSize: '11.5px',
            color: '#FED7AA',
            lineHeight: 1.4,
            marginBottom: '14px',
            maxWidth: '190px',
          }}
        >
          Calculate authentic 36 Ashtakoot Guna Milan compatibility, Nadi Dosha, and Manglik balance.
        </p>

        <button
          onClick={onOpenLearning}
          className="btn-mystic-primary"
          style={{ padding: '6px 16px', fontSize: '11.5px' }}
        >
          Match Charts
        </button>
      </div>
    </div>
  );
};
