const fs = require('fs');

let code = fs.readFileSync('lib/state/auth-context.tsx', 'utf8').replace(/\r\n/g, '\n');

// 1. In AuthProvider initialization:
const oldInit = `  // Initialize from persistent database
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
  }, []);`;

const newInit = `  // Initialize from persistent database
  useEffect(() => {
    try {
      const session = db.getActiveSession();
      if (session) {
        setUser(convertDBAccountToUserProfile(session));
        setIsAuthenticated(true);
      } else {
        // Ensure default user account is registered and set as session
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

if (code.includes(oldInit)) {
  code = code.replace(oldInit, newInit);
  console.log('SUCCESS: auth-context.tsx initialization updated');
} else {
  console.log('oldInit not found');
}

// 2. In saveUser:
const oldSaveUser = `  const saveUser = (updated: UserProfile) => {
    setUser(updated);
    db.updateUser(updated.id, {
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
    });`;

const newSaveUser = `  const saveUser = (updated: UserProfile) => {
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
    // Double safeguard: persist immediately to active session
    if (updatedRecord) {
      db.setActiveSession(updatedRecord);
    }`;

if (code.includes(oldSaveUser)) {
  code = code.replace(oldSaveUser, newSaveUser);
  console.log('SUCCESS: auth-context.tsx saveUser updated');
} else {
  console.log('oldSaveUser not found');
}

fs.writeFileSync('lib/state/auth-context.tsx', code, 'utf8');

