'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useSubscription } from '@/lib/state/subscription-context';
import { useAuth } from '@/lib/state/auth-context';
import { useAstrology } from '@/lib/state/astrology-context';
import {
  Sparkles,
  Heart,
  Briefcase,
  Clock,
  ShieldCheck,
  Crown,
  Calendar,
  CheckCircle2,
  Star,
  Globe,
  Award,
  User,
  Phone,
  Check,
  X,
  Lock,
  MessageSquare,
} from 'lucide-react';
import { FullExpertChatScreen } from './FullExpertChatScreen';

export interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  birthTime: string;
  gender: string;
}

export interface ExpertAstrologer {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  languages: string[];
  rating: number;
  consultationsCount: number;
  specialties: string[];
  iconType: 'shastri' | 'sundaram' | 'joshi' | 'devendra';
  pricingPerSession: number;
  freeWithPlan: boolean;
  availableTimings: string;
  availableStartHour: number; // 24-hr format
  availableEndHour: number; // 24-hr format
  bio: string;
}

export const EXPERT_ASTROLOGERS: ExpertAstrologer[] = [
  {
    id: 'exp-radhakant',
    name: 'Pt. Radhakant Shastri',
    title: 'Senior Jyotishacharya & Vedic Faculty',
    experienceYears: 28,
    languages: ['Hindi', 'English', 'Sanskrit'],
    rating: 4.98,
    consultationsCount: 14200,
    specialties: ['Janam Kundli Synthesis', 'Raj Yoga Analysis', 'Pitra Dosha Remedies'],
    iconType: 'shastri',
    pricingPerSession: 289,
    freeWithPlan: true,
    availableTimings: '9:00 AM to 8:00 PM (Daily)',
    availableStartHour: 9,
    availableEndHour: 20,
    bio: 'Gold Medalist from Sampurnanand Sanskrit Vishwavidyalaya, Varanasi. Renowned across India for accurate Dasha timing and sacred Vedic remedies.',
  },
  {
    id: 'exp-meenakshi',
    name: 'Dr. Meenakshi Sundaram',
    title: 'KP & Ashtakoot Marriage Specialist',
    experienceYears: 19,
    languages: ['English', 'Tamil', 'Hindi'],
    rating: 4.95,
    consultationsCount: 9800,
    specialties: ['Love Compatibility', 'Mangal Dosha Cancellation', 'Divorce Prevention'],
    iconType: 'sundaram',
    pricingPerSession: 199,
    freeWithPlan: true,
    availableTimings: '11:00 AM to 6:00 PM (Daily)',
    availableStartHour: 11,
    availableEndHour: 18,
    bio: 'Pioneered Krishnamurti Paddhati (KP) sub-lord algorithms for precise marriage timing and career transition periods.',
  },
  {
    id: 'exp-somnath',
    name: 'Acharya Somnath Joshi',
    title: 'Financial & Business Astrologer',
    experienceYears: 22,
    languages: ['Hindi', 'Gujarati', 'English'],
    rating: 4.92,
    consultationsCount: 11300,
    specialties: ['Dhana Yogas', 'Business Incorporation Muhurat', 'Stock & Wealth Timing'],
    iconType: 'joshi',
    pricingPerSession: 399,
    freeWithPlan: true,
    availableTimings: '10:00 AM to 8:00 PM (Daily)',
    availableStartHour: 10,
    availableEndHour: 20,
    bio: 'Consultant to top corporate enterprises and high-net-worth investors across Mumbai and Ahmedabad on planetary wealth alignment.',
  },
  {
    id: 'exp-devendra',
    name: 'Guru Devendra Nath',
    title: 'Karmic & Sade Sati Shanti Master',
    experienceYears: 31,
    languages: ['Hindi', 'Bengali', 'English'],
    rating: 4.97,
    consultationsCount: 16500,
    specialties: ['Saturn Transit Shanti', 'Kaal Sarp Dosha', 'Rudraksha & Gemstone Prescription'],
    iconType: 'devendra',
    pricingPerSession: 499,
    freeWithPlan: true,
    availableTimings: '1:00 PM to 9:00 PM (Daily)',
    availableStartHour: 13,
    availableEndHour: 21,
    bio: 'Specialist in resolving stubborn planetary afflictions through Vedic yantras, gemstone calibrations, and customized mantra sadhanas.',
  },
];

