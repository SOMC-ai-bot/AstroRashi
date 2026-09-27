import { AIIntent, LanguageCode, NatalChart } from '@/types';
import { GoogleSearchGrounding, GoogleMapsGrounding } from './gemini-intelligence';

export interface AIMessagePayload {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AICompletionRequest {
  messages: AIMessagePayload[];
  natalChart?: NatalChart;
  userLanguage?: LanguageCode;
  useAstrologyContext?: boolean;
  intent?: AIIntent;
  specialistId?: string;
  specialistName?: string;
  specialistSystemPrompt?: string;
  toolResults?: Record<string, any>;
  highThinkingEnabled?: boolean;
}

export interface AICompletionResponse {
  content: string;
  text: string; // convenient alias
  intent: AIIntent;
  astrologyContextUsed: boolean;
  contextPill?: {
    planet?: string;
    house?: string;
    sign?: string;
    theme?: string;
  };
  thinking?: string;
  thoughtDuration?: number;
  searchGrounding?: GoogleSearchGrounding[];
  mapsGrounding?: GoogleMapsGrounding;
}

export interface AIProvider {
  name: string;
  isConfigured(): boolean;
  generateResponse(request: AICompletionRequest): Promise<AICompletionResponse>;
  generateStream?(
    request: AICompletionRequest,
    onChunk: (chunk: string) => void
  ): Promise<AICompletionResponse>;
}
