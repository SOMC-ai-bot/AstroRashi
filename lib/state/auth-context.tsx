'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AstrologySystem, BirthProfile, HouseSystem, PlanTier, UserProfile, ZodiacSystem } from '@/types';
import { db, DBUserAccount } from '@/lib/db/database';
import { INITIAL_USER } from '@/lib/mock/seed-data';
import {
  firebaseSignInWithGoogle,
  firebaseSignOut,
  subscribeToFirebaseAuthState,
  formatFirebaseAuthError,
} from '@/lib/firebase/auth-service';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  ActionCodeSettings,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { saveUserProfileToFirestore, getUserProfileFromFirestore } from '@/lib/firebase/firestore-service';

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
  socialLogin: (provider: 'google' | 'apple', customData?: any) => Promise<{ success: boolean; error?: string }>;
  sendEmailSignInLink: (email: string) => Promise<{ success: boolean; error?: string }>;
  completeEmailSignIn: (email: string, link: string) => Promise<{ success: boolean; error?: string }>;
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
  demoLogin: () => void;
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
    phone: u.phone || '',
    gender: u.gender || 'Prefer not to say',
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
      if (typeof window !== 'undefined') {
        const cachedRaw = localStorage.getItem('astronex_cached_active_user');
        if (cachedRaw) {
          const parsed = JSON.parse(cachedRaw);
          if (parsed && parsed.email) {
            setUser(parsed);
            setIsAuthenticated(true);
          }
        }
      }
      const session = db.getActiveSession();
      if (session) {
        const converted = convertDBAccountToUserProfile(session);
        setUser((prev) => ({
          ...converted,
          // Preserve any cached phone/email if session had fallback empty string
          phone: converted.phone || prev.phone || '',
          email: converted.email || prev.email || '',
        }));
        setIsAuthenticated(true);
      } else {
        const users = db.getUsers();
        if (users && users.length > 0) {
          db.setActiveSession(users[0]);
          setUser(convertDBAccountToUserProfile(users[0]));
        }
      }
    } catch (e) {
      console.error('Error loading session from db:', e);
    }
  }, []);

  // Complete email magic link sign-in if page loads with a sign-in link
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const savedEmail = window.localStorage.getItem('astrorashi_email_signin');
      if (savedEmail) {
        signInWithEmailLink(auth, savedEmail, window.location.href)
          .then(async (result) => {
            const fbUser = result.user;
            window.localStorage.removeItem('astrorashi_email_signin');
            // clean URL
            window.history.replaceState({}, document.title, window.location.pathname);

            let cloudProfile = await getUserProfileFromFirestore(fbUser.uid).catch(() => null);
            if (!cloudProfile) {
              const newProfile: UserProfile = {
                id: fbUser.uid,
                name: fbUser.displayName || savedEmail.split('@')[0],
                email: fbUser.email || savedEmail,
                phone: '',
                birthDate: '1996-09-12',
                birthTime: '14:30',
                birthPlace: 'India',
                latitude: 20.5937,
                longitude: 78.9629,
                timezone: 'Asia/Kolkata',
                astrologySystem: 'vedic',
                zodiacSystem: 'sidereal',
                houseSystem: 'whole-sign',
                preferredLanguage: 'en',
                planTier: 'free',
                isPremium: false,
                createdAt: new Date().toISOString(),
              };
              await saveUserProfileToFirestore(fbUser.uid, newProfile).catch(() => {});
              cloudProfile = newProfile;
            }

            const mapped: UserProfile = {
              id: fbUser.uid,
              name: fbUser.displayName || cloudProfile.name || savedEmail.split('@')[0],
              email: fbUser.email || savedEmail,
              phone: cloudProfile.phone || '',
              birthDate: cloudProfile.birthDate || '1996-09-12',
              birthTime: cloudProfile.birthTime || '14:30',
              birthPlace: cloudProfile.birthPlace || 'India',
              latitude: cloudProfile.latitude ?? 20.5937,
              longitude: cloudProfile.longitude ?? 78.9629,
              timezone: cloudProfile.timezone || 'Asia/Kolkata',
              astrologySystem: cloudProfile.astrologySystem || 'vedic',
              zodiacSystem: cloudProfile.zodiacSystem || 'sidereal',
              houseSystem: cloudProfile.houseSystem || 'whole-sign',
              preferredLanguage: 'en',
              planTier: cloudProfile.planTier || 'free',
              isPremium: cloudProfile.isPremium ?? false,
              avatarUrl: fbUser.photoURL || cloudProfile.avatarUrl,
              createdAt: cloudProfile.createdAt || new Date().toISOString(),
            };
            setUser(mapped);
            setIsAuthenticated(true);
          })
          .catch((err) => {
            console.error('Email sign-in link completion error:', err);
          });
      }
    }
  }, []);

  const saveUser = (updater: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setUser((prev) => {
      const updated = typeof updater === 'function' ? updater(prev) : updater;

      // 1. Immediately cache active user state to localStorage for instantaneous recovery
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('astronex_cached_active_user', JSON.stringify(updated));
        }
      } catch (e) {
        console.error('Error caching user:', e);
      }

      // 2. Persist to internal DB
      const updatedRecord = db.updateUser(updated.id, {
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        gender: updated.gender,
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
      if (updatedRecord) {
        db.setActiveSession(updatedRecord);
      }

      // 3. Asynchronously sync to Firestore if user ID exists
      if (updated.id) {
        saveUserProfileToFirestore(updated.id, updated).catch((err) => {
          console.warn('Firestore user profile sync error:', err);
        });
      }

      // 4. Synchronize user's primary family profile in localStorage
      try {
        if (typeof window !== 'undefined') {
          const primaryKey = `astronex_family_profiles_${updated.id.trim().replace(/[^a-zA-Z0-9_-]/g, '_')}`;
          const raw = localStorage.getItem(primaryKey);
          if (raw) {
            const list = JSON.parse(raw);
            if (Array.isArray(list) && list.length > 0) {
              const defaultIdx = list.findIndex((p) => p.isDefault || p.relationship === 'Me' || p.id === 'profile_primary_' + updated.id || p.id === 'profile_primary_me');
              if (defaultIdx >= 0) {
                list[defaultIdx] = {
                  ...list[defaultIdx],
                  name: updated.name,
                  gender: updated.gender,
                  birthDate: updated.birthDate,
                  birthTime: updated.birthTime,
                  birthPlace: updated.birthPlace,
                  latitude: updated.latitude,
                  longitude: updated.longitude,
                  timezone: updated.timezone,
                  avatarUrl: updated.avatarUrl,
                  updatedAt: new Date().toISOString(),
                };
                localStorage.setItem(primaryKey, JSON.stringify(list));
              }
            }
          }
        }
      } catch (e) {
        console.error('Error syncing primary profile in localStorage:', e);
      }

      return updated;
    });
  };

  const updateUserBirthDetails = (details: Partial<BirthProfile>) => {
    saveUser((prev) => ({ ...prev, ...details }));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    saveUser((prev) => ({ ...prev, ...updates }));
  };

  const updatePlan = (tier: PlanTier) => {
    saveUser((prev) => ({ ...prev, planTier: tier, isPremium: tier !== 'free' }));
  };

  const setAstrologySettings = (
    astrologySystem: AstrologySystem,
    zodiacSystem: ZodiacSystem,
    houseSystem: HouseSystem
  ) => {
    saveUser((prev) => ({ ...prev, astrologySystem, zodiacSystem, houseSystem }));
  };

  const togglePremium = (tier: 'monthly' | 'yearly' = 'yearly') => {
    saveUser((prev) => ({ ...prev, isPremium: !prev.isPremium, planTier: !prev.isPremium ? 'basic' : 'free' }));
  };

  // Local DB login (fallback)
  const login = (email: string, password?: string) => {
    const res = db.loginUser(email, password);
    if (res.success && res.user) {
      setUser(convertDBAccountToUserProfile(res.user));
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: res.error || 'Authentication failed' };
  };

  // ── Real Firebase Google Sign-In ──────────────────────────────────────
  const socialLogin = async (provider: 'google' | 'apple', customData?: any) => {
    if (provider === 'google') {
      try {
        const res = await firebaseSignInWithGoogle(customData);
        if (res.success && res.user) {
          // Sync to local DB
          const existingUsers = db.getUsers();
          const existing = existingUsers.find((u) => u.email === res.user!.email);
          if (!existing) {
            db.registerUser({
              email: res.user.email,
              password: 'google_oauth_' + res.user.id,
              name: res.user.name,
              birthDate: res.user.birthDate || '1996-09-12',
              birthTime: res.user.birthTime || '14:30',
              birthPlace: res.user.birthPlace || 'India',
              latitude: res.user.latitude,
              longitude: res.user.longitude,
              astrologySystem: res.user.astrologySystem,
            });
          }
          setUser(res.user);
          setIsAuthenticated(true);
          return { success: true };
        }
        return { success: false, error: res.error || 'Google sign-in failed' };
      } catch (err: any) {
        return { success: false, error: formatFirebaseAuthError(err) };
      }
    }
    // Apple fallback — local DB
    const res = db.socialLogin(provider, customData);
    if (res.success && res.user) {
      setUser(convertDBAccountToUserProfile(res.user));
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Sign-in failed' };
  };

  // ── Firebase Email Magic Link — SEND ─────────────────────────────────
  const sendEmailSignInLink = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const actionCodeSettings: ActionCodeSettings = {
        // After clicking link in email, user is redirected here
        url: typeof window !== 'undefined' ? window.location.origin + '/?signin=email' : 'http://localhost:3000/?signin=email',
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // Save email so we can auto-complete when they return
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('astrorashi_email_signin', email);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: formatFirebaseAuthError(err) };
    }
  };

  // ── Firebase Email Magic Link — COMPLETE (called on redirect) ─────────
  const completeEmailSignIn = async (email: string, link: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await signInWithEmailLink(auth, email, link);
      const fbUser = result.user;

      let cloudProfile = await getUserProfileFromFirestore(fbUser.uid).catch(() => null);
      if (!cloudProfile) {
        const newProfile: UserProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || email.split('@')[0],
          email: fbUser.email || email,
          phone: '',
          birthDate: '1996-09-12',
          birthTime: '14:30',
          birthPlace: 'India',
          latitude: 20.5937,
          longitude: 78.9629,
          timezone: 'Asia/Kolkata',
          astrologySystem: 'vedic',
          zodiacSystem: 'sidereal',
          houseSystem: 'whole-sign',
          preferredLanguage: 'en',
          planTier: 'free',
          isPremium: false,
          createdAt: new Date().toISOString(),
        };
        await saveUserProfileToFirestore(fbUser.uid, newProfile).catch(() => {});
        cloudProfile = newProfile;
      }

      const mapped: UserProfile = {
        id: fbUser.uid,
        name: fbUser.displayName || cloudProfile.name || email.split('@')[0],
        email: fbUser.email || email,
        phone: cloudProfile.phone || '',
        birthDate: cloudProfile.birthDate || '1996-09-12',
        birthTime: cloudProfile.birthTime || '14:30',
        birthPlace: cloudProfile.birthPlace || 'India',
        latitude: cloudProfile.latitude ?? 20.5937,
        longitude: cloudProfile.longitude ?? 78.9629,
        timezone: cloudProfile.timezone || 'Asia/Kolkata',
        astrologySystem: cloudProfile.astrologySystem || 'vedic',
        zodiacSystem: cloudProfile.zodiacSystem || 'sidereal',
        houseSystem: cloudProfile.houseSystem || 'whole-sign',
        preferredLanguage: 'en',
        planTier: cloudProfile.planTier || 'free',
        isPremium: cloudProfile.isPremium ?? false,
        avatarUrl: fbUser.photoURL || cloudProfile.avatarUrl,
        createdAt: cloudProfile.createdAt || new Date().toISOString(),
      };
      setUser(mapped);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: formatFirebaseAuthError(err) };
    }
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

  const logout = async () => {
    db.clearSession();
    await firebaseSignOut().catch(() => {});
    setIsAuthenticated(false);
  };

  const resetDemoData = () => {
    db.clearSession();
    setUser(INITIAL_USER);
    setIsAuthenticated(true);
  };

  const demoLogin = () => {
    const res = db.loginUser('arya.sharma@example.com');
    if (res.success && res.user) {
      setUser(convertDBAccountToUserProfile(res.user));
    }
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
        sendEmailSignInLink,
        completeEmailSignIn,
        register,
        logout,
        resetDemoData,
        demoLogin,
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
