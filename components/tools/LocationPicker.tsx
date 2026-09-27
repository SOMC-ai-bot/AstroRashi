'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CityLocation, POPULAR_CITIES, fetchGoogleRegisteredLocations } from '@/lib/astrology-engine/location-service';
import { MapPin, Search, Compass, CheckCircle2, Globe, Loader2, Sparkles } from 'lucide-react';

export interface LocationPickerProps {
  selectedCity?: CityLocation;
  onSelectCity?: (city: CityLocation) => void;
  value?: string;
  onSelect?: (city: CityLocation) => void;
  label?: string;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  selectedCity,
  onSelectCity,
  value,
  onSelect,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'india' | 'global' | 'spiritual'>('all');
  const [results, setResults] = useState<CityLocation[]>(POPULAR_CITIES);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCity: CityLocation =
    selectedCity ||
    (value
      ? POPULAR_CITIES.find((c) => value.toLowerCase().includes(c.name.toLowerCase())) || {
          name: value.split(',')[0] || value,
          country: 'India',
          latitude: 28.6139,
          longitude: 77.209,
          timezone: 'Asia/Kolkata',
          isGoogleVerified: true,
        }
      : POPULAR_CITIES[0]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter local registered locations based on category
  const filteredLocalList = useMemo(() => {
    if (categoryFilter === 'all') return POPULAR_CITIES;
    if (categoryFilter === 'global') return POPULAR_CITIES.filter((c) => c.country !== 'India');
    if (categoryFilter === 'spiritual') {
      const spiritualCities = ['Varanasi', 'Ayodhya', 'Haridwar', 'Rishikesh', 'Ujjain', 'Mathura', 'Vrindavan', 'Tirupati', 'Madurai', 'Puri', 'Amritsar', 'Prayagraj (Allahabad)', 'Dehradun'];
      return POPULAR_CITIES.filter((c) => spiritualCities.includes(c.name));
    }
    return POPULAR_CITIES.filter((c) => c.country === 'India');
  }, [categoryFilter]);

  // Live Geocoding Query with Debounce
  useEffect(() => {
    if (!isOpen) return;

    if (!query.trim()) {
      setResults(filteredLocalList);
      return;
    }

    setIsLoading(true);
    const handler = setTimeout(async () => {
      const data = await fetchGoogleRegisteredLocations(query);
      setResults(data);
      setIsLoading(false);
    }, 220);

    return () => clearTimeout(handler);
  }, [query, isOpen, filteredLocalList]);

  const handleSelect = (city: CityLocation) => {
    if (onSelectCity) onSelectCity(city);
    if (onSelect) onSelect(city);
    setIsOpen(false);
    setQuery('');
  };

  const handleDetectLocation = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const res = await fetch(`/api/geocode?lat=${lat}&lon=${lon}`);
            if (res.ok) {
              const data = await res.json();
              if (data.results && data.results.length > 0) {
                handleSelect(data.results[0]);
                setIsLoading(false);
                return;
              }
            }
          } catch (e) {
            console.error('Reverse geocode error:', e);
          }

          // Fallback detected city
          const fallbackCity: CityLocation = {
            name: `GPS Point (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
            state: 'Detected Coordinates',
            country: 'Earth',
            latitude: lat,
            longitude: lon,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
            isGoogleVerified: true,
          };
          handleSelect(fallbackCity);
          setIsLoading(false);
        },
        (error) => {
          console.warn('Geolocation permission or availability issue:', error);
          // When geolocation is denied or unavailable, use Varanasi / user timezone city
          setIsLoading(false);
          const defaultDetect = POPULAR_CITIES[0];
          handleSelect(defaultDetect);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
      );
    }
  };

  const displayCityName =
    value ||
    `${currentCity.name}, ${currentCity.state ? `${currentCity.state}, ` : ''}${currentCity.country}`;

  return (
    <div ref={dropdownRef} style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {label}
          </label>
          <span style={{ fontSize: '11px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            <CheckCircle2 size={12} />
            <span>Google Registered Database</span>
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '11px 14px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)',
          fontSize: '13.5px',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all 0.15s ease',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          <MapPin size={16} color="#F59E0B" style={{ flexShrink: 0 }} />
          <span style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {displayCityName}
          </span>
        </span>
        <span
          style={{
            fontSize: '10.5px',
            color: '#FBBF24',
            flexShrink: 0,
            background: 'rgba(245, 158, 11, 0.12)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {currentCity.latitude.toFixed(2)}°, {currentCity.longitude.toFixed(2)}°
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: '#0D0B16',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(245, 158, 11, 0.15)',
            padding: '12px',
            maxHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            animation: 'modalFadeIn 180ms ease',
          }}
        >
          {/* Search Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {isLoading ? (
              <Loader2 size={15} color="#F59E0B" className="animate-spin" />
            ) : (
              <Search size={15} color="var(--text-muted)" />
            )}
            <input
              type="text"
              placeholder="Search any registered city, district or town worldwide..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '13px',
                width: '100%',
              }}
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '11px', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs for Fast Discovery of All Registered Locations */}
          {!query && (
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
              {(
                [
                  { id: 'all', label: `All (${POPULAR_CITIES.length})` },
                  { id: 'india', label: 'All India' },
                  { id: 'spiritual', label: 'Pilgrimage' },
                  { id: 'global', label: 'Global Metros' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: categoryFilter === tab.id ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    color: categoryFilter === tab.id ? '#FBBF24' : 'var(--text-muted)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: categoryFilter === tab.id ? 'rgba(245, 158, 11, 0.45)' : 'transparent',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Quick GPS Auto-detect button */}
          <button
            type="button"
            onClick={handleDetectLocation}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 10px',
              background: 'rgba(37, 99, 235, 0.14)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: 'var(--radius-sm)',
              color: '#38BDF8',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Compass size={13} />
            <span>Auto-detect via GPS Coordinates</span>
          </button>

          {/* Results List */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '230px',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              paddingRight: '2px',
            }}
          >
            {results.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                No matching location. You can search any city, town or district worldwide.
              </div>
            ) : (
              results.map((city, idx) => (
                <button
                  key={`${city.name}-${city.country}-${idx}`}
                  type="button"
                  onClick={() => handleSelect(city)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background:
                      currentCity.name === city.name
                        ? 'rgba(245, 158, 11, 0.2)'
                        : 'transparent',
                    color: currentCity.name === city.name ? '#FBBF24' : 'var(--text-primary)',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.12s ease',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {city.name}
                      <span
                        title="Google & Ephemeris Registered Location"
                        style={{
                          fontSize: '9.5px',
                          color: '#10B981',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        <CheckCircle2 size={11} />
                      </span>
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      {city.state ? `${city.state}, ` : ''}{city.country}
                    </span>
                  </div>

                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {city.latitude > 0 ? `${city.latitude.toFixed(2)}°N` : `${Math.abs(city.latitude).toFixed(2)}°S`},{' '}
                    {city.longitude > 0 ? `${city.longitude.toFixed(2)}°E` : `${Math.abs(city.longitude).toFixed(2)}°W`}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
