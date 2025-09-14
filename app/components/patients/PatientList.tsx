// components/patients/PatientList.tsx
'use client';

import React, { useState } from 'react';
import { PatientSummary } from '@/types/fhir';

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

  const formatAge = (age: number) => {
    return age === 0 ? 'Unknown' : `${age} years old`;
  };

  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const getStatusBadge = (active: boolean) => {
    return active ? (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
        Inactive
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-sm text-gray-500">Loading patients...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search patients by name..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {localSearchQuery && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearchQuery('');
                  onSearch('');
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>
        </form>
        
        <button
          onClick={onCreateNew}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Add New Patient
        </button>
      </div>

      {/* Patient Table */}
      {patients.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2m5-8a3 3 0 110-6 3 3 0 010 6m5 3a3 3 0 110-6 3 3 0 010 6m-10 3a3 3 0 110-6 3 3 0 010 6z" />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No patients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by creating a new patient.'}
          </p>
          {!searchQuery && (
            <div className="mt-6">
              <button
                onClick={onCreateNew}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                Add New Patient
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Demographics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">ID: {patient.id}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {patient.phone && (
                        <div className="flex items-center">
                          <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          {patient.phone}
                        </div>
                      )}
                      {patient.email && (
                        <div className="flex items-center mt-1">
                          <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          {patient.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <div>{formatGender(patient.gender)}</div>
                    <div>{formatAge(patient.age)}</div>
                    {patient.birthDate && (
                      <div className="text-xs text-gray-400">Born: {patient.birthDate}</div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {getStatusBadge(patient.active)}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => onViewDetails(patient)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEdit(patient)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(patient)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
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
