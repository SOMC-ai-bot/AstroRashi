const fs = require('fs');
const path = require('path');

const authPath = path.join(__dirname, '..', 'lib', 'state', 'auth-context.tsx');
let authContent = fs.readFileSync(authPath, 'utf8');

const targetStr = `  const saveUser = (updated: UserProfile) => {
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
    });
  };`;

const replacementStr = `  const saveUser = (updated: UserProfile) => {
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
    });
    // Ensure primary profile in family profile storage stays in exact sync with user details and photo
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

// normalize \r\n to \n for replacement
const normalizedAuth = authContent.replace(/\r\n/g, '\n');
if (!normalizedAuth.includes(targetStr)) {
  console.error("targetStr not found in auth-context.tsx");
  process.exit(1);
}
const updatedAuth = normalizedAuth.replace(targetStr, replacementStr);
fs.writeFileSync(authPath, updatedAuth, 'utf8');
console.log('Successfully updated auth-context.tsx');

