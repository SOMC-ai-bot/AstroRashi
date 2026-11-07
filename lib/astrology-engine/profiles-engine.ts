import { AstrologySystem, HouseSystem, LanguageCode, UserFamilyProfile, ZodiacSystem } from '@/types';

const STORAGE_KEY = 'astronex_family_profiles_v1';

export const INITIAL_DEFAULT_PROFILE: UserFamilyProfile = {
  id: 'profile_primary_me',
  name: 'Aarav Kumar',
  relationship: 'Me',
  isDefault: true,
  birthDate: '1996-09-12',
  birthTime: '14:30',
  birthPlace: 'Varanasi, Uttar Pradesh, India',
  latitude: 25.3176,
  longitude: 82.9739,
  timezone: 'Asia/Kolkata',
  gender: 'Male',
  astrologySystem: 'vedic',
  zodiacSystem: 'sidereal',
  houseSystem: 'whole-sign',
  preferredLanguage: 'en',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

export const DEFAULT_SAMPLE_PROFILES: UserFamilyProfile[] = [
  INITIAL_DEFAULT_PROFILE,
  {
    id: 'profile_spouse_priya',
    name: 'Priya Sharma',
    relationship: 'Partner',
    isDefault: false,
    birthDate: '1998-11-24',
    birthTime: '08:15',
    birthPlace: 'New Delhi, India',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 'Asia/Kolkata',
    gender: 'Female',
    astrologySystem: 'vedic',
    zodiacSystem: 'sidereal',
    houseSystem: 'whole-sign',
    preferredLanguage: 'en',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'profile_sibling_rohan',
    name: 'Rohan Kumar',
    relationship: 'Sibling',
    isDefault: false,
    birthDate: '2002-04-18',
    birthTime: '18:45',
    birthPlace: 'Bengaluru, Karnataka, India',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata',
    gender: 'Male',
    astrologySystem: 'vedic',
    zodiacSystem: 'sidereal',
    houseSystem: 'whole-sign',
    preferredLanguage: 'en',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const BASE_STORAGE_KEY = 'astronex_family_profiles_';

function getUserStorageKey(userId?: string): string {
  const sanitized = (userId || 'guest').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${BASE_STORAGE_KEY}${sanitized}`;
}

export function createDefaultProfileForUser(user?: Partial<any>): UserFamilyProfile {
  if (!user || !user.id) {
    return INITIAL_DEFAULT_PROFILE;
  }
  return {
    id: `profile_primary_${user.id}`,
    name: user.name || 'My Cosmic Chart',
    relationship: 'Me',
    isDefault: true,
    birthDate: user.birthDate || '1996-09-12',
    birthTime: user.birthTime || '14:30',
    birthPlace: user.birthPlace || 'Varanasi, Uttar Pradesh, India',
    latitude: user.latitude ?? 25.3176,
    longitude: user.longitude ?? 82.9739,
    timezone: user.timezone || 'Asia/Kolkata',
    gender: user.gender || 'Prefer not to say',
    astrologySystem: user.astrologySystem || 'vedic',
    zodiacSystem: user.zodiacSystem || 'sidereal',
    houseSystem: user.houseSystem || 'whole-sign',
    preferredLanguage: user.preferredLanguage || 'en',
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function getSavedFamilyProfiles(userId?: string, fallbackUser?: Partial<any>): UserFamilyProfile[] {
  if (typeof window === 'undefined') return DEFAULT_SAMPLE_PROFILES;
  try {
    const key = getUserStorageKey(userId);
    const raw = localStorage.getItem(key);
    if (!raw) {
      const initialList = userId && fallbackUser ? [createDefaultProfileForUser(fallbackUser)] : DEFAULT_SAMPLE_PROFILES;
      localStorage.setItem(key, JSON.stringify(initialList));
      return initialList;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      if (fallbackUser && fallbackUser.name) {
        const defaultIdx = parsed.findIndex((p: any) => p.isDefault || p.relationship === 'Me' || p.id === 'profile_primary_' + fallbackUser.id || p.id === 'profile_primary_me');
        if (defaultIdx >= 0) {
          parsed[defaultIdx].name = fallbackUser.name;
          if (fallbackUser.birthDate) parsed[defaultIdx].birthDate = fallbackUser.birthDate;
          if (fallbackUser.birthTime) parsed[defaultIdx].birthTime = fallbackUser.birthTime;
          if (fallbackUser.birthPlace) parsed[defaultIdx].birthPlace = fallbackUser.birthPlace;
          if (fallbackUser.latitude !== undefined) parsed[defaultIdx].latitude = fallbackUser.latitude;
          if (fallbackUser.longitude !== undefined) parsed[defaultIdx].longitude = fallbackUser.longitude;
          if (fallbackUser.gender) parsed[defaultIdx].gender = fallbackUser.gender;
          if (fallbackUser.avatarUrl) parsed[defaultIdx].avatarUrl = fallbackUser.avatarUrl;
        }
      }
      return parsed;
    }
    const initialList = userId && fallbackUser ? [createDefaultProfileForUser(fallbackUser)] : DEFAULT_SAMPLE_PROFILES;
    return initialList;
  } catch (e) {
    console.error('Error reading family profiles:', e);
    return DEFAULT_SAMPLE_PROFILES;
  }
}

export function saveFamilyProfile(profile: UserFamilyProfile, userId?: string): UserFamilyProfile[] {
  const current = getSavedFamilyProfiles(userId);
  const existingIdx = current.findIndex((p) => p.id === profile.id);
  let updated: UserFamilyProfile[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = { ...profile, updatedAt: new Date().toISOString() };
  } else {
    updated = [...current, { ...profile, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
  }

  try {
    const key = getUserStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving family profile:', e);
  }
  return updated;
}

export function deleteFamilyProfile(profileId: string, userId?: string): UserFamilyProfile[] {
  const current = getSavedFamilyProfiles(userId);
  const updated = current.filter((p) => p.id !== profileId);
  try {
    const key = getUserStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting family profile:', e);
  }
  return updated;
}
