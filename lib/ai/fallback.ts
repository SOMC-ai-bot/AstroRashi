import {
  AICompletionRequest,
  AICompletionResponse,
  AIProvider,
} from './provider';
import { classifyIntent } from './routing';
import { getTerm } from '../i18n/terminology';
import { geminiAI } from './gemini-intelligence';

export class LocalIntelligentProvider implements AIProvider {
  name = 'Gemini 1.5 Pro Astrological Intelligence Engine';

  isConfigured(): boolean {
    return true;
  }

  async generateResponse(request: AICompletionRequest): Promise<AICompletionResponse> {
    const lastMsg = request.messages[request.messages.length - 1]?.content || '';
    const intent = request.intent || classifyIntent(lastMsg, request.useAstrologyContext);
    const lang = request.userLanguage || 'en';
    const chart = request.natalChart;
    const specId = request.specialistId || 'classic';

    // 1. SAFETY BOUNDARY
    if (intent === 'SAFETY_DISCLAIMER') {
      const responseText = `### 🛡️ Ethical Boundary & Caring Guidance

AstroNex operates as an empowering companion for astrological wisdom, cosmic pattern analysis, and personal reflection.

- **Important Notice:** Astrological insight does not substitute for licensed medical treatment, clinical psychiatric care, or certified financial advisory.
- If you are experiencing acute medical or mental distress, please reach out to qualified emergency health services.

Would you like to explore constructive grounding routines or philosophical guidance based on your natal chart?`;
      return {
        content: responseText,
        text: responseText,
        intent,
        astrologyContextUsed: false,
      };
    }

    // Call the Gemini Intelligence Engine for deep grounded astrological reasoning
    const geminiResult = await geminiAI.generateAstrologicalCounsel({
      prompt: lastMsg,
      specialistId: specId,
      specialistName: request.specialistName || 'AstroNex Specialist',
      natalChart: chart,
      highThinkingEnabled: request.highThinkingEnabled !== false,
    });

    const sun = chart?.planets.find((p) => p.name === 'Sun');
    const moon = chart?.planets.find((p) => p.name === 'Moon');
    const venus = chart?.planets.find((p) => p.name === 'Venus');
    const saturn = chart?.planets.find((p) => p.name === 'Saturn');

    return {
      content: geminiResult.content,
      text: geminiResult.content,
      intent: 'SPECIALIST_CHAT',
      astrologyContextUsed: true,
      contextPill: {
        planet: specId === 'love_relationships' ? venus?.name || 'Venus' : specId === 'career_wealth' ? saturn?.name || 'Saturn' : sun?.name || 'Sun',
        house: specId === 'love_relationships' ? '7th House' : specId === 'career_wealth' ? '10th House' : '1st House',
        sign: specId === 'love_relationships' ? venus?.sign || 'Libra' : sun?.sign || 'Leo',
        theme: request.specialistName || 'AstroNex Specialist',
      },
      thinking: geminiResult.thinking,
      thoughtDuration: geminiResult.thoughtDuration,
      searchGrounding: geminiResult.searchGrounding,
      mapsGrounding: geminiResult.mapsGrounding,
    };
  }

  async generateStream(
    request: AICompletionRequest,
    onChunk: (chunk: string) => void
  ): Promise<AICompletionResponse> {
    const response = await this.generateResponse(request);
    const words = response.content.split(' ');
    let buffer = '';
    for (let i = 0; i < words.length; i++) {
      buffer += (i === 0 ? '' : ' ') + words[i];
      if (i % 4 === 0 || i === words.length - 1) {
        onChunk(buffer);
        buffer = '';
        await new Promise((r) => setTimeout(r, 6));
      }
    }
    return response;
  }
}

export const defaultAIProvider = new LocalIntelligentProvider();
