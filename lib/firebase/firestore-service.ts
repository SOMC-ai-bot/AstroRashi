import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { firestore, isFirebaseConfigured } from './config';
import { UserProfile, UserFamilyProfile } from '@/types';

const USERS_COLLECTION = 'users';
const CALCULATIONS_COLLECTION = 'calculations';
const FAMILY_PROFILES_COLLECTION = 'family_profiles';

/**
 * Persist or merge user profile document in Firestore
 */
export async function saveUserProfileToFirestore(
  userId: string,
  profile: Partial<UserProfile>
): Promise<boolean> {
  if (!isFirebaseConfigured || !userId) {
    return false;
  }

  try {
    const userRef = doc(firestore, USERS_COLLECTION, userId);
    await setDoc(
      userRef,
      {
        ...profile,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn('Firestore: Could not sync user profile to cloud (falling back to local cache):', error);
    return false;
  }
}

/**
 * Retrieve user profile document from Firestore
 */
export async function getUserProfileFromFirestore(
  userId: string
): Promise<Partial<UserProfile> | null> {
  if (!isFirebaseConfigured || !userId) {
    return null;
  }

  try {
    const userRef = doc(firestore, USERS_COLLECTION, userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as Partial<UserProfile>;
    }
    return null;
  } catch (error) {
    console.warn('Firestore: Error fetching user profile:', error);
    return null;
  }
}

/**
 * Save an astrological calculation history record to Firestore
 */
export async function saveCalculationToFirestore(
  userId: string,
  calculationType: string,
  title: string,
  summary: string,
  inputData: any,
  resultData: any
): Promise<string | null> {
  if (!isFirebaseConfigured || !userId) {
    return null;
  }

  try {
    const calcsRef = collection(firestore, USERS_COLLECTION, userId, CALCULATIONS_COLLECTION);
    const docRef = await addDoc(calcsRef, {
      calculationType,
      title,
      summary,
      inputData,
      resultData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.warn('Firestore: Error saving calculation audit:', error);
    return null;
  }
}

/**
 * Retrieve recent calculation records from Firestore
 */
export async function getCalculationHistoryFromFirestore(
  userId: string,
  maxRecords = 20
): Promise<any[]> {
  if (!isFirebaseConfigured || !userId) {
    return [];
  }

  try {
    const calcsRef = collection(firestore, USERS_COLLECTION, userId, CALCULATIONS_COLLECTION);
    const q = query(calcsRef, orderBy('createdAt', 'desc'), limit(maxRecords));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn('Firestore: Error fetching calculation history:', error);
    return [];
  }
}

/**
 * Save user family member profile to Firestore
 */
export async function saveFamilyProfileToFirestore(
  userId: string,
  familyProfile: UserFamilyProfile
): Promise<boolean> {
  if (!isFirebaseConfigured || !userId) {
    return false;
  }

  try {
    const famRef = doc(
      firestore,
      USERS_COLLECTION,
      userId,
      FAMILY_PROFILES_COLLECTION,
      familyProfile.id
    );
    await setDoc(famRef, {
      ...familyProfile,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.warn('Firestore: Error saving family profile:', error);
    return false;
  }
}
