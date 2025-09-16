'use client';

import React, { useState, useEffect } from 'react';
import { PatientFormData, MedicalHistoryEntry, AllergyEntry } from '@/types/fhir';

// FHIR Patient API shape
type FhirPatient = {
  id?: string;
  name?: { given?: string[]; family?: string }[];
  address?: { line?: string[]; city?: string; state?: string; postalCode?: string; country?: string }[];
  telecom?: { system: 'email' | 'phone'; value: string }[];
  gender?: string;
  birthDate?: string;
  active?: boolean;
  identifier?: { use?: string; value?: string }[];
  medicalHistory?: MedicalHistoryEntry[];
  allergies?: AllergyEntry[];
  medications?: { name: string; dosage?: string; frequency?: string }[];
  immunizations?: { vaccine: string; date?: string; notes?: string }[];
};
type ApiResult<T = unknown> = { success: boolean; data?: T; error?: string };

interface PatientFormProps {
  mode: 'create' | 'edit';
  patientId?: string;
  onSubmit: (data: PatientFormData) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
}

const allowedGenders = ['male', 'female', 'other', 'unknown'] as const;
function parseGender(g: unknown): 'male' | 'female' | 'other' | 'unknown' {
  return allowedGenders.includes(g as (typeof allowedGenders)[number])
    ? (g as (typeof allowedGenders)[number])
    : 'unknown';
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
  medicalHistory: [],
  allergies: [],
  medications: [],
  immunizations: [],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, patientId]);

  const loadPatientData = async () => {
    setLoadingPatient(true);
    try {
      const response = await fetch(`/api/patients/${patientId}`);
      const result: ApiResult<FhirPatient> = await response.json();

      if (result.success && result.data) {
        const patient = result.data;
        const name = patient.name?.[0];
        const address = patient.address?.[0];
        const phone = patient.telecom?.find((t) => t.system === 'phone')?.value;
        const email = patient.telecom?.find((t) => t.system === 'email')?.value;
        const medicalRecordNumber =
          patient.identifier?.find((i) => i.use === 'official')?.value || '';

        setFormData(prev => ({
          ...prev,
          id: patient.id,
          firstName: name?.given?.[0] || '',
          lastName: name?.family || '',
          email: email || '',
          phone: phone || '',
          gender: parseGender(patient.gender),
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
          medicalRecordNumber,
          active: patient.active !== false,
          medicalHistory: patient.medicalHistory || [],
          allergies: patient.allergies || [],
          medications: patient.medications || [],
          immunizations: patient.immunizations || [],
        }));
      } else {
        setError(result.error || 'Failed to load patient data');
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

    // Filter out incomplete entries before submitting
    const cleanedFormData: PatientFormData = {
      ...formData,
      medicalHistory: (formData.medicalHistory || []).filter(entry => entry.condition && entry.condition.trim() !== ''),
      allergies: (formData.allergies || []).filter(entry => entry.substance && entry.substance.trim() !== ''),
    };

    try {
      const result = await onSubmit(cleanedFormData);
      if (!result.success) {
        setError(result.error || 'Operation failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = <K extends keyof PatientFormData>(
    field: K,
    value: PatientFormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (
    field: keyof PatientFormData['address'],
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleEmergencyContactChange = (
    field: keyof NonNullable<PatientFormData['emergencyContact']>,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact!,
        [field]: value,
      },
    }));
  };


  // Handlers for medical history
  const handleMedicalHistoryChange = (idx: number, field: keyof MedicalHistoryEntry, value: string) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory?.map((entry, i) => i === idx ? { ...entry, [field]: value } : entry),
    }));
  };
  const handleAddMedicalHistory = () => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: [...(prev.medicalHistory || []), { condition: '', diagnosisDate: '', notes: '' }],
    }));
  };
  const handleRemoveMedicalHistory = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory?.filter((_, i) => i !== idx),
    }));
  };

  // Handlers for allergies
  const handleAllergyChange = (idx: number, field: keyof AllergyEntry, value: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies?.map((entry, i) => i === idx ? { ...entry, [field]: value } : entry),
    }));
  };
  const handleAddAllergy = () => {
    setFormData(prev => ({
      ...prev,
      allergies: [...(prev.allergies || []), { substance: '', reaction: '', severity: '', notes: '' }],
    }));
  };
  const handleRemoveAllergy = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies?.filter((_, i) => i !== idx),
    }));
  };

  // Handlers for medications
  const handleMedicationChange = (
    idx: number,
    field: keyof NonNullable<PatientFormData['medications']>[number],
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      medications: (prev.medications ?? []).map((entry, i) => i === idx ? { ...entry, [field]: value } : entry),
    }));
  };
  const handleAddMedication = () => {
    setFormData(prev => ({
      ...prev,
  medications: [...(prev.medications || []), { name: '', dosage: '', frequency: '' }],
    }));
  };
  const handleRemoveMedication = (idx: number) => {
    setFormData(prev => ({
      ...prev,
  medications: prev.medications?.filter((_: any, i: number) => i !== idx),
    }));
  };

  // Handlers for immunizations
  const handleImmunizationChange = (
    idx: number,
    field: keyof NonNullable<PatientFormData['immunizations']>[number],
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      immunizations: (prev.immunizations ?? []).map((entry, i) => i === idx ? { ...entry, [field]: value } : entry),
    }));
  };
  const handleAddImmunization = () => {
    setFormData(prev => ({
      ...prev,
  immunizations: [...(prev.immunizations || []), { vaccine: '', date: '', notes: '' }],
    }));
  };
  const handleRemoveImmunization = (idx: number) => {
    setFormData(prev => ({
      ...prev,
  immunizations: prev.immunizations?.filter((_: any, i: number) => i !== idx),
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
  onChange={e =>
    handleInputChange('gender', e.target.value as PatientFormData['gender'])
  }
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
              onChange={e =>
                handleInputChange('medicalRecordNumber', e.target.value)
              }
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
              onChange={e =>
                handleEmergencyContactChange('name', e.target.value)
              }
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
              onChange={e =>
                handleEmergencyContactChange('relationship', e.target.value)
              }
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
              onChange={e =>
                handleEmergencyContactChange('phone', e.target.value)
              }
              className="input-soft"
            />
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div className="glass-panel shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical History</h3>
        {(formData.medicalHistory || []).map((entry, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Condition"
              value={entry.condition}
              onChange={e => handleMedicalHistoryChange(idx, 'condition', e.target.value)}
              className="input-soft w-1/3"
            />
            <input
              type="date"
              placeholder="Diagnosis Date"
              value={entry.diagnosisDate || ''}
              onChange={e => handleMedicalHistoryChange(idx, 'diagnosisDate', e.target.value)}
              className="input-soft w-1/4"
            />
            <input
              type="text"
              placeholder="Notes"
              value={entry.notes || ''}
              onChange={e => handleMedicalHistoryChange(idx, 'notes', e.target.value)}
              className="input-soft w-1/3"
            />
            <button type="button" className="btn-outline" onClick={() => handleRemoveMedicalHistory(idx)}>-</button>
          </div>
        ))}
        <button type="button" className="btn-main mt-2" onClick={handleAddMedicalHistory}>Add Entry</button>
      </div>

      {/* Allergies */}
      <div className="glass-panel shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Allergies</h3>
        {(formData.allergies || []).map((entry, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Substance"
              value={entry.substance}
              onChange={e => handleAllergyChange(idx, 'substance', e.target.value)}
              className="input-soft w-1/4"
            />
            <input
              type="text"
              placeholder="Reaction"
              value={entry.reaction || ''}
              onChange={e => handleAllergyChange(idx, 'reaction', e.target.value)}
              className="input-soft w-1/4"
            />
            <input
              type="text"
              placeholder="Severity"
              value={entry.severity || ''}
              onChange={e => handleAllergyChange(idx, 'severity', e.target.value)}
              className="input-soft w-1/4"
            />
            <input
              type="text"
              placeholder="Notes"
              value={entry.notes || ''}
              onChange={e => handleAllergyChange(idx, 'notes', e.target.value)}
              className="input-soft w-1/4"
            />
            <button type="button" className="btn-outline" onClick={() => handleRemoveAllergy(idx)}>-</button>
          </div>
        ))}
        <button type="button" className="btn-main mt-2" onClick={handleAddAllergy}>Add Entry</button>
      </div>

      {/* Medications */}
      <div className="glass-panel shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Medications</h3>
        {(formData.medications || []).map((entry, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Name"
              value={entry.name}
              onChange={e => handleMedicationChange(idx, 'name', e.target.value)}
              className="input-soft w-1/4"
            />
            <input
              type="text"
              placeholder="Dosage"
              value={entry.dosage || ''}
              onChange={e => handleMedicationChange(idx, 'dosage', e.target.value)}
              className="input-soft w-1/4"
            />
            <input
              type="text"
              placeholder="Frequency"
              value={entry.frequency || ''}
              onChange={e => handleMedicationChange(idx, 'frequency', e.target.value)}
              className="input-soft w-1/4"
            />
            <button type="button" className="btn-outline" onClick={() => handleRemoveMedication(idx)}>-</button>
          </div>
        ))}
        <button type="button" className="btn-main mt-2" onClick={handleAddMedication}>Add Entry</button>
      </div>

      {/* Immunizations */}
      <div className="glass-panel shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Immunizations</h3>
        {(formData.immunizations || []).map((entry, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Vaccine"
              value={entry.vaccine}
              onChange={e => handleImmunizationChange(idx, 'vaccine', e.target.value)}
              className="input-soft w-1/4"
            />
            <input
              type="date"
              placeholder="Date"
              value={entry.date || ''}
              onChange={e => handleImmunizationChange(idx, 'date', e.target.value)}
              className="input-soft w-1/4"
            />
            <input
              type="text"
              placeholder="Notes"
              value={entry.notes || ''}
              onChange={e => handleImmunizationChange(idx, 'notes', e.target.value)}
              className="input-soft w-1/4"
            />
            <button type="button" className="btn-outline" onClick={() => handleRemoveImmunization(idx)}>-</button>
          </div>
        ))}
        <button type="button" className="btn-main mt-2" onClick={handleAddImmunization}>Add Entry</button>
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
            {loading
              ? mode === 'create'
                ? 'Creating...'
                : 'Updating...'
              : mode === 'create'
                ? 'Create Patient'
                : 'Update Patient'}
          </button>
        </div>
      </div>
    </form>
  );
}
