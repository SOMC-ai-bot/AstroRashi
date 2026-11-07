'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CityLocation, POPULAR_CITIES, fetchGoogleRegisteredLocations } from '@/lib/astrology-engine/location-service';
import { MapPin, Search, Compass, Globe, Loader2, AlertCircle, CheckCircle, X, ChevronDown, Check } from 'lucide-react';

export interface LocationPickerProps {
  selectedCity?: CityLocation;
  onSelectCity?: (city: CityLocation) => void;
  value?: string;
  onSelect?: (city: CityLocation) => void;
  label?: string;
  placeholder?: string;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  selectedCity,
  onSelectCity,
  value,
  onSelect,
  label,
  placeholder = 'Type city, town, or location...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'india' | 'global' | 'spiritual'>('all');
  const [results, setResults] = useState<CityLocation[]>(POPULAR_CITIES);
  const [isLoading, setIsLoading] = useState(false);
  const [statusNotice, setStatusNotice] = useState<{ type: 'info' | 'success' | 'error'; message: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine current active city
  const currentCity: CityLocation = useMemo(() => {
    if (selectedCity) return selectedCity;
    if (value) {
      const match = POPULAR_CITIES.find((c) => value.toLowerCase().includes(c.name.toLowerCase()));
      if (match) return match;
      return {
        name: value.split(',')[0]?.trim() || value,
        country: value.split(',')[1]?.trim() || 'India',
        latitude: 28.6139,
        longitude: 77.209,
        timezone: 'Asia/Kolkata',
        isGoogleVerified: true,
      };
    }
    return POPULAR_CITIES[0];
  }, [selectedCity, value]);

  // Input text state: reflects selected location or what user is actively typing
  const [inputValue, setInputValue] = useState<string>(
    value || `${currentCity.name}, ${currentCity.state ? `${currentCity.state}, ` : ''}${currentCity.country}`
  );

  // Sync external value changes
  useEffect(() => {
    if (value) {
      setInputValue(value);
    } else if (selectedCity) {
      setInputValue(
        `${selectedCity.name}, ${selectedCity.state ? `${selectedCity.state}, ` : ''}${selectedCity.country}`
      );
    }
  }, [value, selectedCity]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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
      const spiritualCities = [
        'Varanasi', 'Ayodhya', 'Haridwar', 'Rishikesh', 'Ujjain',
        'Mathura', 'Vrindavan', 'Tirupati', 'Madurai', 'Puri',
        'Amritsar', 'Prayagraj (Allahabad)', 'Dehradun'
      ];
      return POPULAR_CITIES.filter((c) => spiritualCities.includes(c.name));
    }
    return POPULAR_CITIES.filter((c) => c.country === 'India');
  }, [categoryFilter]);

  // Live Geocoding Query with Debounce
  useEffect(() => {
    if (!isOpen) return;

    const trimmed = inputValue.trim();
    if (!trimmed) {
      setResults(filteredLocalList);
      return;
    }

    // First check local matches immediately for zero lag
    const localMatches = POPULAR_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(trimmed.toLowerCase()) ||
        (c.state && c.state.toLowerCase().includes(trimmed.toLowerCase())) ||
        c.country.toLowerCase().includes(trimmed.toLowerCase())
    );

    if (localMatches.length > 0) {
      setResults(localMatches);
    }

    setIsLoading(true);
    const handler = setTimeout(async () => {
      const data = await fetchGoogleRegisteredLocations(trimmed);
      if (data && data.length > 0) {
        setResults(data);
      } else if (localMatches.length > 0) {
        setResults(localMatches);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(handler);
  }, [inputValue, isOpen, filteredLocalList]);

  const handleSelect = (city: CityLocation) => {
    const formatted = `${city.name}, ${city.state ? `${city.state}, ` : ''}${city.country}`;
    setInputValue(formatted);
    if (onSelectCity) onSelectCity(city);
    if (onSelect) onSelect(city);
    setIsOpen(false);
  };

  const handleUseTypedCustom = () => {
    const name = inputValue.trim();
    if (!name) return;
    const customCity: CityLocation = {
      name,
      country: 'Custom Location',
      latitude: results.length > 0 ? results[0].latitude : currentCity.latitude || 28.6139,
      longitude: results.length > 0 ? results[0].longitude : currentCity.longitude || 77.209,
      timezone: 'Asia/Kolkata',
      isGoogleVerified: true,
    };
    handleSelect(customCity);
  };

  const handleDetectLocation = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatusNotice({
        type: 'error',
        message: 'Geolocation is not supported by your browser. Please type your city name manually.',
      });
      return;
    }

    setIsLoading(true);
    setStatusNotice({ type: 'info', message: 'Detecting GPS coordinates...' });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const res = await fetch(`/api/geocode?lat=${lat}&lon=${lon}`);
          if (res.ok) {
            const data = await res.json();
            if (data.results && data.results.length > 0) {
              const detected = data.results[0];
              handleSelect(detected);
              setIsLoading(false);
              setStatusNotice({
                type: 'success',
                message: `Location resolved: ${detected.name}, ${detected.country} (${lat.toFixed(2)}°, ${lon.toFixed(2)}°).`,
              });
              return;
            }
          }
        } catch (err) {
          console.error('Reverse geocode error:', err);
        }

        const fallbackCity: CityLocation = {
          name: `GPS Location (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
          country: 'Local',
          latitude: lat,
          longitude: lon,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
          isGoogleVerified: true,
        };
        handleSelect(fallbackCity);
        setIsLoading(false);
        setStatusNotice({
          type: 'success',
          message: `GPS Coordinates acquired: ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E.`,
        });
      },
      (error) => {
        setIsLoading(false);
        let msg = 'Could not acquire GPS position. Please type city name manually.';
        if (error.code === 1) {
          msg = 'Location permission was denied. Please type city name manually.';
        }
        setStatusNotice({ type: 'error', message: msg });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    // Smooth scroll parent container if needed so dropdown is visible
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0) {
        handleSelect(results[0]);
      } else {
        handleUseTypedCustom();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        position: 'relative',
        width: '100%',
      }}
    >
      {label && (
        <label
          style={{
            fontSize: '12.5px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{label}</span>
          <span
            style={{
              fontSize: '11px',
              color: '#FBBF24',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
            }}
          >
            {currentCity.latitude.toFixed(2)}°, {currentCity.longitude.toFixed(2)}°
          </span>
        </label>
      )}

      {/* Main Interactive Direct-Type Input Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          padding: '8px 12px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: isOpen ? '1.5px solid #F59E0B' : '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 'var(--radius-md)',
          boxShadow: isOpen ? '0 0 16px rgba(245, 158, 11, 0.25)' : 'none',
          transition: 'all 0.15s ease',
        }}
      >
        <MapPin size={17} color="#F59E0B" style={{ flexShrink: 0 }} />

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '13.5px',
            fontWeight: 500,
            width: '100%',
          }}
        />

        {isLoading ? (
          <Loader2 size={16} color="#F59E0B" className="animate-spin" style={{ flexShrink: 0 }} />
        ) : inputValue ? (
          <button
            type="button"
            onClick={() => {
              setInputValue('');
              inputRef.current?.focus();
              setIsOpen(true);
            }}
            title="Clear text"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={15} />
          </button>
        ) : null}

        {/* GPS Quick Button */}
        <button
          type="button"
          onClick={handleDetectLocation}
          title="Detect my current location via GPS"
          style={{
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38BDF8',
            borderRadius: '6px',
            padding: '4px 7px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <Compass size={13} />
          <span>GPS</span>
        </button>

        {/* Dropdown Toggle Chevron */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) inputRef.current?.focus();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s ease',
          }}
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {/* GPS Status Notice */}
      {statusNotice && (
        <div
          role="status"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            padding: '7px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11.5px',
            backgroundColor:
              statusNotice.type === 'error'
                ? 'rgba(239, 68, 68, 0.12)'
                : statusNotice.type === 'success'
                ? 'rgba(16, 185, 129, 0.12)'
                : 'rgba(56, 189, 248, 0.12)',
            border: `1px solid ${
              statusNotice.type === 'error'
                ? 'rgba(239, 68, 68, 0.3)'
                : statusNotice.type === 'success'
                ? 'rgba(16, 185, 129, 0.3)'
                : 'rgba(56, 189, 248, 0.3)'
            }`,
            color:
              statusNotice.type === 'error'
                ? '#FCA5A5'
                : statusNotice.type === 'success'
                ? '#6EE7B7'
                : '#7DD3FC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {statusNotice.type === 'error' ? (
              <AlertCircle size={13} />
            ) : statusNotice.type === 'success' ? (
              <CheckCircle size={13} />
            ) : (
              <Loader2 size={13} className="animate-spin" />
            )}
            <span>{statusNotice.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusNotice(null)}
            style={{ background: 'none', border: 'none', color: 'currentColor', opacity: 0.7, cursor: 'pointer' }}
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Dropdown Suggestions Window */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 99999,
            backgroundColor: '#0D0B16',
            border: '1.5px solid rgba(245, 158, 11, 0.45)',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 25px rgba(245, 158, 11, 0.18)',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'modalFadeIn 150ms ease',
          }}
        >
          {/* Category Filter Chips */}
          <div style={{ display: 'flex', gap: '5px', overflowX: 'auto', paddingBottom: '3px' }}>
            {(
              [
                { id: 'all', label: `All Cities (${POPULAR_CITIES.length})` },
                { id: 'india', label: 'India' },
                { id: 'spiritual', label: 'Pilgrimage' },
                { id: 'global', label: 'Global' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                style={{
                  padding: '4px 9px',
                  borderRadius: '16px',
                  border: categoryFilter === tab.id ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: categoryFilter === tab.id ? 'rgba(245, 158, 11, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                  color: categoryFilter === tab.id ? '#FBBF24' : 'var(--text-muted)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Option to Directly Use Whatever User Typed */}
          {inputValue.trim().length > 0 && (
            <button
              type="button"
              onClick={handleUseTypedCustom}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px dashed #F59E0B',
                background: 'rgba(245, 158, 11, 0.12)',
                color: '#FBBF24',
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: 600,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="#F59E0B" />
                <span>Use Typed: &ldquo;{inputValue.trim()}&rdquo;</span>
              </div>
              <span
                style={{
                  fontSize: '10.5px',
                  background: 'rgba(245, 158, 11, 0.25)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                Select
              </span>
            </button>
          )}

          {/* Scrollable Results List - with self-contained scrolling so parent modal doesn't scroll */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '190px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              paddingRight: '4px',
              overscrollBehavior: 'contain',
              scrollbarWidth: 'thin',
            }}
          >
            {results.length === 0 ? (
              <div style={{ padding: '14px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                No registered city found. Click &ldquo;Use Typed&rdquo; above to set &ldquo;{inputValue.trim()}&rdquo;.
              </div>
            ) : (
              results.map((city, idx) => {
                const isSelected =
                  currentCity.name.toLowerCase() === city.name.toLowerCase() &&
                  currentCity.country.toLowerCase() === city.country.toLowerCase();
                return (
                  <button
                    key={`${city.name}-${city.country}-${idx}`}
                    type="button"
                    onClick={() => handleSelect(city)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: isSelected ? 'rgba(245, 158, 11, 0.22)' : 'transparent',
                      color: isSelected ? '#FBBF24' : 'var(--text-primary)',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.12s ease',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {city.name}
                        {isSelected && <Check size={12} color="#FBBF24" />}
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
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
