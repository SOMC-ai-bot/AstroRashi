import { UserProfile, BirthProfile, PlanTier, AstrologySystem, HouseSystem, ZodiacSystem } from '@/types';

export interface DBUserAccount {
  id: string;
  email: string;
  phone?: string;
  passwordHash: string;
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  gender?: string;
  astrologySystem: AstrologySystem;
  houseSystem: HouseSystem;
  zodiacSystem: ZodiacSystem;
  planTier: PlanTier;
  isPremium: boolean;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface DBConsultationSession {
  id: string;
  specialistId: string;
  specialistName: string;
  startedAt: string;
  updatedAt: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    thinking?: string;
    groundingQuery?: string;
  }>;
}

const STORAGE_USERS_KEY = 'astronex_db_users_v2';
const STORAGE_SESSION_KEY = 'astronex_db_session_v2';
const STORAGE_CONSULTATIONS_KEY = 'astronex_db_consultations_v2';

const DEFAULT_DEMO_USER: DBUserAccount = {
  id: 'usr_vedic_01',
  email: 'arya.sharma@astronex.com',
  passwordHash: 'demo_secure_hash',
  name: 'Arya Sharma',
  birthDate: '1996-09-12',
  birthTime: '14:30',
  birthPlace: 'Varanasi, Uttar Pradesh, India',
  latitude: 25.3176,
  longitude: 82.9739,
  timezone: 'Asia/Kolkata',
  astrologySystem: 'vedic',
  houseSystem: 'placidus',
  zodiacSystem: 'sidereal',
  planTier: 'basic',
  isPremium: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
  createdAt: '2026-01-01T00:00:00Z',
  lastLoginAt: new Date().toISOString(),
};

export class AstroNexDatabase {
  private static instance: AstroNexDatabase;

  private constructor() {
    this.initDatabase();
  }

  public static getInstance(): AstroNexDatabase {
    if (!AstroNexDatabase.instance) {
      AstroNexDatabase.instance = new AstroNexDatabase();
    }
    return AstroNexDatabase.instance;
  }

  private initDatabase(): void {
    if (typeof window === 'undefined') return;
    try {
      const existing = localStorage.getItem(STORAGE_USERS_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
      }
    } catch (e) {
      console.error('Failed to initialize database:', e);
    }
  }

  // --- USER AUTHENTICATION & MANAGEMENT ---

  public getUsers(): DBUserAccount[] {
    if (typeof window === 'undefined') return [DEFAULT_DEMO_USER];
    try {
      const data = localStorage.getItem(STORAGE_USERS_KEY);
      return data ? JSON.parse(data) : [DEFAULT_DEMO_USER];
    } catch (e) {
      return [DEFAULT_DEMO_USER];
    }
  }

  public registerUser(account: {
    email: string;
    password: string;
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    latitude?: number;
    longitude?: number;
    astrologySystem?: AstrologySystem;
  }): { success: boolean; user?: DBUserAccount; error?: string } {
    const users = this.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === account.email.toLowerCase().trim());
    if (existing) {
      return { success: false, error: 'An account with this email is already registered.' };
    }

    const newUser: DBUserAccount = {
      id: `usr_${Date.now()}`,
      email: account.email.trim(),
      passwordHash: btoa(account.password), // simple client hash
      name: account.name.trim() || account.email.split('@')[0],
      birthDate: account.birthDate || '1996-09-12',
      birthTime: account.birthTime || '12:00',
      birthPlace: account.birthPlace || 'New Delhi, India',
      latitude: account.latitude || 28.6139,
      longitude: account.longitude || 77.209,
      timezone: 'Asia/Kolkata',
      astrologySystem: account.astrologySystem || 'vedic',
      houseSystem: 'placidus',
      zodiacSystem: 'sidereal',
      planTier: 'free',
      isPremium: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    users.push(newUser);
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      this.setActiveSession(newUser);
    } catch (e) {
      console.error(e);
    }

