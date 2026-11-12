'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/state/auth-context';
import { Mail, Loader2, AlertCircle, CheckCircle2, X, ArrowLeft } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: string;
}

// ── Animated star field ──────────────────────────────────────────────
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.2 + 0.4,
  delay: Math.random() * 5,
  dur: Math.random() * 3 + 1.8,
}));

const StarField: React.FC = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {STARS.map((s) => (
      <div
        key={s.id}
        style={{
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: `${s.size}px`,
          height: `${s.size}px`,
          borderRadius: '50%',
          background: '#fff',
          opacity: 0,
          animation: `ar-twinkle ${s.dur}s ${s.delay}s infinite ease-in-out alternate`,
        }}
      />
    ))}
    <div style={{ position:'absolute', top:'22%', left:'-8%', width:'110px', height:'2px', background:'linear-gradient(90deg,transparent,#fff 60%,transparent)', transform:'rotate(-30deg)', animation:'ar-shoot 4s 0.8s infinite linear', opacity: 0.8 }} />
    <div style={{ position:'absolute', top:'55%', left:'-8%', width:'70px', height:'1.5px', background:'linear-gradient(90deg,transparent,#c4b5fd 60%,transparent)', transform:'rotate(-28deg)', animation:'ar-shoot 5.5s 2.6s infinite linear', opacity: 0.65 }} />
  </div>
);

