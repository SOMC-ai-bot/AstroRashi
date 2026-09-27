import { AISpecialist } from '@/types';
import { AI_SPECIALISTS } from '../specialists/config';

// Re-export AI Specialist Modes to replace legacy consultant personas
export const AI_CONSULTANT_PERSONAS: AISpecialist[] = AI_SPECIALISTS;

export function getPersonaById(id: string): AISpecialist {
  return AI_SPECIALISTS.find((p) => p.id === id) || AI_SPECIALISTS[0];
}
