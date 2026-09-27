import { NextRequest, NextResponse } from 'next/server';
import { defaultAIProvider } from '@/lib/ai/fallback';
import { classifyIntent } from '@/lib/ai/routing';
import { AICompletionRequest } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  try {
    const body: AICompletionRequest = await req.json();
    const { messages, natalChart, userLanguage = 'en', useAstrologyContext = true } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const lastMsg = messages[messages.length - 1].content;
    const intent = classifyIntent(lastMsg, useAstrologyContext);

    // Generate response with intelligent fallback engine
    const response = await defaultAIProvider.generateResponse({
      messages,
      natalChart,
      userLanguage,
      useAstrologyContext,
      intent,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in /api/ai/chat:', error);
    return NextResponse.json(
      { error: 'Failed to process AI conversation request' },
      { status: 500 }
    );
  }
}
