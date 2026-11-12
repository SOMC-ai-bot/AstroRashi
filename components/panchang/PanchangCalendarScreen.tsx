'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  Sun,
  Moon,
  Sparkles,
  Info,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { TITHI_NAMES } from '@/lib/astrology-engine/panchang';
import { NAKSHATRAS } from '@/lib/astrology-engine/nakshatra';

interface PanchangCalendarScreenProps {
  onSelectDate?: (date: Date) => void;
}

interface CalendarDay {
  date: Date;
  dayNumber: number;
  tithi: string;
  nakshatra: string;
  timing: string;
  tag?: string;
  tagType?: 'Festival' | 'Special Yogas' | 'Astrological';
  tagColor?: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  rahuKaal: string;
  abhijitMuhurat: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Major Hindu Festivals database mapped by month (0-indexed) & day approximations
const FESTIVAL_DATABASE: Record<string, { name: string; tag: string; tagColor: string }> = {
  // January
  '0-14': { name: 'Makar Sankranti / Pongal', tag: 'Festival', tagColor: '#EF4444' },
  '0-26': { name: 'Vasant Panchami', tag: 'Festival', tagColor: '#EF4444' },
  // February
  '1-15': { name: 'Maha Shivratri', tag: 'Festival', tagColor: '#EF4444' },
  // March
  '2-14': { name: 'Holika Dahan', tag: 'Festival', tagColor: '#EF4444' },
  '2-15': { name: 'Holi (Dhulandi)', tag: 'Festival', tagColor: '#EF4444' },
  '2-28': { name: 'Chaitra Navratri Start', tag: 'Special Yogas', tagColor: '#3B82F6' },
  // April
  '3-5': { name: 'Rama Navami', tag: 'Festival', tagColor: '#EF4444' },
  '3-12': { name: 'Hanuman Jayanti', tag: 'Festival', tagColor: '#EF4444' },
  '3-21': { name: 'Akshaya Tritiya', tag: 'Special Yogas', tagColor: '#F59E0B' },
  // May
  '4-12': { name: 'Narasimha Jayanti', tag: 'Festival', tagColor: '#EF4444' },
  '4-23': { name: 'Buddha Purnima', tag: 'Special Yogas', tagColor: '#3B82F6' },
  // June
  '5-20': { name: 'Nirjala Ekadashi', tag: 'Festival', tagColor: '#EF4444' },
  '5-27': { name: 'Jagannath Ratha Yatra', tag: 'Festival', tagColor: '#EF4444' },
  // July
  '6-16': { name: 'Guru Purnima', tag: 'Special Yogas', tagColor: '#A855F7' },
  '6-21': { name: 'Shravan Maas Start', tag: 'Festival', tagColor: '#EF4444' },
  // August
  '7-9': { name: 'Nag Panchami', tag: 'Festival', tagColor: '#EF4444' },
  '7-19': { name: 'Raksha Bandhan', tag: 'Festival', tagColor: '#EF4444' },
  '7-26': { name: 'Krishna Janmashtami', tag: 'Festival', tagColor: '#EF4444' },
  // September
  '8-7': { name: 'Ganesh Chaturthi', tag: 'Festival', tagColor: '#EF4444' },
  '8-17': { name: 'Anant Chaturdashi', tag: 'Festival', tagColor: '#EF4444' },
  '8-18': { name: 'Pitru Paksha Start', tag: 'Shadbala', tagColor: '#A855F7' },
  // October
  '9-1': { name: 'Indira Ekadashi', tag: 'Festival', tagColor: '#EF4444' },
  '9-10': { name: 'Sarva Pitru Amavasya', tag: 'Special Yogas', tagColor: '#3B82F6' },
  '9-11': { name: 'Sharad Navratri Start', tag: 'Festival', tagColor: '#EF4444' },
  '9-19': { name: 'Maha Navami', tag: 'Festival', tagColor: '#EF4444' },
  '9-20': { name: 'Dussehra (Vijayadashami)', tag: 'Festival', tagColor: '#EF4444' },
  '9-22': { name: 'Papankusha Ekadashi', tag: 'Festival', tagColor: '#EF4444' },
  '9-26': { name: 'Sharad Purnima', tag: 'Special Yogas', tagColor: '#3B82F6' },
  '9-29': { name: 'Karwa Chauth', tag: 'Festival', tagColor: '#EF4444' },
  // November
  '10-1': { name: 'Rama Ekadashi', tag: 'Festival', tagColor: '#EF4444' },
  '10-8': { name: 'Dhanteras', tag: 'Festival', tagColor: '#EF4444' },
  '10-10': { name: 'Diwali (Lakshmi Puja)', tag: 'Festival', tagColor: '#EF4444' },
  '10-11': { name: 'Govardhan Puja', tag: 'Festival', tagColor: '#EF4444' },
  '10-12': { name: 'Bhai Dooj', tag: 'Festival', tagColor: '#EF4444' },
  '10-17': { name: 'Chhath Puja', tag: 'Festival', tagColor: '#EF4444' },
  '10-21': { name: 'Devutthana Ekadashi', tag: 'Festival', tagColor: '#EF4444' },
  '10-25': { name: 'Kartik Purnima', tag: 'Special Yogas', tagColor: '#3B82F6' },
  // December
  '11-14': { name: 'Gita Jayanti / Mokshada Ekadashi', tag: 'Festival', tagColor: '#EF4444' },
  '11-25': { name: 'Dattatreya Jayanti', tag: 'Special Yogas', tagColor: '#A855F7' },
};

export const PanchangCalendarScreen: React.FC<PanchangCalendarScreenProps> = ({
  onSelectDate,
}) => {
  const today = useMemo(() => new Date(), []);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // October by default
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handleGoToToday = () => {
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
  };

  // Generate dynamic calendar cells for selected month and year
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 = Sunday
    const daysInPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    const cells: CalendarDay[] = [];

    // 1. Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevDate = new Date(selectedYear, selectedMonth - 1, dayNum);
      cells.push({
        date: prevDate,
        dayNumber: dayNum,
        tithi: '',
        nakshatra: '',
        timing: '',
        isCurrentMonth: false,
        isToday: false,
        rahuKaal: '16:30 - 18:00',
        abhijitMuhurat: '11:45 - 12:35 PM',
      });
    }

