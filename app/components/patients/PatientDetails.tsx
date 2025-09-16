// components/patients/PatientDetails.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FHIRPatient } from '@/types/fhir';

interface PatientDetailsProps {
  patientId: string;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export function PatientDetails({ patientId, onEdit, onDelete, onBack }: PatientDetailsProps) {
  const [patient, setPatient] = useState<FHIRPatient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  const loadPatient = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/patients/${patientId}`);
      const result = await response.json();
      if (result.success) {
        setPatient(result.data);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to load patient details');
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatGender = (gender: string) => gender.charAt(0).toUpperCase() + gender.slice(1);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="text-center py-12 opacity-80">
        <div className="inline-block h-8 w-8 loading-spinner"></div>
        <p className="mt-4 text-sm text-gray-500">Loading patient details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">{error}</div>
        <button
          onClick={onBack}
          className="mt-4 text-sm font-medium text-red-800 hover:text-red-600"
        >
          ← Back to patients
        </button>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-500">Patient not found</p>
        <button
          onClick={onBack}
          className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          ← Back to patients
        </button>
      </div>
    );
  }

  const name = patient.name?.[0];
  const fullName = name ? `${name.given?.[0] || ''} ${name.family || ''}`.trim() : 'Unknown';
  const address = patient.address?.[0];
  const phone = patient.telecom?.find(t => t.system === 'phone')?.value;
  const email = patient.telecom?.find(t => t.system === 'email')?.value;
  const emergencyContact = patient.contact?.[0];
  const medicalRecordNumber = patient.identifier?.find(i => i.use === 'official')?.value;

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to patients
        </button>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="btn-outline"
          >
            Edit Patient
          </button>
          <button
            onClick={onDelete}
            className="btn-main bg-red-600 hover:bg-red-700"
            type="button"
          >
            Delete Patient
          </button>
        </div>
      </div>

      {/* Patient Overview Card */}
      <div className="glass-panel flex items-center space-x-6">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-400 font-bold text-xl shadow-md">
          <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
          <p className="text-sm text-gray-500">
            {/* Patient ID: {patient.id || '-'}
            {medicalRecordNumber && <> · MRN: {medicalRecordNumber}</>} */}
          </p>
          <div className="mt-1">
            {patient.active ? (
              <span className="badge bg-emerald-100 text-emerald-700">Active</span>
            ) : (
              <span className="badge bg-gray-100 text-gray-500">Inactive</span>
            )}
          </div>
        </div>
      </div>

  {/* Patient Details Grid */}
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Medical History, Allergies, Medications, Immunizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medical History */}
        <div className="glass-panel">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical History</h3>
          {patient?.medicalHistory?.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.medicalHistory?.map((entry: any, idx: number) => (
                <li key={idx}>
                  <span className="font-medium text-gray-800">{entry.condition}</span>
                  {entry.diagnosisDate && (
                    <span className="ml-2 text-xs text-gray-500">({entry.diagnosisDate})</span>
                  )}
                  {entry.notes && (
                    <span className="ml-2 text-xs text-gray-400">- {entry.notes}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No medical history recorded.</p>
          )}
        </div>

        {/* Allergies */}
        <div className="glass-panel">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Allergies</h3>
          {patient?.allergies?.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.allergies?.map((entry: any, idx: number) => (
                <li key={idx}>
                  <span className="font-medium text-gray-800">{entry.substance}</span>
                  {entry.reaction && (
                    <span className="ml-2 text-xs text-gray-500">({entry.reaction})</span>
                  )}
                  {entry.severity && (
                    <span className="ml-2 text-xs text-red-500">[{entry.severity}]</span>
                  )}
                  {entry.notes && (
                    <span className="ml-2 text-xs text-gray-400">- {entry.notes}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No allergies recorded.</p>
          )}
        </div>

        {/* Medications */}
        <div className="glass-panel">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Medications</h3>
          {patient?.medications?.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.medications?.map((med: { name: string; dosage?: string; frequency?: string }, idx: number) => (
                <li key={idx}>
                  <span className="font-medium text-gray-800">{med.name}</span>
                  {med.dosage && (
                    <span className="ml-2 text-xs text-gray-500">({med.dosage})</span>
                  )}
                  {med.frequency && (
                    <span className="ml-2 text-xs text-gray-400">- {med.frequency}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No medications recorded.</p>
          )}
        </div>

        {/* Immunizations */}
        <div className="glass-panel">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Immunizations</h3>
          {patient?.immunizations?.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.immunizations?.map((imm: { vaccine: string; date?: string; notes?: string }, idx: number) => (
                <li key={idx}>
                  <span className="font-medium text-gray-800">{imm.vaccine}</span>
                  {imm.date && (
                    <span className="ml-2 text-xs text-gray-500">({imm.date})</span>
                  )}
                  {imm.notes && (
                    <span className="ml-2 text-xs text-gray-400">- {imm.notes}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No immunizations recorded.</p>
          )}
        </div>
      </div>
        {/* Demographics */}
        <div className="glass-panel">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Demographics</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="text-gray-900 font-medium">{formatGender(patient.gender || 'unknown')}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
              <dd className="text-gray-900 font-medium">
                {patient.birthDate ? formatDate(patient.birthDate) : 'Not specified'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Age</dt>
              <dd className="text-gray-900 font-medium">
                {patient.birthDate ? `${calculateAge(patient.birthDate)} years old` : 'Unknown'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Contact */}
        <div className="glass-panel">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="text-gray-900 font-medium">
                {phone ? (
                  <a href={`tel:${phone}`} className="text-blue-600 hover:underline">{phone}</a>
                ) : (
                  <span className="text-gray-400">Not provided</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-gray-900 font-medium">
                {email ? (
                  <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
                ) : (
                  <span className="text-gray-400">Not provided</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Address */}
        {address && (
          <div className="glass-panel">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
            <address className="text-gray-900 not-italic space-y-1">
              {address.line?.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
              {(address.city || address.state || address.postalCode) && (
                <div>
                  {[address.city, address.state, address.postalCode].filter(Boolean).join(', ')}
                </div>
              )}
              {address.country && <div>{address.country}</div>}
            </address>
          </div>
        )}

        {/* Emergency Contact */}
        {emergencyContact && (
          <div className="glass-panel">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Contact</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-gray-900 font-medium">{emergencyContact.name?.text || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Relationship</dt>
                <dd className="text-gray-900 font-medium">{emergencyContact.relationship?.[0]?.text || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="text-gray-900 font-medium">
                  {emergencyContact.telecom?.find(t => t.system === 'phone')?.value || 'Not provided'}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