// ── Component ────────────────────────────────────────────────────────
export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { socialLogin, sendEmailSignInLink } = useAuth();

  const [email, setEmail]           = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg]     = useState<string | null>(null);
  const [step, setStep]             = useState<'form' | 'link-sent'>('form');
  const [visible, setVisible]       = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setErrorMsg(null);
      setIsSubmitting(false);
      setStep('form');
      setTimeout(() => setVisible(true), 20);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Send Firebase Email Magic Link
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await sendEmailSignInLink(clean);
      if (res.success) {
        setStep('link-sent');
      } else {
        setErrorMsg(res.error || 'Could not send sign-in link. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await socialLogin('google', {});
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.error || 'Google sign-in was cancelled or failed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Google sign-in error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFacebook = () => {
    setErrorMsg(null);
    setErrorMsg('Facebook login coming soon! Please use Google or email sign-in for now.');
  };

  return (
    <>
      <style>{`
        @keyframes ar-twinkle {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1.3); }
        }
        @keyframes ar-shoot {
          0%   { transform: translateX(0) rotate(-30deg); opacity: 0; }
          8%   { opacity: 0.9; }
          92%  { opacity: 0.5; }
          100% { transform: translateX(115vw) rotate(-30deg); opacity: 0; }
        }
        @keyframes ar-float1 {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-16px) rotate(2.5deg); }
        }
        @keyframes ar-float2 {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-11px) rotate(-2deg); }
        }
        @keyframes ar-glow {
          0%,100% { box-shadow: 0 0 18px rgba(249,115,22,.35); }
          50%      { box-shadow: 0 0 38px rgba(249,115,22,.65); }
        }
        @keyframes ar-fadein {
          from { opacity: 0; transform: scale(.95) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ar-left {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ar-right {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .ar-email-input {
          width: 100%;
          padding: 13px 16px 13px 44px;
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(167,139,250,0.35);
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          box-sizing: border-box;
        }
        .ar-email-input:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 0 3px rgba(167,139,250,.15);
        }
        .ar-email-input::placeholder { color: rgba(255,255,255,.35); }
        .ar-signup-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: filter .2s, transform .15s;
          box-shadow: 0 5px 20px rgba(124,58,237,.45);
          letter-spacing: .02em;
        }
        .ar-signup-btn:hover:not(:disabled) { filter: brightness(1.15); transform: translateY(-1px); }
        .ar-signup-btn:disabled { opacity: .55; cursor: not-allowed; }
        .ar-social-btn {
          flex: 1;
          padding: 11px 8px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.14);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background .2s, border-color .2s, transform .15s;
        }
        .ar-social-btn:hover:not(:disabled) {
          background: rgba(167,139,250,.12);
          border-color: rgba(167,139,250,.5);
          transform: translateY(-1px);
        }
        .ar-social-btn:disabled { opacity: .55; cursor: not-allowed; }
        .ar-close-btn {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12) !important;
          border-radius: 50%;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #94A3B8;
          transition: background .2s, color .2s;
        }
        .ar-close-btn:hover { background: rgba(255,255,255,.18); color: #fff; }
        @media (max-width: 680px) {
          .auth-horizontal-card {
            flex-direction: column !important;
            max-height: 94vh !important;
            overflow-y: auto !important;
          }
          .auth-left-cosmic {
            min-height: 140px !important;
            padding: 20px 20px 16px !important;
            flex: none !important;
          }
          .auth-right-form {
            padding: 24px 20px !important;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:9998, background:'rgba(0,0,0,.78)', backdropFilter:'blur(7px)' }} />

      {/* Modal wrapper */}
      <div style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', pointerEvents:'none' }}>
        <div style={{
          display:'flex', flexDirection:'row', width:'100%', maxWidth:'820px', minHeight:'460px', maxHeight:'90vh',
          borderRadius:'24px', overflow:'hidden',
          boxShadow:'0 32px 80px rgba(0,0,0,.75), 0 0 0 1px rgba(167,139,250,.22)',
          pointerEvents:'all',
          boxSizing:'border-box',
          opacity: visible ? 1 : 0,
          animation: visible ? 'ar-fadein .42s cubic-bezier(.34,1.56,.64,1) forwards' : 'none',
        }} className="auth-horizontal-card">

          {/* ══ LEFT — Cosmic Panel ══ */}
          <div style={{
            flex:'0 0 44%', minWidth:'220px', position:'relative',
            background:'linear-gradient(155deg,#1c0540 0%,#0f0b28 28%,#2d2862 55%,#1a0a40 80%,#100720 100%)',
            display:'flex', flexDirection:'column', justifyContent:'flex-end',
            padding:'34px 28px', overflow:'hidden', boxSizing:'border-box',
            animation: visible ? 'ar-left .5s .1s ease both' : 'none',
          }} className="auth-left-cosmic">
            <StarField />

            {/* Large blue planet */}
            <div style={{ position:'absolute', top:'-55px', right:'-60px', width:'230px', height:'230px', borderRadius:'50%', background:'radial-gradient(circle at 32% 32%,#67E8F9 0%,#1D4ED8 42%,#0D2EA0 70%,#04012A 100%)', boxShadow:'0 0 70px rgba(103,232,249,.3),inset -22px -22px 55px rgba(0,0,0,.55)', animation:'ar-float1 7.5s ease-in-out infinite' }}>
              <div style={{ position:'absolute', inset:'-14px', borderRadius:'50%', border:'2px solid rgba(103,232,249,.12)' }} />
              <div style={{ position:'absolute', inset:'-26px', borderRadius:'50%', border:'1px solid rgba(103,232,249,.06)' }} />
              <div style={{ position:'absolute', top:'32%', left:'12%', right:'12%', height:'15%', background:'rgba(255,255,255,.06)', borderRadius:'50%', filter:'blur(5px)' }} />
            </div>

            {/* Purple planet with ring */}
            <div style={{ position:'absolute', top:'36%', left:'-35px', width:'140px', height:'140px', borderRadius:'50%', background:'radial-gradient(circle at 38% 28%,#D8B4FE 0%,#7E22CE 48%,#4C0080 78%,#1A0030 100%)', boxShadow:'0 0 48px rgba(192,132,252,.38),inset -12px -16px 32px rgba(0,0,0,.55)', animation:'ar-float2 6s ease-in-out infinite' }}>
              <div style={{ position:'absolute', top:'50%', left:'-28%', width:'156%', height:'16px', marginTop:'-8px', borderRadius:'50%', border:'3px solid rgba(216,180,254,.45)', transform:'rotateX(68deg)', boxShadow:'0 0 12px rgba(216,180,254,.25)' }} />
            </div>

            {/* Orange glow dot */}
            <div style={{ position:'absolute', bottom:'36%', right:'14%', width:'42px', height:'42px', borderRadius:'50%', background:'radial-gradient(circle,#FB923C 0%,#EA580C 100%)', animation:'ar-glow 2.8s ease-in-out infinite' }} />

            {/* Tagline */}
            <div style={{ position:'relative', zIndex:2 }}>
              <p style={{ margin:'0 0 10px', fontSize:'12px', color:'rgba(167,139,250,.85)', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' }}>✦ Begin Your Cosmic Journey</p>
              <h2 style={{ margin:0, fontSize:'26px', fontWeight:900, color:'#fff', lineHeight:1.2, textShadow:'0 2px 18px rgba(167,139,250,.4)' }}>
                SIGN IN TO YOUR<br /><span style={{ color:'#A78BFA' }}>ADVENTURE!</span>
              </h2>
              <p style={{ margin:'10px 0 0', fontSize:'12.5px', color:'rgba(255,255,255,.45)', lineHeight:1.55 }}>
                Unlock your Vedic birth chart,<br />Kundli matching &amp; cosmic insights.
              </p>
            </div>
          </div>

          {/* ══ RIGHT — Form ══ */}
          <div style={{
            flex:1, background:'linear-gradient(180deg,#130c2e 0%,#0c0b1e 100%)',
            display:'flex', flexDirection:'column', justifyContent:'center',
            padding:'40px 36px', position:'relative', boxSizing:'border-box',
            animation: visible ? 'ar-right .5s .15s ease both' : 'none',
          }} className="auth-right-form">
            <button className="ar-close-btn" onClick={onClose} style={{ position:'absolute', top:'16px', right:'16px' }}>
              <X size={15} />
            </button>

            {step === 'form' ? (
              <>
                <h1 style={{ margin:'0 0 6px', fontSize:'34px', fontWeight:900, color:'#fff', letterSpacing:'.03em' }}>SIGN IN</h1>
                <p style={{ margin:'0 0 26px', fontSize:'13px', color:'rgba(255,255,255,.45)' }}>Sign in with email address</p>

                {/* Error message */}
                {errorMsg && (
                  <div style={{ display:'flex', alignItems:'flex-start', gap:'8px', padding:'10px 14px', background:'rgba(239,68,68,.12)', border:'1px solid rgba(239,68,68,.28)', borderRadius:'10px', color:'#FCA5A5', fontSize:'12.5px', marginBottom:'14px' }}>
                    <AlertCircle size={15} style={{ flexShrink:0, marginTop:'1px' }} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Email form */}
                <form onSubmit={handleSignUp} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                  <div style={{ position:'relative' }}>
                    <div style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'#A78BFA', display:'flex', alignItems:'center', pointerEvents:'none' }}>
                      <Mail size={16} />
                    </div>
                    <input
                      className="ar-email-input"
                      type="email"
                      placeholder="Yourname@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="ar-signup-btn">
                    {isSubmitting
                      ? <><Loader2 size={17} className="animate-spin" /><span>Sending sign-in link...</span></>
                      : <span>Sign up</span>}
                  </button>
                </form>

                {/* Divider */}
                <div style={{ position:'relative', textAlign:'center', margin:'20px 0' }}>
                  <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'1px', background:'rgba(255,255,255,.09)' }} />
                  <span style={{ position:'relative', background:'linear-gradient(180deg,#130c2e,#0c0b1e)', padding:'0 14px', fontSize:'11.5px', color:'rgba(255,255,255,.35)', letterSpacing:'.08em' }}>Or continue with</span>
                </div>

                {/* Social buttons */}
                <div style={{ display:'flex', gap:'10px', marginBottom:'20px' }}>
                  <button className="ar-social-btn" type="button" onClick={handleGoogle} disabled={isSubmitting}>
                    <svg width="17" height="17" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Google</span>
                  </button>
                  <button className="ar-social-btn" type="button" onClick={handleFacebook} disabled={isSubmitting}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>

                <p style={{ margin:0, fontSize:'11.5px', color:'rgba(255,255,255,.28)', lineHeight:1.55 }}>
                  By registering you with our{' '}
                  <span style={{ color:'#A78BFA', cursor:'pointer', textDecoration:'underline' }}>Terms and Conditions</span>
                </p>
              </>
            ) : (
              /* ── Email link sent confirmation screen ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'20px' }}>
                <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'linear-gradient(135deg,#7C3AED,#5B21B6)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 32px rgba(124,58,237,.5)' }}>
                  <CheckCircle2 size={36} color="#fff" />
                </div>
                <div>
                  <h2 style={{ margin:'0 0 8px', fontSize:'22px', fontWeight:800, color:'#fff' }}>Check Your Email!</h2>
                  <p style={{ margin:0, fontSize:'13.5px', color:'rgba(255,255,255,.55)', lineHeight:1.65 }}>
                    We&apos;ve sent a secure sign-in link to:<br />
                    <strong style={{ color:'#A78BFA', fontSize:'15px' }}>{email}</strong>
                  </p>
                </div>
                <div style={{ padding:'16px 20px', background:'rgba(167,139,250,.08)', border:'1px solid rgba(167,139,250,.2)', borderRadius:'14px', textAlign:'left', width:'100%' }}>
                  <p style={{ margin:0, fontSize:'13px', color:'rgba(255,255,255,.6)', lineHeight:1.7 }}>
                    📧 Open the email from <strong style={{ color:'#fff' }}>AstroRashi</strong><br />
                    🔗 Click the <strong style={{ color:'#A78BFA' }}>Sign In</strong> button/link<br />
                    ✨ You&apos;ll be signed in automatically<br />
                    ⏱️ Link expires in <strong style={{ color:'#FACC15' }}>15 minutes</strong>
                  </p>
                </div>
                <p style={{ margin:0, fontSize:'12px', color:'rgba(255,255,255,.35)' }}>
                  Didn&apos;t receive it? Check your spam folder or{' '}
                  <button
                    onClick={() => { setStep('form'); setErrorMsg(null); }}
                    style={{ background:'none', border:'none', color:'#A78BFA', fontSize:'12px', cursor:'pointer', textDecoration:'underline', padding:0 }}>
                    try again
                  </button>
                </p>
                <button
                  onClick={() => { setStep('form'); setErrorMsg(null); }}
                  style={{ display:'flex', alignItems:'center', gap:'6px', background:'none', border:'1px solid rgba(255,255,255,.12)', borderRadius:'10px', color:'rgba(255,255,255,.5)', fontSize:'12px', padding:'8px 16px', cursor:'pointer' }}>
                  <ArrowLeft size={13} /><span>Use a different email</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
