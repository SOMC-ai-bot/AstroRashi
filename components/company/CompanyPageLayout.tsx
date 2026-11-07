'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowLeft,
  User,
  ShieldCheck,
  Calendar,
  Lock,
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { CompanyFooter } from '@/components/layout/CompanyFooter';
import { AuthModal } from '@/components/auth/AuthModal';
import { CookieConsentBanner } from './CookieConsentBanner';
import { useAuth } from '@/lib/state/auth-context';

interface CompanyPageLayoutProps {
  title: string;
  subtitle?: string;
  effectiveDate?: string;
  badge?: string;
  children: React.ReactNode;
}

export const CompanyPageLayout: React.FC<CompanyPageLayoutProps> = ({
  title,
  subtitle,
  effectiveDate,
  badge = 'ASTRORASHI COMPANY',
  children,
}) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#07080C',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CookieConsentBanner />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* ── Top Header Navigation Bar ── */}
      <header
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(10, 11, 16, 0.95)',
          backdropFilter: 'blur(20px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Logo & Brand */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)',
              }}
            >
              <Sparkles size={18} color="#FFFFFF" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                AstroRashi
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#F97316',
                  backgroundColor: 'rgba(249, 115, 22, 0.15)',
                  padding: '2px 5px',
                  borderRadius: '4px',
                }}
              >
                AI
              </span>
            </div>
          </Link>

          {/* Right Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#CBD5E1',
                fontSize: '12.5px',
                fontWeight: 650,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#CBD5E1';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>

            {isAuthenticated ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: '#FFFFFF',
                  fontWeight: 650,
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span>{user.name.split(' ')[0]}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '12.5px',
                  fontWeight: 750,
                  cursor: 'pointer',
                  boxShadow: '0 2px 14px rgba(249, 115, 22, 0.45)',
                }}
              >
                <User size={13} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main
        style={{
          flex: 1,
          maxWidth: '960px',
          width: '100%',
          margin: '0 auto',
          padding: '36px 20px 80px',
          boxSizing: 'border-box',
        }}
      >
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Company', href: '/about' },
            { label: title },
          ]}
        />

        {/* Page Hero Header */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F97316',
              backgroundColor: 'rgba(249, 115, 22, 0.12)',
              padding: '4px 10px',
              borderRadius: '6px',
              marginBottom: '10px',
            }}
          >
            {badge}
          </div>
          <h1
            style={{
              margin: '0 0 10px',
              fontSize: '34px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                margin: 0,
                fontSize: '16px',
                color: '#94A3B8',
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          )}

          {effectiveDate && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#64748B',
                marginTop: '12px',
                padding: '4px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Calendar size={13} color="#F97316" />
              <span>Effective Date: <strong>{effectiveDate}</strong></span>
            </div>
          )}
        </div>

        {/* Page Content Card */}
        <div
          style={{
            backgroundColor: 'rgba(16, 17, 26, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '36px 32px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          {children}
        </div>
      </main>

      {/* ── Footer ── */}
      <CompanyFooter
        onTabChange={(tab) => router.push('/')}
        onOpenPremium={() => router.push('/#pricing')}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    </div>
  );
};

