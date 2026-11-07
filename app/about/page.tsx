import React from 'react';
import type { Metadata } from 'next';
import { CompanyPageLayout } from '@/components/company/CompanyPageLayout';
import {
  Sparkles,
  Compass,
  Layers,
  Heart,
  Globe,
  Award,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About AstroRashi — Your Personal AI-Powered Astrology Companion',
  description:
    'AstroRashi is an advanced AI-powered astrology platform designed to make Vedic and Western astrology accessible, understandable and convenient for everyone.',
};

export default function AboutPage() {
  return (
    <CompanyPageLayout
      badge="ABOUT ASTRO RASHI"
      title="Welcome to AstroRashi"
      subtitle="Your Personal AI-Powered Astrology Companion"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#CBD5E1', fontSize: '15px', lineHeight: 1.75 }}>
        {/* Intro */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0 }}>
            AstroRashi is an advanced AI-powered astrology platform designed to make Vedic and Western astrology accessible, understandable and convenient for everyone.
          </p>
          <p style={{ margin: 0 }}>
            Our platform combines traditional astrological knowledge with modern artificial intelligence and precise astronomical calculations to help users explore their birth charts, understand planetary positions, discover astrological insights and receive personalized guidance.
          </p>
          <p style={{ margin: 0 }}>
            Whether you want to explore your career, relationships, marriage, finances, personal growth or horoscope, AstroRashi provides an accessible platform to explore astrology in your preferred language.
          </p>
        </div>

        {/* What We Offer */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} color="#F97316" />
            <span>What We Offer</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontWeight: 800, color: '#F97316', fontSize: '16px', marginBottom: '6px' }}>
                AI Astrologer
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#94A3B8' }}>
                Get personalized astrology conversations powered by AI.
              </p>
            </div>

            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '16px', marginBottom: '6px' }}>
                Vedic &amp; Western Astrology
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#94A3B8' }}>
                Explore two major astrological traditions with dual-system calculations.
              </p>
            </div>

            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontWeight: 800, color: '#A855F7', fontSize: '16px', marginBottom: '6px' }}>
                Kundli &amp; Birth Charts
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#94A3B8' }}>
                Generate personalized birth charts using your birth details and NASA-grade ephemeris precision.
              </p>
            </div>

            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontWeight: 800, color: '#10B981', fontSize: '16px', marginBottom: '6px' }}>
                Free Astrology Tools
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#94A3B8' }}>
                Access Panchang, horoscope, love calculator, compatibility and other astrology calculators.
              </p>
            </div>

            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontWeight: 800, color: '#EC4899', fontSize: '16px', marginBottom: '6px' }}>
                Personalized Reports
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#94A3B8' }}>
                Explore detailed astrological interpretations, Vimshottari dasha timelines, and certified dossiers.
              </p>
            </div>

            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontWeight: 800, color: '#F59E0B', fontSize: '16px', marginBottom: '6px' }}>
                Multilingual Experience
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#94A3B8' }}>
                Access astrology information in multiple supported Indian and international languages.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission & Vision */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '22px', backgroundColor: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: '14px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#F97316', margin: '0 0 10px' }}>
              Our Mission
            </h3>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.65 }}>
              Our mission is to make astrology more accessible through technology while preserving the traditional knowledge and principles behind astrological practices.
            </p>
          </div>

          <div style={{ padding: '22px', backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '14px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#38BDF8', margin: '0 0 10px' }}>
              Our Vision
            </h3>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.65 }}>
              We envision a world where anyone can explore astrology, understand their birth chart and access personalized astrological insights through a simple, intelligent and multilingual platform.
            </p>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div
          style={{
            padding: '20px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1.5px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FCD34D', fontWeight: 800, fontSize: '15px' }}>
            <AlertTriangle size={18} />
            <span>Important Disclaimer</span>
          </div>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#FEF3C7', lineHeight: 1.65 }}>
            Astrological interpretations and AI-generated predictions are provided for informational and personal exploration purposes only. They are not scientifically established predictions or guarantees of future events and should not replace professional medical, legal, financial or psychological advice.
          </p>
        </div>
      </div>
    </CompanyPageLayout>
  );
}

