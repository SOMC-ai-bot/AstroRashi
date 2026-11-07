'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/lib/state/auth-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LanguageCode } from '@/types';
import { useSubscription } from '@/lib/state/subscription-context';
import { LocationPicker } from '@/components/tools/LocationPicker';
import { ProfilesManagerModal } from './ProfilesManagerModal';
import { SavedCalculationsModal } from './SavedCalculationsModal';
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Sparkles,
  RotateCcw,
  CheckCircle,
  CreditCard,
  Crown,
  Users,
  History,
  Camera,
  Upload,
  Check,
} from 'lucide-react';

interface ProfileScreenProps {
  onOpenPremium: () => void;
  onOpenManageSubscription?: () => void;
  onOpenAuth?: () => void;
}

const COSMIC_AVATARS = [
  { id: 'mystic', name: 'Mystic Sage', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' },
  { id: 'celestial', name: 'Celestial Empress', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' },
  { id: 'stargazer', name: 'Stargazer Explorer', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { id: 'solar', name: 'Solar Adept', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
  { id: 'lunar', name: 'Lunar Priestess', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { id: 'rishi', name: 'Vedic Scholar', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200' },
];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenPremium,
  onOpenManageSubscription,
  onOpenAuth,
}) => {
  const { user, updateUserBirthDetails, updateUserProfile, resetDemoData } = useAuth();
  const { currentPlan } = useSubscription();
  const { activeProfile, saveProfile } = useAstrology();
  const { language, setLanguage, t } = useI18n();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [gender, setGender] = useState(user.gender || 'Male');
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [birthTime, setBirthTime] = useState(user.birthTime);
  const [birthPlace, setBirthPlace] = useState(user.birthPlace);
  const [latitude, setLatitude] = useState(user.latitude || 28.6139);
  const [longitude, setLongitude] = useState(user.longitude || 77.209);
  const [timezone, setTimezone] = useState(user.timezone || 'Asia/Kolkata');

  // Keep local inputs synchronized if user profile updates externally
  React.useEffect(() => {
    if (user.name) setName(user.name);
    if (user.email) setEmail(user.email);
    if (user.phone) setPhone(user.phone);
    if (user.gender) setGender(user.gender);
    if (user.birthDate) setBirthDate(user.birthDate);
    if (user.birthTime) setBirthTime(user.birthTime);
    if (user.birthPlace) setBirthPlace(user.birthPlace);
    if (user.latitude !== undefined) setLatitude(user.latitude);
    if (user.longitude !== undefined) setLongitude(user.longitude);
    if (user.timezone) setTimezone(user.timezone);
  }, [user.name, user.email, user.phone, user.gender, user.birthDate, user.birthTime, user.birthPlace, user.latitude, user.longitude, user.timezone]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals state
  const [isProfilesModalOpen, setIsProfilesModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Please upload an image smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateUserProfile({ avatarUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectAvatar = (url: string) => {
    updateUserProfile({ avatarUrl: url });
    setShowAvatarPicker(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim() || user.name || 'User';
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const updatedData = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      gender,
      birthDate,
      birthTime,
      birthPlace,
      latitude,
      longitude,
      timezone,
    };
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('astronex_cached_active_user');
        const prev = cached ? JSON.parse(cached) : {};
        localStorage.setItem('astronex_cached_active_user', JSON.stringify({ ...prev, ...user, ...updatedData }));
      }
    } catch (err) {
      console.error(err);
    }
    // Update profile with all fields in a single consolidated atomic update
    updateUserProfile(updatedData);
    if (activeProfile) {
      saveProfile({
        ...activeProfile,
        name: cleanName,
        birthDate,
        birthTime,
        birthPlace,
        latitude,
        longitude,
        timezone,
        gender,
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2400);
  };

  const languagesList: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'hinglish', label: 'Hinglish (Roman Hindi)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
    { code: 'as', label: 'অসমীয়া (Assamese)' },
    { code: 'ur', label: 'اردو (Urdu)' },
    { code: 'ar', label: 'العربية (Arabic)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '90px' }}>
      {/* Profiles and History Modals */}
      <ProfilesManagerModal
        isOpen={isProfilesModalOpen}
        onClose={() => setIsProfilesModalOpen(false)}
      />

      <SavedCalculationsModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />

      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* 1. Profile Header & Photo Customization */}
      <Card variant="gradient" style={{ padding: '28px', borderRadius: '24px', border: '1.5px solid rgba(249, 115, 22, 0.35)', background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(17, 19, 26, 0.98) 100%)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {/* Avatar with Camera Overlay */}
          <div style={{ position: 'relative', width: '84px', height: '84px', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={user.name}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--gold-primary)',
                boxShadow: '0 4px 16px rgba(255, 106, 0, 0.35)',
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload new profile picture"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--theme-orange-primary)',
                border: '2px solid #0D0E15',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              <Camera size={14} />
            </button>
          </div>

          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {user.name}
              </h3>
              <Badge variant={user.isPremium ? 'gold' : 'surface'} size="sm">
                {currentPlan.name} Plan
              </Badge>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
              {user.email} • {currentPlan.monthlyPrice === 0 ? 'Standard Access' : `₹${currentPlan.monthlyPrice}/mo (All Specialists Unlocked)`}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                }}
              >
                <Upload size={13} />
                <span>Upload Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--gold-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                }}
              >
                <Sparkles size={13} />
                <span>Cosmic Avatars</span>
              </button>

              <button
                type="button"
                onClick={onOpenPremium}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--theme-orange-light)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 4px',
                }}
              >
                <span>{user.isPremium ? 'Change Subscription Plan' : 'Upgrade to Premium (₹89/mo)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Avatar Preset Customization Drawer */}
        {showAvatarPicker && (
          <div
            style={{
              marginTop: '18px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 600 }}>
              Choose a Cosmic Persona:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px' }}>
              {COSMIC_AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => handleSelectAvatar(av.url)}
                  style={{
                    background: user.avatarUrl === av.url ? 'rgba(255, 106, 0, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: user.avatarUrl === av.url ? '2px solid var(--theme-orange-primary)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={av.url}
                    alt={av.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '11px', color: '#FFFFFF', textAlign: 'center', fontWeight: 500 }}>
                    {av.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* 3. Edit Birth Details Form */}
      <Card variant="elevated" style={{ padding: '28px', borderRadius: '24px', border: '1.5px solid rgba(255, 255, 255, 0.08)', background: '#12141A', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {t.profile.birthDetails}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Birth data recalculates planetary degrees, ascendant, and houses automatically.
            </p>
          </div>

          {savedSuccess && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34C759', fontSize: '12px' }}>
              <CheckCircle size={14} />
              <span>Saved!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Row 1: Name, Email & Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arya Sharma"
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. arya@example.com"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
            />
          </div>

          {/* Row 2: Date of Birth, Time of Birth, and Gender */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <Input
              label="Date of Birth"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              icon={<Calendar size={16} />}
              required
            />
            <Input
              label="Time of Birth"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              icon={<Clock size={16} />}
              required
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  backgroundColor: '#1E1F26',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other / Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Row 3: Place of Birth with Map/Search Picker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Place of Birth (Search City or Auto-Detect GPS)
            </label>
            <LocationPicker
              value={birthPlace}
              onSelect={(city) => {
                const formatted = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
                setBirthPlace(formatted);
                setLatitude(city.latitude);
                setLongitude(city.longitude);
                setTimezone(city.timezone);
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--gold-primary)' }}>● Verified Coordinates:</span>
              <span>{latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E</span>
              <span>• Timezone: {timezone}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Button type="submit" variant="orange" style={{ padding: '12px 28px', fontWeight: 800 }}>
              Save Personal & Birth Details
            </Button>
          </div>
        </form>
      </Card>



      {/* 5. Language Selection */}
      <Card variant="elevated" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Globe size={18} color="var(--gold-primary)" />
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Application Language (15 Languages)
          </h3>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          The cosmic intelligence and application interface respond in your chosen language.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
          {languagesList.map((item) => (
            <button
              key={item.code}
              onClick={() => setLanguage(item.code)}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: language === item.code ? '1.5px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                background: language === item.code ? 'rgba(194, 78, 120, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: language === item.code ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '12.5px',
                fontWeight: language === item.code ? 600 : 400,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 160ms ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      {/* 6. Demo Data Reset */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            if (confirm('Reset all demo data and restore initial mock profile?')) {
              resetDemoData();
              window.location.reload();
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '13px',
            cursor: 'pointer',
            padding: '8px 16px',
          }}
        >
          <RotateCcw size={14} />
          <span>Reset Sample Demo Data</span>
        </button>
      </div>
    </div>
  );
};
