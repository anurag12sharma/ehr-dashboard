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
    // Only fetch data for edit or view, never for 'create'
  if (mode === 'edit' || mode === 'view') {
    if (patient) {
      loadPatientData();
    }
  }
  if (mode === 'create') {
    // Always wipe the form for "create"
    setFormData(initialFormData);
    setLoadingPatient(false);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, patient]);

  const loadPatientData = async () => {
    if (!patient) return;
    setLoadingPatient(true);
    try {
      const response = await fetch(`/api/patients/${patient.id}`);
      const result = await response.json();
      if (result.success) {
        // For view mode, just use the summary
        setFormData((prev) => ({
          ...prev,
          id: result.data.id,
          firstName: result.data.name.split(' ')[0] || '',
          lastName: result.data.name.split(' ').slice(1).join(' ') || '',
          email: result.data.email || '',
          phone: result.data.phone || '',
          gender: result.data.gender,
          birthDate: result.data.birthDate,
          address: {
            ...prev.address,
          },
          active: result.data.active ?? true,
        }));
      }
    } catch {
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
    if (result.success) onClose();
    else setError(result.error || 'Operation failed');
  };

  const handleInputChange = (field: keyof PatientFormData, value: any) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleAddressChange = (field: keyof PatientFormData['address'], value: string) =>
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));

  const getModalTitle = () => {
    switch (mode) {
      case 'create': return 'Add New Patient';
      case 'edit': return 'Edit Patient';
      case 'view': return 'Patient Details';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay with blur */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative z-10 w-full max-w-2xl glass-panel rounded-2xl fade-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900">{getModalTitle()}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 pb-7 pt-5">
          {loadingPatient ? (
            <div className="flex justify-center items-center py-12">
              <div className="loading-spinner"></div>
              <span className="ml-3 text-gray-500">Loading patient data...</span>
            </div>
          ) : mode === 'view' && patient ? (
            <div className="space-y-6 px-2 pb-2 pt-2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-500">Patient ID</div>
                  <div className="font-medium text-gray-900">{patient.id}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="font-medium text-gray-900">{patient.active ? 'Active' : 'Inactive'}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Name</div>
                <div className="font-medium text-gray-900">{patient.name}</div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-500">Gender</div>
                  <div className="font-medium text-gray-900">{patient.gender}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Date of Birth</div>
                  <div className="font-medium text-gray-900">{patient.birthDate}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="font-medium text-gray-900">{patient.email || <span className="italic text-xs text-gray-400">Not provided</span>}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="font-medium text-gray-900">{patient.phone || <span className="italic text-xs text-gray-400">Not provided</span>}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Age</div>
                <div className="font-medium text-gray-900">{patient.age || <span className="italic text-xs text-gray-400">N/A</span>}</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="rounded-md bg-red-50 p-4 text-red-700 mb-4">{error}</div>
              )}
              {/* [Leave your form fields exactly as before for create/edit] */}
              {/* ...form content not shown for brevity, keep unchanged... */}
              {mode !== 'view' && (
                <div className="flex justify-end gap-2 pt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-main"
                  >
                    {loading
                      ? (mode === 'create' ? 'Creating...' : 'Updating...')
                      : (mode === 'create' ? 'Create Patient' : 'Update Patient')}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
