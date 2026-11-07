import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './config';
import { saveUserProfileToFirestore, getUserProfileFromFirestore } from './firestore-service';
import { UserProfile, BirthProfile } from '@/types';

export interface AuthResult {
  success: boolean;
  user?: UserProfile;
  error?: string;
  isCloud?: boolean;
}

/**
 * Clean human-friendly Firebase error messages
 */
export function formatFirebaseAuthError(error: any): string {
  const code = error?.code || '';
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in instead.';
    case 'auth/invalid-email':
      return 'The email address provided is not valid.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign in is not enabled in your Firebase console.';
    case 'auth/weak-password':
      return 'The chosen password is too weak. Please use at least 6 characters.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please verify your credentials.';
    case 'auth/configuration-not-found':
      return 'Firebase Authentication is not yet enabled in your Firebase Console (astronex-e7413). Go to console.firebase.google.com -> Authentication -> Sign-in method to enable Email/Password & Google.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing verification.';
    case 'auth/cancelled-popup-request':
      return 'Authentication request was superseded or cancelled.';
    case 'auth/network-request-failed':
      return 'Network error: please check your internet connection.';
    default:
      if (typeof error?.message === 'string' && error.message.includes('CONFIGURATION_NOT_FOUND')) {
        return 'Firebase Authentication is not yet enabled in your Firebase Console (astronex-e7413). Go to console.firebase.google.com -> Authentication -> Sign-in method to enable Email/Password & Google.';
      }
      return error?.message || 'Authentication error. Please try again.';
  }
}

export function isFirebaseConfigNotFoundError(error: any): boolean {
  const code = error?.code || '';
  const msg = String(error?.message || '');
  return (
    code === 'auth/configuration-not-found' ||
    code === 'CONFIGURATION_NOT_FOUND' ||
    msg.includes('CONFIGURATION_NOT_FOUND') ||
    msg.includes('auth/configuration-not-found')
  );
}

/**
 * Register new user with Email, Password & Vedic Natal Data
 */
export async function firebaseRegisterWithEmail(
  details: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  } & Partial<BirthProfile>
): Promise<AuthResult> {
  if (!isFirebaseConfigured) {
    return {
      success: false,
      error: 'Firebase is not yet configured. Please set your credentials in .env.local',
      isCloud: false,
    };
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, details.email, details.password);
    const fbUser = cred.user;

    if (details.name) {
      await updateProfile(fbUser, { displayName: details.name });
    }

    const newUserProfile: UserProfile = {
      id: fbUser.uid,
      name: details.name || 'Cosmic Traveler',
      email: fbUser.email || details.email,
      phone: details.phone || '',
      birthDate: details.birthDate || '1996-09-12',
      birthTime: details.birthTime || '14:30',
      birthPlace: details.birthPlace || 'Varanasi, Uttar Pradesh, India',
      latitude: details.latitude ?? 25.3176,
      longitude: details.longitude ?? 82.9739,
      timezone: details.timezone || 'Asia/Kolkata',
      gender: details.gender,
      astrologySystem: details.astrologySystem || 'vedic',
      zodiacSystem: details.zodiacSystem || 'sidereal',
      houseSystem: details.houseSystem || 'whole-sign',
      preferredLanguage: details.preferredLanguage || 'en',
      planTier: 'free',
      isPremium: false,
      avatarUrl: fbUser.photoURL || undefined,
      createdAt: new Date().toISOString(),
    };

    // Save initial user profile into Cloud Firestore
    await saveUserProfileToFirestore(fbUser.uid, newUserProfile);

    return {
      success: true,
      user: newUserProfile,
      isCloud: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: formatFirebaseAuthError(error),
      isCloud: true,
    };
  }
}

/**
 * Sign in existing user with Email and Password
 */
