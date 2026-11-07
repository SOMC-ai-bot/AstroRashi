import React from 'react';
import type { Metadata } from 'next';
import { CompanyPageLayout } from '@/components/company/CompanyPageLayout';

export const metadata: Metadata = {
  title: 'Delivery Policy — AstroRashi',
  description: 'Delivery Policy for AstroRashi. Electronic delivery of digital services, reports, AI consultations and subscription activations.',
};

export default function DeliveryPolicyPage() {
  return (
    <CompanyPageLayout
      badge="FULFILLMENT &amp; DELIVERY"
      title="Delivery Policy"
      effectiveDate="15-11-2026"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#CBD5E1', fontSize: '14.5px', lineHeight: 1.75 }}>
        {/* Intro */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            Digital Service Delivery
          </h2>
          <p style={{ margin: 0 }}>
            AstroRashi is a digital platform. We do not currently offer physical product delivery through our astrology services. All eligible services are delivered electronically through our website or supported application.
          </p>
        </section>

        {/* 1. Subscription Activation */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            1. Subscription Activation
          </h2>
          <p style={{ margin: 0 }}>
            After successful payment, your purchased subscription or premium access will generally be activated automatically and instantly in your user session.
          </p>
        </section>

        {/* 2. Digital Reports */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            2. Digital Reports
          </h2>
          <p style={{ margin: 0 }}>
            Eligible reports, birth charts and astrology-related digital content are made available through the platform once successfully generated, viewable in-browser and downloadable as PDF dossiers.
          </p>
        </section>

        {/* 3. AI Astrology Services */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            3. AI Astrology Services
          </h2>
          <p style={{ margin: 0 }}>
            AI astrologer conversations and supported calculations are delivered digitally in real time when requested by users.
          </p>
        </section>

        {/* 4. Delivery Time */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            4. Delivery Time
          </h2>
          <p style={{ margin: 0 }}>
            Most digital services are designed to be available immediately or within a short processing period. Actual availability may depend on system processing, payment confirmation and third-party service availability.
          </p>
        </section>

        {/* 5. Payment Successful but Service Not Activated */}
        <section style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            5. Payment Successful but Service Not Activated
          </h2>
          <p style={{ margin: 0 }}>
            If your payment is successful but your premium subscription or purchased feature is not available, please contact our support team. Include your registered email address and transaction reference.
          </p>
        </section>

        {/* 6. Technical Delays */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            6. Technical Delays
          </h2>
          <p style={{ margin: 0 }}>
            Temporary delays may occur due to maintenance, connectivity problems or technical disruptions. We will make reasonable efforts to restore affected services.
          </p>
        </section>

        {/* 7. Contact */}
        <section style={{ padding: '16px', backgroundColor: 'rgba(56, 189, 248, 0.08)', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
            7. Contact
          </h2>
          <p style={{ margin: 0 }}>
            For delivery or activation-related issues:
          </p>
          <div style={{ marginTop: '6px' }}>
            Email:{' '}
            <a href="mailto:soumick.com@gmail.com" style={{ color: '#38BDF8', fontWeight: 700, textDecoration: 'underline' }}>
              soumick.com@gmail.com
            </a>
          </div>
        </section>
      </div>
    </CompanyPageLayout>
  );
}

