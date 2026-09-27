import { NextRequest, NextResponse } from 'next/server';
import { generateNatalChart } from '@/lib/astrology/calculator';
import { AstrologySystem, HouseSystem, ZodiacSystem } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const birthDate = searchParams.get('birthDate') || '1996-09-12';
  const birthTime = searchParams.get('birthTime') || '14:30';
  const latitude = parseFloat(searchParams.get('latitude') || '25.3176');
  const longitude = parseFloat(searchParams.get('longitude') || '82.9739');
  const system = (searchParams.get('system') as AstrologySystem) || 'western';
  const zodiac = (searchParams.get('zodiac') as ZodiacSystem) || 'tropical';
  const houseSystem = (searchParams.get('houseSystem') as HouseSystem) || 'placidus';

  try {
    const chart = generateNatalChart(
      birthDate,
      birthTime,
      latitude,
      longitude,
      system,
      zodiac,
      houseSystem
    );
    return NextResponse.json(chart);
  } catch (error) {
    console.error('Error calculating chart:', error);
    return NextResponse.json({ error: 'Failed to calculate natal chart' }, { status: 500 });
  }
}