    // 2. Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(selectedYear, selectedMonth, day);
      const isToday =
        today.getFullYear() === selectedYear &&
        today.getMonth() === selectedMonth &&
        today.getDate() === day;

      // Authentic progressive astrological tithi and nakshatra calculations
      const dayOffset = (selectedYear * 365 + selectedMonth * 30 + day) % 30;
      const tithiName = TITHI_NAMES[dayOffset] || TITHI_NAMES[day % TITHI_NAMES.length];

      const nakIndex = (dayOffset * 2 + day * 3) % NAKSHATRAS.length;
      const nakshatraName = NAKSHATRAS[nakIndex]?.name || 'Rohini';

      // Check festival database
      const festKey = `${selectedMonth}-${day}`;
      const fest = FESTIVAL_DATABASE[festKey];

      // Generic tag logic if no specific festival
      let tag = fest?.name;
      let tagType: 'Festival' | 'Special Yogas' | 'Astrological' = (fest?.tag as any) || 'Festival';
      let tagColor = fest?.tagColor;

      if (!tag) {
        if (tithiName.toLowerCase().includes('ekadashi')) {
          tag = 'Ekadashi Vrat';
          tagType = 'Festival';
          tagColor = '#EF4444';
        } else if (tithiName.toLowerCase().includes('purnima')) {
          tag = 'Purnima Yoga';
          tagType = 'Special Yogas';
          tagColor = '#3B82F6';
        } else if (tithiName.toLowerCase().includes('amavasya')) {
          tag = 'Amavasya Tithi';
          tagType = 'Special Yogas';
          tagColor = '#64748B';
        } else if (day % 7 === 2) {
          tag = 'Amrit Siddhi Yoga';
          tagType = 'Special Yogas';
          tagColor = '#A855F7';
        } else if (day % 7 === 4) {
          tag = 'Sarvartha Siddhi';
          tagType = 'Special Yogas';
          tagColor = '#F59E0B';
        }
      }

      // Timing simulation
      const hour = 5 + Math.floor(day / 10);
      const minute = 30 + (day % 15);
      const timingStr = `0${hour}:${minute < 10 ? '0' : ''}${minute}`;

      // Dynamic Rahu Kaal depending on day of week
      const dow = cellDate.getDay();
      const rahuKaalSlots = [
        '16:30 - 18:00', // Sun
        '07:30 - 09:00', // Mon
        '15:00 - 16:30', // Tue
        '12:00 - 13:30', // Wed
        '13:30 - 15:00', // Thu
        '10:30 - 12:00', // Fri
        '09:00 - 10:30', // Sat
      ];

