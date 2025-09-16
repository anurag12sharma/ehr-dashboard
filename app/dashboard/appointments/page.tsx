// app/dashboard/appointments/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { AppointmentCard } from "./components/AppointmentCard";
import { AppointmentModal } from "./components/AppointmentModal";
import { AppointmentSummary, AppointmentFormData } from "@/types/fhir";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentSummary[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentSummary[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [providerId, setProviderId] = useState("");

  // Load appointments
  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const queryParts = [];
      if (providerId)
        queryParts.push(`providerId=${encodeURIComponent(providerId)}`);
      const queryString =
        queryParts.length > 0 ? "?" + queryParts.join("&") : "";

      const response = await fetch("/api/appointments" + queryString);

      const result = await response.json();

      if (result.success) {
        const reversed = result.data.slice().reverse();
        setAppointments(reversed);
        setFilteredAppointments(reversed);
      }
    } catch (error) {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  // Search and filter
  useEffect(() => {
    let filtered = appointments;
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.patientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          appointment.practitionerName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === statusFilter
      );
    }
    setFilteredAppointments(filtered);
  }, [searchQuery, statusFilter, appointments]);

  // Stats
  const todaysAppointments = appointments.filter((apt) => apt.isToday).length;
  const upcomingAppointments = appointments.filter(
    (apt) => apt.isUpcoming
  ).length;
  const bookedAppointments = appointments.filter(
    (apt) => apt.status === "booked"
  ).length;
  const pendingAppointments = appointments.filter(
    (apt) => apt.status === "pending"
  ).length;

  const handleCreateAppointment = () => {
    setSelectedAppointment(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: AppointmentSummary) => {
    setSelectedAppointment(appointment);
    setModalMode("edit");
    setIsModalOpen(true);
  };
  const handleViewAppointment = (appointment: AppointmentSummary) => {
    setSelectedAppointment(appointment);
    setModalMode("view");
    setIsModalOpen(true);
  };
  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await loadAppointments();
      }
    } catch {
      // silent
    }
  };
  const handleModalSubmit = async (data: AppointmentFormData) => {
    try {
      const url = modalMode === 'create'
        ? '/api/appointments'
        : `/api/appointments/${selectedAppointment?.id}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setIsModalOpen(false);
        await loadAppointments();
        return { success: true };
      } else {
        // Show error returned from API (including conflict)
        return { success: false, error: result.error };
      }
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };
  

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
            Appointments
          </h1>
          <p className="text-sm text-gray-500">
            Manage patient appointments and scheduling
          </p>
        </div>
        <button
          onClick={handleCreateAppointment}
          className="btn-main flex items-center gap-2"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" />
          Schedule Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel card-hover flex items-center border-l-4 border-blue-500">
          <div className="p-2 rounded-lg bg-blue-100 mr-4">
            <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
          <div className="text-sm text-gray-500">Today&apos;s Appointments</div>
            <div className="text-2xl font-semibold text-gray-900">
              {todaysAppointments}
            </div>
          </div>
        </div>
        <div className="glass-panel card-hover flex items-center border-l-4 border-emerald-500">
          <div className="p-2 rounded-lg bg-emerald-100 mr-4">
            <ClockIcon className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Upcoming</div>
            <div className="text-2xl font-semibold text-gray-900">
              {upcomingAppointments}
            </div>
          </div>
        </div>
        <div className="glass-panel card-hover flex items-center border-l-4 border-purple-500">
          <div className="p-2 rounded-lg bg-purple-100 mr-4">
            <UserGroupIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Booked</div>
            <div className="text-2xl font-semibold text-gray-900">
              {bookedAppointments}
            </div>
          </div>
        </div>
        <div className="glass-panel card-hover flex items-center border-l-4 border-yellow-500">
          <div className="p-2 rounded-lg bg-yellow-100 mr-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-2xl font-semibold text-gray-900">
              {pendingAppointments}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="glass-panel py-4 px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              className="
          w-full rounded-xl border-none outline-none bg-white/70
          py-2.5 pl-11 pr-4 text-base text-gray-900
          shadow ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-300
          placeholder:text-gray-400 transition
        "
              placeholder="Search appointments by patient, doctor, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="sm:w-48">
            <input
              type="text"
              placeholder="Provider ID"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
              className="input-soft w-full"
            />
          </div>

          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
          w-full rounded-xl border-none outline-none bg-white/70
          py-2.5 pl-3 pr-8 text-base text-gray-900
          shadow ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-300
          placeholder:text-gray-400 transition
        "
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

      {/* Appointments Grid or Empty/Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="loading-spinner" />
          <span className="ml-3 text-gray-500">Loading appointments...</span>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center">
          <CalendarDaysIcon className="h-12 w-12 text-gray-300" />
          <h3 className="mt-3 text-base font-semibold text-gray-900">
            No appointments found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by scheduling your first appointment."}
          </p>
          {!searchQuery && statusFilter === "all" && (
            <button
              onClick={handleCreateAppointment}
              className="btn-main mt-6 flex items-center gap-2"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" />
              Schedule Appointment
            </button>
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
