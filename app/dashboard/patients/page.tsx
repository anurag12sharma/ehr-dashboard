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
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPatients(); }, [loadPatients]);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchQuery) ||
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

  const handleViewPatient = async (patient: PatientSummary) => {
    setSelectedPatient(patient);
    setModalMode('view');
    setIsModalOpen(true);
  };
  

  const handleDeletePatient = async (patientId: string) => {
    try {
      const response = await fetch(`/api/patients/${patientId}`, { method: 'DELETE' });
      if (response.ok) {
        await loadPatients();
      }
    } catch (error) {
      // silent
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
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Patients</h1>
          <p className="text-sm text-gray-500">Manage patient records and information</p>
        </div>
        <button
          onClick={handleCreatePatient}
          className="btn-main flex items-center gap-2"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" />
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <div className="glass-panel card-hover flex items-center border-l-4 border-blue-500">
    <div className="p-2 rounded-lg bg-blue-100 mr-4">
      <UserIcon className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <div className="text-sm text-gray-500">Total Patients</div>
      <div className="text-2xl font-semibold text-gray-900">{patients.length}</div>
    </div>
  </div>
  <div className="glass-panel card-hover flex items-center border-l-4 border-emerald-500">
    <div className="p-2 rounded-lg bg-emerald-100 mr-4">
      <UserIcon className="h-6 w-6 text-emerald-600" />
    </div>
    <div>
      <div className="text-sm text-gray-500">Active Patients</div>
      <div className="text-2xl font-semibold text-gray-900">
        {patients.filter(p => p.active).length}
      </div>
    </div>
  </div>
  <div className="glass-panel card-hover flex items-center border-l-4 border-blue-500">
    <div className="p-2 rounded-lg bg-blue-100 mr-4">
      <UserIcon className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <div className="text-sm text-gray-500">This Month</div>
      <div className="text-2xl font-semibold text-gray-900">12</div>
    </div>
  </div>
  <div className="glass-panel card-hover flex items-center border-l-4 border-yellow-500">
    <div className="p-2 rounded-lg bg-yellow-100 mr-4">
      <UserIcon className="h-6 w-6 text-yellow-600" />
    </div>
    <div>
      <div className="text-sm text-gray-500">Pending</div>
      <div className="text-2xl font-semibold text-gray-900">3</div>
    </div>
  </div>
</div>


      {/* Search Bar */}
<div className="glass-panel px-4 py-4 flex items-center">
  <div className="relative w-full">
    {/* Position icon absolutely, vertically centered */}
    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    <input
      type="text"
      className="
        w-full rounded-xl border-none outline-none bg-white/70
        py-2.5 pl-11 pr-4 text-base text-gray-900
        shadow ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-300
        placeholder:text-gray-400 transition
      "
      placeholder="Search patients by name, email, or phone..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      autoComplete="off"
      style={{ boxShadow: '0 1.5px 13px 0 rgba(157, 164, 174, 0.09)' /* Optional: soft drop for glassy look */ }}
    />
  </div>
</div>



      {/* Patient Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="loading-spinner"></div>
          <span className="ml-3 text-gray-500">Loading patients...</span>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center">
          <UserIcon className="h-12 w-12 text-gray-300" />
          <h3 className="mt-3 text-base font-semibold text-gray-900">No patients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by creating your first patient.'}
          </p>
          {!searchQuery && (
            <button
              onClick={handleCreatePatient}
              className="btn-main mt-6 flex items-center gap-2"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" />
              Add Patient
            </button>
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
