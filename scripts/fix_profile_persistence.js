const fs = require('fs');
const path = require('path');

// 1. UPDATE lib/state/auth-context.tsx
const authContextPath = path.join(__dirname, '../lib/state/auth-context.tsx');
let authContent = fs.readFileSync(authContextPath, 'utf8');

// Ensure saveUser persists to localStorage active profile, updates db, updates session, and fires Firestore sync
const oldSaveUser = `  const saveUser = (updated: UserProfile) => {
    setUser(updated);
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
    try {
      if (typeof window !== 'undefined') {
        const primaryKey = \`astronex_family_profiles_\${updated.id.trim().replace(/[^a-zA-Z0-9_-]/g, '_')}\`;
        const raw = localStorage.getItem(primaryKey);
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list) && list.length > 0) {
            const defaultIdx = list.findIndex((p) => p.isDefault || p.relationship === 'Me');
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
  };`;

const newSaveUser = `  const saveUser = (updated: UserProfile) => {
    setUser(updated);
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
        const primaryKey = \`astronex_family_profiles_\${updated.id.trim().replace(/[^a-zA-Z0-9_-]/g, '_')}\`;
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
  };`;

if (authContent.includes(oldSaveUser)) {
  authContent = authContent.replace(oldSaveUser, newSaveUser);
} else {
  // Replace via regex if whitespace/CRLF differs
  authContent = authContent.replace(/const saveUser = \(updated: UserProfile\) => \{[\s\S]*?console\.error\('Error syncing primary profile in localStorage:', e\);\s*\}\s*\};/, newSaveUser.trim());
}

// In AuthProvider initialization, check cached user as fallback:
const oldInitEffect = `  // Initialize from persistent database
  useEffect(() => {
    try {
      const session = db.getActiveSession();
      if (session) {
        setUser(convertDBAccountToUserProfile(session));
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
  }, []);`;

const newInitEffect = `  // Initialize from persistent database
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
  }, []);`;

authContent = authContent.replace(oldInitEffect, newInitEffect);
fs.writeFileSync(authContextPath, authContent, 'utf8');
console.log('auth-context.tsx updated successfully');

// 2. UPDATE lib/state/astrology-context.tsx
// Ensure switchActiveProfile does NOT overwrite email or phone!
const astroContextPath = path.join(__dirname, '../lib/state/astrology-context.tsx');
let astroContent = fs.readFileSync(astroContextPath, 'utf8');

const oldSwitch = `  const switchActiveProfile = (profileId: string) => {
    const found = familyProfiles.find((p) => p.id === profileId);
    if (found) {
      setActiveProfileId(profileId);
      // Synchronize active profile with user profile so personal details and avatar lock together per profile
      updateUserProfile({
        name: found.name,
        birthDate: found.birthDate,
        birthTime: found.birthTime,
        birthPlace: found.birthPlace,
        latitude: found.latitude,
        longitude: found.longitude,
        timezone: found.timezone,
        gender: found.gender,
        avatarUrl: found.avatarUrl || user.avatarUrl,
      });
    }
  };`;

const newSwitch = `  const switchActiveProfile = (profileId: string) => {
    const found = familyProfiles.find((p) => p.id === profileId);
    if (found) {
      setActiveProfileId(profileId);
      // Synchronize active profile with user profile so personal details and avatar lock together per profile
      // IMPORTANT: Preserve existing email and phone number!
      updateUserProfile({
        name: found.name,
        email: user.email,
        phone: user.phone,
        birthDate: found.birthDate,
        birthTime: found.birthTime,
        birthPlace: found.birthPlace,
        latitude: found.latitude,
        longitude: found.longitude,
        timezone: found.timezone,
        gender: found.gender,
        avatarUrl: found.avatarUrl || user.avatarUrl,
      });
    }
  };`;

astroContent = astroContent.replace(oldSwitch, newSwitch);
fs.writeFileSync(astroContextPath, astroContent, 'utf8');
console.log('astrology-context.tsx updated successfully');

// 3. UPDATE components/profile/ProfileScreen.tsx
const profileScreenPath = path.join(__dirname, '../components/profile/ProfileScreen.tsx');
let profileContent = fs.readFileSync(profileScreenPath, 'utf8');

// Ensure useEffect syncs user values properly without overwriting user's typed / saved fields with defaults
const oldSyncEffect = `  // Keep local inputs synchronized if user profile updates externally
  React.useEffect(() => {
    setName(user.name || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    setGender(user.gender || 'Male');
    setBirthDate(user.birthDate || '');
    setBirthTime(user.birthTime || '');
    setBirthPlace(user.birthPlace || '');
    setLatitude(user.latitude || 28.6139);
    setLongitude(user.longitude || 77.209);
    setTimezone(user.timezone || 'Asia/Kolkata');
  }, [user.name, user.email, user.phone, user.gender, user.birthDate, user.birthTime, user.birthPlace, user.latitude, user.longitude, user.timezone]);`;

const newSyncEffect = `  // Keep local inputs synchronized if user profile updates externally
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
  }, [user.name, user.email, user.phone, user.gender, user.birthDate, user.birthTime, user.birthPlace, user.latitude, user.longitude, user.timezone]);`;

profileContent = profileContent.replace(oldSyncEffect, newSyncEffect);

// In handleSave, ensure we also update localStorage cached user immediately
const oldHandleSave = `    updateUserProfile({
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
    });`;

const newHandleSave = `    const updatedData = {
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
    updateUserProfile(updatedData);`;

profileContent = profileContent.replace(oldHandleSave, newHandleSave);
fs.writeFileSync(profileScreenPath, profileContent, 'utf8');
console.log('ProfileScreen.tsx updated successfully');

