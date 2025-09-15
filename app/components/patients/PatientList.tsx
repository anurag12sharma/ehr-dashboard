// components/patients/PatientList.tsx
'use client';

import React, { useState } from 'react';
import { PatientSummary } from '@/types/fhir';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface PatientListProps {
  patients: PatientSummary[];
  loading: boolean;
  searchQuery: string;
  onSearch: (query: string) => void;
  onCreateNew: () => void;
  onViewDetails: (patient: PatientSummary) => void;
  onEdit: (patient: PatientSummary) => void;
  onDelete: (patient: PatientSummary) => void;
}

export function PatientList({
  patients,
  loading,
  searchQuery,
  onSearch,
  onCreateNew,
  onViewDetails,
  onEdit,
  onDelete,
}: PatientListProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const formatAge = (age: number) => (age === 0 ? 'Unknown' : `${age} years old`);
  const formatGender = (gender: string) =>
    gender.charAt(0).toUpperCase() + gender.slice(1);

  const getStatusBadge = (active: boolean) =>
    active ? (
      <span className="badge bg-emerald-100 text-emerald-700">Active</span>
    ) : (
      <span className="badge bg-gray-100 text-gray-500">Inactive</span>
    );

  if (loading) {
    return (
      <div className="text-center py-12 opacity-80">
        <div className="inline-block h-8 w-8 loading-spinner"></div>
        <p className="mt-4 text-sm text-gray-500">Loading patients...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      

      {/* Patient Table */}
      {patients.length === 0 ? (
        <div className="text-center py-16">
          <svg className="mx-auto h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2m5-8a3 3 0 110-6 3 3 0 010 6m5 3a3 3 0 110-6 3 3 0 010 6m-10 3a3 3 0 110-6 3 3 0 010 6z" />
          </svg>
          <h3 className="mt-2 text-base font-semibold text-gray-900">No patients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by creating a new patient.'}
          </p>
          {!searchQuery && (
            <div className="mt-6">
              <button
                onClick={onCreateNew}
                className="btn-main flex items-center gap-2"
              >
                <svg className="-ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                Add New Patient
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl shadow-md glass-panel card-hover mt-2">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide">Patient</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide">Contact</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide">Demographics</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide">Status</th>
                <th className="relative px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {patients.map((patient) => (
                <tr key={patient.id} className="table-row group transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div>{patient.name}</div>
                    <div className="text-xs text-gray-400">ID: {patient.id}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {patient.phone && (
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {patient.phone}
                      </div>
                    )}
                    {patient.email && (
                      <div className="flex items-center gap-1 mt-1">
                        <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {patient.email}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>{formatGender(patient.gender)}</div>
                    <div>{formatAge(patient.age)}</div>
                    {patient.birthDate && (
                      <div className="text-xs text-gray-400">Born: {patient.birthDate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(patient.active)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
