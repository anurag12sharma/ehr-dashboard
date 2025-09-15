'use client';

import React, { useState, useEffect } from 'react';
import { PatientSummary, PatientFormData } from '@/types/fhir';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PatientModalProps {
  mode: 'create' | 'edit' | 'view';
  patient: any; // Accept any for extended details
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
  // Add these lines if you support in form
  //medicalHistory: [],
  //allergies: [],
};

export function PatientModal({ mode, patient, onClose, onSubmit }: PatientModalProps) {
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState<any[]>([]);
  const [allergies, setAllergies] = useState<any[]>([]);

  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && patient) {
      loadPatientData();
    }
    if (mode === 'create') {
      setFormData(initialFormData);
      setMedicalHistory([]);
      setAllergies([]);
      setLoadingPatient(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, patient]);

  const loadPatientData = async () => {
    if (!patient) return;
    setLoadingPatient(true);
    try {
      const response = await fetch(`/api/patients/${patient.id}`);
      const result = await response.json();
      if (result.success && result.data) {
        const data = result.data;
        setFormData(prev => ({
          ...prev,
          id: data.fhirId || data.id || '',
          firstName: (data.name && data.name.given && data.name.given[0]) || (typeof data.name === 'string' ? data.name.split(' ')[0] : ''),
          lastName: (data.name && data.name.family) || (typeof data.name === 'string' ? data.name.split(' ').slice(1).join(' ') : ''),
          email: data.telecom?.find((t: any) => t.system === 'email')?.value || data.email || '',
          phone: data.telecom?.find((t: any) => t.system === 'phone')?.value || data.phone || '',
          gender: data.gender || 'unknown',
          birthDate: data.birthDate || '',
          address: {
            line1: data.address?.[0]?.line?.[0] || '',
            line2: data.address?.[0]?.line?.[1] || '',
            city: data.address?.[0]?.city || '',
            state: data.address?.[0]?.state || '',
            postalCode: data.address?.[0]?.postalCode || '',
            country: data.address?.[0]?.country || 'US',
          },
          active: typeof data.active === 'boolean' ? data.active : true,
        }));
        setMedicalHistory(data.medicalHistory || []);
        setAllergies(data.allergies || []);
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
                  <div className="font-medium text-gray-900">{patient.fhirId || patient.id}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="font-medium text-gray-900">{patient.active ? 'Active' : 'Inactive'}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Name</div>
                <div className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-500">Gender</div>
                  <div className="font-medium text-gray-900">{formData.gender}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Date of Birth</div>
                  <div className="font-medium text-gray-900">{formData.birthDate}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="font-medium text-gray-900">{formData.email || <span className="italic text-xs text-gray-400">Not provided</span>}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="font-medium text-gray-900">{formData.phone || <span className="italic text-xs text-gray-400">Not provided</span>}</div>
                </div>
              </div>

              {/* Address */}
              <div>
                <div className="text-xs text-gray-500">Address</div>
                <div className="font-medium text-gray-900">
                  {formData.address.line1}, {formData.address.city}, {formData.address.state} {formData.address.postalCode}
                </div>
              </div>

              {/* Medical History */}
              <div>
                <div className="text-xs text-gray-500">Medical History</div>
                {medicalHistory.length === 0 ? (
                  <div className="italic text-xs text-gray-400">No history reported</div>
                ) : (
                  <ul className="list-disc ml-6 text-sm">
                    {medicalHistory.map((entry, i) => (
                      <li key={i}>
                        <span className="font-semibold">{entry.condition}</span>
                        {entry.diagnosisDate && (
                          <span className="ml-2 text-xs text-gray-500">({entry.diagnosisDate})</span>
                        )}
                        {entry.notes && (
                          <span className="ml-2 italic text-gray-600">{entry.notes}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Allergies */}
              <div>
                <div className="text-xs text-gray-500">Allergies</div>
                {allergies.length === 0 ? (
                  <div className="italic text-xs text-gray-400">No allergies reported</div>
                ) : (
                  <ul className="list-disc ml-6 text-sm">
                    {allergies.map((entry, i) => (
                      <li key={i}>
                        <span className="font-semibold">{entry.substance}</span>
                        {entry.reaction && (
                          <span className="ml-2 text-xs text-red-600">Reaction: {entry.reaction}</span>
                        )}
                        {entry.severity && (
                          <span className="ml-2 text-xs text-yellow-700">Severity: {entry.severity}</span>
                        )}
                        {entry.notes && (
                          <span className="ml-2 italic text-gray-600">{entry.notes}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
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
