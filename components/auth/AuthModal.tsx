'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LocationPicker } from '@/components/tools/LocationPicker';
import { CityLocation } from '@/lib/astrology-engine/location-service';
import { useAuth } from '@/lib/state/auth-context';
import { AstrologySystem } from '@/types';
import { Sparkles, Calendar, Clock, MapPin, User, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'register',
}) => {
  const { user, login, register, socialLogin } = useAuth();
  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (mode === 'signin') {
      const res = login(email, password);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    } else {
      const res = register({
        name,
        email,
        password: password || 'default_pass',
        birthDate,
        birthTime,
        birthPlace: `${selectedLocation.name}, ${selectedLocation.state ? `${selectedLocation.state}, ` : ''}${selectedLocation.country}`,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        astrologySystem: system,
      });

      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.error || 'Failed to create account');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'register' ? 'Set Up Your Cosmic Profile' : 'Welcome to AstroNex'}
      maxWidth="500px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Toggle Mode */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              background: mode === 'register' ? 'linear-gradient(135deg, #FF6A00 0%, #FF8533 100%)' : 'transparent',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg(null);
            }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              background: mode === 'signin' ? 'linear-gradient(135deg, #FF6A00 0%, #FF8533 100%)' : 'transparent',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Sign In
          </button>
        </div>

        {errorMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#F87171',
              fontSize: '12.5px',
            }}
          >
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </div>
        )}

        {mode === 'register' && (
          <Input
            label="Your Full Name"
            placeholder="e.g. Arya Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User size={16} />}
            required
          />
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={16} />}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={16} />}
          required
        />

        {mode === 'register' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input
                label="Date of Birth"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                icon={<Calendar size={16} />}
                required
              />
              <Input
                label="Exact Time of Birth"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                icon={<Clock size={16} />}
                required
              />
            </div>

            <div>
              <LocationPicker
                label="Birthplace (Google Registered Location)"
                selectedCity={selectedLocation}
                onSelect={(city) => setSelectedLocation(city)}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                Preferred Astrology Tradition
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSystem('vedic')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    border:
                      system === 'vedic'
                        ? '1.5px solid var(--gold-primary)'
                        : '1px solid var(--border-subtle)',
                    background:
                      system === 'vedic'
                        ? 'rgba(250, 204, 21, 0.16)'
                        : 'rgba(255, 255, 255, 0.04)',
                    color: system === 'vedic' ? '#FACC15' : 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Vedic (Sidereal Lahiri)
                </button>
                <button
                  type="button"
                  onClick={() => setSystem('western')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    border:
                      system === 'western'
                        ? '1.5px solid #38BDF8'
                        : '1px solid var(--border-subtle)',
                    background:
                      system === 'western'
                        ? 'rgba(37, 99, 235, 0.16)'
                        : 'rgba(255, 255, 255, 0.04)',
                    color: system === 'western' ? '#38BDF8' : 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Western (Tropical)
                </button>
              </div>
            </div>
          </>
        )}

        <Button type="submit" variant="primary" size="lg" style={{ marginTop: '8px' }}>
          <Sparkles size={16} />
          <span>{mode === 'register' ? 'Create Cosmic Profile' : 'Access AstroNex'}</span>
        </Button>

        {/* Social Authentication */}
        <div style={{ position: 'relative', textAlign: 'center', margin: '8px 0 2px' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: 'var(--border-subtle)',
            }}
          />
          <span
            style={{
              position: 'relative',
              background: '#0E0E14',
              padding: '0 12px',
              fontSize: '11px',
              color: 'var(--text-muted)',
            }}
          >
            or continue with
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <Button
            type="button"
            variant="glass"
            onClick={() => {
              socialLogin('google', {
                name: name.trim() || 'Google Cosmic User',
                birthDate,
                birthTime,
                birthPlace: `${selectedLocation.name}, ${selectedLocation.country}`,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                astrologySystem: system,
              });
              onClose();
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </Button>
          <Button
            type="button"
            variant="glass"
            onClick={() => {
              socialLogin('apple', {
                name: name.trim() || 'Apple Cosmic User',
                birthDate,
                birthTime,
                birthPlace: `${selectedLocation.name}, ${selectedLocation.country}`,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                astrologySystem: system,
              });
              onClose();
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.13.65-2.79 1.43-.59.68-1.11 1.76-1 2.81 1.08.08 2.18-.59 2.78-1.37z" />
            </svg>
            <span>Apple</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};