    return { success: true, user: newUser };
  }

  public loginUser(email: string, password?: string): { success: boolean; user?: DBUserAccount; error?: string } {
    const users = this.getUsers();
    let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());

    if (!user) {
      // Create account automatically on first Google sign in or fallback
      const reg = this.registerUser({
        email,
        password: password || 'social_password',
        name: email.split('@')[0],
        birthDate: '1996-09-12',
        birthTime: '12:00',
        birthPlace: 'New Delhi, India',
      });
      return reg;
    }

    user.lastLoginAt = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      this.setActiveSession(user);
    } catch (e) {
      console.error(e);
    }

    return { success: true, user };
  }

  public socialLogin(provider: 'google' | 'apple', customData?: Partial<DBUserAccount>): { success: boolean; user: DBUserAccount } {
    const email = provider === 'google' ? 'cosmic.explorer@gmail.com' : 'cosmic.explorer@icloud.com';
    const users = this.getUsers();
    let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      user = {
        id: `usr_${provider}_${Date.now()}`,
        email,
        passwordHash: 'social_verified_session',
        name: customData?.name || (provider === 'google' ? 'Google Astro User' : 'Apple Astro User'),
        birthDate: customData?.birthDate || '1996-09-12',
        birthTime: customData?.birthTime || '14:30',
        birthPlace: customData?.birthPlace || 'Varanasi, Uttar Pradesh, India',
        latitude: customData?.latitude || 25.3176,
        longitude: customData?.longitude || 82.9739,
        timezone: customData?.timezone || 'Asia/Kolkata',
        astrologySystem: customData?.astrologySystem || 'vedic',
        houseSystem: 'placidus',
        zodiacSystem: 'sidereal',
        planTier: 'free',
        isPremium: false,
        avatarUrl:
          provider === 'google'
            ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120'
            : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      users.push(user);
    } else {
      user.lastLoginAt = new Date().toISOString();
      if (customData?.name) user.name = customData.name;
      if (customData?.birthDate) user.birthDate = customData.birthDate;
      if (customData?.birthTime) user.birthTime = customData.birthTime;
      if (customData?.birthPlace) user.birthPlace = customData.birthPlace;
    }

    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      this.setActiveSession(user);
    } catch (e) {
      console.error(e);
    }

    return { success: true, user };
  }

  public getActiveSession(): DBUserAccount | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_SESSION_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  public setActiveSession(user: DBUserAccount): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }

  public clearSession(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
  }

  public updateUser(userId: string, updates: Partial<DBUserAccount>): DBUserAccount | null {
    const users = this.getUsers();
    const active = this.getActiveSession();
    let idx = users.findIndex((u) => (userId && u.id === userId) || (active?.id && u.id === active.id) || (updates.email && u.email?.toLowerCase() === updates.email.toLowerCase()));

    if (idx === -1) {
      // If user not found in array (e.g. initial session mismatch), create/upsert entry
      const base: DBUserAccount = active || {
        ...DEFAULT_DEMO_USER,
        id: userId || 'usr_' + Date.now(),
      };
      const created: DBUserAccount = {
        ...base,
        id: userId || base.id,
        ...updates,
      };
      users.push(created);
      idx = users.length - 1;
    } else {
      users[idx] = { ...users[idx], ...updates };
    }

    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      // Always persist to active session
      this.setActiveSession(users[idx]);
    } catch (e) {
      console.error(e);
    }
    return users[idx];
  }

  // --- CONSULTATIONS & SESSIONS PERSISTENCE ---

  public getConsultations(): DBConsultationSession[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_CONSULTATIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  public saveConsultation(session: DBConsultationSession): void {
    if (typeof window === 'undefined') return;
    try {
      const list = this.getConsultations();
      const idx = list.findIndex((s) => s.id === session.id);
      if (idx !== -1) {
        list[idx] = session;
      } else {
        list.unshift(session);
      }
      localStorage.setItem(STORAGE_CONSULTATIONS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  }
}

export const db = AstroNexDatabase.getInstance();
