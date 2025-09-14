// app/dashboard/appointments/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { AppointmentCard } from './components/AppointmentCard';
import { AppointmentModal } from './components/AppointmentModal';
import { AppointmentSummary, AppointmentFormData } from '@/types/fhir';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentSummary[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  // Load appointments
  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/appointments');
      const result = await response.json();
      
      if (result.success) {
        setAppointments(result.data);
        setFilteredAppointments(result.data);
      }
    } catch (error) {
      console.error('Failed to load appointments:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  // Search and filter functionality
  useEffect(() => {
    let filtered = appointments;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(appointment =>
        appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.practitionerName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    setFilteredAppointments(filtered);
  }, [searchQuery, statusFilter, appointments]);

  // Stats calculations
  const todaysAppointments = appointments.filter(apt => apt.isToday).length;
  const upcomingAppointments = appointments.filter(apt => apt.isUpcoming).length;
  const bookedAppointments = appointments.filter(apt => apt.status === 'booked').length;
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length;

  const handleCreateAppointment = () => {
    setSelectedAppointment(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: AppointmentSummary) => {
    setSelectedAppointment(appointment);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewAppointment = (appointment: AppointmentSummary) => {
    setSelectedAppointment(appointment);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await loadAppointments();
      }
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  const handleModalSubmit = async (data: AppointmentFormData) => {
    try {
      const url = modalMode === 'create' ? '/api/appointments' : `/api/appointments/${selectedAppointment?.id}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsModalOpen(false);
        await loadAppointments();
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
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500">
            Manage patient appointments and scheduling
          </p>
        </div>
        <button
          onClick={handleCreateAppointment}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
          Schedule Appointment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border-l-4 border-blue-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                  <dd className="text-lg font-medium text-gray-900">{todaysAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border-l-4 border-green-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming</dt>
                  <dd className="text-lg font-medium text-gray-900">{upcomingAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border-l-4 border-purple-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Booked</dt>
                  <dd className="text-lg font-medium text-gray-900">{bookedAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border-l-4 border-yellow-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-lg font-medium text-gray-900">{pendingAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Search appointments by patient, doctor, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="all">All Status</option>
              <option value="booked">Booked</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="fulfilled">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-500">Loading appointments...</span>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-12">
          <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No appointments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Get started by scheduling your first appointment.'}
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <div className="mt-6">
              <button
                onClick={handleCreateAppointment}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                Schedule Appointment
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onView={() => handleViewAppointment(appointment)}
              onEdit={() => handleEditAppointment(appointment)}
              onDelete={() => handleDeleteAppointment(appointment.id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <AppointmentModal
          mode={modalMode}
          appointment={selectedAppointment}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}
