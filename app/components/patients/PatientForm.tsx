// components/patients/PatientForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { PatientFormData } from '@/types/fhir';

interface PatientFormProps {
  mode: 'create' | 'edit';
  patientId?: string;
  onSubmit: (data: PatientFormData) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
}

const initialFormData: PatientFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: 'unknown',
  birthDate: '',
  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  },
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
  },
  medicalRecordNumber: '',
  active: true,
};

export function PatientForm({ mode, patientId, onSubmit, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingPatient, setLoadingPatient] = useState(false);

  // Load patient data for edit mode
  useEffect(() => {
    if (mode === 'edit' && patientId) {
      loadPatientData();
    }
  }, [mode, patientId]);

  const loadPatientData = async () => {
    setLoadingPatient(true);
    try {
      const response = await fetch(`/api/patients/${patientId}`);
      const result = await response.json();

      if (result.success) {
        const patient = result.data;
        const name = patient.name?.[0];
        const address = patient.address?.[0];
        const phone = patient.telecom?.find((t: any) => t.system === 'phone')?.value;
        const email = patient.telecom?.find((t: any) => t.system === 'email')?.value;

        setFormData({
          id: patient.id,
          firstName: name?.given?.[0] || '',
          lastName: name?.family || '',
          email: email || '',
          phone: phone || '',
          gender: patient.gender || 'unknown',
          birthDate: patient.birthDate || '',
          address: {
            line1: address?.line?.[0] || '',
            line2: address?.line?.[1] || '',
            city: address?.city || '',
            state: address?.state || '',
            postalCode: address?.postalCode || '',
            country: address?.country || 'US',
          },
          emergencyContact: {
            name: '',
            relationship: '',
            phone: '',
          },
          medicalRecordNumber: patient.identifier?.find((i: any) => i.use === 'official')?.value || '',
          active: patient.active !== false,
        });
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to load patient data');
    } finally {
      setLoadingPatient(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await onSubmit(formData);
      if (!result.success) {
        setError(result.error || 'Operation failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof PatientFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field: keyof PatientFormData['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleEmergencyContactChange = (field: keyof NonNullable<PatientFormData['emergencyContact']>, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact!,
        [field]: value,
      },
    }));
  };

  if (loadingPatient) {
    return (
      <div className="text-center py-12 opacity-80">
        <div className="inline-block h-8 w-8 loading-spinner"></div>
        <p className="mt-4 text-sm text-gray-500">Loading patient data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 fade-in">
      <div className="glass-panel shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {mode === 'create' ? 'Create New Patient' : 'Edit Patient'}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter the patient&apos;s personal and contact information.
        </p>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-3 text-red-700">{error}</div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={e => handleInputChange('firstName', e.target.value)}
              className="input-soft"
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={e => handleInputChange('lastName', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={e => handleInputChange('gender', e.target.value)}
              className="input-soft"
            >
              <option value="unknown">Unknown</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Date of Birth *
            </label>
            <input
              type="date"
              required
              value={formData.birthDate}
              onChange={e => handleInputChange('birthDate', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Medical Record Number
            </label>
            <input
              type="text"
              value={formData.medicalRecordNumber}
              onChange={e => handleInputChange('medicalRecordNumber', e.target.value)}
              className="input-soft"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="glass-panel shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Address Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              value={formData.address.line1}
              onChange={e => handleAddressChange('line1', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Apartment, suite, etc.
            </label>
            <input
              type="text"
              value={formData.address.line2}
              onChange={e => handleAddressChange('line2', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={formData.address.city}
              onChange={e => handleAddressChange('city', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              State / Province
            </label>
            <input
              type="text"
              value={formData.address.state}
              onChange={e => handleAddressChange('state', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              value={formData.address.postalCode}
              onChange={e => handleAddressChange('postalCode', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={formData.address.country}
              onChange={e => handleAddressChange('country', e.target.value)}
              className="input-soft"
              placeholder="US"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="glass-panel shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Contact (optional)</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Contact Name
            </label>
            <input
              type="text"
              value={formData.emergencyContact?.name || ''}
              onChange={e => handleEmergencyContactChange('name', e.target.value)}
              className="input-soft"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Relationship
            </label>
            <input
              type="text"
              value={formData.emergencyContact?.relationship || ''}
              onChange={e => handleEmergencyContactChange('relationship', e.target.value)}
              className="input-soft"
              placeholder="e.g., Spouse, Parent"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.emergencyContact?.phone || ''}
              onChange={e => handleEmergencyContactChange('phone', e.target.value)}
              className="input-soft"
            />
          </div>
        </div>
      </div>

      {/* Status and Actions */}
      <div className="flex items-center justify-between glass-panel py-4">
        <div className="flex items-center space-x-2">
          <input
            id="active"
            type="checkbox"
            checked={formData.active}
            onChange={e => handleInputChange('active', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="active" className="text-sm text-gray-900">
            Patient is active
          </label>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-main"
          >
            {loading ? (mode === 'create' ? 'Creating...' : 'Updating...') : (mode === 'create' ? 'Create Patient' : 'Update Patient')}
          </button>
        </div>
      </div>
    </form>
  );
}
