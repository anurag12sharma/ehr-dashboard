// app/dashboard/appointments/components/AppointmentModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { AppointmentSummary, AppointmentFormData, PatientSummary } from '@/types/fhir';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AppointmentModalProps {
  mode: 'create' | 'edit' | 'view';
  appointment: AppointmentSummary | null;
  onClose: () => void;
  onSubmit: (data: AppointmentFormData) => Promise<{ success: boolean; error?: string }>;
}

const initialFormData: AppointmentFormData = {
  patientId: '',
  patientName: '',
  practitionerId: 'practitioner-001',
  practitionerName: 'Dr. Sarah Johnson',
  title: '',
  description: '',
  appointmentType: 'checkup',
  status: 'booked',
  startDateTime: '',
  endDateTime: '',
  duration: 30,
  reason: '',
  notes: '',
  location: 'Room 101',
  priority: 'routine',
};

export function AppointmentModal({ mode, appointment, onClose, onSubmit }: AppointmentModalProps) {
  const [formData, setFormData] = useState<AppointmentFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingAppointment, setLoadingAppointment] = useState(false);
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  // Load patients for dropdown
  useEffect(() => {
    loadPatients();
  }, []);

  // Load appointment data for edit mode
  useEffect(() => {
    if (mode !== 'create' && appointment) {
      loadAppointmentData();
    } else {
      setFormData(initialFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, appointment]);

  const loadPatients = async () => {
    setLoadingPatients(true);
    try {
      const response = await fetch('/api/patients');
      const result = await response.json();
      if (result.success) {
        setPatients(result.data);
      }
    } catch (error) {
      // silent fail
    } finally {
      setLoadingPatients(false);
    }
  };

  const loadAppointmentData = async () => {
    if (!appointment) return;
    setLoadingAppointment(true);
    try {
      const response = await fetch(`/api/appointments/${appointment.id}`);
      const result = await response.json();
      if (result.success) {
        const fhirAppointment = result.data;
        const patient = fhirAppointment.participant?.find((p: any) => p.actor?.reference?.includes('Patient'));
        const practitioner = fhirAppointment.participant?.find((p: any) => p.actor?.reference?.includes('Practitioner'));
        setFormData({
          id: fhirAppointment.id,
          patientId: patient?.actor?.reference?.split('/')[1] || '',
          patientName: patient?.actor?.display || '',
          practitionerId: practitioner?.actor?.reference?.split('/')[1] || 'practitioner-001',
          practitionerName: practitioner?.actor?.display || 'Dr. Sarah Johnson',
          title: fhirAppointment.description || '',
          description: fhirAppointment.comment || '',
          appointmentType: (fhirAppointment.appointmentType?.text as any) || 'checkup',
          status: fhirAppointment.status,
          startDateTime: fhirAppointment.start || '',
          endDateTime: fhirAppointment.end || '',
          duration: fhirAppointment.minutesDuration || 30,
          reason: fhirAppointment.reasonCode?.[0]?.text || '',
          notes: fhirAppointment.comment || '',
          location: 'Room 101',
          priority: 'routine',
        });
      }
    } catch {
      setError('Failed to load appointment data');
    } finally {
      setLoadingAppointment(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;
    setLoading(true);
    setError(null);

    // Auto-calculate end time if not set
    if (formData.startDateTime && !formData.endDateTime) {
      const startTime = new Date(formData.startDateTime);
      const endTime = new Date(startTime.getTime() + formData.duration * 60000);
      formData.endDateTime = endTime.toISOString().slice(0, 16);
    }
    // Set patient name from selected patient
    const selectedPatient = patients.find(p => p.id === formData.patientId);
    if (selectedPatient) {
      formData.patientName = selectedPatient.name;
    }
    const result = await onSubmit(formData);
    setLoading(false);
    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Operation failed');
    }
  };

  const handleInputChange = (field: keyof AppointmentFormData, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-calculate end time when start time or duration changes
      if (field === 'startDateTime' || field === 'duration') {
        if (updated.startDateTime && updated.duration) {
          const startTime = new Date(updated.startDateTime);
          const endTime = new Date(startTime.getTime() + updated.duration * 60000);
          updated.endDateTime = endTime.toISOString().slice(0, 16);
        }
      }
      return updated;
    });
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'create': return 'Schedule New Appointment';
      case 'edit': return 'Edit Appointment';
      case 'view': return 'Appointment Details';
    }
  };

  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return '';
    return new Date(dateTime).toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with blur */}
      <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-3xl glass-panel fade-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-8 py-5">
          <h3 className="text-xl font-bold text-gray-900">{getModalTitle()}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-8 pb-8 pt-5">
          {(loadingAppointment || loadingPatients) ? (
            <div className="flex justify-center items-center py-12">
              <div className="loading-spinner"></div>
              <span className="ml-3 text-gray-500">Loading...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="rounded-md bg-red-50 p-4 text-red-700 mb-4">{error}</div>
              )}

              {/* Patient & Practitioner */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Patient *
                  </label>
                  <select
                    required
                    disabled={mode === 'view'}
                    value={formData.patientId}
                    onChange={e => handleInputChange('patientId', e.target.value)}
                    className="input-soft"
                  >
                    <option value="">Select a patient</option>
                    {patients.map(p => (
                      <option value={p.id} key={p.id}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Doctor
                  </label>
                  <input
                    type="text"
                    disabled={mode === 'view'}
                    value={formData.practitionerName}
                    onChange={e => handleInputChange('practitionerName', e.target.value)}
                    className="input-soft"
                  />
                </div>
              </div>

              {/* Title & Type */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Appointment Title *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={mode === 'view'}
                    value={formData.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Annual Physical Checkup"
                    className="input-soft"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Appointment Type
                  </label>
                  <select
                    disabled={mode === 'view'}
                    value={formData.appointmentType}
                    onChange={e => handleInputChange('appointmentType', e.target.value)}
                    className="input-soft"
                  >
                    <option value="checkup">Checkup</option>
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="procedure">Procedure</option>
                    <option value="emergency">Emergency</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Status & Location */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    disabled={mode === 'view'}
                    value={formData.status}
                    onChange={e => handleInputChange('status', e.target.value)}
                    className="input-soft"
                  >
                    <option value="booked">Booked</option>
                    <option value="pending">Pending</option>
                    <option value="arrived">Arrived</option>
                    <option value="fulfilled">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="noshow">No Show</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    disabled={mode === 'view'}
                    value={formData.location}
                    onChange={e => handleInputChange('location', e.target.value)}
                    placeholder="Room 101"
                    className="input-soft"
                  />
                </div>
              </div>

              {/* Date, Time, Duration */}
              <div className="border-t border-gray-100 pt-5 -mx-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Start Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    disabled={mode === 'view'}
                    value={formatDateTime(formData.startDateTime)}
                    onChange={e => handleInputChange('startDateTime', e.target.value)}
                    className="input-soft"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Duration (min)
                  </label>
                  <select
                    disabled={mode === 'view'}
                    value={formData.duration}
                    onChange={e => handleInputChange('duration', parseInt(e.target.value))}
                    className="input-soft"
                  >
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    disabled
                    value={formatDateTime(formData.endDateTime)}
                    className="input-soft bg-gray-50 text-gray-400"
                  />
                  <p className="mt-1 text-xs text-gray-400">Auto-calculated</p>
                </div>
              </div>

              {/* Additional info */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Reason for Visit
                  </label>
                  <input
                    type="text"
                    disabled={mode === 'view'}
                    value={formData.reason}
                    onChange={e => handleInputChange('reason', e.target.value)}
                    placeholder="e.g., Checkup"
                    className="input-soft"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    rows={2}
                    disabled={mode === 'view'}
                    value={formData.notes}
                    onChange={e => handleInputChange('notes', e.target.value)}
                    className="input-soft"
                  />
                </div>
              </div>

              {/* Actions */}
              {mode !== 'view' && (
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
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
                      ? (mode === 'create' ? 'Scheduling...' : 'Updating...')
                      : (mode === 'create' ? 'Schedule Appointment' : 'Update Appointment')}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
