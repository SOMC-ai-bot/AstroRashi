import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#07080C',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 8px 30px rgba(249, 115, 22, 0.4)',
        }}
      >
        <Compass size={32} color="#FFFFFF" />
      </div>

      <div style={{ fontSize: '13px', fontWeight: 800, color: '#F97316', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
        404 — Cosmic Coordinate Not Found
      </div>

      <h1 style={{ margin: '0 0 12px', fontSize: '32px', fontWeight: 900 }}>
        Page Does Not Exist
      </h1>

      <p style={{ margin: '0 0 28px', color: '#94A3B8', fontSize: '15px', maxWidth: '440px', lineHeight: 1.6 }}>
        The celestial route you are searching for is outside our mapped constellation. Return to the home sanctuary to explore your birth chart and horoscopes.
      </p>

      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
          borderRadius: '10px',
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: 750,
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(249, 115, 22, 0.4)',
        }}
      >
        <ArrowLeft size={16} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}