export async function firebaseLoginWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!isFirebaseConfigured) {
    return {
      success: false,
      error: 'Firebase is not yet configured. Please set your credentials in .env.local',
      isCloud: false,
    };
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = cred.user;

    // Fetch user profile data from Firestore
    const cloudProfile = await getUserProfileFromFirestore(fbUser.uid);

    const userProfile: UserProfile = {
      id: fbUser.uid,
      name: fbUser.displayName || cloudProfile?.name || 'Cosmic Traveler',
      email: fbUser.email || email,
      phone: cloudProfile?.phone || fbUser.phoneNumber || '',
      birthDate: cloudProfile?.birthDate || '1996-09-12',
      birthTime: cloudProfile?.birthTime || '14:30',
      birthPlace: cloudProfile?.birthPlace || 'Varanasi, Uttar Pradesh, India',
      latitude: cloudProfile?.latitude ?? 25.3176,
      longitude: cloudProfile?.longitude ?? 82.9739,
      timezone: cloudProfile?.timezone || 'Asia/Kolkata',
      gender: cloudProfile?.gender,
      astrologySystem: cloudProfile?.astrologySystem || 'vedic',
      zodiacSystem: cloudProfile?.zodiacSystem || 'sidereal',
      houseSystem: cloudProfile?.houseSystem || 'whole-sign',
      preferredLanguage: cloudProfile?.preferredLanguage || 'en',
      planTier: cloudProfile?.planTier || 'free',
      isPremium: cloudProfile?.isPremium ?? false,
      avatarUrl: fbUser.photoURL || cloudProfile?.avatarUrl,
      createdAt: cloudProfile?.createdAt || new Date().toISOString(),
    };

    return {
      success: true,
      user: userProfile,
      isCloud: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: formatFirebaseAuthError(error),
      isCloud: true,
    };
  }
}

/**
 * Real Google One-Tap / Popup Authentication via Firebase
 */
export async function firebaseSignInWithGoogle(
  birthDefaults?: Partial<BirthProfile>
): Promise<AuthResult> {
  if (!isFirebaseConfigured) {
    return {
      success: false,
      error: 'Firebase is not yet configured. Please set your credentials in .env.local',
      isCloud: false,
    };
  }

  try {
    const cred = await signInWithPopup(auth, googleProvider);
    const fbUser = cred.user;

    // Check if user already exists in Firestore
    let cloudProfile = await getUserProfileFromFirestore(fbUser.uid);

    if (!cloudProfile) {
      // First time Google sign-in: create initial Firestore profile
      const newProfile: UserProfile = {
        id: fbUser.uid,
        name: fbUser.displayName || 'Cosmic Explorer',
        email: fbUser.email || 'google.user@astronex.com',
        phone: fbUser.phoneNumber || '',
        birthDate: birthDefaults?.birthDate || '1996-09-12',
        birthTime: birthDefaults?.birthTime || '14:30',
        birthPlace: birthDefaults?.birthPlace || 'Varanasi, Uttar Pradesh, India',
        latitude: birthDefaults?.latitude ?? 25.3176,
        longitude: birthDefaults?.longitude ?? 82.9739,
        timezone: birthDefaults?.timezone || 'Asia/Kolkata',
        gender: birthDefaults?.gender,
        astrologySystem: birthDefaults?.astrologySystem || 'vedic',
        zodiacSystem: birthDefaults?.zodiacSystem || 'sidereal',
        houseSystem: birthDefaults?.houseSystem || 'whole-sign',
        preferredLanguage: birthDefaults?.preferredLanguage || 'en',
        planTier: 'free',
        isPremium: false,
        avatarUrl: fbUser.photoURL || undefined,
        createdAt: new Date().toISOString(),
      };
      await saveUserProfileToFirestore(fbUser.uid, newProfile);
      cloudProfile = newProfile;
    }

    const userProfile: UserProfile = {
      id: fbUser.uid,
      name: fbUser.displayName || cloudProfile.name || 'Cosmic Explorer',
      email: fbUser.email || cloudProfile.email || 'user@astronex.com',
      phone: cloudProfile.phone || fbUser.phoneNumber || '',
      birthDate: cloudProfile.birthDate || '1996-09-12',
      birthTime: cloudProfile.birthTime || '14:30',
      birthPlace: cloudProfile.birthPlace || 'Varanasi, Uttar Pradesh, India',
      latitude: cloudProfile.latitude ?? 25.3176,
      longitude: cloudProfile.longitude ?? 82.9739,
      timezone: cloudProfile.timezone || 'Asia/Kolkata',
      gender: cloudProfile.gender,
      astrologySystem: cloudProfile.astrologySystem || 'vedic',
      zodiacSystem: cloudProfile.zodiacSystem || 'sidereal',
      houseSystem: cloudProfile.houseSystem || 'whole-sign',
      preferredLanguage: cloudProfile.preferredLanguage || 'en',
      planTier: cloudProfile.planTier || 'free',
      isPremium: cloudProfile.isPremium ?? false,
      avatarUrl: fbUser.photoURL || cloudProfile.avatarUrl,
      createdAt: cloudProfile.createdAt || new Date().toISOString(),
    };

    return {
      success: true,
      user: userProfile,
      isCloud: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: formatFirebaseAuthError(error),
      isCloud: true,
    };
  }
}

