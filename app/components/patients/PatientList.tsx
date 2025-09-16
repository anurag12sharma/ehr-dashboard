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
    {/* Always show Add New Patient button and search bar */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <form onSubmit={handleSearchSubmit} className="flex-1 relative">
        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          className="w-full rounded-xl border-none outline-none bg-white/70 py-2.5 pl-11 pr-4 text-base text-gray-900 shadow ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 transition"
          placeholder="Search patients by name, email, or phone..."
          value={localSearchQuery}
          onChange={e => setLocalSearchQuery(e.target.value)}
          autoComplete="off"
        />
      </form>
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

    {/* Patient Table or Empty State */}
    {Array.isArray(patients) && patients.length === 0 ? (
      <div className="text-center py-16">
        {/* ...existing empty state code... */}
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
              <th className="px-6 py-3 text-center text-xs uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {Array.isArray(patients) && patients.map((patient) => (
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
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      title="View Details"
                      className="icon-btn text-blue-600 hover:text-blue-800"
                      onClick={() => onViewDetails(patient)}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      title="Edit Patient"
                      className="icon-btn text-amber-600 hover:text-amber-800"
                      onClick={() => onEdit(patient)}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5h2M12 7v10m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      title="Delete Patient"
                      className="icon-btn text-red-600 hover:text-red-800"
                      onClick={() => onDelete(patient)}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}
