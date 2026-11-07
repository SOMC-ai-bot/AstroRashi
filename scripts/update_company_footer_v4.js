const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'components', 'layout', 'CompanyFooter.tsx');

const content = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NavTab } from './BottomNav';
import { AstroRashiLogo } from '@/components/brand/AstroRashiLogo';
import { CookiePreferencesModal } from '@/components/company/CookiePreferencesModal';

interface CompanyFooterProps {
  onTabChange?: (tab: NavTab) => void;
  onOpenPremium?: () => void;
  onOpenAuth?: () => void;
}

export const CompanyFooter: React.FC<CompanyFooterProps> = ({
  onTabChange,
  onOpenPremium,
  onOpenAuth,
}) => {
  const [showCookieModal, setShowCookieModal] = useState(false);

  const navigateTo = (tab: NavTab) => {
    if (onTabChange) {
      onTabChange(tab);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Reusable Link Item for In-App Tabs
  const FooterLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        padding: '3px 0',
        display: 'block',
        color: '#94A3B8',
        fontSize: '13.5px',
        fontWeight: 450,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'color 0.15s ease, transform 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.transform = 'translateX(3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#94A3B8';
        e.currentTarget.style.transform = 'translateX(0px)';
      }}
    >
      {label}
    </button>
  );

  // Dedicated Route Link Item for Company section (Instant prefetch enabled)
  const FooterRouteLink: React.FC<{ label: string; href: string }> = ({ label, href }) => (
    <Link
      href={href}
      prefetch={true}
      style={{
        padding: '3px 0',
        display: 'block',
        color: '#94A3B8',
        fontSize: '13.5px',
        fontWeight: 450,
        textDecoration: 'none',
        transition: 'color 0.15s ease, transform 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.transform = 'translateX(3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#94A3B8';
        e.currentTarget.style.transform = 'translateX(0px)';
      }}
    >
      {label}
    </Link>
  );

  return (
    <>
      <CookiePreferencesModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
      />

      <footer
        style={{
          marginTop: '64px',
          paddingTop: '48px',
          paddingBottom: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#07080C',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px 32px',
          }}
        >
          {/* ═══════════════════════════════════════════════════════════════════
              COLUMN 1: BRAND LOGO (Matches Top Header) + ABOUT + SOCIALS + APP
             ═══════════════════════════════════════════════════════════════════ */}
          <div style={{ gridColumn: 'span 2', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Logo matching the top header bar */}
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              <AstroRashiLogo size="md" />
            </Link>

            {/* Paragraph 1 */}
            <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, maxWidth: '420px' }}>
              AstroRashi is an advanced AI astrologer for Vedic and Western astrology. Ask about career, marriage, health or money and get answers from your own birth chart, in 15 languages.
            </p>

            {/* Paragraph 2 */}
            <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, maxWidth: '420px' }}>
              Free Panchang, kundli matching and 33+ astrology calculators, all built on precise astronomical calculations. Your birth details are never sold.
            </p>

            {/* Social Icons matching the reference image */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '4px' }}>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#EC4899'; e.currentTarget.style.background = 'rgba(236, 72, 153, 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#1877F2'; e.currentTarget.style.background = 'rgba(24, 119, 242, 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                aria-label="X (Twitter)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

            {/* GET THE APP section */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                GET THE APP
              </div>
              <button
                type="button"
                onClick={() => {
                  alert('To install AstroRashi on your Android device:\\n\\n1. Open your browser menu (3 dots).\\n2. Select "Add to Home Screen" or "Install App".\\n3. AstroRashi will install instantly as a lightweight, fast app!');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 14px',
                  backgroundColor: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {/* Google Play store colored triangle */}
                <svg width="22" height="22" viewBox="0 0 512 512">
                  <path fill="#4caf50" d="M325.3 234.3L104.6 13l280.8 161.2z"/>
                  <path fill="#ffeb3b" d="M470 234.3l-84.8-48.8-60 48.8 60 48.8L470 234.3z"/>
                  <path fill="#f44336" d="M104.6 499l220.7-221.3 60 48.8L104.6 499z"/>
                  <path fill="#2196f3" d="M104.6 13v486L325.3 234.3z"/>
                </svg>
                <div>
                  <div style={{ fontSize: '9px', color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GET IT ON</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>Google Play</div>
                </div>
              </button>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                iPhone app coming soon
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              COLUMN 2: PRODUCT (Filtered per user request: AI Astrologers, Reports, Pricing)
             ═══════════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              PRODUCT
            </h3>
            <FooterLink label="AI Astrologers" onClick={() => navigateTo('ai')} />
            <FooterLink label="Reports" onClick={() => navigateTo('reports')} />
            <FooterLink label="Pricing" onClick={() => { if (onOpenPremium) onOpenPremium(); }} />
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              COLUMN 3: FREE TOOLS
             ═══════════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              FREE TOOLS
            </h3>
            <FooterLink label="Panchang" onClick={() => navigateTo('panchang')} />
            <FooterLink label="Calculators" onClick={() => navigateTo('tools')} />
            <FooterLink label="Love Calculator" onClick={() => navigateTo('matching')} />
            <FooterLink label="Shubh Muhurat" onClick={() => navigateTo('panchang')} />
            <FooterLink label="Horoscope" onClick={() => navigateTo('charts')} />
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              COLUMN 4: COMPANY (DEDICATED FAST ROUTES & COOKIES)
             ═══════════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              COMPANY
            </h3>
            <FooterRouteLink label="About" href="/about" />
            <FooterRouteLink label="Contact" href="/contact" />
            <FooterRouteLink label="Your Data & Privacy" href="/your-data-privacy" />
            <FooterRouteLink label="Privacy Policy" href="/privacy-policy" />
            <FooterRouteLink label="Terms of Service" href="/terms-of-service" />
            <FooterRouteLink label="Refund Policy" href="/refund-policy" />
            <FooterRouteLink label="Delivery Policy" href="/delivery-policy" />
            <FooterLink label="Manage cookies" onClick={() => setShowCookieModal(true)} />
          </div>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            maxWidth: '1240px',
            margin: '40px auto 0',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            paddingLeft: '20px',
            paddingRight: '20px',
            fontSize: '12px',
            color: '#64748B',
          }}
        >
          <div>© {new Date().getFullYear()} AstroRashi Technologies Pvt. Ltd. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>NASA JPL Ephemeris • Lahiri Sidereal &amp; Tropical</span>
            <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              Secure 256-Bit SSL
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};
`;

fs.writeFileSync(targetPath, content, 'utf8');
console.log('CompanyFooter.tsx updated successfully with all 4 requested modifications!');

