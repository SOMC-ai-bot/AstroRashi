import React from 'react';
import type { Metadata } from 'next';
import { CompanyPageLayout } from '@/components/company/CompanyPageLayout';

export const metadata: Metadata = {
  title: 'Terms of Service — AstroRashi',
  description: 'Terms of Service for AstroRashi. User agreement, astrological advisory terms, account policies and subscription rules.',
};

export default function TermsOfServicePage() {
  return (
    <CompanyPageLayout
      badge="LEGAL &amp; AGREEMENTS"
      title="Terms of Service"
      effectiveDate="15-11-2026"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#CBD5E1', fontSize: '14.5px', lineHeight: 1.75 }}>
        {/* 1. Acceptance */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ margin: 0 }}>
            By accessing or using AstroRashi, you agree to these Terms of Service. If you do not agree, please discontinue using our services.
          </p>
        </section>

        {/* 2. Our Services */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            2. Our Services
          </h2>
          <p style={{ margin: 0 }}>
            AstroRashi provides AI-powered astrology conversations, Vedic and Western astrology information, birth chart calculations, Panchang, horoscopes, calculators and related digital services.
          </p>
        </section>

        {/* 3. User Accounts */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            3. User Accounts
          </h2>
          <p style={{ margin: '0 0 10px' }}>You agree to:</p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#94A3B8' }}>
            <li>Provide accurate registration information.</li>
            <li>Keep your login credentials secure.</li>
            <li>Maintain the security of your account.</li>
            <li>Notify us of unauthorized account access.</li>
            <li>Avoid sharing accounts where prohibited by your subscription plan.</li>
          </ul>
        </section>

        {/* 4. Birth Information */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            4. Birth Information
          </h2>
          <p style={{ margin: 0 }}>
            You are responsible for providing accurate birth details. Incorrect birth dates, times or locations may affect the accuracy of calculated charts and interpretations.
          </p>
        </section>

        {/* 5. AI-Generated Content */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            5. AI-Generated Content
          </h2>
          <p style={{ margin: 0 }}>
            AstroRashi uses artificial intelligence to generate astrology-related responses and interpretations. AI responses may occasionally be inaccurate, incomplete or inconsistent. We do not guarantee that every response will be correct or suitable for your individual circumstances.
          </p>
        </section>

        {/* 6. No Professional Advice */}
        <section style={{ padding: '16px', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FCD34D', margin: '0 0 8px' }}>
            6. No Professional Advice
          </h2>
          <p style={{ margin: 0, color: '#FEF3C7', fontSize: '14px' }}>
            AstroRashi does not provide professional medical, legal, financial, investment or psychological advice. Astrological content should not be used as the sole basis for important life decisions.
          </p>
        </section>

        {/* 7. Subscriptions and Payments */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            7. Subscriptions and Payments
          </h2>
          <p style={{ margin: 0 }}>
            Paid features are available under the subscription plans displayed on our platform. Subscription pricing, billing periods, trial periods, renewal terms and applicable taxes will be disclosed before purchase. Where automatic renewal applies, the renewal terms will be presented during checkout.
          </p>
        </section>

        {/* 8. Cancellation */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            8. Cancellation
          </h2>
          <p style={{ margin: 0 }}>
            Users may cancel subscriptions through the available account or subscription management options. Cancellation generally prevents future renewals but does not automatically entitle users to a refund for an already-paid period, subject to applicable law and our Refund Policy.
          </p>
        </section>

        {/* 9. Prohibited Activities */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            9. Prohibited Activities
          </h2>
          <p style={{ margin: '0 0 10px' }}>You must not:</p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#94A3B8' }}>
            <li>Use the platform for unlawful purposes.</li>
            <li>Attempt unauthorized access to our systems.</li>
            <li>Distribute malicious software.</li>
            <li>Interfere with platform functionality.</li>
            <li>Copy, reproduce or commercially exploit protected content without permission.</li>
            <li>Abuse or manipulate platform services.</li>
          </ul>
        </section>

        {/* 10. Intellectual Property */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            10. Intellectual Property
          </h2>
          <p style={{ margin: 0 }}>
            The AstroRashi name, branding, website design, software, original content and other protected materials belong to their respective owners and may not be used without authorization.
          </p>
        </section>

        {/* 11. Service Availability */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            11. Service Availability
          </h2>
          <p style={{ margin: 0 }}>
            We aim to maintain reliable services but cannot guarantee uninterrupted availability. Maintenance, technical issues or third-party service disruptions may temporarily affect access.
          </p>
        </section>

        {/* 12. Limitation of Liability */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            12. Limitation of Liability
          </h2>
          <p style={{ margin: 0 }}>
            To the extent permitted by applicable law, AstroRashi shall not be liable for indirect or consequential losses arising from the use of AI-generated astrology content or temporary service interruptions. Nothing in these terms excludes liability that cannot legally be excluded.
          </p>
        </section>

        {/* 13. Changes to Terms */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            13. Changes to Terms
          </h2>
          <p style={{ margin: 0 }}>
            We may revise these terms periodically. Updated terms will be published on this page.
          </p>
        </section>

        {/* 14. Governing Law */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            14. Governing Law
          </h2>
          <p style={{ margin: 0 }}>
            These terms are governed by the laws of India, subject to applicable consumer protection laws.
          </p>
        </section>

        {/* 15. Contact */}
        <section style={{ padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
            15. Contact
          </h2>
          <p style={{ margin: 0 }}>
            For questions about these terms, contact{' '}
            <a href="mailto:soumick.com@gmail.com" style={{ color: '#F97316', textDecoration: 'underline', fontWeight: 650 }}>
              soumick.com@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </CompanyPageLayout>
  );
}

