// app/dashboard/patients/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PlusIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import { PatientCard } from './components/PatientCard';
import { PatientModal } from './components/PatientModal';
import { PatientSummary, PatientFormData } from '@/types/fhir';

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<PatientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  // Load patients
  const loadPatients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/patients');
      const result = await response.json();
      
      if (result.success) {
        setPatients(result.data);
        setFilteredPatients(result.data);
      }
    } catch (error) {
      console.error('Failed to load patients:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone?.includes(searchQuery)
      );
      setFilteredPatients(filtered);
    }
  }, [searchQuery, patients]);

  const handleCreatePatient = () => {
    setSelectedPatient(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient: PatientSummary) => {
    setSelectedPatient(patient);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewPatient = (patient: PatientSummary) => {
    setSelectedPatient(patient);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeletePatient = async (patientId: string) => {
    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await loadPatients();
      }
    } catch (error) {
      console.error('Failed to delete patient:', error);
    }
  };

  const handleModalSubmit = async (data: PatientFormData) => {
    try {
      const url = modalMode === 'create' ? '/api/patients' : `/api/patients/${selectedPatient?.id}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsModalOpen(false);
        await loadPatients();
        return { success: true };
      } else {
        const result = await response.json();
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-sm text-gray-500">
            Manage patient records and information
          </p>
        </div>
        <button
          onClick={handleCreatePatient}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
          Add Patient
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                  <dd className="text-lg font-medium text-gray-900">{patients.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Patients</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {patients.filter(p => p.active).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">This Month</dt>
                  <dd className="text-lg font-medium text-gray-900">12</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-600"></div>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-lg font-medium text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Search patients by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Patient Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-500">Loading patients...</span>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="text-center py-12">
          <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No patients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by creating your first patient.'}
          </p>
          {!searchQuery && (
            <div className="mt-6">
              <button
                onClick={handleCreatePatient}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                Add Patient
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onView={() => handleViewPatient(patient)}
              onEdit={() => handleEditPatient(patient)}
              onDelete={() => handleDeletePatient(patient.id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <PatientModal
          mode={modalMode}
          patient={selectedPatient}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}