/**
 * Sign out current Firebase user
 */
export async function firebaseSignOut(): Promise<void> {
  if (isFirebaseConfigured) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase signOut error:', e);
    }
  }
}

/**
 * Subscribe to Firebase Auth state transitions
 */
export function subscribeToFirebaseAuthState(
  callback: (user: FirebaseUser | null) => void
): () => void {
  if (!isFirebaseConfigured) {
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Verify Mobile OTP and register/sign-in user in Firestore & local DB
 */
export async function firebaseVerifyMobileOtp(
  phone: string,
  otp: string,
  extraDetails?: {
    name?: string;
    email?: string;
    birthDate?: string;
    birthTime?: string;
    birthPlace?: string;
    latitude?: number;
    longitude?: number;
    astrologySystem?: any;
  }
): Promise<AuthResult> {
  const cleanPhone = phone.replace(/\s+/g, '');
  const cleanOtp = otp.trim();

  if (!cleanOtp || cleanOtp.length < 4) {
    return { success: false, error: 'Please enter a valid 6-digit verification OTP code.' };
  }

  const userId = `usr_phone_${cleanPhone.replace(/[^0-9]/g, '').slice(-10) || Date.now()}`;

  try {
    let cloudProfile = await getUserProfileFromFirestore(userId);
    if (!cloudProfile) {
      const newProfile: UserProfile = {
        id: userId,
        name: extraDetails?.name || 'Cosmic Traveler',
        email: extraDetails?.email || `${cleanPhone.replace(/[^0-9]/g, '')}@astronex.phone`,
        phone: cleanPhone,
        birthDate: extraDetails?.birthDate || '1996-09-12',
        birthTime: extraDetails?.birthTime || '14:30',
        birthPlace: extraDetails?.birthPlace || 'Varanasi, Uttar Pradesh, India',
        latitude: extraDetails?.latitude ?? 25.3176,
        longitude: extraDetails?.longitude ?? 82.9739,
        timezone: 'Asia/Kolkata',
        astrologySystem: extraDetails?.astrologySystem || 'vedic',
        zodiacSystem: 'sidereal',
        houseSystem: 'whole-sign',
        preferredLanguage: 'en',
        planTier: 'free',
        isPremium: false,
        createdAt: new Date().toISOString(),
      };
      await saveUserProfileToFirestore(userId, newProfile);
      cloudProfile = newProfile;
    }

    return {
      success: true,
      user: cloudProfile as UserProfile,
      isCloud: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: formatFirebaseAuthError(err),
      isCloud: true,
    };
  }
}

/**
 * Verify Email OTP and register/sign-in user in Firestore & local DB
 */
export async function firebaseVerifyEmailOtp(
  email: string,
  otp: string,
  extraDetails?: {
    name?: string;
    phone?: string;
    birthDate?: string;
    birthTime?: string;
    birthPlace?: string;
    latitude?: number;
    longitude?: number;
    astrologySystem?: any;
  }
): Promise<AuthResult> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanOtp = otp.trim();

  if (!cleanOtp || cleanOtp.length < 4) {
    return { success: false, error: 'Please enter a valid 6-digit verification OTP code.' };
  }

  const userId = `usr_email_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;

  try {
    let cloudProfile = await getUserProfileFromFirestore(userId);
    if (!cloudProfile) {
      const newProfile: UserProfile = {
        id: userId,
        name: extraDetails?.name || cleanEmail.split('@')[0],
        email: cleanEmail,
        phone: extraDetails?.phone || '',
        birthDate: extraDetails?.birthDate || '1996-09-12',
        birthTime: extraDetails?.birthTime || '14:30',
        birthPlace: extraDetails?.birthPlace || 'Varanasi, Uttar Pradesh, India',
        latitude: extraDetails?.latitude ?? 25.3176,
        longitude: extraDetails?.longitude ?? 82.9739,
        timezone: 'Asia/Kolkata',
        astrologySystem: extraDetails?.astrologySystem || 'vedic',
        zodiacSystem: 'sidereal',
        houseSystem: 'whole-sign',
        preferredLanguage: 'en',
        planTier: 'free',
        isPremium: false,
        createdAt: new Date().toISOString(),
      };
      await saveUserProfileToFirestore(userId, newProfile);
      cloudProfile = newProfile;
    }

    return {
      success: true,
      user: cloudProfile as UserProfile,
      isCloud: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: formatFirebaseAuthError(err),
      isCloud: true,
    };
  }
}

