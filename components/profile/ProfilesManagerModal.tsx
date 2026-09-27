'use client';

import React, { useState } from 'react';
import { useAstrology } from '@/lib/state/astrology-context';
import { UserFamilyProfile } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LocationPicker } from '@/components/tools/LocationPicker';
import {
  X,
  Users,
  UserPlus,
  CheckCircle2,
  Trash2,
  Edit2,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react';

interface ProfilesManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfilesManagerModal: React.FC<ProfilesManagerModalProps> = ({ isOpen, onClose }) => {
  const { activeProfile, familyProfiles, switchActiveProfile, saveProfile, deleteProfile } = useAstrology();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formRelationship, setFormRelationship] = useState<UserFamilyProfile['relationship']>('Friend');
  const [formBirthDate, setFormBirthDate] = useState('1998-05-15');
  const [formBirthTime, setFormBirthTime] = useState('10:15');
  const [formBirthPlace, setFormBirthPlace] = useState('New Delhi, India');
  const [formLat, setFormLat] = useState(28.6139);
  const [formLon, setFormLon] = useState(77.209);
  const [formTz, setFormTz] = useState('Asia/Kolkata');
  const [formGender, setFormGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  if (!isOpen) return null;

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormName('');
    setFormRelationship('Friend');
    setFormBirthDate('1998-05-15');
    setFormBirthTime('10:15');
    setFormBirthPlace('New Delhi, India');
    setFormLat(28.6139);
    setFormLon(77.209);
    setFormTz('Asia/Kolkata');
    setFormGender('Male');
    setIsEditing(true);
  };

  const handleOpenEdit = (profile: UserFamilyProfile) => {
    setEditingId(profile.id);
    setFormName(profile.name);
    setFormRelationship(profile.relationship);
    setFormBirthDate(profile.birthDate);
    setFormBirthTime(profile.birthTime);
    setFormBirthPlace(profile.birthPlace);
    setFormLat(profile.latitude);
    setFormLon(profile.longitude);
    setFormTz(profile.timezone);
    setFormGender((profile.gender as any) || 'Male');
    setIsEditing(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newProfile: UserFamilyProfile = {
      id: editingId || `profile_${Date.now()}`,
      name: formName.trim(),
      relationship: formRelationship,
      isDefault: editingId ? familyProfiles.find((p) => p.id === editingId)?.isDefault || false : false,
      birthDate: formBirthDate,
      birthTime: formBirthTime,
      birthPlace: formBirthPlace,
      latitude: formLat,
      longitude: formLon,
      timezone: formTz,
      gender: formGender,
      astrologySystem: 'vedic',
      zodiacSystem: 'sidereal',
      houseSystem: 'whole-sign',
      preferredLanguage: 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveProfile(newProfile);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 10, 12, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '88vh',
          backgroundColor: '#1B1B1E',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(194, 78, 120, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={18} color="var(--accent-rose-light)" />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                My Profiles & Birth Charts
              </h3>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Store birth profiles for family, partner, and friends to switch charts instantly.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isEditing ? (
            <form onSubmit={handleSaveForm} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-primary)' }}>
                {editingId ? 'Edit Profile' : 'Add New Birth Profile'}
              </h4>

              <div>
                <label style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 12px',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Relationship
                  </label>
                  <select
                    value={formRelationship}
                    onChange={(e) => setFormRelationship(e.target.value as any)}
                    style={{
                      width: '100%',
                      backgroundColor: '#232328',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px 10px',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                      outline: 'none',
                    }}
                  >
                    <option value="Me">Me</option>
                    <option value="Spouse">Spouse / Partner</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Gender
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as any)}
                    style={{
                      width: '100%',
                      backgroundColor: '#232328',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px 10px',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                      outline: 'none',
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={formBirthDate}
                    onChange={(e) => setFormBirthDate(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px 10px',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Time of Birth (24h)
                  </label>
                  <input
                    type="time"
                    required
                    value={formBirthTime}
                    onChange={(e) => setFormBirthTime(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px 10px',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Place of Birth
                </label>
                <LocationPicker
                  value={formBirthPlace}
                  onSelect={(city) => {
                    setFormBirthPlace(`${city.name}, ${city.state || city.country}`);
                    setFormLat(city.latitude);
                    setFormLon(city.longitude);
                    setFormTz(city.timezone);
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Button variant="primary" size="sm" type="submit">
                  Save Profile
                </Button>
                <Button variant="outline" size="sm" type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Saved Profiles ({familyProfiles.length})
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenAdd}
                  icon={<UserPlus size={13} color="var(--gold-primary)" />}
                >
                  Add Profile
                </Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {familyProfiles.map((p) => {
                  const isActive = p.id === activeProfile.id;

                  return (
                    <Card
                      key={p.id}
                      style={{
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: isActive ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: isActive ? 'rgba(216, 197, 138, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {p.name}
                          </span>
                          <Badge size="sm" variant={isActive ? 'gold' : 'neutral'}>
                            {p.relationship}
                          </Badge>
                          {isActive && (
                            <span style={{ fontSize: '11px', color: 'var(--gold-primary)', fontWeight: 600 }}>
                              Active Chart
                            </span>
                          )}
                        </div>

                        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span>{p.birthDate} at {p.birthTime}</span>
                          <span>•</span>
                          <span>{p.birthPlace}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {!isActive ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => switchActiveProfile(p.id)}
                          >
                            Set Active
                          </Button>
                        ) : (
                          <Badge size="sm" variant="gold">
                            <CheckCircle2 size={11} style={{ marginRight: '3px' }} />
                            Selected
                          </Badge>
                        )}

                        <button
                          onClick={() => handleOpenEdit(p)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
                        >
                          <Edit2 size={14} />
                        </button>

                        {familyProfiles.length > 1 && !p.isDefault && (
                          <button
                            onClick={() => deleteProfile(p.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--accent-rose-light)', cursor: 'pointer', padding: '6px' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
