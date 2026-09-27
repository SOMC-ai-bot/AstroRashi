'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

export const NewsletterRibbon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        padding: '36px 24px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(124, 58, 237, 0.28) 0%, rgba(16, 10, 32, 0.95) 70%)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
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
          marginBottom: '6px',
        }}
      >
        <Sparkles size={13} />
        <span>Cosmic Bulletin</span>
      </span>

      <h3
        style={{
          fontFamily: 'var(--font-display), serif',
          fontSize: '28px',
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: '0.03em',
          marginBottom: '8px',
        }}
      >
        Subscribe And Ask For Free
      </h3>

      <p style={{ fontSize: '13px', color: '#A79BBF', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.5 }}>
        Receive weekly planetary transit advisories, lunar eclipse muhurats, and submit one free inquiry to our expert astrologer circle.
      </p>

      {submitted ? (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '4px',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid #10B981',
            color: '#34D399',
            fontSize: '13.5px',
            fontWeight: 700,
          }}
        >
          <CheckCircle2 size={18} />
          <span>Blessings received! Check your inbox for your welcome cosmic report.</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            maxWidth: '460px',
            margin: '0 auto',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              flex: '1 1 240px',
              padding: '11px 16px',
              borderRadius: '4px',
              background: 'rgba(8, 5, 16, 0.85)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              color: '#FFFFFF',
              fontSize: '13.5px',
              outline: 'none',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
            }}
          />
          <button type="submit" className="btn-mystic-primary">
            <span>Subscribe</span>
            <Send size={14} />
          </button>
        </form>
      )}
    </div>
  );
};
