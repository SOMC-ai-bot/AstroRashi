'use client';

import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import {
  AstrologySystem,
  HouseSystem,
  NatalChart,
  PlanetPosition,
  TransitData,
  UserFamilyProfile,
  ZodiacSystem,
} from '@/types';
import { useAuth } from './auth-context';
import { generateFullNatalChart } from '@/lib/astrology-engine/chart';
import { calculateCurrentTransits } from '@/lib/astrology/calculator';
import {
  getSavedFamilyProfiles,
  saveFamilyProfile,
  deleteFamilyProfile,
  INITIAL_DEFAULT_PROFILE,
} from '@/lib/astrology-engine/profiles-engine';

interface AstrologyContextType {
  natalChart: NatalChart;
  transits: TransitData[];
  selectedPlacement: PlanetPosition | null;
  setSelectedPlacement: (pos: PlanetPosition | null) => void;
  system: AstrologySystem;
  zodiac: ZodiacSystem;
  houseSystem: HouseSystem;
  setSystem: (s: AstrologySystem) => void;
  setHouseSystem: (hs: HouseSystem) => void;

  // Multi-profile state & actions
  activeProfile: UserFamilyProfile;
  familyProfiles: UserFamilyProfile[];
  switchActiveProfile: (profileId: string) => void;
  saveProfile: (profile: UserFamilyProfile) => void;
  deleteProfile: (profileId: string) => void;
}

const AstrologyContext = createContext<AstrologyContextType | null>(null);

export function AstrologyProvider({ children }: { children: React.ReactNode }) {
  const { user, setAstrologySettings } = useAuth();
  const [selectedPlacement, setSelectedPlacement] = useState<PlanetPosition | null>(null);

  // Multi-profile state
  const [familyProfiles, setFamilyProfiles] = useState<UserFamilyProfile[]>([INITIAL_DEFAULT_PROFILE]);
  const [activeProfileId, setActiveProfileId] = useState<string>(INITIAL_DEFAULT_PROFILE.id);

  // Load profiles on mount
  useEffect(() => {
    const list = getSavedFamilyProfiles();
    setFamilyProfiles(list);
    const def = list.find((p) => p.isDefault) || list[0];
    if (def) setActiveProfileId(def.id);
  }, []);

  const activeProfile = useMemo(() => {
    return familyProfiles.find((p) => p.id === activeProfileId) || familyProfiles[0] || INITIAL_DEFAULT_PROFILE;
  }, [familyProfiles, activeProfileId]);

  const system = activeProfile.astrologySystem || user.astrologySystem || 'vedic';
  const zodiac = system === 'vedic' ? 'sidereal' : activeProfile.zodiacSystem || user.zodiacSystem || 'tropical';
  const houseSystem = system === 'vedic' ? 'whole-sign' : activeProfile.houseSystem || user.houseSystem || 'placidus';

  const natalChart = useMemo(() => {
    return generateFullNatalChart(
      activeProfile.birthDate || user.birthDate || '1996-09-12',
      activeProfile.birthTime || user.birthTime || '14:30',
      activeProfile.latitude || user.latitude || 25.3176,
      activeProfile.longitude || user.longitude || 82.9739,
      system,
      zodiac,
      houseSystem
    );
  }, [
    activeProfile.birthDate,
    activeProfile.birthTime,
    activeProfile.latitude,
    activeProfile.longitude,
    user.birthDate,
    user.birthTime,
    user.latitude,
    user.longitude,
    system,
    zodiac,
    houseSystem,
  ]);

  const transits = useMemo(() => {
    return calculateCurrentTransits(natalChart);
  }, [natalChart]);

  const setSystem = (newSystem: AstrologySystem) => {
    const newZodiac: ZodiacSystem = newSystem === 'vedic' ? 'sidereal' : 'tropical';
    const newHouseSystem: HouseSystem = newSystem === 'vedic' ? 'whole-sign' : user.houseSystem;
    setAstrologySettings(newSystem, newZodiac, newHouseSystem);
  };

  const setHouseSystem = (newHouseSystem: HouseSystem) => {
    setAstrologySettings(system, zodiac, newHouseSystem);
  };

  const switchActiveProfile = (profileId: string) => {
    const found = familyProfiles.find((p) => p.id === profileId);
    if (found) {
      setActiveProfileId(profileId);
    }
  };

  const handleSaveProfile = (profile: UserFamilyProfile) => {
    const updated = saveFamilyProfile(profile);
    setFamilyProfiles(updated);
  };

  const handleDeleteProfile = (profileId: string) => {
    const updated = deleteFamilyProfile(profileId);
    setFamilyProfiles(updated);
    if (activeProfileId === profileId) {
      setActiveProfileId(updated[0]?.id || INITIAL_DEFAULT_PROFILE.id);
    }
  };

  return (
    <AstrologyContext.Provider
      value={{
        natalChart,
        transits,
        selectedPlacement,
        setSelectedPlacement,
        system,
        zodiac,
        houseSystem,
        setSystem,
        setHouseSystem,
        activeProfile,
        familyProfiles,
        switchActiveProfile,
        saveProfile: handleSaveProfile,
        deleteProfile: handleDeleteProfile,
      }}
    >
      {children}
    </AstrologyContext.Provider>
  );
}

export function useAstrology() {
  const ctx = useContext(AstrologyContext);
  if (!ctx) {
    throw new Error('useAstrology must be used within AstrologyProvider');
  }
  return ctx;
}