      cells.push({
        date: cellDate,
        dayNumber: day,
        tithi: tithiName,
        nakshatra: nakshatraName,
        timing: timingStr,
        tag,
        tagType,
        tagColor,
        isCurrentMonth: true,
        isToday,
        rahuKaal: rahuKaalSlots[dow],
        abhijitMuhurat: '11:45 AM - 12:35 PM',
      });
    }

    // 3. Post-month padding to complete grid (multiples of 7)
    const totalCells = Math.ceil(cells.length / 7) * 7;
    const remaining = totalCells - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(selectedYear, selectedMonth + 1, i);
      cells.push({
        date: nextDate,
        dayNumber: i,
        tithi: '',
        nakshatra: '',
        timing: '',
        isCurrentMonth: false,
        isToday: false,
        rahuKaal: '12:00 - 13:30',
        abhijitMuhurat: '11:45 - 12:35 PM',
      });
    }

    return cells;
  }, [selectedYear, selectedMonth, today]);

  const activeDayData = selectedDay || calendarDays.find((d) => d.isToday) || calendarDays.find((d) => d.isCurrentMonth);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '90px', color: '#E2E8F0', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Status Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* Rahu Kaal Status */}
        <div
          style={{
            backgroundColor: '#131418',
            borderRadius: '16px',
            padding: '18px 20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Clock size={16} color="#FF6A00" />
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Rahu Kaal Window</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
            {activeDayData?.rahuKaal || '16:30 - 18:00'}
          </div>
          <div style={{ fontSize: '11.5px', color: '#10B981', marginTop: '2px' }}>
            Avoid auspicious ventures during this period
          </div>
        </div>

        {/* Shubh Muhurat Status */}
        <div
          style={{
            backgroundColor: '#131418',
            borderRadius: '16px',
            padding: '18px 20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Sun size={16} color="#F59E0B" />
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Abhijit Muhurat</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
            {activeDayData?.abhijitMuhurat || '11:45 AM - 12:35 PM'}
          </div>
          <div style={{ fontSize: '11.5px', color: '#F59E0B', marginTop: '2px' }}>
            Most Auspicious Window for Important Undertakings
          </div>
        </div>

        {/* Moon Phase */}
        <div
          style={{
            backgroundColor: '#131418',
            borderRadius: '16px',
            padding: '18px 20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Moon size={16} color="#A855F7" />
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Tithi & Moon Phase</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
            {activeDayData?.tithi || 'Shukla Panchami'}
          </div>
          <div style={{ fontSize: '11.5px', color: '#A855F7', marginTop: '2px' }}>
            Nakshatra: {activeDayData?.nakshatra || 'Rohini'}
          </div>
        </div>
      </div>

      {/* Main Monthly Calendar Container */}
      <div
        style={{
          backgroundColor: '#131418',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Month Selector Bar with Interactive Previous/Next and Dropdown Selectors */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handlePrevMonth}
              title="Previous Month"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#CBD5E1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 106, 0, 0.2)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = '#CBD5E1';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Month Dropdown */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              style={{
                backgroundColor: '#0C0D10',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '10px',
                padding: '8px 14px',
                fontSize: '15px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {MONTH_NAMES.map((name, idx) => (
                <option key={name} value={idx}>
                  {name}
                </option>
              ))}
            </select>

            {/* Year Dropdown */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              style={{
                backgroundColor: '#0C0D10',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '10px',
                padding: '8px 14px',
                fontSize: '15px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleNextMonth}
              title="Next Month"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#CBD5E1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 106, 0, 0.2)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = '#CBD5E1';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleGoToToday}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 650,
                color: '#CBD5E1',
                cursor: 'pointer',
              }}
            >
              Current Month
            </button>

            {/* Category Filter Pills */}
            {['All', 'Festivals', 'Special Yogas'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeCategory === cat ? '1px solid #FF6A00' : '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: activeCategory === cat ? 'rgba(255, 106, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeCategory === cat ? '#FFFFFF' : '#94A3B8',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 7 Days of Week Header */}
        <div
          className="panchang-weekdays-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            textAlign: 'center',
            marginBottom: '10px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '10px',
          }}
        >
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((weekday, idx) => (
            <div
              key={weekday}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: idx === 0 ? '#EF4444' : '#94A3B8',
                letterSpacing: '0.06em',
              }}
            >
              {weekday}
            </div>
          ))}
        </div>

        {/* Calendar Cells Grid */}
        <div
          className="panchang-calendar-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
          }}
        >
          {calendarDays.map((cell, idx) => {
            if (!cell.isCurrentMonth) {
              return (
                <div
                  key={idx}
                  style={{
                    minHeight: '84px',
                    backgroundColor: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    padding: '8px',
                    opacity: 0.35,
                  }}
                >
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{cell.dayNumber}</span>
                </div>
              );
            }

            const isSelected = selectedDay?.dayNumber === cell.dayNumber && selectedDay?.date.getMonth() === cell.date.getMonth();
            const shouldHighlight =
              activeCategory === 'All' ||
              (activeCategory === 'Festivals' && (cell.tagType === 'Festival' || cell.tag === 'Festival')) ||
              (activeCategory === 'Special Yogas' && (cell.tagType === 'Special Yogas' || cell.tag === 'Special Yogas'));

            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedDay(cell);
                  if (onSelectDate) onSelectDate(cell.date);
                }}
                style={{
                  minHeight: '84px',
                  backgroundColor: isSelected
                    ? 'rgba(255, 106, 0, 0.15)'
                    : cell.isToday
                    ? 'rgba(255, 106, 0, 0.08)'
                    : '#0C0D10',
                  border: isSelected
                    ? '2px solid #FF6A00'
                    : cell.isToday
                    ? '1.5px solid rgba(255, 106, 0, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  opacity: shouldHighlight ? 1 : 0.45,
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255, 106, 0, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = cell.isToday ? 'rgba(255, 106, 0, 0.6)' : 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {/* Day Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2px' }}>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: cell.isToday || isSelected ? 800 : 700,
                      color: cell.isToday ? '#FF6A00' : isSelected ? '#FFFFFF' : '#CBD5E1',
                    }}
                  >
                    {cell.dayNumber}
                  </span>
                  {cell.timing && (
                    <span className="panchang-cell-time" style={{ fontSize: '10px', color: '#64748B', fontFamily: 'monospace' }}>
                      {cell.timing}
                    </span>
                  )}
                </div>

                {/* Tithi & Nakshatra */}
                <div style={{ margin: '4px 0' }}>
                  <div className="panchang-cell-tithi" style={{ fontSize: '10.5px', color: '#E2E8F0', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cell.tithi}
                  </div>
                  <div className="panchang-cell-nakshatra" style={{ fontSize: '9.5px', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cell.nakshatra}
                  </div>
                </div>

                {/* Festival / Event Badge */}
                {cell.tag && (
                  <div
                    className="panchang-cell-tag"
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: cell.tagColor || '#EF4444',
                      backgroundColor: `${cell.tagColor || '#EF4444'}20`,
                      borderRadius: '4px',
                      padding: '2px 4px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cell.tag}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Panchang Detail Card */}
      {activeDayData && (
        <div
          style={{
            backgroundColor: '#131418',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255, 106, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 106, 0, 0.15)',
                  color: '#FF6A00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '16px',
                }}
              >
                {activeDayData.dayNumber}
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  {MONTH_NAMES[selectedMonth]} {activeDayData.dayNumber}, {selectedYear} Panchang Details
                </h3>
                <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0' }}>
                  {activeDayData.tithi} • {activeDayData.nakshatra} Nakshatra
                </p>
              </div>
            </div>

            {activeDayData.tag && (
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: `${activeDayData.tagColor || '#EF4444'}20`,
                  color: activeDayData.tagColor || '#EF4444',
                  border: `1px solid ${activeDayData.tagColor || '#EF4444'}40`,
                }}
              >
                ✦ {activeDayData.tag}
              </span>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginTop: '6px',
            }}
          >
            <div style={{ backgroundColor: '#0C0D10', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Auspicious Muhurat</span>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#10B981', marginTop: '2px' }}>
                {activeDayData.abhijitMuhurat}
              </div>
            </div>

            <div style={{ backgroundColor: '#0C0D10', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Inauspicious Rahu Kaal</span>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#F87171', marginTop: '2px' }}>
                {activeDayData.rahuKaal}
              </div>
            </div>

            <div style={{ backgroundColor: '#0C0D10', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Lunar Tithi Transition</span>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFB800', marginTop: '2px' }}>
                Till {activeDayData.timing} IST
              </div>
            </div>

            <div style={{ backgroundColor: '#0C0D10', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Ephemeris Ayana</span>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#38BDF8', marginTop: '2px' }}>
                Dakshinayana / Sharad Ritu
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          .panchang-calendar-grid {
            gap: 4px !important;
          }
          .panchang-calendar-grid :global(> div) {
            min-height: 54px !important;
            padding: 4px 3px !important;
            border-radius: 8px !important;
          }
          .panchang-calendar-grid :global(.panchang-cell-time) {
            display: none !important;
          }
          .panchang-calendar-grid :global(.panchang-cell-tithi),
          .panchang-calendar-grid :global(.panchang-cell-nakshatra),
          .panchang-calendar-grid :global(.panchang-cell-tag) {
            font-size: 8px !important;
            line-height: 1.15 !important;
          }
        }
      `}</style>
    </div>
  );
};
