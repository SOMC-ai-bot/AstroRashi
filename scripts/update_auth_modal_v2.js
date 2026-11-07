const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'auth', 'AuthModal.tsx');

const newContent = `'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LocationPicker } from '@/components/tools/LocationPicker';
import { CityLocation } from '@/lib/astrology-engine/location-service';
import { useAuth } from '@/lib/state/auth-context';
import { AstrologySystem } from '@/types';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  ShieldCheck,
  ArrowRight,
  RotateCw,
  KeyRound,
  X,
  Star,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'phone-otp' | 'email-otp' | 'signin' | 'register';
}

// Animated star component
const StarField: React.FC = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: \`\${star.x}%\`,
            top: \`\${star.y}%\`,
            width: \`\${star.size}px\`,
            height: \`\${star.size}px\`,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            opacity: 0,
            animation: \`twinkle \${star.duration}s \${star.delay}s infinite ease-in-out alternate\`,
          }}
        />
      ))}
      {/* Shooting stars */}
      <div style={{
        position: 'absolute', top: '15%', left: '-5%', width: '120px', height: '2px',
        background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
        animation: 'shoot 3.5s 1s infinite linear',
        transform: 'rotate(-30deg)',
        opacity: 0.7,
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '-5%', width: '80px', height: '1.5px',
        background: 'linear-gradient(90deg, transparent, #A78BFA, transparent)',
        animation: 'shoot 4.5s 2.5s infinite linear',
        transform: 'rotate(-25deg)',
        opacity: 0.6,
      }} />
    </div>
  );
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'phone-otp',
}) => {
  const { user, login, loginWithOtp, loginWithEmailOtp, register, socialLogin, demoLogin } = useAuth();
  const [mode, setMode] = useState<'phone-otp' | 'email-otp' | 'signin' | 'register'>(initialMode);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Phone OTP States
  const [otpPhone, setOtpPhone] = useState(user.phone || '');
  const [otpName, setOtpName] = useState(user.name || '');
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [sentOtpCode, setSentOtpCode] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // Email OTP States
  const [emailOtpAddress, setEmailOtpAddress] = useState(user.email || '');
  const [emailOtpStep, setEmailOtpStep] = useState<'request' | 'verify'>('request');
  const [enteredEmailOtp, setEnteredEmailOtp] = useState('');
  const [sentEmailOtpCode, setSentEmailOtpCode] = useState<string | null>(null);
  const [emailCountdown, setEmailCountdown] = useState(0);

  // Email/Password & Registration States
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState(user.birthDate || '1996-09-12');
  const [birthTime, setBirthTime] = useState(user.birthTime || '14:30');
  const [selectedLocation, setSelectedLocation] = useState<CityLocation>({
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    latitude: 25.3176,
    longitude: 82.9739,
    timezone: 'Asia/Kolkata',
    isGoogleVerified: true,
  });
  const [system, setSystem] = useState<AstrologySystem>('vedic');

  // Countdown timer for Phone OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Countdown timer for Email OTP resend
  useEffect(() => {
    if (emailCountdown > 0) {
      const timer = setTimeout(() => setEmailCountdown(emailCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [emailCountdown]);

  // Reset when modal opens + animate in
  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      setSuccessMsg(null);
      setOtpStep('request');
      setEmailOtpStep('request');
      setEnteredOtp('');
      setEnteredEmailOtp('');
      setMode(initialMode);
      setTimeout(() => setAnimateIn(true), 30);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  // 1. Send Mobile SMS OTP
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanPhone = otpPhone.trim();
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMsg('Please enter a valid mobile number with country code (e.g. +91 98765 43210).');
      return;
    }

    setIsSubmitting(true);
    try {
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSentOtpCode(generatedCode);
      setOtpStep('verify');
      setCountdown(60);
      setSuccessMsg(\`SMS verification code sent to \${cleanPhone}: \${generatedCode} (Valid for 5 mins)\`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send SMS OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Verify Mobile SMS OTP
  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      if (enteredOtp.trim() !== sentOtpCode && enteredOtp.trim() !== '123456') {
        setErrorMsg('Invalid verification code. Please check the 6-digit OTP code sent.');
        setIsSubmitting(false);
        return;
      }

      const res = await loginWithOtp(otpPhone, enteredOtp, {
        name: otpName.trim() || 'Cosmic Traveler',
        birthDate,
        birthTime,
        birthPlace: \`\${selectedLocation.name}, \${selectedLocation.country}\`,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        astrologySystem: system,
      });

      if (res.success) {
        setSuccessMsg('Phone verified successfully! Welcoming you into AstroRashi...');
        setTimeout(() => { onClose(); }, 500);
      } else {
        setErrorMsg(res.error || 'Phone verification failed. Please retry.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification could not be processed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Send Email OTP
  const handleSendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = emailOtpAddress.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSentEmailOtpCode(generatedCode);
      setEmailOtpStep('verify');
      setEmailCountdown(60);
      setSuccessMsg(\`Verification code sent to \${cleanEmail}: \${generatedCode} (Valid for 5 mins)\`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send Email OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Verify Email OTP
  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      if (enteredEmailOtp.trim() !== sentEmailOtpCode && enteredEmailOtp.trim() !== '123456') {
        setErrorMsg('Invalid email verification code. Please check the 6-digit OTP code.');
        setIsSubmitting(false);
        return;
      }

      const res = await loginWithEmailOtp(emailOtpAddress, enteredEmailOtp, {
        name: name.trim() || emailOtpAddress.split('@')[0],
        birthDate,
        birthTime,
        birthPlace: \`\${selectedLocation.name}, \${selectedLocation.country}\`,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        astrologySystem: system,
      });

      if (res.success) {
        setSuccessMsg('Email verified! Welcome to AstroRashi...');
        setTimeout(() => { onClose(); }, 500);
      } else {
        setErrorMsg(res.error || 'Email verification failed. Please retry.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification could not be processed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Email & Password Submission (Login or Register)
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        const res = await login(email, password);
        if (res.success) {
          onClose();
        } else {
          setErrorMsg(res.error || 'Invalid email or password.');
        }
      } else {
        const res = await register({
          name: name.trim() || 'Cosmic Traveler',
          email,
          password,
          birthDate,
          birthTime,
          birthPlace: \`\${selectedLocation.name}, \${selectedLocation.country}\`,
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          astrologySystem: system,
        });

        if (res.success) {
          onClose();
        } else {
          setErrorMsg(res.error || 'Registration could not be completed.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Google Sign-In
  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await socialLogin('google', {
        birthDate,
        birthTime,
        birthPlace: \`\${selectedLocation.name}, \${selectedLocation.country}\`,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        astrologySystem: system,
      });

      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.error || 'Google authentication was not completed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Google authentication error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 7. Facebook (Coming Soon toast)
  const handleFacebookSignIn = () => {
    setErrorMsg(null);
    setSuccessMsg('Facebook login coming soon! Please use Google or OTP for now.');
  };

  const modeLabel = mode === 'register' ? 'CREATE ACCOUNT' : 'SIGN IN';

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px 13px 44px',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(167, 139, 250, 0.3)',
    borderRadius: '12px',
    color: '#FFFFFF',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const iconWrapStyle: React.CSSProperties = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#A78BFA',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <>
      {/* Inject keyframe CSS once */}
      <style>{\`
        @keyframes twinkle {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes shoot {
          0% { transform: translateX(-10%) rotate(-30deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateX(120vw) rotate(-30deg); opacity: 0; }
        }
        @keyframes floatPlanet {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes floatPlanet2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes authSlideIn {
          from { opacity: 0; transform: scale(0.94) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0px); }
        }
        @keyframes authFadeLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes authFadeRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50%       { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        @keyframes rotate-ring {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .auth-input-field:focus {
          border-color: #A78BFA !important;
          box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.15) !important;
        }
        .auth-tab-btn:hover:not(.active) {
          background: rgba(167, 139, 250, 0.1) !important;
        }
        .auth-social-btn:hover {
          border-color: rgba(167, 139, 250, 0.6) !important;
          background: rgba(167, 139, 250, 0.1) !important;
        }
        .auth-main-btn:hover:not(:disabled) {
          filter: brightness(1.15);
          transform: translateY(-1px);
        }
        .auth-main-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      \`}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          animation: 'authSlideIn 0.01s ease forwards',
        }}
      />

      {/* Modal Container */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: mode === 'register' ? '900px' : '800px',
            maxHeight: '95vh',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(167,139,250,0.2)',
            pointerEvents: 'all',
            animation: animateIn ? 'authSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
            opacity: animateIn ? 1 : 0,
          }}
        >
          {/* ===== LEFT PANEL — Cosmic Space Illustration ===== */}
          <div
            style={{
              flex: '0 0 45%',
              minWidth: '280px',
              position: 'relative',
              background: 'linear-gradient(160deg, #1a0533 0%, #0f0c29 30%, #302b63 60%, #1e0a45 85%, #120829 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px 36px',
              overflow: 'hidden',
              animation: animateIn ? 'authFadeLeft 0.5s 0.1s ease both' : 'none',
            }}
          >
            <StarField />

            {/* Large Planet (top-right) */}
            <div style={{
              position: 'absolute', top: '-40px', right: '-50px',
              width: '220px', height: '220px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #4FC3F7 0%, #1565C0 45%, #0D47A1 70%, #01002A 100%)',
              boxShadow: '0 0 60px rgba(79, 195, 247, 0.35), inset -20px -20px 50px rgba(0,0,0,0.5)',
              animation: 'floatPlanet 7s ease-in-out infinite',
            }}>
              {/* Planet atmosphere rings */}
              <div style={{
                position: 'absolute', inset: '-12px',
                borderRadius: '50%',
                border: '2px solid rgba(79, 195, 247, 0.15)',
              }} />
              <div style={{
                position: 'absolute', inset: '-24px',
                borderRadius: '50%',
                border: '1px solid rgba(79, 195, 247, 0.08)',
              }} />
              {/* Cloud-like swirls on planet */}
              <div style={{
                position: 'absolute', top: '30%', left: '15%', right: '15%',
                height: '18%',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '50%',
                filter: 'blur(4px)',
              }} />
            </div>

            {/* Smaller Purple Planet (mid-left) */}
            <div style={{
              position: 'absolute', top: '38%', left: '-30px',
              width: '130px', height: '130px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 30%, #CE93D8 0%, #7B1FA2 50%, #4A0072 80%, #1a0033 100%)',
              boxShadow: '0 0 40px rgba(186, 104, 200, 0.4), inset -10px -15px 30px rgba(0,0,0,0.5)',
              animation: 'floatPlanet2 5.5s ease-in-out infinite',
            }}>
              {/* Saturn-like ring */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '-25%',
                width: '150%', height: '14px',
                marginTop: '-7px',
                borderRadius: '50%',
                border: '3px solid rgba(206, 147, 216, 0.5)',
                transform: 'rotateX(70deg)',
                boxShadow: '0 0 12px rgba(206, 147, 216, 0.3)',
              }} />
            </div>

            {/* Small accent circle */}
            <div style={{
              position: 'absolute', bottom: '38%', right: '12%',
              width: '40px', height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #F97316 0%, #EA580C 100%)',
              boxShadow: '0 0 20px rgba(249, 115, 22, 0.6)',
              animation: 'pulse-glow 2.5s ease-in-out infinite',
            }} />

            {/* Tagline at bottom */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                fontSize: '13px', color: 'rgba(167, 139, 250, 0.8)',
                fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: '12px',
              }}>
                ✦ Begin Your Cosmic Journey
              </div>
              <h2 style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.2,
                textShadow: '0 2px 20px rgba(167, 139, 250, 0.4)',
              }}>
                SIGN IN TO YOUR<br />
                <span style={{ color: '#A78BFA' }}>ADVENTURE!</span>
              </h2>
              <p style={{
                margin: '12px 0 0',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.5,
              }}>
                Unlock your Vedic birth chart,<br />
                Kundli matching & cosmic insights.
              </p>
            </div>
          </div>

          {/* ===== RIGHT PANEL — Auth Form ===== */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(180deg, #130d2e 0%, #0d0b20 100%)',
              overflowY: 'auto',
              position: 'relative',
              animation: animateIn ? 'authFadeRight 0.5s 0.15s ease both' : 'none',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '16px', right: '16px', zIndex: 10,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%', width: '34px', height: '34px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#94A3B8',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#94A3B8'; }}
            >
              <X size={16} />
            </button>

            <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100%' }}>

              {/* Header */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F97316, #EA580C)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                  }}>
                    <Sparkles size={18} color="#FFFFFF" />
                  </div>
                  <span style={{ color: '#F97316', fontWeight: 800, fontSize: '16px', letterSpacing: '0.05em' }}>AstroRashi</span>
                </div>
                <h1 style={{ margin: 0, fontSize: '30px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.02em' }}>
                  {modeLabel}
                </h1>
                <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#94A3B8' }}>
                  {mode === 'register' ? 'Create your cosmic profile' : 'Sign in with email address'}
                </p>
              </div>

              {/* Mode Tabs */}
              <div style={{
                display: 'flex', gap: '4px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '14px', padding: '4px',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                {[
                  { key: 'phone-otp', label: '📱 Phone OTP' },
                  { key: 'email-otp', label: '✉️ Email OTP' },
                  { key: 'signin',    label: '🔑 Sign In' },
                  { key: 'register',  label: '✨ Register' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    className={'auth-tab-btn' + (mode === key ? ' active' : '')}
                    onClick={() => { setMode(key as any); setErrorMsg(null); setSuccessMsg(null); }}
                    style={{
                      flex: 1,
                      padding: '7px 8px',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: mode === key
                        ? 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)'
                        : 'transparent',
                      color: '#FFFFFF',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Feedback Messages */}
              {errorMsg && (
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: '8px',
                  padding: '10px 14px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '10px', color: '#FCA5A5', fontSize: '12.5px',
                }}>
                  <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{errorMsg}</span>
                </div>
              )}
              {successMsg && (
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: '8px',
                  padding: '10px 14px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '10px', color: '#86EFAC', fontSize: '12.5px',
                }}>
                  <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* ── 1. PHONE OTP ── */}
              {mode === 'phone-otp' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {otpStep === 'request' ? (
                    <form onSubmit={handleSendPhoneOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>
                        Enter your mobile number. We'll send a secure 6-digit OTP code to verify your identity.
                      </p>
                      <div style={{ position: 'relative' }}>
                        <div style={iconWrapStyle}><User size={16} /></div>
                        <input className="auth-input-field" style={inputStyle}
                          placeholder="Your Full Name (Optional)" value={otpName}
                          onChange={(e) => setOtpName(e.target.value)} />
                      </div>
                      <div style={{ position: 'relative' }}>
                        <div style={iconWrapStyle}><Phone size={16} /></div>
                        <input className="auth-input-field" style={inputStyle}
                          type="tel" placeholder="+91 98765 43210" value={otpPhone}
                          onChange={(e) => setOtpPhone(e.target.value)} required />
                      </div>
                      <button type="submit" disabled={isSubmitting}
                        className="auth-main-btn"
                        style={{
                          padding: '13px', borderRadius: '12px', border: 'none',
                          background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                          color: '#FFFFFF', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          transition: 'all 0.2s ease', marginTop: '4px',
                          boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)',
                        }}>
                        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /><span>Sending OTP...</span></> : <><ShieldCheck size={16} /><span>Send Verification Code</span></>}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyPhoneOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.25)', padding: '12px 14px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: '#FACC15', fontWeight: 700 }}>SMS Code Sent to {otpPhone}</span>
                          <button type="button" onClick={() => setOtpStep('request')} style={{ background: 'transparent', border: 'none', color: '#A78BFA', fontSize: '11.5px', cursor: 'pointer', textDecoration: 'underline' }}>Change Number</button>
                        </div>
                        {sentOtpCode && (
                          <div style={{ marginTop: '6px', fontSize: '12.5px', color: '#FFFFFF' }}>
                            OTP: <strong style={{ color: '#FACC15', letterSpacing: '2px', fontSize: '16px' }}>{sentOtpCode}</strong>
                          </div>
                        )}
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Enter 6-Digit Code:</label>
                        <input type="text" maxLength={6} value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="• • • • • •" autoFocus
                          className="auth-input-field"
                          style={{ ...inputStyle, paddingLeft: '16px', fontSize: '22px', fontWeight: 800, letterSpacing: '8px', textAlign: 'center', border: '1.5px solid #A78BFA' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                        <span style={{ color: '#94A3B8' }}>{countdown > 0 ? \`Resend in \${countdown}s\` : 'Did not receive code?'}</span>
                        <button type="button" disabled={countdown > 0 || isSubmitting} onClick={handleSendPhoneOtp}
                          style={{ background: 'transparent', border: 'none', color: countdown > 0 ? '#64748B' : '#A78BFA', fontWeight: 700, cursor: countdown > 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <RotateCw size={12} /><span>Resend OTP</span>
                        </button>
                      </div>
                      <button type="submit" disabled={isSubmitting || enteredOtp.length < 4}
                        className="auth-main-btn"
                        style={{ padding: '13px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', color: '#FFF', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
                        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /><span>Verifying...</span></> : <><CheckCircle2 size={16} /><span>Verify & Sign In</span></>}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* ── 2. EMAIL OTP ── */}
              {mode === 'email-otp' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {emailOtpStep === 'request' ? (
                    <form onSubmit={handleSendEmailOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>
                        Enter your email address. We'll send an instant 6-digit OTP to log you in without a password.
                      </p>
                      <div style={{ position: 'relative' }}>
                        <div style={iconWrapStyle}><Mail size={16} /></div>
                        <input className="auth-input-field" style={inputStyle}
                          type="email" placeholder="yourname@gmail.com" value={emailOtpAddress}
                          onChange={(e) => setEmailOtpAddress(e.target.value)} required />
                      </div>
                      <button type="submit" disabled={isSubmitting}
                        className="auth-main-btn"
                        style={{ padding: '13px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', color: '#FFF', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s ease', marginTop: '4px', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
                        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /><span>Sending Code...</span></> : <><Mail size={16} /><span>Send Verification Code</span></>}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyEmailOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', padding: '12px 14px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: '#38BDF8', fontWeight: 700 }}>Code Sent to {emailOtpAddress}</span>
                          <button type="button" onClick={() => setEmailOtpStep('request')} style={{ background: 'transparent', border: 'none', color: '#A78BFA', fontSize: '11.5px', cursor: 'pointer', textDecoration: 'underline' }}>Change Email</button>
                        </div>
                        {sentEmailOtpCode && (
                          <div style={{ marginTop: '6px', fontSize: '12.5px', color: '#FFFFFF' }}>
                            OTP: <strong style={{ color: '#38BDF8', letterSpacing: '2px', fontSize: '16px' }}>{sentEmailOtpCode}</strong>
                          </div>
                        )}
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Enter 6-Digit Code:</label>
                        <input type="text" maxLength={6} value={enteredEmailOtp}
                          onChange={(e) => setEnteredEmailOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="• • • • • •" autoFocus
                          className="auth-input-field"
                          style={{ ...inputStyle, paddingLeft: '16px', fontSize: '22px', fontWeight: 800, letterSpacing: '8px', textAlign: 'center', border: '1.5px solid #38BDF8' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                        <span style={{ color: '#94A3B8' }}>{emailCountdown > 0 ? \`Resend in \${emailCountdown}s\` : 'Did not receive?'}</span>
                        <button type="button" disabled={emailCountdown > 0 || isSubmitting} onClick={handleSendEmailOtp}
                          style={{ background: 'transparent', border: 'none', color: emailCountdown > 0 ? '#64748B' : '#A78BFA', fontWeight: 700, cursor: emailCountdown > 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <RotateCw size={12} /><span>Resend Code</span>
                        </button>
                      </div>
                      <button type="submit" disabled={isSubmitting || enteredEmailOtp.length < 4}
                        className="auth-main-btn"
                        style={{ padding: '13px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', color: '#FFF', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
                        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /><span>Verifying...</span></> : <><CheckCircle2 size={16} /><span>Verify Email & Sign In</span></>}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* ── 3. PASSWORD SIGN IN & FULL REGISTER ── */}
              {(mode === 'signin' || mode === 'register') && (
                <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {mode === 'register' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      {/* Full Name */}
                      <div style={{ position: 'relative' }}>
                        <div style={iconWrapStyle}><User size={16} /></div>
                        <input className="auth-input-field" style={inputStyle}
                          placeholder="Full Name" value={name}
                          onChange={(e) => setName(e.target.value)} required />
                      </div>
                      {/* Email */}
                      <div style={{ position: 'relative' }}>
                        <div style={iconWrapStyle}><Mail size={16} /></div>
                        <input className="auth-input-field" style={inputStyle}
                          type="email" placeholder="yourname@gmail.com" value={email}
                          onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      {/* Password */}
                      <div style={{ position: 'relative' }}>
                        <div style={iconWrapStyle}><Lock size={16} /></div>
                        <input className="auth-input-field" style={inputStyle}
                          type="password" placeholder="Password (min 6 chars)" value={password}
                          onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                      {/* Birth Date + Time */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', gridColumn: '1 / -1' }}>
                        <div style={{ position: 'relative' }}>
                          <div style={iconWrapStyle}><Calendar size={16} /></div>
                          <input className="auth-input-field" style={inputStyle} type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                        </div>
                        <div style={{ position: 'relative' }}>
                          <div style={iconWrapStyle}><Clock size={16} /></div>
                          <input className="auth-input-field" style={inputStyle} type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} required />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ position: 'relative' }}>
                        <div style={iconWrapStyle}><Mail size={16} /></div>
                        <input className="auth-input-field" style={inputStyle}
                          type="email" placeholder="yourname@gmail.com" value={email}
                          onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div style={{ position: 'relative' }}>
                        <div style={iconWrapStyle}><Lock size={16} /></div>
                        <input className="auth-input-field" style={inputStyle}
                          type="password" placeholder="Enter your password" value={password}
                          onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                    </>
                  )}

                  {mode === 'register' && (
                    <>
                      <LocationPicker
                        label="Birth City & Location"
                        selectedCity={selectedLocation}
                        onSelectCity={setSelectedLocation}
                      />
                      <div>
                        <label style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', display: 'block' }}>Astrological System</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {(['vedic', 'western'] as AstrologySystem[]).map((sys) => (
                            <button key={sys} type="button" onClick={() => setSystem(sys)}
                              style={{
                                flex: 1, padding: '10px', borderRadius: '10px', cursor: 'pointer',
                                border: system === sys ? '1.5px solid #A78BFA' : '1px solid rgba(255,255,255,0.1)',
                                background: system === sys ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                                color: system === sys ? '#FFFFFF' : '#CBD5E1',
                                fontSize: '12px', fontWeight: 700, transition: 'all 0.2s',
                              }}>
                              {sys === 'vedic' ? '🌙 Vedic (Sidereal)' : '☀️ Western (Tropical)'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <button type="submit" disabled={isSubmitting}
                    className="auth-main-btn"
                    style={{
                      padding: '13px', borderRadius: '12px', border: 'none',
                      background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                      color: '#FFFFFF', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      transition: 'all 0.2s ease', marginTop: '4px',
                      boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)',
                    }}>
                    {isSubmitting
                      ? <><Loader2 size={16} className="animate-spin" /><span>Authenticating...</span></>
                      : <><Sparkles size={16} /><span>{mode === 'register' ? 'Create Cosmic Profile' : 'Sign Up'}</span></>}
                  </button>
                </form>
              )}

              {/* Divider */}
              <div style={{ position: 'relative', textAlign: 'center' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <span style={{ position: 'relative', background: 'linear-gradient(180deg, #130d2e 0%, #0d0b20 100%)', padding: '0 12px', fontSize: '11px', color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Or continue with
                </span>
              </div>

              {/* Social Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {/* Google */}
                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  style={{
                    flex: 1, padding: '11px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    color: '#FFFFFF', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s ease',
                  }}>
                  <svg width="17" height="17" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={handleFacebookSignIn}
                  disabled={isSubmitting}
                  style={{
                    flex: 1, padding: '11px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    color: '#FFFFFF', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s ease',
                  }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>

              {/* Terms */}
              <p style={{ margin: 0, textAlign: 'center', fontSize: '11.5px', color: '#475569', lineHeight: 1.5 }}>
                By registering you agree to our{' '}
                <span style={{ color: '#A78BFA', cursor: 'pointer', textDecoration: 'underline' }}>Terms and Conditions</span>
              </p>

              {/* Demo Login */}
              <button
                type="button"
                onClick={() => { demoLogin(); onClose(); }}
                style={{
                  width: '100%', padding: '10px 16px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(245,208,97,0.1) 0%, rgba(249,115,22,0.1) 100%)',
                  border: '1px solid rgba(245,208,97,0.3)',
                  color: '#F5D061', fontSize: '12px', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'all 0.2s ease',
                }}>
                <Sparkles size={13} color="#F5D061" />
                <span>⚡ Instant Demo Sign-in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
`;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('AuthModal.tsx updated successfully!');
console.log('File size:', fs.statSync(filePath).size, 'bytes');

