'use client';

import React, { useState } from 'react';
import { CompanyPageLayout } from '@/components/company/CompanyPageLayout';
import Link from 'next/link';
import {
  Lock,
  Eye,
  Edit,
  Trash2,
  Sliders,
  HelpCircle,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function YourDataPrivacyPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState('Access Your Data');
  const [details, setDetails] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/privacy-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          requestType,
          message: details,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setReferenceId(data.referenceId || `DPR-${Date.now().toString().slice(-6)}`);
      } else {
        setErrorMsg(data.error || 'Failed to submit privacy request.');
      }
    } catch (err: any) {
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CompanyPageLayout
      badge="YOUR DATA & PRIVACY"
      title="Your Data Belongs to You"
      subtitle="At AstroRashi, we believe users should have transparency and control over their personal information. We aim to provide clear information about the data associated with your account and the ways you can manage it."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', color: '#CBD5E1', fontSize: '15px', lineHeight: 1.75 }}>
        {/* What Information May We Collect? */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 14px' }}>
            What Information May We Collect?
          </h2>
          <ul style={{ paddingLeft: '22px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', color: '#94A3B8' }}>
            <li><strong style={{ color: '#E2E8F0' }}>Account information:</strong> such as your name and email address.</li>
            <li><strong style={{ color: '#E2E8F0' }}>Birth details:</strong> including date, time and place of birth, when provided for astrology services.</li>
            <li><strong style={{ color: '#E2E8F0' }}>User preferences:</strong> including selected languages and astrological calculation traditions.</li>
            <li><strong style={{ color: '#E2E8F0' }}>Conversations and information:</strong> submitted to the AI astrologer.</li>
            <li><strong style={{ color: '#E2E8F0' }}>Subscription and transaction information:</strong> plan tiers and billing records.</li>
            <li><strong style={{ color: '#E2E8F0' }}>Technical information:</strong> such as device details, usage logs and cookie preferences.</li>
          </ul>
        </div>

        {/* Your Data Controls */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 14px' }}>
            Your Data Controls
          </h2>
          <p style={{ margin: '0 0 16px', color: '#94A3B8' }}>
            Depending on the information and applicable law, you may request:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            {/* 1. Access */}
            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F97316', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>
                <Eye size={18} />
                <span>1. Access Your Data</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
                Request a copy of the personal information associated with your account.
              </p>
            </div>

            {/* 2. Correct */}
            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>
                <Edit size={18} />
                <span>2. Correct Your Information</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
                Request corrections to inaccurate personal information.
              </p>
            </div>

            {/* 3. Delete */}
            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>
                <Trash2 size={18} />
                <span>3. Delete Your Account</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
                Request account deletion and the removal of associated personal information, subject to applicable legal retention requirements.
              </p>
            </div>

            {/* 4. Preferences */}
            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A855F7', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>
                <Sliders size={18} />
                <span>4. Manage Your Preferences</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
                Control available communication, language and cookie preferences.
              </p>
            </div>

            {/* 5. Privacy Enquiries */}
            <div style={{ padding: '18px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>
                <HelpCircle size={18} />
                <span>5. Privacy Enquiries</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
                Contact us regarding questions about how your information is collected and processed.
              </p>
            </div>
          </div>
        </div>

        {/* Request Your Data Section & Form */}
        <div
          style={{
            padding: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '14px',
          }}
        >
          <h3 style={{ margin: '0 0 10px', fontSize: '19px', fontWeight: 800, color: '#FFFFFF' }}>
            Request Your Data
          </h3>
          <p style={{ margin: '0 0 20px', color: '#94A3B8', fontSize: '13.5px' }}>
            Users can submit privacy-related requests through this form using the subject &quot;Privacy &amp; Data Request&quot;. We may need to verify your identity before processing certain requests.
          </p>

          {isSuccess ? (
            <div
              style={{
                padding: '20px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6EE7B7', fontWeight: 800 }}>
                <CheckCircle2 size={20} />
                <span>Privacy Request Submitted Successfully</span>
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#D1FAE5' }}>
                Reference ID: <strong style={{ color: '#FFFFFF' }}>{referenceId}</strong>. We will review your request and contact you at <strong style={{ color: '#FFFFFF' }}>{email}</strong> within statutory timelines.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {errorMsg && (
                <div style={{ padding: '10px 14px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '8px', color: '#FCA5A5', fontSize: '13px' }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#CBD5E1' }}>Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your legal name"
                    required
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#CBD5E1' }}>Registered Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="account.email@example.com"
                    required
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#CBD5E1' }}>Request Type *</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: '#12141F',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '13.5px',
                  }}
                >
                  <option value="Access Your Data">Access Your Data (Export personal record)</option>
                  <option value="Correct Your Information">Correct Your Information (Rectify stored details)</option>
                  <option value="Delete Your Account">Delete Your Account &amp; Erase Birth Data</option>
                  <option value="Manage Your Preferences">Manage Communication &amp; Cookie Preferences</option>
                  <option value="Privacy Enquiry">General Privacy Enquiry</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#CBD5E1' }}>Request Details / Verification Context</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide any additional account identifiers or specifics regarding your request..."
                  rows={3}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '13.5px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  alignSelf: 'flex-start',
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Submit Privacy Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Our Commitment */}
        <div
          style={{
            padding: '20px',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6EE7B7', fontWeight: 800, fontSize: '15px' }}>
            <ShieldCheck size={18} />
            <span>Our Commitment</span>
          </div>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#D1FAE5', lineHeight: 1.65 }}>
            We aim to use appropriate technical and organizational safeguards to protect user information. We do not sell users&apos; personal birth details. For complete information, please read our{' '}
            <Link href="/privacy-policy" style={{ color: '#F97316', fontWeight: 700, textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </CompanyPageLayout>
  );
}

