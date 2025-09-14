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

  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to patients
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={onEdit}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Patient
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Patient
          </button>
        </div>
      </div>

      {/* Patient Overview Card */}
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
              <p className="text-sm text-gray-500">
                Patient ID: {patient.id} 
                {medicalRecordNumber && ` • MRN: ${medicalRecordNumber}`}
              </p>
              <div className="mt-1">
                {patient.active ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Details Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Demographics */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Demographics</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatGender(patient.gender || 'unknown')}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {patient.birthDate ? formatDate(patient.birthDate) : 'Not specified'}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {patient.birthDate ? `${calculateAge(patient.birthDate)} years old` : 'Unknown'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {phone ? (
                    <a href={`tel:${phone}`} className="text-blue-600 hover:text-blue-500">
                      {phone}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {email ? (
                    <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-500">
                      {email}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Address */}
        {address && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Address</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <address className="text-sm text-gray-900 not-italic">
                {address.line?.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
                {address.city && address.state && (
                  <div>{address.city}, {address.state} {address.postalCode}</div>
                )}
                {address.country && <div>{address.country}</div>}
              </address>
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        {emergencyContact && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Emergency Contact</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{emergencyContact.name?.text || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Relationship</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {emergencyContact.relationship?.[0]?.text || 'Not specified'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {emergencyContact.telecom?.find(t => t.system === 'phone')?.value || 'Not provided'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
