// app/patients/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { PatientList } from '@/components/patients/PatientList';
import { PatientForm } from '@/components/patients/PatientForm';
import { PatientDetails } from '@/components/patients/PatientDetails';
import { DeleteConfirmModal } from '@/components/patients/DeleteConfirmModal';
import { PatientSummary, PatientFormData } from '@/types/fhir';

type ViewMode = 'list' | 'create' | 'edit' | 'details';

interface PatientState {
  patients: PatientSummary[];
  selectedPatient: PatientSummary | null;
  viewMode: ViewMode;
  loading: boolean;
  error: string | null;
  showDeleteModal: boolean;
  searchQuery: string;
}

export default function PatientsPage() {
  const [state, setState] = useState<PatientState>({
    patients: [],
    selectedPatient: null,
    viewMode: 'list',
    loading: true,
    error: null,
    showDeleteModal: false,
    searchQuery: '',
  });

  useEffect(() => { loadPatients(); }, []);

  const loadPatients = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await fetch('/api/patients');
      const result = await response.json();
      if (result.success) {
        setState(prev => ({
          ...prev,
          patients: result.data,
          loading: false,
        }));
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load patients',
        loading: false,
      }));
    }
  };

  const handleSearch = async (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query, loading: true }));
    try {
      if (query.trim()) {
        const response = await fetch(`/api/patients/search?q=${encodeURIComponent(query)}`);
        const result = await response.json();
        if (result.success) {
          setState(prev => ({ ...prev, patients: result.data, loading: false }));
        } else {
          throw new Error(result.error);
        }
      } else {
        await loadPatients();
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Search failed',
        loading: false,
      }));
    }
  };

  const handleCreatePatient = async (patientData: PatientFormData) => {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });
      const result = await response.json();
      if (result.success) {
        await loadPatients();
        setState(prev => ({ ...prev, viewMode: 'list' }));
        return { success: true };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create patient',
      };
    }
  };

  const handleUpdatePatient = async (patientData: PatientFormData) => {
    try {
      if (!state.selectedPatient?.id) throw new Error('No patient selected');
      const response = await fetch(`/api/patients/${state.selectedPatient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });
      const result = await response.json();
      if (result.success) {
        await loadPatients();
        setState(prev => ({ ...prev, viewMode: 'list' }));
        return { success: true };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update patient',
      };
    }
  };

  const handleDeletePatient = async () => {
    try {
      if (!state.selectedPatient?.id) throw new Error('No patient selected');
      const response = await fetch(`/api/patients/${state.selectedPatient.id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) {
        await loadPatients();
        setState(prev => ({
          ...prev,
          showDeleteModal: false,
          selectedPatient: null,
          viewMode: 'list',
        }));
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete patient',
        showDeleteModal: false,
      }));
    }
  };

  const handleViewDetails = (patient: PatientSummary) => {
    setState(prev => ({
      ...prev,
      selectedPatient: patient,
      viewMode: 'details',
    }));
  };
  const handleEditPatient = (patient: PatientSummary) => {
    setState(prev => ({
      ...prev,
      selectedPatient: patient,
      viewMode: 'edit',
    }));
  };
  const handleDeleteRequest = (patient: PatientSummary) => {
    setState(prev => ({
      ...prev,
      selectedPatient: patient,
      showDeleteModal: true,
    }));
  };
  const handleBackToList = () => {
    setState(prev => ({
      ...prev,
      viewMode: 'list',
      selectedPatient: null,
      error: null,
    }));
  };

  const renderContent = () => {
    switch (state.viewMode) {
      case 'create':
        return (
          <PatientForm
            mode="create"
            onSubmit={handleCreatePatient}
            onCancel={handleBackToList}
          />
        );
      case 'edit':
        return (
          <PatientForm
            mode="edit"
            patientId={state.selectedPatient?.id}
            onSubmit={handleUpdatePatient}
            onCancel={handleBackToList}
          />
        );
      case 'details':
        return (
          <PatientDetails
            patientId={state.selectedPatient?.id || ''}
            onEdit={() => handleEditPatient(state.selectedPatient!)}
            onDelete={() => handleDeleteRequest(state.selectedPatient!)}
            onBack={handleBackToList}
          />
        );
      default:
        return (
          <PatientList
            patients={state.patients}
            loading={state.loading}
            onSearch={handleSearch}
            onCreateNew={() => setState(prev => ({ ...prev, viewMode: 'create' }))}
            onViewDetails={handleViewDetails}
            onEdit={handleEditPatient}
            onDelete={handleDeleteRequest}
            searchQuery={state.searchQuery}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {state.viewMode === 'create' && 'Create New Patient'}
            {state.viewMode === 'edit' && 'Edit Patient'}
            {state.viewMode === 'details' && 'Patient Details'}
            {state.viewMode === 'list' && 'Patient Management'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {state.viewMode === 'list' && `${state.patients.length} patient(s) found`}
            {state.viewMode !== 'list' && 'Electronic Health Records System'}
          </p>
        </div>

        {/* Error Display */}
        {state.error && (
          <div className="rounded-md bg-red-50 p-4 mb-4 max-w-xl mx-auto">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <b className="text-red-700">Error:</b>
                <div className="text-red-700">{state.error}</div>
                <button
                  type="button"
                  className="mt-2 btn-outline text-sm"
                  onClick={() => setState(prev => ({ ...prev, error: null }))}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div>{renderContent()}</div>
      </div>
      {/* Delete Confirmation Modal */}
      {state.showDeleteModal && state.selectedPatient && (
        <DeleteConfirmModal
          patient={state.selectedPatient}
          onConfirm={handleDeletePatient}
          onCancel={() => setState(prev => ({ ...prev, showDeleteModal: false }))}
        />
      )}
    </div>
  );
}
