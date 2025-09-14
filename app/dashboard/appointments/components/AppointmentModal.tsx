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
      console.error('Failed to load patients:', error);
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
          priority: 'routine'
        });
      }
    } catch (error) {
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{getModalTitle()}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            {loadingAppointment || loadingPatients ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-500">Loading...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}

                {/* Patient Selection */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient *
                    </label>
                    <select
                      required
                      disabled={mode === 'view'}
                      value={formData.patientId}
                      onChange={(e) => handleInputChange('patientId', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="">Select a patient</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} ({patient.id})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Doctor
                    </label>
                    <input
                      type="text"
                      disabled={mode === 'view'}
                      value={formData.practitionerName}
                      onChange={(e) => handleInputChange('practitionerName', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Title *
                    </label>
                    <input
                      type="text"
                      required
                      disabled={mode === 'view'}
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Annual Physical Checkup"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Type
                    </label>
                    <select
                      disabled={mode === 'view'}
                      value={formData.appointmentType}
                      onChange={(e) => handleInputChange('appointmentType', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
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

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      disabled={mode === 'view'}
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      disabled={mode === 'view'}
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Room 101"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Schedule</h4>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date & Time *
                      </label>
                      <input
                        type="datetime-local"
                        required
                        disabled={mode === 'view'}
                        value={formatDateTime(formData.startDateTime)}
                        onChange={(e) => handleInputChange('startDateTime', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                      </label>
                      <select
                        disabled={mode === 'view'}
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={45}>45 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1.5 hours</option>
                        <option value={120}>2 hours</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        disabled={true}
                        value={formatDateTime(formData.endDateTime)}
                        className="block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 text-gray-500 sm:text-sm"
                      />
                      <p className="mt-1 text-xs text-gray-500">Automatically calculated</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Additional Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Visit
                      </label>
                      <input
                        type="text"
                        disabled={mode === 'view'}
                        value={formData.reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        placeholder="e.g., Annual checkup, Follow-up consultation"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        rows={3}
                        disabled={mode === 'view'}
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Any additional notes or instructions..."
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          {mode !== 'view' && (
            <div className="border-t border-gray-200 px-6 py-3 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                    {mode === 'create' ? 'Scheduling...' : 'Updating...'}
                  </>
                ) : (
                  mode === 'create' ? 'Schedule Appointment' : 'Update Appointment'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