interface ConsultantScreenProps {
  onTabChange?: (tab: any) => void;
  onAskAI?: (prompt: string) => void;
}

export const ConsultantScreen: React.FC<ConsultantScreenProps> = ({ onTabChange, onAskAI }) => {
  const { openUpgradeModal } = useSubscription();
  const { user } = useAuth();
  const { natalChart, activeProfile } = useAstrology();

  // Booking Modal State
  const [bookingExpert, setBookingExpert] = useState<ExpertAstrologer | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState(activeProfile.name || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState(activeProfile.birthDate || '1996-09-12');
  const [birthTime, setBirthTime] = useState(activeProfile.birthTime || '14:30');
  const [gender, setGender] = useState(activeProfile.gender || 'Male');
  const [formError, setFormError] = useState<string | null>(null);

  // Active Full-Sized Expert Chat Screen (Only visible once booked/paid)
  const [activeFullChatExpert, setActiveFullChatExpert] = useState<ExpertAstrologer | null>(null);
  const [activeBookingData, setActiveBookingData] = useState<BookingFormData | null>(null);

  // Persistent record of booked/paid sessions per expert
  const [bookedSessions, setBookedSessions] = useState<Record<string, BookingFormData>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('astronex_booked_expert_sessions');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  const sun = natalChart.planets.find((p) => p.name === 'Sun');
  const moon = natalChart.planets.find((p) => p.name === 'Moon');
  const asc = natalChart.ascendant;

  // Open booking modal
  const handleOpenBookingModal = (expert: ExpertAstrologer) => {
    setBookingExpert(expert);
    setFullName(activeProfile.name || '');
    setBirthDate(activeProfile.birthDate || '1996-09-12');
    setBirthTime(activeProfile.birthTime || '14:30');
    setGender(activeProfile.gender || 'Male');
    setFormError(null);
  };

  // Submit booking & directly transition into the full-sized expert chat interface
  const handleConfirmAndStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!birthDate) {
      setFormError('Please select your date of birth');
      return;
    }
    if (!birthTime) {
      setFormError('Please select your birth time');
      return;
    }

    const data: BookingFormData = {
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      birthDate,
      birthTime,
      gender,
    };

    const targetExpert = bookingExpert;
    if (!targetExpert) return;

    // Save booked session
    const updated = { ...bookedSessions, [targetExpert.id]: data };
    setBookedSessions(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('astronex_booked_expert_sessions', JSON.stringify(updated));
    }

    setBookingExpert(null);
    setActiveBookingData(data);
    setActiveFullChatExpert(targetExpert);
  };

  // Resume active chat if already booked
  const handleResumeBookedChat = (expert: ExpertAstrologer) => {
    const existingData = bookedSessions[expert.id] || {
      fullName: activeProfile.name || 'Seeker',
      phoneNumber: '',
      birthDate: activeProfile.birthDate || '1996-09-12',
      birthTime: activeProfile.birthTime || '14:30',
      gender: activeProfile.gender || 'Male',
    };
    setActiveBookingData(existingData);
    setActiveFullChatExpert(expert);
  };

  const renderExpertIcon = (iconType: string) => {
    switch (iconType) {
      case 'shastri':
        return <Award size={30} color="#11A8EB" />;
      case 'sundaram':
        return <Heart size={30} color="#EC4899" />;
      case 'joshi':
        return <Briefcase size={30} color="#FBBF24" />;
      case 'devendra':
      default:
        return <Sparkles size={30} color="#8B5CF6" />;
    }
  };

  // If a full-sized expert consultation is active, display the full-sized chat interface UI
  if (activeFullChatExpert && activeBookingData) {
    const handleEndChatSession = () => {
      // Remove booked session so chat ends completely
      const updated = { ...bookedSessions };
      delete updated[activeFullChatExpert.id];
      setBookedSessions(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('astronex_booked_expert_sessions', JSON.stringify(updated));
        localStorage.removeItem(`astronex_expert_timer_${activeFullChatExpert.id}_${activeBookingData.fullName}`);
        localStorage.removeItem(`astronex_expert_fullchat_${activeFullChatExpert.id}_${activeBookingData.fullName}`);
      }
      setActiveFullChatExpert(null);
      setActiveBookingData(null);
    };

    return (
      <FullExpertChatScreen
        expert={activeFullChatExpert}
        bookingData={activeBookingData}
        onBack={() => {
          // Returning to All Experts ends the chat session per request
          handleEndChatSession();
        }}
        onEndChat={handleEndChatSession}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '90px' }}>
      {/* 1. Header & Specialist Disclosure */}
      <div
        style={{
          background: '#101722',
          border: '1px solid #41454D',
          borderRadius: '20px',
          padding: '28px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#101722',
                  border: '1px solid #41454D',
                  color: '#FFFFFF',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: '6px',
                }}
              >
                AstroRashi Certified Faculty
              </span>
              <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>
                100% Verified Vedic Scholars
              </span>
            </div>
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: '0 0 6px',
              }}
            >
              Expert Astrologers
            </h1>
            <p style={{ fontSize: '13.5px', color: '#94A3B8', maxWidth: '640px', lineHeight: 1.5, margin: 0 }}>
              Book dedicated 1-on-1 consultations with recognized Vedic scholars and specialists. The full-sized interactive consultation chat interface unlocks exclusively upon booking or for VIP members.
            </p>
          </div>

          {/* User Chart Context */}
          <div
            style={{
              padding: '12px 18px',
              borderRadius: '14px',
              backgroundColor: '#101722',
              border: '1px solid #41454D',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Chart Context
            </div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
              {activeProfile.name}
            </div>
            <div style={{ fontSize: '12px', color: '#11A8EB', fontWeight: 700 }}>
              ☉ {sun?.sign} • ☽ {moon?.sign} • AC {asc.sign}
            </div>
          </div>
        </div>

        {/* Pricing / VIP Notice */}
        <div
          style={{
            marginTop: '20px',
            padding: '12px 18px',
            borderRadius: '12px',
            backgroundColor: user.isPremium ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
            border: user.isPremium ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid #41454D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user.isPremium ? <Crown size={18} color="#10B981" /> : <Lock size={16} color="#11A8EB" />}
            <span style={{ fontSize: '13px', color: '#E2E8F0', fontWeight: 650 }}>
              {user.isPremium
                ? 'VIP Member Active: All 1-on-1 expert consultation chat interfaces are 100% unlocked and free.'
                : 'Free Account: Expert consultation chat is locked and unlocks upon booking your 15-minute dedicated session. VIP members access all experts freely.'}
            </span>
          </div>
          {!user.isPremium && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openUpgradeModal('Free Consultations with Expert Astrologers')}
              style={{ color: '#FFFFFF', borderColor: '#11A8EB' }}
            >
              Get Free VIP Access
            </Button>
          )}
        </div>
      </div>

      {/* 2. Expert Astrologers Directory Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
        {EXPERT_ASTROLOGERS.map((expert) => {
          const hasBooked = !!bookedSessions[expert.id];
          const isUnlocked = user.isPremium || hasBooked;

          // Check real-time daily availability based on current IST hour
          const nowIST = new Date();
          const currentHour = nowIST.getHours();
          const isCurrentlyActive = currentHour >= expert.availableStartHour && currentHour < expert.availableEndHour;

          return (
            <Card
              key={expert.id}
              variant="elevated"
              interactive
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: isCurrentlyActive ? '1px solid #41454D' : '1px solid rgba(239, 68, 68, 0.25)',
                backgroundColor: '#25282E',
                borderRadius: '18px',
                minHeight: '380px',
                boxShadow: 'none',
                opacity: isCurrentlyActive ? 1 : 0.85,
              }}
            >
              <div>
                {/* Header: Icon Only (Non-neon, clean styling), Name, Verified Badge */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      backgroundColor: '#101722',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {renderExpertIcon(expert.iconType)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#CBD5E1',
                          fontWeight: 700,
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <ShieldCheck size={11} color="#10B981" />
                        Verified
                      </span>
                      <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Star size={11} fill="#10B981" color="#10B981" />
                        {expert.rating}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 2px' }}>
                      {expert.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 550 }}>
                      {expert.title}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: 1.5, margin: '0 0 14px' }}>
                  {expert.bio}
                </p>

                {/* Badges: Experience, Languages, Consults */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', backgroundColor: '#101722', color: '#CBD5E1', padding: '3px 8px', borderRadius: '6px', fontWeight: 550 }}>
                    ⏳ {expert.experienceYears}+ Years Exp
                  </span>
                  <span style={{ fontSize: '11px', backgroundColor: '#101722', color: '#CBD5E1', padding: '3px 8px', borderRadius: '6px', fontWeight: 550 }}>
                    🗣 {expert.languages.join(', ')}
                  </span>
                  <span style={{ fontSize: '11px', backgroundColor: '#101722', color: '#CBD5E1', padding: '3px 8px', borderRadius: '6px', fontWeight: 550 }}>
                    👥 {expert.consultationsCount.toLocaleString()}+ Consults
                  </span>
                </div>

                {/* Specialties */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    Areas of Expertise
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {expert.specialties.map((spec) => (
                      <span
                        key={spec}
                        style={{
                          fontSize: '11px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid #41454D',
                          color: '#CBD5E1',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontWeight: 500,
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Fee & Book 1-on-1 Consultation */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Consultation Fee</span>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF' }}>
                      {user.isPremium ? (
                        <span style={{ color: '#10B981' }}>
                          FREE{' '}
                          <span style={{ fontSize: '12px', textDecoration: 'line-through', color: '#64748B', marginLeft: '4px' }}>
                            ₹{expert.pricingPerSession}
                          </span>
                        </span>
                      ) : (
                        <span>₹{expert.pricingPerSession}</span>
                      )}
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, marginLeft: '4px' }}>
                        / 15 min session
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Available Timings</div>
                    <span style={{ fontSize: '11.5px', color: isCurrentlyActive ? '#10B981' : '#F59E0B', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <Clock size={11} /> {expert.availableTimings}
                    </span>
                    <span style={{ fontSize: '10px', color: isCurrentlyActive ? '#34D399' : '#EF4444', fontWeight: 650, display: 'block', marginTop: '2px' }}>
                      {isCurrentlyActive ? '● Available for Consultation Now' : '○ Currently Offline (Chat Locked)'}
                    </span>
                  </div>
                </div>

                {/* Primary Action Button */}
                {!isCurrentlyActive ? (
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    disabled
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                    icon={<Lock size={14} />}
                  >
                    Chat Locked (Available {expert.availableTimings})
                  </Button>
                ) : hasBooked ? (
                  <Button
                    variant="orange"
                    size="md"
                    fullWidth
                    onClick={() => handleResumeBookedChat(expert)}
                    icon={<MessageSquare size={15} />}
                  >
                    Open Active Consultation
                  </Button>
                ) : (
                  <Button
                    variant="orange"
                    size="md"
                    fullWidth
                    onClick={() => handleOpenBookingModal(expert)}
                    icon={!isUnlocked ? <Lock size={14} /> : <Calendar size={14} />}
                  >
                    {!isUnlocked ? `Unlock & Book (₹${expert.pricingPerSession})` : 'Book 1-on-1 Consultation'}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* =========================================================================
          3. BOOKING 1-ON-1 CONSULTATION MODAL (Name, Mobile, DOB, Gender, Time)
         ========================================================================= */}
      {bookingExpert && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(5, 6, 10, 0.82)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setBookingExpert(null);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '500px',
              backgroundColor: '#101722',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '26px',
              color: '#FFFFFF',
              boxShadow: 'none',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {renderExpertIcon(bookingExpert.iconType)}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                    Book Consultation
                  </h3>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                    with {bookingExpert.name}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBookingExpert(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Session Fee Summary */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Consultation Window</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                  15 Minutes Full-Sized 1-on-1 Chat
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Fee</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: user.isPremium ? '#10B981' : '#FFFFFF' }}>
                  {user.isPremium ? 'FREE (VIP)' : `₹${bookingExpert.pricingPerSession}`}
                </div>
              </div>
            </div>

            {formError && (
              <div
                style={{
                  marginBottom: '14px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#FCA5A5',
                  fontSize: '12px',
                }}
              >
                {formError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleConfirmAndStartChat} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 650, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  style={{
                    width: '100%',
                    backgroundColor: '#101722',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 650, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  style={{
                    width: '100%',
                    backgroundColor: '#101722',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 650, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: '#101722',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 650, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                    Time of Birth *
                  </label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: '#101722',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 650, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#1E212D',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => setBookingExpert(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="orange"
                  size="md"
                  fullWidth
                  icon={<Sparkles size={16} />}
                >
                  {user.isPremium ? 'Start Consultation (Free)' : `Confirm & Pay ₹${bookingExpert.pricingPerSession}`}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
