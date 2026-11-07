import React from 'react';
import type { Metadata } from 'next';
import { CompanyPageLayout } from '@/components/company/CompanyPageLayout';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — AstroRashi',
  description: 'Privacy Policy for AstroRashi. Explains how AstroNex collects, uses, stores, processes and protects personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <CompanyPageLayout
      badge="LEGAL &amp; PRIVACY"
      title="Privacy Policy"
      effectiveDate="15-11-2026"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#CBD5E1', fontSize: '14.5px', lineHeight: 1.75 }}>
        {/* 1. Introduction */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            1. Introduction
          </h2>
          <p style={{ margin: 0 }}>
            Welcome to AstroRashi. This Privacy Policy explains how <strong>AstroNex</strong> (&quot;AstroRashi&quot;, &quot;we&quot;, &quot;our&quot; or &quot;us&quot;) collects, uses, stores, processes and protects personal information when you access our website, applications and services.
          </p>
          <p style={{ margin: '10px 0 0' }}>
            By using our services, you acknowledge that you have read this policy.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            2. Information We Collect
          </h2>
          <p style={{ margin: '0 0 10px' }}>We may collect the following categories of information:</p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#94A3B8' }}>
            <li>Personal information such as name and email address.</li>
            <li>Birth information such as date, time and place of birth.</li>
            <li>Account credentials and authentication information.</li>
            <li>AI chatbot messages and submitted content.</li>
            <li>Language and platform preferences.</li>
            <li>Payment transaction and subscription information.</li>
            <li>Device, browser, IP address and usage information.</li>
            <li>Cookie and analytics information, subject to your preferences and applicable requirements.</li>
          </ul>
        </section>

        {/* 3. How We Use Your Information */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            3. How We Use Your Information
          </h2>
          <p style={{ margin: '0 0 10px' }}>We may use collected information to:</p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#94A3B8' }}>
            <li>Create and manage user accounts.</li>
            <li>Generate personalized astrology charts and reports.</li>
            <li>Provide AI astrologer conversations and responses.</li>
            <li>Calculate planetary positions and astrological information.</li>
            <li>Process subscriptions and payments.</li>
            <li>Improve platform performance and user experience.</li>
            <li>Provide customer support.</li>
            <li>Maintain platform security and prevent misuse.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        {/* 4. AI Processing */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            4. AI Processing
          </h2>
          <p style={{ margin: 0 }}>
            When you interact with our AI astrologer, information submitted by you may be processed by our AI service providers to generate responses.
          </p>
          <p style={{ margin: '10px 0 0' }}>
            We use appropriate safeguards and select service providers based on their security and privacy practices. AI processing is performed over secured, encrypted channels without using personal birth information for public training models.
          </p>
        </section>

        {/* 5. Payments and Billing */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            5. Payments and Billing
          </h2>
          <p style={{ margin: 0 }}>
            Payments may be processed through third-party payment gateways. We generally do not store complete payment card details on our servers. Payment providers handle payment information under their respective privacy policies.
          </p>
        </section>

        {/* 6. Data Sharing */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            6. Data Sharing
          </h2>
          <p style={{ margin: '0 0 10px' }}>We may share relevant information with:</p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#94A3B8' }}>
            <li>Hosting and cloud infrastructure providers.</li>
            <li>AI processing providers.</li>
            <li>Payment and subscription service providers.</li>
            <li>Analytics and security providers.</li>
            <li>Authorities when legally required.</li>
          </ul>
          <div style={{ marginTop: '12px', padding: '12px 14px', backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '8px', color: '#FDBA74', fontWeight: 700 }}>
            We do not sell users&apos; personal birth details.
          </div>
        </section>

        {/* 7. Data Security */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            7. Data Security
          </h2>
          <p style={{ margin: 0 }}>
            We implement reasonable technical and organizational safeguards to protect information against unauthorized access, misuse, alteration or disclosure. However, no internet-based system can guarantee absolute security.
          </p>
        </section>

        {/* 8. Data Retention */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            8. Data Retention
          </h2>
          <p style={{ margin: 0 }}>
            We retain information only for as long as reasonably necessary for service delivery, account management, legal compliance, security and legitimate business purposes.
          </p>
        </section>

        {/* 9. Your Privacy Rights */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            9. Your Privacy Rights
          </h2>
          <p style={{ margin: 0 }}>
            Subject to applicable law, you may request access, correction, deletion, restriction or a copy of your personal information. You may also withdraw consent where processing relies on consent. You can submit requests directly through our{' '}
            <Link href="/your-data-privacy" style={{ color: '#F97316', textDecoration: 'underline' }}>
              Your Data &amp; Privacy
            </Link>{' '}
            page.
          </p>
        </section>

        {/* 10. Children's Privacy */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            10. Children&apos;s Privacy
          </h2>
          <p style={{ margin: 0 }}>
            Our services are not intentionally directed at children below the minimum age permitted under applicable law. We do not knowingly collect personal information from children without legally required authorization.
          </p>
        </section>

        {/* 11. International Data Transfers */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            11. International Data Transfers
          </h2>
          <p style={{ margin: 0 }}>
            Some service providers may process information in locations outside your country. Where applicable, appropriate safeguards will be implemented.
          </p>
        </section>

        {/* 12. Policy Updates */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            12. Policy Updates
          </h2>
          <p style={{ margin: 0 }}>
            We may update this Privacy Policy periodically. Changes will be published on this page with an updated effective date.
          </p>
        </section>

        {/* 13. Contact */}
        <section style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            13. Contact
          </h2>
          <p style={{ margin: '0 0 8px' }}>For privacy questions or requests:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13.5px' }}>
            <div>Email: <a href="mailto:soumick.com@gmail.com" style={{ color: '#F97316', textDecoration: 'underline' }}>soumick.com@gmail.com</a></div>
            <div>Business: <strong style={{ color: '#FFFFFF' }}>AstroNex</strong></div>
            <div>Address: <strong style={{ color: '#FFFFFF' }}>astronex</strong></div>
          </div>
        </section>
      </div>
    </CompanyPageLayout>
  );
}

