'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AstrologySystem, BirthProfile, HouseSystem, PlanTier, UserProfile, ZodiacSystem } from '@/types';
import { db, DBUserAccount } from '@/lib/db/database';
import { INITIAL_USER } from '@/lib/mock/seed-data';

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  updateUserBirthDetails: (details: Partial<BirthProfile>) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  updatePlan: (tier: PlanTier) => void;
  setAstrologySettings: (
    system: AstrologySystem,
    zodiac: ZodiacSystem,
    houseSystem: HouseSystem
  ) => void;
  togglePremium: (tier?: 'monthly' | 'yearly') => void;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  socialLogin: (provider: 'google' | 'apple', customData?: any) => { success: boolean };
  register: (details: {
    email: string;
    password: string;
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    latitude?: number;
    longitude?: number;
    astrologySystem?: AstrologySystem;
  }) => { success: boolean; error?: string };
  logout: () => void;
  resetDemoData: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function convertDBAccountToUserProfile(u: DBUserAccount): UserProfile {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    birthDate: u.birthDate,
    birthTime: u.birthTime,
    birthPlace: u.birthPlace,
    latitude: u.latitude ?? 28.6139,
    longitude: u.longitude ?? 77.209,
    timezone: u.timezone ?? 'Asia/Kolkata',
    astrologySystem: u.astrologySystem ?? 'vedic',
    houseSystem: u.houseSystem ?? 'whole-sign',
    zodiacSystem: u.zodiacSystem ?? 'sidereal',
    preferredLanguage: 'en',
    planTier: u.planTier ?? 'free',
    isPremium: u.isPremium ?? false,
    avatarUrl: u.avatarUrl,
    createdAt: u.createdAt || new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Initialize from persistent database
  useEffect(() => {
    try {
      const session = db.getActiveSession();
      if (session) {
        setUser(convertDBAccountToUserProfile(session));
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Error loading session from db:', e);
    }
  }, []);

  const saveUser = (updated: UserProfile) => {
    setUser(updated);
    db.updateUser(updated.id, {
      name: updated.name,
      email: updated.email,
      birthDate: updated.birthDate,
      birthTime: updated.birthTime,
      birthPlace: updated.birthPlace,
      latitude: updated.latitude,
      longitude: updated.longitude,
      timezone: updated.timezone,
      astrologySystem: updated.astrologySystem,
      houseSystem: updated.houseSystem,
      zodiacSystem: updated.zodiacSystem,
      planTier: updated.planTier,
      isPremium: updated.isPremium,
      avatarUrl: updated.avatarUrl,
    });
  };

  const updateUserBirthDetails = (details: Partial<BirthProfile>) => {
    const updated: UserProfile = {
      ...user,
      ...details,
    };
    saveUser(updated);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    const updated: UserProfile = {
      ...user,
      ...updates,
    };
    saveUser(updated);
  };

  const updatePlan = (tier: PlanTier) => {
    const updated: UserProfile = {
      ...user,
      planTier: tier,
      isPremium: tier !== 'free',
    };
    saveUser(updated);
  };

  const setAstrologySettings = (
    astrologySystem: AstrologySystem,
    zodiacSystem: ZodiacSystem,
    houseSystem: HouseSystem
  ) => {
    const updated: UserProfile = {
      ...user,
      astrologySystem,
      zodiacSystem,
      houseSystem,
    };
    saveUser(updated);
  };

  const togglePremium = (tier: 'monthly' | 'yearly' = 'yearly') => {
    const updated: UserProfile = {
      ...user,
      isPremium: !user.isPremium,
      planTier: !user.isPremium ? 'basic' : 'free',
    };
    saveUser(updated);
  };

  const login = (email: string, password?: string) => {
    const res = db.loginUser(email, password);
    if (res.success && res.user) {
      setUser(convertDBAccountToUserProfile(res.user));
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: res.error || 'Authentication failed' };
  };

  const socialLogin = (provider: 'google' | 'apple', customData?: any) => {
    const res = db.socialLogin(provider, customData);
    if (res.success && res.user) {
      setUser(convertDBAccountToUserProfile(res.user));
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false };
  };

  const register = (details: {
    email: string;
    password: string;
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    latitude?: number;
    longitude?: number;
    astrologySystem?: AstrologySystem;
  }) => {
    const res = db.registerUser(details);
    if (res.success && res.user) {
      setUser(convertDBAccountToUserProfile(res.user));
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: res.error || 'Registration failed' };
  };

  const logout = () => {
    db.clearSession();
    setIsAuthenticated(false);
  };

  const resetDemoData = () => {
    db.clearSession();
    setUser(INITIAL_USER);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        updateUserBirthDetails,
        updateUserProfile,
        updatePlan,
        setAstrologySettings,
        togglePremium,
        login,
        socialLogin,
        register,
        logout,
        resetDemoData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
