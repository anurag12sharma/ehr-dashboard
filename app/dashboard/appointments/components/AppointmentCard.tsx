// app/dashboard/appointments/components/AppointmentCard.tsx
'use client';

import React from 'react';
import { AppointmentSummary } from '@/types/fhir';
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface AppointmentCardProps {
  appointment: AppointmentSummary;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function AppointmentCard({ appointment, onView, onEdit, onDelete }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      booked: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      fulfilled: 'bg-blue-100 text-blue-800 border-blue-200',
      arrived: 'bg-purple-100 text-purple-800 border-purple-200',
      noshow: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      checkup: 'bg-blue-50 text-blue-700',
      consultation: 'bg-emerald-50 text-emerald-700',
      'follow-up': 'bg-purple-50 text-purple-700',
      procedure: 'bg-orange-50 text-orange-700',
      emergency: 'bg-red-50 text-red-700',
      other: 'bg-gray-50 text-gray-700',
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const getPriorityIcon = (priority: string) => (
    priority === 'urgent' || priority === 'stat'
      ? <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
      : null
  );

  const formatTime = (dateTime: string) =>
    new Date(dateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const formatDate = (dateTime: string) =>
    new Date(dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const isToday = appointment.isToday;

  return (
    <div className={`
  glass-panel card-hover rounded-2xl mb-5 px-0 pt-0 pb-2 shadow-xl border-0
  transition-shadow duration-200
  ${isToday ? 'ring-2 ring-blue-100' : ''}
`}>
  <div className="p-6">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-900 truncate">{appointment.title}</h3>
          {getPriorityIcon(appointment.priority)}
          {isToday && (
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 shadow-sm border border-blue-100">Today</span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-1">ID: {appointment.id}</p>
      </div>
      <span className={
        `inline-block rounded-xl px-3 py-1 text-xs font-medium shadow-sm bg-opacity-20
         ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
         ${appointment.status === 'booked' ? 'bg-emerald-100 text-emerald-700' : ''}
         ${appointment.status === 'fulfilled' ? 'bg-blue-100 text-blue-700' : ''}
         ${appointment.status === 'cancelled' ? 'bg-red-100 text-red-600' : ''}
        `
      }>
        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
      </span>
    </div>

    {/* Patient/Practitioner/Location */}
    <div className="space-y-1 mt-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <UserIcon className="h-4 w-4 text-gray-400" />
        {appointment.patientName}
      </div>
      {appointment.practitionerName && (
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          {appointment.practitionerName}
        </div>
      )}
      {appointment.location && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPinIcon className="h-4 w-4 text-gray-400" />
          {appointment.location}
        </div>
      )}
    </div>

    {/* Date and Time */}
    <div className="mt-5 mb-2 p-3 bg-gray-50/75 rounded-xl flex flex-wrap gap-x-5 items-center">
      <div className="flex items-center gap-2 mb-1">
        <CalendarIcon className="h-4 w-4 text-blue-400" />
        <span className="font-medium text-sm text-gray-900">{formatDate(appointment.startDateTime)}</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <ClockIcon className="h-4 w-4 text-emerald-400" />
        <span className="text-xs text-gray-700">
          {formatTime(appointment.startDateTime)} — {formatTime(appointment.endDateTime)}
        </span>
      </div>
      <div className="ml-auto text-xs text-gray-400">
        Duration: {appointment.duration} min
      </div>
    </div>

    {/* Appointment Type */}
    <div className="mt-1 mb-2">
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium shadow-sm
        ${getTypeColor(appointment.appointmentType)}`}>
        {appointment.appointmentType.charAt(0).toUpperCase() + appointment.appointmentType.slice(1)}
      </span>
    </div>

    {/* Actions */}
    <div className="mt-4 flex gap-2">
      <button
        onClick={onView}
        className="btn-outline flex-1 flex items-center justify-center gap-1"
      >
        <EyeIcon className="h-4 w-4" />
        View
      </button>
      <button
        onClick={onEdit}
        className="btn-calm flex-1 flex items-center justify-center gap-1"
      >
        <PencilIcon className="h-4 w-4" />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="btn-danger flex items-center justify-center gap-1"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  </div>
</div>

  );
}
