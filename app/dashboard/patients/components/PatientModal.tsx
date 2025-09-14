// app/dashboard/patients/components/PatientModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { PatientSummary, PatientFormData } from '@/types/fhir';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PatientModalProps {
  mode: 'create' | 'edit' | 'view';
  patient: PatientSummary | null;
  onClose: () => void;
  onSubmit: (data: PatientFormData) => Promise<{ success: boolean; error?: string }>;
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

export function PatientModal({ mode, patient, onClose, onSubmit }: PatientModalProps) {
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingPatient, setLoadingPatient] = useState(false);

  useEffect(() => {
    if (mode !== 'create' && patient) {
      loadPatientData();
    } else {
      setFormData(initialFormData);
    }
  }, [mode, patient]);

  const loadPatientData = async () => {
    if (!patient) return;
    
    setLoadingPatient(true);
    try {
      const response = await fetch(`/api/patients/${patient.id}`);
      const result = await response.json();
      
      if (result.success) {
        const fhirPatient = result.data;
        const name = fhirPatient.name?.[0];
        const address = fhirPatient.address?.[0];
        const phone = fhirPatient.telecom?.find((t: any) => t.system === 'phone')?.value;
        const email = fhirPatient.telecom?.find((t: any) => t.system === 'email')?.value;
        
        setFormData({
          id: fhirPatient.id,
          firstName: name?.given?.[0] || '',
          lastName: name?.family || '',
          email: email || '',
          phone: phone || '',
          gender: fhirPatient.gender || 'unknown',
          birthDate: fhirPatient.birthDate || '',
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
          medicalRecordNumber: fhirPatient.identifier?.find((i: any) => i.use === 'official')?.value || '',
          active: fhirPatient.active !== false,
        });
      }
    } catch (error) {
      setError('Failed to load patient data');
    } finally {
      setLoadingPatient(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;

    setLoading(true);
    setError(null);

    const result = await onSubmit(formData);
    setLoading(false);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Operation failed');
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

  const getModalTitle = () => {
    switch (mode) {
      case 'create': return 'Add New Patient';
      case 'edit': return 'Edit Patient';
      case 'view': return 'Patient Details';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{getModalTitle()}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            {loadingPatient ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-500">Loading patient data...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}

                {/* Basic Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      disabled={mode === 'view'}
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      disabled={mode === 'view'}
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      disabled={mode === 'view'}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      disabled={mode === 'view'}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      disabled={mode === 'view'}
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="unknown">Unknown</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      disabled={mode === 'view'}
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Address</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        disabled={mode === 'view'}
                        value={formData.address.line1}
                        onChange={(e) => handleAddressChange('line1', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          disabled={mode === 'view'}
                          value={formData.address.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          disabled={mode === 'view'}
                          value={formData.address.state}
                          onChange={(e) => handleAddressChange('state', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        disabled={mode === 'view'}
                        value={formData.address.postalCode}
                        onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {mode !== 'view' && (
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
                )}
              </form>
            )}
          </div>

          {/* Footer */}
          {mode !== 'view' && (
            <div className="border-t border-gray-200 px-6 py-3 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="patient-form"
                disabled={loading}
                onClick={handleSubmit}
                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
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
          )}
        </div>
      </div>
    </div>
  );
}
