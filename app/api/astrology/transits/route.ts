import { NextRequest, NextResponse } from 'next/server';
import { calculateCurrentTransits, generateNatalChart } from '@/lib/astrology/calculator';

export async function GET(req: NextRequest) {
  try {
    const chart = generateNatalChart('1996-09-12', '14:30', 25.3176, 82.9739);
    const transits = calculateCurrentTransits(chart);
    return NextResponse.json(transits);
  } catch (error) {
    console.error('Error calculating transits:', error);
    return NextResponse.json({ error: 'Failed to calculate transits' }, { status: 500 });
  }
}
