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

export function getSavedFamilyProfiles(): UserFamilyProfile[] {
  if (typeof window === 'undefined') return [INITIAL_DEFAULT_PROFILE];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([INITIAL_DEFAULT_PROFILE]));
      return [INITIAL_DEFAULT_PROFILE];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [INITIAL_DEFAULT_PROFILE];
  } catch (e) {
    console.error('Error reading family profiles:', e);
    return [INITIAL_DEFAULT_PROFILE];
  }
}

export function saveFamilyProfile(profile: UserFamilyProfile): UserFamilyProfile[] {
  const current = getSavedFamilyProfiles();
  const existingIdx = current.findIndex((p) => p.id === profile.id);
  let updated: UserFamilyProfile[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = { ...profile, updatedAt: new Date().toISOString() };
  } else {
    updated = [...current, { ...profile, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving family profile:', e);
  }
  return updated;
}

export function deleteFamilyProfile(profileId: string): UserFamilyProfile[] {
  const current = getSavedFamilyProfiles();
  // Never delete primary default 'Me'
  if (current.find((p) => p.id === profileId)?.isDefault) {
    return current;
  }
  const updated = current.filter((p) => p.id !== profileId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting family profile:', e);
  }
  return updated;
}
