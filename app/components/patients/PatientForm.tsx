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
        // Convert FHIR patient to form data - you might need a utility function for this
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
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-sm text-gray-500">Loading patient data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {mode === 'create' ? 'Create New Patient' : 'Edit Patient'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter the patient's personal and contact information.
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Basic Information */}
            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-1">
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="unknown">Unknown</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Date of birth *
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  id="birthDate"
                  required
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="medicalRecordNumber" className="block text-sm font-medium text-gray-700">
                Medical Record Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="medicalRecordNumber"
                  value={formData.medicalRecordNumber}
                  onChange={(e) => handleInputChange('medicalRecordNumber', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Address Information</h3>
            <p className="mt-1 text-sm text-gray-500">Patient's primary address.</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="line1" className="block text-sm font-medium text-gray-700">
                Street address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="line1"
                  value={formData.address.line1}
                  onChange={(e) => handleAddressChange('line1', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="line2" className="block text-sm font-medium text-gray-700">
                Apartment, suite, etc.
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="line2"
                  value={formData.address.line2}
                  onChange={(e) => handleAddressChange('line2', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State / Province
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                ZIP / Postal code
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="postalCode"
                  value={formData.address.postalCode}
                  onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Emergency Contact</h3>
            <p className="mt-1 text-sm text-gray-500">Emergency contact information (optional).</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-700">
                Contact name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="emergencyName"
                  value={formData.emergencyContact?.name || ''}
                  onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                Relationship
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="relationship"
                  placeholder="e.g., Spouse, Parent, Friend"
                  value={formData.emergencyContact?.relationship || ''}
                  onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  id="emergencyPhone"
                  value={formData.emergencyContact?.phone || ''}
                  onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="pt-8">
          <div className="flex items-center">
            <input
              id="active"
              type="checkbox"
              checked={formData.active}
              onChange={(e) => handleInputChange('active', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
              Patient is active
            </label>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Inactive patients are not shown in regular searches and lists.
          </p>
        </div>
      </div>

      {/* Form Actions */}
      <div className="pt-5">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                {mode === 'create' ? 'Creating...' : 'Updating...'}
              </>
            ) : (
              mode === 'create' ? 'Create Patient' : 'Update Patient'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
