// app/dashboard/patients/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PlusIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import { PatientList } from '@/components/patients/PatientList';
import { PatientForm } from '@/components/patients/PatientForm';
import { PatientDetails } from '@/components/patients/PatientDetails';
import { DeleteConfirmModal } from '@/components/patients/DeleteConfirmModal';
import { PatientSummary, PatientFormData } from '@/types/fhir';

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details' | 'create' | 'edit' | 'delete-confirm'>('list');

  // Load patients
  const loadPatients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/patients');
      const result = await response.json();
      if (result.success) {
        setPatients(result.data);
      }
    } catch (error) {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPatients(); }, [loadPatients]);

  // Handlers for shared components
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredPatients = patients.filter(patient => {
    if (!searchQuery.trim()) return true;
    return (
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchQuery) ||
      patient.phone?.includes(searchQuery) ||
      patient.id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCreateNew = () => {
    setSelectedPatient(null);
    setViewMode('create');
  };

  const handleViewDetails = (patient: PatientSummary) => {
    setSelectedPatient(patient);
    setViewMode('details');
  };

  const handleEdit = (patient: PatientSummary) => {
    setSelectedPatient(patient);
    setViewMode('edit');
  };

  const handleDelete = (patient: PatientSummary) => {
    setSelectedPatient(patient);
    setViewMode('delete-confirm');
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPatient) return;
    try {
      const response = await fetch(`/api/patients/${selectedPatient.id}`, { method: 'DELETE' });
      if (response.ok) {
        await loadPatients();
        setViewMode('list');
        setSelectedPatient(null);
      }
    } catch (error) {
      // silent
    }
  };

  const handleFormSubmit = async (data: PatientFormData) => {
    try {
      const url = viewMode === 'create' ? '/api/patients' : `/api/patients/${selectedPatient?.id}`;
      const method = viewMode === 'create' ? 'POST' : 'PUT';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        await loadPatients();
        setViewMode('list');
        setSelectedPatient(null);
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
      {/* Header and stats */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Patients</h1>
          <p className="text-sm text-gray-500">Manage patient records and information</p>
        </div>
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

      {/* Main content: switch by viewMode */}
      {viewMode === 'list' && (
        <PatientList
          patients={filteredPatients}
          loading={loading}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onCreateNew={handleCreateNew}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {viewMode === 'details' && selectedPatient && (
        <PatientDetails
          patientId={selectedPatient.id}
          onEdit={() => setViewMode('edit')}
          onDelete={() => setViewMode('delete-confirm')}
          onBack={() => { setViewMode('list'); setSelectedPatient(null); }}
        />
      )}

      {(viewMode === 'create' || (viewMode === 'edit' && selectedPatient)) && (
        <PatientForm
          mode={viewMode === 'create' ? 'create' : 'edit'}
          patientId={viewMode === 'edit' ? selectedPatient?.id : undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => { setViewMode('list'); setSelectedPatient(null); }}
        />
      )}

      {viewMode === 'delete-confirm' && selectedPatient && (
        <DeleteConfirmModal
          patient={selectedPatient}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setViewMode('list')}
        />
      )}
    </div>
  );
}
