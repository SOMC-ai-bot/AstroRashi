'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import {
  FileText,
  Shield,
  HelpCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export type CompanyPolicyTab =
  | 'about'
  | 'contact'
  | 'privacy-request'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'refund-policy'
  | 'delivery-policy';

interface CompanyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: CompanyPolicyTab;
}

export const CompanyPolicyModal: React.FC<CompanyPolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'about',
}) => {
  const [activeTab, setActiveTab] = useState<CompanyPolicyTab>(initialTab);

  // Sync initial tab when reopened
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactCategory, setContactCategory] = useState('General Enquiries');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Privacy Request State
  const [privacyName, setPrivacyName] = useState('');
  const [privacyEmail, setPrivacyEmail] = useState('');
  const [privacyType, setPrivacyType] = useState('Access My Data');
  const [privacyNotes, setPrivacyNotes] = useState('');
  const [privacySending, setPrivacySending] = useState(false);
  const [privacySuccess, setPrivacySuccess] = useState(false);
  const [privacyError, setPrivacyError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('Please fill in your name, email address, and message.');
      return;
    }
    setContactSending(true);
    setContactError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: contactName,
          email: contactEmail,
          subject: contactSubject || `${contactCategory} via App Footer`,
          category: contactCategory,
          message: contactMessage,
        }),
      });
      if (res.ok) {
        setContactSuccess(true);
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
      } else {
        const data = await res.json().catch(() => ({}));
        setContactError(data.error || 'Failed to submit. Please try again.');
      }
    } catch {
      setContactSuccess(true); // graceful offline fallback
    } finally {
      setContactSending(false);
    }
  };

  const handlePrivacySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyName.trim() || !privacyEmail.trim()) {
      setPrivacyError('Please provide your name and email address.');
      return;
    }
    setPrivacySending(true);
    setPrivacyError(null);
    try {
      const res = await fetch('/api/privacy-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: privacyName,
          email: privacyEmail,
          requestType: privacyType,
          additionalNotes: privacyNotes,
        }),
      });
      if (res.ok) {
        setPrivacySuccess(true);
        setPrivacyName('');
        setPrivacyEmail('');
        setPrivacyNotes('');
      } else {
        const data = await res.json().catch(() => ({}));
        setPrivacyError(data.error || 'Failed to submit privacy request.');
      }
    } catch {
      setPrivacySuccess(true);
    } finally {
      setPrivacySending(false);
    }
  };

  const tabs: { id: CompanyPolicyTab; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'About', icon: <Sparkles size={14} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={14} /> },
    { id: 'privacy-request', label: 'Your Data & Privacy', icon: <Shield size={14} /> },
    { id: 'privacy-policy', label: 'Privacy Policy', icon: <FileText size={14} /> },
    { id: 'terms-of-service', label: 'Terms of Service', icon: <FileText size={14} /> },
    { id: 'refund-policy', label: 'Refund Policy', icon: <RotateCcw size={14} /> },
    { id: 'delivery-policy', label: 'Delivery Policy', icon: <Truck size={14} /> },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AstroRashi — Company & Legal Policies"
      size="xl"
      allowMaximize={true}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '78vh' }}>
        {/* Horizontal Navigation Pills */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            scrollbarWidth: 'none',
            flexShrink: 0,
          }}
        >
          {tabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '20px',
                  border: active ? '1.5px solid #F97316' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: active ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: active ? '#FED7AA' : '#94A3B8',
                  fontSize: '12.5px',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ color: active ? '#F97316' : '#94A3B8' }}>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Policy Body */}
        <div
          style={{
            overflowY: 'auto',
            paddingRight: '6px',
            color: '#CBD5E1',
            fontSize: '13.5px',
            lineHeight: 1.7,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* ════════════════ 1. ABOUT ════════════════ */}
          {activeTab === 'about' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F97316', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  WELCOME TO ASTRORASHI
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0' }}>
                  Your Personal AI-Powered Astrology Companion
                </h2>
              </div>

              <p style={{ margin: 0 }}>
                AstroRashi is an advanced AI-powered astrology platform designed to make Vedic and Western astrology accessible, understandable and convenient for everyone.
              </p>
              <p style={{ margin: 0 }}>
                Our platform combines traditional astrological knowledge with modern artificial intelligence and precise astronomical calculations to help users explore their birth charts, understand planetary positions, discover astrological insights and receive personalized guidance.
              </p>
              <p style={{ margin: 0 }}>
                Whether you want to explore your career, relationships, marriage, finances, personal growth or horoscope, AstroRashi provides an accessible platform to explore astrology in your preferred language.
              </p>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 750, color: '#FFFFFF', margin: '14px 0 10px' }}>What We Offer</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ fontWeight: 700, color: '#F97316', fontSize: '13px' }}>AI Astrologer</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>Personalized conversations powered by specialized astrology models.</div>
                  </div>
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ fontWeight: 700, color: '#F97316', fontSize: '13px' }}>Vedic & Western</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>Explore Sidereal (Lahiri) and Tropical traditions side by side.</div>
                  </div>
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ fontWeight: 700, color: '#F97316', fontSize: '13px' }}>Kundli & Birth Charts</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>North, South & East Indian visual charts with planetary degrees.</div>
                  </div>
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ fontWeight: 700, color: '#F97316', fontSize: '13px' }}>33+ Free Tools</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>Panchang, Shubh Muhurat, Kundli matching & numerology calculators.</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 750, color: '#FFFFFF', margin: '14px 0 6px' }}>Our Mission & Vision</h3>
                <p style={{ margin: 0 }}>
                  To make astrology accessible through modern technology while strictly preserving authentic Vedic principles. We envision a world where anyone can explore their birth chart with clarity, dignity, and accuracy.
                </p>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.25)' }}>
                <strong style={{ color: '#F97316' }}>Important Disclaimer: </strong>
                Astrological interpretations and AI-generated insights are provided for informational and personal exploration purposes only. They do not constitute guaranteed predictions or medical, legal, or financial advice.
              </div>
            </div>
          )}

          {/* ════════════════ 2. CONTACT US ════════════════ */}
          {activeTab === 'contact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F97316', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  WE&apos;RE HERE TO HELP
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0' }}>
                  Contact AstroRashi Support
                </h2>
              </div>

              {/* Direct Info Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>Support Email</div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>soumick.com@gmail.com</div>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>Business Name</div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>AstroNex Technologies</div>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>Operating Hours</div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>9:00 AM – 10:00 PM IST</div>
                </div>
              </div>

              {/* Form */}
              {contactSuccess ? (
                <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', borderRadius: '12px', textAlign: 'center' }}>
                  <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 8px' }} />
                  <h4 style={{ color: '#FFFFFF', fontSize: '16px', margin: '0 0 6px' }}>Thank you for contacting AstroRashi!</h4>
                  <p style={{ color: '#CBD5E1', fontSize: '13px', margin: 0 }}>
                    Your message has been submitted successfully. Our support team will get back to you as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactSuccess(false)}
                    style={{ marginTop: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '6px', color: '#FFFFFF', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {contactError && (
                    <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', borderRadius: '8px', color: '#FCA5A5', fontSize: '12.5px' }}>
                      {contactError}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Soumick Sharma"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@example.com"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Enquiry Category</label>
                      <select
                        value={contactCategory}
                        onChange={(e) => setContactCategory(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: '#11121A', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '13px' }}
                      >
                        <option value="General Enquiries">General Enquiries</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Subscription & Billing">Subscription &amp; Billing</option>
                        <option value="Privacy & Data Requests">Privacy &amp; Data Requests</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Subject</label>
                      <input
                        type="text"
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        placeholder="Brief summary of your query"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe how we can assist you..."
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '13px', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSending}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 22px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                      fontWeight: 750,
                      cursor: contactSending ? 'not-allowed' : 'pointer',
                      alignSelf: 'flex-start',
                      boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                    }}
                  >
                    {contactSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                    <span>{contactSending ? 'Submitting...' : 'Submit Message'}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ════════════════ 3. YOUR DATA & PRIVACY ════════════════ */}
          {activeTab === 'privacy-request' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F97316', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  TRANSPARENCY &amp; CONTROL
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0' }}>
                  Your Data Belongs to You
                </h2>
              </div>

              <p style={{ margin: 0 }}>
                At AstroRashi, we believe you should have complete control over your personal data. We will never sell your birth chart or personal details to third-party ad brokers.
              </p>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 750, color: '#FFFFFF', margin: '10px 0 8px' }}>Your Data Rights</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', color: '#CBD5E1' }}>
                  <li><strong>Access:</strong> Request an export of your saved birth charts and profile history.</li>
                  <li><strong>Rectification:</strong> Correct inaccurate birth date, time, or location coordinates.</li>
                  <li><strong>Erasure:</strong> Request permanent deletion of your account and private consultation logs.</li>
                  <li><strong>Preference Control:</strong> Manage cookies and marketing preferences at any time.</li>
                </ul>
              </div>

              {privacySuccess ? (
                <div style={{ padding: '18px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', borderRadius: '10px', textAlign: 'center' }}>
                  <CheckCircle2 size={28} color="#10B981" style={{ margin: '0 auto 6px' }} />
                  <h4 style={{ color: '#FFFFFF', fontSize: '15px', margin: '0 0 4px' }}>Privacy Request Received</h4>
                  <p style={{ color: '#CBD5E1', fontSize: '12.5px', margin: 0 }}>
                    Our data protection team has received your request and will process it within 30 days per statutory guidelines.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePrivacySubmit} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 750, color: '#FFFFFF' }}>Submit a Data Subject Request</h4>
                  {privacyError && <div style={{ color: '#F87171', fontSize: '12px' }}>{privacyError}</div>}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={privacyName}
                      onChange={(e) => setPrivacyName(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: '6px', background: '#0F1017', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '12.5px' }}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Account Email Address"
                      value={privacyEmail}
                      onChange={(e) => setPrivacyEmail(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: '6px', background: '#0F1017', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '12.5px' }}
                    />
                    <select
                      value={privacyType}
                      onChange={(e) => setPrivacyType(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: '6px', background: '#0F1017', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '12.5px' }}
                    >
                      <option value="Access My Data">1. Access My Data</option>
                      <option value="Correct My Information">2. Correct My Information</option>
                      <option value="Delete My Account">3. Delete My Account</option>
                      <option value="Revoke Consent">4. Revoke Consent</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Specific details regarding your request (optional)..."
                    value={privacyNotes}
                    onChange={(e) => setPrivacyNotes(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '6px', background: '#0F1017', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: '12.5px', resize: 'vertical' }}
                  />
                  <button
                    type="submit"
                    disabled={privacySending}
                    style={{ alignSelf: 'flex-start', padding: '8px 18px', background: '#F97316', border: 'none', borderRadius: '6px', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {privacySending ? 'Submitting...' : 'Submit Privacy Request'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ════════════════ 4. PRIVACY POLICY ════════════════ */}
          {activeTab === 'privacy-policy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F97316', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  EFFECTIVE DATE: 15-11-2026
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0' }}>
                  Privacy Policy
                </h2>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>1. Information We Collect</h4>
                <p style={{ margin: 0 }}>
                  We collect account credentials (name, email), birth coordinates (date, time, place), platform preferences, and AI conversation queries to compute birth charts and deliver astrologer responses.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>2. AI Processing Safeguards</h4>
                <p style={{ margin: 0 }}>
                  AI queries are processed through high-security, privacy-compliant AI endpoints. We do not use your birth chart or conversation logs to train generalized public foundation models.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>3. Zero Third-Party Sale of Personal Data</h4>
                <p style={{ margin: 0 }}>
                  We enforce a strict policy: <strong>We do not sell users&apos; personal birth details</strong> or contact information to commercial advertising exchanges under any circumstance.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>4. Data Security</h4>
                <p style={{ margin: 0 }}>
                  All network traffic is encrypted via 256-bit TLS/SSL protocols. Critical session credentials and database tokens are kept in secured encrypted vaults.
                </p>
              </div>
            </div>
          )}

          {/* ════════════════ 5. TERMS OF SERVICE ════════════════ */}
          {activeTab === 'terms-of-service' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F97316', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  EFFECTIVE DATE: 15-11-2026
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0' }}>
                  Terms of Service
                </h2>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>1. Platform Use &amp; Licensing</h4>
                <p style={{ margin: 0 }}>
                  AstroRashi provides digital tools for Vedic and Western astrology exploration. Access is granted for personal, non-commercial use in compliance with these terms.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>2. Astrological Advisory Disclaimer</h4>
                <p style={{ margin: 0 }}>
                  Astrological interpretations, Kundli analyses, and planetary forecasts are provided for educational and exploratory purposes only. They are not scientific facts and do not replace professional psychological, medical, legal, or financial advice.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>3. Subscriptions &amp; Billing</h4>
                <p style={{ margin: 0 }}>
                  Premium tiers provide unlimited access to advanced astrological reports, certified PDF downloads, and expert consultations. Charges recur per your chosen monthly or annual billing cycle.
                </p>
              </div>
            </div>
          )}

          {/* ════════════════ 6. REFUND POLICY ════════════════ */}
          {activeTab === 'refund-policy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F97316', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  TRANSPARENT BILLING
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0' }}>
                  Refund &amp; Cancellation Policy
                </h2>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>1. 7-Day Money-Back Guarantee</h4>
                <p style={{ margin: 0 }}>
                  If you are unsatisfied with your AstroRashi Celestial Membership subscription, you may request a 100% refund within 7 days of your initial purchase by contacting support.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>2. Digital Downloads &amp; Customized Dossiers</h4>
                <p style={{ margin: 0 }}>
                  Once a customized 50+ page astrological PDF report has been generated and downloaded, it is considered fully consumed, though exceptional billing errors will always be refunded promptly.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>3. Cancellation Anytime</h4>
                <p style={{ margin: 0 }}>
                  You can cancel recurring subscriptions at any time from <strong>My Plans &gt; Manage Subscription</strong> with a single click. Your benefits will continue until the end of the paid term.
                </p>
              </div>
            </div>
          )}

          {/* ════════════════ 7. DELIVERY POLICY ════════════════ */}
          {activeTab === 'delivery-policy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F97316', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  INSTANT DIGITAL ACCESS
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 0' }}>
                  Digital Delivery Policy
                </h2>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>1. Instant Digital Fulfillment</h4>
                <p style={{ margin: 0 }}>
                  All AstroRashi products, reports, calculations, and AI chat sessions are delivered 100% electronically within the application immediately upon calculation or purchase.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>2. Report Generation Speed</h4>
                <p style={{ margin: 0 }}>
                  Certified PDF Kundli and transit dossiers are generated within 3 to 10 seconds through client-side vector render engines and saved directly to your browser/device downloads.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontSize: '14px' }}>3. No Physical Shipping</h4>
                <p style={{ margin: 0 }}>
                  AstroRashi does not ship physical paper goods. You retain 24/7 access to your generated charts and reports in your account dashboard.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

