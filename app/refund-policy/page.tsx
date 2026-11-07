import React from 'react';
import type { Metadata } from 'next';
import { CompanyPageLayout } from '@/components/company/CompanyPageLayout';

export const metadata: Metadata = {
  title: 'Refund Policy — AstroRashi',
  description: 'Refund Policy for AstroRashi. Guidelines for digital services, subscriptions, and payment refunds.',
};

export default function RefundPolicyPage() {
  return (
    <CompanyPageLayout
      badge="BILLING &amp; REFUNDS"
      title="Refund Policy"
      effectiveDate="15-11-2026"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#CBD5E1', fontSize: '14.5px', lineHeight: 1.75 }}>
        {/* Commitment */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            Our Refund Commitment
          </h2>
          <p style={{ margin: 0 }}>
            At AstroRashi, we aim to provide a transparent subscription experience. This policy explains how refund requests for our digital services and subscriptions are handled.
          </p>
        </section>

        {/* 1. Digital Services */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            1. Digital Services
          </h2>
          <p style={{ margin: 0 }}>
            AstroRashi provides digital services, including AI astrology conversations, reports, calculations and premium features. Digital services may become available immediately after successful payment.
          </p>
        </section>

        {/* 2. Refund Eligibility */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            2. Refund Eligibility
          </h2>
          <p style={{ margin: '0 0 10px' }}>Refund requests may be considered in situations such as:</p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#94A3B8' }}>
            <li>Duplicate payments for the same subscription.</li>
            <li>Successful payment without subscription activation due to a verified technical issue.</li>
            <li>Incorrect charges or billing errors.</li>
            <li>Other circumstances where a refund is required under applicable law.</li>
          </ul>
        </section>

        {/* 3. Non-Refundable Situations */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            3. Non-Refundable Situations
          </h2>
          <p style={{ margin: '0 0 10px' }}>Subject to applicable consumer protection laws, refunds may not be available for:</p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#94A3B8' }}>
            <li>Services that have already been accessed or consumed.</li>
            <li>Completed digital reports or generated content.</li>
            <li>Change of mind after accessing a digital service.</li>
            <li>Failure to cancel before a disclosed automatic renewal date.</li>
          </ul>
        </section>

        {/* 4. Subscription Cancellation */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            4. Subscription Cancellation
          </h2>
          <p style={{ margin: 0 }}>
            You can cancel an active subscription to prevent future renewal charges. Cancellation does not necessarily result in a refund for the current billing period.
          </p>
        </section>

        {/* 5. How to Request a Refund */}
        <section style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            5. How to Request a Refund
          </h2>
          <p style={{ margin: '0 0 10px' }}>
            Send an email to <a href="mailto:soumick.com@gmail.com" style={{ color: '#F97316', fontWeight: 700, textDecoration: 'underline' }}>soumick.com@gmail.com</a> with:
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#CBD5E1' }}>
            <li>Registered email address.</li>
            <li>Transaction ID.</li>
            <li>Subscription plan.</li>
            <li>Payment date.</li>
            <li>Reason for requesting a refund.</li>
          </ul>
        </section>

        {/* 6. Refund Processing */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            6. Refund Processing
          </h2>
          <p style={{ margin: 0 }}>
            Eligible requests will be reviewed within 5–7 business days. Approved refunds will be processed through the original payment method wherever possible. The time taken for the amount to appear depends on the payment provider and banking institution.
          </p>
        </section>

        {/* 7. Contact */}
        <section style={{ padding: '16px', backgroundColor: 'rgba(249, 115, 22, 0.08)', borderRadius: '10px', border: '1px solid rgba(249, 115, 22, 0.25)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
            7. Contact
          </h2>
          <p style={{ margin: 0 }}>
            For refund-related assistance, contact{' '}
            <a href="mailto:soumick.com@gmail.com" style={{ color: '#F97316', textDecoration: 'underline', fontWeight: 700 }}>
              soumick.com@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </CompanyPageLayout>
  );
}

