const fs = require('fs');

let code = fs.readFileSync('lib/db/database.ts', 'utf8').replace(/\r\n/g, '\n');

// Find initDatabase and updateUser
const oldUpdate = `  public updateUser(userId: string, updates: Partial<DBUserAccount>): DBUserAccount | null {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return null;

    users[idx] = { ...users[idx], ...updates };
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      const current = this.getActiveSession();
      if (current && current.id === userId) {
        this.setActiveSession(users[idx]);
      }
    } catch (e) {
      console.error(e);
    }
    return users[idx];
  }`;

const newUpdate = `  public updateUser(userId: string, updates: Partial<DBUserAccount>): DBUserAccount | null {
    const users = this.getUsers();
    let idx = users.findIndex((u) => u.id === userId || (updates.email && u.email?.toLowerCase() === updates.email.toLowerCase()));

    if (idx === -1) {
      // If user not found in array (e.g. initial session mismatch), create/upsert entry
      const active = this.getActiveSession();
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
  }`;

if (code.includes(oldUpdate)) {
  code = code.replace(oldUpdate, newUpdate);
  console.log('SUCCESS: database.ts updateUser robust upsert implemented');
} else {
  console.log('Target oldUpdate not found in database.ts');
}

fs.writeFileSync('lib/db/database.ts', code, 'utf8');

