import { AstrologyResultObject, SavedCalculationItem, CalculationHistoryItem } from '@/types';

const HISTORY_STORAGE_KEY = 'astronex_saved_calculations_v1';

export function getSavedCalculations(): SavedCalculationItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading saved calculations:', e);
    return [];
  }
}

export const getCalculationHistory = getSavedCalculations;

export function saveCalculationItem(
  toolId: string,
  toolName: string,
  inputSummary: string,
  resultSummary: string,
  profileName: string,
  resultData?: any
): SavedCalculationItem[] {
  const current = getSavedCalculations();
  const newItem: SavedCalculationItem = {
    id: `calc_${toolId}_${Date.now()}`,
    toolId,
    toolName,
    calculatedAt: new Date().toISOString(),
    inputSummary,
    resultSummary,
    profileName,
    resultData,
  };

  // Keep latest 50 calculations
  const updated = [newItem, ...current].slice(0, 50);
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving calculation item:', e);
  }
  return updated;
}

export function deleteCalculationItem(id: string): SavedCalculationItem[] {
  const current = getSavedCalculations();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting calculation item:', e);
  }
  return updated;
}

export function clearAllCalculations(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing calculations:', e);
  }
}

export const clearCalculationHistory = clearAllCalculations;
