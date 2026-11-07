'use client';

import React, { useState } from 'react';
import { CompanyPageLayout } from '@/components/company/CompanyPageLayout';
import {
  Mail,
  Building,
  Clock,
  HelpCircle,
  Shield,
  CreditCard,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Paperclip,
} from 'lucide-react';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('General Enquiries');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(file.size);
    } else {
      setFileName('');
      setFileSize(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Frontend validations
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!subject.trim()) {
      setErrorMessage('Please enter a subject.');
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Please enter a message of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          subject,
          category,
          message,
          attachmentName: fileName || undefined,
          attachmentSize: fileSize || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFullName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setFileName('');
        setFileSize(0);
      } else {
        setErrorMessage(data.error || 'Failed to submit message. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage('An unexpected network error occurred. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CompanyPageLayout
      badge="CONTACT US"
      title="We're Here to Help"
      subtitle="Have a question, need technical assistance, or want to share feedback? Our support team is here to help you with your AstroRashi experience."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', color: '#CBD5E1', fontSize: '14.5px', lineHeight: 1.7 }}>
        {/* How Can We Help 4 Category Grid */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px' }}>
            How Can We Help?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F97316', fontWeight: 750, marginBottom: '6px' }}>
                <HelpCircle size={16} />
                <span>General Enquiries</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
                For questions about AstroRashi, its features, tools and services.
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontWeight: 750, marginBottom: '6px' }}>
                <Clock size={16} />
                <span>Technical Support</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
                For login issues, account problems, technical errors, missing reports or difficulties using the platform.
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EC4899', fontWeight: 750, marginBottom: '6px' }}>
                <CreditCard size={16} />
                <span>Subscription &amp; Billing</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
                For subscription activation, payment issues, cancellations and refund-related enquiries.
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 750, marginBottom: '6px' }}>
                <Shield size={16} />
                <span>Privacy &amp; Data Requests</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>
                For questions about your personal information, data access, correction or deletion requests.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information Summary Box */}
        <div
          style={{
            padding: '22px',
            backgroundColor: 'rgba(249, 115, 22, 0.06)',
            borderRadius: '12px',
            border: '1px solid rgba(249, 115, 22, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>
            Contact Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '13.5px' }}>
            <div>
              <span style={{ color: '#94A3B8' }}>Support Email:</span>{' '}
              <a href="mailto:soumick.com@gmail.com" style={{ color: '#F97316', fontWeight: 700, textDecoration: 'underline' }}>
                soumick.com@gmail.com
              </a>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>Business Name:</span>{' '}
              <strong style={{ color: '#FFFFFF' }}>AstroNex</strong>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>Business Address:</span>{' '}
              <strong style={{ color: '#FFFFFF' }}>astronex</strong>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>Support Hours:</span>{' '}
              <strong style={{ color: '#FFFFFF' }}>9AM-10PM</strong>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>Expected Response Time:</span>{' '}
              <strong style={{ color: '#FFFFFF' }}>9AM-10PM</strong>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div style={{ paddingTop: '8px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
            Send Us a Message
          </h3>

          {isSubmitted ? (
            <div
              style={{
                padding: '28px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '12px',
              }}
            >
              <CheckCircle2 size={42} color="#10B981" />
              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
                Thank you for contacting AstroRashi!
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#D1FAE5', maxWidth: '520px', lineHeight: 1.6 }}>
                Your message has been submitted successfully. Our support team will get back to you as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                style={{
                  marginTop: '10px',
                  padding: '8px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {errorMessage && (
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#FCA5A5',
                    fontSize: '13.5px',
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {/* Full Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#CBD5E1' }}>
                    Full Name <span style={{ color: '#F97316' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Soumick Chakraborty"
                    required
                    style={{
                      padding: '11px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Email Address */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#CBD5E1' }}>
                    Email Address <span style={{ color: '#F97316' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    style={{
                      padding: '11px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {/* Subject */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#CBD5E1' }}>
                    Subject <span style={{ color: '#F97316' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of your enquiry"
                    required
                    style={{
                      padding: '11px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Enquiry Category */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#CBD5E1' }}>
                    Enquiry Category <span style={{ color: '#F97316' }}>*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      padding: '11px 14px',
                      backgroundColor: '#12141F',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  >
                    <option value="General Enquiries">General Enquiries</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Subscription & Billing">Subscription &amp; Billing</option>
                    <option value="Privacy & Data Requests">Privacy &amp; Data Requests</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#CBD5E1' }}>
                  Message <span style={{ color: '#F97316' }}>*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe how our team can help you in detail..."
                  rows={5}
                  required
                  style={{
                    padding: '12px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Optional Attachment */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Paperclip size={14} />
                  <span>Attachment (optional)</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <label
                    style={{
                      display: 'inline-block',
                      padding: '8px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px dashed rgba(255, 255, 255, 0.25)',
                      borderRadius: '8px',
                      color: '#CBD5E1',
                      fontSize: '12.5px',
                      fontWeight: 650,
                      cursor: 'pointer',
                    }}
                  >
                    <span>Choose File...</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept=".jpg,.jpeg,.png,.pdf,.txt"
                    />
                  </label>
                  {fileName && (
                    <span style={{ fontSize: '12.5px', color: '#38BDF8' }}>
                      {fileName} ({(fileSize / 1024).toFixed(1)} KB)
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  Supported formats: PDF, PNG, JPG, TXT (Max 5MB)
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: '8px',
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 750,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(249, 115, 22, 0.4)',
                  transition: 'transform 0.15s ease',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Submit Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </CompanyPageLayout>
  );
}

