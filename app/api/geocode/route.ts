import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const latParam = searchParams.get('lat');
  const lonParam = searchParams.get('lon');

  // Handle Reverse Geocoding (GPS Auto-Detection)
  if (latParam && lonParam) {
    const lat = parseFloat(latParam);
    const lon = parseFloat(lonParam);

    if (!isNaN(lat) && !isNaN(lon)) {
      try {
        const nomReverseUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
        const nomRes = await fetch(nomReverseUrl, {
          headers: {
            'User-Agent': 'AstroNexModernApp/1.0 (astronex.support@gmail.com)',
            'Accept': 'application/json',
          },
          next: { revalidate: 3600 },
        });

        if (nomRes.ok) {
          const data = await nomRes.json();
          const addr = data.address || {};
          const cityName = addr.city || addr.town || addr.village || addr.suburb || addr.county || 'Detected City';
          const stateName = addr.state || addr.region || '';
          const countryName = addr.country || 'India';

          let tz = 'Asia/Kolkata';
          if (countryName.toLowerCase().includes('united states') || countryName.toLowerCase().includes('usa')) {
            tz = lon < -100 ? 'America/Los_Angeles' : lon < -85 ? 'America/Chicago' : 'America/New_York';
          } else if (countryName.toLowerCase().includes('kingdom') || countryName.toLowerCase().includes('uk')) {
            tz = 'Europe/London';
          } else if (countryName.toLowerCase().includes('emirates') || countryName.toLowerCase().includes('uae')) {
            tz = 'Asia/Dubai';
          } else if (countryName.toLowerCase().includes('australia')) {
            tz = 'Australia/Sydney';
          }

          return NextResponse.json({
            results: [
              {
                name: cityName,
                state: stateName,
                country: countryName,
                latitude: lat,
                longitude: lon,
                timezone: tz,
                isGoogleVerified: true,
              },
            ],
          });
        }
      } catch (e) {
        console.error('Reverse geocode error:', e);
      }

      // Fallback response with exact coordinates
      return NextResponse.json({
        results: [
          {
            name: `Coords (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
            state: 'Current GPS',
            country: 'Earth',
            latitude: lat,
            longitude: lon,
            timezone: 'Asia/Kolkata',
            isGoogleVerified: true,
          },
        ],
      });
    }
  }

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const cleanQuery = query.trim();

  try {
    // 1. First attempt: Photon geocoding (fast, open, no strict User-Agent blocks)
    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&limit=10`;
    const photonRes = await fetch(photonUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (photonRes.ok) {
      const data = await photonRes.json();
      if (data.features && Array.isArray(data.features) && data.features.length > 0) {
        const results = data.features.map((feat: any) => {
          const props = feat.properties || {};
          const coords = feat.geometry?.coordinates || [0, 0];
          const lon = coords[0];
          const lat = coords[1];
          const cityName = props.name || props.city || cleanQuery;
          const stateName = props.state || props.county || props.district;
          const countryName = props.country || 'Global';

          let tz = 'Asia/Kolkata';
          if (countryName.toLowerCase().includes('united states') || countryName.toLowerCase().includes('usa')) {
            tz = lon < -100 ? 'America/Los_Angeles' : lon < -85 ? 'America/Chicago' : 'America/New_York';
          } else if (countryName.toLowerCase().includes('kingdom') || countryName.toLowerCase().includes('uk')) {
            tz = 'Europe/London';
          } else if (countryName.toLowerCase().includes('emirates') || countryName.toLowerCase().includes('uae')) {
            tz = 'Asia/Dubai';
          } else if (countryName.toLowerCase().includes('australia')) {
            tz = 'Australia/Sydney';
          } else if (countryName.toLowerCase().includes('canada')) {
            tz = lon < -100 ? 'America/Vancouver' : 'America/Toronto';
          } else if (countryName.toLowerCase().includes('germany') || countryName.toLowerCase().includes('france')) {
            tz = 'Europe/Paris';
          }

          return {
            name: cityName,
            state: stateName,
            country: countryName,
            latitude: lat,
            longitude: lon,
            timezone: tz,
            isGoogleVerified: true,
          };
        });

        return NextResponse.json({ results });
      }
    }

    // 2. Fallback attempt: Nominatim with User-Agent
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanQuery)}&format=json&addressdetails=1&limit=8`;
    const nomRes = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'AstroNexModernApp/1.0 (astronex.support@gmail.com)',
        'Accept': 'application/json',
      },
    });

    if (nomRes.ok) {
      const data = await nomRes.json();
      if (Array.isArray(data) && data.length > 0) {
        const results = data.map((item: any) => {
          const addr = item.address || {};
          const cityName = addr.city || addr.town || addr.village || addr.suburb || addr.county || item.name || cleanQuery;
          const stateName = addr.state || addr.region;
          const countryName = addr.country || 'Global';
          const lat = parseFloat(item.lat);
          const lon = parseFloat(item.lon);

          return {
            name: cityName,
            state: stateName,
            country: countryName,
            latitude: lat,
            longitude: lon,
            timezone: 'Asia/Kolkata',
            isGoogleVerified: true,
          };
        });

        return NextResponse.json({ results });
      }
    }
  } catch (err) {
    // Return empty on failure
  }

  return NextResponse.json({ results: [] });
}
