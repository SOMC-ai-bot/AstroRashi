export interface CityLocation {
  name: string;
  state?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isGoogleVerified?: boolean;
}

export const POPULAR_CITIES: CityLocation[] = [
  // India Metros & Major Cities
  { name: 'New Delhi', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.209, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.076, longitude: 72.8777, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Chennai', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Hyderabad', state: 'Telangana', country: 'India', latitude: 17.385, longitude: 78.4867, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Ahmedabad', state: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Pune', state: 'Maharashtra', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Jaipur', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Lucknow', state: 'Uttar Pradesh', country: 'India', latitude: 26.8467, longitude: 80.9462, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Kanpur', state: 'Uttar Pradesh', country: 'India', latitude: 26.4499, longitude: 80.3319, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Nagpur', state: 'Maharashtra', country: 'India', latitude: 21.1458, longitude: 79.0882, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Indore', state: 'Madhya Pradesh', country: 'India', latitude: 22.7196, longitude: 75.8577, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Thane', state: 'Maharashtra', country: 'India', latitude: 19.2183, longitude: 72.9781, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Bhopal', state: 'Madhya Pradesh', country: 'India', latitude: 23.2599, longitude: 77.4126, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', latitude: 17.6868, longitude: 83.2185, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Pimpri-Chinchwad', state: 'Maharashtra', country: 'India', latitude: 18.6279, longitude: 73.8009, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Patna', state: 'Bihar', country: 'India', latitude: 25.5941, longitude: 85.1376, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Vadodara', state: 'Gujarat', country: 'India', latitude: 22.3072, longitude: 73.1812, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', country: 'India', latitude: 28.6692, longitude: 77.4538, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Ludhiana', state: 'Punjab', country: 'India', latitude: 30.901, longitude: 75.8573, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Agra', state: 'Uttar Pradesh', country: 'India', latitude: 27.1767, longitude: 78.0081, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Nashik', state: 'Maharashtra', country: 'India', latitude: 19.9975, longitude: 73.7898, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Faridabad', state: 'Haryana', country: 'India', latitude: 28.4089, longitude: 77.3178, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Meerut', state: 'Uttar Pradesh', country: 'India', latitude: 28.9845, longitude: 77.7064, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Rajkot', state: 'Gujarat', country: 'India', latitude: 22.3039, longitude: 70.8022, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Varanasi', state: 'Uttar Pradesh', country: 'India', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Ayodhya', state: 'Uttar Pradesh', country: 'India', latitude: 26.7922, longitude: 82.1998, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Haridwar', state: 'Uttarakhand', country: 'India', latitude: 29.9457, longitude: 78.1642, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Rishikesh', state: 'Uttarakhand', country: 'India', latitude: 30.0869, longitude: 78.2676, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Ujjain', state: 'Madhya Pradesh', country: 'India', latitude: 23.1765, longitude: 75.7885, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Mathura', state: 'Uttar Pradesh', country: 'India', latitude: 27.4924, longitude: 77.6737, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Vrindavan', state: 'Uttar Pradesh', country: 'India', latitude: 27.5806, longitude: 77.7006, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Tirupati', state: 'Andhra Pradesh', country: 'India', latitude: 13.6288, longitude: 79.4192, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Madurai', state: 'Tamil Nadu', country: 'India', latitude: 9.9252, longitude: 78.1198, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Puri', state: 'Odisha', country: 'India', latitude: 19.8135, longitude: 85.8312, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Amritsar', state: 'Punjab', country: 'India', latitude: 31.634, longitude: 74.8723, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Chandigarh', state: 'Punjab/Haryana', country: 'India', latitude: 30.7333, longitude: 76.7794, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Bhubaneswar', state: 'Odisha', country: 'India', latitude: 20.2961, longitude: 85.8245, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Guwahati', state: 'Assam', country: 'India', latitude: 26.1445, longitude: 91.7362, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Kochi', state: 'Kerala', country: 'India', latitude: 9.9312, longitude: 76.2673, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Thiruvananthapuram', state: 'Kerala', country: 'India', latitude: 8.5241, longitude: 76.9366, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Kozhikode', state: 'Kerala', country: 'India', latitude: 11.2588, longitude: 75.7804, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Coimbatore', state: 'Tamil Nadu', country: 'India', latitude: 11.0168, longitude: 76.9558, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Dehradun', state: 'Uttarakhand', country: 'India', latitude: 30.3165, longitude: 78.0322, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Shimla', state: 'Himachal Pradesh', country: 'India', latitude: 31.1048, longitude: 77.1734, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Srinagar', state: 'Jammu and Kashmir', country: 'India', latitude: 34.0837, longitude: 74.7973, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Jammu', state: 'Jammu and Kashmir', country: 'India', latitude: 32.7266, longitude: 74.857, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Ranchi', state: 'Jharkhand', country: 'India', latitude: 23.3441, longitude: 85.3096, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Jamshedpur', state: 'Jharkhand', country: 'India', latitude: 22.8046, longitude: 86.2029, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Raipur', state: 'Chhattisgarh', country: 'India', latitude: 21.2514, longitude: 81.6296, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Gwalior', state: 'Madhya Pradesh', country: 'India', latitude: 26.2183, longitude: 78.1828, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Jabalpur', state: 'Madhya Pradesh', country: 'India', latitude: 23.1815, longitude: 79.9864, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Jodhpur', state: 'Rajasthan', country: 'India', latitude: 26.2389, longitude: 73.0243, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Udaipur', state: 'Rajasthan', country: 'India', latitude: 24.5854, longitude: 73.7125, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Kota', state: 'Rajasthan', country: 'India', latitude: 25.2138, longitude: 75.8648, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Surat', state: 'Gujarat', country: 'India', latitude: 21.1702, longitude: 72.8311, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Prayagraj (Allahabad)', state: 'Uttar Pradesh', country: 'India', latitude: 25.4358, longitude: 81.8463, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Noida', state: 'Uttar Pradesh', country: 'India', latitude: 28.5355, longitude: 77.391, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Gurugram', state: 'Haryana', country: 'India', latitude: 28.4595, longitude: 77.0266, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Navi Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.033, longitude: 73.0297, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Gorakhpur', state: 'Uttar Pradesh', country: 'India', latitude: 26.7606, longitude: 83.3732, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Patiala', state: 'Punjab', country: 'India', latitude: 30.3398, longitude: 76.3869, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Jalandhar', state: 'Punjab', country: 'India', latitude: 31.326, longitude: 75.5762, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Bareilly', state: 'Uttar Pradesh', country: 'India', latitude: 28.367, longitude: 79.4304, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Aligarh', state: 'Uttar Pradesh', country: 'India', latitude: 27.8974, longitude: 78.088, timezone: 'Asia/Kolkata', isGoogleVerified: true },
  { name: 'Moradabad', state: 'Uttar Pradesh', country: 'India', latitude: 28.8351, longitude: 78.7747, timezone: 'Asia/Kolkata', isGoogleVerified: true },

  // Global Registered Metros
  { name: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai', isGoogleVerified: true },
  { name: 'Abu Dhabi', country: 'United Arab Emirates', latitude: 24.4539, longitude: 54.3773, timezone: 'Asia/Dubai', isGoogleVerified: true },
  { name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London', isGoogleVerified: true },
  { name: 'Manchester', country: 'United Kingdom', latitude: 53.4808, longitude: -2.2426, timezone: 'Europe/London', isGoogleVerified: true },
  { name: 'New York', state: 'NY', country: 'United States', latitude: 40.7128, longitude: -74.006, timezone: 'America/New_York', isGoogleVerified: true },
  { name: 'San Francisco', state: 'CA', country: 'United States', latitude: 37.7749, longitude: -122.4194, timezone: 'America/Los_Angeles', isGoogleVerified: true },
  { name: 'Los Angeles', state: 'CA', country: 'United States', latitude: 34.0522, longitude: -118.2437, timezone: 'America/Los_Angeles', isGoogleVerified: true },
  { name: 'Chicago', state: 'IL', country: 'United States', latitude: 41.8781, longitude: -87.6298, timezone: 'America/Chicago', isGoogleVerified: true },
  { name: 'Dallas', state: 'TX', country: 'United States', latitude: 32.7767, longitude: -96.797, timezone: 'America/Chicago', isGoogleVerified: true },
  { name: 'Houston', state: 'TX', country: 'United States', latitude: 29.7604, longitude: -95.3698, timezone: 'America/Chicago', isGoogleVerified: true },
  { name: 'Seattle', state: 'WA', country: 'United States', latitude: 47.6062, longitude: -122.3321, timezone: 'America/Los_Angeles', isGoogleVerified: true },
  { name: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 'Asia/Singapore', isGoogleVerified: true },
  { name: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.139, longitude: 101.6869, timezone: 'Asia/Kuala_Lumpur', isGoogleVerified: true },
  { name: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney', isGoogleVerified: true },
  { name: 'Melbourne', country: 'Australia', latitude: -37.8136, longitude: 144.9631, timezone: 'Australia/Melbourne', isGoogleVerified: true },
  { name: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timezone: 'America/Toronto', isGoogleVerified: true },
  { name: 'Vancouver', country: 'Canada', latitude: 49.2827, longitude: -123.1207, timezone: 'America/Vancouver', isGoogleVerified: true },
  { name: 'Frankfurt', country: 'Germany', latitude: 50.1109, longitude: 8.6821, timezone: 'Europe/Berlin', isGoogleVerified: true },
  { name: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.405, timezone: 'Europe/Berlin', isGoogleVerified: true },
  { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris', isGoogleVerified: true },
  { name: 'Zurich', country: 'Switzerland', latitude: 47.3769, longitude: 8.5417, timezone: 'Europe/Zurich', isGoogleVerified: true },
  { name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo', isGoogleVerified: true },
  { name: 'Kathmandu', country: 'Nepal', latitude: 27.7172, longitude: 85.324, timezone: 'Asia/Kathmandu', isGoogleVerified: true },
  { name: 'Colombo', country: 'Sri Lanka', latitude: 6.9271, longitude: 79.8612, timezone: 'Asia/Colombo', isGoogleVerified: true },
];

export function searchCities(query: string): CityLocation[] {
  if (!query || !query.trim()) return POPULAR_CITIES.slice(0, 10);
  const q = query.toLowerCase().trim();
  return POPULAR_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      (c.state && c.state.toLowerCase().includes(q)) ||
      c.country.toLowerCase().includes(q)
  );
}

/**
 * Live Google / Open Geocoding resolution for ANY registered location in the world
 */
export async function fetchGoogleRegisteredLocations(query: string): Promise<CityLocation[]> {
  if (!query || query.trim().length < 2) {
    return searchCities(query);
  }

  const localMatches = searchCities(query);

  try {
    // 1. Try Next.js server geocode proxy
    const localApiRes = await fetch(`/api/geocode?q=${encodeURIComponent(query.trim())}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (localApiRes.ok) {
      const data = await localApiRes.json();
      if (data.results && Array.isArray(data.results) && data.results.length > 0) {
        const combined = [...data.results];
        for (const loc of localMatches) {
          if (!combined.some((c) => c.name.toLowerCase() === loc.name.toLowerCase())) {
            combined.push(loc);
          }
        }
        return combined.slice(0, 12);
      }
    }
  } catch (e) {
    // Try direct external fallback
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2600);

    const endpoint = `https://photon.komoot.io/api/?q=${encodeURIComponent(query.trim())}&limit=8`;

    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.features && Array.isArray(data.features) && data.features.length > 0) {
        const liveResults: CityLocation[] = data.features.map((feat: any) => {
          const props = feat.properties || {};
          const coords = feat.geometry?.coordinates || [0, 0];
          return {
            name: props.name || props.city || query,
            state: props.state || props.county,
            country: props.country || 'Global',
            latitude: coords[1],
            longitude: coords[0],
            timezone: 'Asia/Kolkata',
            isGoogleVerified: true,
          };
        });

        const combined = [...liveResults];
        for (const loc of localMatches) {
          if (!combined.some((c) => c.name.toLowerCase() === loc.name.toLowerCase())) {
            combined.push(loc);
          }
        }
        return combined.slice(0, 12);
      }
    }
  } catch (err) {
    // Fall back to local database
  }

  return localMatches;
}
